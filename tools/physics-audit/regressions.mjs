import {open} from './harness.mjs';import fs from 'fs';
const F=process.argv[2]||'new.html';
const log=(k,v)=>console.log(k.padEnd(44),typeof v==='string'?v:JSON.stringify(v));
let {b,p,ev,errs}=await open(F);await ev(fs.readFileSync('lib.js','utf8'));
// 1) forecast stability: scrub burn in 0.2 steps; count discontinuous jumps of encounter (moon switch or |dT|>5 or |dD|>8)
const st=JSON.parse(await ev(`(()=>{const res=[];for(const tn of [10,16,20,30,37]){let prev=null,jumps=[];for(let bb=-10;bb<=24;bb+=.2){node={at:simTime+tn,burn:+bb.toFixed(1),committed:false};const e=projection().enc;if(prev&&(e.name!==prev.name||Math.abs(e.t-prev.t)>5||Math.abs(e.d-prev.d)>8))jumps.push(bb.toFixed(1)+':'+prev.name[0]+prev.d.toFixed(0)+'→'+e.name[0]+e.d.toFixed(0)+' T'+prev.t.toFixed(0)+'→'+e.t.toFixed(0));prev=e}res.push({node:tn,jumps:jumps.length,examples:jumps.slice(0,4)})}node=null;return JSON.stringify(res)})()`));
for(const x of st)console.log('  stability',JSON.stringify(x));
// 2) per-frame cost with a node (worst case: long horizon)
const ms=JSON.parse(await ev(`(()=>{addNode(20);node.burn=4;const t=[];for(let i=0;i<30;i++){const a=performance.now();draw(a);t.push(performance.now()-a)}t.sort((a,b)=>a-b);node=null;updatePanel();return JSON.stringify({median:t[15].toFixed(1),p90:t[27].toFixed(1)})})()`));
log('draw() ms with active node (median/p90)',ms);
// 3) regressions: expiry, commit-executes-at-time, unaffordable disabled, discovery
await ev(`addNode(5);0`);await ev(`__live(simTime+6)`);log('uncommitted node passes',await ev(`ui.status.textContent+' | node='+!!node`));
const t0=await ev(`simTime`);await ev(`addNode(8);ui.burn.value='3';ui.burn.oninput();ui.confirm.click();0`);const at=await ev(`node.at`);
await ev(`__live(${at}+.5)`);log('committed fires; dv / status',await ev(`s.dv.toFixed(1)+' | '+ui.status.textContent`));
await ev(`addNode(10);node.burn=60;updatePanel();0`);log('over-budget commit disabled',await ev(`ui.confirm.disabled`));await ev(`ui.cancel.click();0`);
await ev(`reset();addNode(16);ui.burn.value='9';ui.burn.oninput();ui.confirm.click();__live(40);0`);log('flyby discovery',await ev(`ui.visited.textContent+' | '+ui.status.textContent`));
// 4) pointer: click on drawn orbit places node; drag along orbit moves it (real mouse)
await ev(`reset();0`);await b.close();
({b,p,ev,errs}=await open(F));
await ev(`draw(0);0`);
const pt=JSON.parse(await ev(`JSON.stringify(view(preview()[60]))`));
await p.mouse.click(pt.x,pt.y);log('click orbit -> node / t',await ev(`!!node+' '+nodeTime().toFixed(1)`));
const p2=JSON.parse(await ev(`JSON.stringify(view(preview()[120]))`));const ns=JSON.parse(await ev(`JSON.stringify(view(nodeState()))`));
await p.mouse.move(ns.x,ns.y);await p.mouse.down();for(let i=1;i<=10;i++)await p.mouse.move(ns.x+(p2.x-ns.x)*i/10,ns.y+(p2.y-ns.y)*i/10);await p.mouse.up();
log('drag node along orbit -> t',await ev(`nodeTime().toFixed(1)`));
console.log('errors',errs);await b.close();
