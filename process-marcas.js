/* Recorta logosmarcas.png en logos individuales detectando los espacios en
 * blanco entre logos (por fila). Genera hoja de contacto para verificar. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Lenovo/Desktop/Grupen/logosmarcas.png';
const OUT = 'C:/Users/Lenovo/Desktop/grupen-web/assets/brand/marcas';
fs.mkdirSync(OUT, { recursive: true });

const NAMES = [
  ['imal', 'incolbestos', 'shell', 'mobil', 'baldwin', 'hella'],
  ['tkl', 'timken', 'bendix', 'fleetguard', 'partmo', 'precision'],
  ['victor', 'sna', 'multipartes']
];

async function run() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;
  const rowH = Math.round(H / 3);
  const bands = [[0, rowH], [rowH, 2 * rowH], [2 * rowH, H]];
  const minGap = Math.round(W * 0.018); // ancho mínimo de separación entre logos
  const isBg = (i) => data[i + 3] < 40 || (data[i] > 236 && data[i + 1] > 236 && data[i + 2] > 236);

  const sheet = [];
  for (let bi = 0; bi < bands.length; bi++) {
    const [y0, y1] = bands[bi];
    // columnas "vacías"
    const empty = new Array(W);
    for (let x = 0; x < W; x++) {
      let n = 0;
      for (let y = y0; y < y1; y++) { if (!isBg((y * W + x) * ch)) { n++; if (n > 3) break; } }
      empty[x] = n <= 3;
    }
    // spans de logo: regiones no-vacías separadas por huecos >= minGap
    const spans = [];
    let x = 0;
    while (x < W) {
      while (x < W && empty[x]) x++;
      if (x >= W) break;
      let start = x;
      let gap = 0, lastContent = x;
      while (x < W) {
        if (empty[x]) { gap++; if (gap >= minGap) break; }
        else { gap = 0; lastContent = x; }
        x++;
      }
      spans.push([start, lastContent + 1]);
    }
    const names = NAMES[bi];
    console.log('Fila ' + (bi + 1) + ': ' + spans.length + ' logos (esperados ' + names.length + ')');
    for (let s = 0; s < spans.length; s++) {
      const [xa, xb] = spans[s];
      const pad = 6;
      const left = Math.max(0, xa - pad), top = y0;
      const width = Math.min(W - left, (xb - xa) + pad * 2), height = y1 - y0;
      const cell = await sharp(SRC).extract({ left, top, width, height }).png().toBuffer();
      const trimmed = await sharp(cell).trim({ threshold: 18 }).png().toBuffer().catch(() => cell);
      const name = names[s] || ('extra' + bi + '_' + s);
      await sharp(trimmed).toFile(path.join(OUT, name + '.png'));
      const onCard = await sharp({ create: { width: 230, height: 96, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
        .composite([{ input: await sharp(trimmed).resize({ width: 200, height: 70, fit: 'inside' }).png().toBuffer(), gravity: 'center' }])
        .png().toBuffer();
      sheet.push(onCard);
    }
  }
  const cw = 230, chh = 96, perRow = 6, rows = Math.ceil(sheet.length / perRow);
  await sharp({ create: { width: cw * perRow, height: chh * rows, channels: 4, background: { r: 232, g: 236, b: 232, alpha: 1 } } })
    .composite(sheet.map((b, i) => ({ input: b, left: (i % perRow) * cw, top: Math.floor(i / perRow) * chh })))
    .jpeg({ quality: 88 }).toFile('C:/Users/Lenovo/Desktop/grupen-web/_marcas-sheet.jpg');
  console.log('Hoja de contacto lista.');
}
run().catch(e => { console.error(e); process.exit(1); });
