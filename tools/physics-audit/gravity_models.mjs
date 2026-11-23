import {open} from './harness.mjs';import fs from 'fs';
const {b,ev}=await open('orig.html');await ev(fs.readFileSync('models.js','utf8'));
for(const model of ['fade','full','patched']){
 const r=JSON.parse(await ev(`(()=>{grav=__models['${model}'];const out={model:'${model}',orbits:[],capture:[]};
  for(const k of [0,1]){const lap=moons[k].r*Math.pow(moons[k].mu/MU,.4);const lim='${model}'==='fade'?moons[k].soi:'${model}'==='patched'?lap:moons[k].r*Math.cbrt(moons[k].mu/3/MU);
   for(const dir of [1,-1]){const ok=[];for(const d0 of [16,19,22,26,30,34,38,44,50]){if(d0<=moons[k].rad+3)continue;
    const ms=moons.map(m=>({...m}));const m=ms[k];
    // circular speed from radial force magnitude in this model, measured relative to moon (remove moon's own accel)
    const ux=m.x/m.r,uy=m.y/m.r,px=m.x+ux*d0,py=m.y+uy*d0;const g1=grav(px,py,ms),rm=m.r,km=-MU/(rm*rm*rm);const fr=-((g1.x-m.x*km)*ux+(g1.y-m.y*km)*uy);if(fr<=0)continue;const vc=Math.sqrt(d0*fr);
    const a={x:px,y:py,vx:m.vx+dir*(-uy)*vc,vy:m.vy+dir*ux*vc};let t=0,fail=null;
    for(;t<800;t+=.028){__step(a,.028,ms);const d=Math.hypot(a.x-m.x,a.y-m.y);if(d<m.rad){fail='hit';break}if(d>lim){fail='left';break}}
    if(!fail)ok.push(d0)}
   out.orbits.push({moon:moons[k].name,dir:dir>0?'prograde':'retro',boundary:+lim.toFixed(0),stable800:ok})}}
  // capture scenario: node t16 +9 then moon-relative retro burn at CA
  const st0=predictState(s,16);const a0=st0.ship,v0=Math.hypot(a0.vx,a0.vy);a0.vx+=a0.vx/v0*9;a0.vy+=a0.vy/v0*9;
  const A={...a0},M=st0.ms.map(m=>({...m}));let best={d:1e9},t=0;const hist=[];for(;t<20;t+=.028){__step(A,.028,M);const d=Math.hypot(A.x-M[0].x,A.y-M[0].y);hist.push({t,a:{...A},ms:M.map(m=>({...m}))});if(d<best.d)best={d,i:hist.length-1}}
  const h=hist[best.i];
  for(const bb of [-3,-5,-7,-9,-12]){const a={...h.a},ms=h.ms.map(m=>({...m}));const rvx=a.vx-ms[0].vx,rvy=a.vy-ms[0].vy,rv=Math.hypot(rvx,rvy);a.vx+=rvx/rv*bb;a.vy+=rvy/rv*bb;
    let inside=0,res='held 400',lim='${model}'==='patched'?ms[0].r*Math.pow(ms[0].mu/MU,.4):ms[0].soi;for(let t=0;t<400;t+=.028){__step(a,.028,ms);const d=Math.hypot(a.x-ms[0].x,a.y-ms[0].y);if(d<ms[0].rad){res='moon impact @'+t.toFixed(0);break}if(d>lim){res='left SOI @'+t.toFixed(1);break}}
    out.capture.push({moonRelRetro:bb,ca:+best.d.toFixed(1),result:res})}
  grav=__models.fade;return JSON.stringify(out)})()`));
 console.log('== '+model);for(const o of r.orbits)console.log(JSON.stringify(o));for(const c of r.capture)console.log(JSON.stringify(c));
}
await b.close();
