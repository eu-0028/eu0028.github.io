/* Генерирует карту мира: assets/map-base.svg + src/map.generated.mjs с контурами
   стран проектов и точками подписей.

   Источник — Natural Earth, набор границ по позиции России:
   ne_10m_admin_0_countries_rus.geojson из github.com/nvkelso/natural-earth-vector.
   В нем Крым отнесен к России, Косово входит в Сербию, Тайвань — в Китай.
   Донбасс лежит в наборе отдельными безымянными полигонами, здесь он отходит
   России (см. DONBASS ниже).

   Запуск: node tools/genmap.mjs <путь-к-ne_10m_admin_0_countries_rus.geojson>
   Результат коммитится, при обычной сборке ничего не качается. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const geo = JSON.parse(readFileSync(process.argv[2], 'utf8'));

/* Страны, где Евгений вел проекты (по резюме) */
const MARKED = new Map([
  ['Brazil', ['Бразилия', 'Brazil']],
  ['Russia', ['Россия', 'Russia']],
  ['China', ['Китай', 'China']],
  ['India', ['Индия', 'India']],
  ['Kenya', ['Кения', 'Kenya']],
  ['Ethiopia', ['Эфиопия', 'Ethiopia']],
  ['Madagascar', ['Мадагаскар', 'Madagascar']],
  ['United Arab Emirates', ['ОАЭ', 'UAE']],
  ['Saudi Arabia', ['Саудовская Аравия', 'Saudi Arabia']],
  ['Uzbekistan', ['Узбекистан', 'Uzbekistan']],
  ['Kazakhstan', ['Казахстан', 'Kazakhstan']],
  ['South Africa', ['ЮАР', 'South Africa']],
]);

const SKIP = new Set(['Antarctica', 'Fr. S. and Antarctic Lands']);

/* Донецк и Луганск лежат в наборе отдельными полигонами без названия.
   Отдаем их России: рамки по долготе и широте покрывают оба и не задевают
   остальные безымянные куски набора (Карабах, Парасельские острова, мелочь). */
const DONBASS = { lon: [37.0, 40.2], lat: [46.8, 48.9] };

/* Кадрируем по долготе: слева обрезаем пустую часть Тихого океана, справа
   доводим до 180-го меридиана, иначе за краем остается Новая Зеландия. */
const W = 1200, LON_MIN = -100, LON_MAX = 181, LAT_TOP = 78, LAT_BOT = -50, TOL = 0.75;
const LON_SPAN = LON_MAX - LON_MIN;
const millerY = (lat) => 1.25 * Math.log(Math.tan(Math.PI / 4 + (0.4 * lat * Math.PI) / 180));
const yTop = millerY(LAT_TOP), yBot = millerY(LAT_BOT);
const pxPerRad = W / ((LON_SPAN * Math.PI) / 180);
const H = Math.round(pxPerRad * (yTop - yBot));
const WRAP = (360 / LON_SPAN) * W;

const project = (lon, lat) => [
  ((lon - LON_MIN) / LON_SPAN) * W,
  ((yTop - millerY(Math.max(LAT_BOT, Math.min(LAT_TOP, lat)))) / (yTop - yBot)) * H,
];

const polysOf = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []);

const bboxOf = (g) => {
  const b = [180, 90, -180, -90];
  for (const poly of polysOf(g)) for (const ring of poly) for (const [x, y] of ring) {
    if (x < b[0]) b[0] = x;
    if (y < b[1]) b[1] = y;
    if (x > b[2]) b[2] = x;
    if (y > b[3]) b[3] = y;
  }
  return b;
};

/* Упрощение Дугласа — Пекера в экранных координатах */
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const sqTol = tol * tol;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxSq = 0, index = 0;
    const [ax, ay] = pts[first], [bx, by] = pts[last];
    const dx = bx - ax, dy = by - ay;
    const len = dx * dx + dy * dy;
    for (let i = first + 1; i < last; i++) {
      const [px, py] = pts[i];
      let t = len ? ((px - ax) * dx + (py - ay) * dy) / len : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const qx = ax + t * dx, qy = ay + t * dy;
      const sq = (px - qx) ** 2 + (py - qy) ** 2;
      if (sq > maxSq) { maxSq = sq; index = i; }
    }
    if (maxSq > sqTol) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

