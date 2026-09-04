import { shared } from './content.mjs';
import { mapMeta } from './map.generated.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const list = (items) => items.map((b) => `<li>${esc(b)}</li>`).join('');

const arrow = '<svg class="btn__arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.2"/></svg>';

let R = '';                                   // префикс до корня сайта
let ICONS = {};
let BACKDROPS = new Set();
let MAP = 'map-base.svg';
/* Фоновый снимок появляется, только если файл действительно лежит в assets/img */
const art = (id) => {
  const f = [...BACKDROPS].find((n) => n.startsWith('bg-' + id + '.'));
  return f ? ` band--art" style="--bg:url(${R}assets/img/${f})` : '';
};
const icon = (name) =>
  ICONS[name] ? `<svg class="ico" viewBox="0 0 256 256" aria-hidden="true" focusable="false">${ICONS[name]}</svg>` : '';
const flag = (code, eager) =>
  `<img class="flag" src="${R}assets/flags/${attr(code)}.svg" alt="" width="27" height="20"${eager ? '' : ' loading="lazy"'} decoding="async">`;

const aside = (n, kicker) =>
  `<div class="aside"><span class="aside__k reveal">${esc(kicker)}</span></div>`;

/* --- шапка и меню --------------------------------------- */

function header(t, base) {
  const nav = t.nav.map((i) => `<a href="${attr(i.href)}" data-nav>${esc(i.label)}</a>`).join('');
  const drawer = t.nav
    .map((i) => `<a href="${attr(i.href)}" data-drawer-link>${esc(i.label)}</a>`)
    .join('');
  return `<header class="hdr" data-hdr>
  <div class="shell hdr__in">
    <a class="brand" href="${attr(base)}" aria-label="${attr(t.hero.name)}"><span class="brand__mark">ES</span></a>
    <nav class="hdr__nav" aria-label="${attr(t.footer.navTitle)}">${nav}</nav>
    <div class="hdr__side">
      <a class="lang" href="${attr(t.altHref)}" hreflang="${attr(t.altLang)}" lang="${attr(t.altLang)}">${esc(t.altLang.toUpperCase())}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${attr(t.menu)}" data-burger><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" data-drawer data-open="false">${drawer}</div>`;
}

/* --- обложка -------------------------------------------- */

function hero(t, hasPortrait) {
  const h = t.hero;
  return `<section class="hero">
  <div class="shell">
    <div class="hero__grid" data-hero-grid${hasPortrait ? '' : ' data-noportrait="true"'}>
      <div>
        <p class="label hero__eyebrow reveal"><span>${esc(h.eyebrow)}</span></p>
        <h1 class="hero__h1 reveal">${esc(h.lead)} <em>${esc(h.leadEm)}</em>${h.leadTail ? ' ' + esc(h.leadTail) : ''}</h1>
        <div class="prose reveal"><p class="lede">${esc(h.para)}</p></div>
        <div class="hero__cta reveal">
          <a class="btn" href="#contact">${esc(h.ctaPrimary)}${arrow}</a>
          <a class="btn btn--ghost" href="#work">${esc(h.ctaSecondary)}</a>
        </div>
      </div>
      ${hasPortrait ? `<div class="hero__media">
        <figure class="portrait" data-portrait>
          <img src="${R}assets/img/portrait.jpg" alt="${attr(h.portraitAlt)}" width="800" height="1000" fetchpriority="high">
          <figcaption class="portrait__cap">${esc(h.name)}</figcaption>
        </figure>
      </div>` : ''}
    </div>
  </div>
</section>`;
}


/* --- проекты -------------------------------------------- */

function work(t, images) {
  const s = t.work;
  const items = s.items
    .map(
      /* Карточка проекта появляется по частям, а не целиком. Она высотой
         почти в экран, и при подъеме одним куском анимировалась только
         верхняя кромка: к середине блок был уже собран, и читатель видел
         готовый текст. Теперь заголовок, перечень и цифры выходят каждый
         в свой момент, так что движение сопровождает чтение до конца
         карточки. Колонка слева закреплена липко, поэтому сдвиг отдан ее
         содержимому, а не ей самой. */
      (p) => `<article class="proj">
        <div class="proj__grid">
          <div class="proj__meta">
            <p class="proj__date reveal">${esc(p.meta)}</p>
            <p class="proj__role reveal">${esc(p.role)}</p>
          </div>
          <div>
            <div class="proj__t reveal"><h3 class="h3">${esc(p.t)}</h3></div>
            <p class="proj__sub reveal">${esc(p.sub)}</p>
            <p class="proj__d reveal">${esc(p.d)}</p>
            ${p.img && images.has(p.img) ? `<figure class="shot reveal"><img src="${R}assets/img/${attr(p.img)}" alt="${attr(p.imgAlt)}" loading="lazy" decoding="async"><figcaption>${esc(p.imgAlt)}</figcaption></figure>` : ''}
            <ul class="rules-list reveal">${list(p.b)}</ul>
            <div class="metrics reveal">${p.m
              .map((m) => `<div class="metric"><span class="metric__v num" data-count="${attr(m.v)}">${esc(m.v)}</span><span class="metric__l">${esc(m.l)}</span></div>`)
              .join('')}</div>
          </div>
        </div>
      </article>`
    )
    .join('');
  return `<section class="band band--sunk${art('work')}" id="work">
  <div class="shell">
    <div class="grid2" style="margin-bottom:clamp(2rem,4vw,3rem)">
      ${aside(s.n, s.kicker)}
      <h2 class="h2 reveal">${esc(s.title)}</h2>
    </div>
    ${items}
  </div>
</section>`;
}

