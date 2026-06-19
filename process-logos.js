/* GRUPEN — Variantes de logo para el tema CLARO
 * - logo-horizontal.png        : emblema + bloque de texto real (colores originales) → header claro
 * - logo-horizontal-white.png  : igual pero en blanco → bandas verde oscuro
 * - logo-white.png             : logo completo (stacked) en blanco → footer/CTA oscuros
 * - logo-full.png              : logo completo (stacked) colores originales, fondo transparente
 * Ejecutar: NODE_PATH=.../_imgwork/node_modules node process-logos.js
 */
const sharp = require('sharp');
const path = require('path');

const SRC = 'C:/Users/Lenovo/Desktop/Grupen/LOGO.png';
const BRAND = 'C:/Users/Lenovo/Desktop/grupen-web/assets/brand';

async function whiteToTransparent(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const minc = Math.min(r, g, b);
    if (r > 238 && g > 238 && b > 238) data[i + 3] = 0;
    else if (minc > 210) data[i + 3] = Math.round(((255 - minc) / 45) * 255);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: ch } }).png();
}

async function toWhite(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    if (data[i + 3] > 6) { data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: ch } }).png();
}

async function run() {
  const meta = await sharp(SRC).metadata();
  const H = meta.height, W = meta.width;

  // --- Emblema (porción superior) ---
  const embTop = await sharp(SRC).extract({ left: 0, top: 0, width: W, height: Math.round(H * 0.57) }).png().toBuffer();
  const embTrim = await sharp(embTop).trim({ threshold: 12 }).png().toBuffer();
  const emblem = await (await whiteToTransparent(embTrim)).png().toBuffer();

  // --- Bloque de texto (porción inferior: GRUPEN + tagline) ---
  const txtTop = Math.round(H * 0.57);
  const txtCrop = await sharp(SRC).extract({ left: 0, top: txtTop, width: W, height: H - txtTop }).png().toBuffer();
  const txtTrim = await sharp(txtCrop).trim({ threshold: 12 }).png().toBuffer();
  const textBlock = await (await whiteToTransparent(txtTrim)).png().toBuffer();

  // --- Composición horizontal: emblema | texto ---
  const EH = 132;               // alto del emblema
  const embR = await sharp(emblem).resize({ height: EH }).png().toBuffer();
  const em = await sharp(embR).metadata();
  const tm0 = await sharp(textBlock).metadata();
  const TH = Math.round(EH * (tm0.height / tm0.height) * 0.74); // texto ~74% del alto del emblema
  const txtR = await sharp(textBlock).resize({ height: TH }).png().toBuffer();
  const tm = await sharp(txtR).metadata();
  const gap = 28;
  const cW = em.width + gap + tm.width;
  const cH = Math.max(em.height, tm.height);

  const horiz = await sharp({ create: { width: cW, height: cH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: embR, left: 0, top: Math.round((cH - em.height) / 2) },
      { input: txtR, left: em.width + gap, top: Math.round((cH - tm.height) / 2) }
    ]).png().toBuffer();
  await sharp(horiz).toFile(path.join(BRAND, 'logo-horizontal.png'));
  await (await toWhite(horiz)).toFile(path.join(BRAND, 'logo-horizontal-white.png'));
  console.log('  logo-horizontal (color + white) listo:', cW + 'x' + cH);

  // --- Logo completo stacked (color + blanco) ---
  const fullTrim = await sharp(SRC).trim({ threshold: 12 }).png().toBuffer();
  const fullTransp = await (await whiteToTransparent(fullTrim)).png().toBuffer();
  await sharp(fullTransp).resize({ width: 540 }).toFile(path.join(BRAND, 'logo-full.png'));
  await (await toWhite(fullTransp)).resize({ width: 540 }).toFile(path.join(BRAND, 'logo-white.png'));
  console.log('  logo-full + logo-white listos');

  console.log('TODO LISTO ✓');
}
run().catch(e => { console.error(e); process.exit(1); });
