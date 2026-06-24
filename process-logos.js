/* GRUPEN — Variantes de logo (detecta el espacio emblema↔texto)
 * Corrige la "punta verde" sobre GRUPEN recortando el texto justo bajo el emblema.
 * - logo-horizontal.png / logo-horizontal-white.png  → header / bandas oscuras
 * - logo-full.png / logo-white.png                   → loader / footer
 * Ejecutar: NODE_PATH=.../_imgwork/node_modules node process-logos.js
 */
const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '_material-Grupen', 'LOGO.png');
const BRAND = path.join(__dirname, 'assets', 'brand');

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

// Recolorea todo el logo a un verde corporativo brillante (visible sobre oscuro).
async function toGreen(buffer, rgb) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    if (data[i + 3] > 6) { data[i] = rgb[0]; data[i + 1] = rgb[1]; data[i + 2] = rgb[2]; }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: ch } }).png();
}

// Para fondo OSCURO (header sobre el video): conserva los verdes (emblema +
// "Grupo Empresarial de Negocios") y pasa el texto oscuro/gris ("GRUPEN" +
// "Siempre Contigo") a BLANCO, para que sea legible. = logo oficial sobre oscuro.
async function toDarkBg(buffer, green) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    if (data[i + 3] <= 8) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const isGreen = g > 85 && g > r + 20 && g > b + 20;
    if (isGreen) { data[i] = green[0]; data[i + 1] = green[1]; data[i + 2] = green[2]; }
    else { data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: ch } }).png();
}

// Encuentra la banda blanca que separa el emblema (arriba) del texto "GRUPEN" (abajo).
async function findGap() {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const green = new Array(height).fill(0);
  const dark = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    let g = 0, d = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i], gr = data[i + 1], b = data[i + 2];
      if (gr > 100 && gr > r + 25 && gr > b + 25) g++;
      if (r < 80 && gr < 80 && b < 80) d++;
    }
    green[y] = g / width; dark[y] = d / width;
  }
  let emblemStart = 0;
  for (let y = 0; y < height; y++) { if (green[y] > 0.04) { emblemStart = y; break; } }
  let gap = Math.round(height * 0.58); // respaldo
  for (let y = emblemStart + 12; y < height - 8; y++) {
    let white = true;
    for (let k = 0; k < 7; k++) { if (green[y + k] > 0.004 || dark[y + k] > 0.004) { white = false; break; } }
    if (white) { gap = y; break; }
  }
  return { height, width, emblemStart, gap };
}

async function run() {
  const { height, gap, emblemStart } = await findGap();
  console.log('  altura=' + height + ' emblemStart=' + emblemStart + ' gap(separación)=' + gap + ' (' + Math.round(gap / height * 100) + '%)');

  // Emblema: de arriba hasta la separación (incluye su punta, SIN texto)
  const embTop = await sharp(SRC).extract({ left: 0, top: 0, width: (await sharp(SRC).metadata()).width, height: gap }).png().toBuffer();
  const embTrim = await sharp(embTop).trim({ threshold: 12 }).png().toBuffer();
  const emblem = await (await whiteToTransparent(embTrim)).png().toBuffer();
  await sharp(emblem).resize({ height: 560, withoutEnlargement: false }).toFile(path.join(BRAND, 'emblem.png'));

  // Texto: desde la separación hacia abajo (GRUPEN + tagline, SIN emblema)
  const meta = await sharp(SRC).metadata();
  const txtCrop = await sharp(SRC).extract({ left: 0, top: gap, width: meta.width, height: meta.height - gap }).png().toBuffer();
  const txtTrim = await sharp(txtCrop).trim({ threshold: 12 }).png().toBuffer();
  const textBlock = await (await whiteToTransparent(txtTrim)).png().toBuffer();

  // Composición horizontal: emblema | texto
  const EH = 132;
  const embR = await sharp(emblem).resize({ height: EH }).png().toBuffer();
  const em = await sharp(embR).metadata();
  const txtR = await sharp(textBlock).resize({ height: Math.round(EH * 0.74) }).png().toBuffer();
  const tm = await sharp(txtR).metadata();
  const gapX = 28;
  const cW = em.width + gapX + tm.width;
  const cH = Math.max(em.height, tm.height);
  const horiz = await sharp({ create: { width: cW, height: cH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: embR, left: 0, top: Math.round((cH - em.height) / 2) },
      { input: txtR, left: em.width + gapX, top: Math.round((cH - tm.height) / 2) }
    ]).png().toBuffer();
  await sharp(horiz).toFile(path.join(BRAND, 'logo-horizontal.png'));
  await (await toWhite(horiz)).toFile(path.join(BRAND, 'logo-horizontal-white.png'));
  await (await toGreen(horiz, [92, 198, 55])).toFile(path.join(BRAND, 'logo-horizontal-green.png'));
  await (await toDarkBg(horiz, [92, 198, 55])).toFile(path.join(BRAND, 'logo-horizontal-over.png'));
  console.log('  logo-horizontal (color + white + green + over) ' + cW + 'x' + cH);

  // Logo completo stacked (color + blanco)
  const fullTrim = await sharp(SRC).trim({ threshold: 12 }).png().toBuffer();
  const fullTransp = await (await whiteToTransparent(fullTrim)).png().toBuffer();
  await sharp(fullTransp).resize({ width: 540 }).toFile(path.join(BRAND, 'logo-full.png'));
  await (await toWhite(fullTransp)).resize({ width: 540 }).toFile(path.join(BRAND, 'logo-white.png'));
  console.log('  logo-full + logo-white listos');
  console.log('TODO LISTO ✓');
}
run().catch(e => { console.error(e); process.exit(1); });
