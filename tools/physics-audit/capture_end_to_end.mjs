import {open} from './harness.mjs';import fs from 'fs';
const {b,p,ev,errs}=await open('new.html');await ev(fs.readFileSync('lib.js','utf8'));
const log=(k,v)=>console.log(k.padEnd(36),typeof v==='string'?v:JSON.stringify(v));
// node 1 via addNode + sliders + commit button (real UI paths)
await ev(`addNode(16);ui.burn.value='9';ui.burn.oninput();ui.confirm.click();0`);
log('node1 forecast', await ev(`(draw(performance.now()),ui.forecast.textContent)`));
await ev(`__live(17)`);
// run until inside inner SOI
await ev(`(()=>{let g=0;while(domMoon(s.x,s.y)<0&&g++<400)__live(simTime+.1)})()`);
log('entered SOI at t / label / influence', await ev(`[simTime.toFixed(1),ui.orbit.textContent,ui.influence.textContent].join(' | ')`));
// find periapsis time via forecast of current path, place node 2 there
const tp=await ev(`(()=>{const pts=pathFrom(s,15,.028);let best=null;for(const q of pts){if(q.k!==0)continue;const d=Math.hypot(q.x-q.mx,q.y-q.my);if(!best||d<best.d)best={d,t:q.t}}return best.t})()`);
await ev(`addNode(${tp});0`);
// sweep burn slider: record forecast outcome per value (as a player scrubbing the slider would see it)
const sweep=JSON.parse(await ev(`JSON.stringify([-2,-4,-6,-7,-8,-9,-10,-11,-12,-13,-14,-16].map(v=>{ui.burn.value=String(v);ui.burn.oninput();draw(performance.now());return v+': '+ui.forecast.textContent}))`));
for(const x of sweep)console.log('   ',x);
// choose first value that forecasts CAPTURE
const pick=sweep.find(x=>x.includes('CAPTURE')); const bv=pick?parseFloat(pick):null; log('chosen capture burn',bv);
await ev(`ui.burn.value='${bv}';ui.burn.oninput();ui.confirm.click();0`);
await p.evaluate(()=>window.__dv.ev(`draw(performance.now())`));await p.screenshot({path:'n_capture_plan.png'});
const rec=JSON.parse(await ev(`JSON.stringify(__live(simTime+400).map(r=>({t:r.t,d:__rel(r,'mi').d,orb:r.orb,st:r.st,dv:r.dv})))`));
const after=rec.filter(r=>r.st.startsWith('BURN EXECUTED')||r.t>rec[0].t+5);
const ds=after.map(r=>r.d);log('after capture burn 400t: min/max moon dist',[Math.min(...ds).toFixed(1),Math.max(...ds).toFixed(1)]);
log('labels seen',[...new Set(after.map(r=>r.orb))]);log('final status / dv',[rec.at(-1).st,rec.at(-1).dv.toFixed(1)]);
await p.evaluate(()=>window.__dv.ev(`draw(performance.now())`));await p.screenshot({path:'n_captured.png'});
// moon impact path
await ev(`addNode(3);ui.burn.value='-6';ui.burn.oninput();draw(performance.now());0`);log('forecast for -6 while orbiting',await ev(`ui.forecast.textContent`));
await p.screenshot({path:'n_impact_plan.png'});
await ev(`ui.confirm.click();__live(simTime+40);0`);log('after -6: status / orbit label',await ev(`ui.status.textContent+' | '+ui.orbit.textContent`));
console.log('errors',errs);await b.close();
