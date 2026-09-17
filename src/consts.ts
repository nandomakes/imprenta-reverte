/**
 * Fuente única de contenido del sitio.
 *
 * El CATÁLOGO no vive aquí: vive en `src/data/catalogo.ts`, transcrito y
 * verificado contra el PDF. Este archivo le añade la capa visual y todo el
 * copy de las secciones.
 *
 * La RETÍCULA del home original replicaba printshopsolution.com/es/; la
 * tipografía y la paleta son el sistema propio de Reverte (Cormorant Garamond
 * + DM Sans, navy/oro/CMYK — ver README.md).
 */

import { CATALOGO, type CategoriaCatalogo } from './data/catalogo';

export const SITE = {
  brand: 'Imprenta Reverte',
  role: 'Imprenta',
  city: 'Ciudad Valles',
  region: 'San Luis Potosí',
  url: 'https://www.imprentareverte.com',
  themeColor: '#0B2545',
  title: 'Imprenta Reverte | Imprenta en Ciudad Valles, SLP',
  description:
    'Imprenta en Ciudad Valles, SLP. Papelería comercial y médica, lonas y gran formato, playeras, grabado láser, sellos e impresión para eventos. Cotiza ahora al 481 381 6663.',
  tagline: 'Transforma tu idea en impreso, en cualquier momento, en cualquier lugar.',
} as const;

/** El CTA del sitio. Una sola etiqueta, en todas partes, sin variantes. */
export const CTA_LABEL = 'Cotiza ahora';

export const PHONE_DISPLAY = '481 381 6663';
export const PHONE_TEL = '+524813816663';
export const EMAIL = 'reverteimprenta@gmail.com';
export const WHATSAPP_URL = `https://wa.me/524813816663?text=${encodeURIComponent(
  'Hola, quiero cotizar un trabajo de imprenta.'
)}`;

export const CONTACT = {
  street: 'Blvd. México - Laredo 86-SUR',
  neighborhood: 'Zona Centro',
  locality: 'Ciudad Valles',
  region: 'San Luis Potosí',
  regionCode: 'SLP',
  postalCode: '79000',
  country: 'MX',
  get addressLine() {
    return `${this.street}, ${this.neighborhood}`;
  },
  get addressFull() {
    return `${this.street}, ${this.neighborhood}, ${this.locality}, ${this.regionCode}`;
  },
  geo: { lat: 21.9885, lng: -99.0177 },
  hoursText: 'Lunes a viernes 9:00–18:30 · Sábado 9:00–14:00',
  hoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:30' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Imprenta Reverte, Blvd. México - Laredo 86-SUR, Zona Centro, Ciudad Valles, SLP'),
  mapEmbedUrl:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('Blvd. Mexico-Laredo 86 Sur, Zona Centro, Ciudad Valles, SLP') +
    '&t=&z=15&ie=UTF8&iwloc=&output=embed',
} as const;

export const SOCIALS: { label: string; href: string; icon: 'facebook' | 'whatsapp' | 'instagram' }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/ImprentaReverte', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/reverteimprenta/', icon: 'instagram' },
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: 'whatsapp' },
];

/** Barra promocional superior (la referencia lleva una con degradado). */
export const PROMO_BAR = {
  texto: 'Diseño incluido en todos los trabajos · Entrega en Ciudad Valles',
  enlaceTexto: 'Cotiza ahora',
  href: '/cotizar/',
} as const;

/**
 * Menú principal. La referencia tiene 7 entradas de primer nivel que agrupan
 * subcategorías; aquí se agrupan las 9 del catálogo de la misma forma.
 */
/**
 * Agrupa las 16 categorías del catálogo (más "otros servicios") en 6 rubros
 * de navegación, para que el menú no tenga 17 pestañas. La agrupación es por
 * cercanía de uso, no por técnica: quien busca "playeras" no sabe si lo que
 * quiere es DTF, serigrafía o bordado hasta que lo ve.
 */
export interface RubroNav {
  label: string;
  href: string;
  /** Identificador corto del rubro, para rutas tipo /bio/catalogo/<slug>/. */
  slug?: string;
  hijos?: string[];
  /** Foto propia del rubro, DISTINTA de las de sus categorías — a pedido
   *  explícito, para que 'Qué imprimimos' no repita las imágenes que ya se
   *  ven al entrar a cada categoría. Verificadas igual que las de arriba:
   *  gratuitas, con curl 200 OK, revisadas visualmente una por una. */
  imagen: string;
  imagenAlt: string;
}

