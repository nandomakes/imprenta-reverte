/**
 * Fuente única de contenido del sitio.
 *
 * El CATÁLOGO no vive aquí: vive en `src/data/catalogo.ts`, transcrito y
 * verificado contra el PDF. Este archivo le añade la capa visual y todo el
 * copy de las secciones.
 *
 * La ESTRUCTURA y el sistema visual replican printshopsolution.com/es/:
 * mismo orden de secciones, misma tipografía (Quicksand), y colores tomados
 * con getComputedStyle del sitio en vivo — no aproximados a ojo.
 */

import { CATALOGO, type CategoriaCatalogo } from './data/catalogo';

export const SITE = {
  brand: 'Imprenta Reverte',
  role: 'Imprenta',
  city: 'Ciudad Valles',
  region: 'San Luis Potosí',
  url: 'https://www.imprentareverte.com',
  themeColor: '#0221C4',
  title: 'Imprenta Reverte | Imprenta en Ciudad Valles, SLP',
  description:
    'Imprenta en Ciudad Valles, SLP. Papelería comercial y médica, lonas y gran formato, playeras, grabado láser, sellos e impresión para eventos. Cotiza ahora al 481 381 6663.',
  tagline: 'Transforma tu idea en impreso, en cualquier momento, en cualquier lugar.',
} as const;

/** El CTA del sitio. Una sola etiqueta, en todas partes, sin variantes. */
export const CTA_LABEL = 'Cotiza ahora';

export const PHONE_DISPLAY = '481 381 6663';
export const PHONE_TEL = '+524813816663';
export const EMAIL = 'contacto@imprentareverte.com';
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
  hoursText: 'Lunes a viernes 9:00–19:00 · Sábado 9:00–14:00',
  hoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
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
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
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
export const NAV: { label: string; href: string; hijos?: string[] }[] = [
  { label: 'Todo el catálogo', href: '/catalogo/' },
  {
    label: 'Papelería',
    href: '/catalogo/papeleria-comercial-corporativa/',
    hijos: ['papeleria-comercial-corporativa', 'papeleria-medica-laboratorio'],
  },
  {
    label: 'Publicidad',
    href: '/catalogo/publicidad-identidad-visual/',
    hijos: ['publicidad-identidad-visual'],
  },
  {
    label: 'Gran formato',
    href: '/catalogo/impresion-gran-formato-senaletica/',
    hijos: ['impresion-gran-formato-senaletica'],
  },
  {
    label: 'Textil y promocionales',
    href: '/catalogo/impresion-textil-promocionales/',
    hijos: ['impresion-textil-promocionales'],
  },
  {
    label: 'Grabado láser',
    href: '/catalogo/grabado-laser-sublimacion-rigidos/',
    hijos: ['grabado-laser-sublimacion-rigidos'],
  },
  {
    label: 'Oficina y eventos',
    href: '/catalogo/sellos-articulos-oficina/',
    hijos: ['sellos-articulos-oficina', 'impresion-eventos', 'otros-servicios-imprenta'],
  },
];

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

