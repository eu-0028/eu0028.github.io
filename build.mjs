/* Сборка статического сайта. Запуск: node build.mjs */
import { mkdir, writeFile, copyFile, access, rm, readdir, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createHash } from 'node:crypto';
import { ru, en, pt, shared } from './src/content.mjs';
import { page } from './src/render.mjs';

const exists = async (p) => access(p, constants.F_OK).then(() => true, () => false);


/* В вёрстку попадают только те фотографии, которые реально лежат в assets/img */
await mkdir('assets/img', { recursive: true });
/* Портрет: вырезанная фигура с прозрачным фоном, поэтому webp или png */
const portraitFile = (await readdir('assets/img')).find((f) => /^portrait\.(webp|png|jpe?g)$/i.test(f)) || '';
/* Логотип задается основой имени (mgimo, mgimo-en), а сборка находит файл
   с любым подходящим расширением. Так его можно положить как угодно. */
const logos = new Map();
for (const f of await readdir('assets/img')) {
  const m = /^([a-z0-9-]+)\.(svg|png|webp)$/i.exec(f);
  if (m && /^(portrait|og-)/i.test(m[1])) continue;    // портрет и карточки соцсетей не логотипы
  if (m && !logos.has(m[1].toLowerCase())) logos.set(m[1].toLowerCase(), f);
}
const icons = {};
for (const f of await readdir('assets/icons')) {
  if (!f.endsWith('.svg')) continue;
  const raw = await readFile(`assets/icons/${f}`, 'utf8');
  icons[f.replace('.svg', '')] = raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

/* Фотографии проектов: все, что лежит в assets/img, кроме логотипов и портрета */
const images = new Set(
  (await readdir('assets/img')).filter(
    (f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !/^(mgimo|portrait|og)[-.]/i.test(f)
  )
);

for (const l of shared.locales) if (l.path) await mkdir(l.path, { recursive: true });
await mkdir('assets/img', { recursive: true });

/* Имена файлов со стилями и скриптом несут хеш содержимого.
   После любой правки адрес меняется, поэтому браузер не может
   отдать старую версию из кеша. */
const hash = (txt) => createHash('sha1').update(txt).digest('hex').slice(0, 8);

for (const f of await readdir('assets')) {
  if (/^(styles|app|fonts|map-base)\.[0-9a-f]{8}\.(css|js|svg)$/.test(f)) await rm(`assets/${f}`);
}

const cssRaw = await readFile('src/styles.css', 'utf8');
const jsRaw = await readFile('src/app.js', 'utf8');
const fontsRaw = await readFile('assets/fonts.css', 'utf8');
/* Фон карты обязан быть с хешем: он в одной системе координат с контурами
   стран, которые вшиты в разметку. Старый фон из кеша под новыми контурами
   съезжает — страны оказываются не на своих местах. */
const mapRaw = await readFile('assets/map-base.svg', 'utf8');

const cssName = `styles.${hash(cssRaw)}.css`;
const jsName = `app.${hash(jsRaw)}.js`;
const fontsName = `fonts.${hash(fontsRaw)}.css`;
const mapName = `map-base.${hash(mapRaw)}.svg`;

await writeFile(`assets/${cssName}`, cssRaw);
await writeFile(`assets/${jsName}`, jsRaw);
await writeFile(`assets/${fontsName}`, fontsRaw);
await writeFile(`assets/${mapName}`, mapRaw);
const assetNames = { cssName, jsName, fontsName, mapName };

await copyFile('src/favicon.svg', 'favicon.svg');
/* Растровые копии значка: Chrome сам просит /favicon.ico, и без него
   вкладка остается с пустым глобусом, даже когда SVG на месте. */
await copyFile('src/favicon.ico', 'favicon.ico');
await copyFile('src/apple-touch-icon.png', 'apple-touch-icon.png');

const pages = { ru, en, pt };
for (const l of shared.locales) {
  await writeFile(`${l.path}index.html`, page(pages[l.key], { portraitFile, images, logos, icons, ...assetNames }));
}

/* 404 — уводим на главную, а не в пустоту */
await writeFile(
  '404.html',
  `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Страница не найдена — ${ru.hero.name}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/${fontsName}"><link rel="stylesheet" href="/assets/${cssName}">
</head><body>
<main id="main" class="band"><div class="shell">
<p class="label" style="margin-bottom:1.5rem">404</p>
<h1 class="h2">Такой страницы нет<br><span lang="en">This page does not exist</span><br><span lang="pt-BR">Esta página não existe</span></h1>
<p class="hero__cta"><a class="btn" href="/">На главную</a><a class="btn btn--ghost" href="/en/" lang="en">Home</a><a class="btn btn--ghost" href="/pt/" lang="pt-BR">Início</a></p>
</div></main></body></html>`
);

const yo = (page(ru, { portraitFile, images, logos, icons, ...assetNames }).match(/[ёЁ]/g) || []).length;
if (yo) throw new Error(`В русском тексте снова буква ё: ${yo} шт.`);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${shared.locales
    .map(
      (l) => `<url><loc>${shared.domain}/${l.path}</loc><lastmod>${today}</lastmod><priority>${l.path ? '0.9' : '1.0'}</priority>
    ${shared.locales.map((a) => `<xhtml:link rel="alternate" hreflang="${a.htmlLang}" href="${shared.domain}/${a.path}"/>`).join('\n    ')}
  </url>`
    )
    .join('\n  ')}
</urlset>`
);

await writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${shared.domain}/sitemap.xml\n`);

const fonts = (await readdir('assets/fonts')).length;
console.log(`Готово: ${shared.locales.map((l) => l.path + 'index.html').join(', ')}, 404.html, sitemap.xml, robots.txt`);
console.log(`Кеш: ${cssName}, ${jsName}, ${fontsName}, ${mapName}`);
console.log(`Шрифтов: ${fonts}`);
console.log(`Портрет: ${portraitFile || 'нет файла assets/img/portrait.(webp|png|jpg) — блок скрыт'}`);
console.log(`Фотографии проектов: ${images.size ? [...images].join(', ') : 'нет — блоки с фото не выводятся'}`);
const needLogos = ['mgimo'].filter((n) => !logos.has(n));
console.log(
  `Логотипы: ${logos.size ? [...logos.values()].join(', ') : 'нет'}` +
    (needLogos.length ? ` · не хватает assets/img/${needLogos.join('.(svg|png), assets/img/')}.(svg|png)` : '')
);
