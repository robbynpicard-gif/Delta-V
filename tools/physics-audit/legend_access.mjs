import { chromium } from 'playwright';
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const log=(k,v)=>console.log(k.padEnd(50),JSON.stringify(v));
// real rAF, unmodified page (no harness overrides) — keyboard
const p=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/delta-v/index.html');await p.waitForTimeout(500);
const open=()=>p.evaluate(()=>document.getElementById('legend').open), paused=()=>p.evaluate(()=>document.getElementById('pause').textContent);
const order=[];for(let i=0;i<10;i++){await p.keyboard.press('Tab');order.push(await p.evaluate(()=>{const a=document.activeElement;return a.id||a.tagName.toLowerCase()}));if(order.at(-1)==='summary')break}
log('Tab order until legend',order);
const vis=await p.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);log('focus ring visible on summary',vis);
await p.keyboard.press('Enter');log('Enter on summary -> open',await open());
await p.keyboard.press('Space');log('Space on summary -> open / pause btn',[await open(),await paused()]);
await p.mouse.click(640,700);await p.keyboard.press('l');log('L key (focus on page) -> open',await open());await p.keyboard.press('l');log('L again -> open',await open());
await p.keyboard.press('Space');log('Space elsewhere still pauses',await paused());await p.keyboard.press('Space');
// legend readable to assistive tech: list items with text
log('legend items / first text',await p.evaluate(()=>{const li=[...document.querySelectorAll('#legend li')];return [li.length,li[0].innerText.replace(/\n/g,' | ')]}));
log('swatch canvases aria-hidden',await p.evaluate(()=>[...document.querySelectorAll('#legend canvas')].every(c=>c.getAttribute('aria-hidden')==='true')));
// touch on phone
const m=await (await b.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true})).newPage();m.on('pageerror',e=>errs.push('m:'+e.message));
await m.goto('file:///home/claude/delta-v/index.html');await m.waitForTimeout(500);
await m.tap('#legend summary');log('phone tap opens',await m.evaluate(()=>document.getElementById('legend').open));
log('phone: legend fits / scrolls',await m.evaluate(()=>{const r=document.getElementById('legend').getBoundingClientRect(),bd=document.getElementById('legendBody');return {top:Math.round(r.top),bottom:Math.round(r.bottom),vh:innerHeight,scrollable:bd.scrollHeight>bd.clientHeight}}));
await m.tap('#legend summary');log('phone tap closes',await m.evaluate(()=>document.getElementById('legend').open));
await m.tap('#pause');log('phone tap Pause still works',await m.evaluate(()=>document.getElementById('pause').textContent));
log('errors',errs);await b.close();
