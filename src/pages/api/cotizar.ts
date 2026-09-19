/**
 * Recibe el formulario de datos (nombre, teléfono, ciudad, CP), lo manda por correo con Resend y avisa
 * por Telegram. Las dos notificaciones van en paralelo y son independientes.
 *
 * La única ruta del sitio que no es HTML estático: necesita servidor porque
 * la API key no puede salir al navegador.
 *
 * DEGRADA A PROPÓSITO: si no hay RESEND_API_KEY configurada, el lead NO se
 * pierde ni revienta con un 500 — se escribe en el log del servidor y el
 * usuario ve igualmente la página de gracias. Así el sitio puede publicarse
 * antes de que la cuenta de Resend esté lista.
 */

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { SLUGS_CATALOGO, etiquetaDe } from '../../data/catalogo';
import { notifyTelegram } from '../../lib/notifyTelegram';

export const prerender = false;

/** Recorta y normaliza; un textarea puede traer megas si alguien insiste. */
function campo(data: FormData, nombre: string, max = 2000): string {
  const v = data.get(nombre);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/**
 * El formulario vive en tres páginas (/cotizar, /promo, /bio) y cada una debe
 * volver a su propio sitio al terminar o al fallar. El valor llega del cliente,
 * así que se valida: solo rutas internas. Sin esto, un POST manipulado puede
 * usar el redirect para mandar al visitante a un dominio ajeno.
 */
const SLASH = '/';

function rutaInterna(valor: string, porDefecto: string): string {
  if (valor[0] !== SLASH) return porDefecto;
  // El segundo carácter decide si esto sigue siendo una ruta interna: tanto
  // "//evil.com" como su variante con backslash sacan al visitante del sitio,
  // y el navegador trata los dos igual. Se comparan por código para no
  // depender de escapes en el literal.
  const segundo = valor.charCodeAt(1);
  if (segundo === 47 || segundo === 92) return porDefecto;
  return valor;
}

function escaparHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Cuántos segundos tiene que esperar el mismo navegador entre dos envíos.
 * No es protección de servidor real (eso necesitaría IP + un almacén tipo
 * Redis/Vercel KV, que este sitio no tiene) — es una cookie: cualquiera que
 * borre cookies o mande el POST sin navegador la esquiva. Lo que sí detiene
 * es justo lo que se pidió: el clic repetido o el "a ver qué pasa si mando
 * el formulario 20 veces" desde el navegador normal.
 */
const ESPERA_ENTRE_ENVIOS_SEGUNDOS = 45;
const COOKIE_ENVIO = 'rv_envio';

/** Se llama en cada camino que termina en éxito (incluida la trampa
 *  antispam, que finge éxito a propósito): a partir de aquí, cualquier envío
 *  nuevo de este navegador se bloquea hasta que la cookie expire sola. */
function marcarEnvio(cookies: import('astro').AstroCookies): void {
  cookies.set(COOKIE_ENVIO, '1', {
    maxAge: ESPERA_ENTRE_ENVIOS_SEGUNDOS,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });
}

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return redirect('/cotizar/?error=1', 303);
  }

  const retorno = rutaInterna(campo(data, 'retorno', 120), '/cotizar/');
  const sep = retorno.includes('?') ? '&' : '?';

  // Ya hubo un envío reciente desde este mismo navegador: se corta aquí,
  // antes de gastar la cuota de Resend o de Telegram. Ver la constante de
  // arriba para el límite real (accesibilidad de la cookie, no de servidor).
  if (cookies.has(COOKIE_ENVIO)) {
    return redirect(`${retorno}${sep}error=1#cotizar`, 303);
  }

  // Trampa antispam: si viene llena, es un bot. Respondemos como si todo
  // hubiera ido bien para no enseñarle al bot qué lo delató.
  if (campo(data, 'empresa_web')) {
    marcarEnvio(cookies);
    return redirect('/gracias/', 303);
  }

  // Los cuatro datos que pide el formulario. Todos obligatorios: son lo mínimo
  // para que un asesor pueda llamar y saber más o menos desde dónde.
  const nombre = campo(data, 'nombre', 120);
  const telefono = campo(data, 'telefono', 40);
  const ciudad = campo(data, 'ciudad', 80);
  const codigoPostal = campo(data, 'codigo_postal', 10);

  // Contexto opcional: las fichas de catálogo mandan su categoría en un campo
  // oculto para que el asesor sepa qué estaba viendo la persona. Si no viene,
  // o viene con un valor que no existe en el catálogo, se ignora sin rechazar
  // el lead — ya no es un dato que la persona haya elegido.
  const categoria = campo(data, 'categoria', 80);
  const etiqueta = SLUGS_CATALOGO.includes(categoria) ? etiquetaDe(categoria) : '';

  // Atribución: de qué página y de qué campaña viene el lead. Sirve para
  // comparar con el tiempo qué canal trae prospectos de mejor calidad.
  const origen = campo(data, 'origen', 60) || 'sitio';
  const utmSource = campo(data, 'utm_source', 120);
  const utmMedium = campo(data, 'utm_medium', 120);
  const utmCampaign = campo(data, 'utm_campaign', 160);
  const utmContent = campo(data, 'utm_content', 160);

  // El navegador ya valida `required`, pero un POST puede llegar de cualquier
  // lado: la validación que cuenta es esta.
  const faltantes = !nombre || !telefono || !ciudad || !codigoPostal;
  // Diez dígitos exactos, contando solo números: el campo admite espacios,
  // guiones y paréntesis al escribir. Se valida aquí además de en el
  // navegador porque un teléfono incompleto es un lead imposible de
  // contactar — que es justo para lo que sirve el formulario.
  const telefonoValido = telefono.replace(/\D/g, '').length === 10;
  // Cinco dígitos, el formato de todo México.
  const codigoPostalValido = /^[0-9]{5}$/.test(codigoPostal);

  if (faltantes || !telefonoValido || !codigoPostalValido) {
    // Vuelve a la página desde la que se envió, no siempre a /cotizar/.
    // El separador depende de si esa ruta ya trae query (/bio/?ref=fb).
    return redirect(`${retorno}${sep}error=1#cotizar`, 303);
  }

  const asunto = `Prospecto (${origen}) — ${nombre} — ${ciudad}`;

  const lineas: [string, string][] = [
    ['Nombre', nombre],
    ['Teléfono', telefono],
    ['Ciudad', ciudad],
    ['Código postal', codigoPostal],
    ...(etiqueta ? ([['Veía', etiqueta]] as [string, string][]) : []),
    ['Origen', origen],
    ...(utmSource || utmMedium || utmCampaign || utmContent
      ? ([
          ['Campaña', [utmSource, utmMedium, utmCampaign, utmContent].filter(Boolean).join(' · ')],
        ] as [string, string][])
      : []),
  ];

  const texto = lineas.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `
    <h2 style="font:600 18px system-ui;margin:0 0 16px">${escaparHtml(asunto)}</h2>
    <table style="font:14px system-ui;border-collapse:collapse">
      ${lineas
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:6px 16px 6px 0;color:#767676;vertical-align:top">${k}</td>
               <td style="padding:6px 0;color:#3D3D3D">${escaparHtml(v)}</td>
             </tr>`
        )
        .join('')}
    </table>`;

  // El aviso de Telegram no depende de que Resend esté configurado ni de que
  // el envío salga bien: es una notificación aparte, en paralelo.
  const avisoTelegram = notifyTelegram({
    nombre,
    telefono,
    ciudad,
    codigo_postal: codigoPostal,
    categoria: etiqueta || undefined,
    // "sitio" es el valor por defecto: no aporta nada saber que un lead del
    // formulario del sitio vino del sitio. Solo se manda el origen cuando
    // dice algo — bio_instagram, bio_facebook, una campaña… El correo sí lo
    // conserva siempre, que es donde se archiva el histórico.
    origen: origen === 'sitio' ? undefined : origen,
    campana: [utmSource, utmMedium, utmCampaign, utmContent].filter(Boolean).join(' · '),
  });

  const apiKey = import.meta.env.RESEND_API_KEY;
  const para = import.meta.env.QUOTE_TO_EMAIL;
  const de = import.meta.env.QUOTE_FROM_EMAIL;

  const correo = (async () => {
    if (!apiKey || !para || !de) {
      // Sin credenciales el lead sigue quedando registrado. Ver README.
      console.warn('[cotizar] Resend sin configurar — lead solo en el log:\n' + texto);
      return;
    }
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: `Imprenta Reverte <${de}>`,
        to: [para],
        subject: asunto,
        text: texto,
        html,
        // Sin correo del prospecto no hay reply-to: se le llama, no se le escribe.
      });
      if (error) {
        console.error('[cotizar] Resend devolvió error:', error, '\nLead:\n' + texto);
      }
    } catch (e) {
      // Un fallo de correo no debe costarnos el lead: queda en el log y el
      // usuario ve la confirmación igual.
      console.error('[cotizar] Fallo al enviar:', e, '\nLead:\n' + texto);
    }
  })();

  const resultados = await Promise.allSettled([correo, avisoTelegram]);
  for (const r of resultados) {
    if (r.status === 'rejected') {
      console.error('[cotizar] Fallo en una notificación:', r.reason, '\nLead:\n' + texto);
    }
  }

  marcarEnvio(cookies);
  return redirect('/gracias/', 303);
};
