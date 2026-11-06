import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const relevant = [
  'src/data/assetRegistry.ts',
  'src/data/portfolioData.ts',
  'src/components/PersonalStoryDialog.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ProjectsPage.tsx',
  'src/pages/CertificatesPage.tsx',
  'src/pages/JourneyPage.tsx',
  'src/pages/ContactPage.tsx',
];
const failures = [];
const results = [];
function check(label, condition, detail = '') {
  results.push({label, pass: Boolean(condition), detail});
  console.log((condition ? 'PASS' : 'FAIL') + ' | ' + label + (detail ? ' | ' + detail : ''));
  if (!condition) failures.push(label + ': ' + detail);
}
for (const source of relevant) {
  const s = fs.readFileSync(path.join(root, source), 'utf8');
  const assets = [...new Set([...s.matchAll(/['"`](\/(?:assets|images)\/[^'"`\n$]+)['"`]/g)].map(m => m[1]))];
  const missing = assets.filter(asset => !fs.existsSync(path.join(root, 'public', asset)));
  check('Assets ' + source, !missing.length, missing.length ? missing.join(', ') : assets.length + ' Referenzen');
}
const pdfs = [
  'assets/Natalia_Stachowiak_CV.pdf',
  'assets/certificates/Professional-Scrum-Master-I.pdf',
  'assets/certificates/Professional-Scrum-Product-Owner-I.pdf',
  'assets/certificates/google-cloud-depsapgc1x-edx.pdf',
];
for (const file of pdfs) {
  const full = path.join(root, 'public', file);
  let valid = false;
  let size = 0;
  if (fs.existsSync(full)) {
    const fd = fs.openSync(full, 'r');
    const magic = Buffer.alloc(5);
    fs.readSync(fd, magic, 0, 5, 0);
    fs.closeSync(fd);
    size = fs.statSync(full).size;
    valid = size > 1000 && magic.toString() === '%PDF-';
  }
  check('Echtes PDF ' + file, valid, size + ' bytes');
}
// Keep mobile Safari images small, valid and available in the production dist.
for (const portrait of ['natalia-business-portrait', 'natalia-about-portrait']) {
  const originalPath = path.join(root, 'public', 'images', portrait + '.png');
  const originalSize = fs.statSync(originalPath).size;
  for (const width of [480, 960]) {
    const asset = 'images/' + portrait + '-' + width + '.webp';
    const target = path.join(root, 'public', asset);
    const built = path.join(root, 'dist', asset);
    const exists = fs.existsSync(target) && fs.existsSync(built);
    const imageSize = exists ? fs.statSync(target).size : 0;
    const header = exists ? fs.readFileSync(target).subarray(0, 4).toString() : '';
    check('Mobile Safari Foto ' + asset, exists && header === 'RIFF' && imageSize < originalSize && imageSize < 300000, imageSize + ' bytes; original ' + originalSize);
  }
}
const dialog = fs.readFileSync(path.join(root, 'src/components/PersonalStoryDialog.tsx'), 'utf8');
const magnets = fs.readFileSync(path.join(root, 'src/components/TravelMagnets.tsx'), 'utf8');
check('Persönliche Karte ist modaler Dialog', dialog.includes('<dialog') && dialog.includes('</dialog>'));
for (const section of ['top', 'side', 'between', 'textEnd', 'bottom']) {
  check('Magnetgruppe ' + section, dialog.includes('placement="' + section + '"'));
}
check('Karte ohne Kühlschrankfoto', !dialog.includes('magnetsImage'));
check('Goldene Weltkarte und Foto-Galerie erhalten', dialog.includes('worldMapGoldImage') && dialog.includes('beachDogImage') && dialog.includes('seaQuoteImage'));
check('Alle 25 Reisemagnete im Komponenten-Code', [...magnets.matchAll(/'[^']+'/g)].some(m => m[0] === "'Santa Maria di Leuca'") && magnets.includes("'Halkidiki'") && magnets.includes("'Étretat'"));
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
for (const route of ['/', '/about', '/projects', '/journey', '/certificates', '/book', '/contact', '/privacy']) {
  check('Route ' + route, app.includes('path="' + route + '"'));
}
// Verify that direct GitHub Pages URLs have real static entry files with
// route-specific canonical metadata, rather than falling back to HTTP 404.
const directRoutes = [
  'about', 'journey', 'projects', 'certificates', 'contact', 'book', 'privacy',
  'projects/circulartwin-ai', 'projects/ai-building-concept',
  'projects/ecomargin-ai', 'projects/environix', 'projects/gain',
  'projects/streetlife', 'projects/vinyl-ai', 'projects/dine-ease',
  'projects/du-bist-nicht-zu-viel', 'projects/resourceloop-ai',
];
for (const route of directRoutes) {
  const entry = path.join(root, 'dist', route, 'index.html');
  const isFile = fs.existsSync(entry);
  const html = isFile ? fs.readFileSync(entry, 'utf8') : '';
  const canonical = 'https://nataliastachowiak-bit.github.io/Natalia-Stachowiak/' + route;
  const routeIsPresent = isFile && html.includes('<div id="root"></div>') &&
    html.includes('rel="canonical" href="' + canonical + '"');
  check('Echte Direktlink-Seite /' + route, routeIsPresent, isFile ? 'HTML mit Route-Canonical' : 'Fehlt');
}
// Editorial credibility check: the book is still a project, not a
// published commercial product. Avoid asserting unverified sales or followers.
const projectData = fs.readFileSync(path.join(root, 'src/data/portfolioData.ts'), 'utf8');
const translations = fs.readFileSync(path.join(root, 'src/data/translations.ts'), 'utf8');
const bookPage = fs.readFileSync(path.join(root, 'src/pages/BookPage.tsx'), 'utf8');
const bookStart = projectData.indexOf("id: 'du-bist-nicht-zu-viel'");
const bookEnd = projectData.indexOf("id: 'ecomargin-ai'", bookStart);
const bookProject = projectData.slice(bookStart, bookEnd);
const forbiddenClaims = /1[., ]?000\s*\+?\s*(?:followers|follower|obserwuj\w*)|über 1[., ]?000|kommerziell publiziert|realen Verkäufen|Real Market Results|Successfully published book|final market publication|Wydana książka/i;
check('Buchfallstudie ohne unbelegte Veröffentlichung oder Verkaufszahlen', bookStart > 0 && bookEnd > bookStart && !forbiddenClaims.test(bookProject));
check('Buchseite und Fallstudie verwenden unveröffentlichten Status', bookPage.includes('noch nicht veröffentlicht') && bookProject.includes('Veröffentlichung, Verkaufszahlen') && !/From idea to published product/.test(bookProject));
check('Buch-Autorenprofil DE/EN/PL ohne behauptete Veröffentlichung', !/Publiziertes Buchwerk|Published non-fiction book|Wydana publikacja książkowa|Published & Community/.test(translations));
check('Instagram-QR auf Buchseite verlinkt korrekt', bookPage.includes('PROJECT_BOOK_INSTAGRAM_QR') && bookPage.includes('https://www.instagram.com/frau_en_power2026/'));
check('Kanonen-Code für QR ist scanbar als SVG', fs.existsSync(path.join(root, 'public/assets/instagram_qr_scannable.svg')));

fs.mkdirSync('qa-artifacts', {recursive:true});
fs.writeFileSync('qa-artifacts/static-audit.json', JSON.stringify({results,failures}, null, 2));
console.log('\nRESULT: ' + (results.length - failures.length) + '/' + results.length + ' checks passed');
if (failures.length) process.exitCode = 1;
