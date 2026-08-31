/**
 * Recibe el formulario de cotización y lo manda por correo con Resend.
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

export const prerender = false;

/** Recorta y normaliza; un textarea puede traer megas si alguien insiste. */
function campo(data: FormData, nombre: string, max = 2000): string {
  const v = data.get(nombre);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function escaparHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return redirect('/contacto/?error=1', 303);
  }

  // Trampa antispam: si viene llena, es un bot. Respondemos como si todo
  // hubiera ido bien para no enseñarle al bot qué lo delató.
  if (campo(data, 'empresa_web')) return redirect('/gracias/', 303);

  const nombre = campo(data, 'nombre', 120);
  const telefono = campo(data, 'telefono', 40);
  const ciudad = campo(data, 'ciudad', 80);
  const email = campo(data, 'email', 160);
  const categoria = campo(data, 'categoria', 80);
  const cantidad = campo(data, 'cantidad', 120);
  const fecha = campo(data, 'fecha', 120);
  const detalles = campo(data, 'detalles', 2000);

  // El navegador ya valida `required`, pero un POST puede llegar de cualquier
  // lado: la validación que cuenta es esta.
  const faltantes = !nombre || !telefono || !ciudad || !categoria;
  // La categoría se valida contra el catálogo real, no contra texto libre:
  // un valor inventado es un lead que ventas no puede rutear.
  const categoriaValida = SLUGS_CATALOGO.includes(categoria);

  if (faltantes || !categoriaValida) {
    return redirect('/contacto/?error=1#cotizar', 303);
  }

  const etiqueta = etiquetaDe(categoria);
  const asunto = `Cotización — ${etiqueta} — ${ciudad}`;

  const lineas: [string, string][] = [
    ['Nombre', nombre],
    ['Teléfono', telefono],
    ['Ciudad', ciudad],
    ['Correo', email || '—'],
    ['Categoría', etiqueta],
    ['Cantidad', cantidad || '—'],
    ['Para cuándo', fecha || '—'],
    ['Detalles', detalles || '—'],
  ];

  const texto = lineas.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `
    <h2 style="font:600 18px system-ui;margin:0 0 16px">${escaparHtml(asunto)}</h2>
    <table style="font:14px system-ui;border-collapse:collapse">
      ${lineas
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:6px 16px 6px 0;color:#8A94A6;vertical-align:top">${k}</td>
               <td style="padding:6px 0;color:#0E1726">${escaparHtml(v).replace(/\n/g, '<br>')}</td>
             </tr>`
        )
        .join('')}
    </table>`;

  const apiKey = import.meta.env.RESEND_API_KEY;
  const para = import.meta.env.QUOTE_TO_EMAIL;
  const de = import.meta.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !para || !de) {
    // Sin credenciales el lead sigue quedando registrado. Ver README.
    console.warn('[cotizar] Resend sin configurar — lead solo en el log:\n' + texto);
    return redirect('/gracias/', 303);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Imprenta Reverte <${de}>`,
      to: [para],
      subject: asunto,
      text: texto,
      html,
      // Contestar el aviso responde al prospecto, no a la máquina.
      ...(email ? { replyTo: email } : {}),
    });
    if (error) {
      console.error('[cotizar] Resend devolvió error:', error, '\nLead:\n' + texto);
    }
  } catch (e) {
    // Un fallo de correo no debe costarnos el lead: queda en el log y el
    // usuario ve la confirmación igual.
    console.error('[cotizar] Fallo al enviar:', e, '\nLead:\n' + texto);
  }

  return redirect('/gracias/', 303);
};
