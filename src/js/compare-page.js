import {getLaptops} from './api.js';
import {getFavorites} from './storage.js';
import {initializeUI,errorState,emptyState,money} from './ui.js';
import {renderComparison} from './compare.js';
initializeUI('compare');
const picker=document.getElementById('compare-picker');
const output=document.getElementById('comparison');
const feedback=document.getElementById('compare-feedback');
const counter=document.getElementById('selected-count');
let laptops=[]; let selected=[];
function render(){
  const favorites=laptops.filter(l=>getFavorites().includes(l.id));
  selected=selected.filter(id=>favorites.some(l=>l.id===id));
  picker.innerHTML=favorites.length?favorites.map(l=>`<label class="surface flex cursor-pointer items-center gap-3 p-3"><input class="h-5 w-5 accent-orange-500" type="checkbox" data-compare="${l.id}" ${selected.includes(l.id)?'checked':''}><img src="./${l.image}" alt="" class="h-14 w-16 rounded-lg object-cover"><span class="min-w-0 text-sm"><strong class="block truncate">${l.brand} ${l.name}</strong><span class="muted">${money(l.price)}</span></span></label>`).join(''):emptyState('No saved laptops','Add favorites before comparing them.');
  counter.textContent=`${selected.length} / 4 selected`;
  if(selected.length<2){ feedback.textContent=`Select ${2-selected.length} more laptop${selected.length===0?'s':''} to start comparing.`;output.innerHTML=emptyState('Your comparison will appear here','Pick at least two saved laptops above.','Explore laptops','./laptops.html'); }
  else {feedback.textContent=`Comparing ${selected.length} laptops. Best values are marked with a star.`;output.innerHTML=renderComparison(selected.map(id=>favorites.find(l=>l.id===id)));}
}
picker.addEventListener('change',event=>{
 const box=event.target.closest('[data-compare]');if(!box)return;
 const id=Number(box.dataset.compare);
 if(box.checked){if(selected.length>=4){box.checked=false;feedback.textContent='You can compare a maximum of four laptops. Remove one first.';return;}selected.push(id);}
 else selected=selected.filter(x=>x!==id);
 render();
});
window.addEventListener('favorites-changed',render);
try{laptops=await getLaptops();render();}catch(error){picker.innerHTML=errorState(error);}
