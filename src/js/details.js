import {getLaptops,getLaptopById} from './api.js';
import {initializeUI,renderSpecs,skeletonCards,errorState,emptyState,imageUrl,money} from './ui.js';
import {getFavorites,toggleFavorite} from './storage.js';
initializeUI('details');
const area=document.getElementById('details-content');
area.innerHTML=skeletonCards(2);
const id=new URLSearchParams(window.location.search).get('id');
try {
  if (!id || !/^\d+$/.test(id)) { area.innerHTML=emptyState('Missing laptop ID','Choose a laptop from the catalogue to view its details.'); }
  else {
    const laptops=await getLaptops(); const laptop=getLaptopById(laptops,id);
    if(!laptop) area.innerHTML=emptyState('Laptop not found','That laptop ID does not exist in our collection.');
    else {
      area.innerHTML=`<section class="grid gap-8 lg:grid-cols-2"><div class="surface overflow-hidden"><img src="${imageUrl(laptop)}" alt="${laptop.brand} ${laptop.name}" class="w-full object-cover"><div class="p-6"><span class="chip capitalize">${laptop.category}</span><p class="muted mt-4 text-sm uppercase tracking-widest">${laptop.brand}</p><h1 class="mt-1 text-4xl font-extrabold">${laptop.name}</h1><p class="muted mt-4 leading-relaxed">${laptop.description}</p><p class="mt-5 text-4xl font-extrabold">${money(laptop.price)}</p><div class="mt-5 flex flex-wrap gap-3"><button class="btn-action" data-favorite="${laptop.id}">♡ Save</button><a class="btn-secondary" href="./favorites.html">Compare via favorites →</a></div></div></div><div class="surface overflow-hidden"><div class="border-b p-6"><h2 class="text-2xl font-bold">Full specifications</h2><p class="muted mt-1 text-sm">Everything you need to know</p></div><table class="w-full"><tbody>${renderSpecs(laptop)}</tbody></table><div class="p-6"><button class="btn-action w-full" id="add-compare">${getFavorites().includes(laptop.id) ? 'Open comparison →' : 'Add to favorites & compare →'}</button></div></div></section>`;
      const update=()=>{const saved=getFavorites().includes(laptop.id);const b=area.querySelector('[data-favorite]');b.textContent=saved?'♥ Saved':'♡ Save';b.setAttribute('aria-pressed',String(saved));};
      window.addEventListener('favorites-changed',update); update();
      document.getElementById('add-compare').addEventListener('click',()=>{if(!getFavorites().includes(laptop.id))toggleFavorite(laptop.id); window.location.href='./compare.html';});
    }
  }
} catch(error) { area.innerHTML=errorState(error); }