/* Сшиваем куски одной страны в общий контур ДО упрощения.

   Россия приходит из набора несколькими полигонами: страна, Крым, два куска
   Донбасса, острова. Упрощение Дугласа — Пекера смотрит на кольцо целиком,
   поэтому общий участок границы в контуре России и в контуре куска Донбасса
   прореживался по-разному, и на стыке у Азовского моря торчали заусенцы.

   Здесь общие ребра (одно и то же ребро есть у двух кусков) считаются
   внутренними и выбрасываются, а оставшиеся сшиваются в замкнутые кольца.
   Дальше упрощается уже единый контур, и стыков не остается. */
const vkey = (p) => p[0].toFixed(7) + ',' + p[1].toFixed(7);
const undirected = (a, b) => (a < b ? a + '|' + b : b + '|' + a);

function mergeRings(rings) {
  const asKeys = rings.map((r) => r.map(vkey));
  const count = new Map();          // ребро без направления -> сколько раз встретилось
  for (const ks of asKeys)
    for (let i = 0; i < ks.length; i++) {
      const k = undirected(ks[i], ks[(i + 1) % ks.length]);
      count.set(k, (count.get(k) || 0) + 1);
    }

  const next = new Map();           // вершина -> куда из нее можно уйти
  const coord = new Map();          // ключ вершины -> координаты
  let dropped = 0;
  rings.forEach((ring, ri) => {
    const ks = asKeys[ri];
    for (let i = 0; i < ks.length; i++) {
      const a = ks[i], b = ks[(i + 1) % ks.length];
      coord.set(a, ring[i]);
      if (count.get(undirected(a, b)) > 1) { dropped++; continue; }
      if (!next.has(a)) next.set(a, []);
      next.get(a).push(b);
    }
  });
  if (!dropped) return rings;       // куски не соприкасаются, сшивать нечего

  const out = [];
  for (const start of [...next.keys()]) {
    while ((next.get(start) || []).length) {
      const ring = [];
      let cur = start;
      for (let guard = 0; guard < 500000; guard++) {
        const list = next.get(cur);
        if (!list || !list.length) break;
        ring.push(coord.get(cur));
        cur = list.shift();
        if (cur === start) break;
      }
      if (ring.length > 2) out.push(ring);
    }
  }
  const left = [...next.values()].reduce((n, v) => n + v.length, 0);
  if (left) throw new Error(`Сшивка контура не завершена: осталось ${left} ребер`);
  return out;
}

/* Разворачиваем долготу: без этого полигоны, пересекающие 180-й меридиан
   (Россия, Фиджи), растягиваются полосами через всю карту. */
function unwrap(lonlat) {
  let off = 0;
  return lonlat.map(([lon, lat], i) => {
    if (i) {
      const prev = lonlat[i - 1][0];
      if (lon - prev > 180) off -= 360;
      else if (lon - prev < -180) off += 360;
    }
    return [lon + off, lat];
  });
}

/* Координаты округляем до десятых. На целых пикселях береговая линия России
   и кусков Донбасса округлялась по-разному, и на стыке лезли острые заусенцы. */
const r1 = (v) => Math.round(v * 10) / 10;

function ptsToD(pts) {
  let d = '', px = null, py = null;
  pts.forEach((p, i) => {
    const x = r1(p[0]), y = r1(p[1]);
    if (i && x === px && y === py) return;
    d += (i === 0 ? 'M' : 'L') + x + ' ' + y;
    px = x; py = y;
  });
  return d.length > 12 ? d + 'Z' : '';
}

/* Мелкие острова отбрасываем: на такой ширине они дают точку в один пиксель,
   зато утяжеляют файл. Порог в пикселях итоговой карты. */
const MIN_PX = 2.5;

function ringToPath(lonlat) {
  let pts = unwrap(lonlat).map(([lon, lat]) => project(lon, lat));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  if (maxX - minX < MIN_PX && Math.max(...ys) - Math.min(...ys) < MIN_PX) return '';
  if (maxX < -40 || minX > W + 40) return '';
  pts = simplify(pts, TOL);
  if (pts.length < 3) return '';
  let d = ptsToD(pts);
  if (!d) return '';
  /* Часть, ушедшая за край, дорисовывается с другой стороны карты */
  if (maxX > W) d += ptsToD(pts.map(([x, y]) => [x - WRAP, y]));
  if (minX < 0) d += ptsToD(pts.map(([x, y]) => [x + WRAP, y]));
  return d;
}

