globalThis.__models={
 fade:grav,
 full:(x,y,ms=moons)=>{const r=Math.max(R*.75,Math.hypot(x,y)),k=-MU/(r*r*r);let ax=x*k,ay=y*k;for(const m of ms||[]){const dx=m.x-x,dy=m.y-y,d=Math.max(m.rad*.65,Math.hypot(dx,dy)),f=m.mu/(d*d*d);ax+=dx*f;ay+=dy*f}return{x:ax,y:ay}},
 patched:(x,y,ms=moons)=>{for(const m of ms||[]){const dx=m.x-x,dy=m.y-y,d=Math.hypot(dx,dy),soi=m.r*Math.pow(m.mu/MU,.4);if(d<soi){const q=Math.max(m.rad*.65,d),f=m.mu/(q*q*q),rm=Math.hypot(m.x,m.y),km=-MU/(rm*rm*rm);return{x:dx*f+m.x*km,y:dy*f+m.y*km}}}const r=Math.max(R*.75,Math.hypot(x,y)),k=-MU/(r*r*r);return{x:x*k,y:y*k}}};
globalThis.__step=(a,dt,ms)=>{let q=grav(a.x,a.y,ms);a.vx+=q.x*dt/2;a.vy+=q.y*dt/2;a.x+=a.vx*dt;a.y+=a.vy*dt;advanceMoons(ms,dt);q=grav(a.x,a.y,ms);a.vx+=q.x*dt/2;a.vy+=q.y*dt/2};
