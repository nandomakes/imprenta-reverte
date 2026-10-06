# Pendientes

Lo que queda por hacer, para no perderlo entre sesiones. Cuando algo se cierre,
se borra de aquí (el historial ya está en git).

## Bloqueado: necesito datos o accesos tuyos

- [ ] **Ficha de Google Business (auditoría local del 2026-10-05).** Todo
      esto se hace en el panel de GBP, no en el código:
      - Sitio web de la ficha → `https://www.imprentareverte.com` (hoy manda
        a revertefacturaelectronica.com, que ya no existe).
      - La web se queda con el teléfono 481 100 1369 y el sábado 9:00–14:00
        (decisión del 2026-10-05): hay que cambiar la **ficha** para que
        coincida (hoy dice 481 381 6663 y sábado hasta 14:30).
      - Dirección oficial: Blvd. Mexico - Laredo 86-SUR, Zona Centro, 79080
        Cdad. Valles, S.L.P. (la web ya usa el CP 79080).
      - Categorías secundarias, 30–50 fotos reales, Google Posts semanales y
        plan de reseñas (hoy 3.6★ · 19 reseñas, 5 de 1★: responderlas).

- [ ] **Envío por correo (Resend) — decidir y configurar.** Hoy el sitio avisa
      SOLO por Telegram: `QUOTE_TO_EMAIL` y `QUOTE_FROM_EMAIL` están vacíos en
      `.env`, y sin ellos el paso del correo se salta (el lead no se pierde —
      queda en el log del servidor y el visitante ve la página de gracias
      igual). Para reactivarlo hay que decidir el remitente, y ojo: **Resend no
      deja enviar desde una dirección de Gmail**, necesita un dominio propio
      verificado. Dos caminos:
      - Verificar `imprentareverte.com` en Resend y usar
        `QUOTE_FROM_EMAIL=cotizaciones@imprentareverte.com` con
        `QUOTE_TO_EMAIL=reverteimprenta@gmail.com`.
      - Para probar sin dominio: `QUOTE_FROM_EMAIL=onboarding@resend.dev`
        (remitente de pruebas de Resend) y el Gmail como destino.

- [ ] **Google Analytics y Search Console.** El código ya está: falta poner
      en Vercel `PUBLIC_GA_ID` (y `PUBLIC_GSC_VERIFICATION` si se verifica
      por etiqueta HTML) y volver a desplegar. Ver `.env.example`.

- [ ] **Dominio sin www.** `imprentareverte.com` (sin www) responde 200 con
      la misma página en vez de redirigir a `www.`. El canonical evita el
      contenido duplicado, pero lo correcto es que en Vercel → Settings →
      Domains el dominio sin www quede como "Redirect to www" (308).

- [ ] **Actualizar Astro 5 → 7.** `npm audit` marca vulnerabilidades en Astro
      5 que solo se corrigen en la 7 (con Tailwind 4 y el adaptador de Vercel
      11: cambio mayor). Revisadas una por una, ninguna es explotable hoy en
      este sitio — es estático salvo /api/cotizar, que no renderiza HTML, y
      las imágenes se procesan al construir, con archivos propios — pero
      conviene migrar con calma y probar todo, no a las prisas.

- [ ] **Fotos reales del catálogo y del portafolio.** Mencionaste que vas a
      convertir el PDF a imágenes (hojas completas) y luego a fotos por
      producto. Mientras tanto, el sitio ya no usa placeholders: las 16
      categorías (`CATEGORIAS_UI` en `src/consts.ts`), los 6 rubros de
      "Qué imprimimos" (`NAV`) y las 9 piezas de "Impresos"
      (`src/components/Portafolio.astro`) tienen fotos reales de Unsplash
      (gratuitas, verificadas una por una), estilo mockup minimalista de
      estudio con fondo claro. Cuando tengas las imágenes reales, reemplázalas
      ahí mismo, sección por sección.
      - Dos piezas de "Impresos" (`Rotulación vehicular` y `Sellos
        personalizados`) repiten a propósito la foto de su categoría del
        catálogo: tras buscar bastante, no apareció ninguna foto gratuita de
        esos dos temas que además tuviera fondo claro y se viera profesional
        (las alternativas eran de noche, en blanco y negro sobre madera
        oscura, o arte callejero). Estas dos son las primeras que deberían
        reemplazarse en cuanto haya fotos reales.
      - **Ya resuelto:** el flujo `/bio/catalogo/` quedó en 3 pasos — rubro →
        subcategoría real del PDF (32, no 16: el PDF divide más fino que el
        sitio, p. ej. "Impresión Comercial" son 8 PDFs separados) → el PDF se
        abre directo en pestaña nueva. Los 32 archivos viven en
        `public/catalogo-pdf/` y el mapeo está en `CATALOGO_PDF`
        (`src/consts.ts`). Si agregas o renombras un PDF, solo hay que tocar
        ese array — no hace falta ninguna página nueva.

## Decisiones tuyas pendientes

- [ ] **¿De dónde sale el dorado?** El sistema dice "el dorado del logo", pero
      en los dos PNG no hay dorado: midiéndolos solo salen negro, cian
      `#0090D8`, magenta `#D80078` y amarillo `#F0F018` (la diana CMYK). Puse un
      oro elegido, `#C8A44D`, que funciona con el navy. Si tienes una versión
      del logo en dorado, pásamela y ajusto el token `accent` al valor real.

- [ ] **Revisar el branding pass.** Cormorant quedó reducida al título de las
      páginas interiores, 404 y gracias; el home es 100% DM Sans. Dale una pasada
      a `/catalogo/` y `/cotizar/` y dime si ahí también sobra el serif.

- [ ] **El hero perdió la segunda diapositiva.** Al pasar a hero único quedó
      fuera el mensaje «De la idea al papel… / Diseñamos contigo antes de
      imprimir», con su CTA a `/#tres-maneras`. El texto sigue en el historial
      de git por si lo quieres recolocar en otra sección.

- [ ] **Extender la firma CMYK.** Hoy son tres piezas: el filete de registro de
      la barra promo, la diana en la sección de giros, y los bullets de esa
      misma sección. Quedan por explorar loaders y detalles del footer —
      siempre en dosis de firma, nunca como patrón repetido.

- [ ] **Revisar el nuevo home.** Quedó: hero → nosotros → servicios →
      portafolio (con placeholders) → proceso → reseñas → marcas que confían →
      formulario → mapa → footer, siguiendo el patrón de colorciti.com.mx. Los
      componentes de la estructura anterior (`PromoDuo`, `Carrusel`,
      `BannerSky`, `TresManeras`, `Mosaico`, `Distintivos`, `CtaDuo`,
      `Contacto`) siguen en el repo sin usarse, por si quieres reaprovechar
      alguno — dime si prefieres que los borre en vez de dejarlos.

## Mejoras detectadas, sin urgencia

- [ ] **Los PNG del logo pesan.** `logo-letras-negras.png` son ~281 KB y
      `logo-letras-blancas.png` ~204 KB, para mostrarse a 123x48 px. Pasarlos a
      SVG (es un logo vectorial de origen) o a WebP dejaría el header bastante
      más ligero.

- [ ] **`og-image.png` todavía es el genérico.** Convendría una imagen de
      compartir con el logo real, ahora que lo tenemos.
