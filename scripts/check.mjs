import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const games = JSON.parse(await readFile('data/catalog.json', 'utf8'));
const allowed = ['id','title','platform','year','genre','region','format','status','condition','description','color'];
assert(Array.isArray(games)); const ids = new Set();
for (const game of games) {
  assert.deepEqual(Object.keys(game).sort(), [...allowed].sort(), 'Only public fields may be published');
  assert(!ids.has(game.id), 'Duplicate id'); ids.add(game.id);
  for (const field of allowed.filter(k => k !== 'year')) assert(typeof game[field] === 'string' && game[field].length > 0, field);
  assert(Number.isInteger(game.year) && game.year >= 1970 && game.year <= 2100);
  assert(/^#[0-9a-f]{6}$/i.test(game.color));
  assert(['En colección','Lista de deseos'].includes(game.status));
}
const js = await readFile('app.js', 'utf8');
assert(!js.includes('innerHTML'), 'Render catalogue text safely');
assert(!/purchasePrice|seller|receipt|github_pat_|ghp_/.test(js));
const html = await readFile('index.html','utf8');
for (const asset of ['styles.css','app.js','data/catalog.json']) await readFile(asset);
assert(html.includes('lang="es"') && html.includes('name="viewport"'));
console.log(`OK: ${games.length} public records; unique IDs, strict field allowlist, local assets and safe text rendering.`);
