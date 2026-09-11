/* e-shutov.ru — поведение интерфейса. Без зависимостей. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Пришли со сменой языка: текст тот же и читатель на том же месте, значит
     показывать страницу заново собирающейся неправильно. Отметку ставит
     обработчик перед уходом, живет она один переход. */
  var sameRead = false;
  try {
    sameRead = sessionStorage.getItem('lang-switch') === '1';
    if (sameRead) sessionStorage.removeItem('lang-switch');
  } catch (e) {}

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

  /* --- Знак в шапке возвращает к началу страницы --------- */
  /* Раньше он вел на адрес сайта и страница перезагружалась целиком:
     заново грузились шрифты и карта, а прокрутка прыгала в начало
     рывком. Теперь это просто возврат наверх по той же странице. */
  var toTop = document.querySelector('[data-top]');
  if (toTop) {
    toTop.addEventListener('click', function (e) {
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      /* Уводим из адреса якорь раздела, иначе следующее обновление
         страницы снова утащит вниз. */
      if (location.hash && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  }

  /* --- Светлое и темное оформление ----------------------- */
  /* Выбор человека сильнее системной настройки и переживает перезагрузку.
     Пока выбора нет, атрибута нет и работает системная тема. */
  var toggles = document.querySelectorAll('[data-theme-toggle]');
  if (toggles.length) {
    var root = document.documentElement;
    var dark = window.matchMedia('(prefers-color-scheme: dark)');
    var mark = document.createElement('meta');
    mark.setAttribute('name', 'theme-color');
    document.head.insertBefore(mark, document.head.firstChild);
    var now = function () {
      var set = root.getAttribute('data-theme');
      return set === 'dark' || set === 'light' ? set : (dark.matches ? 'dark' : 'light');
    };
    var label = function () {
      var next = now() === 'dark' ? 'light' : 'dark';
      var text = toggles[0].getAttribute('data-label-' + next) || '';
      Array.prototype.forEach.call(toggles, function (b) {
        b.setAttribute('aria-label', text);
        b.setAttribute('title', text);
      });
      /* Цвет строки состояния в мобильных браузерах. Метка без media
         стоит первой и перекрывает системные. */
      mark.setAttribute('content', now() === 'dark' ? '#0e1116' : '#f4f5f6');
    };
    label();
    Array.prototype.forEach.call(toggles, function (b) {
      b.addEventListener('click', function () {
        var next = now() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (x) {}
        label();
      });
    });
    /* Пока человек ничего не выбрал, следуем за системой на лету */
    var follow = function () { if (!root.getAttribute('data-theme')) label(); };
    if (dark.addEventListener) dark.addEventListener('change', follow);
    else if (dark.addListener) dark.addListener(follow);
  }

  /* --- Уведомление о хранении настройки ------------------ */
  /* Показываем один раз в жизни браузера. Если хранилище недоступно,
     запомнить отказ негде — тогда полосу не показываем вовсе, чтобы
     не встречать человека одним и тем же сообщением каждый раз. */
  var notice = document.querySelector('[data-notice]');
  if (notice) {
    var seen = null;
    try { seen = localStorage.getItem('notice'); } catch (x) { seen = 'off'; }
    if (!seen) {
      setTimeout(function () {
        notice.hidden = false;
        requestAnimationFrame(function () { notice.classList.add('is-up'); });
      }, 1400);
      notice.querySelector('[data-notice-ok]').addEventListener('click', function () {
        notice.classList.remove('is-up');
        try { localStorage.setItem('notice', '1'); } catch (x) {}
        setTimeout(function () { notice.hidden = true; }, 400);
      });
    }
  }

  /* --- Появление блоков при прокрутке -------------------- */
  var rises = document.querySelectorAll('.reveal');
  if (sameRead) {
    Array.prototype.forEach.call(rises, function (el) { el.classList.add('is-now'); });
  } else if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(rises, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        /* Без анимации показываем только то, что при обнаружении уже
           почти ушло за верх экрана: там подъем бессмыслен. Раньше порог
           стоял на 60 процентах и отменял анимацию при обычной прокрутке,
           потому что обработчик наблюдателя вызывается с задержкой и блок
           к этому моменту успевал уйти вглубь кадра. */
        var deep = entry.boundingClientRect.top <
          (window.innerHeight || document.documentElement.clientHeight) * 0.2;
        entry.target.classList.add(deep ? 'is-now' : 'is-in');
        io.unobserve(entry.target);
      });
    /* Порог нулевой: у высокого блока проценты его собственной высоты
       складываются в пол-экрана, и он появлялся уже прокрученным.

       Зона кончается ровно на нижней кромке. Запас ниже кромки съедал
       подъем: блок начинал вставать до того, как показаться, и к моменту
       появления был уже собран. Ровная кромка при этом не оставляет
       пустоты: блок начинает движение в тот же миг, когда входит в кадр,
       а не висит прозрачным на экране. */
    }, { rootMargin: '0px 0px 0px 0px', threshold: 0 });
    /* Первый экран не ждет прокрутки: то, что видно при открытии, встает
       в очередь появления и поднимается сверху вниз. Очередь не длиннее
       семи шагов, иначе на высоком экране хвост доезжал бы слишком
       долго. Все, что ниже кромки, наблюдается как раньше.

       В очередь идет только то, что человек видит в это мгновение.
       Раньше в нее попадало и все прокрученное выше — при обновлении
       страницы посреди текста экран оставался пустым около полутора
       секунд, пока очередь доходила до видимой части. */
    var fold = window.innerHeight || document.documentElement.clientHeight;
    var order = 0;
    Array.prototype.forEach.call(rises, function (el) {
      var box = el.getBoundingClientRect();
      if (box.top >= fold) { io.observe(el); return; }
      if (box.bottom <= 0) { el.classList.add('is-now'); return; }
      el.style.setProperty('--i', Math.min(order++, 6));
      el.classList.add('is-load');
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

  /* --- Смена языка не сбрасывает чтение в начало --------- */
  /* К адресу другой версии дописывается раздел, до которого человек
     дочитал. Идентификаторы разделов во всех языках одинаковы, поэтому
     якорь переносится как есть. */
  var langLinks = document.querySelectorAll('[data-lang-link]');
  if (langLinks.length && sections.length) {
    var openSection = function () {
      /* Какой раздел читают, уже знает подсветка в навигации: у ее пункта
         стоит aria-current. Берем оттуда, чтобы не заводить второе мнение
         о том же самом. */
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].link.getAttribute('aria-current') === 'true') return sections[i].el.id;
      }
      /* Запасной способ, если наблюдатель недоступен: последний раздел,
         начало которого уже в верхней трети экрана. */
      var fold = (window.innerHeight || document.documentElement.clientHeight) * 0.35;
      var here = '';
      for (var k = 0; k < sections.length; k++) {
        if (sections[k].el.getBoundingClientRect().top <= fold) here = sections[k].el.id;
      }
      return here;
    };
    Array.prototype.forEach.call(langLinks, function (a) {
      var base = a.getAttribute('href');
      a.addEventListener('click', function (e) {
        var id = openSection();
        var url = base + (id ? '#' + id : '');
        a.setAttribute('href', url);
        try { sessionStorage.setItem('lang-switch', '1'); } catch (x) {}
        /* Открытие в новой вкладке оставляем браузеру: адрес уже поправлен */
        if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        location.href = url;
      });
    });
  }

  /* --- Запуск анимаций, привязанных к смыслу ------------- */  /* --- Запуск анимаций, привязанных к смыслу ------------- */
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
    if (reduced || sameRead || !('IntersectionObserver' in window)) return;

    /* Итоговое значение держим на узле: по нему восстанавливаем число
       перед печатью, не дожидаясь, пока блок попадет в кадр. */
    node.setAttribute('data-final', fmt(target));

    /* Обнуляем сразу при загрузке: иначе цифра сбрасывалась на нуль
       уже на глазах у читателя, когда блок доходил до нужной высоты. */
    node.textContent = fmt(0);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var t0 = null, dur = 1200;
        var step = function (ts) {
          if (node.getAttribute('data-frozen')) return;
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

  /* Печать не ждет прокрутки. Числа обнулены до появления блока в кадре,
     и при печати сразу после открытия страницы на бумагу уходили нули:
     «0 млн», «0 участников». Перед печатью проставляем настоящие значения.
     matchMedia ловит печать в Safari и в мобильных браузерах, где события
     beforeprint не приходят. */
  var freeze = function () {
    Array.prototype.forEach.call(counters, function (node) {
      var done = node.getAttribute('data-final');
      if (!done) return;
      /* Пометка останавливает отсчет: иначе кадр анимации, идущий следом,
         затирал подставленное значение и на бумагу уходило промежуточное
         число вроде «32» вместо «50». */
      node.setAttribute('data-frozen', '1');
      node.textContent = done;
    });
  };
  if (window.matchMedia) {
    var forPrint = window.matchMedia('print');
    if (forPrint.addEventListener) forPrint.addEventListener('change', function (e) { if (e.matches) freeze(); });
    else if (forPrint.addListener) forPrint.addListener(function (e) { if (e.matches) freeze(); });
  }
  window.addEventListener('beforeprint', freeze);

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

  /* --- Возврат плавной прокрутки после прыжка к якорю ---- */
  /* Гасили ее в head, чтобы открытие адреса с якорем не превращалось
     в полет через всю страницу. Прыжок уже случился, и плавность снова
     нужна: по ней работают клики в меню. */
  if (document.documentElement.style.scrollBehavior === 'auto') {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { document.documentElement.style.scrollBehavior = ''; });
    });
  }

  /* --- Портрет: если файл не отдался, колонка схлопывается -- */
  var portrait = document.querySelector('.portrait');
  if (portrait) {
    var grid = document.querySelector('[data-hero-grid]');
    var markEmpty = function () {
      if (grid) grid.setAttribute('data-noportrait', 'true');
    };
    if (portrait.complete && portrait.naturalWidth === 0) markEmpty();
    portrait.addEventListener('error', markEmpty);
  }
})();
