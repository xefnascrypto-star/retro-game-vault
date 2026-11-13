import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([['/', ['index.html','text/html']], ['/index.html',['index.html','text/html']], ['/app.js',['app.js','text/javascript']], ['/styles.css',['styles.css','text/css']], ['/data/catalog.json',['data/catalog.json','application/json']]]);
createServer(async (req,res) => {
  const entry = files.get(new URL(req.url,'http://localhost').pathname);
  if (!entry) { res.writeHead(404); res.end('Not found'); return; }
  try { const body = await readFile(entry[0]); res.writeHead(200,{'Content-Type':`${entry[1]}; charset=utf-8`}); res.end(body); }
  catch { res.writeHead(500); res.end('Unable to read asset'); }
}).listen(4173,'127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
