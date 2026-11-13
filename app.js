const $ = (id) => document.getElementById(id);
let games = [];
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function element(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
function showDetail(game) {
  const content = $('detail-content'); content.replaceChildren(element('p', `${game.platform} / ${game.year}`, 'eyebrow'), element('h2', game.title));
  $('detail-content').querySelector('h2').id = 'detail-title';
  content.append(element('p', game.description));
  const list = element('dl');
  for (const [label, value] of [['Plataforma', game.platform], ['Año', game.year], ['Género', game.genre], ['Región', game.region], ['Formato', game.format], ['Estado', game.status], ['Conservación', game.condition]]) list.append(element('dt', label), element('dd', value));
  content.append(list, element('p', 'Ficha de demostración · ilustración tipográfica original.'));
  $('detail').showModal();
}
function render() {
  const query = normalize($('search').value.trim());
  const filtered = games.filter(g => normalize(`${g.title} ${g.platform} ${g.genre}`).includes(query) && (!$('platform').value || g.platform === $('platform').value) && (!$('status').value || g.status === $('status').value));
  filtered.sort((a,b) => $('sort').value === 'title' ? a.title.localeCompare(b.title, 'es') : $('sort').value === 'newest' ? b.year-a.year : a.year-b.year);
  $('grid').replaceChildren();
  for (const game of filtered) {
    const card = element('button', undefined, 'card'); card.type = 'button'; card.setAttribute('aria-label', `Ver ficha de ${game.title}`);
    const art = element('div', undefined, 'art'); art.style.setProperty('--color', game.color); art.setAttribute('aria-hidden', 'true');
    art.append(element('small', game.platform), element('strong', game.title), element('span', `${game.year} / ARCHIVE EDITION`));
    const body = element('div', undefined, 'card-body'); body.append(element('span', game.platform, 'tag'), element('h3', game.title), element('div', `${game.year} · ${game.genre}`, 'meta'), element('div', `${game.status === 'En colección' ? '●' : '◇'} ${game.status}`, `state ${game.status === 'Lista de deseos' ? 'wish' : ''}`));
    card.append(art, body); card.addEventListener('click', () => showDetail(game)); $('grid').append(card);
  }
  $('results').textContent = `${filtered.length} de ${games.length} juegos`; $('empty').hidden = filtered.length !== 0;
}
$('filters').addEventListener('submit', e => e.preventDefault());
$('filters').addEventListener('input', render);
$('filters').addEventListener('change', render);
$('filters').addEventListener('reset', () => setTimeout(render, 0));
$('clear').addEventListener('click', () => $('filters').reset());
$('close').addEventListener('click', () => $('detail').close());
try {
  const response = await fetch('./data/catalog.json'); if (!response.ok) throw new Error('Catalog unavailable');
  games = await response.json();
  const platforms = [...new Set(games.map(g => g.platform))].sort();
  for (const platform of platforms) { const option = element('option', platform); option.value = platform; $('platform').append(option); }
  $('total').textContent = games.length.toString().padStart(2,'0'); $('platforms').textContent = platforms.length.toString().padStart(2,'0'); $('owned').textContent = games.filter(g => g.status === 'En colección').length.toString().padStart(2,'0'); render();
} catch { $('error').hidden = false; $('results').textContent = 'Catálogo no disponible'; }