export const NAV: RubroNav[] = [
  { label: 'Todo el catálogo', href: '/catalogo/', slug: 'todo', imagen: '', imagenAlt: '' },
  {
    label: 'Papelería',
    href: '/catalogo/notas-formatos-negocio/',
    slug: 'papeleria',
    hijos: ['notas-formatos-negocio', 'papeleria-medica-laboratorio', 'papeleria-corporativa'],
    imagen: 'photo-1513128034602-7814ccaddd4e',
    imagenAlt: 'Mano sosteniendo una pluma sobre una agenda abierta, junto a un teclado',
  },
  {
    label: 'Sellos e impresión comercial',
    href: '/catalogo/sellos/',
    slug: 'sellos-comercial',
    hijos: ['sellos', 'impresion-comercial'],
    imagen: 'photo-1562330046-f1760d62a90f',
    imagenAlt: 'Sobre blanco con sello de monograma, tijeras doradas y sobre rosa sobre madera',
  },
  {
    label: 'Gran formato',
    href: '/catalogo/publicidad-exterior-gran-formato/',
    slug: 'gran-formato',
    hijos: ['publicidad-exterior-gran-formato'],
    imagen: 'photo-1513757378314-e46255f6ed16',
    imagenAlt: 'Espectacular publicitario en blanco, vacío, contra el cielo',
  },
  {
    label: 'Textil y promocionales',
    href: '/catalogo/dtf/',
    slug: 'textil-promocionales',
    hijos: ['dtf', 'serigrafia', 'bordado-uniformes'],
    imagen: 'photo-1620799139507-2a76f79a2f4d',
    imagenAlt: 'Playera blanca en composición flat lay con tenis, libro y cámara',
  },
  {
    label: 'Grabado y sublimación',
    href: '/catalogo/grabado-laser/',
    slug: 'grabado-sublimacion',
    hijos: ['grabado-laser', 'sublimacion', 'productos-escuela'],
    imagen: 'photo-1727154085760-134cc942246e',
    imagenAlt: 'Llavero metálico en forma de corazón con grabado ornamental',
  },
  {
    label: 'Eventos y calendarios',
    href: '/catalogo/eventos-invitaciones/',
    slug: 'eventos-calendarios',
    hijos: [
      'eventos-invitaciones',
      'eventos-decoracion',
      'evento-deportivo',
      'calendarios',
      'otros-servicios-imprenta',
    ],
    imagen: 'photo-1633526543814-9718c8922b7a',
    imagenAlt: 'Calendario de pared con varias chinchetas rojas marcando fechas',
  },
];

/**
 * Las 32 subcategorías REALES del catálogo en PDF (archivos en
 * `public/catalogo-pdf/`), agrupadas por rubro de `NAV`. Son más finas que
 * las 16 categorías del sitio de escritorio — por ejemplo `impresion-comercial`
 * es UNA categoría en el sitio, pero en el PDF son 8 secciones separadas
 * (tarjetas, volantes, gafetes, etiquetas, menús, manteles, revistas...).
 *
 * Se usa solo en el flujo de la bio (`/bio/catalogo/<rubro>/`): cada botón
 * abre su PDF directo, sin página intermedia — el PDF YA es "la imagen de esa
 * sección del catálogo" que se había dejado pendiente.
 */
export interface SubcategoriaPdf {
  titulo: string;
  /** Nombre del archivo dentro de `public/catalogo-pdf/`. */
  archivo: string;
}