/* --- направления ---------------------------------------- */

function practice(t) {
  const s = t.practice;
  const rows = s.items
    .map(
      (it, i) => `<div class="practice__row reveal">
        <span class="practice__n">${icon(it.icon)}</span>
        <div>
          <h3 class="h3">${esc(it.t)}</h3>
          <p class="practice__d">${esc(it.d)}</p>
        </div>
        <div class="practice__tags"><ul class="rules-list rules-list--sm">${list(it.b)}</ul></div>
      </div>`
    )
    .join('');
  return `<section class="band" id="practice">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 reveal">${esc(s.title)}</h2>
        <p class="lede reveal" style="margin-top:1.25rem;max-width:52ch">${esc(s.intro)}</p>
        <div class="practice" style="margin-top:clamp(2rem,4vw,3rem)">${rows}</div>
      </div>
    </div>
  </div>
</section>`;
}

/* --- география ------------------------------------------ */

function geo(t) {
  const s = t.geo;
  const byKey = new Map(mapMeta.marks.map((m) => [m.key, m]));

  /* Вместо номерных меток — подпись страны, которая всплывает при наведении.
     Нумерация заставляла сверять карту со списком и выглядела как сноски. */
  /* У крупной страны подпись ложится на нее, у мелкой встает над контуром:
     иначе плашка полностью накрывает то, что называет. */
  const bbox = (d) => {
    const pts = [...d.matchAll(/(-?[0-9.]+) (-?[0-9.]+)/g)];
    if (!pts.length) return null;
    const xs = pts.map((m) => +m[1]), ys = pts.map((m) => +m[2]);
    return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
  };
  const tags = s.items
    .map((it, i) => {
      const m = byKey.get(it.key);
      if (!m) return '';
      const bb = bbox(m.d);
      const small = bb && (bb.x1 - bb.x0 < 70 || bb.y1 - bb.y0 < 45);
      const top = small ? (bb.y0 / mapMeta.h) * 100 : m.centre[1];
      return `<span class="tag${small ? ' tag--above' : ''}" data-i="${i}" style="left:${m.centre[0]}%;top:${top.toFixed(2)}%" aria-hidden="true">${esc(it.name)}</span>`;
    })
    .join('');

  const defs = s.items
    .map((it, i) => {
      const m = byKey.get(it.key);
      return m ? `<path id="c${i}" d="${m.d}"/>` : '';
    })
    .join('');
  /* Мелкие страны рисуются последними, то есть поверх крупных. Иначе
     поднятый курсором Узбекистан уходил под Казахстан, который стоял в
     разметке ниже. Порядок в списке от этого не зависит: он хранится
     в data-i, а не в положении элемента. */
  const bboxArea = (d) => {
    const pts = [...d.matchAll(/(-?[0-9.]+) (-?[0-9.]+)/g)];
    if (!pts.length) return 0;
    const xs = pts.map((m) => +m[1]), ys = pts.map((m) => +m[2]);
    return (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
  };
  const groups = s.items
    .map((it, i) => ({ it, i, area: byKey.has(it.key) ? bboxArea(byKey.get(it.key).d) : 0 }))
    .sort((a, b) => b.area - a.area)
    .map(
      ({ it, i }) =>
        `<g class="cg" data-i="${i}"><g class="ctry"><use class="ctry-edge" href="#c${i}"/><use class="ctry-fill" href="#c${i}"/></g><use class="ctry-hit" href="#c${i}"><title>${esc(it.name)}</title></use></g>`
    )
    .join('');

  const rows = s.items
    .map(
      (it, i) => `<li class="geo__row reveal" data-i="${i}">${flag(it.flag)}<span class="geo__name">${esc(it.name)}</span></li>`
    )
    .join('');

  return `<section class="band${art('geo')}" id="geo">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 reveal">${esc(s.title)}</h2>
        <p class="lede reveal" style="margin-top:1.25rem;max-width:54ch">${esc(s.intro)}</p>
      </div>
    </div>
    <figure class="map map--bleed reveal">
      <div class="map__scroll">
        <div class="map__frame" style="--ar:${(1 / mapMeta.ratio).toFixed(4)}">
          <img src="${R}assets/${MAP}" alt="" width="${mapMeta.w}" height="${mapMeta.h}" loading="lazy" decoding="async">
          <svg class="map__hot" viewBox="0 0 ${mapMeta.w} ${mapMeta.h}" focusable="false">
            <defs>${defs}</defs>
            ${groups}
          </svg>
          ${tags}
        </div>
      </div>
    </figure>
    <ol class="geo geo--wide" data-geo>${rows}</ol>
  </div>
</section>`;
}

/* --- в работе сейчас ------------------------------------ */

function current(t) {
  const s = t.current;
  const rows = s.items
    .map(
      (c) => `<div class="current__row reveal">
        <div>
          <h3 class="h3">${esc(c.t)}</h3>
          <p class="current__meta">${esc(c.meta)}</p>
        </div>
        <p class="current__d">${esc(c.d)}</p>
      </div>`
    )
    .join('');
  return `<section class="band band--sunk${art('current')}" id="current">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 reveal">${esc(s.title)}</h2>
        <p class="lede reveal" style="margin-top:1.25rem;max-width:52ch">${esc(s.intro)}</p>
        <div class="current" style="margin-top:clamp(2rem,4vw,3rem)">${rows}</div>
      </div>
    </div>
  </div>
</section>`;
}

/* --- о себе: текст, языки, образование ------------------ */

function about(t, logos) {
  const s = t.about;
  const paras = s.paras.map((p) => `<p>${esc(p)}</p>`).join('');

  const stats = t.figures.items
    .map(
      (f) => `<div class="stat reveal">
        <span class="stat__v num" data-count="${attr(f.value)}">${esc(f.value)}</span>
        <span class="stat__u">${esc(f.unit)}</span>
        <p class="stat__l">${esc(f.label)}</p>
      </div>`
    )
    .join('');

  const langs = s.langs
    .map(
      (l) => `<div class="lng reveal">
        ${flag(l.flag, true)}
        <p class="lng__name">${esc(l.l)}</p>
        <p class="lng__cap">${esc(l.cap)}</p>
        <span class="meter" aria-hidden="true">${[1, 2, 3, 4].map((n) => `<i${n <= l.lvl ? ' class="on"' : ''}></i>`).join('')}</span>
      </div>`
    )
    .join('');

  const edu = s.edu
    .map(
      (e) => `<div class="edu reveal">
        <div class="edu__org">
          ${e.logo && logos.get(e.logo) ? `<img class="edu__logo" src="${R}assets/img/${attr(logos.get(e.logo))}" alt="" width="88" height="54" loading="lazy" decoding="async">` : ''}
          <p class="edu__name">${esc(e.org)}</p>
        </div>
        <ul class="edu__tracks">${e.tracks
          .map(
            (k) =>
              `<li><span class="edu__period num">${esc(k.period)}</span><span class="edu__role">${esc(k.role)}${k.note ? `<span class="edu__note">${esc(k.note)}</span>` : ''}</span></li>`
          )
          .join('')}</ul>
      </div>`
    )
    .join('');

  return `<section class="band band--sunk${art('about')}" id="about">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 reveal">${esc(s.title)}</h2>
        <div class="prose reveal" style="margin-top:clamp(1.5rem,3vw,2.5rem)">${paras}</div>
      </div>
    </div>
    <div class="stats">${stats}</div>
    <p class="subhead subhead--wide">${esc(s.langTitle)}</p>
    <div class="lngs">${langs}</div>
    <p class="subhead subhead--wide">${esc(s.eduTitle)}</p>
    <div class="edus">${edu}</div>
  </div>
</section>`;
}

/* --- контакты ------------------------------------------- */

function contact(t) {
  const s = t.contact;
  return `<section class="band contact${art('contact')}" id="contact">
  <div class="shell">
    <p class="contact__kicker reveal">${esc(s.kicker)}</p>
    <h2 class="contact__h reveal">${esc(s.title)}</h2>
    <p class="lede contact__lede reveal">${esc(s.d)}</p>
    <div class="cards reveal">
      <a class="card" href="${attr(shared.telegramHref)}" target="_blank" rel="noopener noreferrer">
        <span class="card__top">${icon('telegram-logo')}<span class="card__k">${esc(s.tgLabel)}</span></span>
        <span class="card__v">${esc(shared.telegram)}</span>
      </a>
      <a class="card" href="mailto:${attr(shared.email)}">
        <span class="card__top">${icon('envelope-simple')}<span class="card__k">${esc(s.emailLabel)}</span></span>
        <span class="card__v">${esc(shared.email)}</span>
      </a>
    </div>
  </div>
</section>`;
}

/* --- подвал --------------------------------------------- */

function footer(t) {
  const nav = t.nav.map((i) => `<li><a href="${attr(i.href)}">${esc(i.label)}</a></li>`).join('');
  return `<footer class="ftr">
  <div class="shell">
    <div class="ftr__grid">
      <div>
        <p class="ftr__mark">${esc(t.hero.name)}</p>
        <p class="ftr__sub">${esc(t.footer.tagline)}</p>
      </div>
      <div>
        <p class="ftr__t">${esc(t.footer.navTitle)}</p>
        <ul>${nav}</ul>
      </div>
      <div>
        <p class="ftr__t">${esc(t.footer.contactTitle)}</p>
        <ul>
          <li><a href="${attr(shared.telegramHref)}" target="_blank" rel="noopener noreferrer">${esc(shared.telegram)}</a></li>
          <li><a href="mailto:${attr(shared.email)}">${esc(shared.email)}</a></li>
          <li><a href="${attr(t.altHref)}" hreflang="${attr(t.altLang)}">${esc(t.altLabel)}</a></li>
        </ul>
      </div>
    </div>
    <div class="ftr__base">
      <span>© ${esc(shared.years)} ${esc(t.footer.rights)}</span>
      <span class="num">${esc(shared.domain.replace('https://', ''))}</span>
    </div>
  </div>
</footer>`;
}

/* --- микроразметка -------------------------------------- */

function jsonLd(t) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.hero.name,
    description: t.description,
    url: shared.domain + (t.lang === 'en' ? '/en/' : '/'),
    email: 'mailto:' + shared.email,
    knowsLanguage: t.about.langs.map((l) => l.l),
    alumniOf: { '@type': 'CollegeOrUniversity', name: t.about.edu[0].org },
    sameAs: [shared.telegramHref],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/* --- страница целиком ----------------------------------- */

export function page(t, { hasPortrait = false, images = new Set(), logos = new Map(), icons = {}, backdrops = new Set(), cssName = 'styles.css', jsName = 'app.js', fontsName = 'fonts.css', mapName = 'map-base.svg' } = {}) {
  const canonical = shared.domain + (t.lang === 'en' ? '/en/' : '/');
  R = t.lang === 'en' ? '../' : '';
  ICONS = icons;
  BACKDROPS = backdrops;
  MAP = mapName;
  /* Ссылка на себя ведет в текущий каталог: адрес остается без index.html */
  const base = './';
  const pre = t.lang === 'en' ? 'latin' : 'cyrillic';

  return `<!doctype html>
<html lang="${attr(t.lang)}" dir="${attr(t.dir)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Метка сборки: по ней сразу видно, какая версия реально лежит на сервере -->
<meta name="build" content="${attr(cssName)} ${attr(mapName)}">
<title>${esc(t.title)}</title>
<meta name="description" content="${attr(t.description)}">
<meta name="author" content="${attr(t.hero.name)}">
<link rel="canonical" href="${attr(canonical)}">
<link rel="alternate" hreflang="ru" href="${attr(shared.domain)}/">
<link rel="alternate" hreflang="en" href="${attr(shared.domain)}/en/">
<link rel="alternate" hreflang="x-default" href="${attr(shared.domain)}/">
<meta property="og:type" content="profile">
<meta property="og:title" content="${attr(t.title)}">
<meta property="og:description" content="${attr(t.description)}">
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:locale" content="${attr(t.ogLocale)}">
<meta property="og:site_name" content="${attr(t.hero.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f4f5f6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0e1116" media="(prefers-color-scheme: dark)">
<!-- ico идет первым: его Chrome запрашивает сам, даже без этой строки,
     и на нем держится закладка. SVG подхватывают браузеры, которые умеют,
     он один остается четким на любом экране. -->
<link rel="icon" href="${R}favicon.ico" sizes="48x48">
<link rel="icon" href="${R}favicon.svg" type="image/svg+xml" sizes="any">
<link rel="apple-touch-icon" href="${R}apple-touch-icon.png">
<link rel="preload" href="${R}assets/fonts/onest-${pre}-300800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/${fontsName}">
<link rel="stylesheet" href="${R}assets/${cssName}">
${jsonLd(t)}
<!-- Появление блоков при прокрутке включается только здесь. Без этой
     строки (скрипт запрещен, ошибка загрузки) текст остается видимым. -->
<script>document.documentElement.setAttribute('data-js','')</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, base)}
<main id="main">
${hero(t, hasPortrait)}
${about(t, logos)}
${practice(t)}
${work(t, images)}
${geo(t)}
${current(t)}
${contact(t)}
</main>
${footer(t)}
<script src="${R}assets/${jsName}" defer></script>
</body>
</html>`;
}
