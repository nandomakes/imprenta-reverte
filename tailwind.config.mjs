/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // SISTEMA DE COLOR — "Editorial Mexican Heritage + Contemporary Digital Craft"
        //
        // Proporción buscada: ~70% blanco/papel · 20% navy · 7% mist · 3% oro.
        // White/paper = espacio · navy = estructura · oro = acento · CMYK = firma.

        // NAVY — confianza, autoridad, profundidad. Color institucional.
        brand: '#0B2545',
        brandDk: '#071A33',

        // ORO — legado, calidad, firma de marca. SIGNATURE ACCENT, nunca dominante.
        // Plano, sin degradados: no se imita el cromado del logo.
        // Contrastes medidos: sobre blanco 2.4:1 y sobre papel 2.2:1 → NO sirve
        // como texto. Con texto navy encima da 6.5:1 → esa es la única
        // combinación válida para el botón secundario.
        accent: '#C8A44D',
        accentDk: '#B08E3C',

        // PAPEL — impresión, oficio, materialidad. Es el fondo alterno del sitio.
        paper: '#FAF7F2',
        // MIST — azul-gris editorial para bloques institucionales y de
        // transición. Se usa con cuentagotas.
        mist: '#EDF2F7',

        // TEXTO
        ink: '#111827', // 17.7:1 sobre blanco
        ash: '#667085', // 4.97:1 sobre blanco · 4.66:1 sobre papel
        line: '#E3E8EF', // filete, de la familia del navy

        // CMYK del logo, medido sobre el PNG. Firma gráfica de imprenta.
        cmykC: '#0090D8',
        cmykM: '#D80078',
        cmykY: '#F0D818',
        cmykK: '#111111',

        // Fondos pastel de las tarjetas de producto del carrusel.
        card1: '#FCE4EC',
        card2: '#DEF5F3',
        card3: '#E8EAF6',
        card4: '#FDF3DE',
      },
      fontFamily: {
        // Única familia del sitio: título, texto, navegación y botones.
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1360px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};
