import { shared } from './content.mjs';
import { mapMeta } from './map.generated.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const list = (items) => items.map((b) => `<li>${esc(b)}</li>`).join('');

const arrow = '<svg class="btn__arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.2"/></svg>';

const flag = (code, eager) =>
  `<img class="flag" src="/assets/flags/${attr(code)}.svg" alt="" width="27" height="20"${eager ? '' : ' loading="lazy"'} decoding="async">`;

const aside = (n, kicker) =>
  `<div class="aside"><span class="aside__n">${esc(n)}</span><span class="aside__k">${esc(kicker)}</span></div>`;

/* --- шапка и меню --------------------------------------- */

function header(t, base) {
  const nav = t.nav.map((i) => `<a href="${attr(i.href)}" data-nav>${esc(i.label)}</a>`).join('');
  const drawer = t.nav
    .map((i) => `<a href="${attr(i.href)}" data-drawer-link><span>${esc(i.n)}</span><span>${esc(i.label)}</span></a>`)
    .join('');
  return `<header class="hdr" data-hdr>
  <div class="shell hdr__in">
    <a class="brand" href="${attr(base)}">${esc(t.brand)}</a>
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

function hero(t, hasCv, hasPortrait) {
  const h = t.hero;
  const cv = hasCv ? `<a class="btn btn--ghost" href="/assets/shutov-cv.pdf" download>${esc(t.cvLabel)}</a>` : '';
  return `<section class="hero">
  <div class="shell">
    <div class="hero__grid" data-hero-grid${hasPortrait ? '' : ' data-noportrait="true"'}>
      <div>
        <p class="label hero__eyebrow"><span>${esc(h.eyebrow)}</span></p>
        <h1 class="hero__h1">${esc(h.lead)} <em>${esc(h.leadEm)}</em>${h.leadTail ? ' ' + esc(h.leadTail) : ''}</h1>
        <div class="prose"><p class="lede">${esc(h.para)}</p></div>
        <div class="hero__cta">
          <a class="btn" href="#contact">${esc(h.ctaPrimary)}${arrow}</a>
          <a class="btn btn--ghost" href="#work">${esc(h.ctaSecondary)}</a>
          ${cv}
        </div>
      </div>
      ${hasPortrait ? `<div class="hero__media">
        <figure class="portrait" data-portrait>
          <img src="/assets/img/portrait.jpg" alt="${attr(h.portraitAlt)}" width="800" height="1000" fetchpriority="high">
          <figcaption class="portrait__cap">${esc(h.name)}</figcaption>
        </figure>
      </div>` : ''}
    </div>
  </div>
</section>`;
}

/* --- диаграмма занятости -------------------------------- */

const monthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

function timeline(s) {
  const from = monthIndex(s.timelineFrom);
  const to = monthIndex(s.timelineTo);
  const span = to - from + 1;
  const d = new Date();
  const now = Math.min(to, d.getFullYear() * 12 + d.getMonth());
  const pct = (n) => ((n / span) * 100).toFixed(3);

  const ticks = [];
  for (let i = from; i <= to; i++) if (i % 12 === 0) ticks.push({ year: i / 12, at: i - from });

  const grid =
    ticks.map((k) => `<span style="left:${pct(k.at)}%"></span>`).join('') +
    `<span class="tl__now" style="left:${pct(now - from + 1)}%"></span>`;
  const axis =
    ticks.map((k) => `<span class="tl__year num" style="left:${pct(k.at)}%">${k.year}</span>`).join('') +
    `<span class="tl__year tl__year--now" style="left:${pct(now - from + 1)}%">${esc(s.nowLabel)}</span>`;

  const rows = s.timeline
    .map((r, ri) => {
      const a = monthIndex(r.from) - from;
      const b = (r.to ? monthIndex(r.to) : now) - from + 1;
      const open = r.to ? '' : ' bar--open';
      const title = r.to ? '' : ` title="${attr(s.ongoing)}"`;
      return `<div class="tl__row">
        <span class="tl__label">${esc(r.t)}</span>
        <div class="tl__track">
          <span class="bar bar--${r.kind}${open}" style="left:${pct(a)}%;width:${pct(b - a)}%;--i:${ri}"${title}></span>
        </div>
      </div>`;
    })
    .join('');

  return `<div class="tl reveal">
    <p class="subhead">${esc(s.timelineTitle)}</p>
    <div class="tl__body">
      <div class="tl__grid" aria-hidden="true">${grid}</div>
      ${rows}
    </div>
    <div class="tl__row tl__row--axis" aria-hidden="true">
      <span class="tl__label"></span>
      <div class="tl__track">${axis}</div>
    </div>
    <p class="tl__legend">
      <span class="key key--role">${esc(s.legendRole)}</span>
      <span class="key key--project">${esc(s.legendProject)}</span>
      <span class="tl__note">${esc(s.timelineNote)}</span>
    </p>
  </div>`;
}

/* --- проекты -------------------------------------------- */

function work(t, images) {
  const s = t.work;
  const items = s.items
    .map(
      (p) => `<article class="proj reveal">
        <div class="proj__grid">
          <div class="proj__meta">
            <p class="proj__date">${esc(p.meta)}</p>
            <p class="proj__role">${esc(p.role)}</p>
          </div>
          <div>
            <div class="proj__t"><h3 class="h3">${esc(p.t)}</h3></div>
            <p class="proj__sub">${esc(p.sub)}</p>
            <p class="proj__d">${esc(p.d)}</p>
            ${p.img && images.has(p.img) ? `<figure class="shot"><img src="/assets/img/${attr(p.img)}" alt="${attr(p.imgAlt)}" loading="lazy" decoding="async"><figcaption>${esc(p.imgAlt)}</figcaption></figure>` : ''}
            <ul class="rules-list">${list(p.b)}</ul>
            <div class="metrics">${p.m
              .map((m) => `<div class="metric"><span class="metric__v num" data-count="${attr(m.v)}">${esc(m.v)}</span><span class="metric__l">${esc(m.l)}</span></div>`)
              .join('')}</div>
          </div>
        </div>
      </article>`
    )
    .join('');
  return `<section class="band band--sunk" id="work">
  <div class="shell">
    <div class="grid2" style="margin-bottom:clamp(2rem,4vw,3rem)">
      ${aside(s.n, s.kicker)}
      <h2 class="h2 reveal">${esc(s.title)}</h2>
    </div>
    ${timeline(s)}
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
        <span class="practice__n">${String(i + 1).padStart(2, '0')}</span>
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

  const pins = s.items
    .map((it, i) => {
      const m = byKey.get(it.key);
      if (!m) return '';
      return `<span class="pin" data-i="${i}" style="left:${m.centre[0]}%;top:${m.centre[1]}%;--i:${i}"><i>${String(i + 1).padStart(2, '0')}</i></span>`;
    })
    .join('');

  const rows = s.items
    .map(
      (it, i) => `<li class="geo__row reveal" data-i="${i}">
        <span class="geo__n">${String(i + 1).padStart(2, '0')}</span>
        ${flag(it.flag)}
        <div>
          <p class="geo__name">${esc(it.name)}</p>
          <p class="geo__note">${esc(it.note)}</p>
        </div>
      </li>`
    )
    .join('');

  return `<section class="band band--sunk" id="geo">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 reveal">${esc(s.title)}</h2>
        <p class="lede reveal" style="margin-top:1.25rem;max-width:54ch">${esc(s.intro)}</p>
      </div>
    </div>
    <figure class="map map--wide reveal">
      <div class="map__scroll">
        <div class="map__frame" style="--ar:${(1 / mapMeta.ratio).toFixed(4)}">
          <img src="/assets/map.svg" alt="" width="1200" height="${Math.round(1200 * mapMeta.ratio)}" loading="lazy" decoding="async">
          ${pins}
        </div>
      </div>
      <figcaption class="map__legend">
        <span class="key key--marked">${esc(s.legendMarked)}</span>
        <span class="key key--rest">${esc(s.legendRest)}</span>
      </figcaption>
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
  return `<section class="band" id="current">
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
          ${e.logo && logos.has(e.logo) ? `<img class="edu__logo" src="/assets/img/${attr(e.logo)}" alt="" width="44" height="44" loading="lazy">` : ''}
          <p class="edu__name">${esc(e.org)}</p>
        </div>
        <ul class="edu__tracks">${e.tracks
          .map((k) => `<li><span class="edu__period num">${esc(k.period)}</span><span class="edu__role">${esc(k.role)}</span></li>`)
          .join('')}</ul>
      </div>`
    )
    .join('');

  return `<section class="band band--sunk" id="about">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 reveal">${esc(s.title)}</h2>
        <div class="prose reveal" style="margin-top:clamp(1.5rem,3vw,2.5rem)">${paras}</div>
      </div>
    </div>
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
  return `<section class="band contact" id="contact">
  <div class="shell">
    <p class="label contact__kicker reveal"><span>${esc(s.n)}</span><span>${esc(s.kicker)}</span></p>
    <h2 class="contact__h reveal">${esc(s.title)}</h2>
    <div class="contact__grid">
      <p class="lede reveal">${esc(s.d)}</p>
      <dl class="contact__rows reveal">
        <div class="crow"><dt>${esc(s.tgLabel)}</dt><dd><a href="${attr(shared.telegramHref)}" rel="noopener">${esc(shared.telegram)}</a></dd></div>
        <div class="crow"><dt>${esc(s.emailLabel)}</dt><dd><a href="mailto:${attr(shared.email)}">${esc(shared.email)}</a></dd></div>
        <div class="crow"><dt>${esc(s.phoneLabel)}</dt><dd><a href="tel:${attr(shared.phoneHref)}" class="num">${esc(shared.phone)}</a></dd></div>
      </dl>
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
          <li><a href="${attr(shared.telegramHref)}" rel="noopener">${esc(shared.telegram)}</a></li>
          <li><a href="mailto:${attr(shared.email)}">${esc(shared.email)}</a></li>
          <li><a href="tel:${attr(shared.phoneHref)}" class="num">${esc(shared.phone)}</a></li>
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
    telephone: shared.phone,
    knowsLanguage: t.about.langs.map((l) => l.l),
    alumniOf: { '@type': 'CollegeOrUniversity', name: t.about.edu[0].org },
    sameAs: [shared.telegramHref],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/* --- страница целиком ----------------------------------- */

export function page(t, { hasCv = false, hasPortrait = false, images = new Set(), logos = new Set() } = {}) {
  const canonical = shared.domain + (t.lang === 'en' ? '/en/' : '/');
  const base = t.lang === 'en' ? '/en/' : '/';
  const pre = t.lang === 'en' ? 'latin' : 'cyrillic';

  return `<!doctype html>
<html lang="${attr(t.lang)}" dir="${attr(t.dir)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
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
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/onest-${pre}-300800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts.css">
<link rel="stylesheet" href="/assets/styles.css">
${jsonLd(t)}
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, base)}
<main id="main">
${hero(t, hasCv, hasPortrait)}
${work(t, images)}
${practice(t)}
${geo(t)}
${current(t)}
${about(t, logos)}
${contact(t)}
</main>
${footer(t)}
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}
