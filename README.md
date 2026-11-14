# Retro Game Vault · Lote 01
Diez juegos reales y 120 € de valoración provisional confirmada por el propietario el 14 de noviembre de 2026. No es una nueva tasación de mercado. Si mínimo y máximo coinciden, el rango está pendiente de confirmar.

## Fotografías disponibles
NBA 2K14: cuatro. Star Wars Battlefront: cuatro. Dragon Ball Xenoverse 2: dos (faltan portada y contraportada). Juegos 001–007: fotos no accesibles, pendientes de recuperar. Se incluyen únicamente originales convertidos a WebP sin EXIF, sin imágenes de Internet. Las fichas sin fotos muestran una composición tipográfica e indican su ausencia. No se garantizan discos ni códigos descargables.

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
7. Abrir https://xefnascrypto-star.github.io/retro-game-vault/ y comprobar diez juegos, 120 €, filtros, fichas y ampliación de fotografías.

GitHub no descomprime los ZIP automáticamente.
Documentación: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Privacidad
El ZIP no contiene datos de compra, recibos, originales con EXIF ni historial Git. Los datos de adquisición se mantienen en el repositorio privado y el navegador no accede a ellos. No habilitar Pages en ese repositorio.

## Norma de portada y galería
La portada se asigna manualmente en coverPhoto a la primera fotografía enviada por el propietario, normalmente el frontal con la caja cerrada. Si el frontal cerrado está disponible, debe ser la portada y abrir la galería. No se selecciona por nombre de archivo, orden alfabético ni por la primera imagen que logre recuperar una herramienta.

El array photos se guarda explícitamente en este orden: front (frontal cerrado), back (contraportada), inside (interior abierto), discPrinted (cara impresa), discBack (cara de lectura), extras (manuales, panfletos, códigos y extras), accessory (steelbook, funda, pin y accesorios). Dentro de cada categoría se conserva el orden de envío. Una foto que reúne interior y folletos se clasifica como interior; no se duplica.

En este lote solo están accesibles los frontales cerrados de Battlefront y NBA 2K14: quedan fijados expresamente como portadas. Xenoverse 2 conserva sus dos fotos en la galería, pero no usa el disco ni el interior como portada. Los otros siete juegos también mantienen coverPhoto: null hasta recuperar su frontal original. No está disponible el orden cronológico original de los adjuntos; no se ha reconstruido a partir de la lista técnica de recuperación.
