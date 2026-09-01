/* Сборка статического сайта. Запуск: node build.mjs */
import { mkdir, writeFile, copyFile, access, rm, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { ru, en, shared } from './src/content.mjs';
import { page } from './src/render.mjs';

const exists = async (p) => access(p, constants.F_OK).then(() => true, () => false);

const hasCv = await exists('assets/shutov-cv.pdf');

/* В вёрстку попадают только те фотографии, которые реально лежат в assets/img */
await mkdir('assets/img', { recursive: true });
const hasPortrait = await exists('assets/img/portrait.jpg');
const images = new Set(
  (await readdir('assets/img')).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
);

await mkdir('en', { recursive: true });
await mkdir('assets/img', { recursive: true });

await copyFile('src/styles.css', 'assets/styles.css');
await copyFile('src/app.js', 'assets/app.js');
await copyFile('src/favicon.svg', 'favicon.svg');

await writeFile('index.html', page(ru, { hasCv, hasPortrait, images }));
await writeFile('en/index.html', page(en, { hasCv, hasPortrait, images }));

/* 404 — уводим на главную, а не в пустоту */
await writeFile(
  '404.html',
  `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Страница не найдена — ${ru.hero.name}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/assets/styles.css">
</head><body>
<main id="main" class="band"><div class="shell">
<p class="label" style="margin-bottom:1.5rem">404</p>
<h1 class="h2">Такой страницы нет<br><span lang="en">This page does not exist</span></h1>
<p class="hero__cta"><a class="btn" href="/">На главную</a><a class="btn btn--ghost" href="/en/" lang="en">Home</a></p>
</div></main></body></html>`
);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${shared.domain}/</loc><lastmod>${today}</lastmod><priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${shared.domain}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${shared.domain}/en/"/>
  </url>
  <url><loc>${shared.domain}/en/</loc><lastmod>${today}</lastmod><priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${shared.domain}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${shared.domain}/en/"/>
  </url>
</urlset>`
);

await writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${shared.domain}/sitemap.xml\n`);

const fonts = (await readdir('assets/fonts')).length;
console.log(`Готово: index.html, en/index.html, 404.html, sitemap.xml, robots.txt`);
console.log(`Шрифтов: ${fonts} · Резюме PDF: ${hasCv ? 'подключено' : 'нет файла assets/shutov-cv.pdf — кнопка скрыта'}`);
console.log(`Портрет: ${hasPortrait ? 'подключён' : 'нет файла assets/img/portrait.jpg — блок скрыт'}`);
console.log(`Фотографии проектов: ${images.size ? [...images].join(', ') : 'нет — блоки с фото не выводятся'}`);
