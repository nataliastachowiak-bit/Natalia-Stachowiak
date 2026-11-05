import { chromium, request } from 'playwright';
import fs from 'node:fs/promises';

const root = 'https://nataliastachowiak-bit.github.io/Natalia-Stachowiak/';
const report = { checks: [], failures: [], warnings: [], pageErrors: [] };
await fs.mkdir('qa-artifacts', {recursive: true});
function record(name, pass, detail='') {
  report.checks.push({name,pass,detail});
  console.log((pass ? 'PASS' : 'FAIL') + ' | ' + name + (detail ? ' | ' + detail : ''));
  if (!pass) report.failures.push(name + ': ' + detail);
}
function warn(name, detail) {report.warnings.push({name,detail}); console.log('WARN | '+name+' | '+detail);}
const api = await request.newContext({timeout:30000,ignoreHTTPSErrors:false});
async function checkPdf(path) {
  try {
    const res=await api.get(root+path);
    const body=await res.body();
    const pdf=body.subarray(0,5).toString()==='%PDF-';
    record('PDF '+path, res.status()===200 && pdf, 'HTTP '+res.status()+', bytes '+body.length+', PDF magic '+pdf);
  } catch(err) {record('PDF '+path,false,String(err).slice(0,260));}
}
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true,locale:'de-DE'});
const page=await ctx.newPage();
page.on('pageerror', e=>{report.pageErrors.push(e.message);console.log('PAGE ERROR | '+e.message.slice(0,270));});
async function open(path) {
  const res=await page.goto(root+path, {waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForTimeout(1600);
  return res;
}
try {
  const res=await open('');
  record('Startseite erreichbar',res?.status()===200,'HTTP '+res?.status());
  record('Hero sichtbar',await page.locator('h1').first().isVisible(),(await page.locator('h1').first().innerText()).slice(0,140));
  record('Projekthighlight Startseite',await page.getByText('Better decisions for circular renovation').count()>0||await page.getByText('Bessere Entscheidungen für zirkuläre Sanierung').count()>0,'ResourceLoop AI');
  await page.screenshot({path:'qa-artifacts/home-desktop.png',fullPage:false});

  const resProjects=await open('projects#resourceloop');
  const section=page.locator('#resourceloop');
  record('ResourceLoop direkt erreichbar',await section.count()===1,'HTTP '+resProjects?.status());
  if(await section.count()) {
    record('ResourceLoop richtige Ausrichtung',(await section.innerText()).includes('zirkuläre Gebäudesanierung'),'Renovation case study');
    record('Scanner-Demolink vorhanden',await section.locator('a[href="https://scan-to-sure-decision.lovable.app/"]').count()===1);
    const expand=section.getByRole('button',{name:'Methodik & Scope ansehen'});
    if(await expand.count()) {
      await expand.click();
      record('Methodik aufklappbar',(await section.innerText()).includes('Problem Discovery'));
    } else record('Methodik aufklappbar',false,'button not found');
  }
  await page.screenshot({path:'qa-artifacts/projects-desktop.png',fullPage:false});

  await page.getByRole('button',{name:'English'}).click();
  record('Sprachwechsel Englisch',await page.getByText('Scan-to-Decision for Circular Building Renovation').count()===1);
  await page.getByRole('button',{name:'Polski'}).click();
  record('Sprachwechsel Polnisch',await page.getByText('Scan-to-Decision dla cyrkularnej renowacji budynków').count()===1);
  await page.getByRole('button',{name:'Deutsch'}).click();

  const resCert=await open('certificates');
  record('Zertifikate-Seite',await page.getByText('Zertifikate & Qualifikationen').count()>0,'HTTP '+resCert?.status());
  record('Zertifikatsdarstellung vorhanden',await page.getByText('KERNQUALIFIKATIONEN').count()>0||((await page.locator('body').innerText()).includes('KERNQUALIFIKATIONEN')));
  await page.screenshot({path:'qa-artifacts/certificates-desktop.png',fullPage:false});

  const resContact=await open('contact');
  record('Kontakt-Seite erreichbar',await page.locator('main').count()===1,'HTTP '+resContact?.status());

  for(const [width,height] of [[390,844],[320,700]]) {
    await page.setViewportSize({width,height});
    await open('');
    const widths=await page.evaluate(()=>({screen:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
    record('Mobile horizontaler Überlauf '+width,widths.document<=width+3,JSON.stringify(widths));
    const menu=page.getByRole('button',{name:'Navigation umschalten'});
    record('Mobile Navigation '+width,await menu.isVisible());
    if(width===390) {
      await menu.click();
      record('Mobile Menü öffnet',await page.getByText('Language / Sprache:').isVisible());
      await page.screenshot({path:'qa-artifacts/mobile-navigation.png',fullPage:false});
      await menu.click();
      await page.screenshot({path:'qa-artifacts/home-mobile.png',fullPage:false});
    } else await page.screenshot({path:'qa-artifacts/home-mobile-320.png',fullPage:false});
  }
} catch(e) {
  record('Browserlauf abgeschlossen',false,String(e?.stack||e).slice(0,900));
}

for(const path of ['assets/Natalia_Stachowiak_CV.pdf','assets/certificates/Professional-Scrum-Product-Owner-I.pdf','assets/certificates/Professional-Scrum-Master-I.pdf','assets/certificates/google-cloud-depsapgc1x-edx.pdf']) await checkPdf(path);

try {
 const res=await api.get('https://scan-to-sure-decision.lovable.app/',{maxRedirects:6});
 record('Scanner-Demo HTTP erreichbar',res.ok(),'HTTP '+res.status()+', URL '+res.url());
} catch(e) {warn('Scanner-Demo aus Runner nicht überprüfbar',String(e).slice(0,250));}

if (report.pageErrors.length) warn('JS-Fehler im Browser',report.pageErrors.join(' | ').slice(0,800));
await fs.writeFile('qa-artifacts/report.json',JSON.stringify(report,null,2));
await ctx.close();await browser.close();await api.dispose();
console.log('\nRESULT: '+report.checks.filter(x=>x.pass).length+'/'+report.checks.length+' checks passed; '+report.failures.length+' failures, '+report.warnings.length+' warnings');
if(report.failures.length)process.exitCode=1;
