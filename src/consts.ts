/**
 * Fuente única de contenido del sitio.
 *
 * Los componentes son presentación pura y no llevan texto propio: todo lo que
 * se lee en pantalla sale de aquí. Cambiar un teléfono, una foto o un titular
 * es editar este archivo, no diez plantillas.
 *
 * El CATÁLOGO no vive aquí: vive en `src/data/catalogo.ts`, transcrito y
 * verificado contra el PDF. Este archivo solo le añade la CAPA VISUAL
 * (foto, resumen, proceso, FAQ) indexada por slug — así una corrección al
 * catálogo real nunca se pierde entre decisiones de diseño.
 */

import { CATALOGO, type CategoriaCatalogo } from './data/catalogo';

export const SITE = {
  brand: 'Imprenta Reverte',
  role: 'Imprenta',
  city: 'Ciudad Valles',
  region: 'San Luis Potosí',
  url: 'https://www.imprentareverte.com',
  themeColor: '#1B4DB1',
  title: 'Imprenta Reverte | Imprenta en Ciudad Valles, SLP',
  description:
    'Imprenta en Ciudad Valles, SLP. Papelería comercial y médica, lonas y gran formato, playeras, grabado láser, sellos e impresión para eventos. Cotiza ahora al 481 381 6663.',
  tagline: 'Todo lo que tu negocio necesita impreso, en un solo lugar.',
} as const;

/** El CTA del sitio. Una sola etiqueta, en todas partes, sin variantes. */
export const CTA_LABEL = 'Cotiza ahora';

export const PHONE_DISPLAY = '481 381 6663';
export const PHONE_TEL = '+524813816663';
/** WhatsApp usa el número en formato internacional sin signos. */
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

export const SOCIALS: { label: string; href: string }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'WhatsApp', href: WHATSAPP_URL },
];

export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/catalogo/' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/contacto/' },
] as const;

/**
 * Fotografía: Unsplash por URL remota (los parámetros `w`/`q`/`auto=format`
 * los sirve su propio CDN, así que no hay que descargar ni optimizar nada en
 * el build). Cada ID fue verificado visualmente antes de asignarlo, para que
 * el `alt` describa de verdad lo que se ve.
 */
