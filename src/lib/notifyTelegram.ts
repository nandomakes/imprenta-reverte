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
  telefono: '📱 Teléfono',
  email: '✉️ Email',
  ciudad: '📍 Ciudad',
  categoria: '🏷️ Categoría',
  cantidad: '🔢 Cantidad',
  fecha: '📅 Para cuándo',
  detalles: '📝 Detalles',
  origen: '📍 Origen',
  campana: '🎯 Campaña',
};

/** El orden importa: es como se lee el mensaje en el móvil. */
const ORDEN = [
  'nombre',
  'telefono',
  'email',
  'ciudad',
  'categoria',
  'cantidad',
  'fecha',
  'detalles',
  // La atribución va al final: es para nosotros, no para contactar al prospecto.
  'origen',
  'campana',
];

function escaparHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
      console.error('[telegram] Fallo al enviar:', res.status, await res.text());
    }
  } catch (e) {
    console.error('[telegram] Excepción al enviar:', e);
  }
}
