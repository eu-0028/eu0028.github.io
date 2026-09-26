// Постоянные данные сайта. Меняются редко, поэтому лежат в коде, а не в админке.
export const company = {
  name: 'Consult Invest ITIC',
  legal: 'ООО «Международная торгово-инвестиционная компания «Консалт Инвест АйТиАйСи»',
  ids: 'ИНН 9723203351, КПП 772301001, ОГРН 1237700449953',
  address: '109380, г. Москва, ул. Чагинская, д. 4, стр. 13, пом. 14/4',
  email: 'info@consultinvestitic.com',
};

export const nav = [
  { href: '/#services', label: 'Услуги' },
  { href: '/projects/', label: 'Проекты' },
  { href: '/#events', label: 'Мероприятия' },
  { href: '/#offices', label: 'География' },
  { href: '/#founder', label: 'О компании' },
  { href: '/news/', label: 'Новости' },
];

// Страны, где реализованы проекты
export const projectCountries = ['Узбекистан', 'Казахстан', 'Кыргызстан', 'Китай', 'Индия', 'Пакистан', 'Ирак', 'Саудовская Аравия', 'ОАЭ'];

export const offices = [
  { city: 'Москва', country: 'Россия', tel: '+7 929 773-11-04', msg: ['WhatsApp', 'Telegram'] },
  { city: 'Ташкент', country: 'Узбекистан', tel: '+998 90 906-82-23', msg: ['WhatsApp', 'Telegram'] },
];

// Подпись группы («представители» или «партнеры») уточняется
export const representativesLabel = 'Представители';
export const representatives = [
  { country: 'Китай', city: 'Нанкин и Циндао', tel: '+86 133 6121 0641', msg: ['WeChat', 'WhatsApp'] },
  { country: 'Казахстан', city: '', tel: '+7 701 622-66-61', msg: ['WhatsApp', 'Telegram'] },
  { country: 'Кыргызстан', city: '', tel: '+996 505 500 900', msg: ['WhatsApp', 'Telegram'] },
  { country: 'Саудовская Аравия', city: '', tel: '', msg: ['WhatsApp'] },
];
