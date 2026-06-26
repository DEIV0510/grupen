/* =======================================================================
   GRUPEN ALMACÉN — INVENTARIO DE PRODUCTOS
   =======================================================================
   👉 ESTE ES EL ÚNICO ARCHIVO QUE EDITAS PARA AGREGAR / QUITAR REPUESTOS.
   No necesitas tocar nada más. Guarda el archivo y recarga la página.

   ───────────────────────────────────────────────────────────────────────
   CÓMO AGREGAR UN PRODUCTO
   ───────────────────────────────────────────────────────────────────────
   Copia una línea de abajo, pégala y cambia los datos. Cada producto es:

     { name:'NOMBRE', ref:'REF', brand:'MARCA', cat:'CATEGORIA', price:HOY, priceOld:ANTES, img:'FOTO' },

   • name     → Nombre del repuesto (OBLIGATORIO).
   • ref      → Número de referencia (opcional, deja '' si no tiene).
   • brand    → Marca (opcional, deja '').
   • cat      → Categoría (OBLIGATORIO). Usa un ID de la lista de abajo.
   • price    → Precio de HOY en pesos, SOLO números, sin puntos ni $. Ej: 13000
   • priceOld → Precio ANTES (tachado). Opcional: si lo pones, se ve el descuento.
                Si no hay descuento, BÓRRALO de la línea.
   • img      → Foto en assets/products/. Opcional: si no hay, BÓRRALO y se
                muestra el ícono de la categoría.

   Las comas y comillas importan: cada línea termina en  },

   ───────────────────────────────────────────────────────────────────────
   IDs DE CATEGORÍA VÁLIDOS (la columna 'cat')
   ───────────────────────────────────────────────────────────────────────
     filtros        → Filtros (aceite, aire, combustible, secador)
     electrico      → Sistema Eléctrico (bobinas, reguladores, relays, sensores,
                      terminales, escobillas, carbones, solenoides, vacum…)
     embrague       → Embrague / Clutch (bombas, kits, reparaciones)
     bombas-freno   → Bombas de Freno / reparaciones
     freno-aire     → Freno de Aire (vehículo pesado: secador, válvulas)
     soporteria     → Soportería (soportes de motor, caja, balancín)
     muelles        → Hojas de Muelle / soportes de muelle
     luces          → Luces (exploradoras, cambia luz)
     bombillos      → Bombillos
     direccion      → Dirección (extremos, terminales de dirección)
     pastillas      → Pastillas de Freno
     correas        → Correas
     retenedores    → Retenedores
     rodamientos    → Rodamientos
     llantas        → Llantas
     lubricantes    → Lubricantes / Aceites
     otros          → Otros Repuestos

   (¿Necesitas una categoría nueva? Avísame y la agrego.)

   ⚠️ Generado desde "Productos grupen" con process-productos.js. Puedes
      editarlo a mano de aquí en adelante (no vuelvas a correr ese script o
      sobreescribe tus cambios).
   ======================================================================= */

