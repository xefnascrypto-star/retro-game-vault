import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const name of ['index.html', 'styles.css', 'app.js', '.nojekyll']) await copyFile(name, `dist/${name}`);
await cp('data', 'dist/data', { recursive: true });
console.log('Public static site built in dist/');
