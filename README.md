# Retro Game Vault · Lotes 01–05

Cincuenta juegos y 452 € de valoración provisional: 120 € del lote 01, 83 € del lote 02, 58 € del lote 03, 72 € del lote 04 y 119 € del lote 05. Se conservan las valoraciones previas.

## Fotografías disponibles

163 fotografías originales enlazadas: 46 del lote 01, 30 de cada lote 02, 03 y 04 y 27 del lote 05. Cada ficha 011–040 incluye frontal cerrado, contraportada e interior; GTA V muestra sus dos discos. Las imágenes públicas están optimizadas en WebP, sin EXIF ni XMP. Las pegatinas con precios y procedencia de FIFA 15 llevan máscaras opacas; los originales sin modificar se guardan solo en el repositorio privado. No se garantiza la validez de códigos antiguos ni el estado de caras de lectura no fotografiadas.

## Validar y ejecutar
Node 22 o posterior. Sin instalar paquetes:
```sh
npm run check
node --check app.js
npm run build
node scripts/serve.mjs
```
Abrir http://127.0.0.1:4173. Las rutas relativas son compatibles con /retro-game-vault/ en Pages. El build regenera dist exclusivamente con recursos públicos.

## Descomprimir y subir a GitHub
1. En Windows, botón derecho sobre el ZIP → Extraer todo → Extraer.
2. Abrir https://github.com/xefnascrypto-star/retro-game-vault y crear una rama desde main.
3. Add file → Upload files. Arrastrar el contenido de la carpeta extraída a la raíz, conservando subcarpetas. No subir el ZIP ni una carpeta contenedora adicional. index.html y package.json deben quedar en la raíz.
4. Incluir data/, images/, scripts/, .github/workflows/pages.yml, .nojekyll y .gitignore. Ver → Mostrar → Elementos ocultos en el Explorador permite comprobarlos. GitHub Desktop permite copiar todos los archivos preservando las rutas.
5. Esperar a que terminen las cargas, escribir un mensaje y pulsar Commit changes. Revisar el pull request y fusionarlo.
6. Settings → Pages → Source: GitHub Actions. Comprobar que el workflow termina correctamente en Actions.
7. Abrir https://xefnascrypto-star.github.io/retro-game-vault/ y comprobar cincuenta juegos, 452 €, filtros, fichas y ampliación de fotografías.

GitHub no descomprime los ZIP automáticamente.
Documentación: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Privacidad
El ZIP no contiene datos de compra, recibos, originales con EXIF ni historial Git. Los datos de adquisición se mantienen en el repositorio privado y el navegador no accede a ellos. No habilitar Pages en ese repositorio.

## Norma de portada y galería
La portada se asigna manualmente en coverPhoto a la primera fotografía enviada por el propietario, normalmente el frontal con la caja cerrada. Si el frontal cerrado está disponible, debe ser la portada y abrir la galería. No se selecciona por nombre de archivo, orden alfabético ni por la primera imagen que logre recuperar una herramienta.

El array photos se guarda explícitamente en este orden: front (frontal cerrado), back (contraportada), inside (interior abierto), discPrinted (cara impresa), discBack (cara de lectura), extras (manuales, panfletos, códigos y extras), accessory (steelbook, funda, pin y accesorios). Dentro de cada categoría se conserva el orden de envío. Una foto que reúne interior y folletos se clasifica como interior; no se duplica.

Los cincuenta juegos tienen portada frontal cerrada explícita. Las galerías de los lotes 02, 03 y 04 siguen el orden frontal, contraportada e interior, comprobado visualmente sobre los adjuntos originales.

## Lote 03

Diez juegos 021–030, valorados por el propietario en 58 € provisionales. Las treinta fotos proceden del ZIP original aportado y sus SHA-256 se verificaron antes de convertir a WebP con proporciones conservadas. Test Drive y Chorus tienen discos diferentes; Liberation y WRC 4 muestran sus cartuchos PS Vita. Los datos y las 76 imágenes previas se conservan sin cambios. No se añaden precios de compra ni procedencias.

## Lote 04

Diez juegos 031–040, valorados por el propietario en 72 € provisionales. Las 30 fotos del ZIP aportado se verificaron contra SHA256 ZIP de manifest.csv antes de convertirlas a WebP. La portada de Mario Kart DS ya estaba corregida; su hash ZIP difiere justificadamente del hash del original anterior a esa rotación. El ZIP original permanece sin modificar.

Corrección visual: las tres imágenes rotuladas 0037 en el ZIP corresponden a Mario Party DS y las tres rotuladas 0039 corresponden a Yoshi's Island DS. Se asignan a rgv-0039 y rgv-0037, respectivamente, manteniendo los identificadores y valores acordados (7 € y 9 €). Las 30 fichas, las 106 fotos y el historial previo se conservan sin cambios. Las etiquetas comerciales de inventario de F1 2010 y SBK 09 se ocultan solo en las copias públicas; no se publican datos de adquisición. Los textos visibles de carátulas y manuales no confirman los idiomas disponibles en ejecución ni el funcionamiento de los soportes.

Años de las ediciones japonesas contrastados con las fichas oficiales de [Children of Mana](https://www.nintendo.co.jp/ds/software/asej/index.html), [Yoshi's Island DS](https://www.nintendo.com/jp/titles/20010000013369.html), [Mario Kart DS](https://www.nintendo.co.jp/ds/amcj/index.html), [Mario Party DS](https://www.nintendo.co.jp/ds/a8tj/index.html) y [Puyo Puyo!](https://www.nintendo.co.jp/ds/software/apuj/index.html). Table Game Spirits V se identifica por el código de caja NTR-P-B3TJ y la [ficha de Famitsu](https://www.famitsu.com/game/title/5996/page/1).

## Lote 05

Diez registros nuevos rgv-0041–rgv-0050 y 27 fotos, exclusivamente del ZIP corregido aportado; hashes y tamaños verificados contra manifest.json. Los tres precintados 045–047 solo muestran frontal y trasera: no se afirma haber comprobado cartuchos ni contenido interior. Puyo Puyo! 15th Anniversary permanece exclusivamente en rgv-0040, sin nuevas fotos ni registro duplicado. Los primeros 40 registros, las 136 fotos y el historial previo quedan intactos. El incremento de 119 € se registra el 15 de noviembre de 2026. El ZIP original permanece sin modificar. Las copias WebP no incluyen EXIF/XMP; se ocultan las etiquetas comerciales de inventario de Miitopia y James Noir en las copias públicas.

Los años de Nintendo Selects indican el lanzamiento europeo del juego original (Luigi 2013, Mario Party 2014) o de la versión Welcome amiibo (2016), sin atribuir una fecha de fabricación a estas unidades. Referencias oficiales: [Magia en acción](https://www.nintendo.com/es-es/Noticias/2008/Ya-a-la-venta-Nintendo-DS-Magia-en-accion-Realiza-trucos-que-dejaran-asombrados-a-tus-amigos-250541.html), [Luigi's Mansion 2](https://www.nintendo.com/es-es/Noticias/2013/marzo/Luigi-s-Mansion-2-ya-esta-aqui-adentrate-en-la-mansion-hoy-mismo-y-celebra-el-comienzo-del-anio-de-Luigi-741271.html), [Mario Party: Island Tour](https://www.nintendo.com/en-gb/Games/Nintendo-3DS-games/Mario-Party-Island-Tour-838846.html), [Welcome amiibo](https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-3DS/Animal-Crossing-New-Leaf-Welcome-amiibo-273841.html).
