#!/usr/bin/env node
/**
 * GitHub Pages has no rewrite rules. Publish a real index.html file at each
 * known React route so direct navigation has a 200 response, not a 404 fallback.
 * Files use Vite's already-built root HTML (absolute /Natalia-Stachowiak/ assets).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const output = 'dist';
const origin = 'https://nataliastachowiak-bit.github.io/Natalia-Stachowiak';
const routes = [
  ['about', 'Über mich', 'Wissenschaftliche Analyse, unternehmerische Erfahrung und der Mensch hinter den Projekten.'],
  ['journey', 'My Journey', 'Mein Weg von Wissenschaft und Wirtschaft zu Product Management, KI und Innovation.'],
  ['projects', 'Projekte', 'Digitale Produktkonzepte, Product Discovery, Prototypen und Innovation – darunter ResourceLoop AI.'],
  ['certificates', 'Zertifikate & Qualifikationen', 'Nachweise zu Scrum, Product Management, KI, Cloud und weiteren Qualifikationen.'],
  ['contact', 'Kontakt', 'Kontakt zu Natalia Stachowiak für Digital & AI Product Management, Innovation und digitale Transformation.'],
  ['book', 'Buch', 'Du bist nicht zu viel – das Buch von Natalia Stachowiak.'],
  ['privacy', 'Datenschutz', 'Datenschutzhinweise zum persönlichen Portfolio.'],
  ['projects/circulartwin-ai', 'CircularTwin AI', 'Produktkonzept für zirkuläre Material- und Produktentscheidungen.'],
  ['projects/circulartwin', 'CircularTwin AI', 'Produktkonzept für zirkuläre Material- und Produktentscheidungen.'],
  ['projects/ai-building-concept', 'AI Building Concept', 'KI-gestützte Produktkonzeption und digitale Gebäudelösungen.'],
  ['projects/ai-building', 'AI Building Concept', 'KI-gestützte Produktkonzeption und digitale Gebäudelösungen.'],
  ['projects/building-ai', 'AI Building Concept', 'KI-gestützte Produktkonzeption und digitale Gebäudelösungen.'],
  ['projects/ecomargin-ai', 'EcoMargin AI', 'Produktkonzept für datenbasierte Entscheidungen in der Gastronomie.'],
  ['projects/ecomargin', 'EcoMargin AI', 'Produktkonzept für datenbasierte Entscheidungen in der Gastronomie.'],
  ['projects/environix', 'eNvironix AI', 'Umwelt- und Ressourcendaten als Grundlage digitaler Produktentscheidungen.'],
  ['projects/environix-ai', 'eNvironix AI', 'Umwelt- und Ressourcendaten als Grundlage digitaler Produktentscheidungen.'],
  ['projects/gain', 'NatflixGain', 'Filmfindung, Produktdesign und A/B-Testing.'],
  ['projects/streetlife', 'Street.life', 'Digitale Produktidee für lokale Veranstaltungen.'],
  ['projects/street-life', 'Street.life', 'Digitale Produktidee für lokale Veranstaltungen.'],
  ['projects/vinyl-ai', 'Vinyl AI', 'Digitale Produktkonzeption und Prototyping.'],
  ['projects/vinyl', 'Vinyl AI', 'Digitale Produktkonzeption und Prototyping.'],
  ['projects/dine-ease', 'DineEase', 'Digitale Produktkonzeption und Nutzererlebnis.'],
  ['projects/dineease', 'DineEase', 'Digitale Produktkonzeption und Nutzererlebnis.'],
  ['projects/du-bist-nicht-zu-viel', 'Du bist nicht zu viel', 'Das Buch von Natalia Stachowiak.'],
  ['projects/resourceloop-ai', 'ResourceLoop AI', 'Scan-to-Decision für zirkuläre Gebäudesanierung – KI-gestützter Demonstrator.'],
  ['projects/resourceloop', 'ResourceLoop AI', 'Scan-to-Decision für zirkuläre Gebäudesanierung – KI-gestützter Demonstrator.'],
];

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const replaceTag = (html, pattern, value, label) => {
  if (!pattern.test(html)) throw Error('Missing HTML head tag: ' + label);
  return html.replace(pattern, value);
};
const baseHtml = readFileSync(join(output, 'index.html'), 'utf8');
let written = 0;
for (const [route, title, description] of routes) {
  const pageUrl = origin + '/' + route;
  const cleanTitle = escapeHtml(title + ' | Natalia Stachowiak');
  const cleanDescription = escapeHtml(description);
  let html = baseHtml;
  html = replaceTag(html, /<title>[^<]*<\/title>/, '<title>' + cleanTitle + '</title>', 'title');
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="' + cleanDescription + '" />', 'description');
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, '<link rel="canonical" href="' + pageUrl + '" />', 'canonical');
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, '<meta property="og:url" content="' + pageUrl + '" />', 'og:url');
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/, '<meta property="og:title" content="' + cleanTitle + '" />', 'og:title');
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/, '<meta property="og:description" content="' + cleanDescription + '" />', 'og:description');
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/, '<meta name="twitter:title" content="' + cleanTitle + '" />', 'twitter:title');
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/, '<meta name="twitter:description" content="' + cleanDescription + '" />', 'twitter:description');
  const target = join(output, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  written++;
}
console.log('Created ' + written + ' HTTP-200 route entry pages for GitHub Pages.');
