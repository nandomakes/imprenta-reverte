/**
 * /llms.txt — resumen del negocio para asistentes de IA (ChatGPT, Perplexity,
 * Claude, Gemini). Formato: https://llmstxt.org
 *
 * Se GENERA desde los mismos datos que el sitio (consts.ts y catalogo.ts),
 * no se escribe a mano: la versión fija que vivía en public/ se quedó en 9
 * categorías y con el horario viejo mientras el sitio ya tenía 16. Así, lo que
 * una IA cite de aquí dice siempre lo mismo que la página.
 */

import type { APIRoute } from 'astro';
import { CATALOGO } from '../data/catalogo';
import { CONTACT, EMAIL, FAQS_HOME, PHONE_DISPLAY, PHONE_TEL, SITE, SOCIALS } from '../consts';

export const prerender = true;

export const GET: APIRoute = () => {
  const url = (ruta: string) => `${SITE.url}${ruta}`;

  const categorias = CATALOGO.map((c) => {
    const productos = (c.productos?.map((p) => p.nombre) ?? c.ejemplos).join(', ');
    const fuera = c.noIncluye ? ` No incluye: ${c.noIncluye}.` : '';
    return `- [${c.etiqueta}](${url(`/catalogo/${c.slug}/`)}): ${productos}.${fuera}`;
  }).join('\n');

  const faqs = FAQS_HOME.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n');

  const redes = SOCIALS.filter((s) => s.icon !== 'whatsapp')
    .map((s) => `- ${s.label}: ${s.href}`)
    .join('\n');

  const texto = `# ${SITE.brand}

> ${SITE.description}

Sitio informativo: no es tienda en línea, no hay carrito ni precios publicados. El cliente consulta el catálogo y pide una cotización por formulario, teléfono o WhatsApp.

## Datos del negocio

- Nombre: ${SITE.brand}
- Giro: imprenta (papelería comercial y médica, gran formato, textil, grabado láser, sellos, eventos)
- Dirección: ${CONTACT.addressFull}, México
- Teléfono y WhatsApp: ${PHONE_DISPLAY} (${PHONE_TEL})
- Correo: ${EMAIL}
- Horario: ${CONTACT.hoursText}
- Mapa: ${CONTACT.mapsUrl}
${redes}

## Catálogo (${CATALOGO.length} categorías)

${categorias}

## Preguntas frecuentes

${faqs}

## Páginas

- [Inicio](${url('/')})
- [Catálogo completo](${url('/catalogo/')})
- [Solicitar cotización](${url('/cotizar/')})
- [Contacto y ubicación](${url('/contacto/')})
- [Preguntas frecuentes](${url('/preguntas-frecuentes/')})
`;

  return new Response(texto, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
