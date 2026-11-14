import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const games=JSON.parse(await readFile('data/catalog.json','utf8'));
const files=new Map([['/',['index.html','text/html']], ...['index.html','app.js','styles.css','data/catalog.json','data/value-history.json'].map(p=>['/'+p,[p,p.endsWith('.json')?'application/json':p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html']]), ...games.flatMap(g=>g.photos.map(p=>['/'+p.src,[p.src,'image/webp']]))]);
createServer(async(req,res)=>{const entry=files.get(new URL(req.url,'http://localhost').pathname);if(!entry){res.writeHead(404);res.end('Not found');return;}try{res.writeHead(200,{'Content-Type':entry[1]});res.end(await readFile(entry[0]));}catch{res.writeHead(500);res.end('Unable to read asset');}}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173'));
