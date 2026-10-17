import { api } from './api.js';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function loadProducts(el) {
  try {
    const list = await api('/products');
    if (!list.length) { el.innerHTML = '<div class="empty">Aún no hay productos publicados.</div>'; return; }
    el.innerHTML = list.map(p => `<article class="card reveal ${p.featured ? 'feat' : ''}">
      ${p.featured ? '<span class="badge">Destacado</span>' : ''}
      <h3>${esc(p.name)}</h3><small>${esc(p.duration)}</small>
      <div class="price">${esc(p.price)} <small>USDT</small></div><p>${esc(p.description)}</p>
      <ul>${(p.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      <div class="stock ${p.stock > 0 ? 'in' : 'out'}">${p.stock > 0 ? '● Disponible' : '● Agotado'}</div><br>
      <a class="btn pri" ${p.stock > 0 ? `href="checkout.html?product=${encodeURIComponent(p.id)}"` : 'aria-disabled="true"'}>Comprar ahora</a></article>`).join('');
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')), { threshold: .15 });
    el.querySelectorAll('.reveal').forEach(c => io.observe(c));
  } catch {
    const demo = [['Plan de ejemplo A','Duración configurable',true],['Plan de ejemplo B','Duración configurable',false],['Plan de ejemplo C','Duración configurable',false]];
    el.innerHTML = '<div class="empty">Vista previa del diseño: el catálogo real se carga desde la API y lo define el administrador.</div>' + demo.map(([n,d,f]) => `<article class="card reveal ${f ? 'feat' : ''}">
      <span class="badge">${f ? 'Destacado · ' : ''}Vista previa</span><h3>${n}</h3><small>${d}</small>
      <div class="price">0.00 <small>USDT</small></div><p>Descripción del plan editable desde el panel.</p>
      <ul><li>Característica configurable</li><li>Característica configurable</li><li>Característica configurable</li></ul>
      <div class="stock in">● Ejemplo</div><a class="btn pri" aria-disabled="true">Comprar ahora</a></article>`).join('');
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')), { threshold: .15 });
    el.querySelectorAll('.reveal').forEach(c => io.observe(c));
  }
}
