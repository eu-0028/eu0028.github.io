// Содержание сайта. Факты и цифры взяты из резюме Евгения Шутова.
// Ничего не выдумано: если данных нет, поля нет.

export const shared = {
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
  altHref: 'en/index.html',
  homeHref: '/',
  title: 'Евгений Шутов. Международные проекты и делегации, португальский C1',
  description:
    'Специалист-международник по странам БРИКС и Латинской Америке. Английский C2, португальский C1. Сопровождение иностранных делегаций, организация международных мероприятий, договоры и отчетность по государственным контрактам.',
  ogLocale: 'ru_RU',

  brand: 'Шутов',
  skip: 'Перейти к содержанию',
  menu: 'Меню',
  close: 'Закрыть',
  cvLabel: 'Резюме PDF',

  nav: [
    { href: '#about', label: 'О себе', n: '1' },
    { href: '#practice', label: 'Направления', n: '2' },
    { href: '#work', label: 'Проекты', n: '3' },
    { href: '#geo', label: 'География', n: '4' },
    { href: '#current', label: '2026', n: '5' },
    { href: '#contact', label: 'Контакты', n: '6' },
  ],

  hero: {
    name: 'Евгений Шутов',
    eyebrow: 'Евгений Шутов',
    lead: 'Отвечаю за то, чтобы международный проект',
    leadEm: 'состоялся',
    leadTail: '',
    para:
      'Веду переговоры на трех языках и решаю задачи бизнеса под ключ. Работаю со странами БРИКС и Латинской Америкой.',
    ctaPrimary: 'Написать',
    ctaSecondary: 'Смотреть проекты',
    portraitAlt: 'Евгений Шутов',
  },

  figures: {
    eyebrow: 'Итоги в цифрах',
    items: [
      { value: '15', unit: 'млн ₽', label: 'Суммарная выручка по проектам за 2025 год' },
      { value: '50', unit: 'млн ₽', label: 'Прошло через договоры и отчетность, которые я вел' },
      { value: '13', unit: 'стран', label: 'С представителями которых работал лично' },
      { value: '5', unit: 'мероприятий', label: 'Крупных международных, суммарно больше 200 участников' },
    ],
  },

  work: {
    n: '3',
    kicker: 'Проекты',
    title: 'Что сделано',
    items: [
      {
        t: 'Интервидение-2025',
        img: 'work-intervision.jpg',
        imgAlt: 'Делегации на «Интервидении-2025»',
        sub: 'Международный музыкальный конкурс',
        meta: 'август—сентябрь 2025 · Live Arena, Москва',
        role: 'Проектный менеджер национальных делегаций',
        d: 'Пришел на проект меньше чем за месяц до конкурса как специалист со знанием португальского языка. Конкурс проводился по указу Президента при поддержке МИД России, зал на 20 000 мест.',
        b: [
          'Пять национальных делегаций общей численностью 45 человек: Бразилия, Мадагаскар, Кения, Эфиопия, ОАЭ.',
          'Договоры соорганизатора с правительствами стран, визовая поддержка, размещение, транспорт и десятидневная программа пребывания.',
          'Отобрал и курировал пять атташе делегаций, по одному на страну.',
          'Всю работу с бразильской стороной вел на португальском: артист, продюсерская команда, телевещатель, министерство культуры.',
          'Самостоятельно организовал трансляцию конкурса на бразильском телевидении. Подготовил и перевел пакет документов для вещателя: устав организации, кадровые документы, соглашения и меморандумы.',
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
        sub: 'Государственный контракт: отчетность и финансовый аудит',
        meta: 'сентябрь—декабрь 2025 · программа в Омске',
        role: 'Руководитель отчетности по государственному контракту',
        d: 'Заказчик — Дирекция Всемирного фестиваля молодежи. Программа прошла 19–23 августа 2025 года, в ней участвовали больше 100 человек из всех десяти государств — членов ШОС.',
        b: [
          'Итоговый отчет больше чем на 3 000 страниц: собрал, структурировал и оформил учебные материалы по 25 воркшоп-сессиям.',
          'Конспекты и раздаточные материалы примерно для 12 сессий написал с нуля, потому что исходных материалов не существовало.',
          'Единолично вел финансовую отчетность: сверил около 10 договоров с подрядчиками по переводу, кейтерингу, персоналу и логистике.',
          'Согласовал корректировки документов с поставщиками и подготовил полностью сбалансированный отчет о расходах на 9 млн рублей с первичными документами и внутренними приказами.',
        ],
        m: [
          { v: '3 000+', l: 'страниц отчета' },
          { v: '9 млн ₽', l: 'сведено в отчете' },
          { v: '25', l: 'воркшоп-сессий' },
          { v: '10', l: 'государств ШОС' },
        ],
      },
      {
        t: 'Russia Bridge Program',
        img: 'work-bridge.jpg',
        imgAlt: 'Russia Bridge Program, Москва',
        sub: 'Первая российско-саудовская программа бизнес-акселерации',
        meta: 'ноябрь—декабрь 2025 · Москва',
        role: 'Соорганизатор',
        d: 'Программа прошла 4–5 декабря 2025 года, в ней участвовали больше 60 человек. Открывали ее председатель Комитета Государственной Думы по международным делам Леонид Слуцкий и посол Саудовской Аравии.',
        b: [
          'Продажи и привлечение: около 200 звонков и порядка 1 000 показов в Telegram и в интернете.',
          'Привлек 30 платных участников и организовал 15 деловых встреч между российскими и иностранными компаниями.',
          'Отобрал 9 российских проектов для питч-сессии; три из них получили прямую инвестиционную поддержку и освобождение от платы за коммерческую лицензию от венчурного фонда Value Makers Studio.',
          'Согласовал договоры по площадке и проживанию с московскими отелями и добился ставок ниже рыночных и дополнительных скидок.',
          'Настроил прием платежей, подготовил шаблоны коммерческих предложений и договоры оказания услуг.',
          'Вел всю переписку и переговоры с приехавшей саудовской делегацией на английском языке.',
        ],
        m: [
          { v: '60+', l: 'участников' },
          { v: '30', l: 'платных участников' },
          { v: '15', l: 'деловых встреч' },
          { v: '3', l: 'проекта с инвестициями' },
        ],
      },
      {
        t: 'RAKEZ',
        img: 'work-rakez.jpg',
        imgAlt: 'Работа по проекту RAKEZ',
        sub: 'Экономическая зона Рас-эль-Хайма, ОАЭ · рынки России и СНГ',
        meta: 'январь—май 2026',
        role: 'Привлечение клиентов и единая точка контакта',
        d: 'Отвечал за привлечение клиентов на рынках России и СНГ для свободной экономической зоны ОАЭ и был единой точкой контакта для всех российских и СНГ-контрагентов от лица RAKEZ.',
        b: [
          'Охватил около 677 предприятий в России, Узбекистане и Казахстане при плане 300-400 за три месяца.',
          'Получил около 313 откликов с первичным интересом при плановом показателе 300.',
          'Разработал и провел кампанию холодных продаж: 512 отобранных предприятий, около 275 содержательных ответов.',
          'Выстроил отдельную базу клиентов по каждой из трех стран.',
          'Довел трех потенциальных клиентов до предварительного коммерческого расчета через ознакомительные звонки; вел шесть теплых контактов, включая AKFA Group из Узбекистана, где работает больше 30 000 человек.',
        ],
        m: [
          { v: '677', l: 'предприятий охвачено' },
          { v: '313', l: 'откликов при плане 300' },
          { v: '275', l: 'содержательных ответов' },
          { v: '6', l: 'теплых контактов' },
        ],
      },
      {
        t: 'AGORA Global Business Club',
        img: 'work-agora.jpg',
        imgAlt: 'Форум AGORA, отель Soluxe',
        sub: 'Международный деловой форум',
        meta: 'январь—апрель 2026 · отель Soluxe, Москва',
        role: 'Руководитель продаж форума',
        d: 'Руководил продажами международного делового форума 25–26 апреля 2026 года со стороны Consult Invest ITIC как партнера-исполнителя AGORA.',
        b: [
          'Вел всю переписку и общение с иностранными гостями на английском языке, включая индийскую и южноафриканскую делегации.',
          'Нашел четырех заинтересованных предпринимателей на площадке форума.',
          'Форум освещали «Россия-1», НТВ и RuNews24.',
        ],
        m: [
          { v: '2', l: 'иностранные делегации' },
          { v: '4', l: 'заинтересованных клиента' },
          { v: '3', l: 'федеральных СМИ' },
        ],
      },
    ],
  },

  practice: {
    n: '2',
    kicker: 'Направления',
    title: 'Что я делаю',
    intro: 'Пять направлений. По каждому есть законченные проекты, они разобраны ниже',
    items: [
      {
        t: 'Сопровождение иностранных делегаций',
        icon: 'users-three',
        d: 'От первого письма в министерство до отъезда группы.',
        b: ['Договоры соорганизатора с правительствами стран', 'Визовая поддержка, размещение, транспорт', 'Программа пребывания делегации', 'Подбор и кураторство атташе', 'Работа с посольствами и государственными ведомствами'],
      },
      {
        t: 'Организация международных мероприятий',
        icon: 'microphone-stage',
        d: 'Форумы, конкурсы и акселерационные программы целиком.',
        b: ['Деловая программа и спикеры', 'Продажи и набор участников', 'Площадка, проживание, подрядчики', 'Прием платежей и договорная база'],
      },
      {
        t: 'Договоры, закупки и отчетность',
        icon: 'file-text',
        d: 'Документы проекта, вплоть до отчета по государственному контракту.',
        b: ['Отчетность по государственным контрактам', 'Сверка договоров с подрядчиками и первичных документов', 'Агентские договоры, акты, коммерческие предложения', 'Кадровое делопроизводство и комплаенс'],
      },
      {
        t: 'Развитие бизнеса и выход на рынки',
        icon: 'trend-up',
        d: 'Привлечение клиентов на рынках России и СНГ с измеримыми показателями.',
        b: ['Лидогенерация и холодные продажи', 'База клиентов по странам', 'Исследование рынка и конкурентный анализ', 'Финансовое моделирование и юнит-экономика'],
      },
      {
        t: 'Перевод и языковое сопровождение',
        icon: 'translate',
        d: 'Португальский и английский в дипломатической, юридической, коммерческой и технической лексике.',
        b: ['Последовательный перевод на форумах', 'Перевод договоров, регламентов и уставных документов', 'Техническая документация', 'Деловая и дипломатическая переписка'],
      },
    ],
  },

  geo: {
    n: '4',
    kicker: 'География',
    title: 'С кем я работал',
    intro: 'Двенадцать стран, с представителями которых были проекты, переговоры или делегации. Номера на карте совпадают с номерами в списке',
    items: [
      { key: 'Brazil', flag: 'br', name: 'Бразилия', note: 'Делегация «Интервидения», трансляция на бразильском телевидении, фестиваль молодежи' },
      { key: 'Russia', flag: 'ru', name: 'Россия', note: 'База, Москва. Российское направление Consult Invest ITIC, форумы и государственные контракты' },
      { key: 'United Arab Emirates', flag: 'ae', name: 'ОАЭ', note: 'Делегация «Интервидения-2025»; экономическая зона Рас-эль-Хайма' },
      { key: 'Saudi Arabia', flag: 'sa', name: 'Саудовская Аравия', note: 'Russia Bridge Program, «Интервидение-2026» в Эр-Рияде' },
      { key: 'Ethiopia', flag: 'et', name: 'Эфиопия', note: 'Делегация «Интервидения-2025»' },
      { key: 'Kenya', flag: 'ke', name: 'Кения', note: 'Делегация «Интервидения-2025»' },
      { key: 'Madagascar', flag: 'mg', name: 'Мадагаскар', note: 'Делегация «Интервидения-2025»' },
      { key: 'China', flag: 'cn', name: 'Китай', note: 'Документы по запуску офиса в Шэньчжэне' },
      { key: 'Uzbekistan', flag: 'uz', name: 'Узбекистан', note: 'Привлечение клиентов для RAKEZ, работа с AKFA Group' },
      { key: 'Kazakhstan', flag: 'kz', name: 'Казахстан', note: 'Привлечение клиентов для RAKEZ' },
      { key: 'India', flag: 'in', name: 'Индия', note: 'Делегация форума AGORA' },
      { key: 'South Africa', flag: 'za', name: 'ЮАР', note: 'Делегация форума AGORA' },
    ],
  },

  current: {
    n: '5',
    kicker: 'В работе сейчас',
    title: '2026 год',
    intro: 'Проекты, которые веду прямо сейчас',
    items: [
      {
        t: 'Международный фестиваль молодежи 2026',
        meta: 'Екатеринбург · 11–17 сентября 2026',
        d: 'Координирую делегацию Бразилии в детской программе фестиваля: 10 000 участников из 191 страны, из них 1 000 подростков от 14 до 17 лет. Веду всю переписку с бразильской стороной на португальском, собираю и проверяю документы участников, отвечаю за логистику и сопровождение группы в России.',
      },
      {
        t: '«Наше поколение» 2026',
        meta: 'Международный детский музыкальный конкурс',
        d: 'Перевел на португальский язык весь пакет конкурсных документов: регламент, брифинг для делегаций, анкету участника и требования к конкурсным номерам. Договорился об участии бразильского члена жюри и подобрал исполнителя, который представит страну в финале.',
      },
      {
        t: 'Интервидение-2026',
        meta: 'Эр-Рияд, Саудовская Аравия · декабрь 2026',
        d: 'Занимаюсь организацией конкурса. В 2025 году провел на нем делегации пяти стран.',
      },
    ],
  },

  about: {
    n: '1',
    kicker: 'О себе',
    title: 'Как это выглядит на практике',
    paras: [
      'Я международник со специализацией на Латинской Америке. С бразильской стороной работаю на португальском, без переводчика.',
      'Проект обычно выглядит так. Из другой страны приезжает делегация, и кто-то должен договориться с ее правительством, оформить визы, поселить людей и провести программу на десять дней. Потом кто-то должен собрать договоры с подрядчиками, свести расходы и сдать отчет так, чтобы его принял государственный заказчик. Обе части делаю я.',
    ],
    langTitle: 'Языки',
    langs: [
      { flag: 'gb', l: 'Английский', cap: 'C2', lvl: 4 },
      { flag: 'br', l: 'Португальский', cap: 'C1', lvl: 3 },
      { flag: 'es', l: 'Испанский', cap: 'B1', lvl: 2 },
    ],
    eduTitle: 'Образование',
    edu: [
      {
        org: 'МГИМО МИД России',
        logo: 'mgimo.svg',
        tracks: [
          { period: '2022-2026', role: 'Бакалавриат, «Международные отношения», с отличием' },
          { period: '2026-2028', role: 'Магистратура, «Экономика»' },
        ],
      },
    ],
  },

  contact: {
    n: '6',
    kicker: 'Контакты',
    title: 'Открыт к предложениям',
    d: 'Пишите в Telegram или на почту. Отвечаю сам.',
    emailLabel: 'Почта',
    tgLabel: 'Telegram',
  },

  footer: {
    rights: 'Евгений Шутов. Все права защищены.',
    navTitle: 'Разделы',
    contactTitle: 'Связь',
    tagline: 'Международник',
  },
};

export const en = {
  lang: 'en',
  dir: 'ltr',
  altLang: 'ru',
  altLabel: 'Русский',
  altHref: '../index.html',
  homeHref: '/en/',
  title: 'Evgeny Shutov. International projects and delegations, Portuguese at C1',
  description:
    'International affairs specialist for BRICS and Latin America. English at C2, Portuguese at C1. Foreign delegations, international event management, contracts and state-contract reporting.',
  ogLocale: 'en_US',

  brand: 'Shutov',
  skip: 'Skip to content',
  menu: 'Menu',
  close: 'Close',
  cvLabel: 'CV in PDF',

  nav: [
    { href: '#about', label: 'About', n: '1' },
    { href: '#practice', label: 'Practice', n: '2' },
    { href: '#work', label: 'Projects', n: '3' },
    { href: '#geo', label: 'Geography', n: '4' },
    { href: '#current', label: '2026', n: '5' },
    { href: '#contact', label: 'Contact', n: '6' },
  ],

  hero: {
    name: 'Evgeny Shutov',
    eyebrow: 'Evgeny Shutov',
    lead: 'I make international projects',
    leadEm: 'actually happen',
    leadTail: '',
    para:
      'I negotiate in three languages and take business problems through to a finished result. I work with BRICS countries and Latin America.',
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'See the projects',
    portraitAlt: 'Evgeny Shutov',
  },

  figures: {
    eyebrow: 'The numbers',
    items: [
      { value: '15', unit: 'mln RUB', label: 'Total project revenue in 2025' },
      { value: '50', unit: 'mln RUB', label: 'Passed through the contracts and reporting I handled' },
      { value: '13', unit: 'countries', label: 'Whose representatives I have worked with in person' },
      { value: '5', unit: 'events', label: 'Major international ones, more than 200 participants in total' },
    ],
  },

  work: {
    n: '3',
    kicker: 'Projects',
    title: 'What has been delivered',
    items: [
      {
        t: 'Intervision 2025',
        img: 'work-intervision.jpg',
        imgAlt: 'Delegations at Intervision 2025',
        sub: 'International music contest',
        meta: 'August-September 2025 · Live Arena, Moscow',
        role: 'Project manager, national delegations',
        d: 'I joined the project less than a month before the contest as a Portuguese-speaking specialist. The contest was held under presidential decree with the support of the Russian Foreign Ministry, in a 20,000-seat arena.',
        b: [
          'Five national delegations totalling 45 people: Brazil, Madagascar, Kenya, Ethiopia and the UAE.',
          'Co-organiser agreements with national governments, visa support, accommodation, transport and a ten-day visit programme.',
          'Selected and supervised five delegation attachés, one per country.',
          'Conducted all work with the Brazilian side in Portuguese: the artist, the production team, the broadcaster and the ministry of culture.',
          'Arranged the broadcast of the contest on Brazilian television single-handedly. Prepared and translated the broadcaster’s document package: the organisation’s charter, HR documents, agreements and memoranda.',
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
        sub: 'State contract: reporting and financial audit',
        meta: 'September-December 2025 · programme held in Omsk',
        role: 'Head of reporting under the state contract',
        d: 'Client: the Directorate of the World Youth Festival. The programme ran on 19-23 August 2025, with more than 100 participants from all ten SCO member states.',
        b: [
          'Final report of more than 3,000 pages: collected, structured and formatted training materials across 25 workshop sessions.',
          'Wrote summaries and handouts for roughly 12 sessions from scratch, because no source materials existed.',
          'Handled financial reporting single-handedly: reconciled around 10 contractor agreements covering interpreters, catering, staff and logistics.',
          'Agreed document corrections with suppliers and produced a fully balanced expense report of 9 million roubles, backed by source documents and internal orders.',
        ],
        m: [
          { v: '3,000+', l: 'pages of report' },
          { v: '9 mln RUB', l: 'reconciled' },
          { v: '25', l: 'workshop sessions' },
          { v: '10', l: 'SCO member states' },
        ],
      },
      {
        t: 'Russia Bridge Program',
        img: 'work-bridge.jpg',
        imgAlt: 'Russia Bridge Program, Moscow',
        sub: 'First Russian-Saudi business acceleration programme',
        meta: 'November-December 2025 · Moscow',
        role: 'Co-organiser',
        d: 'The programme ran on 4-5 December 2025 with more than 60 participants. It was opened by Leonid Slutsky, Chairman of the State Duma Committee on International Affairs, and the Ambassador of Saudi Arabia.',
        b: [
          'Sales and outreach: around 200 calls and some 1,000 impressions across Telegram and the web.',
          'Brought in 30 paying participants and arranged 15 business meetings between Russian and foreign companies.',
          'Selected 9 Russian projects for the pitch session; three received direct investment support and a commercial licence fee waiver from the venture fund Value Makers Studio.',
          'Negotiated venue and accommodation contracts with Moscow hotels, securing below-market rates and additional discounts.',
          'Set up payment processing and prepared commercial proposal templates and service agreements.',
          'Handled all correspondence and negotiation with the visiting Saudi delegation in English.',
        ],
        m: [
          { v: '60+', l: 'participants' },
          { v: '30', l: 'paying participants' },
          { v: '15', l: 'business meetings' },
          { v: '3', l: 'projects funded' },
        ],
      },
      {
        t: 'RAKEZ',
        img: 'work-rakez.jpg',
        imgAlt: 'RAKEZ project work',
        sub: 'Ras Al Khaimah Economic Zone, UAE · Russia and CIS markets',
        meta: 'January-May 2026',
        role: 'Client acquisition and single point of contact',
        d: 'Responsible for client acquisition across Russia and the CIS for the UAE free economic zone, and the single point of contact for all Russian and CIS counterparties on behalf of RAKEZ.',
        b: [
          'Reached around 677 companies across Russia, Uzbekistan and Kazakhstan against a plan of 300-400 over three months.',
          'Generated around 313 responses expressing initial interest against a target of 300.',
          'Designed and ran a cold outreach campaign: 512 selected companies, around 275 substantive replies.',
          'Built a separate client base for each of the three countries.',
          'Advanced three prospects to preliminary quotation through discovery calls; maintained six warm contacts, including AKFA Group in Uzbekistan, which has more than 30,000 employees.',
        ],
        m: [
          { v: '677', l: 'companies reached' },
          { v: '313', l: 'responses vs target 300' },
          { v: '275', l: 'substantive replies' },
          { v: '6', l: 'warm contacts' },
        ],
      },
      {
        t: 'AGORA Global Business Club',
        img: 'work-agora.jpg',
        imgAlt: 'AGORA forum, Soluxe Hotel',
        sub: 'International business forum',
        meta: 'January-April 2026 · Soluxe Hotel, Moscow',
        role: 'Head of forum sales',
        d: 'Led sales for the international business forum of 25-26 April 2026 on behalf of Consult Invest ITIC, AGORA’s delivery partner.',
        b: [
          'Handled all correspondence and communication with foreign guests in English, including the Indian and South African delegations.',
          'Found four interested entrepreneurs at the forum itself.',
          'The forum was covered by Rossiya-1, NTV and RuNews24.',
        ],
        m: [
          { v: '2', l: 'foreign delegations' },
          { v: '4', l: 'interested clients' },
          { v: '3', l: 'federal media outlets' },
        ],
      },
    ],
  },

  practice: {
    n: '2',
    kicker: 'Practice',
    title: 'What I do',
    intro: 'Five areas. Each has completed projects behind it, set out below',
    items: [
      {
        t: 'Running foreign delegations',
        icon: 'users-three',
        d: 'From the first letter to a ministry through to the group’s departure.',
        b: ['Co-organiser agreements with national governments', 'Visa support, accommodation, transport', 'The delegation’s visit programme', 'Selecting and supervising attachés', 'Work with embassies and government agencies'],
      },
      {
        t: 'International event management',
        icon: 'microphone-stage',
        d: 'Forums, contests and acceleration programmes, end to end.',
        b: ['Business programme and speakers', 'Sales and participant recruitment', 'Venue, accommodation, contractors', 'Payment processing and contract base'],
      },
      {
        t: 'Contracts, procurement and reporting',
        icon: 'file-text',
        d: 'Project paperwork, up to the final report under a state contract.',
        b: ['Reporting under state contracts', 'Reconciliation of contractor agreements and source documents', 'Agency agreements, acts, commercial proposals', 'HR administration and compliance'],
      },
      {
        t: 'Business development and market entry',
        icon: 'trend-up',
        d: 'Client acquisition across Russia and the CIS against measurable targets.',
        b: ['Lead generation and cold outreach', 'Client base built per country', 'Market research and competitive analysis', 'Financial modelling and unit economics'],
      },
      {
        t: 'Translation and language support',
        icon: 'translate',
        d: 'Portuguese and English across diplomatic, legal, commercial and technical vocabulary.',
        b: ['Consecutive interpreting at forums', 'Translation of contracts, regulations and statutory documents', 'Technical documentation', 'Business and diplomatic correspondence'],
      },
    ],
  },

  geo: {
    n: '4',
    kicker: 'Geography',
    title: 'Who I have worked with',
    intro: 'Twelve countries whose representatives I have worked with on projects, negotiations or delegations. The numbers on the map match the numbers in the list',
    items: [
      { key: 'Brazil', flag: 'br', name: 'Brazil', note: 'Intervision delegation, the Brazilian television broadcast, the youth festival' },
      { key: 'Russia', flag: 'ru', name: 'Russia', note: 'Base, Moscow. The Russian practice of Consult Invest ITIC, forums and state contracts' },
      { key: 'United Arab Emirates', flag: 'ae', name: 'UAE', note: 'Intervision 2025 delegation; Ras Al Khaimah Economic Zone' },
      { key: 'Saudi Arabia', flag: 'sa', name: 'Saudi Arabia', note: 'Russia Bridge Program, Intervision 2026 in Riyadh' },
      { key: 'Ethiopia', flag: 'et', name: 'Ethiopia', note: 'Intervision 2025 delegation' },
      { key: 'Kenya', flag: 'ke', name: 'Kenya', note: 'Intervision 2025 delegation' },
      { key: 'Madagascar', flag: 'mg', name: 'Madagascar', note: 'Intervision 2025 delegation' },
      { key: 'China', flag: 'cn', name: 'China', note: 'Documentation for the launch of the Shenzhen office' },
      { key: 'Uzbekistan', flag: 'uz', name: 'Uzbekistan', note: 'Client acquisition for RAKEZ, work with AKFA Group' },
      { key: 'Kazakhstan', flag: 'kz', name: 'Kazakhstan', note: 'Client acquisition for RAKEZ' },
      { key: 'India', flag: 'in', name: 'India', note: 'AGORA forum delegation' },
      { key: 'South Africa', flag: 'za', name: 'South Africa', note: 'AGORA forum delegation' },
    ],
  },

  current: {
    n: '5',
    kicker: 'Currently running',
    title: 'The 2026 slate',
    intro: 'Projects I am running right now',
    items: [
      {
        t: 'International Youth Festival 2026',
        meta: 'Yekaterinburg · 11-17 September 2026',
        d: 'Coordinating the Brazilian delegation within the festival’s children’s programme: 10,000 participants from 191 countries, including 1,000 teenagers aged 14 to 17. All correspondence with the Brazilian side in Portuguese, collection and verification of participant documents, logistics and accompaniment of the group in Russia.',
      },
      {
        t: 'Our Generation 2026',
        meta: 'International children’s music contest',
        d: 'Translated the full package of competition documents into Portuguese: regulations, delegation briefing, participant form and performance requirements. Secured the participation of a Brazilian jury member and selected the performer who will represent the country in the final.',
      },
      {
        t: 'Intervision 2026',
        meta: 'Riyadh, Saudi Arabia · December 2026',
        d: 'Working on the organisation of the contest. In 2025 I ran five national delegations through it.',
      },
    ],
  },

  about: {
    n: '1',
    kicker: 'About',
    title: 'What this looks like in practice',
    paras: [
      'I am an international affairs specialist focused on Latin America. With the Brazilian side I work in Portuguese, without an interpreter.',
      'A project usually looks like this. A delegation arrives from another country, and someone has to reach an agreement with its government, arrange visas, house the group and run a ten-day programme. Then someone has to gather the contractor agreements, reconcile the spending and file a report the state client will accept. I do both halves.',
    ],
    langTitle: 'Languages',
    langs: [
      { flag: 'gb', l: 'English', cap: 'C2', lvl: 4 },
      { flag: 'br', l: 'Portuguese', cap: 'C1', lvl: 3 },
      { flag: 'es', l: 'Spanish', cap: 'B1', lvl: 2 },
    ],
    eduTitle: 'Education',
    edu: [
      {
        org: 'MGIMO University',
        logo: 'mgimo.svg',
        tracks: [
          { period: '2022-2026', role: 'BA, International Relations, with honours' },
          { period: '2026-2028', role: 'MA, Economics' },
        ],
      },
    ],
  },

  contact: {
    n: '6',
    kicker: 'Contact',
    title: 'Open to offers',
    d: 'Write to me on Telegram or by email. I reply myself.',
    emailLabel: 'Email',
    tgLabel: 'Telegram',
  },

  footer: {
    rights: 'Evgeny Shutov. All rights reserved.',
    navTitle: 'Sections',
    contactTitle: 'Contact',
    tagline: 'International affairs',
  },
};
