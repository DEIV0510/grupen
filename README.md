# GRUPEN — Repuestos para Carros Clásicos

Landing page corporativa **premium** para **GRUPEN – Grupo Empresarial de Negocios**, especializada en la comercialización de **repuestos para carros clásicos** en Colombia.

> **Siempre Contigo** · Envíos a toda Colombia por **Interrapidísimo** con **pago contraentrega**.

## ✨ Características

- **100% enfocada en conversión** — WhatsApp, llamadas, formulario de cotización y buscador de repuestos.
- **Tecnología:** HTML5 + CSS3 + JavaScript Vanilla (sin frameworks). Carga rápida y ligera.
- **Diseño:** corporativo automotriz premium, tema oscuro carbón + verde del logo, tipografías Saira + Inter.
- **Secciones:** loader animado con partículas, hero con parallax, franja de confianza, métricas animadas, beneficios, catálogo con filtros, buscador de repuestos, proceso en 4 pasos, galería masonry con lightbox, testimonios y footer completo.
- **Optimización:** imágenes WebP, lazy-loading, `prefers-reduced-motion`, diseño responsive (desktop/tablet/móvil).
- **SEO:** meta tags, Open Graph, Twitter Cards y datos estructurados JSON-LD (`AutoPartsStore`).

## 📁 Estructura

```
grupen-web/
├─ index.html          # Estructura y contenido
├─ styles.css          # Estilos, design system y animaciones
├─ script.js           # Lógica (loader, contadores, galería, formularios → WhatsApp)
├─ serve.js            # Servidor estático de desarrollo (Node)
├─ process-images.js   # Pipeline de imágenes (sharp): WebP, emblema, OG
└─ assets/
   ├─ products/        # Fotos de producto en WebP
   ├─ brand/           # Emblema, logo, favicon, apple-touch
   └─ og.jpg           # Imagen Open Graph para redes
```

## 🚀 Uso

Por ser un sitio estático, basta con abrir `index.html`. Para desarrollo con servidor local:

```bash
node serve.js
# → http://localhost:5224
```

## ⚙️ Configuración (¡importante!)

Los datos de contacto están centralizados en el objeto `CONFIG` al inicio de [`script.js`](script.js). Edítalos con la información real:

```js
const CONFIG = {
  whatsapp: '573000000000',          // WhatsApp (formato internacional, sin + ni espacios)
  phone:    '+57 300 000 0000',      // Teléfono para llamadas
  email:    'ventas@grupen.com.co',  // Correo de contacto
  city:     'Colombia',              // Ciudad / ubicación
  social: { facebook:'#', instagram:'#', tiktok:'#' }  // Redes sociales
};
```

Todos los botones de WhatsApp, llamada, cotización y el formulario se generan automáticamente desde este `CONFIG`.

## 🖼️ Procesar imágenes (opcional)

Para regenerar las imágenes optimizadas desde la carpeta fuente:

```bash
NODE_PATH=<ruta a node_modules con sharp> node process-images.js
```

## 🔄 Subida automática al repositorio

Para que **cada cambio se suba solo** a GitHub, haz doble clic en **`auto-subir.bat`** (o ejecuta `node autopush.js`). Deja la ventana abierta: vigila la carpeta y hace `git add/commit/push` automáticamente unos segundos después de cada cambio. Ciérrala para detenerlo.

---

© GRUPEN – Grupo Empresarial de Negocios. Todos los derechos reservados.
