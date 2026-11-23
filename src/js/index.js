import {getLaptops} from './api.js';
import {getFavorites} from './storage.js';
import {initializeUI, renderCard, skeletonCards, errorState, money} from './ui.js';
initializeUI('index');
const featured = document.getElementById('featured');
featured.innerHTML = skeletonCards(3);
async function loadHome() {
  try {
    const laptops = await getLaptops();
    document.getElementById('stat-count').textContent = laptops.reduce(total => total + 1, 0);
    document.getElementById('stat-low').textContent = money(laptops.reduce((lowest,laptop) => Math.min(lowest,laptop.price),Infinity));
    const updateFavorites = () => document.getElementById('stat-fav').textContent = getFavorites().length;
    window.addEventListener('favorites-changed',updateFavorites);
    updateFavorites();
    featured.innerHTML = laptops.slice(0,3).map(renderCard).join('');
  } catch(error) { featured.innerHTML = errorState(error); }
}
loadHome();
