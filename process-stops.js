/* Reprocesa las fotos de los STOP (luces traseras) desde _material-Grupen a
 * WebP limpios en assets/products/. Ejecutar:
 *   NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-stops.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Grupen');
const OUT = path.join(__dirname, 'assets', 'products');
fs.mkdirSync(OUT, { recursive: true });

const STOPS = [
  { src:'stop1.png', slug:'stop-toyota-landcruiser' },
  { src:'stop2.png', slug:'stop-daihatsu-4105' },
  { src:'stop3.png', slug:'stop-renault-6' },
  { src:'stop4.png', slug:'stop-chevrolet-chevette' },
  { src:'stop5.png', slug:'lampara-triple-cromada' },
  { src:'stop6.png', slug:'stop-chevrolet-luv' },
  { src:'stop7.png', slug:'lampara-stop-renault-4' },
];

async function run() {
  let ok = 0;
  for (const s of STOPS) {
    const src = path.join(SRC, s.src);
    if (!fs.existsSync(src)) { console.log('FALTA: ' + s.src); continue; }
    await sharp(src)
      .flatten({ background: '#ffffff' })
      .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(path.join(OUT, s.slug + '.webp'));
    ok++;
  }
  console.log('STOP convertidos: ' + ok + '/' + STOPS.length);
}
run().catch(e => { console.error(e); process.exit(1); });
