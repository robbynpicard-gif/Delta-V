// injected into page closure via ev(); defines helpers using the game's own functions/state
globalThis.__live=(T)=>{warp=8;last=0;let now=0;const rec=[];let g=0;
  while(simTime<T&&!s.dead&&g++<100000){now+=50;frame(now);
    const m=moons[0],o=moons[1];
    rec.push({t:simTime,x:s.x,y:s.y,vx:s.vx,vy:s.vy,dv:s.dv,mi:{x:m.x,y:m.y,vx:m.vx,vy:m.vy},mo:{x:o.x,y:o.y,vx:o.vx,vy:o.vy},inf:ui.influence.textContent,orb:ui.orbit.textContent,st:ui.status.textContent,node:!!node})}
  return rec};
globalThis.__rel=(r,k)=>{const m=r[k];const dx=r.x-m.x,dy=r.y-m.y,dvx=r.vx-m.vx,dvy=r.vy-m.vy;return{d:Math.hypot(dx,dy),v:Math.hypot(dvx,dvy),dx,dy,dvx,dvy}};
