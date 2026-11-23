import { getFavorites, getTheme, setTheme, toggleFavorite, isFavorite } from './storage.js';
export const money = amount => '$' + Number(amount).toLocaleString('en-US', {maximumFractionDigits:2});
export const imageUrl = laptop => './' + laptop.image;
export function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hidden'), 2800);
}
export function skeletonCards(count=4) {
  return Array.from({length:count}, () => `<article class="laptop-card animate-pulse"><div class="h-48 bg-slate-300/30"></div><div class="space-y-4 p-5"><div class="h-4 w-1/3 rounded bg-slate-300/40"></div><div class="h-6 w-3/4 rounded bg-slate-300/40"></div><div class="h-4 w-full rounded bg-slate-300/40"></div><div class="h-10 rounded bg-slate-300/40"></div></div></article>`).join('');
}
export function renderCard(laptop) {
  const saved = isFavorite(laptop.id);
  return `<article class="laptop-card flex flex-col"><a href="./details.html?id=${laptop.id}" aria-label="View ${laptop.brand} ${laptop.name}"><img src="${imageUrl(laptop)}" alt="Illustration of ${laptop.brand} ${laptop.name}" class="h-48 w-full object-cover" loading="lazy"></a><div class="flex flex-1 flex-col p-5"><div class="flex items-center justify-between gap-2"><span class="chip capitalize">${laptop.category}</span><button type="button" data-favorite="${laptop.id}" class="btn-secondary text-sm" aria-pressed="${saved}" aria-label="${saved?'Remove from':'Add to'} favorites">${saved?'♥ Saved':'♡ Save'}</button></div><p class="muted mt-4 text-xs font-semibold uppercase tracking-widest">${laptop.brand}</p><h3 class="mt-1 min-h-14 text-xl font-bold">${laptop.name}</h3><p class="muted mt-2 text-sm">${laptop.cpu} · ${laptop.ramGB} GB RAM</p><p class="muted mt-1 text-sm">${laptop.storageGB} GB SSD · ${laptop.batteryHours}h battery</p><div class="mt-auto flex items-center justify-between gap-3 pt-5"><strong class="text-2xl">${money(laptop.price)}</strong><a class="btn-action" href="./details.html?id=${laptop.id}">Details →</a></div></div></article>`;
}
export function emptyState(heading, body, action='Browse laptops', href='./laptops.html') {
  return `<div class="surface col-span-full px-6 py-14 text-center"><div class="text-5xl">⌕</div><h2 class="mt-4 text-2xl font-extrabold">${heading}</h2><p class="muted mx-auto mt-2 max-w-md">${body}</p><a class="btn-action mt-6" href="${href}">${action} →</a></div>`;
}
export function errorState(error) { return emptyState('Something went wrong', error.message, 'Try again', window.location.pathname.split('/').pop() || 'index.html'); }
export function initializeUI(page) {
  document.querySelectorAll(`[data-route="${page}"]`).forEach(a => a.setAttribute('aria-current','page'));
  const navigation = document.getElementById('mobile-nav');
  const mobileButton = document.getElementById('mobile-toggle');
  mobileButton?.addEventListener('click', () => {
    const opening = navigation.classList.contains('hidden');
    navigation.classList.toggle('hidden', !opening);
    navigation.classList.toggle('flex', opening);
    mobileButton.setAttribute('aria-expanded', String(opening));
  });
  const refreshTheme = () => {
    const theme = getTheme();
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(b => { b.textContent = theme === 'performance' ? '⚡ Performance' : '☀ Battery Saver'; });
  };
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => {
    setTheme(getTheme() === 'performance' ? 'battery' : 'performance');
    refreshTheme();
    showToast('Theme saved across all pages');
  }));
  refreshTheme();
  const refreshCount = () => document.querySelectorAll('[data-fav-count]').forEach(span => span.textContent = String(getFavorites().length));
  refreshCount();
  window.addEventListener('favorites-changed', refreshCount);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-favorite]');
    if (!button) return;
    const saved = toggleFavorite(Number(button.dataset.favorite));
    document.querySelectorAll(`[data-favorite="${button.dataset.favorite}"]`).forEach(b => {
      b.textContent = saved ? '♥ Saved' : '♡ Save';
      b.setAttribute('aria-pressed', String(saved));
      b.setAttribute('aria-label', saved ? 'Remove from favorites' : 'Add to favorites');
    });
    showToast(saved ? 'Added to favorites' : 'Removed from favorites');
  });
}
export function renderSpecs(laptop) {
  const specs=[['Brand',laptop.brand],['Model',laptop.name],['Category',laptop.category],['Processor',laptop.cpu],['Memory',laptop.ramGB+' GB'],['Storage',laptop.storageGB+' GB'],['Battery life',laptop.batteryHours+' hours'],['Weight',laptop.weightKg+' kg'],['Display',laptop.screenInches+' inches'],['Price',money(laptop.price)]];
  return specs.map(([key,value]) => `<tr class="spec-row"><th scope="row" class="px-5 py-4 text-left font-semibold">${key}</th><td class="px-5 py-4 text-right">${value}</td></tr>`).join('');
}
