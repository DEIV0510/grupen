/* Procesa los productos nuevos (2026-07-14) a WebP.
 * NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-nuevos4.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Productos grupen');
const OUT = path.join(__dirname, 'assets', 'products');
fs.mkdirSync(OUT, { recursive: true });

const ITEMS = [
  { src:'soporte retrovisor.png', slug:'soporte-retrovisor-blanco' },
  { src:'espejo medialuna.png',   slug:'espejo-medialuna-ktc' },
  { src:'lamapra chevrolet.png',  slug:'lampara-lateral-luv-1600' },
  { src:'retrovisor campero .png', slug:'retrovisor-campero-daihatsu' },
  { src:'panoramicoplano.png',    slug:'espejo-panoramico-8-plano' },
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
  console.log('Convertidos: ' + ok + '/' + ITEMS.length);
}
run().catch(e => { console.error(e); process.exit(1); });
