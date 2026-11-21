/* Карточки для соцсетей: assets/img/og-<язык>.png, 1200×630.

   Текст берется из содержания сайта (имя, заголовок обложки), снимок — тот
   же, что стоит на обложке. Своих формулировок у карточки нет, поэтому она
   не может разойтись с сайтом.

   Нужен Playwright с Chromium, в обычную сборку он не входит:
     node tools/genog.mjs
   Путь к Playwright можно задать переменной PLAYWRIGHT_PATH. */

import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { ru, en, pt } from '../src/content.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const root = resolve('.');
const url = (p) => pathToFileURL(join(root, p)).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const card = (t) => `<!doctype html><html lang="${t.htmlLang}"><meta charset="utf-8"><style>
@font-face{font-family:Onest;font-weight:300 800;src:url('${url('assets/fonts/onest-cyrillic-300800-normal.woff2')}') format('woff2');unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}
@font-face{font-family:Onest;font-weight:300 800;src:url('${url('assets/fonts/onest-latin-300800-normal.woff2')}') format('woff2');unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:Plex;font-weight:500;src:url('${url('assets/fonts/ibm-plex-mono-cyrillic-500-normal.woff2')}') format('woff2');unicode-range:U+0400-045F}
@font-face{font-family:Plex;font-weight:500;src:url('${url('assets/fonts/ibm-plex-mono-latin-500-normal.woff2')}') format('woff2');unicode-range:U+0000-00FF}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#f4f5f6;color:#12151a;font-family:Onest,Arial,sans-serif;display:grid;grid-template-columns:1fr 480px;overflow:hidden}
.t{padding:72px 56px 72px 80px;display:flex;flex-direction:column}
.m{width:50px;height:50px;border:2px solid #1e4bad;color:#1e4bad;font-weight:800;font-size:20px;display:grid;place-items:center}
.r{width:112px;height:3px;background:#1e4bad;margin-top:auto}
.e{font-family:Plex,monospace;font-weight:500;font-size:17px;letter-spacing:.2em;text-transform:uppercase;color:#454b55;margin-top:20px}
h1{font-size:50px;line-height:1.08;font-weight:600;letter-spacing:-.02em;margin-top:22px;text-wrap:balance}
em{font-style:normal;font-weight:700;color:#1e4bad}
/* Фигура вырезана по контуру и стоит на сером блоке, как на обложке сайта */
.p{position:relative;align-self:end;justify-self:end;margin-right:64px;height:596px;aspect-ratio:1000/1444}
.p::before{content:'';position:absolute;inset:46% 0 0 0;background:#e9ebee}
img{position:absolute;inset:0;width:100%;height:100%;display:block}
</style><body><div class="t"><div class="m">ES</div><div class="r"></div><p class="e">${esc(t.hero.eyebrow)}</p><h1>${esc(t.hero.lead)} <em>${esc(t.hero.leadEm)}</em>${t.hero.leadTail ? ' ' + esc(t.hero.leadTail) : ''}</h1></div><div class="p"><img src="${url('assets/img/portrait.webp')}" alt=""></div></body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const t of [ru, en, pt]) {
  const file = join(dir, `${t.lang}.html`);
  writeFileSync(file, card(t));
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `assets/img/og-${t.lang}.png` });
  console.log(`assets/img/og-${t.lang}.png`);
}
await browser.close();
