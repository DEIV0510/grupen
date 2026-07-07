/* Procesa los 2 compresores industriales (07-07) a WebP.
 * NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-compresores.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Productos grupen');
const OUT = path.join(__dirname, 'assets', 'products');
fs.mkdirSync(OUT, { recursive: true });

const ITEMS = [
  { src:'Compresor de 2 etapas 4 pistones trifasico 9 caballos de 1740 revoluciones este es otro $9.500.000.png', slug:'compresor-9hp-4pistones' },
  { src:'Compresor doble tapa 2 pistones motor trifásico de 4 caballos $6.000.000.png', slug:'compresor-4hp-2pistones' },
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
  console.log('Compresores convertidos: ' + ok + '/' + ITEMS.length);
}
run().catch(e => { console.error(e); process.exit(1); });