const UNSPLASH = 'https://images.unsplash.com/';
export function foto(id: string, w = 1200): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&q=75&w=${w}`;
}

export const IMAGES = {
  hero: {
    id: 'photo-1503694978374-8a2fa686963a',
    alt: 'Prensa de impresión offset sacando pliegos impresos a alta velocidad',
  },
  nosotros: {
    id: 'photo-1585776245991-cf89dd7fc73a',
    alt: 'Máquina de escribir antigua con una hoja puesta, evocando el oficio de la imprenta',
  },
} as const;

/** ---------------------------------------------------------------------
 *  CAPA VISUAL DEL CATÁLOGO
 *  Indexada por el slug de `data/catalogo.ts`. Si falta una entrada, la
 *  página de esa categoría sigue funcionando con valores por defecto.
 *  ------------------------------------------------------------------ */
export interface CategoriaUI {
  /** ID de Unsplash, verificado a ojo contra la categoría. */
  imagen: string;
  imagenAlt: string;
  /** Una línea para la tarjeta del grid. */
  resumen: string;
  /** Uno o dos párrafos para la página de la categoría. */
  descripcion: string;
  /** Lo que el cliente debería traer o decidir antes de cotizar. */
  aSaber?: string[];
}

export const CATEGORIAS_UI: Record<string, CategoriaUI> = {
  'papeleria-comercial-corporativa': {
    imagen: 'photo-1554224155-6726b3ff858f',
    imagenAlt: 'Formatos y facturas impresos sobre un escritorio junto a una calculadora',
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
  resumen: 'Consulta esta categoría del catálogo.',
  descripcion: 'Escríbenos y te cotizamos este trabajo.',
};

export function uiDe(slug: string): CategoriaUI {
  return CATEGORIAS_UI[slug] ?? UI_POR_DEFECTO;
}

/** Categoría + su capa visual, que es lo que consumen las plantillas. */
export interface Categoria extends CategoriaCatalogo, CategoriaUI {}

export const CATEGORIAS: Categoria[] = CATALOGO.map((c) => ({ ...c, ...uiDe(c.slug) }));

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

/** ------------------------------------------------------------------ */

export const VENTAJAS = [
  {
    titulo: 'Aquí mismo, en Ciudad Valles',
    texto:
      'No mandamos tu trabajo a otra ciudad. Se imprime aquí, lo revisas aquí y lo recoges aquí el día acordado.',
  },
  {
    titulo: 'Desde una pieza',
    texto:
      'Una taza para un regalo o mil volantes para una campaña: el tiraje chico también nos interesa.',
  },
  {
    titulo: 'Diseño incluido',
    texto:
      '¿No tienes archivo? Lo armamos contigo antes de imprimir y te mandamos la prueba para tu visto bueno.',
  },
  {
    titulo: 'Te decimos si no conviene',
    texto:
      'Si hay un material o un proceso que te sale mejor para lo que necesitas, te lo decimos aunque cueste menos.',
  },
] as const;

export const PASOS = [
  {
    numero: '01',
    titulo: 'Nos cuentas qué necesitas',
    texto:
      'Por el formulario, por teléfono o pasando al local. Con que sepas qué es y cuántos quieres, empezamos.',
  },
  {
    numero: '02',
    titulo: 'Cotizamos y ajustamos el diseño',
    texto:
      'Te pasamos precio y tiempo de entrega. Si traes archivo lo revisamos; si no, lo diseñamos contigo.',
  },
  {
    numero: '03',
    titulo: 'Apruebas la prueba e imprimimos',
    texto:
      'Nada entra a máquina sin tu visto bueno. Una vez aprobado, imprimimos y te avisamos cuando esté listo.',
  },
] as const;

export const DESTACADOS = [
  { nombre: 'Tarjetas de presentación', categoria: 'publicidad-identidad-visual', imagen: 'photo-1611532736597-de2d4265fba3', alt: 'Diseño tipográfico en pantalla junto a un cuaderno impreso' },
  { nombre: 'Lonas publicitarias', categoria: 'impresion-gran-formato-senaletica', imagen: 'photo-1580828343064-fde4fc206bc6', alt: 'Rotulación de gran tamaño en el aparador de un negocio' },
  { nombre: 'Playeras y uniformes', categoria: 'impresion-textil-promocionales', imagen: 'photo-1521572163474-6864f9cf17ab', alt: 'Persona vistiendo una playera blanca lisa lista para estampar' },
  { nombre: 'Tazas y termos', categoria: 'grabado-laser-sublimacion-rigidos', imagen: 'photo-1544787219-7f47ccb76574', alt: 'Taza blanca sobre una base de madera junto a unas galletas' },
  { nombre: 'Recetarios médicos', categoria: 'papeleria-medica-laboratorio', imagen: 'photo-1576091160550-2173dba999ef', alt: 'Estetoscopio y laptop en el escritorio de un consultorio' },
  { nombre: 'Menús para restaurante', categoria: 'publicidad-identidad-visual', imagen: 'photo-1512909006721-3d6018887383', alt: 'Comedor de un restaurante con las mesas montadas' },
  { nombre: 'Invitaciones de boda', categoria: 'impresion-eventos', imagen: 'photo-1519225421980-715cb0215aed', alt: 'Mesa de banquete decorada para una boda' },
  { nombre: 'Etiquetas para botellas', categoria: 'publicidad-identidad-visual', imagen: 'photo-1571781926291-c477ebfd024b', alt: 'Envases de producto con etiqueta impresa sobre fondo de color' },
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

/** Ciudades sugeridas en el campo "Ciudad" del formulario. */
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

/** JSON-LD de FAQPage — mismo helper que usa cada página con preguntas. */
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
