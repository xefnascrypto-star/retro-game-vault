const $ = (id) => document.getElementById(id);
let games = [];
let valueHistory = [];
let marketReviews = [];
const euros = value => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
const ownedValue = () => games.filter(g=>g.status==='En colección').reduce((sum,g)=>sum+(Number(g.marketValue)||0),0);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function element(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
function showDetail(game) {
  const content = $('detail-content'); content.replaceChildren(element('p', `${game.platform} / ${game.year}`, 'eyebrow'), element('h2', game.title));
  $('detail-content').querySelector('h2').id = 'detail-title';
  if (game.photos?.length) {
    const gallery = element('div', undefined, 'photo-gallery');
    game.photos.forEach((photo, index) => {
      const button=element('button',undefined,'photo-thumb'); button.type='button'; button.setAttribute('aria-label', 'Ampliar '+photo.label);
      const img=element('img'); img.src=photo.src; img.alt=photo.label+' de '+game.title; img.loading=index===0?'eager':'lazy';img.addEventListener('error',()=>{button.hidden=true;});
      button.append(img,element('span',photo.label));
      button.addEventListener('click',()=>showPhoto(game, index)); gallery.append(button);
    });
    content.append(gallery);
  }
  content.append(element('p', game.description));
  const list = element('dl');
  for (const [label, value] of [['Plataforma', game.platform], ['Año', game.year], ['Género', game.genre], ['Región', game.region], ['Formato', game.format], ['Estado', game.status], ['Conservación', game.condition]]) list.append(element('dt', label), element('dd', value));
  if (Number.isFinite(Number(game.marketValue))) list.append(element('dt','Valor estimado'),element('dd',`${euros(game.marketValue)} · provisional${game.marketSource ? ' · tasación original ' + euros(game.originalValue) : game.marketMin === game.marketMax ? ' · rango pendiente de confirmar' : ' · rango ' + euros(game.marketMin) + '–' + euros(game.marketMax)}`));
  if(game.marketSource){const credit=element('p','Precio orientativo ajustado · ');const link=element('a','gamepricefeed');link.href=game.marketSource.url;link.target='_blank';link.rel='noopener noreferrer';credit.append(link,document.createTextNode(` · ${game.marketSource.sales} ventas · confianza ${game.marketSource.confidence} · ${game.marketSource.adjustment}`));content.append(credit);}
  content.append(list, element('p', 'Valoración provisional del lote. Fotografías originales disponibles: ' + (game.photos.length ? game.photos.length : 'ninguna; pendientes de recuperar') + ''));
  $('detail').showModal();
}
function showPhoto(game,index) {
  const viewer=$('photo-viewer');
  const photo=game.photos[index];
  $('photo-image').src=photo.src;
  $('photo-image').alt=photo.label+' de '+game.title;
  $('photo-caption').textContent=photo.label+' · '+game.title;
  viewer.showModal();
}
$('photo-close').addEventListener('click',()=>$('photo-viewer').close());
function render() {
  const query = normalize($('search').value.trim());
  const filtered = games.filter(g => normalize(`${g.title} ${g.platform} ${g.genre}`).includes(query) && (!$('platform').value || g.platform === $('platform').value) && (!$('status').value || g.status === $('status').value));
  const sort = $('sort').value;
  filtered.sort((a,b) => {
    if (sort === 'value-asc' || sort === 'value-desc') {
      return (sort === 'value-asc' ? a.marketValue-b.marketValue : b.marketValue-a.marketValue) || a.title.localeCompare(b.title, 'es');
    }
    return sort === 'title' ? a.title.localeCompare(b.title, 'es') : sort === 'newest' ? b.year-a.year : a.year-b.year;
  });
  $('grid').replaceChildren();
  for (const game of filtered) {
    const card = element('button', undefined, 'card'); card.type = 'button'; card.setAttribute('aria-label', `Ver ficha de ${game.title}`);
    const art = element('div', undefined, 'art'); art.style.setProperty('--color', game.color); art.setAttribute('aria-hidden', 'true');
    if(game.coverPhoto) {const cover=element('img');cover.src=game.coverPhoto;cover.alt='Portada de '+game.title;cover.loading='lazy';cover.className='card-photo';cover.addEventListener('error',()=>{cover.remove();art.classList.remove('has-photo');});art.classList.add('has-photo');art.append(cover);}
    if(!game.coverPhoto) art.classList.add('no-cover');
    art.append(element('small', game.platform), element('strong', game.title), element('span', game.coverPhoto ? `${game.year} / COLECCIÓN REAL` : 'Frontal original pendiente'));
    const body = element('div', undefined, 'card-body'); body.append(element('span', game.platform, 'tag'), element('h3', game.title), element('div', `${game.year} · ${game.genre}`, 'meta'), element('div', `${game.status === 'En colección' ? '●' : '◇'} ${game.status}`, `state ${game.status === 'Lista de deseos' ? 'wish' : ''}`));
    body.append(element('div', euros(game.marketValue) + ' · provisional' + (game.marketSource?' · gamepricefeed':'') + (Number.isFinite(game.marketDelta) && game.marketDelta!==0 ? ' · '+(game.marketDelta>0?'↑ ':'↓ ')+euros(Math.abs(game.marketDelta)) : ''), 'meta'), element('div', game.coverPhoto ? game.photos.length + ' fotos originales' : game.photos.length ? 'Portada pendiente · ' + game.photos.length + ' fotos originales' : 'Fotografías pendientes', 'meta')); card.append(art, body); card.addEventListener('click', () => showDetail(game)); const wrapper=element('div',undefined,'card-wrapper');wrapper.append(card);if(game.marketSource){const link=element('a','Fuente: gamepricefeed');link.href=game.marketSource.url;link.target='_blank';link.rel='noopener noreferrer';link.className='source-link';wrapper.append(link);}$('grid').append(wrapper);
  }
  $('results').textContent = `${filtered.length} de ${games.length} juegos`; $('empty').hidden = filtered.length !== 0;
}
$('filters').addEventListener('submit', e => e.preventDefault());
$('filters').addEventListener('input', render);
$('filters').addEventListener('change', render);
$('filters').addEventListener('reset', () => setTimeout(render, 0));
$('clear').addEventListener('click', () => $('filters').reset());
$('close').addEventListener('click', () => $('detail').close());
$('toggle-history').addEventListener('click', () => { const expanded = $('toggle-history').getAttribute('aria-expanded') === 'true'; $('toggle-history').setAttribute('aria-expanded',String(!expanded)); $('toggle-history').textContent=expanded?'Ver evolución del valor ↓':'Ocultar evolución ↑'; $('value-history').hidden=expanded; if(!expanded)renderHistory(); });
$('history-period').addEventListener('change',renderHistory);
function renderHistory() {
 const container=$('history-chart'); container.replaceChildren();
 const days=$('history-period').value;
 const cutoff=days==='all'?0:Date.now()-Number(days)*86400000;
 const records=valueHistory.filter(p=>new Date(p.date+'T12:00:00').getTime()>=cutoff && Number.isFinite(Number(p.total))).sort((a,b)=>a.date.localeCompare(b.date));
 if(!records.length){container.textContent='Todavía no hay tasaciones registradas para este periodo.'; $('history-explanation').textContent='Se añadirán nuevos puntos cuando revisemos las valoraciones.';return;}
 const first=records[0],last=records[records.length-1];
 const start=Number(first.total),end=Number(last.total);
 const width=760,height=260,pad=48,plotW=width-pad*2,plotH=height-pad*2;
 const values=records.map(p=>Number(p.total)),minimum=Math.max(0,Math.min(...values)-Math.max(2,Math.max(...values)*.15)),maximum=Math.max(...values)+Math.max(2,Math.max(...values)*.15);
 const x=i=>pad+(records.length===1?plotW/2:i*plotW/(records.length-1));
 const y=v=>pad+plotH-(v-minimum)/(maximum-minimum)*plotH;
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg'); svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('aria-hidden','true');
 const add=(tag,attrs,text)=>{const el=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));if(text!==undefined)el.textContent=text;svg.append(el);return el;};
 [0,.5,1].forEach(frac=>{const v=minimum+(maximum-minimum)*frac;add('line',{x1:pad,y1:y(v),x2:width-pad,y2:y(v),stroke:'#444952','stroke-dasharray':'4 7'});add('text',{x:pad-9,y:y(v)+4,fill:'#a1a4ab','text-anchor':'end','font-size':13},euros(v));});
 if(records.length>1)add('polyline',{points:records.map((p,i)=>`${x(i)},${y(Number(p.total))}`).join(' '),fill:'none',stroke:'#c9ef69','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});
 records.forEach((p,i)=>{const circle=add('circle',{cx:x(i),cy:y(Number(p.total)),r:5,fill:'#c9ef69'});const title=document.createElementNS(ns,'title');title.textContent=`${p.date}: ${euros(Number(p.total))}`;circle.append(title);});
 add('text',{x:x(0),y:height-15,fill:'#a1a4ab','text-anchor':records.length===1?'middle':'start','font-size':13},first.date);
 if(records.length>1)add('text',{x:x(records.length-1),y:height-15,fill:'#a1a4ab','text-anchor':'end','font-size':13},last.date);
 container.append(svg);
 $('history-explanation').textContent=records.length<2?`Primer registro: ${euros(end)} el ${last.date}. Aún no hay suficientes mediciones para mostrar fluctuaciones.`:`De ${euros(start)} a ${euros(end)} (${end-start>=0?'+':''}${euros(end-start)}). Las variaciones del total también pueden deberse a compras o ventas, no solo a cambios de precio.`;
}
try {
  const response = await fetch('./data/catalog.json?v=20261114-lote01',{cache:'no-store'}); if (!response.ok) throw new Error('Catalog unavailable');
  games = await response.json();
  try {const historyResponse=await fetch('./data/value-history.json?v=20261114-lote01',{cache:'no-store'}); if(historyResponse.ok)valueHistory=await historyResponse.json();}catch {}
  try {const marketResponse=await fetch('./data/market-reviews.json',{cache:'no-store'});if(marketResponse.ok){marketReviews=(await marketResponse.json()).reviews||[];const latest=marketReviews.at(-1);if(latest){for(const g of games){if(latest.prices[g.id]){g.originalValue=g.marketValue;g.marketValue=latest.prices[g.id].value;g.marketSource=latest.prices[g.id];}}valueHistory.push(...marketReviews.map(r=>({date:r.date.slice(0,10),total:r.total,note:'Revisión de mercado; incorporaciones separadas.'})));$('market-status').textContent=`Última revisión: ${latest.date.slice(0,10)} · ${latest.verified} referencias contrastadas`;const credits=$('market-credits');credits.append(document.createTextNode('Fuentes: '));for(const [id,source] of Object.entries(latest.prices)){const game=games.find(g=>g.id===id);if(!game)continue;const link=element('a',game.title+' · gamepricefeed');link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';credits.append(link,document.createTextNode(' · '));}if(latest.acquisitions!==null)$('inventory-change').textContent='Cambio por inventario: '+(latest.acquisitions>=0?'+':'')+euros(latest.acquisitions);const prior=marketReviews.at(-2);if(prior){for(const g of games)if(g.marketSource&&Object.hasOwn(prior.members,g.id))g.marketDelta=latest.members[g.id]-prior.members[g.id];const common=Object.keys(latest.members).filter(id=>Object.hasOwn(prior.members,id));const sorted=common.map(id=>({game:games.find(g=>g.id===id),delta:latest.members[id]-prior.members[id]})).filter(x=>x.game&&x.delta).sort((a,b)=>b.delta-a.delta);const up=sorted.find(x=>x.delta>0),down=[...sorted].reverse().find(x=>x.delta<0);$('market-movers').textContent=(up?'Mayor subida: '+up.game.title+' (+'+euros(up.delta)+')':'Sin subidas')+' · '+(down?'Mayor bajada: '+down.game.title+' ('+euros(down.delta)+')':'Sin bajadas');}for(const [days,id] of [[7,'market-week'],[30,'market-month']]){const ref=[...marketReviews].reverse().find(r=>Date.parse(r.date)<=Date.parse(latest.date)-days*86400000);if(ref){const delta=Object.keys(latest.members).filter(k=>Object.hasOwn(ref.members,k)).reduce((s,k)=>s+latest.members[k]-ref.members[k],0);$(id).textContent=(delta>=0?'+':'')+euros(delta);}}}}}catch(e){console.error('No se han podido cargar las revisiones de mercado',e);}
  const platforms = [...new Set(games.map(g => g.platform))].sort();
  for (const platform of platforms) { const option = element('option', platform); option.value = platform; $('platform').append(option); }
  $('total').textContent = games.length.toString().padStart(2,'0'); $('platforms').textContent = platforms.length.toString().padStart(2,'0'); $('owned').textContent = games.filter(g => g.status === 'En colección').length.toString().padStart(2,'0'); $('market-value').textContent=euros(ownedValue()); $('value-current').textContent=euros(ownedValue()); render();
} catch { $('error').hidden = false; $('results').textContent = 'Catálogo no disponible'; }
