import { mkdir, copyFile, cp, rm } from 'node:fs/promises';
await rm('dist', {recursive:true,force:true});
await mkdir('dist', {recursive:true});
for (const name of ['index.html','styles.css','app.js','.nojekyll']) await copyFile(name,`dist/${name}`);
await cp('data','dist/data',{recursive:true});
await cp('images','dist/images',{recursive:true});
console.log('Public site built with original photos.');
