import { chromium } from 'playwright';
import fs from 'node:fs/promises';

// Public, non-authenticated reachability and rendering audit of links displayed
// in the portfolio. A 200 response alone does not prove a working prototype.
const projects = [
  {key:'gain',name:'NatflixGain',url:'https://natflixgain.base44.app',expected:['movie','film','würfel','watch','gain']},
  {key:'ai-building',name:'AI Building Concept',url:'https://buldingaiconcept.lovable.app',expected:['building','gebäude','concept','architect','bau']},
  {key:'resource-loop-scanner',name:'ResourceLoop AI Scan-to-Decision',url:'https://scan-to-sure-decision.lovable.app/',expected:['scan','decision','material','resource','bauteil']},
  {key:'environix',name:'eNvironix AI',url:'https://ai.studio/apps/044b2856-5805-4816-81ca-30e7e20fa3dd?fullscreenApplet=true',expected:['energy','water','environment','energie','umwelt','app']},
  {key:'instagram',name:'Buch-Instagram',url:'https://www.instagram.com/frau_en_power2026/',expected:['frau_en_power2026','instagram']},
];

const browser=await chromium.launch({headless:true});
const observations=[];
await fs.mkdir('qa-artifacts',{recursive:true});
for(const device of [
  {id:'desktop',viewport:{width:1440,height:900},mobile:false},
  {id:'mobile',viewport:{width:390,height:844},mobile:true}
]) {
  const context=await browser.newContext({
    viewport:device.viewport, isMobile:device.mobile,hasTouch:device.mobile,
    locale:'de-DE', ignoreHTTPSErrors:false,serviceWorkers:'block'
  });
  for(const project of projects){
    const page=await context.newPage();
    const errors=[],failedRequests=[];
    page.on('pageerror', e=>errors.push(String(e.message).slice(0,260)));
    page.on('requestfailed',r=>failedRequests.push({url:r.url().slice(0,180),reason:r.failure()?.errorText}));
    let status=null, navigationError=null, title='',text='',finalUrl='',htmlLength=0, links=0;
    try {
      const response=await page.goto(project.url,{waitUntil:'domcontentloaded',timeout:32000});
      status=response?.status() ?? null;
      await page.waitForTimeout(4200);
      title=await page.title();
      finalUrl=page.url();
      text=(await page.locator('body').innerText({timeout:7000})).replace(/\s+/g,' ').slice(0,5000);
      htmlLength=(await page.locator('body').innerHTML({timeout:7000})).length;
      links=await page.locator('a[href]').count();
      await page.screenshot({path:`qa-artifacts/external-${project.key}-${device.id}.png`,fullPage:false,timeout:12000});
    } catch(e) {
      navigationError=String(e?.message??e).slice(0,500);
      try{title=await page.title();finalUrl=page.url()}catch{}
    }
    const matches=project.expected.filter(q=>(title+' '+text).toLowerCase().includes(q.toLowerCase()));
    const auth=/(accounts\.google\.com|sign in with google|continue with google|log in|login required|anmelden|registrieren|passwort|password|please sign in)/i.test(finalUrl+' '+text.slice(0,550));
    const notFound=/(site not found|project not found|not deployed|this site can't be reached|404 not found|page not found|app not found|website not found|cannot find this app)/i.test(title+' '+text.slice(0,400));
    const statusCodeValid=status!==null && status>=200 && status<400;
    const rendered=text.length>=35 || htmlLength>2500;
    let category='NEEDS_REVIEW';
    if(!statusCodeValid || notFound)category='BROKEN_OR_BLOCKED';
    else if(auth)category='AUTH_OR_LOGIN';
    else if(rendered && matches.length>0)category='RENDERED_EXPECTED_PROJECT';
    else if(rendered)category='RENDERED_UNCONFIRMED_CONTENT';
    const result={name:project.name,device:device.id,url:project.url,status,finalUrl,title,category,bodyChars:text.length,htmlLength,links,expectedTermsFound:matches,bodyStart:text.slice(0,470),navigationError,errors:errors.slice(0,5),failedRequests:failedRequests.slice(0,8)};
    observations.push(result);
    console.log('PROJECT_APP '+JSON.stringify(result));
    await page.close();
  }
  await context.close();
}
await browser.close();
await fs.writeFile('qa-artifacts/external-project-apps.json',JSON.stringify(observations,null,2));
console.log('PROJECT_APP_AUDIT_DONE '+observations.length+' device-project checks; this is a public unauthenticated observation, not end-to-end feature validation.');
