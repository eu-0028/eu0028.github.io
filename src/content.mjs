// Содержание сайта. Все факты и цифры взяты из резюме Евгения Шутова.
// Ничего не выдумано: если данных нет — поля нет.

export const shared = {
  phone: '+7 929 773-11-04',
  phoneHref: '+79297731104',
  email: 'mail@e-shutov.ru',
  telegram: '@Taback_1028',
  telegramHref: 'https://t.me/Taback_1028',
  domain: 'https://e-shutov.ru',
  years: '2026',
};

export const ru = {
  lang: 'ru',
  dir: 'ltr',
  altLang: 'en',
  altLabel: 'English',
  altHref: '/en/',
  homeHref: '/',
  title: 'Евгений Шутов — международные проекты, делегации и мероприятия под ключ',
  description:
    'Специалист-международник, МГИМО. Португальский и английский C1. Делегации и дипломатический протокол, международные мероприятия под ключ, отчётность по государственным контрактам, вывод компаний на рынки.',
  ogLocale: 'ru_RU',

  brand: 'Шутов',
  skip: 'Перейти к содержанию',
  menu: 'Меню',
  close: 'Закрыть',
  cvLabel: 'Резюме PDF',

  nav: [
    { href: '#profile', label: 'Профиль', n: '01' },
    { href: '#practice', label: 'Компетенции', n: '02' },
    { href: '#work', label: 'Проекты', n: '03' },
    { href: '#current', label: '2026', n: '04' },
    { href: '#career', label: 'Опыт', n: '05' },
    { href: '#contact', label: 'Контакты', n: '06' },
  ],

  hero: {
    eyebrow: 'Москва · МГИМО · Португальский C1',
    name: 'Евгений Шутов',
    lead: 'Международные проекты,',
    leadEm: 'делегации',
    leadTail: 'и мероприятия под ключ',
    role: 'Руководитель российского офиса — Country Manager, Russia · Consult Invest ITIC',
    para:
      'Специалист-международник с бразильским профилем. Веду переговоры и документацию на португальском и английском, довожу международные проекты до фактического результата — от договора с правительством другой страны до сбалансированного отчёта по государственному контракту.',
    ctaPrimary: 'Написать',
    ctaSecondary: 'Смотреть проекты',
    portraitAlt: 'Евгений Шутов',
  },

  figures: {
    eyebrow: 'Проверяемые результаты',
    items: [
      { value: '45', unit: 'человек', label: 'В пяти национальных делегациях, проведённых под ключ на «Интервидении-2025»' },
      { value: '134', unit: 'страны', label: 'Охват сигнала бразильской трансляции конкурса, которую отработал самостоятельно' },
      { value: '9', unit: 'млн ₽', label: 'Сбалансированный отчёт о расходах по государственному контракту с первичными документами' },
      { value: '677', unit: 'предприятий', label: 'Охвачено в России, Узбекистане и Казахстане при трёхмесячном плане 300–400' },
    ],
  },

  profile: {
    n: '01',
    kicker: 'Профиль',
    title: 'Португальский как рабочий инструмент, а не строчка в резюме',
    paras: [
      'Я занимаюсь тем, что доводит международный проект до факта: договором, подписанным с другой стороной, делегацией, которая приехала и уехала без единого сбоя, отчётом, который принял государственный заказчик.',
      'Основной язык моей работы — португальский. МГИМО, первый иностранный, уровень C1 в дипломатическом, юридическом и коммерческом контексте. Бразильская сторона говорит со мной напрямую, без переводчика в контуре переговоров, и это каждый раз сокращает цикл согласований.',
      'Вторая половина работы — операционная и финансовая. Программа визита, визы, подрядчики, площадка, приём платежей, закрывающие документы, отчётность. Я одинаково спокойно веду переговоры с министерством и сверяю первичку на девять миллионов рублей.',
    ],
    facts: [
      {
        k: 'Образование',
        v: 'МГИМО, «Международные отношения», бакалавр с отличием. Магистратура «Экономика» — международный финансовый анализ, учёт и аудит.',
      },
      {
        k: 'Языки',
        v: 'Португальский C1, английский C1, испанский B1. Летняя школа по бразилистике в Федеральном университете Минас-Жерайс.',
      },
      {
        k: 'Специализация',
        v: 'Бразилия и Латинская Америка. Дипломная работа — экономическая дипломатия Бразилии как инструмент внешней политики.',
      },
      {
        k: 'Практика',
        v: 'Телевидение, государственные ведомства и частные компании. Проекты по указу Президента, при поддержке МИД и по государственным контрактам.',
      },
    ],
  },

  practice: {
    n: '02',
    kicker: 'Компетенции',
    title: 'Чем я закрываю задачу',
    intro: 'Пять направлений, в каждом из которых есть законченные проекты, а не только обязанности в должностной инструкции.',
    items: [
      {
        t: 'Делегации и дипломатический протокол',
        d: 'Сопровождение национальных делегаций под ключ — от первого письма в министерство до отъезда группы.',
        b: ['Договоры соорганизатора с правительствами стран', 'Визовая поддержка, размещение, транспорт', 'Программа пребывания и атташе делегаций', 'Работа с посольствами и государственными ведомствами'],
      },
      {
        t: 'Международные мероприятия под ключ',
        d: 'Форумы, конкурсы и акселерационные программы: полный цикл от концепции до закрывающих документов.',
        b: ['Деловая программа и отбор участников', 'Продажи и привлечение, работа с воронкой', 'Площадка, проживание, подрядчики', 'Приём платежей и договорная база'],
      },
      {
        t: 'Закупки, договоры и отчётность',
        d: 'Документальный контур проекта, включая государственные контракты и финансовую сверку.',
        b: ['Отчётность по государственным контрактам', 'Сверка договоров с подрядчиками и первичных документов', 'Агентские договоры, акты, коммерческие предложения', 'Кадровое делопроизводство и комплаенс'],
      },
      {
        t: 'Развитие бизнеса и выход на рынки',
        d: 'Привлечение клиентов на рынках России и СНГ с измеримыми показателями.',
        b: ['Лидогенерация, cold outreach, управление воронкой', 'CRM по странам', 'Исследование рынка и конкурентный анализ', 'Финансовое моделирование и юнит-экономика'],
      },
      {
        t: 'Язык и перевод',
        d: 'Португальский и английский в дипломатическом, юридическом, коммерческом и техническом регистре.',
        b: ['Последовательный перевод на форумах', 'Перевод договоров, регламентов, уставных документов', 'Техническая документация', 'Деловая и дипломатическая переписка'],
      },
    ],
  },

  work: {
    n: '03',
    kicker: 'Избранные проекты',
    title: 'Что сделано',
    items: [
      {
        t: 'Интервидение-2025',
        img: 'work-intervision.jpg',
        imgAlt: 'Делегации на «Интервидении-2025»',
        sub: 'Международный музыкальный конкурс',
        meta: 'август — сентябрь 2025 · Live Arena, Москва',
        role: 'Проектный менеджер национальных делегаций',
        d: 'Привлечён на проект менее чем за месяц до конкурса как специалист со знанием португальского языка. Конкурс проводился по указу Президента при поддержке МИД России, зал на 20 000 мест.',
        b: [
          'Пять национальных делегаций — Бразилия, Мадагаскар, Кения, Эфиопия, ОАЭ — общей численностью 45 человек.',
          'Договоры соорганизатора с правительствами стран, визовая поддержка, размещение, транспорт и десятидневная программа пребывания.',
          'Отбор и кураторство пяти атташе делегаций, по одному на страну.',
          'Вся работа с бразильской стороной велась на португальском: артист, продюсерская команда, телевещатель, министерство культуры.',
          'Самостоятельно отработал кейс с трансляцией конкурса на бразильском телевидении — подготовил и перевёл пакет документов для вещателя, включая устав организации, кадровые документы, соглашения и меморандумы.',
        ],
        m: [
          { v: '45', l: 'членов делегаций' },
          { v: '5', l: 'стран' },
          { v: '3+ млн', l: 'зрителей трансляции' },
          { v: '134', l: 'страны охвата' },
        ],
      },
      {
        t: 'Бизнес-инкубатор ШОС 2025',
        img: 'work-sco.jpg',
        imgAlt: 'Бизнес-инкубатор ШОС, Омск',
        sub: 'Государственный контракт · отчётность и финансовый аудит',
        meta: 'сентябрь — декабрь 2025 · программа в Омске',
        role: 'Руководитель отчётности по государственному контракту',
        d: 'Заказчик — Дирекция Всемирного фестиваля молодёжи. Программа прошла 19–23 августа 2025 года с участием более 100 человек из всех десяти государств — членов ШОС.',
        b: [
          'Итоговый отчёт на 3 000+ страниц: сбор, структурирование и оформление учебных материалов по 25 воркшоп-сессиям.',
          'Саммари и раздаточные материалы примерно для 12 сессий написаны с нуля — исходных материалов не существовало.',
          'Единолично вёл финансовую отчётность: сверка около 10 договоров с подрядчиками — переводчики, кейтеринг, персонал, логистика.',
          'Согласовал корректировки документов с поставщиками и подготовил полностью сбалансированный отчёт о расходах на 9 млн ₽ с первичными документами и внутренними приказами.',
        ],
        m: [
          { v: '3 000+', l: 'страниц отчёта' },
          { v: '9 млн ₽', l: 'сбалансировано' },
          { v: '25', l: 'воркшоп-сессий' },
          { v: '10', l: 'государств ШОС' },
        ],
      },
      {
        t: 'Russia Bridge Program',
        img: 'work-bridge.jpg',
        imgAlt: 'Russia Bridge Program, Москва',
        sub: 'Первая российско-саудовская программа бизнес-акселерации',
        meta: 'ноябрь — декабрь 2025 · Москва',
        role: 'Соорганизатор',
        d: 'Программа прошла 4–5 декабря 2025 года с участием более 60 человек. Открывали программу председатель Комитета Государственной Думы по международным делам Леонид Слуцкий и посол Саудовской Аравии.',
        b: [
          'Продажи и привлечение: около 200 контактов по телефону и порядка 1 000 показов в Telegram и вебе.',
          'Конвертировал 30 платных участников и организовал 15 структурированных B2B-встреч между российскими и иностранными компаниями.',
          'Отобрал 9 российских проектов для питч-сессии; три из них получили прямую инвестиционную поддержку и освобождение от платы за коммерческую лицензию от венчурного фонда Value Makers Studio.',
          'Согласовал договоры по площадке и проживанию с московскими отелями, обеспечив ставки ниже рыночных и дополнительные скидки.',
          'Настроил приём платежей, подготовил шаблоны коммерческих предложений и договоры оказания услуг.',
          'Вёл англоязычную коммуникацию с приезжей саудовской делегацией.',
        ],
        m: [
          { v: '60+', l: 'участников' },
          { v: '30', l: 'платных участников' },
          { v: '15', l: 'B2B-встреч' },
          { v: '3', l: 'проекта с инвестициями' },
        ],
      },
      {
        t: 'RAKEZ',
        img: 'work-rakez.jpg',
        imgAlt: 'Работа по проекту RAKEZ',
        sub: 'Экономическая зона Рас-эль-Хайма, ОАЭ · рынки России и СНГ',
        meta: 'январь — май 2026',
        role: 'Лидогенерация и единая точка контакта',
        d: 'Отвечал за лидогенерацию на рынках России и СНГ для свободной экономической зоны ОАЭ и выступал единой точкой контакта для всех российских и СНГ-контрагентов от лица RAKEZ.',
        b: [
          'Охватил около 677 предприятий в России, Узбекистане и Казахстане при трёхмесячном плане в 300–400.',
          'Получил около 313 откликов с первичным интересом при KPI в 300.',
          'Разработал и провёл таргетированную кампанию cold outreach: 512 отобранных предприятий, около 275 содержательных ответов.',
          'Выстроил CRM отдельно по каждой из трёх стран.',
          'Довёл 3 потенциальных клиентов до стадии pre-quotation через discovery-звонки; поддерживал 6 тёплых лидов, включая AKFA Group — Узбекистан, более 30 000 сотрудников.',
        ],
        m: [
          { v: '677', l: 'предприятий охвачено' },
          { v: '313', l: 'откликов при KPI 300' },
          { v: '275', l: 'содержательных ответов' },
          { v: '6', l: 'тёплых лидов' },
        ],
      },
      {
        t: 'AGORA Global Business Club',
        img: 'work-agora.jpg',
        imgAlt: 'Форум AGORA, отель Soluxe',
        sub: 'Международный бизнес-форум',
        meta: 'январь — апрель 2026 · отель Soluxe, Москва',
        role: 'Руководитель продаж форума',
        d: 'Руководитель продаж международного бизнес-форума 25–26 апреля 2026 года со стороны Consult Invest ITIC как партнёра-исполнителя AGORA.',
        b: [
          'Вёл всю англоязычную коммуникацию с иностранными гостями, включая индийскую и южноафриканскую делегации.',
          'Сформировал 4 квалифицированных лида среди предпринимателей на площадке форума.',
          'Форум освещали «Россия-1», НТВ и RuNews24.',
        ],
        m: [
          { v: '2', l: 'иностранные делегации' },
          { v: '4', l: 'квалифицированных лида' },
          { v: '3', l: 'федеральных СМИ' },
        ],
      },
    ],
  },

  current: {
    n: '04',
    kicker: 'В работе сейчас',
    title: '2026 год',
    intro: 'Проекты, которые веду на момент публикации.',
    items: [
      {
        t: 'Международный фестиваль молодёжи 2026',
        meta: 'Екатеринбург · 11–17 сентября 2026',
        d: 'Координирую делегацию Бразилии в детской программе фестиваля: 10 000 участников из 191 страны, из них 1 000 подростков 14–17 лет. Веду всю переписку с бразильской стороной на португальском, собираю и проверяю документы участников, отвечаю за логистику и сопровождение группы в России.',
      },
      {
        t: 'Our Generation 2026',
        meta: 'Международный детский песенный конкурс',
        d: 'Перевёл на португальский язык весь пакет конкурсной документации: регламент, брифинг для делегаций, анкету участника и требования к конкурсному контенту. Договорился об участии бразильского члена жюри и подобрал исполнителя, который представит страну в финале.',
      },
      {
        t: 'Интервидение-2026',
        meta: 'Эр-Рияд, Саудовская Аравия · декабрь 2026',
        d: 'Веду работу по организации конкурса после проведённых в 2025 году делегаций пяти стран.',
      },
      {
        t: 'Бизнес-инкубатор БРИКС',
        meta: 'Очная программа 2027–2028',
        d: 'Подготовил обращение в Министерство туризма Бразилии о грантовой поддержке очной программы.',
      },
      {
        t: 'Cifrex',
        meta: 'Беспилотные авиационные системы',
        d: 'Перевёл на португальский продуктовую документацию по аппаратам UAV 30E, 45 и 440M и по комплексу Droneport.',
      },
    ],
  },

  career: {
    n: '05',
    kicker: 'Опыт и образование',
    title: 'Хронология',
    jobsTitle: 'Опыт работы',
    jobs: [
      {
        org: 'Consult Invest ITIC',
        note: 'Международная торгово-инвестиционная консалтинговая компания',
        period: 'август 2025 — настоящее время',
        role: 'Руководитель российского офиса — Country Manager, Russia',
        sub: 'Генеральный директор юридически с января 2026 · менеджер международных коммерческих проектов, август — декабрь 2025',
        b: [
          'Руководство российским направлением компании с присутствием в шести странах — БРИКС, ШОС, GCC. Отвечаю за привлечение клиентов, реализацию проектов и взаимодействие с государственными структурами по России и СНГ.',
          'Закрыл пробел в документации, унаследованный от прежнего руководства: подготовил агентский договор и акт выполненных работ по запуску офиса в Шэньчжэне, работая напрямую с исходными документами на китайском и английском языке.',
          'Выстроил с нуля систему кадрового делопроизводства и комплаенса — правила внутреннего трудового распорядка, трудовые договоры, документация по охране труда — и провёл онбординг новых сотрудников.',
          'Представляю компанию на закрытых деловых мероприятиях: Greenwood Business Park, клуб «Атланты», партнёрские форумы.',
        ],
      },
      {
        org: 'Финансовый консультант',
        note: 'Личное финансовое планирование и инвестиционный консалтинг',
        period: 'август 2024 — декабрь 2025',
        role: 'Частная практика',
        b: [
          'Вёл 20 клиентов: индивидуальные финансовые планы, постановка целей, формирование финансовой подушки — целевого резерва достигли 100% клиентов, — оптимизация бюджета и снижение долговой нагрузки.',
          'Формировал диверсифицированные портфели на принципах портфельной теории, включая долю золота. Средняя доходность клиентов +5% в 2025 году на фоне снижающегося российского рынка акций.',
          'Структурировал долгосрочные накопления через unit-linked страховые продукты и инструменты краткосрочного роста — фонды денежного рынка и облигации.',
        ],
      },
      {
        org: 'Атташе и переводчик',
        note: 'Международные форумы в Москве',
        period: 'апрель 2024 — апрель 2025',
        role: 'Бразильская делегация',
        b: [
          'Атташе бразильской делегации на мероприятиях Росконгресса и МГИМО, Рабочая группа БРИКС.',
          'Устный переводчик на II Международном антифашистском форуме, апрель 2025, 91 страна.',
        ],
      },
    ],
    eduTitle: 'Образование',
    edu: [
      {
        org: 'МГИМО МИД России',
        period: '2026 — 2028',
        role: 'Магистратура, «Экономика»',
        d: 'Специализация: международный финансовый анализ, учёт и аудит.',
      },
      {
        org: 'МГИМО МИД России',
        period: '2022 — 2026',
        role: 'Бакалавриат, «Международные отношения», с отличием',
        d: 'Диплом со знанием иностранных языков: первый — португальский, второй — английский. Дипломная работа: «Экономическая дипломатия Бразилии как инструмент продвижения и реализации внешнеполитических целей в Латинской Америке».',
      },
      {
        org: 'Федеральный университет Минас-Жерайс (UFMG)',
        period: 'июль 2025',
        role: 'Летняя школа по бразилистике',
        d: 'Интенсивная программа в одном из трёх ведущих университетов Бразилии, поток продвинутого уровня португальского языка.',
      },
    ],
    langTitle: 'Языки',
    langs: [
      { l: 'Русский', v: 'родной' },
      { l: 'Португальский', v: 'C1 — дипломатический, юридический и коммерческий контекст' },
      { l: 'Английский', v: 'C1 — полное профессиональное владение' },
      { l: 'Испанский', v: 'B1 — рабочий уровень' },
    ],
    skillTitle: 'Навыки',
    skills: [
      { k: 'Развитие бизнеса', v: 'Лидогенерация, управление воронкой, B2B-продажи, кампании привлечения' },
      { k: 'Выход на рынки', v: 'Исследование рынка, финансовое моделирование, конкурентный анализ, стратегия выхода' },
      { k: 'Международные отношения', v: 'Дипломатический протокол, взаимодействие с госструктурами, многосторонние переговоры' },
      { k: 'Управление проектами', v: 'Организация мероприятий под ключ, кросс-функциональная координация, управление подрядчиками, работа в сжатые сроки' },
      { k: 'Финансовый анализ', v: 'Корпоративные финансы, юнит-экономика, финансовая отчётность, формирование инвестиционного портфеля' },
      { k: 'Договорная работа', v: 'Коммерческие предложения, договоры оказания услуг, агентские договоры, закрывающие и первичные документы' },
    ],
  },

  contact: {
    n: '06',
    kicker: 'Контакты',
    title: 'Готов обсудить задачу или позицию',
    d: 'Отвечаю лично. Если вопрос по международному проекту — напишите сразу суть, страну и сроки, так будет быстрее.',
    phoneLabel: 'Телефон',
    emailLabel: 'Почта',
    tgLabel: 'Telegram',
    cityLabel: 'Город',
    city: 'Москва, Россия',
    note: 'Рекомендации и подтверждающие материалы предоставляются по запросу.',
  },

  footer: {
    rights: 'Евгений Шутов. Все права защищены.',
    navTitle: 'Разделы',
    contactTitle: 'Связь',
  },
};

