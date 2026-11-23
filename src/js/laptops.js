import {getLaptops} from './api.js';
import {initializeUI,renderCard,skeletonCards,errorState,emptyState} from './ui.js';
initializeUI('laptops');
const list = document.getElementById('catalogue');
const count = document.getElementById('result-count');
const ids = ['search','category','max-price','min-ram','sort'];
const controls = Object.fromEntries(ids.map(id => [id,document.getElementById(id)]));
let laptops=[];
list.innerHTML=skeletonCards(8);
function render() {
  const query = controls.search.value.trim().toLowerCase();
  const cat = controls.category.value;
  const ceiling = controls['max-price'].value === '' ? Infinity : Number(controls['max-price'].value);
  const ram = Number(controls['min-ram'].value);
  const filtered = laptops.filter(l => (l.name.toLowerCase().includes(query) || l.brand.toLowerCase().includes(query)) && (cat==='all'||l.category===cat) && l.price<=ceiling && l.ramGB>=ram);
  const order=controls.sort.value;
  const sorted=[...filtered]; // Sort a copy: keep the original fetched dataset unchanged.
  if (order !== 'featured') { const [field,direction] = order.split('-'); sorted.sort((a,b) => direction==='asc' ? a[field]-b[field] : b[field]-a[field]); }
  count.textContent=`${sorted.length} laptop${sorted.length===1?'':'s'} found`;
  list.innerHTML=sorted.length ? sorted.map(renderCard).join('') : emptyState('No matching laptops','Try changing your search or filter choices.','Reset filters','#reset');
  const resetLink=list.querySelector('a[href="#reset"]');
  resetLink?.addEventListener('click', e => {e.preventDefault(); reset();});
}
function reset() { ids.forEach(id => {const el=controls[id];el.value=el.tagName==='SELECT' ? el.options[0].value : '';}); render(); }
ids.forEach(id=>controls[id].addEventListener(id==='search'?'input':'change',render));
controls['max-price'].addEventListener('input',render);
document.getElementById('reset').addEventListener('click',reset);
window.addEventListener('favorites-changed',render);
try { const result=await getLaptops(); laptops=result; render(); }
catch(error) { list.innerHTML=errorState(error);count.textContent='Unable to load results'; }
