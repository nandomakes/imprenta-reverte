/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // Paleta tomada directamente de printshopsolution.com/es/ con
        // getComputedStyle sobre el sitio en vivo, no a ojo.
        brand: '#0221C4', // rgb(2,33,196) — botones, footer, enlaces
        brandDk: '#011a9c',
        accent: '#E00087', // rgb(224,0,135) — magenta del CTA principal
        accentDk: '#b8006e',
        sky: '#D9F6FF', // rgb(217,246,255) — bandas celestes
        cream: '#FDEBDD', // fondo del hero
        mist: '#F4F4F4', // rgb(244,244,244) — secciones grises
        mist2: '#F8F8F8',
        ink: '#3D3D3D', // rgb(61,61,61) — color de texto del body
        ash: '#767676',
        line: '#E6E6E6',
        // Fondos pastel de las tarjetas de producto del carrusel.
        card1: '#FCE4EC',
        card2: '#DEF5F3',
        card3: '#E8EAF6',
        card4: '#FDF3DE',
      },
      fontFamily: {
        // Quicksand es LA fuente del sitio de referencia (redondeada,
        // geométrica). Se usa para absolutamente todo menos el titular
        // manuscrito del hero.
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
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