export const en = {
  lang: 'en',
  dir: 'ltr',
  altLang: 'ru',
  altLabel: 'Русский',
  altHref: '/',
  homeHref: '/en/',
  title: 'Evgeny Shutov — international projects, delegations and turnkey events',
  description:
    'International affairs specialist, MGIMO. Portuguese and English at C1. National delegations and diplomatic protocol, turnkey international events, state-contract reporting, market entry.',
  ogLocale: 'en_US',

  brand: 'Shutov',
  skip: 'Skip to content',
  menu: 'Menu',
  close: 'Close',
  cvLabel: 'CV in PDF',

  nav: [
    { href: '#profile', label: 'Profile', n: '01' },
    { href: '#practice', label: 'Practice', n: '02' },
    { href: '#work', label: 'Projects', n: '03' },
    { href: '#current', label: '2026', n: '04' },
    { href: '#career', label: 'Experience', n: '05' },
    { href: '#contact', label: 'Contact', n: '06' },
  ],

  hero: {
    eyebrow: 'Moscow · MGIMO · Portuguese C1',
    name: 'Evgeny Shutov',
    lead: 'International projects,',
    leadEm: 'delegations',
    leadTail: 'and turnkey events',
    role: 'Country Manager, Russia · Consult Invest ITIC',
    para:
      'International affairs specialist with a Brazilian focus. I negotiate and handle documentation in Portuguese and English, and I carry international projects through to a hard result — from a co-organiser agreement with a foreign government to a balanced expense report accepted under a state contract.',
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'See the projects',
    portraitAlt: 'Evgeny Shutov',
  },

  figures: {
    eyebrow: 'Verifiable results',
    items: [
      { value: '45', unit: 'people', label: 'Across five national delegations delivered end to end at Intervision 2025' },
      { value: '134', unit: 'countries', label: 'Signal reach of the Brazilian broadcast of the contest, which I secured single-handedly' },
      { value: '9', unit: 'M ₽', label: 'Balanced expense report under a state contract, with source documents' },
      { value: '677', unit: 'companies', label: 'Reached across Russia, Uzbekistan and Kazakhstan against a three-month plan of 300–400' },
    ],
  },

  profile: {
    n: '01',
    kicker: 'Profile',
    title: 'Portuguese as a working instrument, not a line on a CV',
    paras: [
      'My work is what turns an international project into fact: a signed agreement with the other side, a delegation that arrives and departs without a single failure, a report the state client accepts.',
      'Portuguese is the primary language of my work. MGIMO, first foreign language, C1 in diplomatic, legal and commercial registers. The Brazilian side speaks to me directly, with no interpreter inside the negotiation, and that shortens the approval cycle every time.',
      'The other half of the job is operational and financial. Visit programmes, visas, contractors, venues, payment processing, closing documents, reporting. I am equally comfortable negotiating with a ministry and reconciling source documents worth nine million roubles.',
    ],
    facts: [
      {
        k: 'Education',
        v: 'MGIMO, International Relations, BA with honours. MA in Economics — international financial analysis, accounting and audit.',
      },
      {
        k: 'Languages',
        v: 'Portuguese C1, English C1, Spanish B1. Summer school in Brazilian studies at the Federal University of Minas Gerais.',
      },
      {
        k: 'Focus',
        v: 'Brazil and Latin America. Thesis on Brazilian economic diplomacy as an instrument of foreign policy.',
      },
      {
        k: 'Track record',
        v: 'Television, government agencies and private companies. Projects run under presidential decree, with Foreign Ministry support and under state contracts.',
      },
    ],
  },

  practice: {
    n: '02',
    kicker: 'Practice',
    title: 'How I close a task',
    intro: 'Five areas, each backed by completed projects rather than a job description.',
    items: [
      {
        t: 'Delegations and diplomatic protocol',
        d: 'End-to-end handling of national delegations, from the first letter to a ministry to the group’s departure.',
        b: ['Co-organiser agreements with national governments', 'Visa support, accommodation, transport', 'Visit programmes and delegation attachés', 'Work with embassies and government agencies'],
      },
      {
        t: 'Turnkey international events',
        d: 'Forums, contests and acceleration programmes: the full cycle from concept to closing documents.',
        b: ['Business programme and participant selection', 'Sales, outreach and pipeline management', 'Venue, accommodation, contractors', 'Payment processing and contract base'],
      },
      {
        t: 'Procurement, contracts and reporting',
        d: 'The documentary perimeter of a project, including state contracts and financial reconciliation.',
        b: ['Reporting under state contracts', 'Reconciliation of contractor agreements and source documents', 'Agency agreements, acts, commercial proposals', 'HR administration and compliance'],
      },
      {
        t: 'Business development and market entry',
        d: 'Client acquisition in Russia and the CIS against measurable targets.',
        b: ['Lead generation, cold outreach, pipeline management', 'CRM built per country', 'Market research and competitive analysis', 'Financial modelling and unit economics'],
      },
      {
        t: 'Language and translation',
        d: 'Portuguese and English in diplomatic, legal, commercial and technical registers.',
        b: ['Consecutive interpreting at forums', 'Translation of contracts, regulations, statutory documents', 'Technical documentation', 'Business and diplomatic correspondence'],
      },
    ],
  },

  work: {
    n: '03',
    kicker: 'Selected projects',
    title: 'What has been delivered',
    items: [
      {
        t: 'Intervision 2025',
        img: 'work-intervision.jpg',
        imgAlt: 'Delegations at Intervision 2025',
        sub: 'International music contest',
        meta: 'August — September 2025 · Live Arena, Moscow',
        role: 'Project manager, national delegations',
        d: 'Brought onto the project less than a month before the contest as a Portuguese-speaking specialist. The contest was held under presidential decree with the support of the Russian Foreign Ministry, in a 20,000-seat arena.',
        b: [
          'Five national delegations — Brazil, Madagascar, Kenya, Ethiopia and the UAE — totalling 45 people.',
          'Co-organiser agreements with national governments, visa support, accommodation, transport and a ten-day visit programme.',
          'Selected and supervised five delegation attachés, one per country.',
          'All work with the Brazilian side was conducted in Portuguese: the artist, the production team, the broadcaster and the ministry of culture.',
          'Secured the broadcast of the contest on Brazilian television single-handedly — prepared and translated the broadcaster’s document package, including the organisation’s charter, HR documents, agreements and memoranda.',
        ],
        m: [
          { v: '45', l: 'delegation members' },
          { v: '5', l: 'countries' },
          { v: '3M+', l: 'broadcast viewers' },
          { v: '134', l: 'countries reached' },
        ],
      },
      {
        t: 'SCO Business Incubator 2025',
        img: 'work-sco.jpg',
        imgAlt: 'SCO Business Incubator, Omsk',
        sub: 'State contract · reporting and financial audit',
        meta: 'September — December 2025 · programme held in Omsk',
        role: 'Head of reporting under the state contract',
        d: 'Client: the Directorate of the World Youth Festival. The programme ran on 19–23 August 2025 with more than 100 participants from all ten SCO member states.',
        b: [
          'Final report of 3,000+ pages: collection, structuring and formatting of training materials across 25 workshop sessions.',
          'Summaries and handouts for roughly 12 sessions written from scratch — no source materials existed.',
          'Sole responsibility for financial reporting: reconciliation of some 10 contractor agreements — interpreters, catering, staff, logistics.',
          'Agreed document corrections with suppliers and produced a fully balanced expense report of 9M ₽ with source documents and internal orders.',
        ],
        m: [
          { v: '3,000+', l: 'pages of report' },
          { v: '9M ₽', l: 'balanced' },
          { v: '25', l: 'workshop sessions' },
          { v: '10', l: 'SCO member states' },
        ],
      },
      {
        t: 'Russia Bridge Program',
        img: 'work-bridge.jpg',
        imgAlt: 'Russia Bridge Program, Moscow',
        sub: 'First Russian–Saudi business acceleration programme',
        meta: 'November — December 2025 · Moscow',
        role: 'Co-organiser',
        d: 'The programme ran on 4–5 December 2025 with more than 60 participants. It was opened by Leonid Slutsky, Chairman of the State Duma Committee on International Affairs, and the Ambassador of Saudi Arabia.',
        b: [
          'Sales and outreach: around 200 contacts by phone and some 1,000 impressions across Telegram and the web.',
          'Converted 30 paying participants and arranged 15 structured B2B meetings between Russian and foreign companies.',
          'Selected 9 Russian projects for the pitch session; three received direct investment support and a commercial licence fee waiver from the venture fund Value Makers Studio.',
          'Negotiated venue and accommodation contracts with Moscow hotels, securing below-market rates and additional discounts.',
          'Set up payment processing and prepared commercial proposal templates and service agreements.',
          'Handled English-language communication with the visiting Saudi delegation.',
        ],
        m: [
          { v: '60+', l: 'participants' },
          { v: '30', l: 'paying participants' },
          { v: '15', l: 'B2B meetings' },
          { v: '3', l: 'projects funded' },
        ],
      },
      {
        t: 'RAKEZ',
        img: 'work-rakez.jpg',
        imgAlt: 'RAKEZ project work',
        sub: 'Ras Al Khaimah Economic Zone, UAE · Russia and CIS markets',
        meta: 'January — May 2026',
        role: 'Lead generation and single point of contact',
        d: 'Responsible for lead generation across Russia and the CIS for the UAE free economic zone, and the single point of contact for all Russian and CIS counterparties on behalf of RAKEZ.',
        b: [
          'Reached around 677 companies across Russia, Uzbekistan and Kazakhstan against a three-month plan of 300–400.',
          'Generated around 313 responses expressing initial interest against a KPI of 300.',
          'Designed and ran a targeted cold outreach campaign: 512 selected companies, around 275 substantive replies.',
          'Built a CRM separately for each of the three countries.',
          'Advanced 3 prospects to pre-quotation stage through discovery calls; maintained 6 warm leads, including AKFA Group — Uzbekistan, more than 30,000 employees.',
        ],
        m: [
          { v: '677', l: 'companies reached' },
          { v: '313', l: 'responses vs KPI 300' },
          { v: '275', l: 'substantive replies' },
          { v: '6', l: 'warm leads' },
        ],
      },
      {
        t: 'AGORA Global Business Club',
        img: 'work-agora.jpg',
        imgAlt: 'AGORA forum, Soluxe Hotel',
        sub: 'International business forum',
        meta: 'January — April 2026 · Soluxe Hotel, Moscow',
        role: 'Head of forum sales',
        d: 'Head of sales for the international business forum of 25–26 April 2026, on behalf of Consult Invest ITIC as AGORA’s delivery partner.',
        b: [
          'Handled all English-language communication with foreign guests, including the Indian and South African delegations.',
          'Generated 4 qualified leads among entrepreneurs at the forum.',
          'The forum was covered by Rossiya-1, NTV and RuNews24.',
        ],
        m: [
          { v: '2', l: 'foreign delegations' },
          { v: '4', l: 'qualified leads' },
          { v: '3', l: 'federal media outlets' },
        ],
      },
    ],
  },

  current: {
    n: '04',
    kicker: 'Currently running',
    title: 'The 2026 slate',
    intro: 'Projects under way at the time of publication.',
    items: [
      {
        t: 'International Youth Festival 2026',
        meta: 'Yekaterinburg · 11–17 September 2026',
        d: 'Coordinating the Brazilian delegation within the festival’s children’s programme: 10,000 participants from 191 countries, including 1,000 teenagers aged 14–17. All correspondence with the Brazilian side in Portuguese, collection and verification of participant documents, logistics and accompaniment of the group in Russia.',
      },
      {
        t: 'Our Generation 2026',
        meta: 'International children’s song contest',
        d: 'Translated the full competition document package into Portuguese: regulations, delegation briefing, participant form and content requirements. Secured the participation of a Brazilian jury member and selected the performer who will represent the country in the final.',
      },
      {
        t: 'Intervision 2026',
        meta: 'Riyadh, Saudi Arabia · December 2026',
        d: 'Working on the organisation of the contest, following the five national delegations delivered in 2025.',
      },
      {
        t: 'BRICS Business Incubator',
        meta: 'In-person programme 2027–2028',
        d: 'Prepared the application to the Brazilian Ministry of Tourism for grant support of the in-person programme.',
      },
      {
        t: 'Cifrex',
        meta: 'Unmanned aerial systems',
        d: 'Translated product documentation into Portuguese for the UAV 30E, 45 and 440M aircraft and the Droneport complex.',
      },
    ],
  },

  career: {
    n: '05',
    kicker: 'Experience and education',
    title: 'Chronology',
    jobsTitle: 'Experience',
    jobs: [
      {
        org: 'Consult Invest ITIC',
        note: 'International trade, investment and consulting company',
        period: 'August 2025 — present',
        role: 'Country Manager, Russia',
        sub: 'Legally appointed general director from January 2026 · manager of international commercial projects, August — December 2025',
        b: [
          'Head of the Russian practice of a company present in six countries across BRICS, the SCO and the GCC. Responsible for client acquisition, project delivery and engagement with government bodies across Russia and the CIS.',
          'Closed a documentation gap inherited from previous management: prepared the agency agreement and completion act for the launch of the Shenzhen office, working directly with source documents in Chinese and English.',
          'Built the HR administration and compliance system from scratch — internal labour regulations, employment contracts, occupational safety documentation — and onboarded new staff under it.',
          'Represent the company at closed business events: Greenwood Business Park, the Atlanty club, partner forums.',
        ],
      },
      {
        org: 'Financial adviser',
        note: 'Personal financial planning and investment consulting',
        period: 'August 2024 — December 2025',
        role: 'Private practice',
        b: [
          'Advised 20 clients: individual financial plans covering goal setting, emergency fund formation — 100% of clients reached their target reserve — budget optimisation and debt reduction.',
          'Built diversified portfolios on portfolio-theory principles, including a gold allocation. Average client return of +5% in 2025 against a declining Russian equity market.',
          'Structured long-term savings through unit-linked insurance products and short-term growth instruments — money market funds and bonds.',
        ],
      },
      {
        org: 'Attaché and interpreter',
        note: 'International forums in Moscow',
        period: 'April 2024 — April 2025',
        role: 'Brazilian delegation',
        b: [
          'Attaché to the Brazilian delegation at Roscongress and MGIMO events, BRICS Working Group.',
          'Consecutive interpreter at the II International Anti-Fascist Forum, April 2025, 91 countries.',
        ],
      },
    ],
    eduTitle: 'Education',
    edu: [
      {
        org: 'MGIMO University',
        period: '2026 — 2028',
        role: 'MA, Economics',
        d: 'Specialisation: international financial analysis, accounting and audit.',
      },
      {
        org: 'MGIMO University',
        period: '2022 — 2026',
        role: 'BA, International Relations, with honours',
        d: 'Degree with foreign languages: Portuguese as first language, English as second. Thesis: “Brazilian economic diplomacy as an instrument for advancing and implementing foreign policy objectives in Latin America”.',
      },
      {
        org: 'Federal University of Minas Gerais (UFMG)',
        period: 'July 2025',
        role: 'Summer school in Brazilian studies',
        d: 'Intensive programme at one of Brazil’s three leading universities, advanced Portuguese stream.',
      },
    ],
    langTitle: 'Languages',
    langs: [
      { l: 'Russian', v: 'native' },
      { l: 'Portuguese', v: 'C1 — diplomatic, legal and commercial registers' },
      { l: 'English', v: 'C1 — full professional proficiency' },
      { l: 'Spanish', v: 'B1 — working proficiency' },
    ],
    skillTitle: 'Skills',
    skills: [
      { k: 'Business development', v: 'Lead generation, pipeline management, B2B sales, outreach campaigns' },
      { k: 'Market entry', v: 'Market research, financial modelling, competitive analysis, entry strategy' },
      { k: 'International affairs', v: 'Diplomatic protocol, government relations, multilateral negotiation' },
      { k: 'Project management', v: 'Turnkey event delivery, cross-functional coordination, contractor management, tight deadlines' },
      { k: 'Financial analysis', v: 'Corporate finance, unit economics, financial reporting, investment portfolio construction' },
      { k: 'Contract work', v: 'Commercial proposals, service agreements, agency agreements, closing and source documents' },
    ],
  },

  contact: {
    n: '06',
    kicker: 'Contact',
    title: 'Open to a brief or a position',
    d: 'I reply personally. For an international project, lead with the substance, the country and the timeline — that will be quickest.',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    tgLabel: 'Telegram',
    cityLabel: 'Based in',
    city: 'Moscow, Russia',
    note: 'References and supporting materials available on request.',
  },

  footer: {
    rights: 'Evgeny Shutov. All rights reserved.',
    navTitle: 'Sections',
    contactTitle: 'Contact',
  },
};