export const CATALOGO_PDF: Record<string, SubcategoriaPdf[]> = {
  papeleria: [
    { titulo: 'Notas y Formatos para Negocio', archivo: '01_Notas_y_Formatos_para_Negocio.pdf' },
    { titulo: 'Papelería Médica y de Laboratorio', archivo: '02_Papeleria_Medica_y_de_Laboratorio.pdf' },
    { titulo: 'Papelería Corporativa', archivo: '03_Papeleria_Corporativa.pdf' },
    { titulo: 'Papelería Complementaria', archivo: '04_Papeleria_Complementaria.pdf' },
  ],
  'sellos-comercial': [
    { titulo: 'Sellos Colop', archivo: '05_Sellos_Colop.pdf' },
    { titulo: 'Sellos de Madera', archivo: '06_Sellos_de_Madera.pdf' },
    { titulo: 'Tarjetas de Presentación', archivo: '07_Tarjetas_de_Presentacion.pdf' },
    { titulo: 'Volantes, Trípticos, Dípticos y Posters', archivo: '08_Volantes_Tripticos_Dipticos_y_Posters.pdf' },
    { titulo: 'Trípticos y Guía Turística', archivo: '09_Tripticos_y_Guia_Turistica.pdf' },
    { titulo: 'Gafetes Enmicados', archivo: '10_Gafetes_Enmicados.pdf' },
    { titulo: 'Etiquetas, Calcomanías, Stickers e Imanes', archivo: '11_Etiquetas_Adhesivas_Calcomanias_Stickers_e_Imanes.pdf' },
    { titulo: 'Menús para Restaurantes', archivo: '12_Menus_para_Restaurantes.pdf' },
    { titulo: 'Manteles', archivo: '13_Manteles.pdf' },
    { titulo: 'Revistas, Informes y Folletos', archivo: '14_Revistas_Informes_y_Folletos.pdf' },
  ],
  'gran-formato': [
    { titulo: 'Lonas', archivo: '15_Lonas.pdf' },
    { titulo: 'Banderas Publicitarias', archivo: '16_Banderas_Publicitarias.pdf' },
    { titulo: 'Toldo Carpa', archivo: '17_Toldo_Carpa.pdf' },
    { titulo: 'Vinil Microperforado', archivo: '18_Vinil_Microperforado.pdf' },
    { titulo: 'Señaléticas y Rótulos', archivo: '19_Senaleticas_y_Rotulos.pdf' },
    { titulo: 'Figuras en Coroplast, Cheques y Vinil Reflejante', archivo: '20_Figuras_Coroplast_Cheques_y_Vinil_Reflejante.pdf' },
    { titulo: 'Rotulación Vehicular', archivo: '21_Rotulacion_Vehicular.pdf' },
    { titulo: 'Rótulos para Comida, Privacidad y Esmerilado', archivo: '22_Rotulos_Comida_Privacidad_y_Esmerilado.pdf' },
  ],
  'textil-promocionales': [
    { titulo: 'DTF', archivo: '23_DTF.pdf' },
    { titulo: 'Serigrafía', archivo: '24_Serigrafia.pdf' },
    { titulo: 'Bordado de Uniformes', archivo: '26_Bordado_de_Uniformes.pdf' },
  ],
  'grabado-sublimacion': [
    { titulo: 'Grabado Láser', archivo: '28_Grabado_Laser.pdf' },
    { titulo: 'Sublimación', archivo: '25_Sublimacion.pdf' },
    { titulo: 'Productos para Escuela', archivo: '27_Productos_para_Escuela.pdf' },
  ],
  'eventos-calendarios': [
    { titulo: 'Invitaciones y Papelería Social', archivo: '29_Invitaciones_y_Papeleria_Social.pdf' },
    { titulo: 'Eventos: Decoración', archivo: '30_Eventos_Decoracion.pdf' },
    { titulo: 'Evento Deportivo', archivo: '31_Evento_Deportivo.pdf' },
    { titulo: 'Calendarios', archivo: '32_Calendarios.pdf' },
  ],
};

/** Enlaces rápidos del footer (la referencia tiene una columna igual). */
export const ENLACES_RAPIDOS = [
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes/' },
  { label: 'Solicitar una cotización', href: '/cotizar/' },
  { label: 'Cómo llegar', href: '/contacto/' },
  { label: 'Aviso de privacidad', href: '/privacidad/' },
  { label: 'Términos y condiciones', href: '/terminos/' },
  { label: 'Accesibilidad', href: '/accesibilidad/' },
] as const;

/** ------------------------------------------------------------------
 *  FOTOGRAFÍA — Unsplash, servida por su CDN.
 *  Cada ID fue revisado visualmente antes de asignarlo.
 *  ------------------------------------------------------------------ */
