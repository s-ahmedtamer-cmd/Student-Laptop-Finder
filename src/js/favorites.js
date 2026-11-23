import {getLaptops} from './api.js';
import {getFavorites,clearFavorites} from './storage.js';
import {initializeUI,renderCard,skeletonCards,errorState,emptyState,money} from './ui.js';
initializeUI('favorites');
const grid=document.getElementById('favorites-grid');
const summary=document.getElementById('favorite-summary');
let laptops=[];
grid.innerHTML=skeletonCards(4);
function render(){
  const saved=laptops.filter(l=>getFavorites().includes(l.id));
  const total=saved.reduce((sum,l)=>sum+l.price,0);
  const average=saved.length ? total/saved.length : 0;
  summary.innerHTML=[['Saved laptops',saved.length],['Combined price',money(total)],['Average price',money(average)]].map(([title,value])=>`<article class="surface p-6"><p class="muted text-sm">${title}</p><p class="stat-value">${value}</p></article>`).join('');
  grid.innerHTML=saved.length?saved.map(renderCard).join(''):emptyState('No favorites yet','Save laptops from the catalogue or their detail pages to start your shortlist.');
  document.getElementById('clear-favorites').disabled=!saved.length;
}
window.addEventListener('favorites-changed',render);
document.getElementById('clear-favorites').addEventListener('click',()=>{if(confirm('Remove all saved laptops?'))clearFavorites();});
try {laptops=await getLaptops(); render();} catch(error){grid.innerHTML=errorState(error);}
