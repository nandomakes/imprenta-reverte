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
 * PROCEDENCIA: DESGLOSE VERIFICADO PAGINA POR PAGINA, 56/56
 * ---
 *
 * Transcrito de "CATALOGO 2026 REVERTE" (56 paginas). Esta version reemplaza
 * la anterior (9 categorias agrupadas a mano) por las 16 categorias tal como
 * las presenta el catalogo, cada una con su propio bloque de paginas — mas
 * la categoria 17, "otros servicios", que NO viene del PDF: es la valvula de
 * seguridad para peticiones que no encajan, y hay que conservarla.
 *
 * Criterio de transcripcion: se conservan los nombres del catalogo. Cuando el
 * catalogo no rotula una tecnica de impresion para un producto, el campo
 * `tecnica` dice literalmente 'No especificado en el catálogo' — no se
 * inventa. Ver la nota "Reglas de datos" del propio desglose.
 *
 * ---
 * REDISTRIBUCION RESPECTO A LA VERSION ANTERIOR
 * ---
 *
 * Las 9 categorias antiguas mezclaban productos por objeto fisico ("textil",
 * "grabado laser y sublimacion"); las 16 nuevas siguen la organizacion real
 * del catalogo, que es por TECNICA de produccion. Eso separa, por ejemplo,
 * "sellos" de "articulos de oficina" (que ahora reparten entre Serigrafia y
 * Productos para escuela), y separa DTF de Serigrafia de Bordado aunque los
 * tres impriman sobre tela — son procesos distintos con precios distintos.
 *
 * Las rutas viejas que cambiaron de slug tienen su redirect 301 en
 * astro.config.mjs, para no romper enlaces que ya estuvieran indexados.
 *
 * ---
 * `noIncluye` ES LO QUE MARCA LOS LIMITES
 * ---
 *
 * Los ejemplos dicen que ENTRA; el contraste dice donde acaba la categoria.
 * Con 16 categorias en vez de 9, hay mas fronteras finas que marcar: DTF vs.
 * Serigrafia vs. Bordado (las tres imprimen tela), Sublimacion vs. Grabado
 * laser (las dos marcan objetos rigidos), Sellos vs. Productos para escuela
 * (las dos incluyen sellos, cada una desde su angulo).
 */

/** Un producto dentro de una categoria, con su tecnica de impresion. */
export interface ProductoCatalogo {
  nombre: string
  /** Tal como la rotula el catalogo. Nunca inferida. */
  tecnica: string
}

export interface CategoriaCatalogo {
  slug: string
  /** Como se le nombra al prospecto. */
  etiqueta: string
  /**
   * Resumen corto para tarjetas y listados donde no cabe el detalle completo.
   * Se deriva de `productos` (los primeros nombres), no se escribe a mano dos
   * veces: mantenerlos sincronizados a mano es como se cuelan discrepancias.
   */
  ejemplos: string[]
  /** El detalle completo, estilo carta: nombre + tecnica de cada producto. */
  productos?: ProductoCatalogo[]
  /** El contraste: lo que parece encajar y no encaja. */
  noIncluye?: string
  /** Paginas del PDF, para poder reverificar sin releer las 56. */
  paginas: string
}

/** `ejemplos` a partir de `productos`, para no mantener la misma lista dos
 *  veces. Toma los primeros `n` nombres tal cual, sin la tecnica. */
function ejemplosDe(productos: ProductoCatalogo[], n = 6): string[] {
  return productos.slice(0, n).map((p) => p.nombre.toLowerCase())
}

const NOTAS_FORMATOS_NEGOCIO: ProductoCatalogo[] = [
  { nombre: 'Notas de venta', tecnica: '1 tinta / 2 tintas' },
  { nombre: 'Pedidos', tecnica: '1 tinta / 2 tintas' },
  { nombre: 'Comandas / recibos', tecnica: '1 tinta / 2 tintas' },
  { nombre: 'Vales', tecnica: '1 tinta / 2 tintas' },
  { nombre: 'Contratos / formatos', tecnica: '1 tinta / 2 tintas' },
]

const PAPELERIA_MEDICA: ProductoCatalogo[] = [
  { nombre: 'Recetarios', tecnica: '1 tinta / 2 tintas / selección a color' },
  { nombre: 'Órdenes de laboratorio', tecnica: '1 tinta / 2 tintas' },
  { nombre: 'Sobres para laboratorio', tecnica: '1 tinta / 2 tintas / selección a color' },
  { nombre: 'Bolsas para radiografías', tecnica: 'No especificado en el catálogo' },
]