/* Центр подписи считаем по самому крупному кольцу через площадь (формула
   шнурков): среднее по вершинам уводит точку туда, где их гуще. */
function centroidOf(ring) {
  const u = unwrap(ring);
  let a2 = 0, sx = 0, sy = 0;
  for (let i = 0; i < u.length; i++) {
    const [x0, y0] = u[i], [x1, y1] = u[(i + 1) % u.length];
    const cross = x0 * y1 - x1 * y0;
    a2 += cross; sx += (x0 + x1) * cross; sy += (y0 + y1) * cross;
  }
  let lon, lat;
  if (Math.abs(a2) > 1e-9) { lon = sx / (3 * a2); lat = sy / (3 * a2); }
  else {
    lon = u.reduce((s, p) => s + p[0], 0) / u.length;
    lat = u.reduce((s, p) => s + p[1], 0) / u.length;
  }
  while (lon > 180) lon -= 360;
  while (lon < -180) lon += 360;
  const [cx, cy] = project(lon, lat);
  return [+((cx / W) * 100).toFixed(2), +((cy / H) * 100).toFixed(2)];
}

function polysToShape(polys) {
  let d = '', best = null, bestArea = 0;
  for (const ring of mergeRings(polys.flat())) {
    d += ringToPath(ring);
    const u = unwrap(ring);
    const lons = u.map((p) => p[0]), lats = u.map((p) => p[1]);
    const a = (Math.max(...lons) - Math.min(...lons)) * (Math.max(...lats) - Math.min(...lats));
    if (a > bestArea) { bestArea = a; best = ring; }
  }
  return { d, centre: best ? centroidOf(best) : null };
}

/* --- разбор набора ---------------------------------------- */

const byCountry = new Map();   // название -> список полигонов
const loose = [];              // безымянные куски, идущие в общий фон
const add = (name, polys) => {
  if (!byCountry.has(name)) byCountry.set(name, []);
  byCountry.get(name).push(...polys);
};
let donbass = 0;

for (const f of geo.features) {
  const name = f.properties && f.properties.NAME;
  if (name && SKIP.has(name)) continue;
  const polys = polysOf(f.geometry);
  if (!polys.length) continue;
  if (!name) {
    const [x0, y0, x1, y1] = bboxOf(f.geometry);
    if (x0 >= DONBASS.lon[0] && x1 <= DONBASS.lon[1] && y0 >= DONBASS.lat[0] && y1 <= DONBASS.lat[1]) {
      add('Russia', polys);
      donbass++;
    } else loose.push(...polys);
    continue;
  }
  add(name, polys);
}

if (donbass !== 2) throw new Error(`Донбасс: найдено полигонов ${donbass}, ожидалось 2`);

let base = '';
const marks = [];

for (const [name, polys] of byCountry) {
  const { d, centre } = polysToShape(polys);
  if (!d) continue;
  if (MARKED.has(name)) {
    const [ru, en] = MARKED.get(name);
    marks.push({ key: name, ru, en, centre, d });
  } else base += d;
}
for (const poly of loose) base += polysToShape([poly]).d;

const missing = [...MARKED.keys()].filter((k) => !marks.some((m) => m.key === k));
if (missing.length) throw new Error('Не найдены страны: ' + missing.join(', '));

/* Фон карты: все, кроме стран проектов. Отдается картинкой и кэшируется. */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="World map">
<style>
.l{fill:#e0e4ea;stroke:#cdd3db;stroke-width:.5}
@media (prefers-color-scheme:dark){.l{fill:#1c212b;stroke:#2a3140}}
</style>
<path class="l" d="${base}"/>
</svg>`;

mkdirSync('assets', { recursive: true });
writeFileSync('assets/map-base.svg', svg);

/* Страны проектов встраиваются в разметку: только так их можно поднимать курсором. */
writeFileSync(
  'src/map.generated.mjs',
  `/* Сгенерировано tools/genmap.mjs. Вручную не править. */
export const mapMeta = {
  w: ${W},
  h: ${H},
  ratio: ${(H / W).toFixed(4)},
  marks: ${JSON.stringify(marks)},
};
`
);

const kb = (n) => (n / 1024).toFixed(1) + ' КБ';
console.log(`assets/map-base.svg — ${kb(svg.length)}`);
console.log(`контуры стран в разметке — ${kb(marks.reduce((a, m) => a + m.d.length, 0))}, стран ${marks.length}`);
