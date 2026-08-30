import { shared } from './content.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const list = (items) => items.map((b) => `<li>${esc(b)}</li>`).join('');

const arrow = '<svg class="btn__arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.2"/></svg>';

/* --- шапка и меню --------------------------------------- */

function header(t, base) {
  const nav = t.nav.map((i) => `<a href="${attr(i.href)}" data-nav>${esc(i.label)}</a>`).join('');
  const drawer = t.nav
    .map((i) => `<a href="${attr(i.href)}" data-drawer-link><span>${esc(i.n)}</span><span>${esc(i.label)}</span></a>`)
    .join('');
  return `<header class="hdr" data-hdr>
  <div class="shell hdr__in">
    <a class="brand" href="${attr(base)}">${esc(t.brand)}</a>
    <nav class="hdr__nav" aria-label="${attr(t.nav_aria || t.footer.navTitle)}">${nav}</nav>
    <div class="hdr__side">
      <a class="lang" href="${attr(t.altHref)}" hreflang="${attr(t.altLang)}" lang="${attr(t.altLang)}">${esc(t.altLang.toUpperCase())}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${attr(t.menu)}" data-burger><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" data-drawer data-open="false">${drawer}</div>`;
}

/* --- обложка -------------------------------------------- */

function hero(t, hasCv) {
  const h = t.hero;
  const cv = hasCv
    ? `<a class="btn btn--ghost" href="/assets/shutov-cv.pdf" download>${esc(t.cvLabel)}</a>`
    : '';
  return `<section class="hero">
  <div class="shell">
    <div class="hero__grid" data-hero-grid>
      <div>
        <p class="label hero__eyebrow"><span>${esc(h.eyebrow)}</span></p>
        <p class="hero__name">${esc(h.name)}</p>
        <h1 class="hero__h1">${esc(h.lead)} <em>${esc(h.leadEm)}</em> ${esc(h.leadTail)}</h1>
        <div class="prose"><p class="lede">${esc(h.para)}</p></div>
        <div class="hero__cta">
          <a class="btn" href="#contact">${esc(h.ctaPrimary)}${arrow}</a>
          <a class="btn btn--ghost" href="#work">${esc(h.ctaSecondary)}</a>
          ${cv}
        </div>
        <p class="hero__role">${esc(h.role)}</p>
      </div>
      <div class="hero__media">
        <figure class="portrait" data-portrait>
          <img src="/assets/img/portrait.jpg" alt="${attr(h.portraitAlt)}" width="800" height="1000" fetchpriority="high">
          <span class="portrait__fallback" aria-hidden="true">${esc(h.name.split(' ').map((w) => w[0]).join(''))}</span>
          <figcaption class="portrait__cap">${esc(h.name)}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>`;
}

/* --- полоса цифр ---------------------------------------- */

function figures(t) {
  const items = t.figures.items
    .map(
      (f) => `<div class="figure rise">
        <span class="figure__v num">${esc(f.value)}</span>
        <span class="figure__u">${esc(f.unit)}</span>
        <p class="figure__l">${esc(f.label)}</p>
      </div>`
    )
    .join('');
  return `<section class="band band--sunk" aria-label="${attr(t.figures.eyebrow)}">
  <div class="shell"><div class="figures">${items}</div></div>
</section>`;
}

/* --- заголовок раздела ---------------------------------- */

const aside = (n, kicker) =>
  `<div class="aside"><span class="aside__n">${esc(n)}</span><span class="aside__k">${esc(kicker)}</span></div>`;

/* --- профиль -------------------------------------------- */

function profile(t) {
  const s = t.profile;
  const paras = s.paras.map((p) => `<p>${esc(p)}</p>`).join('');
  const facts = s.facts
    .map((f) => `<div class="fact"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`)
    .join('');
  return `<section class="band band--ruled" id="profile">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 rise">${esc(s.title)}</h2>
        <div class="prose rise" style="margin-top:clamp(1.5rem,3vw,2.5rem)">${paras}</div>
        <dl class="facts rise">${facts}</dl>
      </div>
    </div>
  </div>
</section>`;
}

/* --- компетенции ---------------------------------------- */

