/* Procesa las 2 lámparas direccionales nuevas a WebP.
 * NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-lamparas.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Productos grupen');
const OUT = path.join(__dirname, 'assets', 'products');
fs.mkdirSync(OUT, { recursive: true });

const ITEMS = [
  { src:'lampara64x184mm.png', slug:'lampara-direccional-184' },
  { src:'lampara54x176ml.png', slug:'lampara-direccional-176' },
];

async function run() {
  let ok = 0;
  for (const it of ITEMS) {
    const src = path.join(SRC, it.src);
    if (!fs.existsSync(src)) { console.log('FALTA: ' + it.src); continue; }
    await sharp(src).flatten({ background: '#ffffff' })
      .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84 }).toFile(path.join(OUT, it.slug + '.webp'));
    ok++;
    console.log('OK: ' + it.slug + '.webp');
  }
  console.log('Lámparas convertidas: ' + ok + '/' + ITEMS.length);
}
run().catch(e => { console.error(e); process.exit(1); });
