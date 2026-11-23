const FAVORITES_KEY = 'lf-favorites';
const THEME_KEY = 'lf-theme';
export function getFavorites() {
  try { const value = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); return Array.isArray(value) ? value.map(Number) : []; }
  catch { return []; }
}
export const isFavorite = id => getFavorites().includes(Number(id));
export function toggleFavorite(id) {
  const current = getFavorites();
  const number = Number(id);
  const updated = current.includes(number) ? current.filter(x => x !== number) : [...current, number];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('favorites-changed'));
  return updated.includes(number);
}
export function clearFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
  window.dispatchEvent(new Event('favorites-changed'));
}
export function getTheme() {
  try { return JSON.parse(localStorage.getItem(THEME_KEY)) === 'performance' ? 'performance' : 'battery'; }
  catch { return 'battery'; }
}
export function setTheme(theme) {
  // Store a single shared theme key, so every HTML page restores the exact same mode.
  const choice = theme === 'performance' ? 'performance' : 'battery';
  localStorage.setItem(THEME_KEY, JSON.stringify(choice));
  document.documentElement.dataset.theme = choice;
  return choice;
}
