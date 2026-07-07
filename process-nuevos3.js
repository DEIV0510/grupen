/* Procesa los retrovisores nuevos (07-07 tarde) a WebP.
 * NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-nuevos3.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '_material-Productos grupen');
const OUT = path.join(__dirname, 'assets', 'products');

const ITEMS = [
  { src:'RETROVISOR INTERNO $16.000.png', slug:'retrovisor-interno-cromado' },
  { src:'RETROVISOR INTERNO $16.000 (2).png', slug:'retrovisor-interno-negro' },
  { src:'ESPEJO DE TORNILLO 174174MM PLASTICO $18.200.png', slug:'espejo-tornillo-174' },
  { src:'ESPEJO RETROVISO230155MM $30.000.png', slug:'espejo-retrovisor-230' },
  { src:'RETROVISOR 197140MM DE TORNILLO PLASTICO $18.000.png', slug:'retrovisor-197-tornillo' },
  { src:'ESPEJO 285200MM METALICO $31.000.png', slug:'espejo-285-metalico' },
  { src:'Retrovisor pequeño pata larga $15.000.png', slug:'retrovisor-pata-larga' },
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
