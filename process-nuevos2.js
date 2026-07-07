/* Procesa los productos nuevos (07-07) de _material-Productos grupen a WebP.
 * NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-nuevos2.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Productos grupen');
const OUT = path.join(__dirname, 'assets', 'products');
fs.mkdirSync(OUT, { recursive: true });

const ITEMS = [
  { src:'Espejo plástico 375mmx197mm $50.000.png', slug:'espejo-plastico-375' },
  { src:'Retrovisor MITSUBICHI  cromado $50.000.png', slug:'retrovisor-mitsubishi' },
  { src:'RETROVISOR BLAZER $48.000.png', slug:'retrovisor-blazer' },
  { src:'Retrovisor para camioneta 210mm x 150 mm $40.000.png', slug:'retrovisor-camioneta' },
  { src:'stop 30.000.png', slug:'stop-triple-30' },
  { src:'luz FORD 30.000.png', slug:'luz-letrero-ford' },
  { src:'STOP RENAUL 12 $50.000.png', slug:'stop-renault-12' },
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
  }
  console.log('Nuevos convertidos: ' + ok + '/' + ITEMS.length);
}
run().catch(e => { console.error(e); process.exit(1); });
