/* Procesa los productos NUEVOS de _material-Productos grupen a WebP limpios.
 * Ejecutar: NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-nuevos.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Productos grupen');
const OUT = path.join(__dirname, 'assets', 'products');
fs.mkdirSync(OUT, { recursive: true });

const ITEMS = [
  { src:'LÁMPARA CAMPERO TOYOTA DIRECCIONAL DELANTERO $80.000.png', slug:'lampara-campero-toyota' },
  { src:'LÁMPARA SEMA $25.000.png', slug:'lampara-sema' },
  { src:'REGLETA TRIPLE $54.000.png', slug:'regleta-triple' },
];

async function run() {
  let ok = 0;
  for (const it of ITEMS) {
    const src = path.join(SRC, it.src);
    if (!fs.existsSync(src)) { console.log('FALTA: ' + it.src); continue; }
    await sharp(src)
      .flatten({ background: '#ffffff' })
      .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(path.join(OUT, it.slug + '.webp'));
    ok++;
  }
  console.log('Nuevos convertidos: ' + ok + '/' + ITEMS.length);
}
run().catch(e => { console.error(e); process.exit(1); });
