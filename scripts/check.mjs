import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const games = JSON.parse(await readFile('data/catalog.json', 'utf8'));
const allowed = ['id','title','platform','year','genre','region','format','status','condition','description','color','marketValue','marketMin','marketMax','valuationDate','photos','coverPhoto'];
assert(Array.isArray(games)); const ids = new Set();
for (const game of games) {
  assert.deepEqual(Object.keys(game).sort(), [...allowed].sort(), 'Only public fields may be published');
  assert(!ids.has(game.id), 'Duplicate id'); ids.add(game.id);
  for (const field of allowed.filter(k => !['year','marketValue','marketMin','marketMax','valuationDate','photos','coverPhoto'].includes(k))) assert(typeof game[field] === 'string' && game[field].length > 0, field);
  assert(Number.isInteger(game.year) && game.year >= 1970 && game.year <= 2100);
  assert(/^#[0-9a-f]{6}$/i.test(game.color));
  for (const field of ['marketValue','marketMin','marketMax']) assert(typeof game[field] === 'number' && Number.isFinite(game[field]) && game[field] >= 0, field);
  assert(Array.isArray(game.photos),'photo gallery');
  const order=['front','back','inside','discPrinted','discBack','extras','accessory'];
  const ranks=game.photos.map(p=>order.indexOf(p.kind));
  assert(ranks.every((rank,i)=>rank>=0 && (i===0 || rank>=ranks[i-1])), 'Explicit preferred gallery order');
  assert(new Set(game.photos.map(p=>p.src)).size===game.photos.length,'Unique gallery photos');
  const fronts=game.photos.filter(p=>p.kind==='front');
  assert(game.coverPhoto===null || typeof game.coverPhoto==='string','Explicit cover or null');
  if(fronts.length)assert(game.coverPhoto===fronts[0].src && game.photos[0].src===game.coverPhoto,'Closed front must be explicit cover and first gallery photo');
  else assert(game.coverPhoto===null,'Never substitute an interior or disc for the missing front');
  for (const photo of game.photos) {
    assert(Object.keys(photo).sort().join(',') === 'kind,label,src', 'Photo fields');
    assert(typeof photo.label === 'string' && photo.label.length > 0, 'Photo label');
    const bytes = await readFile(photo.src); assert(bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP', 'Real WebP asset');
    assert(typeof photo.src === 'string' && /^images\/[a-z0-9-]+\.webp$/.test(photo.src), 'Photo must be a local WebP asset');
  }
  assert(game.marketMin <= game.marketValue && game.marketValue <= game.marketMax, 'Market value must be within valuation range');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(game.valuationDate) && !Number.isNaN(Date.parse(game.valuationDate)), 'valuationDate must be a real ISO date');
  assert(['En colección','Lista de deseos'].includes(game.status));
}
const history = JSON.parse(await readFile('data/value-history.json', 'utf8'));
assert(Array.isArray(history), 'History is an array');
for (const entry of history) {
  assert.deepEqual(Object.keys(entry).sort(), ['date','note','total'], 'History contains only public fields');
  assert(typeof entry.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.date) && !Number.isNaN(Date.parse(entry.date)), 'History date');
  assert(typeof entry.total === 'number' && Number.isFinite(entry.total) && entry.total >= 0, 'History total');
  assert(typeof entry.note === 'string' && entry.note.length > 0, 'History note');
}
const js = await readFile('app.js', 'utf8');
assert(!js.includes('innerHTML'), 'Render catalogue text safely');
assert(!/purchasePrice|seller|receipt|github_pat_|ghp_/.test(js));
const html = await readFile('index.html','utf8');
for (const asset of ['styles.css','app.js','data/catalog.json']) await readFile(asset);
assert(html.includes('lang="es"') && html.includes('name="viewport"'));
console.log(`OK: ${games.length} public records; unique IDs, strict field allowlist, local assets and safe text rendering.`);

assert.equal(games.length,80); assert.equal(games.reduce((n,g)=>n+g.marketValue,0),853);
assert.equal(games.reduce((n,g)=>n+g.photos.length,0),253);
for (const game of games.slice(10)) {
 const sealed=['rgv-0045','rgv-0046','rgv-0047'].includes(game.id);
 assert.deepEqual(game.photos.map(p=>p.kind),sealed?['front','back']:['front','back','inside'],'Gallery must match available original photographs');
}
assert.equal(games.filter(g=>g.title.includes('Puyo Puyo! 15th Anniversary')).length,1,'No duplicate Puyo Puyo');
assert.equal(games.find(g=>g.id==='rgv-0040').photos.length,3);

const codeInBox=games.find(g=>g.id==='rgv-0054');
assert(codeInBox.format.includes('sin cartucho') && codeInBox.marketValue===2);
assert.equal(games.slice(70).reduce((n,g)=>n+g.photos.length,0),30);

const valuations=JSON.parse(await readFile('data/valuations-lot07.json','utf8'));
assert.equal(valuations.items.length,10);
assert.equal(valuations.items.reduce((n,v)=>n+v.estimatedValue,0),129);
for(const v of valuations.items){
 const game=games.find(g=>g.id===v.itemId);
 assert(game && game.marketValue===v.estimatedValue && game.marketMin===v.rangeMin && game.marketMax===v.rangeMax);
 assert(['baja','media','alta'].includes(v.confidence) && v.provisional===true && v.digitalBonusValue===0);
 assert.equal(v.valuationDate,game.valuationDate);
 assert(v.sources.length && v.sources.every(x=>x.url.startsWith('https://')));
}

const lot08=JSON.parse(await readFile("data/valuations-lot08.json","utf8"));
assert.equal(lot08.items.length,10);assert.equal(lot08.total,106);assert.equal(lot08.items.reduce((s,v)=>s+v.estimatedValue,0),106);
for(const v of lot08.items){const g=games.find(g=>g.id===v.itemId);assert(g && g.marketValue===v.estimatedValue && g.marketMin===v.rangeMin && g.marketMax===v.rangeMax && g.valuationDate===v.valuationDate);assert(v.provisional && v.digitalBonusValue===0 && ["baja","media","alta"].includes(v.confidence));assert(v.sources.length && v.sources.every(s=>s.url.startsWith("https://")));}
