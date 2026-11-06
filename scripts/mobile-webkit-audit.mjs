import { webkit } from 'playwright';
import fs from 'node:fs/promises';

const root = 'http://127.0.0.1:4173/Natalia-Stachowiak/';
const browser = await webkit.launch({headless:true});
const context = await browser.newContext({
  viewport: {width:390,height:844}, deviceScaleFactor:3, isMobile:true, hasTouch:true,
  locale:'de-DE', reducedMotion:'reduce'
});
await fs.mkdir('qa-artifacts',{recursive:true});
const page = await context.newPage();
page.on('pageerror', error => console.log('WEBKIT PAGE ERROR | '+error.message));
page.on('console', message => {if(message.type()==='error')console.log('WEBKIT CONSOLE ERROR | '+message.text().slice(0,300));});
page.on('response', response => {if(response.status()>=400)console.log('WEBKIT HTTP '+response.status()+' | '+response.url());});
const failures=[];
function check(name,ok,details='') {
  console.log((ok?'PASS':'FAIL')+' | '+name+(details?' | '+details:''));
  if(!ok)failures.push(name+': '+details);
}
for(const [route,portrait] of [['','natalia-business-portrait'],['about','natalia-about-portrait']]) {
  const response=await page.goto(root+route,{waitUntil:'domcontentloaded',timeout:45000});
  check('iPhone WebKit route '+(route||'home'),response?.status()===200,'HTTP '+response?.status());
  await page.waitForTimeout(1500);
  console.log('WEBKIT BODY | '+(await page.locator('body').innerText()).slice(0,500));
  console.log('WEBKIT IMAGE COUNT | '+await page.locator('img').count());
  await page.screenshot({path:'qa-artifacts/webkit-debug-'+(route||'home')+'.png'});
  const img=page.locator('img[alt="Natalia Stachowiak"]').first();
  await img.waitFor({state:'visible',timeout:20000});
  await img.evaluate(async image => {if(!image.complete) await new Promise(resolve => image.addEventListener('load',resolve,{once:true}));});
  const result=await img.evaluate(i=>({currentSrc:i.currentSrc,width:i.naturalWidth,loaded:i.complete,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
  check('iPhone WebKit image '+portrait,result.loaded&&result.width>0&&result.currentSrc.includes(portrait+'-')&&result.currentSrc.endsWith('.webp'),JSON.stringify(result));
  check('No horizontal scroll '+(route||'home'),result.scrollWidth<=result.viewport+3);
  await page.screenshot({path:'qa-artifacts/iphone-webkit-'+(route||'home')+'.png'});
}
await page.getByRole('button',{name:'Karte öffnen'}).click();
check('Personal story modal in iPhone WebKit',await page.locator('dialog[open]').count()===1);
const geom=await page.locator('dialog[open]').evaluate(el=>({scrollWidth:el.scrollWidth,clientWidth:el.clientWidth}));
check('Personal story no horizontal overflow',geom.scrollWidth<=geom.clientWidth+5,JSON.stringify(geom));
await page.screenshot({path:'qa-artifacts/iphone-webkit-dialog.png'});
await browser.close();
console.log('RESULT: '+(failures.length?'FAIL '+failures.length: 'PASS')+' Safari/WebKit mobile tests');
if(failures.length)process.exitCode=1;
