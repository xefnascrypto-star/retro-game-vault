# Retro Game Vault V1

Catálogo responsive en español sin dependencias: búsqueda por título/género/plataforma, filtros combinados, orden por título/año y fichas accesibles con teclado. Los ocho juegos iniciales son **datos de demostración**, no un inventario confirmado. El año corresponde al lanzamiento original; región y conservación son ejemplos.

## Editar el catálogo

Modificar `data/catalog.json`, usando un ID estable por ejemplar. Sustituir los registros `demo-*` por los juegos reales. Campos públicos permitidos: `id`, `title`, `platform`, `year`, `genre`, `region`, `format`, `status`, `condition`, `description`, `color`. Estado: `En colección` o `Lista de deseos`. Color hexadecimal de seis dígitos. Portadas tipográficas originales, sin imágenes oficiales ni recursos externos.

Nunca añadir información de compras o datos personales al catálogo, descripciones, imágenes, commits ni incidencias públicas. El navegador no accede al repositorio privado. Esta V1 no tiene panel privado: un sitio estático no puede proteger secretos.

## Verificar y ejecutar

Node 22 o posterior. Sin instalar dependencias:

```sh
npm run check
node --check app.js
npm run build
```

Servir esta carpeta mediante un servidor HTTP estático (por ejemplo `python -m http.server 4173`) y abrir `http://localhost:4173`. No abrir con `file://`, porque el catálogo se carga con fetch.

## GitHub Pages

El workflow `.github/workflows/pages.yml` valida los campos públicos y empaqueta solo `dist/`. En Settings → Pages debe elegirse **GitHub Actions** como fuente. Si el workflow no puede habilitar Pages, un administrador debe seleccionar esta fuente y volver a ejecutarlo en Actions. URL esperada tras un despliegue correcto: https://xefnascrypto-star.github.io/retro-game-vault/

## Límites de V1

La edición se hace en el JSON de GitHub; no hay escritura desde la web ni sincronización privada. Pendientes: inventario real, fotografías propias, fichas separadas de consolas y un flujo de administración autenticado. No publicar el repositorio privado en Pages.
