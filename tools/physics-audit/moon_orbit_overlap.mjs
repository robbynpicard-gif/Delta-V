import {open} from './harness.mjs';
const {b,ev}=await open(process.argv[2]||'new.html');
const r=await ev(`(()=>{const out=[];for(const k of [0,1])for(const dir of [1,-1])for(const d0 of [16,20,26,32,38,44,50,56]){const ms=moons.map(m=>({...m}));const m=ms[k];if(d0<=m.rad+2||d0>=m.soi)continue;
 const ux=m.x/m.r,uy=m.y/m.r;for(const side of [1,-1]){const vc=Math.sqrt(m.mu/d0);const a={x:m.x+side*ux*d0,y:m.y+side*uy*d0,vx:m.vx+dir*side*(-uy)*vc,vy:m.vy+dir*side*ux*vc};
 let res='held';for(let t=0;t<1500;t+=.028){step(a,.028,ms);const dk=a.dom;const dd=Math.hypot(a.x-m.x,a.y-m.y);if(Math.abs(dd-d0)>2){res="orbit disturbed d="+dd.toFixed(1)+" @"+t.toFixed(0);break}if(dk!==k){res=(dk<0?'left SOI':'stolen by '+ms[dk].name)+' @'+t.toFixed(0);break}if(impactOf(a,ms)){res='impact @'+t.toFixed(0);break}}
 out.push(m.name[0]+(dir>0?'P':'R')+' d'+d0+(side>0?' far':' near')+': '+res)}}return out.filter(x=>!x.endsWith('held')).join('\\n')+'\\n(all others held 1500t)'})()`);
console.log(r);await b.close();
