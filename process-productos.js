/* Importa las fotos de "Desktop/Productos grupen" → WebP limpios en
 * assets/products/ y GENERA productos.js con nombres, categorías y precios
 * (antes/hoy). Tabla única = fuente de verdad.
 * Ejecutar:  NODE_PATH="C:/Users/Lenovo/_imgwork/node_modules" node process-productos.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Lenovo/Desktop/Productos grupen';
const OUT = 'C:/Users/Lenovo/Desktop/grupen-web/assets/products';
fs.mkdirSync(OUT, { recursive: true });

// m = token único (en minúsculas) presente en el nombre real del archivo (incluye typos)
// s = slug de salida · n = nombre limpio · r = ref · b = marca · c = categoría · a = antes · h = hoy
const T = [
  { m:'portamagneto',                 s:'bobina-lx204-ford',            n:'Bobina / Portamagneto LX-204 Ford 8 Cilindros', r:'LX-204', b:'', c:'electrico',   a:62000,  h:40300 },
  { m:'22483',                        s:'bomba-clutch-22483-ford750',   n:'Bomba de Clutch 22483 Ford 750',                r:'22483',  b:'Warner', c:'embrague', a:180000, h:110000 },
  { m:'renault 9 sin tanque',         s:'bomba-clutch-renault9',        n:'Bomba de Clutch Renault 9 (sin depósito)',      r:'',       b:'', c:'embrague',    a:238400, h:155000 },
  { m:'25669',                        s:'bomba-clutch-25669-ford750',   n:'Bomba de Clutch 25669 Ford 750',                r:'25669',  b:'', c:'embrague',    a:180000, h:117000 },
  { m:'cluths npr',                   s:'bomba-clutch-npr',             n:'Bomba de Clutch NPR',                           r:'',       b:'', c:'embrague',    a:210000, h:136500 },
  { m:'freno mazda 323',              s:'bomba-freno-mazda323',         n:'Bomba de Freno Mazda 323',                      r:'',       b:'', c:'bombas-freno',a:225000, h:147000 },
  { m:'p45',                          s:'bombillo-p45-12v',             n:'Bombillo P45 12V',                              r:'P45',    b:'', c:'bombillos',   a:15000,  h:9750 },
  { m:'d epie',                       s:'cambia-luz-pie',               n:'Cambia Luz de Pie',                             r:'',       b:'', c:'luces',       a:34000,  h:17000 },
  { m:'fx 33',                        s:'carbones-fx33',                n:'Carbones FX-33',                                r:'FX-33',  b:'', c:'electrico',   a:20000,  h:13000 },
  { m:'conector de ford',             s:'conector-ford',                n:'Conector Ford',                                 r:'',       b:'', c:'electrico',   a:25000,  h:16250 },
  { m:'escobilla para dodge',         s:'escobilla-dodge',              n:'Escobilla Dodge',                               r:'',       b:'', c:'electrico',   a:10000,  h:6500 },
  { m:'exploradora de 6',             s:'exploradora-6',                n:'Exploradora 6"',                                r:'',       b:'', c:'luces',       a:45000,  h:29250 },
  { m:'extremo de direccion',         s:'extremo-direccion-renault12',  n:'Extremo de Dirección Renault 12',               r:'',       b:'', c:'direccion',   a:46000,  h:29900 },
  { m:'a4041',                        s:'filtro-a4041',                 n:'Filtro Partmo A-4041',                          r:'A-4041', b:'Partmo', c:'filtros', a:20000,  h:13000 },
  { m:'4050 gran vitara',             s:'filtro-4050-gran-vitara',      n:'Filtro 4050 Gran Vitara Diésel',                r:'4050',   b:'', c:'filtros',     a:15000,  h:9800 },
  { m:'a124renault',                  s:'filtro-aire-a124-renault18',   n:'Filtro de Aire A-124 Renault 18',               r:'A-124',  b:'', c:'filtros',     a:20500,  h:13400 },
  { m:'57609',                        s:'filtro-aceite-57609-mercedes', n:'Filtro de Aceite 57609 Mercedes',               r:'57609',  b:'', c:'filtros',     a:91200,  h:59300 },
  { m:'combi cobelco',                s:'filtro-combustible-kobelco',   n:'Filtro de Combustible Kobelco',                 r:'',       b:'', c:'filtros',     a:45000,  h:29250 },
  { m:'combustibler a31',             s:'filtro-combustible-a31',       n:'Filtro de Combustible A-31',                    r:'A-31',   b:'', c:'filtros',     a:52400,  h:34000 },
  { m:'fa 139',                       s:'filtro-fa139-montero',         n:'Filtro FA-139 Mitsubishi Montero',              r:'FA-139', b:'', c:'filtros',     a:25000,  h:16250 },
  { m:'tridon',                       s:'flash-tridon-novita-12v',      n:'Flash Tridon Novita 12V',                       r:'',       b:'Tridon', c:'electrico', a:41600, h:28000 },
  { m:'fultro de secador',            s:'filtro-secador-kenworth',      n:'Filtro Secador Kenworth',                       r:'',       b:'', c:'freno-aire',  a:215000, h:140000 },
  { m:'fusible d 30mm',               s:'fusible-30mm-15a',             n:'Fusible 30mm 15 Amperios',                      r:'',       b:'', c:'electrico',   a:500,    h:250 },
  { m:'kit de embrague',              s:'kit-embrague-3626',            n:'Kit de Embrague 3626',                          r:'3626',   b:'', c:'embrague',    a:55000,  h:36000 },
  { m:'pegante',                      s:'pegante-empaquetaduras',       n:'Pegante de Empaquetaduras (peq. $10.000 / grande $15.000)', r:'', b:'', c:'otros', a:0, h:10000 },
  { m:'nlr-112',                      s:'regulador-nlr112-12v',         n:'Regulador NLR-112 12V',                         r:'NLR-112',b:'', c:'electrico',   a:44000,  h:28600 },
  { m:'vr-35',                        s:'regulador-vr35-dodge',         n:'Regulador de Voltaje VR-35 Dodge',              r:'VR-35',  b:'', c:'electrico',   a:139000, h:70000 },
  { m:'relay 12v 4pines',             s:'relay-12v-4pines',             n:'Relay 12V 4 Pines',                             r:'',       b:'', c:'electrico',   a:52000,  h:33800 },
  { m:'reparacion de bomba de freno', s:'reparacion-bomba-freno-npr',   n:'Reparación Bomba de Freno NPR',                 r:'',       b:'', c:'bombas-freno',a:35000,  h:22750 },
  { m:'empbrague 40421',              s:'reparacion-embrague-40421',    n:'Reparación de Embrague 40421 Montero',          r:'40421',  b:'', c:'embrague',    a:28000,  h:18200 },
  { m:'selenoide',                    s:'solenoide-24v-marcha-40mt',    n:'Solenoide 24V Marcha 40MT',                     r:'40MT',   b:'', c:'electrico',   a:115000, h:75000 },
  { m:'rodillo alternador 8-109',     s:'rodillo-alternador-8109',      n:'Rodillo de Alternador 8-109',                   r:'8-109',  b:'', c:'electrico',   a:33900,  h:22000 },
  { m:'scobillas para npr',           s:'escobillas-npr',               n:'Escobillas NPR',                                r:'',       b:'', c:'electrico',   a:44600,  h:28990 },
  { m:'seguro de caja',               s:'seguro-caja-cambios',          n:'Seguro de Caja de Cambios',                     r:'',       b:'', c:'otros',       a:12000,  h:7800 },
  { m:'sensor de temperatura',        s:'sensor-temperatura-chevrolet', n:'Sensor de Temperatura Chevrolet',               r:'',       b:'', c:'electrico',   a:72000,  h:46800 },
  { m:'balancin 5776',                s:'soporte-balancin-5776-ford',   n:'Soporte de Balancín 5776 Ford',                 r:'5776',   b:'', c:'soporteria',  a:181400, h:118000 },
  { m:'caja npr',                     s:'soporte-caja-npr',             n:'Soporte de Caja NPR',                           r:'',       b:'', c:'soporteria',  a:296000, h:192400 },
  { m:'dodge 300',                    s:'soporte-dodge-300',            n:'Soporte de Motor Dodge 300',                    r:'',       b:'', c:'soporteria',  a:206500, h:134300 },
  { m:'muelle b60',                   s:'soporte-muelle-b60',           n:'Soporte de Muelle B60',                         r:'B60',    b:'', c:'muelles',     a:242000, h:157300 },
  { m:'muelle de ford',               s:'soporte-muelle-ford',          n:'Soporte de Muelle Ford (Sicolsa)',              r:'SSX215SF',b:'Sicolsa', c:'muelles', a:264308, h:171800 },
  { m:'freightliner',                 s:'soporte-muelle-freightliner',  n:'Soporte de Muelle Superior Doble Troque Freightliner', r:'', b:'', c:'muelles', a:857500, h:557400 },
  { m:'muelle d300',                  s:'soporte-muelle-d300',          n:'Soporte de Muelle D300',                        r:'D300',   b:'', c:'muelles',     a:219000, h:142400 },
  { m:'sicolsa ford 800',             s:'soporte-sicolsa-ford800',      n:'Soporte Sicolsa Ford 800',                      r:'',       b:'Sicolsa', c:'soporteria', a:180000, h:117000 },
  { m:'switch cambia luz de toyota',  s:'switch-cambialuz-landcruiser', n:'Switch Cambia Luz Toyota Land Cruiser',         r:'',       b:'', c:'electrico',   a:43000,  h:27950 },
  { m:'bateria 4.5',                  s:'terminal-bateria-45cm',        n:'Terminal de Batería 4.5 cm',                    r:'',       b:'', c:'electrico',   a:13000,  h:8500 },
  { m:'bateria de 38',                s:'terminal-bateria-38',          n:'Terminal de Batería 38',                        r:'',       b:'', c:'electrico',   a:5000,   h:3250 },
  { m:'de de bateria 5',              s:'terminal-bateria-5cm',         n:'Terminal de Batería 5 cm',                      r:'',       b:'', c:'electrico',   a:15700,  h:10000 },
  { m:'vc-128',                       s:'vacum-distribuidor-vc128',     n:'Vacum de Distribuidor Ford VC-128',             r:'VC-128', b:'', c:'electrico',   a:46000,  h:29900 },
  { m:'valvula de remolque',          s:'valvula-remolque',             n:'Válvula de Remolque',                           r:'',       b:'', c:'freno-aire',  a:115000, h:75000 },
];

const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();

async function run() {
  const files = fs.readdirSync(SRC).filter(f => /\.png$/i.test(f) && !/^chatgpt/i.test(norm(f)));
  const normFiles = files.map(f => ({ f, n: norm(f) }));
  const usedFiles = new Set();
  let ok = 0;
  const missing = [];

  for (const row of T) {
    const hit = normFiles.find(x => !usedFiles.has(x.f) && x.n.includes(row.m));
    if (!hit) { missing.push(row.m + '  →  ' + row.n); continue; }
    usedFiles.add(hit.f);
    await sharp(path.join(SRC, hit.f))
      .flatten({ background: '#ffffff' })
      .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, row.s + '.webp'));
    ok++;
  }

  const leftover = normFiles.filter(x => !usedFiles.has(x.f)).map(x => x.f);
  console.log('Convertidas: ' + ok + '/' + T.length);
  if (missing.length) console.log('SIN MATCH (' + missing.length + '):\n  ' + missing.join('\n  '));
  if (leftover.length) console.log('ARCHIVOS NO USADOS (' + leftover.length + '):\n  ' + leftover.join('\n  '));

  // ---- Generar productos.js ----
  const order = ['filtros','electrico','embrague','bombas-freno','freno-aire','soporteria','muelles','luces','bombillos','direccion','otros'];
  const catName = { filtros:'FILTROS', electrico:'SISTEMA ELÉCTRICO', embrague:'EMBRAGUE / CLUTCH', 'bombas-freno':'BOMBAS / FRENOS', 'freno-aire':'FRENO DE AIRE (PESADO)', soporteria:'SOPORTERÍA', muelles:'HOJAS DE MUELLE / SOPORTES', luces:'LUCES', bombillos:'BOMBILLOS', direccion:'DIRECCIÓN', otros:'OTROS' };
  const esc = s => String(s).replace(/'/g, "\\'");
  let body = '';
  for (const c of order) {
    const rows = T.filter(r => r.c === c);
    if (!rows.length) continue;
    body += '\n  /* ——— ' + catName[c] + ' ——— */\n';
    for (const r of rows) {
      const fields = [
        "name:'" + esc(r.n) + "'",
        "ref:'" + esc(r.r) + "'",
        "brand:'" + esc(r.b) + "'",
        "cat:'" + r.c + "'",
        'price:' + r.h,
      ];
      if (r.a && r.a > r.h) fields.push('priceOld:' + r.a);
      fields.push("img:'assets/products/" + r.s + ".webp'");
      body += '  { ' + fields.join(', ') + ' },\n';
    }
  }

  const header = fs.readFileSync(path.join(__dirname, '_productos-header.txt'), 'utf8');
  const out = header + '\nwindow.GRUPEN_PRODUCTS = [\n' + body + '\n];\n';
  fs.writeFileSync(path.join(__dirname, 'productos.js'), out, 'utf8');
  console.log('productos.js generado con ' + T.length + ' productos.');
}
run().catch(e => { console.error(e); process.exit(1); });
