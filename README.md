# Retro Game Vault · Lotes 01, 02 y 03

Treinta juegos y 261 € de valoración provisional: 120 € del lote 01, 83 € del lote 02 y 58 € del lote 03. Se conservan las valoraciones previas.

## Fotografías disponibles

106 fotografías originales enlazadas: 46 del lote 01, 30 del lote 02 y 30 del lote 03. Cada ficha 011–030 incluye frontal cerrado, contraportada e interior; GTA V muestra sus dos discos. Las imágenes públicas están optimizadas en WebP, sin EXIF ni XMP. Las pegatinas con precios y procedencia de FIFA 15 llevan máscaras opacas; los originales sin modificar se guardan solo en el repositorio privado. No se garantiza la validez de códigos antiguos ni el estado de caras de lectura no fotografiadas.

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
7. Abrir https://xefnascrypto-star.github.io/retro-game-vault/ y comprobar treinta juegos, 261 €, filtros, fichas y ampliación de fotografías.

GitHub no descomprime los ZIP automáticamente.
Documentación: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Privacidad
El ZIP no contiene datos de compra, recibos, originales con EXIF ni historial Git. Los datos de adquisición se mantienen en el repositorio privado y el navegador no accede a ellos. No habilitar Pages en ese repositorio.

## Norma de portada y galería
La portada se asigna manualmente en coverPhoto a la primera fotografía enviada por el propietario, normalmente el frontal con la caja cerrada. Si el frontal cerrado está disponible, debe ser la portada y abrir la galería. No se selecciona por nombre de archivo, orden alfabético ni por la primera imagen que logre recuperar una herramienta.

El array photos se guarda explícitamente en este orden: front (frontal cerrado), back (contraportada), inside (interior abierto), discPrinted (cara impresa), discBack (cara de lectura), extras (manuales, panfletos, códigos y extras), accessory (steelbook, funda, pin y accesorios). Dentro de cada categoría se conserva el orden de envío. Una foto que reúne interior y folletos se clasifica como interior; no se duplica.

Los treinta juegos tienen portada frontal cerrada explícita. Las galerías de los lotes 02 y 03 siguen el orden frontal, contraportada e interior, comprobado visualmente sobre los adjuntos originales.

## Lote 03

Diez juegos 021–030, valorados por el propietario en 58 € provisionales. Las treinta fotos proceden del ZIP original aportado y sus SHA-256 se verificaron antes de convertir a WebP con proporciones conservadas. Test Drive y Chorus tienen discos diferentes; Liberation y WRC 4 muestran sus cartuchos PS Vita. Los datos y las 76 imágenes previas se conservan sin cambios. No se añaden precios de compra ni procedencias.
