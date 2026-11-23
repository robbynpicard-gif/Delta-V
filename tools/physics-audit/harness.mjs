import { chromium } from 'playwright';
export async function open(file, {seed=1, viewport={width:1280,height:800}}={}) {
  const b = await chromium.launch({executablePath:'/usr/bin/google-chrome'});
  const ctx = await b.newContext({viewport});
  await ctx.addInitScript((seed)=>{
    let x=seed>>>0||1; Math.random=()=>{x^=x<<13;x>>>=0;x^=x>>17;x^=x<<5;x>>>=0;return x/4294967296};
    window.requestAnimationFrame=()=>0;  // we drive frame() manually
  }, seed);
  const p = await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+process.cwd()+'/'+file);
  return {b,p,errs, ev:(code)=>p.evaluate(c=>window.__dv.ev(c), code)};
}