function practice(t) {
  const s = t.practice;
  const rows = s.items
    .map(
      (it, i) => `<div class="practice__row rise">
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
        <h2 class="h2 rise">${esc(s.title)}</h2>
        <p class="lede rise" style="margin-top:1.25rem;max-width:52ch">${esc(s.intro)}</p>
        <div class="practice" style="margin-top:clamp(2rem,4vw,3rem)">${rows}</div>
      </div>
    </div>
  </div>
</section>`;
}

/* --- проекты -------------------------------------------- */

function work(t, images) {
  const s = t.work;
  const items = s.items
    .map(
      (p) => `<article class="proj rise">
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
              .map((m) => `<div class="metric"><span class="metric__v num">${esc(m.v)}</span><span class="metric__l">${esc(m.l)}</span></div>`)
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
      <h2 class="h2 rise">${esc(s.title)}</h2>
    </div>
    ${items}
  </div>
</section>`;
}

/* --- текущее -------------------------------------------- */

function current(t) {
  const s = t.current;
  const rows = s.items
    .map(
      (c) => `<div class="current__row rise">
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
        <h2 class="h2 rise">${esc(s.title)}</h2>
        <p class="lede rise" style="margin-top:1.25rem;max-width:52ch">${esc(s.intro)}</p>
        <div class="current" style="margin-top:clamp(2rem,4vw,3rem)">${rows}</div>
      </div>
    </div>
  </div>
</section>`;
}

/* --- хронология ----------------------------------------- */

function career(t) {
  const s = t.career;
  const jobs = s.jobs
    .map(
      (j) => `<div class="tl__item rise">
        <p class="tl__period">${esc(j.period)}</p>
        <p class="tl__org">${esc(j.org)}</p>
        <p class="tl__role">${esc(j.role)}</p>
        ${j.sub ? `<p class="tl__note">${esc(j.sub)}</p>` : ''}
        <p class="tl__note">${esc(j.note)}</p>
        <div class="tl__body"><ul class="rules-list">${list(j.b)}</ul></div>
      </div>`
    )
    .join('');
  const edu = s.edu
    .map(
      (e) => `<div class="tl__item rise">
        <p class="tl__period">${esc(e.period)}</p>
        <p class="tl__org">${esc(e.org)}</p>
        <p class="tl__role">${esc(e.role)}</p>
        <p class="tl__note">${esc(e.d)}</p>
      </div>`
    )
    .join('');
  const langs = s.langs
    .map((l) => `<div><dt>${esc(l.l)}</dt><dd>${esc(l.v)}</dd></div>`)
    .join('');
  const skills = s.skills
    .map((k) => `<div><dt>${esc(k.k)}</dt><dd>${esc(k.v)}</dd></div>`)
    .join('');
  return `<section class="band band--ruled" id="career">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="h2 rise" style="margin-bottom:clamp(2rem,4vw,3rem)">${esc(s.title)}</h2>
        <p class="subhead">${esc(s.jobsTitle)}</p>
        <div class="tl">${jobs}</div>
        <p class="subhead" style="margin-top:clamp(3rem,6vw,4.5rem)">${esc(s.eduTitle)}</p>
        <div class="tl">${edu}</div>
        <div class="split">
          <div>
            <p class="subhead">${esc(s.langTitle)}</p>
            <dl class="deflist rise">${langs}</dl>
          </div>
          <div>
            <p class="subhead">${esc(s.skillTitle)}</p>
            <dl class="deflist rise">${skills}</dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* --- контакты ------------------------------------------- */

function contact(t) {
  const s = t.contact;
  return `<section class="band band--sunk" id="contact">
  <div class="shell">
    <div class="grid2">
      ${aside(s.n, s.kicker)}
      <div>
        <h2 class="contact__h rise">${esc(s.title)}</h2>
        <p class="lede rise" style="margin-top:1.5rem;max-width:48ch">${esc(s.d)}</p>
        <dl class="contact__rows rise">
          <div class="crow"><dt>${esc(s.emailLabel)}</dt><dd><a href="mailto:${attr(shared.email)}">${esc(shared.email)}</a></dd></div>
          <div class="crow"><dt>${esc(s.phoneLabel)}</dt><dd><a href="tel:${attr(shared.phoneHref)}" class="num">${esc(shared.phone)}</a></dd></div>
          <div class="crow"><dt>${esc(s.tgLabel)}</dt><dd><a href="${attr(shared.telegramHref)}" rel="noopener">${esc(shared.telegram)}</a></dd></div>
          <div class="crow"><dt>${esc(s.cityLabel)}</dt><dd><span>${esc(s.city)}</span></dd></div>
        </dl>
        <p class="note rise">${esc(s.note)}</p>
      </div>
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
        <p class="ftr__sub">${esc(t.hero.role)}</p>
      </div>
      <div>
        <p class="ftr__t">${esc(t.footer.navTitle)}</p>
        <ul>${nav}</ul>
      </div>
      <div>
        <p class="ftr__t">${esc(t.footer.contactTitle)}</p>
        <ul>
          <li><a href="mailto:${attr(shared.email)}">${esc(shared.email)}</a></li>
          <li><a href="tel:${attr(shared.phoneHref)}" class="num">${esc(shared.phone)}</a></li>
          <li><a href="${attr(shared.telegramHref)}" rel="noopener">${esc(shared.telegram)}</a></li>
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
    jobTitle: t.hero.role.split('·')[0].trim(),
    description: t.description,
    url: shared.domain + (t.lang === 'en' ? '/en/' : '/'),
    email: 'mailto:' + shared.email,
    telephone: shared.phone,
    address: { '@type': 'PostalAddress', addressLocality: t.contact.city },
    knowsLanguage: t.career.langs.map((l) => l.l),
    alumniOf: { '@type': 'CollegeOrUniversity', name: t.career.edu[1].org },
    worksFor: { '@type': 'Organization', name: 'Consult Invest ITIC' },
    sameAs: [shared.telegramHref],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/* --- страница целиком ----------------------------------- */

export function page(t, { hasCv = false, images = new Set() } = {}) {
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
<meta name="theme-color" content="#faf8f4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14150f" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/source-serif-4-${pre}-300700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/ibm-plex-sans-${pre}-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts.css">
<link rel="stylesheet" href="/assets/styles.css">
${jsonLd(t)}
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, base)}
<main id="main">
${hero(t, hasCv)}
${figures(t)}
${profile(t)}
${practice(t)}
${work(t, images)}
${current(t)}
${career(t)}
${contact(t)}
</main>
${footer(t)}
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}
