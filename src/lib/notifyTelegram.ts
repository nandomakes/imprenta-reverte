/**
 * Avisa por Telegram de un prospecto nuevo, en paralelo al correo de Resend.
 *
 * NUNCA lanza: un fallo de Telegram no puede costar el lead ni el correo.
 * Todo error se registra con status y cuerpo para poder diagnosticar un token
 * caducado o un chat_id que cambió.
 */

export type ProspectoTelegram = {
  nombre?: string;
  email?: string;
  telefono?: string;
  [campo: string]: string | undefined;
};

/** Etiquetas de los campos conocidos; el resto se manda con su propia clave. */
const ETIQUETAS: Record<string, string> = {
  nombre: '👤 Nombre',
  comercio: '🏪 Comercio',
  telefono: '📱 Teléfono',
  ciudad: '🏙️ Ciudad',
  codigo_postal: '📮 Código postal',
  categoria: '👀 Veía',
  origen: '📍 Origen',
  campana: '🎯 Campaña',
};

/** El orden importa: es como se lee el mensaje en el móvil. */
const ORDEN = [
  'nombre',
  'comercio',
  'telefono',
  'ciudad',
  'codigo_postal',
  // Qué ficha del catálogo estaba viendo cuando dejó sus datos, si se sabe.
  'categoria',
  // La atribución va al final: es para nosotros, no para contactar al prospecto.
  'origen',
  'campana',
];

function escaparHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Quita el token del bot de cualquier cosa que vaya al log.
 *
 * El token viaja DENTRO de la URL de la API de Telegram
 * (api.telegram.org/bot<TOKEN>/sendMessage), así que basta con que un error
 * de red arrastre la URL de la petición — cosa que hacen varios errores de
 * fetch en Node — para que el token acabe impreso en los registros de
 * Vercel, que ve cualquiera con acceso al proyecto. Es la clase de fuga que
 * no se nota hasta que ya pasó, y cuesta dos líneas evitarla.
 */
function sinToken(texto: string, token: string): string {
  return token ? texto.split(token).join('<TOKEN>') : texto;
}

export async function notifyTelegram(data: ProspectoTelegram): Promise<void> {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[telegram] Sin configurar: faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID');
    return;
  }

  const claves = [...ORDEN, ...Object.keys(data).filter((k) => !ORDEN.includes(k))];
  const lineas = ['🆕 <b>Nuevo prospecto</b>', ''];
  for (const clave of claves) {
    const valor = data[clave];
    if (!valor) continue;
    lineas.push(`${ETIQUETAS[clave] ?? escaparHtml(clave)}: ${escaparHtml(valor)}`);
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lineas.join('\n'),
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      console.error('[telegram] Fallo al enviar:', res.status, sinToken(await res.text(), token));
    }
  } catch (e) {
    // El error se imprime como texto, no como objeto: así pasa entero por
    // el filtro del token. Un objeto de error se serializa después, ya fuera
    // de nuestro alcance, y con él se escaparía la URL de la petición.
    console.error('[telegram] Excepción al enviar:', sinToken(String(e), token));
  }
}
