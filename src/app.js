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
  var rises = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(rises, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    /* Порог нулевой: у высокого блока проценты его собственной высоты
       складываются в пол-экрана, и он появлялся уже прокрученным. Зона
       наблюдения чуть выше нижнего края: подъем начинается, когда блок
       уже в кадре, и читатель видит его целиком, а не хвост. Выносить
       зону за кромку пробовали, чтобы заголовок не отставал от метки
       раздела, но метка теперь поднимается вместе с ним, и запас стал
       не нужен: он только съедал анимацию. */
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    /* Первый экран не ждет прокрутки: то, что видно при открытии, встает
       в очередь появления и поднимается сверху вниз. Очередь не длиннее
       восьми шагов, иначе на высоком экране хвост доезжал бы слишком
       долго. Все, что ниже кромки, наблюдается как раньше. */
    var fold = window.innerHeight || document.documentElement.clientHeight;
    var order = 0;
    Array.prototype.forEach.call(rises, function (el) {
      if (el.getBoundingClientRect().top < fold) {
        el.style.setProperty('--i', Math.min(order++, 8));
        el.classList.add('is-load');
        return;
      }
      io.observe(el);
    });
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
    }, { rootMargin: '0px 0px 10% 0px', threshold: 0 });
    io.observe(el);
  }

  /* Полосы занятости растут слева направо: это ось времени */
  runOnce('.tl', function (el) { el.classList.add('is-run'); });

  /* Метки на карте появляются по очереди, ведя взгляд по географии */
  runOnce('.map', function (el) { el.classList.add('is-run'); });

  /* Цифры отсчитываются, чтобы читатель их действительно прочитал.
     Настоящее значение стоит в разметке сразу: если наблюдатель почему-то
     не сработает, посетитель увидит число, а не ноль. */
  var counters = document.querySelectorAll('[data-count]');
  Array.prototype.forEach.call(counters, function (node) {
    var raw = node.getAttribute('data-count');
    var m = /^([0-9][0-9\s\u00a0,]*[0-9]|[0-9])(.*)$/.exec(raw);
    if (!m) return;
    var target = parseInt(m[1].replace(/[\s\u00a0,]/g, ''), 10);
    if (isNaN(target)) return;
    var suffix = m[2];
    var spaced = /[\s\u00a0]/.test(m[1]);
    var fmt = function (n) {
      var str = String(n);
      if (spaced) str = str.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
      return str + suffix;
    };
    if (reduced || !('IntersectionObserver' in window)) return;

    /* Обнуляем сразу при загрузке: иначе цифра сбрасывалась на нуль
       уже на глазах у читателя, когда блок доходил до нужной высоты. */
    node.textContent = fmt(0);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var t0 = null, dur = 1200;
        var step = function (ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          node.textContent = fmt(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        setTimeout(function () { requestAnimationFrame(step); }, 80);
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
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

  /* --- Карта: страна, метка и строка списка подсвечиваются вместе -- */
  var geoList = document.querySelector('[data-geo]');
  if (geoList) {
    var tags = document.querySelectorAll('.tag');
    var groups = document.querySelectorAll('.cg');
    /* Ищем по data-i, а не по номеру в разметке: страны на карте выложены
       по площади, чтобы мелкие не уходили под крупные соседние. */
    var byIndex = function (list, i) {
      for (var k = 0; k < list.length; k++) if (list[k].getAttribute('data-i') === String(i)) return list[k];
      return null;
    };
    var setHot = function (i, on) {
      [byIndex(tags, i), byIndex(groups, i), geoList.querySelector('[data-i="' + i + '"]')].forEach(function (el) {
        if (el) el.classList.toggle('is-hot', on);
      });
    };
    var bind = function (el) {
      var i = el.getAttribute('data-i');
      el.addEventListener('mouseenter', function () { setHot(i, true); });
      el.addEventListener('mouseleave', function () { setHot(i, false); });
      el.addEventListener('focus', function () { setHot(i, true); });
      el.addEventListener('blur', function () { setHot(i, false); });
    };
    /* Курсор ловит неподвижный слой, а поднимается его копия на слое
       отрисовки. Иначе страна уезжает из-под курсора и начинает дребезжать. */
    Array.prototype.forEach.call(geoList.querySelectorAll('[data-i]'), bind);
    Array.prototype.forEach.call(groups, bind);
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
