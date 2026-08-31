/**
 * Catalogo de la imprenta: la lista cerrada de servicios.
 *
 * ---
 * FUENTE UNICA A PROPOSITO
 * ---
 *
 * Este array alimenta TRES cosas a la vez: el system prompt del agente, el
 * enum del esquema de extraccion (que la API valida del lado del servidor), y
 * los tests. Si la lista viviera solo en el texto del prompt, nada verificaria
 * que el modelo se ciñe a ella — y una categoria inventada es un lead que
 * ventas no puede rutear.
 *
 * ---
 * PROCEDENCIA: VERIFICADO CONTRA EL PDF, PAGINA POR PAGINA
 * ---
 *
 * Transcrito de "CATALOGO 2026 REVERTE" (56 paginas), extrayendo el texto de
 * los content streams del PDF. Cada categoria lleva las paginas de las que
 * sale, para que la proxima revision no tenga que empezar de cero.
 *
 * La version anterior era una transcripcion de segunda mano y produjo una
 * clasificacion equivocada en produccion — un vaso con grabado laser salio
 * como textil, porque "tazas" y "termos" estaban listados bajo textil. Ver §49.
 *
 * ---
 * `noIncluye` ES LO QUE MARCA LOS LIMITES
 * ---
 *
 * Los ejemplos dicen que ENTRA; el contraste dice donde acaba la categoria.
 * Sin el, dos categorias que comparten un objeto fisico (una taza puede ser
 * sublimada, un termo puede ir grabado) se solapan y el modelo elige la
 * primera que suena parecida.
 */

export interface CategoriaCatalogo {
  slug: string
  /** Como se le nombra al prospecto. */
  etiqueta: string
  /** Ejemplos REALES del catalogo. Son lo que el modelo usa para clasificar. */
  ejemplos: string[]
  /** El contraste: lo que parece encajar y no encaja. */
  noIncluye?: string
  /** Paginas del PDF, para poder reverificar sin releer las 56. */
  paginas: string
}

