import {open} from './harness.mjs';
for (const F of ['orig.html','new.html']){const {b,ev}=await open(F);
const r=await ev(`(()=>{let n=0,close=0,jumps=[];for(const tn of [6,10,14,16,18,20,25,30,34,37,42]){let prev=null;for(let bb=-10;bb<=26;bb+=.2){node={at:simTime+tn,burn:+bb.toFixed(1),committed:false};const e=projection().enc;if(e.d<e.soi)close++;n++;if(prev&&(prev.d<prev.soi||e.d<e.soi)&&(e.name!==prev.name||Math.abs(e.t-prev.t)>3||Math.abs(e.d-prev.d)>6))jumps.push(tn+'/'+bb.toFixed(1)+' '+prev.name[0]+prev.d.toFixed(0)+'→'+e.name[0]+e.d.toFixed(0)+' T'+prev.t.toFixed(0)+'→'+e.t.toFixed(0));prev=e}}node=null;return JSON.stringify({samples:n,withinSOI:close,jumpsInvolvingSOI:jumps.length,ex:jumps.slice(0,8)})})()`);
console.log(F,r);await b.close()}
