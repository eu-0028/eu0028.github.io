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

  /* --- Запуск анимаций, привязанных к смыслу ------------- */
  function runOnce(selector, cb) {
    var el = document.querySelector(selector);
    if (!el) return;
    if (reduced || !('IntersectionObserver' in window)) { cb(el); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cb(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    io.observe(el);
  }

  /* Полосы занятости растут слева направо: это ось времени */
  runOnce('.tl', function (el) { el.classList.add('is-run'); });

  /* Метки на карте появляются по очереди, ведя взгляд по географии */
  runOnce('.map', function (el) { el.classList.add('is-run'); });

  /* Цифры отсчитываются, чтобы читатель их действительно прочитал */
  var counters = document.querySelectorAll('[data-count]');
  Array.prototype.forEach.call(counters, function (node) {
    var target = parseInt(node.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    if (reduced || !('IntersectionObserver' in window)) return;
    node.textContent = '0';
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var t0 = null, dur = 900;
        var step = function (ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          node.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    io.observe(node);
  });

  /* --- Карта: на узком экране открываем на странах проектов -- */
  var mapScroll = document.querySelector('.map__scroll');
  if (mapScroll) {
    var centreMap = function () {
      var extra = mapScroll.scrollWidth - mapScroll.clientWidth;
      if (extra > 0) mapScroll.scrollLeft = mapScroll.scrollWidth * 0.48 - mapScroll.clientWidth / 2;
    };
    centreMap();
    window.addEventListener('load', centreMap);
  }

  /* --- Карта: подсветка метки при наведении на страну ---- */
  var geoList = document.querySelector('[data-geo]');
  if (geoList) {
    var pins = document.querySelectorAll('.pin');
    var setHot = function (i, on) {
      var pin = pins[i];
      if (pin) pin.classList.toggle('is-hot', on);
      var row = geoList.querySelector('[data-i="' + i + '"]');
      if (row) row.classList.toggle('is-hot', on);
    };
    var bind = function (el) {
      var i = el.getAttribute('data-i');
      el.addEventListener('mouseenter', function () { setHot(i, true); });
      el.addEventListener('mouseleave', function () { setHot(i, false); });
    };
    Array.prototype.forEach.call(geoList.querySelectorAll('[data-i]'), bind);
    Array.prototype.forEach.call(pins, bind);
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