export const CATALOGO: readonly CategoriaCatalogo[] = [
  {
    slug: 'papeleria-comercial-corporativa',
    etiqueta: 'Papelería Comercial y Corporativa',
    ejemplos: [
      'notas de venta',
      'comandas',
      'recibos',
      'pedidos',
      'vales',
      'contratos y formatos',
      'hojas membretadas',
    ],
    noIncluye: 'recetarios y órdenes de laboratorio, que son papelería médica',
    paginas: '3-5, 11-12',
  },
  {
    slug: 'papeleria-medica-laboratorio',
    etiqueta: 'Papelería Médica y de Laboratorio',
    ejemplos: [
      'recetarios',
      'órdenes de laboratorio',
      'sobres para laboratorio',
      'bolsas para radiografías',
      'papelería de consultorio',
    ],
    paginas: '6-10',
  },
  {
    slug: 'publicidad-identidad-visual',
    etiqueta: 'Publicidad e Identidad Visual',
    ejemplos: [
      'tarjetas de presentación',
      'volantes',
      'trípticos y dípticos',
      'pósters',
      'gafetes y listones porta gafete',
      'etiquetas adhesivas y stickers',
      'etiquetas para botellas',
      'imanes',
      'revistas, folletos e informes',
      'menús para restaurante',
      'guía turística',
    ],
    noIncluye:
      'lonas y cualquier impresión de gran tamaño, que son gran formato; ' +
      'invitaciones y menús decorativos de evento, que son impresión para eventos',
    paginas: '19-26',
  },
  {
    slug: 'impresion-gran-formato-senaletica',
    etiqueta: 'Impresión en Gran Formato y Señalética',
    ejemplos: [
      'lonas',
      'banner display (tipo araña)',
      'banderas publicitarias',
      'toldos y carpas',
      'vinil para ventanas, micro perforado y esmerilado',
      'señaléticas y señalizaciones (corte vinil)',
      'rotulación vehicular',
      'rótulos para negocios',
      'figuras en coroplast',
      'cheques de premiación',
      'vinil reflejante',
    ],
    noIncluye: 'volantes y pósters, que son publicidad e identidad visual',
    paginas: '28-36',
  },
  {
    slug: 'impresion-textil-promocionales',
    etiqueta: 'Impresión Textil y Artículos Promocionales',
    ejemplos: [
      'uniformes',
      'playeras (DTF, sublimación, serigrafía)',
      'playeras full print',
      'gorras',
      'mochilas',
      'bolsas ecológicas',
      'bolsas tote bag',
      'cubrecuellos',
      'sombreros',
      'respaldo en sillas',
      'manteles de tela para eventos',
    ],
    // ESTE es el contraste que faltaba y produjo el fallo de §49.
    noIncluye:
      'tazas, termos, vasos, placas, medallas y reconocimientos: aunque lleven ' +
      'logo, no son tela — van en grabado láser y sublimación en rígidos',
    paginas: '38-42, 54',
  },
  {
    slug: 'grabado-laser-sublimacion-rigidos',
    etiqueta: 'Grabado Láser y Sublimación en Rígidos',
    // Categoria propia porque el catalogo la trata como tal: son objetos
    // RIGIDOS marcados por tecnica (laser o sublimacion), no impresion sobre
    // papel ni estampado sobre tela.
    ejemplos: [
      'tazas sublimadas',
      'termos y vasos personalizados con grabado láser',
      'cilindros',
      'reconocimientos en acrílico, vidrio o base de madera',
      'placas metálicas y de aluminio',
      'placas para nichos',
      'medallas personalizadas',
      'souvenirs y tablas de madera para cocina',
      'pulseras de sublimación',
      'grabado láser sobre madera, vidrio o metal',
    ],
    noIncluye: 'playeras y gorras, que son impresión textil aunque lleven sublimación',
    paginas: '45, 47-48, 51, 54',
  },
  {
    slug: 'sellos-articulos-oficina',
    etiqueta: 'Sellos y Artículos de Oficina',
    ejemplos: [
      'sellos Colop',
      'sellos de madera',
      'fechadores',
      'troqueles de realce',
      'agendas y planeadores',
      'lapiceros escolares y de oficina',
      'carpetas',
      'reglas',
      'pines',
      'pulseras Tyvek',
      'portadas de libros, tesis y documentos',
    ],
    paginas: '15-18, 43-44, 47',
  },
  {
    slug: 'impresion-eventos',
    etiqueta: 'Impresión para Eventos Sociales y Deportivos',
    ejemplos: [
      'invitaciones de boda, bautizo o comunión',
      'menús decorativos',
      'novenarios',
      'abanicos',
      'manteles de papel',
      'calendarios',
      'números de corredor',
      'hojas de registro',
      'figuras en coroplast para decorar eventos',
    ],
    noIncluye:
      'medallas y reconocimientos, que van en grabado láser y sublimación en rígidos',
    paginas: '25, 49-55',
  },
  {
    slug: 'otros-servicios-imprenta',
    etiqueta: 'Otros Servicios de Imprenta',
    // NO es relleno, y NO es el ultimo recurso: es la respuesta correcta
    // siempre que el encaje no sea claro. Un lead aqui lo revisa una persona;
    // un lead mal clasificado se rutea mal y nadie lo nota.
    ejemplos: [
      'cualquier trabajo de imprenta que no encaje con claridad en las categorías anteriores',
      'peticiones ambiguas o incompletas',
    ],
    paginas: '-',
  },
] as const

export const SLUGS_CATALOGO = CATALOGO.map((c) => c.slug)

export function etiquetaDe(slug: string | null | undefined): string {
  return CATALOGO.find((c) => c.slug === slug)?.etiqueta ?? 'servicio no especificado'
}

/** Bloque para el system prompt. Generado, no escrito a mano: si alguien
 *  anade una categoria arriba, el prompt la conoce sin tocar nada mas. */
export function catalogoParaPrompt(): string {
  return CATALOGO.map((c) => {
    const base = `- ${c.slug} (${c.etiqueta}): ${c.ejemplos.join(', ')}`
    return c.noIncluye ? `${base}\n    NO incluye: ${c.noIncluye}` : base
  }).join('\n')
}
