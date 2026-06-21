/* =======================================================================
   GRUPEN ALMACÉN — INVENTARIO DE PRODUCTOS
   =======================================================================
   👉 ESTE ES EL ÚNICO ARCHIVO QUE EDITAS PARA AGREGAR / QUITAR REPUESTOS.
   No necesitas tocar nada más. Guarda el archivo y recarga la página.

   ───────────────────────────────────────────────────────────────────────
   CÓMO AGREGAR UN PRODUCTO
   ───────────────────────────────────────────────────────────────────────
   Copia una línea de abajo, pégala y cambia los datos. Cada producto es:

     { name:'NOMBRE',  ref:'REFERENCIA',  brand:'MARCA',  cat:'CATEGORIA',  img:'FOTO',  promo:true },

   • name  → Nombre del repuesto (OBLIGATORIO).            Ej: 'Filtro de Aceite'
   • ref   → Número de referencia (OBLIGATORIO).            Ej: 'PH-30' o 'B-7577'
   • brand → Marca (opcional, deja '' si no tiene).         Ej: 'Baldwin'
   • cat   → Categoría (OBLIGATORIO). Usa uno de los IDs de la lista de abajo.
   • img   → Foto del producto (OPCIONAL). Si no tienes foto, BÓRRALO:
             pon la foto en la carpeta  assets/products/  y escribe su nombre,
             ej:  img:'assets/products/filtro-aceite.webp'
             Si no pones img, se muestra el ícono de la categoría (igual se ve bien).
   • promo → Pon  promo:true  SOLO si ese producto es "Paga 1 Lleva 2".
             Si no es promo, BÓRRALO de la línea.

   Las comas y las comillas importan: cada línea termina en coma  },
   (la última también puede llevar coma, no pasa nada).

   ───────────────────────────────────────────────────────────────────────
   IDs DE CATEGORÍA VÁLIDOS (la columna 'cat')
   ───────────────────────────────────────────────────────────────────────
     luces         → Luces (faros, stops, lámparas)
     bombillos     → Bombillos
     muelles       → Hojas de Muelle
     filtros       → Filtros (aceite, aire, combustible…)
     correas       → Correas
     bombas-freno  → Bombas de Freno
     pastillas     → Pastillas de Freno
     freno-aire    → Freno de Aire (vehículo pesado)
     soporteria    → Soportería
     electrico     → Sistema Eléctrico (switches, tapas, etc.)
     retenedores   → Retenedores
     rodamientos   → Rodamientos
     llantas       → Llantas
     lubricantes   → Lubricantes / Aceites
     otros         → Otros Repuestos (lo que no encaje arriba)

   (¿Necesitas una categoría nueva? Avísame y la agrego.)
   ======================================================================= */

window.GRUPEN_PRODUCTS = [

  /* ——— LUCES (faros · stops · lámparas) ——— */
  { name:'Faro Sellado Halógeno H4651', ref:'H4651', brand:'Wagner', cat:'luces', img:'assets/products/lampara1.webp', promo:true },
  { name:'Faro Halógeno H6054 Alto/Bajo', ref:'H6054', brand:'Wagner', cat:'luces', img:'assets/products/lampara3.webp', promo:true },
  { name:'Faro Sellado Stanley', ref:'Sealed Beam', brand:'Stanley', cat:'luces', img:'assets/products/lampara2.webp', promo:true },
  { name:'Stop Toyota Land Cruiser', ref:'STOP-TOY', brand:'', cat:'luces', img:'assets/products/stop1.webp', promo:true },
  { name:'Stop Daihatsu 4-105', ref:'4-105', brand:'Multipartes', cat:'luces', img:'assets/products/stop2.webp' },
  { name:'Stop Renault 6', ref:'4-95', brand:'Multipartes', cat:'luces', img:'assets/products/stop3.webp' },
  { name:'Stop Chevrolet Chevette', ref:'STOP-CHEV', brand:'', cat:'luces', img:'assets/products/stop4.webp' },
  { name:'Lámpara Triple Cromada', ref:'LT-CROM', brand:'', cat:'luces', img:'assets/products/stop5.webp' },
  { name:'Stop Chevrolet LUV 1600', ref:'4-117', brand:'Multipartes', cat:'luces', img:'assets/products/stop6.webp', promo:true },
  { name:'Lámpara Stop Renault 4', ref:'R-4-72', brand:'', cat:'luces', img:'assets/products/stop7.webp' },

  /* ——— SISTEMA ELÉCTRICO (tapas distribuidor · switches) ——— */
  { name:'Tapa Distribuidor Denso EDC-72', ref:'EDC-72', brand:'Valley Forge', cat:'electrico', img:'assets/products/tapadistribuidor.webp' },
  { name:'Tapa Distribuidor Chrysler DC-85', ref:'DC-85', brand:'Valley Forge', cat:'electrico', img:'assets/products/tapadistribuidor2.webp' },
  { name:'Tapa Distribuidor DR-450', ref:'DR-450', brand:'Standard', cat:'electrico', img:'assets/products/tapadistribuidor3.webp' },
  { name:'Switch de Encendido MAX', ref:'SW-MAX', brand:'MAX', cat:'electrico', img:'assets/products/llaves2.webp' },
  { name:'Switch de Encendido Ford Truck', ref:'16-40X', brand:'', cat:'electrico', img:'assets/products/llaves3.webp' },
  { name:'Switch de Encendido con Llaves', ref:'SW-ENC', brand:'', cat:'electrico', img:'assets/products/llaves4.webp' },
  { name:'Switches de Encendido (surtido)', ref:'LS-40X', brand:'Valley Forge', cat:'electrico', img:'assets/products/llaves1.webp' },

  /* ——— AGREGA AQUÍ TUS NUEVOS REPUESTOS (livianos y pesados) ———
     Ejemplo (quítale el // del inicio para activarlo):
  { name:'Filtro de Aceite', ref:'PH-30', brand:'Fram', cat:'filtros' },
  { name:'Pastillas de Freno Delanteras', ref:'D-1234', brand:'Bendix', cat:'pastillas' },
  */

];
