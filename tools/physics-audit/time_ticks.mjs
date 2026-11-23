import {open} from './harness.mjs';import fs from 'fs';
const {b,p,ev,errs}=await open('new.html');await ev(fs.readFileSync('lib.js','utf8'));
const r=await ev(`(()=>{const res=[];for(const [tn,bb] of [[16,9],[20,-6],[10,20]]){node={at:simTime+tn,burn:bb,committed:false};const pts=projection().pts;let n=1,ts=[];for(const q of pts){if(q.t>=n*ST.TICK){ts.push(q.t);n=Math.floor(q.t/ST.TICK)+1}}const err=Math.max(...ts.map(t=>t-ST.TICK*Math.floor(t/ST.TICK+1e-9)));res.push(tn+'/'+bb+': '+ts.length+' ticks, first '+ts.slice(0,3).map(t=>t.toFixed(2)).join(',')+' max offset '+err.toFixed(3)+'s')}node=null;return res.join('\\n')})()`);
console.log(r);
// captured-state screenshot to show active (thick) SOI ring, ✓ moon, moon-relative craft arrow, legend open
await ev(`addNode(16);ui.burn.value='9';ui.burn.oninput();ui.confirm.click();__live(17);(()=>{let g=0;while(domOf(s)<0&&g++<400)__live(simTime+.1)})();addNode(2);ui.burn.value='-10';ui.burn.oninput();ui.confirm.click();__live(simTime+30);addNode(6);ui.burn.value='3';ui.burn.oninput();draw(performance.now());0`);
await p.click('#legend summary');await p.screenshot({path:'L_captured.png'});console.log(errs);await b.close();
