import {readFile,writeFile} from 'node:fs/promises';
const load=async path=>JSON.parse(await readFile(path,'utf8'));
const games=await load('data/catalog.json'), mappings=await load('data/market-mappings.json');
let previous={reviews:[]};try{previous=await load('data/market-reviews.json')}catch(e){if(e.code!=='ENOENT')throw e;}
const last=previous.reviews.at(-1);const prices={...(last?.prices||{})};const prior={...prices};let changed=0,verified=0;
const get=async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'RetroGameVault/1.0 personal collection'}});if(!r.ok)throw Error(`HTTP ${r.status}`);return r;};
const xml=await (await get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')).text();
const date=xml.match(/time=['"](\d{4}-\d{2}-\d{2})['"]/)?.[1], usd=Number(xml.match(/currency=['"]USD['"]\s+rate=['"]([\d.]+)['"]/)?.[1]);
if(!date||!Number.isFinite(usd)||usd<=0||Date.now()-Date.parse(date)>7*86400000)throw Error('Tipo de cambio BCE ausente o desactualizado');
for(const m of mappings){
 try{
  const game=games.find(g=>g.id===m.id);if(!game||game.status!=='En colección'||game.title!==m.title||game.platform!=='Sega Mega Drive'||!game.region.includes('PAL'))throw Error('Identidad o estado no coincide');
  const api=await (await get(`https://gamepricefeed.com/api/price?family=${encodeURIComponent(m.family)}&slug=${encodeURIComponent(m.slug)}`)).json();
  const quote=api.prices_by_region?.[m.region]?.[m.condition];const url=`https://gamepricefeed.com/game/${m.family}/${m.slug}`;
  if(api.game!==m.title||api.platform!==m.family||api.slug!==m.slug||api.credit?.link!==url||!quote||quote.currency!=='USD'||!['high','good'].includes(quote.confidence)||quote.n<5||!Number.isFinite(quote.median)||quote.median<=0)throw Error('Referencia o ventas insuficientes');
  const value=Math.round(quote.median/usd*m.factor);const old=prices[m.id]?.value??game.marketValue;if(value<1||Math.abs(value-old)/old>0.35)throw Error('Variación superior al 35 %, requiere revisión');
  verified++;if(value!==old)changed++;prices[m.id]={value,source:'gamepricefeed',url,queryDate:new Date().toISOString(),confidence:quote.confidence,sales:quote.n,region:m.region,condition:m.condition,medianUSD:quote.median,fxDate:date,usdPerEUR:usd,factor:m.factor,adjustment:m.reason};
 }catch(e){console.error(`${m.id}: se conserva el último valor (${e.message})`);}
 await new Promise(r=>setTimeout(r,750));
}
if(!verified)throw Error('Ninguna referencia fiable verificada; no se registra una revisión');
const owned=games.filter(g=>g.status==='En colección');
const total=owned.reduce((s,g)=>s+(prices[g.id]?.value??g.marketValue),0);
const members=Object.fromEntries(owned.map(g=>[g.id,prices[g.id]?.value??g.marketValue]));
const marketChange=last?.members?owned.filter(g=>Object.hasOwn(last.members,g.id)).reduce((s,g)=>s+members[g.id]-last.members[g.id],0):null;
const acquisitions=last?.members?owned.filter(g=>!Object.hasOwn(last.members,g.id)).reduce((s,g)=>s+members[g.id],0)-Object.keys(last.members).filter(id=>!Object.hasOwn(members,id)).reduce((s,id)=>s+last.members[id],0):null;
const review={date:new Date().toISOString(),total,marketChange,acquisitions,verified,members,prices};
previous.reviews.push(review);await writeFile('data/market-reviews.json',JSON.stringify(previous,null,2)+'\n');console.log(JSON.stringify({verified,changed,total,marketChange}));
