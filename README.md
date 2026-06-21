# GRUPEN Almacén — Repuestos para Vehículos (Livianos y Pesados)

Landing page corporativa **premium** para **GRUPEN – Grupo Empresarial de Negocios**, un **almacén de repuestos para todo tipo de vehículos** en Colombia: **livianos y pesados** (desde el carro particular hasta tractomulas y camiones).

> **Siempre Contigo** · Envíos a toda Colombia por **Interrapidísimo** con **pago contraentrega**.

## ✨ Características

- **100% enfocada en conversión** — WhatsApp, llamadas, formulario de cotización, buscador y carrito.
- **Tecnología:** HTML5 + CSS3 + JavaScript Vanilla (sin frameworks). Carga rápida y ligera.
- **Diseño:** corporativo automotriz premium, tema claro + verde corporativo, tipografías Saira + Inter.
- **Secciones:** loader animado, hero con video de fondo, franja de confianza, métricas, beneficios, catálogo escalable con categorías/buscador, ofertas **Paga 1 Lleva 2**, buscador de repuestos, proceso, galería con lightbox, marcas, testimonios y footer.
- **Carrito → WhatsApp:** el cliente arma su pedido y se genera un mensaje de cotización automático.
- **Optimización:** imágenes WebP, lazy-loading, diseño responsive (desktop/tablet/móvil) con carruseles horizontales.
- **SEO:** meta tags, Open Graph, Twitter Cards y datos estructurados JSON-LD (`AutoPartsStore`).

## 📁 Estructura

```
grupen-web/
├─ index.html          # Estructura y contenido
├─ styles.css          # Estilos, design system y animaciones
├─ productos.js        # 📦 INVENTARIO — agrega/quita repuestos aquí
├─ script.js           # Lógica (loader, catálogo, carrito, galería, formularios → WhatsApp)
├─ serve.js            # Servidor estático de desarrollo (Node)
├─ process-images.js   # Pipeline de imágenes (sharp): WebP, emblema, OG
└─ assets/
   ├─ products/        # Fotos de producto en WebP
   ├─ brand/           # Emblema, logos, marcas aliadas, favicon
   ├─ video/           # Video de fondo del hero
   └─ og.jpg           # Imagen Open Graph para redes
```

## 🚀 Uso

Por ser un sitio estático, basta con abrir `index.html`. Para desarrollo con servidor local:

```bash
node serve.js
# → http://localhost:5224
```

## 📦 Cómo alimentar el inventario (¡lo más importante!)

Todos los repuestos viven en un **único archivo fácil de editar**: [`productos.js`](productos.js).
No necesitas tocar nada más. **Edita ese archivo, guarda y recarga la página.**

Cada producto es una línea:

```js
{ name:'Filtro de Aceite', ref:'PH-30', brand:'Fram', cat:'filtros', img:'assets/products/filtro.webp', promo:true },
```

| Campo  | ¿Obligatorio? | Qué es |
|--------|:---:|--------|
| `name` | ✅ | Nombre del repuesto |
| `ref`  | ✅ | Número de referencia |
| `brand`| ❌ | Marca (deja `''` si no tiene) |
| `cat`  | ✅ | Categoría — usa un ID de la lista de abajo |
| `img`  | ❌ | Foto en `assets/products/`. Si no tienes foto, **bórralo**: se muestra el ícono de la categoría |
| `promo`| ❌ | Pon `promo:true` solo si es oferta **Paga 1 Lleva 2** |

**IDs de categoría válidos:** `luces`, `bombillos`, `muelles`, `filtros`, `correas`, `bombas-freno`, `pastillas`, `freno-aire`, `soporteria`, `electrico`, `retenedores`, `rodamientos`, `llantas`, `lubricantes`, `otros`.

> El buscador filtra automáticamente por **nombre, referencia o marca**, así que puedes tener **miles de referencias** sin tocar el diseño. (¿Necesitas una categoría nueva? Se agrega en el array `CATEGORIES` de `script.js`.)

## ⚙️ Configuración (datos de contacto)

Los datos están centralizados en el objeto `CONFIG` al inicio de [`script.js`](script.js):

```js
const CONFIG = {
  whatsapp: '573007093089',          // WhatsApp (formato internacional, sin + ni espacios)
  phone:    '+57 300 709 3089',      // Teléfono para llamadas
  email:    'ventas@grupen.com.co',  // Correo de contacto
  city:     'Colombia',              // Ciudad / ubicación
  social: { facebook:'#', instagram:'#', tiktok:'#' }  // Redes sociales
};
```

Todos los botones de WhatsApp, llamada, cotización, carrito y el formulario se generan automáticamente desde este `CONFIG`.

## 🖼️ Procesar imágenes (opcional)

Para regenerar las imágenes optimizadas desde la carpeta fuente:

```bash
NODE_PATH=<ruta a node_modules con sharp> node process-images.js
```

## 🔄 Subida automática al repositorio

Para que **cada cambio se suba solo** a GitHub, haz doble clic en **`auto-subir.bat`** (o ejecuta `node autopush.js`). Deja la ventana abierta: vigila la carpeta y hace `git add/commit/push` automáticamente unos segundos después de cada cambio. Ciérrala para detenerlo.

---

© GRUPEN Almacén – Grupo Empresarial de Negocios. Todos los derechos reservados.