window.GRUPEN_PRODUCTS = [

  /* ——— FILTROS ——— */
  { name:'Filtro Partmo A-4041', ref:'A-4041', brand:'Partmo', cat:'filtros', price:13000, priceOld:20000, img:'assets/products/filtro-a4041.webp' },
  { name:'Filtro 4050 Gran Vitara Diésel', ref:'4050', brand:'', cat:'filtros', price:9800, priceOld:15000, img:'assets/products/filtro-4050-gran-vitara.webp' },
  { name:'Filtro de Aire A-124 Renault 18', ref:'A-124', brand:'', cat:'filtros', price:13400, priceOld:20500, img:'assets/products/filtro-aire-a124-renault18.webp' },
  { name:'Filtro de Aceite 57609 Mercedes', ref:'57609', brand:'', cat:'filtros', price:59300, priceOld:91200, img:'assets/products/filtro-aceite-57609-mercedes.webp' },
  { name:'Filtro de Combustible Kobelco', ref:'', brand:'', cat:'filtros', price:29250, priceOld:45000, img:'assets/products/filtro-combustible-kobelco.webp' },
  { name:'Filtro de Combustible A-31', ref:'A-31', brand:'', cat:'filtros', price:34000, priceOld:52400, img:'assets/products/filtro-combustible-a31.webp' },
  { name:'Filtro FA-139 Mitsubishi Montero', ref:'FA-139', brand:'', cat:'filtros', price:16250, priceOld:25000, img:'assets/products/filtro-fa139-montero.webp' },

  /* ——— SISTEMA ELÉCTRICO ——— */
  { name:'Bobina / Portamagneto LX-204 Ford 8 Cilindros', ref:'LX-204', brand:'', cat:'electrico', price:40300, priceOld:62000, img:'assets/products/bobina-lx204-ford.webp' },
  { name:'Carbones FX-33', ref:'FX-33', brand:'', cat:'electrico', price:13000, priceOld:20000, img:'assets/products/carbones-fx33.webp' },
  { name:'Conector Ford', ref:'', brand:'', cat:'electrico', price:16250, priceOld:25000, img:'assets/products/conector-ford.webp' },
  { name:'Escobilla Dodge', ref:'', brand:'', cat:'electrico', price:6500, priceOld:10000, img:'assets/products/escobilla-dodge.webp' },
  { name:'Flash Tridon Novita 12V', ref:'', brand:'Tridon', cat:'electrico', price:28000, priceOld:41600, img:'assets/products/flash-tridon-novita-12v.webp' },
  { name:'Fusible 30mm 15 Amperios', ref:'', brand:'', cat:'electrico', price:250, priceOld:500, img:'assets/products/fusible-30mm-15a.webp' },
  { name:'Regulador NLR-112 12V', ref:'NLR-112', brand:'', cat:'electrico', price:28600, priceOld:44000, img:'assets/products/regulador-nlr112-12v.webp' },
  { name:'Regulador de Voltaje VR-35 Dodge', ref:'VR-35', brand:'', cat:'electrico', price:70000, priceOld:139000, img:'assets/products/regulador-vr35-dodge.webp' },
  { name:'Relay 12V 4 Pines', ref:'', brand:'', cat:'electrico', price:33800, priceOld:52000, img:'assets/products/relay-12v-4pines.webp' },
  { name:'Solenoide 24V Marcha 40MT', ref:'40MT', brand:'', cat:'electrico', price:75000, priceOld:115000, img:'assets/products/solenoide-24v-marcha-40mt.webp' },
  { name:'Rodillo de Alternador 8-109', ref:'8-109', brand:'', cat:'electrico', price:22000, priceOld:33900, img:'assets/products/rodillo-alternador-8109.webp' },
  { name:'Escobillas NPR', ref:'', brand:'', cat:'electrico', price:28990, priceOld:44600, img:'assets/products/escobillas-npr.webp' },
  { name:'Sensor de Temperatura Chevrolet', ref:'', brand:'', cat:'electrico', price:46800, priceOld:72000, img:'assets/products/sensor-temperatura-chevrolet.webp' },
  { name:'Switch Cambia Luz Toyota Land Cruiser', ref:'', brand:'', cat:'electrico', price:27950, priceOld:43000, img:'assets/products/switch-cambialuz-landcruiser.webp' },
  { name:'Terminal de Batería 4.5 cm', ref:'', brand:'', cat:'electrico', price:8500, priceOld:13000, img:'assets/products/terminal-bateria-45cm.webp' },
  { name:'Terminal de Batería 38', ref:'', brand:'', cat:'electrico', price:3250, priceOld:5000, img:'assets/products/terminal-bateria-38.webp' },
  { name:'Terminal de Batería 5 cm', ref:'', brand:'', cat:'electrico', price:10000, priceOld:15700, img:'assets/products/terminal-bateria-5cm.webp' },
  { name:'Vacum de Distribuidor Ford VC-128', ref:'VC-128', brand:'', cat:'electrico', price:29900, priceOld:46000, img:'assets/products/vacum-distribuidor-vc128.webp' },

  /* ——— EMBRAGUE / CLUTCH ——— */
  { name:'Bomba de Clutch 22483 Ford 750', ref:'22483', brand:'Warner', cat:'embrague', price:110000, priceOld:180000, img:'assets/products/bomba-clutch-22483-ford750.webp' },
  { name:'Bomba de Clutch Renault 9 (sin depósito)', ref:'', brand:'', cat:'embrague', price:155000, priceOld:238400, img:'assets/products/bomba-clutch-renault9.webp' },
  { name:'Bomba de Clutch 25669 Ford 750', ref:'25669', brand:'', cat:'embrague', price:117000, priceOld:180000, img:'assets/products/bomba-clutch-25669-ford750.webp' },
  { name:'Bomba de Clutch NPR', ref:'', brand:'', cat:'embrague', price:136500, priceOld:210000, img:'assets/products/bomba-clutch-npr.webp' },
  { name:'Kit de Embrague 3626', ref:'3626', brand:'', cat:'embrague', price:36000, priceOld:55000, img:'assets/products/kit-embrague-3626.webp' },
  { name:'Reparación de Embrague 40421 Montero', ref:'40421', brand:'', cat:'embrague', price:18200, priceOld:28000, img:'assets/products/reparacion-embrague-40421.webp' },

  /* ——— BOMBAS / FRENOS ——— */
  { name:'Bomba de Freno Mazda 323', ref:'', brand:'', cat:'bombas-freno', price:147000, priceOld:225000, img:'assets/products/bomba-freno-mazda323.webp' },
  { name:'Reparación Bomba de Freno NPR', ref:'', brand:'', cat:'bombas-freno', price:22750, priceOld:35000, img:'assets/products/reparacion-bomba-freno-npr.webp' },

  /* ——— FRENO DE AIRE (PESADO) ——— */
  { name:'Filtro Secador Kenworth', ref:'', brand:'', cat:'freno-aire', price:140000, priceOld:215000, img:'assets/products/filtro-secador-kenworth.webp' },
  { name:'Válvula de Remolque', ref:'', brand:'', cat:'freno-aire', price:75000, priceOld:115000, img:'assets/products/valvula-remolque.webp' },

  /* ——— SOPORTERÍA ——— */
  { name:'Soporte de Balancín 5776 Ford', ref:'5776', brand:'', cat:'soporteria', price:118000, priceOld:181400, img:'assets/products/soporte-balancin-5776-ford.webp' },
  { name:'Soporte de Caja NPR', ref:'', brand:'', cat:'soporteria', price:192400, priceOld:296000, img:'assets/products/soporte-caja-npr.webp' },
  { name:'Soporte de Motor Dodge 300', ref:'', brand:'', cat:'soporteria', price:134300, priceOld:206500, img:'assets/products/soporte-dodge-300.webp' },
  { name:'Soporte Sicolsa Ford 800', ref:'', brand:'Sicolsa', cat:'soporteria', price:117000, priceOld:180000, img:'assets/products/soporte-sicolsa-ford800.webp' },

  /* ——— HOJAS DE MUELLE / SOPORTES ——— */
  { name:'Soporte de Muelle B60', ref:'B60', brand:'', cat:'muelles', price:157300, priceOld:242000, img:'assets/products/soporte-muelle-b60.webp' },
  { name:'Soporte de Muelle Ford (Sicolsa)', ref:'SSX215SF', brand:'Sicolsa', cat:'muelles', price:171800, priceOld:264308, img:'assets/products/soporte-muelle-ford.webp' },
  { name:'Soporte de Muelle Superior Doble Troque Freightliner', ref:'', brand:'', cat:'muelles', price:557400, priceOld:857500, img:'assets/products/soporte-muelle-freightliner.webp' },
  { name:'Soporte de Muelle D300', ref:'D300', brand:'', cat:'muelles', price:142400, priceOld:219000, img:'assets/products/soporte-muelle-d300.webp' },

  /* ——— LUCES ——— */
  { name:'Cambia Luz de Pie', ref:'', brand:'', cat:'luces', price:17000, priceOld:34000, img:'assets/products/cambia-luz-pie.webp' },
  { name:'Exploradora 6"', ref:'', brand:'', cat:'luces', price:29250, priceOld:45000, img:'assets/products/exploradora-6.webp' },
  { name:'Stop Toyota Land Cruiser', ref:'4-119', brand:'', cat:'luces', price:90000, feat:true, img:'assets/products/stop-toyota-landcruiser.webp' },
  { name:'Stop Chevrolet Chevette', ref:'', brand:'', cat:'luces', price:80000, feat:true, img:'assets/products/stop-chevrolet-chevette.webp' },
  { name:'Stop Chevrolet LUV 1600', ref:'4-117', brand:'Multipartes', cat:'luces', price:68000, feat:true, img:'assets/products/stop-chevrolet-luv.webp' },
  { name:'Lámpara Triple Cromada', ref:'', brand:'', cat:'luces', price:63000, feat:true, img:'assets/products/lampara-triple-cromada.webp' },
  { name:'Stop Renault 6', ref:'4-95', brand:'Multipartes', cat:'luces', price:50000, feat:true, img:'assets/products/stop-renault-6.webp' },
  { name:'Lámpara Stop Renault 4', ref:'', brand:'', cat:'luces', price:40000, feat:true, img:'assets/products/lampara-stop-renault-4.webp' },
  { name:'Stop Daihatsu 4-105', ref:'4-105', brand:'Multipartes', cat:'luces', price:34000, feat:true, img:'assets/products/stop-daihatsu-4105.webp' },
  { name:'Lámpara Campero Toyota Direccional Delantero', ref:'', brand:'', cat:'luces', price:80000, img:'assets/products/lampara-campero-toyota.webp' },
  { name:'Regleta Triple', ref:'', brand:'', cat:'luces', price:54000, img:'assets/products/regleta-triple.webp' },
  { name:'Lámpara Sema', ref:'', brand:'', cat:'luces', price:25000, img:'assets/products/lampara-sema.webp' },

  /* ——— BOMBILLOS ——— */
  { name:'Bombillo P45 12V', ref:'P45', brand:'', cat:'bombillos', price:9750, priceOld:15000, img:'assets/products/bombillo-p45-12v.webp' },

  /* ——— DIRECCIÓN ——— */
  { name:'Extremo de Dirección Renault 12', ref:'', brand:'', cat:'direccion', price:29900, priceOld:46000, img:'assets/products/extremo-direccion-renault12.webp' },

  /* ——— OTROS ——— */
  { name:'Pegante de Empaquetaduras (peq. $10.000 / grande $15.000)', ref:'', brand:'', cat:'otros', price:10000, img:'assets/products/pegante-empaquetaduras.webp' },
  { name:'Seguro de Caja de Cambios', ref:'', brand:'', cat:'otros', price:7800, priceOld:12000, img:'assets/products/seguro-caja-cambios.webp' },

];
