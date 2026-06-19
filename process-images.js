/* GRUPEN - Procesamiento de imágenes con sharp
 * - Extrae el emblema verde del logo y lo deja con fondo transparente (para fondos oscuros)
 * - Convierte las fotos de producto a WebP optimizado
 * - Genera favicon, apple-touch y la imagen Open Graph (og.jpg 1200x630)
 * Ejecutar con: NODE_PATH=.../_imgwork/node_modules node process-images.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Lenovo/Desktop/Grupen';
const OUT = 'C:/Users/Lenovo/Desktop/grupen-web/assets';
const PROD = path.join(OUT, 'products');
const BRAND = path.join(OUT, 'brand');
fs.mkdirSync(PROD, { recursive: true });
fs.mkdirSync(BRAND, { recursive: true });

// Convierte el blanco (y casi-blanco) en transparencia, conservando verdes/negros.
async function whiteToTransparent(buffer) {
  const img = sharp(buffer).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const minc = Math.min(r, g, b);
    if (r > 238 && g > 238 && b > 238) {
      data[i + 3] = 0;                       // blanco puro -> transparente
    } else if (minc > 210) {
      // halo gris muy claro -> transparencia parcial (borde suave)
      data[i + 3] = Math.round(((255 - minc) / 45) * 255);
    }
  }
  return sharp(data, { raw: { width, height, channels } }).png();
}

const PRODUCTS = [
  'lampara1', 'lampara2', 'lampara3',
  'stop1', 'stop2', 'stop3', 'stop4', 'stop5', 'stop6', 'stop7',
  'tapadistribuidor', 'tapadistribuidor2', 'tapadistribuidor3',
  'llaves1', 'llaves2', 'llaves3', 'llaves4'
];

async function run() {
  const manifest = {};

  // ---------- PRODUCTOS -> WebP ----------
  for (const name of PRODUCTS) {
    const inFile = path.join(SRC, name + '.png');
    if (!fs.existsSync(inFile)) { console.log('  (falta)', name); continue; }
    const outFile = path.join(PROD, name + '.webp');
    const info = await sharp(inFile)
      .resize({ width: 1100, withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(outFile);
    manifest[name] = { w: info.width, h: info.height };
    console.log('  producto', name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'kb');
  }
  fs.writeFileSync(path.join(OUT, 'products-meta.json'), JSON.stringify(manifest, null, 2));

  // ---------- LOGO -> emblema transparente ----------
  const logoFile = path.join(SRC, 'LOGO.png');
  const meta = await sharp(logoFile).metadata();
  console.log('  LOGO', meta.width + 'x' + meta.height);

  // Emblema = porción superior del logo (hexágono "G"), luego recorte automático del blanco
  const embTop = await sharp(logoFile)
    .extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.55) })
    .png()
    .toBuffer();
  const embTopCrop = await sharp(embTop).trim({ threshold: 12 }).png().toBuffer();
  const emblem = await whiteToTransparent(embTopCrop);
  const emblemBuf = await emblem.resize({ height: 640, withoutEnlargement: false }).png().toBuffer();
  await sharp(emblemBuf).toFile(path.join(BRAND, 'emblem.png'));
  console.log('  emblem.png listo');

  // Logo completo con fondo transparente (para superficies claras)
  const fullTrim = await sharp(logoFile).trim({ threshold: 12 }).png().toBuffer();
  const fullTransp = await whiteToTransparent(fullTrim);
  await fullTransp.resize({ width: 900, withoutEnlargement: true }).toFile(path.join(BRAND, 'logo-full.png'));
  console.log('  logo-full.png listo');

  // ---------- Favicon + apple-touch ----------
  await sharp(emblemBuf).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(path.join(BRAND, 'favicon.png'));
  // apple-touch: emblema sobre fondo oscuro redondeado
  const appleBg = Buffer.from(
    `<svg width="180" height="180"><rect width="180" height="180" rx="38" fill="#0c100d"/></svg>`
  );
  const emblemSmall = await sharp(emblemBuf).resize({ width: 128, fit: 'inside' }).png().toBuffer();
  const es = await sharp(emblemSmall).metadata();
  await sharp(appleBg)
    .composite([{ input: emblemSmall, left: Math.round((180 - es.width) / 2), top: Math.round((180 - es.height) / 2) }])
    .png().toFile(path.join(BRAND, 'apple-touch.png'));
  console.log('  favicon + apple-touch listos');

  // ---------- Open Graph 1200x630 ----------
  const ogW = 1200, ogH = 630;
  const ogSvg = `<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0a0f0b"/>
        <stop offset="0.55" stop-color="#0e1611"/>
        <stop offset="1" stop-color="#0a0d0b"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.78" cy="0.28" r="0.5">
        <stop offset="0" stop-color="#46c01f" stop-opacity="0.30"/>
        <stop offset="1" stop-color="#46c01f" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${ogW}" height="${ogH}" fill="url(#bg)"/>
    <rect width="${ogW}" height="${ogH}" fill="url(#glow)"/>
    <rect x="0" y="0" width="10" height="${ogH}" fill="#46c01f"/>
    <text x="90" y="300" font-family="Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff" letter-spacing="2">GRUPEN</text>
    <text x="94" y="356" font-family="Arial, sans-serif" font-size="30" font-weight="600" fill="#7ad94f" letter-spacing="3">REPUESTOS PARA VEHÍCULOS</text>
    <text x="94" y="430" font-family="Arial, sans-serif" font-size="26" font-weight="400" fill="#aebcb2">Calidad garantizada · Entrega rápida · Asesoría especializada</text>
    <text x="94" y="556" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#46c01f" letter-spacing="4">SIEMPRE CONTIGO</text>
  </svg>`;
  const ogEmblem = await sharp(emblemBuf).resize({ height: 300, fit: 'inside' }).png().toBuffer();
  const oe = await sharp(ogEmblem).metadata();
  await sharp(Buffer.from(ogSvg))
    .composite([{ input: ogEmblem, left: ogW - oe.width - 110, top: Math.round((ogH - oe.height) / 2) }])
    .jpeg({ quality: 88 })
    .toFile(path.join(OUT, 'og.jpg'));
  console.log('  og.jpg listo');

  console.log('\nTODO LISTO ✓');
}

run().catch(e => { console.error(e); process.exit(1); });