const PAPELERIA_CORPORATIVA: ProductoCatalogo[] = [
  { nombre: 'Hojas membretadas', tecnica: '1 tinta / 2 tintas / selección a color' },
]

const SELLOS: ProductoCatalogo[] = [
  { nombre: 'COLOP 10', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 15', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 20', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 30', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 40', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 50', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 55', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 55 fechador', tecnica: 'Sello fechador' },
  { nombre: 'COLOP 60', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 54', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP stamp R40', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP stamp R50', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 55 oval dater', tecnica: 'Sello fechador' },
  { nombre: 'COLOP 35 DATER', tecnica: 'Sello fechador' },
  { nombre: 'COLOP pocket stamp 20', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP stamp 30', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP Q-43', tecnica: 'Sello personalizado' },
  { nombre: 'COLOP 3040', tecnica: 'Sello personalizado' },
  { nombre: 'Microban', tecnica: 'Sello personalizado' },
  { nombre: 'Sellos de madera', tecnica: 'Sello personalizado' },
]

const IMPRESION_COMERCIAL: ProductoCatalogo[] = [
  { nombre: 'Tarjetas de presentación — color, solo frente', tecnica: 'Selección a color' },
  { nombre: 'Tarjetas de presentación — color, ambos lados', tecnica: 'Selección a color' },
  { nombre: 'Tarjetas de presentación — impresión, solo frente', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Volantes', tecnica: '1 tinta / a color' },
  { nombre: 'Trípticos / dípticos', tecnica: '1 tinta / a color' },
  { nombre: 'Posters', tecnica: '1 tinta / a color' },
  { nombre: 'Trípticos — couché 150 g', tecnica: 'Selección a color' },
  { nombre: 'Guía turística', tecnica: 'Full color' },
  { nombre: 'Gafetes enmicados', tecnica: 'Full color' },
  { nombre: 'Etiquetas para botellas', tecnica: 'Impresión sobre papel adhesivo' },
  { nombre: 'Etiqueta de producto', tecnica: 'Impresión sobre papel adhesivo' },
  { nombre: 'Calcomanías y stickers personalizados', tecnica: 'Impresión personalizada' },
  { nombre: 'Imanes', tecnica: 'Impresión personalizada' },
  { nombre: 'Etiquetas adhesivas', tecnica: 'Impresión personalizada' },
  { nombre: 'Menús para restaurantes', tecnica: 'Impresión a color' },
  { nombre: 'Manteles', tecnica: '1 tinta / 3 tintas' },
  { nombre: 'Revistas', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Informes', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Folletos', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Revistas / folletos con encuadernado', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Revistas / folletos con espiral metálica', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Pasta de cartón grueso', tecnica: 'Impresión en vinil' },
]

const PUBLICIDAD_EXTERIOR: ProductoCatalogo[] = [
  { nombre: 'Lonas', tecnica: 'Impresión a todo color' },
  { nombre: 'Banner display', tecnica: 'Impresión en lona' },
  { nombre: 'Banner display tipo araña + lona', tecnica: 'Impresión en lona' },
  { nombre: 'Banderas publicitarias de lona', tecnica: 'Impresión a todo color' },
  { nombre: 'Banner display con bolsa', tecnica: 'Impresión a todo color' },
  { nombre: 'Renta de toldo carpa', tecnica: 'Impresión a todo color' },
  { nombre: 'Vinil microperforado', tecnica: 'Impresión en vinil microperforado' },
  { nombre: 'Señaléticas / rótulos', tecnica: 'Corte de vinil' },
  { nombre: 'Señalizaciones para empresas, negocios o industrias', tecnica: 'Corte de vinil' },
  { nombre: 'Cheques de premiación', tecnica: 'Impresión en vinil' },
  { nombre: 'Figuras en coroplast', tecnica: 'Impresión en vinil + base de coroplast' },
  { nombre: 'Chalecos para limpieza', tecnica: 'Vinil reflejante' },
  { nombre: 'Vinil reflejante', tecnica: 'Vinil reflejante' },
  { nombre: 'Rotulación vehicular', tecnica: 'Impresión a todo color + corte de vinil' },
  { nombre: 'Rótulos para negocios de comida', tecnica: 'Impresión en vinil adherible, alta resolución' },
  { nombre: 'Corte de vinil adherible', tecnica: 'Corte de vinil adherible' },
  { nombre: 'Esmerilado personalizado', tecnica: 'Esmerilado personalizado' },
]

const DTF: ProductoCatalogo[] = [
  { nombre: 'Impresión DTF — 1 m (58 × 100 cm)', tecnica: 'DTF' },
  { nombre: 'Impresión DTF — carta', tecnica: 'DTF' },
  { nombre: 'Impresión DTF — oficio', tecnica: 'DTF' },
  { nombre: 'Impresión DTF — 5 × 7', tecnica: 'DTF' },
  { nombre: 'Impresión DTF — 8 × 8', tecnica: 'DTF' },
  { nombre: 'Impresión DTF — 12 × 6', tecnica: 'DTF' },
  { nombre: 'Uniformes', tecnica: 'DTF' },
  { nombre: 'Gorras', tecnica: 'DTF / estampado' },
  { nombre: 'Banderas', tecnica: 'DTF / estampado' },
  { nombre: 'Bolsas', tecnica: 'DTF / estampado' },
  { nombre: 'Mochilas', tecnica: 'DTF' },
  { nombre: 'Respaldo en sillas', tecnica: 'DTF / estampado' },
  { nombre: 'Máscara / cubrecuello', tecnica: 'DTF / estampado' },
  { nombre: 'Sombrero legionario cazador', tecnica: 'DTF / estampado' },
  { nombre: 'Manteles para eventos especiales', tecnica: 'DTF / estampado' },
]

const SERIGRAFIA: ProductoCatalogo[] = [
  { nombre: 'Playeras suaves y frescas', tecnica: 'Serigrafía — 1 tinta / 2–3 tintas' },
  { nombre: 'Bolsas ecológicas', tecnica: 'Serigrafía — 1 tinta / 2 tintas' },
  { nombre: 'Agenda diaria / semanal', tecnica: 'Serigrafía' },
  { nombre: 'Planeador de proyectos', tecnica: 'Serigrafía' },
  { nombre: 'Artículos promocionales', tecnica: 'Serigrafía' },
  { nombre: 'Cilindros / termos plástico', tecnica: 'Serigrafía' },
  { nombre: 'Lapiceros escolares / oficina', tecnica: 'Serigrafía' },
  { nombre: 'Mochila estampado', tecnica: 'Serigrafía' },
  { nombre: 'Pulseras Tyvek', tecnica: 'Serigrafía' },
  { nombre: 'Portada de libros / documentos', tecnica: 'Serigrafía' },
  { nombre: 'Paraguas / sombrillas promocionales', tecnica: 'Serigrafía' },
]

const SUBLIMACION: ProductoCatalogo[] = [
  {
    nombre: 'Reconocimiento — placa de aluminio metálico/dorado con base de madera',
    tecnica: 'Sublimación',
  },
  { nombre: 'Tazas sublimadas', tecnica: 'Sublimación' },
  { nombre: 'Pulseras', tecnica: 'Sublimación' },
]

const BORDADO: ProductoCatalogo[] = [
  { nombre: 'Camisas / polos de uniforme', tecnica: 'Bordado' },
  { nombre: 'Playeras / prendas de uniforme', tecnica: 'Bordado' },
  { nombre: 'Sudaderas', tecnica: 'Bordado' },
  { nombre: 'Chamarras', tecnica: 'Bordado' },
  { nombre: 'Gorras', tecnica: 'Bordado' },
  { nombre: 'Pantalones', tecnica: 'Bordado' },
  { nombre: 'Uniformes de trabajo', tecnica: 'Bordado' },
  { nombre: 'Uniforme clínico / filipina', tecnica: 'Bordado' },
  { nombre: 'Chalecos / prendas de alta visibilidad', tecnica: 'Bordado' },
]

const PRODUCTOS_ESCUELA: ProductoCatalogo[] = [
  { nombre: 'Carpetas', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Reglas', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Pines', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Lápices', tecnica: 'Grabado láser' },
  { nombre: 'Bandas', tecnica: 'Sublimación' },
  { nombre: 'Sellos', tecnica: 'Sello personalizado' },
  { nombre: 'Reconocimientos', tecnica: 'No especificado en el catálogo' },
]

const GRABADO_LASER: ProductoCatalogo[] = [
  { nombre: 'Termos', tecnica: 'Grabado láser' },
  { nombre: 'Souvenirs de madera', tecnica: 'Grabado láser' },
  { nombre: 'Agendas y carteras', tecnica: 'Grabado láser' },
  { nombre: 'Reconocimiento en vidrio', tecnica: 'Grabado láser' },
  { nombre: 'Madera para cocina', tecnica: 'Grabado láser' },
]

const EVENTOS_INVITACIONES: ProductoCatalogo[] = [
  { nombre: 'Invitaciones 1/8 de carta', tecnica: 'Couché 300 g + corte al ras' },
  { nombre: 'Invitaciones 1/4 de carta', tecnica: 'Couché 300 g + corte al ras' },
  { nombre: 'Invitaciones 1/2 carta', tecnica: 'Couché 300 g + corte al ras' },
  { nombre: 'Invitaciones carta / media carta', tecnica: 'Couché 300 g' },
  { nombre: 'Invitaciones con doblez', tecnica: 'Couché 300 g' },
  { nombre: 'Invitaciones con sobre celofán', tecnica: 'Couché 300 g + sobre celofán' },
  { nombre: 'Misales para boda', tecnica: 'Portada opalina + interior papel bond' },
  { nombre: 'Termos personalizados', tecnica: 'Grabado láser' },
]

const EVENTOS_DECORACION: ProductoCatalogo[] = [
  { nombre: 'Menús decorativos (bodas, bautizos, comuniones)', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Figuras en coroplast para eventos', tecnica: 'Impresión con soporte' },
  { nombre: 'Figuras decorativas con soporte', tecnica: 'Impresión con soporte' },
  { nombre: 'Oraciones / separadores', tecnica: 'Couché 300 g' },
  { nombre: 'Novenarios', tecnica: 'Couché 300 g' },
  { nombre: 'Abanicos para eventos o campañas', tecnica: 'Couché 300 g' },
]

const EVENTO_DEPORTIVO: ProductoCatalogo[] = [
  { nombre: 'Lonas / banners', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Playeras fullprint', tecnica: 'Fullprint' },
  { nombre: 'Mochilas', tecnica: 'DTF' },
  { nombre: 'Medallas personalizadas', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Números de corredor', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Hojas de registro', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Reconocimientos', tecnica: 'Corte de acrílico + base de madera' },
]

const CALENDARIOS: ProductoCatalogo[] = [
  { nombre: 'Calendario con base de cartón grueso', tecnica: 'Impresión en vinil' },
  { nombre: 'Calendario doble carta', tecnica: 'Impresión sobre couché 300 g' },
  { nombre: 'Calendario con santoral', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Calendario de escritorio', tecnica: 'No especificado en el catálogo' },
  { nombre: 'Calendario día x día', tecnica: 'No especificado en el catálogo' },
]

export const CATALOGO: readonly CategoriaCatalogo[] = [
  {
    slug: 'notas-formatos-negocio',
    etiqueta: 'Notas y Formatos para Negocio',
    ejemplos: ejemplosDe(NOTAS_FORMATOS_NEGOCIO, 5),
    productos: NOTAS_FORMATOS_NEGOCIO,
    noIncluye:
      'recetarios y órdenes de laboratorio, que son papelería médica; hojas membretadas, que son papelería corporativa',
    paginas: '3-5',
  },
  {
    slug: 'papeleria-medica-laboratorio',
    etiqueta: 'Papelería Médica y de Laboratorio',
    ejemplos: ejemplosDe(PAPELERIA_MEDICA, 4),
    productos: PAPELERIA_MEDICA,
    paginas: '6-10',
  },
  {
    slug: 'papeleria-corporativa',
    etiqueta: 'Papelería Corporativa',
    ejemplos: ejemplosDe(PAPELERIA_CORPORATIVA),
    productos: PAPELERIA_CORPORATIVA,
    noIncluye: 'notas de venta, pedidos y comandas, que van en Notas y Formatos para Negocio',
    paginas: '11-12',
  },
  {
    slug: 'sellos',
    etiqueta: 'Sellos',
    ejemplos: ejemplosDe(SELLOS, 5),
    productos: SELLOS,
    noIncluye:
      'lapiceros, agendas y artículos de oficina, que van en Serigrafía; los sellos que se piden para el ciclo escolar aparecen también en Productos para Escuela',
    paginas: '15-18',
  },
  {
    slug: 'impresion-comercial',
    etiqueta: 'Impresión Comercial',
    ejemplos: ejemplosDe(IMPRESION_COMERCIAL, 6),
    productos: IMPRESION_COMERCIAL,
    noIncluye:
      'lonas y cualquier impresión de gran tamaño, que son publicidad exterior y gran formato; invitaciones y menús decorativos de evento, que son papelería social de eventos',
    paginas: '19-26',
  },
  {
    slug: 'publicidad-exterior-gran-formato',
    etiqueta: 'Publicidad Exterior y Gran Formato',
    ejemplos: ejemplosDe(PUBLICIDAD_EXTERIOR, 6),
    productos: PUBLICIDAD_EXTERIOR,
    noIncluye: 'volantes, posters de interior y tarjetas, que son impresión comercial',
    paginas: '27-36',
  },
  {
    slug: 'dtf',
    etiqueta: 'DTF',
    ejemplos: ejemplosDe(DTF, 5),
    productos: DTF,
    noIncluye:
      'playeras en tiraje grande a 1-3 tintas, que suelen convenir más en Serigrafía; prendas de uniforme con logo bordado, que van en Bordado',
    paginas: '37-40',
  },
  {
    slug: 'serigrafia',
    etiqueta: 'Serigrafía',
    ejemplos: ejemplosDe(SERIGRAFIA, 5),
    productos: SERIGRAFIA,
    noIncluye: 'tirajes pequeños a full color, que suelen convenir más en DTF; sellos, que tienen su propia categoría',
    paginas: '41-44',
  },
  {
    slug: 'sublimacion',
    etiqueta: 'Sublimación',
    ejemplos: ejemplosDe(SUBLIMACION),
    productos: SUBLIMACION,
    noIncluye: 'termos y souvenirs de madera marcados con láser, que van en Grabado Láser',
    paginas: '45-46',
  },
  {
    slug: 'bordado-uniformes',
    etiqueta: 'Bordado de Uniformes',
    ejemplos: ejemplosDe(BORDADO, 5),
    productos: BORDADO,
    noIncluye: 'playeras estampadas en DTF o serigrafía, que van en esas categorías',
    paginas: '46',
  },
  {
    slug: 'productos-escuela',
    etiqueta: 'Productos para Escuela',
    ejemplos: ejemplosDe(PRODUCTOS_ESCUELA),
    productos: PRODUCTOS_ESCUELA,
    noIncluye: 'playeras de generación, que van en DTF o Serigrafía; mochilas, que van en DTF',
    paginas: '47',
  },
  {
    slug: 'grabado-laser',
    etiqueta: 'Grabado Láser',
    ejemplos: ejemplosDe(GRABADO_LASER),
    productos: GRABADO_LASER,
    noIncluye: 'tazas y pulseras sublimadas, que van en Sublimación',
    paginas: '48',
  },
  {
    slug: 'eventos-invitaciones',
    etiqueta: 'Eventos: Invitaciones y Papelería Social',
    ejemplos: ejemplosDe(EVENTOS_INVITACIONES, 5),
    productos: EVENTOS_INVITACIONES,
    noIncluye:
      'menús decorativos, novenarios y abanicos, que van en Eventos: Decoración; medallas y reconocimientos deportivos, que van en Evento Deportivo',
    paginas: '49-51',
  },
  {
    slug: 'eventos-decoracion',
    etiqueta: 'Eventos: Decoración',
    ejemplos: ejemplosDe(EVENTOS_DECORACION, 5),
    productos: EVENTOS_DECORACION,
    noIncluye: 'invitaciones y misales, que van en Eventos: Invitaciones y Papelería Social',
    paginas: '52-53',
  },
  {
    slug: 'evento-deportivo',
    etiqueta: 'Evento Deportivo',
    ejemplos: ejemplosDe(EVENTO_DEPORTIVO, 5),
    productos: EVENTO_DEPORTIVO,
    noIncluye: 'invitaciones y decoración de bodas o fiestas, que van en las categorías de Eventos correspondientes',
    paginas: '54',
  },
  {
    slug: 'calendarios',
    etiqueta: 'Calendarios',
    ejemplos: ejemplosDe(CALENDARIOS),
    productos: CALENDARIOS,
    paginas: '55',
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
