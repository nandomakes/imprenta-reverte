/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // Azul profesional — la referencia (printshopsolution) vive del
        // contraste azul intenso sobre mucho blanco.
        brand: '#1B4DB1', // azul principal: CTAs, enlaces, acentos
        brandDk: '#153C8C', // hover / pressed
        brandLt: '#EAF0FB', // superficie azul pálida (tarjetas, badges)
        ink: '#0E1726', // azul casi negro: fondos oscuros, títulos
        slate: '#1B2740', // superficie oscura elevada
        line: '#E3E8F0', // hairlines sobre claro
        lineDk: '#25324D', // hairlines sobre oscuro
        paper: '#FFFFFF',
        mist: '#F6F8FC', // fondo de sección alterno
        ash: '#8A94A6', // texto atenuado
        char: '#3A4459', // texto de cuerpo
        // Acento cálido: SOLO para el botón "Cotiza ahora", para que el CTA
        // no se confunda con los enlaces azules.
        accent: '#F3701B',
        accentDk: '#D45C0C',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};
