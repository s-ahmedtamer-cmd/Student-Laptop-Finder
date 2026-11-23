// Shared comparison calculations and table builder.
export const compareSpecs = [
  {key:'price',label:'Price',direction:'min',format:value=>'$'+value.toLocaleString('en-US')},
  {key:'ramGB',label:'RAM',direction:'max',format:value=>value+' GB'},
  {key:'storageGB',label:'Storage',direction:'max',format:value=>value+' GB'},
  {key:'batteryHours',label:'Battery life',direction:'max',format:value=>value+' h'},
  {key:'weightKg',label:'Weight',direction:'min',format:value=>value+' kg'},
  {key:'screenInches',label:'Screen size',direction:null,format:value=>value+' in'},
  {key:'cpu',label:'Processor',direction:null,format:value=>value},
  {key:'category',label:'Category',direction:null,format:value=>value}
];
export function renderComparison(laptops){
  if(laptops.length<2) return '';
  const headings=laptops.map(l=>`<th class="min-w-44 border-b px-5 py-5 text-left"><a href="./details.html?id=${l.id}" class="accent-text text-sm font-bold">${l.brand} ${l.name} ↗</a></th>`).join('');
  const rows=compareSpecs.map(spec=>{
    // Determine the winning value dynamically; ties are all highlighted.
    const values=laptops.map(l=>l[spec.key]);
    const best=spec.direction==='min'?Math.min(...values):spec.direction==='max'?Math.max(...values):null;
    const cells=laptops.map(l=>`<td class="border-b px-5 py-4 text-sm ${best!==null&&l[spec.key]===best?'best-value':''}">${spec.format(l[spec.key])}${best!==null&&l[spec.key]===best?' ★':''}</td>`).join('');
    return `<tr><th scope="row" class="sticky left-0 min-w-32 border-b px-4 py-4 text-left text-sm font-bold">${spec.label}</th>${cells}</tr>`;
  }).join('');
  return `<div class="surface overflow-x-auto"><table class="w-full border-collapse text-left"><thead><tr><th class="sticky left-0 min-w-32 border-b px-4 py-5 text-left">Specification</th>${headings}</tr></thead><tbody>${rows}</tbody></table></div><p class="muted mt-3 text-xs">★ Best value (lowest price/weight; highest RAM/storage/battery). Screen, CPU, and category are informational.</p>`;
}
