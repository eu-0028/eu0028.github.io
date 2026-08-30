/* e-shutov.ru — поведение интерфейса. Без зависимостей. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Линейка под шапкой появляется при прокрутке ------- */
  var hdr = document.querySelector('[data-hdr]');
  if (hdr) {
    var onScroll = function () {
      hdr.setAttribute('data-stuck', window.scrollY > 8 ? 'true' : 'false');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Мобильное меню ------------------------------------ */
  var burger = document.querySelector('[data-burger]');
  var drawer = document.querySelector('[data-drawer]');
  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('data-open', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-drawer-link]')) setDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setDrawer(false);
        burger.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 880) setDrawer(false);
    });
  }

  /* --- Появление блоков при прокрутке -------------------- */
  var rises = document.querySelectorAll('.rise');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(rises, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(rises, function (el) { io.observe(el); });
  }

  /* --- Подсветка активного пункта навигации -------------- */
  var links = document.querySelectorAll('[data-nav]');
  var sections = [];
  Array.prototype.forEach.call(links, function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) sections.push({ el: el, link: a });
  });
  if (sections.length && 'IntersectionObserver' in window) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var active = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].el.id]) { active = sections[i]; break; }
      }
      sections.forEach(function (s) {
        if (active && s === active) s.link.setAttribute('aria-current', 'true');
        else s.link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* --- Портрет: аккуратная заглушка, если файла нет ------ */
  var portrait = document.querySelector('[data-portrait]');
  if (portrait) {
    var img = portrait.querySelector('img');
    var grid = document.querySelector('[data-hero-grid]');
    var markEmpty = function () {
      portrait.setAttribute('data-empty', 'true');
      if (grid) grid.setAttribute('data-noportrait', 'true');
    };
    if (img) {
      if (img.complete && img.naturalWidth === 0) markEmpty();
      img.addEventListener('error', markEmpty);
    }
  }
})();