export const CATEGORIAS_UI: Record<string, CategoriaUI> = {
  'papeleria-comercial-corporativa': {
    imagen: 'photo-1554224155-6726b3ff858f',
    imagenAlt: 'Formatos y facturas impresos sobre un escritorio junto a una calculadora',
    tono: 'card1',
    resumen: 'Los formatos con los que tu negocio opera todos los días.',
    descripcion:
      'Notas de venta, comandas, recibos, contratos y hoja membretada: lo que se llena, se firma y se archiva. Lo imprimimos foliado, en original y copias, en block engomado o en talonario, con tus datos fiscales y tu logotipo.',
    aSaber: [
      'Dinos si lo quieres foliado y desde qué número empieza.',
      'Original y copia, o hasta tres tantos en autocopiante.',
      'Si ya tienes un formato, tráelo: lo respetamos tal cual.',
    ],
  },
  'papeleria-medica-laboratorio': {
    imagen: 'photo-1576091160550-2173dba999ef',
    imagenAlt: 'Estetoscopio sobre un escritorio junto a una persona escribiendo en una laptop',
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
  'publicidad-identidad-visual': {
    imagen: 'photo-1572044162444-ad60f128bdea',
    imagenAlt: 'Diseñador trabajando en una laptop con abanicos de muestras de color Pantone',
    tono: 'card3',
    resumen: 'Tarjetas, volantes, trípticos y todo lo que presenta tu marca.',
    descripcion:
      'La cara de tu negocio en papel: tarjetas de presentación, volantes, trípticos, pósters, etiquetas, stickers, gafetes y menús. Full color por ambos lados, en papel couché, opalina o sulfatado, con acabado mate o brillante.',
    aSaber: [
      'Si no tienes diseño, lo hacemos contigo aquí mismo.',
      'Entre más tiraje, más baja el costo por pieza.',
      'Elige acabado: mate se siente premium, brillante resalta el color.',
    ],
  },
  'impresion-gran-formato-senaletica': {
    imagen: 'photo-1580828343064-fde4fc206bc6',
    imagenAlt: 'Letras grandes de vinil adhesivo aplicadas sobre el aparador de un local',
    tono: 'card4',
    resumen: 'Lonas, rótulos, vinil y rotulación para que te vean de lejos.',
    descripcion:
      'Todo lo que se imprime en grande: lonas, banners tipo araña, banderas, toldos, vinil para ventanas, señalética en corte de vinil, rótulos de negocio y rotulación vehicular. Se cotiza por metro cuadrado y se entrega listo para colgar o instalar.',
    aSaber: [
      'Ten la medida en metros (ancho × alto) antes de pedir precio.',
      'Dinos si va con ojillos, bastilla, dobladillo o bastidor.',
      'Para rotulación de vehículo necesitamos ver la unidad.',
    ],
  },
  'impresion-textil-promocionales': {
    imagen: 'photo-1523381210434-271e8be1f52b',
    imagenAlt: 'Playeras lisas colgadas en ganchos de madera sobre un burro de ropa',
    tono: 'card2',
    resumen: 'Playeras, uniformes, gorras y bolsas con tu logotipo.',
    descripcion:
      'Estampado sobre tela: playeras en DTF, sublimación o serigrafía, playeras full print, uniformes, gorras, mochilas, bolsas ecológicas y tote bags, cubrecuellos y manteles de tela. Desde una pieza para un regalo hasta el uniforme de toda la plantilla.',
    aSaber: [
      'Manda tu logo en la mejor calidad que tengas (vectorial de preferencia).',
      'Anota cuántas piezas por talla.',
      'La serigrafía conviene en tirajes grandes; el DTF, en pocos y a full color.',
    ],
  },
  'grabado-laser-sublimacion-rigidos': {
    imagen: 'photo-1567016526105-22da7c13161a',
    imagenAlt: 'Termo metálico liso de color verde sobre fondo blanco',
    tono: 'card1',
    resumen: 'Tazas, termos, placas y reconocimientos personalizados.',
    descripcion:
      'Marcado sobre objetos rígidos: tazas sublimadas, termos, vasos y cilindros con grabado láser, reconocimientos en acrílico, vidrio o madera, placas metálicas y para nicho, medallas y souvenirs. El grabado láser no se despinta ni se despega: queda marcado en el material.',
    aSaber: [
      'El grabado láser es permanente; la sublimación permite full color.',
      'Para reconocimientos, manda los nombres ya revisados y en su forma final.',
      'Sirve desde una sola pieza.',
    ],
  },
  'sellos-articulos-oficina': {
    imagen: 'photo-1568205612837-017257d2310a',
    imagenAlt: 'Lápices de colores acomodados en abanico sobre una superficie blanca',
    tono: 'card4',
    resumen: 'Sellos Colop, fechadores, agendas, carpetas y artículos escolares.',
    descripcion:
      'Sellos automáticos Colop y de madera, fechadores, troqueles de realce, más agendas y planeadores, carpetas, reglas, lapiceros, pines, pulseras Tyvek y portadas para tesis y documentos. El día a día de la oficina y el ciclo escolar.',
    aSaber: [
      'Un sello automático se entrega el mismo día en la mayoría de los casos.',
      'Manda el texto exacto del sello, ya revisado.',
      'Las portadas de tesis se hacen por pieza, no por tiraje.',
    ],
  },
  'impresion-eventos': {
    imagen: 'photo-1519225421980-715cb0215aed',
    imagenAlt: 'Mesa larga montada para un banquete de boda con flores y servilletas',
    tono: 'card3',
    resumen: 'Invitaciones, menús, novenarios y todo para tu evento.',
    descripcion:
      'Bodas, bautizos, primeras comuniones, novenarios y también carreras y torneos: invitaciones, menús decorativos, abanicos, manteles de papel, calendarios, números de corredor, hojas de registro y figuras en coroplast para decorar.',
    aSaber: [
      'Pide tus invitaciones con al menos tres semanas de anticipación.',
      'Trae la redacción final; los cambios después de imprimir son reimpresión.',
      'Los números de corredor se hacen en papel resistente al agua.',
    ],
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
export const HERO_SLIDES = [
  {
    script: 'Para negocios con historia…',
    titulo: 'Impresión que sostiene tu día a día',
    cta: 'Explora el catálogo',
    href: '/catalogo/',
    imagen: IMAGES.hero.id,
    alt: IMAGES.hero.alt,
  },
  {
    script: 'De la idea al papel…',
    titulo: 'Diseñamos contigo antes de imprimir',
    cta: 'Cómo trabajamos',
    href: '/#tres-maneras',
    imagen: IMAGES.heroAlt.id,
    alt: IMAGES.heroAlt.alt,
  },
] as const;

/** 2. Dos paneles promocionales (equivale a "Use su arte con orgullo"). */
export const PROMO_DUO = [
  {
    titulo: 'Lleva tu marca puesta',
    sub: 'Playeras, uniformes y gorras',
    href: '/catalogo/impresion-textil-promocionales/',
    imagen: IMAGES.playera.id,
    alt: IMAGES.playera.alt,
  },
  {
    titulo: 'Que te vean desde la calle',
    sub: 'Lonas, rótulos y vinil',
    href: '/catalogo/impresion-gran-formato-senaletica/',
    imagen: IMAGES.volante.id,
    alt: IMAGES.volante.alt,
  },
] as const;

/** 5. Banda celeste con imagen (equivale al banner de las 24 horas). */
export const BANNER_SKY = {
  titulo: 'Sellos automáticos listos el mismo día',
  cta: 'Pide el tuyo',
  href: '/catalogo/sellos-articulos-oficina/',
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

/** 9. "Experiencia 20+ años" → banda celeste con datos del negocio. */
export const EXPERIENCIA = {
  titulo: 'Una imprenta de Ciudad Valles, para los negocios de Ciudad Valles',
  texto:
    'Estamos sobre el Blvd. México - Laredo, en plena Zona Centro. Atendemos consultorios, restaurantes, escuelas, ferreterías y constructoras: nueve categorías de catálogo, tiraje mínimo de una pieza y la entrega en la fecha que prometimos.',
  cta: 'Hablemos',
  href: '/contacto/',
} as const;

/** 12. "Nuevas llegadas" — tres mosaicos a sangre. */
export const MOSAICO = [
  {
    titulo: 'Invitaciones y eventos',
    href: '/catalogo/impresion-eventos/',
    imagen: 'photo-1519225421980-715cb0215aed',
    alt: 'Mesa de banquete decorada para una boda',
  },
  {
    titulo: 'Tazas y termos grabados',
    href: '/catalogo/grabado-laser-sublimacion-rigidos/',
    imagen: 'photo-1544787219-7f47ccb76574',
    alt: 'Taza blanca sobre una base de madera junto a unas galletas',
  },
  {
    titulo: 'Menús para restaurante',
    href: '/catalogo/publicidad-identidad-visual/',
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

export const TESTIMONIOS = [
  {
    autor: 'Laura Medina',
    rol: 'Consultorio dental, Zona Centro',
    texto:
      'Les encargué recetarios y tarjetas. Me mandaron la prueba el mismo día y quedaron tal cual los pedí. Ya es la tercera vez que vuelvo.',
  },
  {
    autor: 'Ricardo Ávalos',
    rol: 'Ferretería, Ciudad Valles',
    texto:
      'Necesitaba una lona de 3×2 para el frente del negocio y la tuve en dos días. El color quedó igualito al de mi logo.',
  },
  {
    autor: 'Sofía Hernández',
    rol: 'Organizadora de eventos',
    texto:
      'Trabajo mucho con ellos para invitaciones y menús. Cumplen la fecha, que en eventos es lo único que de verdad importa.',
  },
  {
    autor: 'Juan Carlos Reyes',
    rol: 'Escuela secundaria, Tamuín',
    texto:
      'Pedimos 120 playeras para la generación. Nos ayudaron con el diseño y salieron a tiempo para la ceremonia.',
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
