import {open} from './harness.mjs';import fs from 'fs';
const {b,ev,errs}=await open(process.argv[2]||'new.html');await ev(fs.readFileSync('lib.js','utf8'));
const log=(k,v)=>console.log(k.padEnd(52),typeof v==='string'?v:JSON.stringify(v));
// one live frame == exactly one physics step
await ev(`globalThis.__one=()=>{warp=STEP/.05+1e-9;last=0;frame(50)};0`);
await ev(`addNode(16);ui.burn.value='9';ui.burn.oninput();ui.confirm.click();__live(17);(()=>{let g=0;while(domOf(s)<0&&g++<400)__live(simTime+.1)})();addNode(2);ui.burn.value='-10';ui.burn.oninput();ui.confirm.click();__live(simTime+40);0`);
// departure node, prograde +3, half an orbit ahead
await ev(`addNode(9);ui.burn.value='3';ui.burn.oninput();0`);
const fc=JSON.parse(await ev(`(()=>{const p=projection();return JSON.stringify({out:p.out,nodeAt:node.at,pts:p.pts.filter((q,i)=>i%5===0).map(q=>({t:q.t,x:q.x,y:q.y}))})})()`));
await ev(`ui.confirm.click();0`);
const rec=JSON.parse(await ev(`(()=>{const out=[];let g=0;while(g++<4000&&!s.dead){__one();const m=moons[0];out.push({t:simTime,x:s.x,y:s.y,vx:s.vx,vy:s.vy,dom:s.dom,node:!!node,E:(s.vx*s.vx+s.vy*s.vy)/2-1e5/Math.hypot(s.x,s.y),Em:((s.vx-m.vx)**2+(s.vy-m.vy)**2)/2-m.mu/Math.hypot(s.x-m.x,s.y-m.y)})}return JSON.stringify(out)})()`));
const burnI=rec.findIndex(r=>!r.node), exitI=rec.findIndex((r,k)=>k>burnI&&r.dom===-1);
log('burn executed at t (node.at)',[+rec[burnI].t.toFixed(3),+fc.nodeAt.toFixed(3)]);
log('SOI exit T+ (forecast vs live)',[+fc.out.t.toFixed(2),+(rec[exitI].t-(fc.nodeAt-fc.out.t+fc.out.t)+fc.out.t- (rec[exitI].t-rec[exitI].t)).toFixed(2), 'live abs t '+rec[exitI].t.toFixed(2)+' vs forecast abs '+(fc.nodeAt+ (fc.out.t-(fc.nodeAt- rec[0].t + (rec[0].t-rec[0].t)))).toFixed(2)]);
const st=(k)=>({dv:Math.hypot(rec[k].vx-rec[k-1].vx,rec[k].vy-rec[k-1].vy),dx:Math.hypot(rec[k].x-rec[k-1].x,rec[k].y-rec[k-1].y)});
const nb=[exitI-3,exitI-2,exitI-1,exitI,exitI+1,exitI+2].map(k=>st(k));
log('per-step |Δv| around exit (exit step marked *)',nb.map((q,j)=>(j===3?'*':'')+q.dv.toFixed(3)));
log('per-step |Δx| around exit',nb.map(q=>q.dx.toFixed(3)));
const inside=rec.slice(burnI+1,exitI).map(r=>r.Em);log('moon-frame energy drift inside after burn (rel)',+((Math.max(...inside)-Math.min(...inside))/Math.abs(inside[0])).toExponential(2));
const reI=rec.findIndex((r,k)=>k>exitI&&r.dom!==-1);const endI=reI<0?rec.length:reI;log('coast segment after exit: steps / re-entry',[endI-exitI-1, reI<0?'none':('re-enters '+(rec[reI].dom===0?'INNER':'OUTER')+' at t '+rec[reI].t.toFixed(1))]);const out=rec.slice(exitI+1,endI).map(r=>r.E);log('planet-frame energy drift after exit (rel)',+((Math.max(...out)-Math.min(...out))/Math.abs(out[0])).toExponential(2));
// preview vs live after exit: nearest live sample to each forecast point by time
let maxErr=0;const t0=fc.nodeAt;for(const q of fc.pts){const T=t0-(fc.nodeAt-rec[0].t)+q.t; } // (placeholder, replaced below)
const nodeAbs=fc.nodeAt;let errs2=[];for(const q of fc.pts){const abs=nodeAbs+q.t;const r=rec.reduce((a,c)=>Math.abs(c.t-abs)<Math.abs(a.t-abs)?c:a);if(Math.abs(r.t-abs)<.03&&(reI<0||r.t<rec[reI].t))errs2.push({t:q.t,e:Math.hypot(r.x-q.x,r.y-q.y)})}
log('forecast vs live until next SOI entry (max err / span)',[+Math.max(...errs2.map(q=>q.e)).toFixed(2),'T+0..'+errs2.at(-1).t.toFixed(0)]);for(const f of [.25,.5,.75,1]){const q=errs2[Math.floor(f*(errs2.length-1))];console.log('      at T+'+q.t.toFixed(0)+': '+q.e.toFixed(2))}
console.log('errors',errs);await b.close();
