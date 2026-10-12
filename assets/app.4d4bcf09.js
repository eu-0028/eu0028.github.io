/* e-shutov.ru — поведение интерфейса. Единственная зависимость — Lenis,
   он лежит в проекте файлом и подключается до этого скрипта. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hdr = document.querySelector('[data-hdr]');
  /* Скорость прокрутки в пикселях на миллисекунду. Считает общий цикл
     ниже, читает наблюдатель за появлением блоков. */
  var speed = 0;

  /* --- Плавная прокрутка --------------------------------- */
  /* Колесо мыши двигает страницу рывками: браузер отрабатывает каждый
     щелчок отдельным прыжком. Lenis перехватывает колесо и ведет
     положение к цели с задержкой, отчего ход становится слитным.

     Включаем только при мыши или тачпаде. На сенсорном экране родная
     прокрутка идет на стороне системы и уже плавная, а подмена ломала бы
     привычную инерцию пальца. При запрете анимации — тоже не включаем. */
  var lenis = null;
  if (!reduced && window.matchMedia('(pointer: fine)').matches && window.Lenis) {
    lenis = new window.Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      autoRaf: true,
      /* Якоря ведем сами: обработчик Lenis не смотрит на preventDefault,
         и вместе с нашими кликами по меню прокрутка запускалась дважды. */
      anchors: false,
      /* У карты своя прокрутка вбок. Отдаем ей только боковой жест:
         помеченная целиком, она съедала и движение вниз, и страница
         над картой переставала листаться вовсе. */
      virtualScroll: function (e) {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return true;
        var t = e.event && e.event.target;
        return !(t && t.closest && t.closest('.map__scroll'));
      }
    });
  }

  /* Отступ сверху при прыжке к разделу. Ровно тот же, что дает разделам
     scroll-margin-top, иначе Lenis остановился бы на другой высоте. */
  var headOffset = function () {
    var tall = hdr ? hdr.getBoundingClientRect().height : 68;
    return tall + 24;
  };

  /* Один путь для всех переходов по странице: и для Lenis, и без него */
  var goTo = function (target) {
    if (lenis) {
      lenis.scrollTo(target === 0 ? 0 : target, { offset: -headOffset(), duration: 1.2 });
      return;
    }
    var how = reduced ? 'auto' : 'smooth';
    if (target === 0) window.scrollTo({ top: 0, behavior: how });
    else target.scrollIntoView({ behavior: how, block: 'start' });
  };

  /* Один обработчик на все ссылки-якоря: меню, кнопки, подвал. Пока
     работает Lenis, родная плавная прокрутка отключена, поэтому вести
     их должен он, иначе переходы стали бы мгновенными. */
  document.addEventListener('click', function (e) {
    if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#' || href.length < 2) return;
    var el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    goTo(el);
    /* Адрес меняем как раньше: раздел виден в строке и копируется ссылкой */
    if (history.pushState) history.pushState(null, '', href);
  });

  /* Кнопка «назад» возвращает к предыдущему разделу тем же ходом */
  window.addEventListener('popstate', function () {
    var el = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    goTo(el || 0);
  });

  /* --- Мобильное меню ------------------------------------ */
  var burger = document.querySelector('[data-burger]');
  var drawer = document.querySelector('[data-drawer]');
  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('data-open', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      /* Под открытым меню страница стоит: иначе она продолжала бы ехать
         под пальцем, пока читают пункты. */
      if (lenis) { if (open) lenis.stop(); else lenis.start(); }
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
      goTo(0);
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
      mark.setAttribute('content', now() === 'dark' ? '#181c24' : '#f4f5f6');
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
  /* Слой под анимацию снимаем, как только блок приехал */
  var settle = function (e) {
    if (e.target.classList.contains('reveal')) e.target.classList.add('is-done');
  };
  document.addEventListener('transitionend', settle, true);
  document.addEventListener('animationend', settle, true);

  var rises = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(rises, function (el) { el.classList.add('is-in', 'is-done'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      /* Лесенку считаем по тому, что вошло в кадр вместе, сверху вниз, а
         не по номеру в разметке. Раньше номер был постоянный, и строка,
         доехавшая до кромки в одиночку, все равно отстаивала свою
         очередь: у двенадцатой строки списка стран набегало 420 мс
         задержки поверх 900 мс перехода, и читатель видел пустоту. */
      var queue = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      var step = 0;
      queue.forEach(function (entry) {
        /* Без анимации показываем только то, что при обнаружении уже
           почти ушло за верх экрана: там подъем бессмыслен. Раньше порог
           стоял на 60 процентах и отменял анимацию при обычной прокрутке,
           потому что обработчик наблюдателя вызывается с задержкой и блок
           к этому моменту успевал уйти вглубь кадра. */
        var vh = window.innerHeight || document.documentElement.clientHeight;
        /* Положение читаем заново, а не берем entry.boundingClientRect:
           там снимок на момент пересечения, и при быстрой прокрутке он
           успевает устареть на сотни пикселей. Блок, уже уехавший на
           середину кадра, по снимку выглядел как едва показавшийся из-за
           нижней кромки — и вместо мгновенного показа получал подъем. */
        var top = entry.target.getBoundingClientRect().top;
        /* Порог поднят с 20 до 55 процентов высоты экрана. При быстрой
           прокрутке наблюдатель сообщает о блоке, когда тот уже забрался
           на середину кадра: на него смотрят сейчас, и подъем длиной в
           девять десятых секунды означает, что читатель упирается в
           пустое место. Такому показываем сразу. */
        /* Очередь имеет смысл, пока читают спокойно. На быстрой
           прокрутке блок успевает уехать за середину экрана, пока
           отстаивает свои две сотни миллисекунд, — читатель упирается
           ровно в то пустое место, из-за которого все затевалось.
           Поэтому: летим — показываем сразу, идем шагом — очередь. */
        if (top < vh * 0.55 || speed > 2.5) entry.target.classList.add('is-now', 'is-done');
        else {
          entry.target.style.setProperty('--i', speed > 1 ? 0 : Math.min(step++, 4));
          entry.target.classList.add('is-in');
        }
        io.unobserve(entry.target);
      });
    /* Порог нулевой: у высокого блока проценты его собственной высоты
       складываются в пол-экрана, и он появлялся уже прокрученным.

       Зона кончается ровно на нижней кромке. Запас ниже кромки съедал
       подъем: блок начинал вставать до того, как показаться, и к моменту
       появления был уже собран. Ровная кромка при этом не оставляет
       пустоты: блок начинает движение в тот же миг, когда входит в кадр,
       а не висит прозрачным на экране.

       Поднимал кромку на 12 процентов, чтобы блок трогался, уже заметно
       войдя в кадр. Вместе с задержкой лесенки это откладывало показ
       почти на полторы секунды, и при быстрой прокрутке читатель
       упирался в пустое место. Кромка вернулась на место. */
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
      if (box.bottom <= 0) { el.classList.add('is-now', 'is-done'); return; }
      el.style.setProperty('--i', Math.min(order++, 4));
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
        /* Открытие в новой вкладке оставляем браузеру: адрес уже поправлен */
        if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        location.href = url;
      });
    });
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

  /* Страны разгораются по очереди, когда карта входит в кадр. Порядок
     берем из data-i — тот же, что в списке под картой, а не порядок
     отрисовки: там страны разложены по площади.

     Показ одноразовый, переходом. Раньше прозрачность пересчитывалась
     каждый кадр прокрутки, и браузер заново собирал двенадцать групп
     SVG с контурами стран — на подъезде к карте это заметно дергалось.
     Доиграв, снимаем класс: свойства прозрачности на группах не
     остается, и карта дальше ничего не стоит. */
  var mapFig = document.querySelector('.map');
  var cgs = mapFig ? mapFig.querySelectorAll('.cg') : [];
  if (!reduced && cgs.length) {
    var last = 0;
    Array.prototype.forEach.call(cgs, function (g) {
      var i = +g.getAttribute('data-i') || 0;
      g.style.setProperty('--i', i);
      if (i > last) last = i;
    });
    mapFig.classList.add('map--seq');
    runOnce('.map', function (el) {
      el.classList.add('is-lit');
      setTimeout(function () { el.classList.remove('map--seq', 'is-lit'); }, 700 + last * 55 + 120);
    });
  }

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

  /* --- Движение по прокрутке ----------------------------- */
  /* Один цикл на всю страницу. Пока работает Lenis, он сам зовет нас
     внутри своего кадра — иначе параллакс отставал бы от прокрутки на
     кадр и подрагивал. Без Lenis слушаем прокрутку один раз и сводим
     работу к одному кадру.

     Внутри кадра сначала читаем все положения, потом пишем все стили:
     вперемешку браузер пересчитывал бы разметку на каждом элементе. */
  var fx = [];
  var lastY = 0, lastT = 0;
  var paint = function () {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var y = window.scrollY || window.pageYOffset || 0;
    var now = window.performance && performance.now ? performance.now() : +new Date();
    if (lastT && now > lastT) speed = Math.abs(y - lastY) / (now - lastT);
    lastY = y; lastT = now;
    if (hdr) hdr.setAttribute('data-stuck', y > 8 ? 'true' : 'false');
    var i;
    for (i = 0; i < fx.length; i++) fx[i].read(vh, y);
    for (i = 0; i < fx.length; i++) fx[i].write();
  };

  if (!reduced) {
    var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
    var px = function (v) { return v.toFixed(1) + 'px'; };
    /* Пишем, только когда значение правда изменилось. Иначе браузер
       пересчитывает стили на каждом кадре, даже если ничего не поехало:
       у неподвижных разделов величина та же от кадра к кадру. */
    var set = function (el, name, val) {
      if (el['_' + name] === val) return;
      el['_' + name] = val;
      el.style.setProperty(name, val);
    };

    /* Первый экран. Текст уходит вверх и гаснет, фигура отстает: взгляд
       отпускает обложку раньше, чем она уедет, и переход к тексту не
       выглядит обрывом. */
    var hero = document.querySelector('.hero');
    var layer = document.querySelector('[data-hero-layer]');
    var pic = document.querySelector('.portrait');
    if (hero && (layer || pic)) {
      hero.classList.add('is-fx');
      var hp = 0, picH = 0, heroY = 0;
      fx.push({
        read: function (vh, y) {
          picH = pic ? pic.offsetHeight : 0;
          if (!layer) { hp = clamp(y / (hero.offsetHeight || vh)); return; }
          /* Считаем по уходу самого текста за верхнюю кромку, а не по
             высоте секции: секция начинает уезжать сразу, а текст стоит
             ниже шапки и гаснуть в полную силу ему еще рано.
             Свой сдвиг прибавляем обратно — rect его уже учел, и без
             поправки слой мерил бы себя по себе же и сползал. */
          var r = layer.getBoundingClientRect();
          hp = clamp(-(r.top - heroY) / (r.height || 1));
        },
        write: function () {
          if (layer) {
            heroY = -40 * hp;
            set(layer, '--hero-y', px(heroY));
            set(layer, '--hero-o', (1 - hp).toFixed(3));
          }
          if (pic) set(pic, '--pic-y', px(picH * 0.12 * hp));
          /* Экран уехал — слои под анимацию больше не нужны */
          hero.classList.toggle('is-fx', hp < 1);
        }
      });
    }

    /* Заголовки разделов идут чуть медленнее своего раздела. Сдвиг малый:
       это глубина, а не самостоятельное движение. */
    Array.prototype.forEach.call(document.querySelectorAll('.band .h2'), function (el) {
      var p = 0;
      fx.push({
        read: function (vh) {
          var r = el.getBoundingClientRect();
          p = clamp((vh - r.top) / (vh + r.height));
        },
        write: function () { set(el, '--par', px(-24 * p)); }
      });
    });

    /* Линейка над проектом прочерчивается, пока проект идет по экрану:
       видно, сколько из него пройдено. Отсчет начинается, когда верх
       проекта доходит до строки чтения — шести десятых высоты экрана. */
    Array.prototype.forEach.call(document.querySelectorAll('.proj'), function (el) {
      var p = 0;
      fx.push({
        read: function (vh) {
          var r = el.getBoundingClientRect();
          p = clamp((vh * 0.6 - r.top) / (r.height || 1));
        },
        write: function () { set(el, '--fill', p.toFixed(3)); }
      });
    });

  }

  if (lenis) lenis.on('scroll', paint);
  else {
    var queued = false;
    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; paint(); });
    }, { passive: true });
  }
  window.addEventListener('resize', paint, { passive: true });
  window.addEventListener('load', paint);
  paint();

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