const UNSPLASH = 'https://images.unsplash.com/';
export function foto(id: string, w = 1200): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&q=75&w=${w}`;
}

export const IMAGES = {
  hero: {
    id: 'photo-1503694978374-8a2fa686963a',
    alt: 'Prensa de impresión offset sacando pliegos impresos a alta velocidad',
  },
  heroAlt: {
    id: 'photo-1572044162444-ad60f128bdea',
    alt: 'Diseñador trabajando en una laptop con abanicos de muestras de color Pantone',
  },
  nosotros: {
    id: 'photo-1585776245991-cf89dd7fc73a',
    alt: 'Máquina de escribir antigua con una hoja puesta, evocando el oficio de la imprenta',
  },
  playera: {
    id: 'photo-1521572163474-6864f9cf17ab',
    alt: 'Persona vistiendo una playera blanca lisa lista para estampar',
  },
  volante: {
    id: 'photo-1580828343064-fde4fc206bc6',
    alt: 'Letras grandes de vinil adhesivo aplicadas sobre el aparador de un local',
  },
  taller: {
    id: 'photo-1611532736597-de2d4265fba3',
    alt: 'Tableta mostrando el diseño de una letra junto a un cuaderno tipográfico naranja',
  },
} as const;

/** ------------------------------------------------------------------
 *  CAPA VISUAL DEL CATÁLOGO — indexada por el slug de data/catalogo.ts
 *  ------------------------------------------------------------------ */
export interface CategoriaUI {
  imagen: string;
  imagenAlt: string;
  /** Fondo pastel de la tarjeta, como los del carrusel de la referencia. */
  tono: 'card1' | 'card2' | 'card3' | 'card4';
  resumen: string;
  descripcion: string;
  aSaber?: string[];
}

/**
 * Cada una de las 16 categorías tiene su propia foto de Unsplash (gratuita,
 * verificada con curl 200 OK antes de usarla — nunca Unsplash+), en estilo
 * mockup de estudio minimalista. Es contenido temporal: el plan es
 * reemplazarlas por fotos reales sacadas de páginas del catálogo en PDF. Ver
 * PENDIENTES.md.
 */
export const CATEGORIAS_UI: Record<string, CategoriaUI> = {
  'notas-formatos-negocio': {
    imagen: 'photo-1623305465231-d884ce752d59',
    imagenAlt: 'Dos hojas de papel en blanco apiladas sobre fondo blanco',
    tono: 'card1',
    resumen: 'Notas de venta, pedidos, comandas y contratos, el día a día de tu negocio.',
    descripcion:
      'Notas de venta, pedidos, comandas, recibos, vales y contratos: lo que se llena, se firma y se archiva todos los días. En 1 o 2 tintas, con tus datos fiscales y tu logotipo.',
    aSaber: [
      'Dinos si lo quieres foliado y desde qué número empieza.',
      'Original y copia, o hasta tres tantos en autocopiante.',
      'Si ya tienes un formato, tráelo: lo respetamos tal cual.',
    ],
  },
  'papeleria-medica-laboratorio': {
    imagen: 'photo-1758691462814-485c3672e447',
    imagenAlt: 'Mano escribiendo en un portapapeles clínico, sin pacientes visibles',
    tono: 'card2',
    resumen: 'Recetarios y formatos para consultorio, clínica y laboratorio.',
    descripcion:
      'Recetarios, órdenes de laboratorio, sobres y bolsas para radiografías. Papelería que lleva cédula profesional, especialidad y domicilio impresos, y que tiene que verse seria porque el paciente se la lleva en la mano.',
    aSaber: [
      'Ten a la mano nombre completo, especialidad y número de cédula.',
      'El recetario se hace en block engomado, tamaño media carta o carta.',
      'Las bolsas para radiografías se cotizan por millar.',
    ],
  },
  'papeleria-corporativa': {
    imagen: 'photo-1621944192383-34519b64a747',
    imagenAlt: 'Dos libretas en blanco tipo mockup sobre fondo gris de estudio',
    tono: 'card3',
    resumen: 'Hojas membretadas para lo que representa a tu empresa por escrito.',
    descripcion:
      'Hojas membretadas en 1 tinta, 2 tintas o selección a color, en los formatos de carta y oficio que maneja tu papelería del día a día.',
    aSaber: [
      'Manda tu logotipo vectorial si lo tienes: se ve más nítido.',
      'Dinos si necesitas más de un tamaño (carta, media carta, 1/3).',
    ],
  },
  sellos: {
    imagen: 'photo-1562330094-4a3730591558',
    imagenAlt: 'Tijeras, un sello de goma y una tarjeta en blanco sobre madera',
    tono: 'card4',
    resumen: 'Sellos automáticos Colop, fechadores y sellos de madera.',
    descripcion:
      'Sellos automáticos Colop en todos sus modelos y tamaños, fechadores y sellos de madera, con tu texto, logo o diseño y troquel de realce si lo pides.',
    aSaber: [
      'Un sello automático se entrega el mismo día en la mayoría de los casos.',
      'Manda el texto exacto del sello, ya revisado.',
      'Tenemos una lámina de medidas reales si no sabes qué tamaño pedir.',
    ],
  },
  'impresion-comercial': {
    imagen: 'photo-1718670013921-2f144aba173a',
    imagenAlt: 'Tarjetas de presentación sobre una superficie de mármol gris',
    tono: 'card3',
    resumen: 'Tarjetas, volantes, trípticos y todo lo que presenta tu marca en papel.',
    descripcion:
      'La cara de tu negocio en papel: tarjetas de presentación, volantes, trípticos, pósters, etiquetas, stickers, gafetes, menús, revistas y folletos. Selección a color o full color, en couché, bond o papel adhesivo según el producto.',
    aSaber: [
      'Si no tienes diseño, lo hacemos contigo aquí mismo.',
      'Entre más tiraje, más baja el costo por pieza.',
      'Elige acabado: mate se siente premium, brillante resalta el color.',
    ],
  },
  'publicidad-exterior-gran-formato': {
    imagen: 'photo-1693031630369-bd429a57f115',
    imagenAlt: 'Impresora industrial de gran formato imprimiendo una lona rosa',
    tono: 'card4',
    resumen: 'Lonas, rótulos, vinil y rotulación para que te vean de lejos.',
    descripcion:
      'Todo lo que se imprime en grande: lonas, banners tipo araña, banderas, toldos en renta, vinil microperforado para ventanas, señalética en corte de vinil, rótulos de negocio, rotulación vehicular y esmerilado.',
    aSaber: [
      'Ten la medida en metros (ancho × alto) antes de pedir precio.',
      'Dinos si va con ojillos, bastilla, dobladillo o bastidor.',
      'Para rotulación de vehículo necesitamos ver la unidad.',
    ],
  },
  dtf: {
    imagen: 'photo-1581655353564-df123a1eb820',
    imagenAlt: 'Playera blanca lisa fotografiada como mockup de producto',
    tono: 'card2',
    resumen: 'Estampado DTF en cualquier tela y color, desde una pieza.',
    descripcion:
      'DTF por tamaño (de 5×7 hasta 1 metro) para playeras, uniformes, gorras, banderas, bolsas, mochilas y hasta respaldos de silla. Conviene en tirajes chicos y diseños a full color.',
    aSaber: [
      'El DTF se estampa sobre cualquier color de tela.',
      'Manda tu logo en la mejor calidad que tengas.',
      'Para tirajes grandes de un solo color, la serigrafía suele salir más barata.',
    ],
  },
  serigrafia: {
    imagen: 'photo-1574365569389-a10d488ca3fb',
    imagenAlt: 'Bolsa de tela blanca reutilizable sobre superficie gris',
    tono: 'card1',
    resumen: 'Playeras, bolsas ecológicas y artículos promocionales en serigrafía.',
    descripcion:
      'Playeras a 1, 2 o 3 tintas, bolsas ecológicas, agendas, planeadores, cilindros, lapiceros, mochilas, pulseras Tyvek y portadas de documentos. Conviene en tirajes grandes.',
    aSaber: [
      'La serigrafía conviene en tirajes grandes; para pocas piezas, mejor DTF.',
      'Anota cuántas piezas por talla.',
      'Cada tinta extra se cotiza aparte.',
    ],
  },
  sublimacion: {
    imagen: 'photo-1650959858546-d09833d5317b',
    imagenAlt: 'Taza de cerámica blanca en render de mockup de producto',
    tono: 'card2',
    resumen: 'Tazas, pulseras y reconocimientos con placa sublimados a full color.',
    descripcion:
      'Tazas de cerámica, pulseras y reconocimientos con placa de aluminio y base de madera, sublimados a todo color. La sublimación es la técnica que permite fotos e imágenes completas, no solo un logo.',
    aSaber: [
      'La sublimación permite full color; el grabado láser es solo una marca.',
      'Sirve desde una sola pieza.',
    ],
  },
  'bordado-uniformes': {
    imagen: 'photo-1671438118097-479e63198629',
    imagenAlt: 'Playera tipo polo blanca colgada en un perchero',
    tono: 'card3',
    resumen: 'Logo bordado en camisas, polos, sudaderas y uniformes de trabajo.',
    descripcion:
      'Camisas, polos, sudaderas, chamarras, gorras, pantalones, filipinas y chalecos de alta visibilidad con tu logo bordado. El bordado aguanta más lavadas que el estampado.',
    aSaber: [
      'Manda tu logo vectorial: el bordado lo digitaliza a puntadas.',
      'Anota cuántas piezas por talla.',
    ],
  },
  'productos-escuela': {
    imagen: 'photo-1516783154360-123b392d0833',
    imagenAlt: 'Composición de útiles escolares y manualidades vista desde arriba',
    tono: 'card4',
    resumen: 'Carpetas, lápices, pines y reconocimientos para el ciclo escolar.',
    descripcion:
      'Carpetas, reglas, pines, lápices con grabado láser, bandas sublimadas, sellos y reconocimientos para escuelas, generaciones y trabajos didácticos.',
    aSaber: [
      'Para generaciones grandes, cotiza con tiempo antes de la ceremonia.',
      'Las bandas y los lápices se personalizan con el nombre de cada alumno.',
    ],
  },
  'grabado-laser': {
    imagen: 'photo-1664714628878-9d2aa898b9e3',
    imagenAlt: 'Botella metálica blanca lisa con tapa negra, mockup de producto',
    tono: 'card1',
    resumen: 'Termos, souvenirs de madera y reconocimientos marcados con láser.',
    descripcion:
      'Termos, souvenirs y tablas de madera para cocina, agendas, carteras y reconocimientos en vidrio, marcados con grabado láser. Es una marca permanente: no se despinta ni se despega.',
    aSaber: [
      'El grabado láser es permanente; la sublimación permite full color.',
      'Para reconocimientos, manda los nombres ya revisados y en su forma final.',
      'Sirve desde una sola pieza.',
    ],
  },
  'eventos-invitaciones': {
    imagen: 'photo-1632610992723-82d7c212f6d7',
    imagenAlt: 'Invitación de boda con sobre, flores y detalles sobre un plato decorativo',
    tono: 'card3',
    resumen: 'Invitaciones de boda, bautizo o comunión, y misales.',
    descripcion:
      'Invitaciones en couché 300 g en todos los tamaños (1/8, 1/4, 1/2 y carta), con doblez o sobre celofán, más misales para boda con portada opalina.',
    aSaber: [
      'Pide tus invitaciones con al menos tres semanas de anticipación.',
      'Trae la redacción final; los cambios después de imprimir son reimpresión.',
    ],
  },
  'eventos-decoracion': {
    imagen: 'photo-1764389814703-9c3699580712',
    imagenAlt: 'Listones de papel en tonos pastel sobre fondo blanco',
    tono: 'card2',
    resumen: 'Menús decorativos, novenarios, abanicos y figuras para decorar tu evento.',
    descripcion:
      'Menús decorativos para bodas, bautizos o comuniones, novenarios, abanicos, oraciones y separadores en couché 300 g, más figuras en coroplast con soporte para decorar el salón.',
    aSaber: [
      'Trae la redacción final revisada; evita reimpresiones de última hora.',
      'Las figuras en coroplast llevan su propio soporte para pararse solas.',
    ],
  },
  'evento-deportivo': {
    imagen: 'photo-1613826488066-5a115a53a1fc',
    imagenAlt: 'Medalla dorada circular sobre superficie blanca',
    tono: 'card4',
    resumen: 'Playeras fullprint, números de corredor y reconocimientos para tu carrera o torneo.',
    descripcion:
      'Playeras fullprint, mochilas en DTF, números de corredor, hojas de registro, lonas y reconocimientos con corte de acrílico y base de madera para carreras y torneos.',
    aSaber: [
      'Los números de corredor se hacen en papel resistente al agua.',
      'Cotiza con tiempo: estos trabajos suelen tener fecha fija de evento.',
    ],
  },
  calendarios: {
    imagen: 'photo-1571497086604-d9f1ce672ba1',
    imagenAlt: 'Calendario blanco y dorado tipo mockup sobre superficie café',
    tono: 'card1',
    resumen: 'Calendarios de pared, de escritorio y con santoral.',
    descripcion:
      'Calendarios con base de cartón grueso e impresión en vinil, doble carta sobre couché 300 g, con santoral, de escritorio o día por día.',
    aSaber: ['Cotiza con tiempo: es un trabajo de temporada, sobre todo hacia fin de año.'],
  },
  'otros-servicios-imprenta': {
    imagen: 'photo-1611532736597-de2d4265fba3',
    imagenAlt: 'Tableta mostrando el diseño de una letra junto a un cuaderno tipográfico naranja',
    tono: 'card1',
    resumen: '¿No lo viste en la lista? Pregúntanos: seguro se puede.',
    descripcion:
      'El catálogo cubre lo que más nos piden, pero no es todo lo que hacemos. Si tienes un trabajo que no encaja claramente en ninguna categoría, o todavía no sabes bien cómo quieres resolverlo, mándanos los detalles y te decimos qué se puede hacer y qué cuesta.',
    aSaber: [
      'Descríbelo con tus palabras: nosotros lo traducimos a proceso.',
      'Una foto o una referencia ayuda más que mil explicaciones.',
    ],
  },
};

const UI_POR_DEFECTO: CategoriaUI = {
  imagen: IMAGES.hero.id,
  imagenAlt: 'Trabajos de imprenta recién salidos de la prensa',
  tono: 'card1',
  resumen: 'Consulta esta categoría del catálogo.',
  descripcion: 'Escríbenos y te cotizamos este trabajo.',
};

export function uiDe(slug: string): CategoriaUI {
  return CATEGORIAS_UI[slug] ?? UI_POR_DEFECTO;
}

export interface Categoria extends CategoriaCatalogo, CategoriaUI {}

export const CATEGORIAS: Categoria[] = CATALOGO.map((c) => ({ ...c, ...uiDe(c.slug) }));

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

/** ------------------------------------------------------------------
 *  CONTENIDO DE LAS SECCIONES DEL HOME
 *  Mismo orden que printshopsolution.com/es/
 *  ------------------------------------------------------------------ */

/** 1. Hero (slider). */
/** 1. Hero único y estático: una sola pieza a pantalla completa, sin carrusel. */
export const HERO = {
  script: 'Para negocios con historia…',
  titulo: 'Impresión que sostiene tu día a día',
  cta: 'Explora el catálogo',
  href: '/catalogo/',
  imagen: IMAGES.hero.id,
  alt: IMAGES.hero.alt,
} as const;

/** 2. Dos paneles promocionales (equivale a "Use su arte con orgullo"). */
export const PROMO_DUO = [
  {
    titulo: 'Lleva tu marca puesta',
    sub: 'Playeras, uniformes y gorras',
    href: '/catalogo/dtf/',
    imagen: IMAGES.playera.id,
    alt: IMAGES.playera.alt,
  },
  {
    titulo: 'Que te vean desde la calle',
    sub: 'Lonas, rótulos y vinil',
    href: '/catalogo/publicidad-exterior-gran-formato/',
    imagen: IMAGES.volante.id,
    alt: IMAGES.volante.alt,
  },
] as const;

/** 5. Banda celeste con imagen (equivale al banner de las 24 horas). */
export const BANNER_SKY = {
  titulo: 'Sellos automáticos listos el mismo día',
  cta: 'Pide el tuyo',
  href: '/catalogo/sellos/',
  imagen: 'photo-1568205612837-017257d2310a',
  alt: 'Lápices de colores acomodados en abanico sobre una superficie blanca',
} as const;

/** 6. "Diseñe su estilo de firma en 3 maneras!" */
export const TRES_MANERAS = [
  {
    titulo: 'Lo diseñamos contigo',
    texto:
      'Desde una tarjeta de presentación hasta una lona: nos sientas, nos cuentas y lo armamos ahí mismo contigo.',
    imagen: 'photo-1572044162444-ad60f128bdea',
    alt: 'Diseñador trabajando con muestras de color sobre el escritorio',
    tono: 'card4',
  },
  {
    titulo: 'Parte de una plantilla',
    texto:
      'Te enseñamos modelos que ya funcionan para tu giro y los personalizamos con tus datos, tus colores y tu logo.',
    imagen: 'photo-1611532736597-de2d4265fba3',
    alt: 'Diseño tipográfico en pantalla junto a un cuaderno impreso',
    tono: 'card1',
  },
  {
    titulo: 'Trae tu archivo',
    texto:
      'Si ya tienes el diseño, mándalo en PDF, AI o CDR. Lo revisamos, te decimos si da la calidad y lo dejamos listo.',
    imagen: 'photo-1554224155-6726b3ff858f',
    alt: 'Documentos impresos revisados sobre un escritorio',
    tono: 'card3',
  },
] as const;

/** Proceso de trabajo, estilo mapa: de que nos escribas a que lo tengas
 *  en tus manos. Es la secuencia real, no una lista de servicios. */
export const PROCESO = [
  {
    numero: '01',
    titulo: 'Nos cuentas qué necesitas',
    texto: 'Por teléfono, WhatsApp o el formulario de aquí abajo. Con una idea general basta para empezar.',
  },
  {
    numero: '02',
    titulo: 'Te asesoramos',
    texto: 'Vemos técnica, papel, acabado y tiempos contigo, para que el precio que te demos sea el que pagues.',
  },
  {
    numero: '03',
    titulo: 'Te cotizamos',
    texto: 'Precio y fecha de entrega exactos, sin compromiso. Tú decides si seguimos.',
  },
  {
    numero: '04',
    titulo: '¡Manos a la obra!',
    texto: 'Lo imprimimos y te avisamos en cuanto está listo, en la fecha que quedamos.',
  },
] as const;

/** 9. "Experiencia 20+ años" → banda celeste con datos del negocio. */
export const EXPERIENCIA = {
  titulo: 'Una imprenta de Ciudad Valles, para los negocios de Ciudad Valles',
  texto:
    'Estamos sobre el Blvd. México - Laredo, en plena Zona Centro. Atendemos consultorios, restaurantes, escuelas, ferreterías y constructoras: dieciséis categorías de catálogo, tiraje mínimo de una pieza y la entrega en la fecha que prometimos.',
  cta: 'Hablemos',
  href: '/contacto/',
} as const;

/** 12. "Nuevas llegadas" — tres mosaicos a sangre. */
export const MOSAICO = [
  {
    titulo: 'Invitaciones y eventos',
    href: '/catalogo/eventos-invitaciones/',
    imagen: 'photo-1519225421980-715cb0215aed',
    alt: 'Mesa de banquete decorada para una boda',
  },
  {
    titulo: 'Tazas y termos grabados',
    href: '/catalogo/grabado-laser/',
    imagen: 'photo-1544787219-7f47ccb76574',
    alt: 'Taza blanca sobre una base de madera junto a unas galletas',
  },
  {
    titulo: 'Menús para restaurante',
    href: '/catalogo/impresion-comercial/',
    imagen: 'photo-1512909006721-3d6018887383',
    alt: 'Comedor de un restaurante con las mesas montadas',
  },
] as const;

/** 13. Tres distintivos (equivale a Envío gratuito / Garantía / Precio). */
export const DISTINTIVOS = [
  {
    titulo: 'Entrega local',
    imagen: 'photo-1595246140625-573b715d11dc',
    alt: 'Cajas de cartón listas para entrega sobre fondo claro',
  },
  {
    titulo: 'Desde una pieza',
    imagen: 'photo-1544787219-7f47ccb76574',
    alt: 'Taza blanca personalizada sobre una base de madera',
  },
  {
    titulo: 'Diseño incluido',
    imagen: 'photo-1572044162444-ad60f128bdea',
    alt: 'Diseñador trabajando con muestras de color Pantone',
  },
] as const;

/** 14. "Únete a la Liga de Marcas" → giros que atendemos. */
export const GIROS = [
  'Consultorios',
  'Restaurantes',
  'Escuelas',
  'Ferreterías',
  'Constructoras',
  'Hoteles',
  'Farmacias',
  'Talleres',
] as const;

/** 16. Dos tarjetas de cierre sobre banda celeste. */
export const CTA_DUO = [
  {
    icono: 'documento',
    texto: '¿Listo para arrancar tu trabajo de impresión? Cuéntanos qué necesitas y te cotizamos sin compromiso.',
    boton: 'Pedir cotización',
    href: '/cotizar/',
  },
  {
    icono: 'persona',
    texto: '¿No tienes diseño todavía? Lo armamos contigo antes de imprimir, incluido en el trabajo.',
    boton: 'Hablar con diseño',
    href: '/contacto/',
  },
] as const;

/**
 * Reseñas REALES, tomadas de Google Maps (capturas de pantalla del propio
 * negocio, no inventadas). Antes este array traía cuatro testimonios de
 * ejemplo con nombres y negocios ficticios — nunca deben volver: atribuirle
 * una cita a una persona que no la escribió es publicidad engañosa, no
 * relleno de maqueta.
 *
 * Google no expone el giro del autor en la reseña, así que `rol` no inventa
 * uno: se limita a decir que es una reseña de Google.
 */
export const TESTIMONIOS = [
  {
    autor: 'Olga Jones',
    rol: 'Reseña en Google · 5 estrellas',
    texto: 'Aspectos positivos: capacidad de respuesta, calidad, profesionalidad y valor.',
  },
  {
    autor: 'Lalo Saab',
    rol: 'Reseña en Google · 5 estrellas',
    texto: 'Empresa con muchos años de experiencia.',
  },
  {
    autor: 'Inessa Muñoz',
    rol: 'Reseña en Google · 5 estrellas',
    texto: 'Amable atención y apoyo con la facturación electrónica.',
  },
] as const;

export const FAQS_HOME = [
  {
    q: '¿Cuánto tardan en entregar?',
    a: 'Depende del trabajo. Un sello automático o unas tarjetas pueden salir el mismo día o al siguiente; una lona, en uno o dos días; playeras y uniformes, entre tres y cinco días según la cantidad. Al cotizarte te damos la fecha exacta, y esa es la que cumplimos.',
  },
  {
    q: '¿Tengo que traer el diseño hecho?',
    a: 'No. Si ya tienes el archivo lo revisamos y lo preparamos para impresión; si no lo tienes, lo diseñamos contigo sin costo aparte en la mayoría de los trabajos. En ambos casos te mandamos una prueba para tu aprobación antes de imprimir.',
  },
  {
    q: '¿Cuál es el mínimo que puedo pedir?',
    a: 'En tazas, termos, reconocimientos, playeras y sellos trabajamos desde una pieza. En papelería como notas de venta o recetarios el mínimo suele ser un block o un millar, porque el costo está en la preparación de la máquina, no en el papel.',
  },
  {
    q: '¿En qué formato les mando mi archivo?',
    a: 'Lo ideal es PDF, AI o CDR en alta resolución y con el texto convertido a curvas. Si solo tienes una imagen JPG o PNG, mándala en el tamaño más grande que tengas y la revisamos: te decimos de inmediato si da la calidad para el tamaño que quieres.',
  },
  {
    q: '¿Hacen envíos a otras ciudades?',
    a: 'Atendemos principalmente Ciudad Valles y la Huasteca Potosina, y también nos llegan pedidos de Tamuín, El Naranjo, Tamazunchale y la zona de Tampico. El envío se cotiza aparte según el volumen y el destino.',
  },
  {
    q: '¿Cómo se paga?',
    a: 'Para pedidos personalizados pedimos un anticipo al aprobar la prueba y el resto contra entrega. Aceptamos efectivo, transferencia y tarjeta.',
  },
] as const;

export const CIUDADES_SUGERIDAS = [
  'Ciudad Valles',
  'Tamuín',
  'El Naranjo',
  'Tanquián de Escobedo',
  'Aquismón',
  'Tamazunchale',
  'Xilitla',
  'Tampico',
  'San Luis Potosí',
] as const;

export function faqPageSchema(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
