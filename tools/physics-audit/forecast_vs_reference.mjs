import {open} from './harness.mjs';
const {b,ev}=await open(process.argv[2]||'orig.html');
const r=JSON.parse(await ev(`(()=>{
 // reference integrator: same force field, tiny step, moons advanced at correct times (kick-drift-kick with moon at t and t+dt)
 const ref=(a0,ms0,T,dt)=>{const a={...a0},ms=ms0.map(m=>({...m}));const pts=[];let t=0;const n=Math.round(T/dt);
   for(let i=0;i<n;i++){let q=grav(a.x,a.y,ms);a.vx+=q.x*dt/2;a.vy+=q.y*dt/2;a.x+=a.vx*dt;a.y+=a.vy*dt;advanceMoons(ms,dt);q=grav(a.x,a.y,ms);a.vx+=q.x*dt/2;a.vy+=q.y*dt/2;t+=dt;pts.push({t,x:a.x,y:a.y,ms:ms.map(m=>({x:m.x,y:m.y}))})}return pts};
 const game=(a0,ms0,T,dt)=>{const a={...a0},ms=ms0.map(m=>({...m}));const pts=[];let t=0;const n=Math.round(T/dt);
   for(let i=0;i<n;i++){step(a,dt,ms);advanceMoons(ms,dt);t+=dt;pts.push({t,x:a.x,y:a.y,ms:ms.map(m=>({x:m.x,y:m.y}))})}return pts};
 const at=(pts,t)=>pts.reduce((p,q)=>Math.abs(q.t-t)<Math.abs(p.t-t)?q:p);
 const ca=(pts,k)=>pts.reduce((best,p)=>{const d=Math.hypot(p.x-p.ms[k].x,p.y-p.ms[k].y);return d<best.d?{d,t:p.t}:best},{d:1e9});
 const out=[];
 const cases=[[16,9],[15,21],[20,10],[37,11],[37,22.5],[34,3.5]];
 for(const [tn,bb] of cases){
  const st=predictState(s,tn);const a=st.ship,v=Math.hypot(a.vx,a.vy);a.vx+=a.vx/v*bb;a.vy+=a.vy/v*bb;
  node={at:simTime+tn,burn:bb,committed:false};const enc=projection().enc;node=null;
  const k=enc.name==='INNER MOON'?0:1, T=Math.min(enc.t-tn+25,300);
  const R=ref(a,st.ms,T,.0028),L=game(a,st.ms,T,.028),P=game(a,st.ms,T,.084);
  const cR=ca(R,k),cL=ca(L,k),cP=ca(P,k);
  const e=(A,t)=>{const p=at(A,t),q=at(R,t);return Math.hypot(p.x-q.x,p.y-q.y)};
  out.push({node:tn,burn:bb,moon:enc.name,forecast:{d:+enc.d.toFixed(2),t:+(enc.t-tn).toFixed(2)},reference:{d:+cR.d.toFixed(2),t:+cR.t.toFixed(2)},live:{d:+cL.d.toFixed(2),t:+cL.t.toFixed(2)},previewStep:{d:+cP.d.toFixed(2)},posErr_liveVsRef_end:+e(L,T).toFixed(2),posErr_previewVsLive_end:+(()=>{const p=at(P,T),q=at(L,T);return Math.hypot(p.x-q.x,p.y-q.y)})().toFixed(2),T:+T.toFixed(0)});
 }
 return JSON.stringify(out)})()`));
for(const x of r)console.log(JSON.stringify(x));
await b.close();
