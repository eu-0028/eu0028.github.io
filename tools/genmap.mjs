/* Генерирует карту мира из TopoJSON: assets/map.svg + src/map.generated.mjs с точками подписей.
   Запуск: node tools/genmap.mjs <путь-к-countries-110m.json>
   Результат коммитится, при обычной сборке ничего не качается. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const topo = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const { scale, translate } = topo.transform;

/* Страны, где Евгений вёл проекты (по резюме) */
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

/* Кадрируем по долготе: все страны проектов лежат между -75 и 145,
   полный мир оставлял половину полотна пустым океаном. */
const W = 1200, LON_MIN = -100, LON_MAX = 158, LAT_TOP = 78, LAT_BOT = -50, TOL = 0.75;
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

function decodeArc(i) {
  const rev = i < 0;
  const arc = topo.arcs[rev ? ~i : i];
  let x = 0, y = 0;
  const pts = arc.map(([dx, dy]) => {
    x += dx; y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
  return rev ? pts.reverse() : pts;
}

const ringPoints = (idxs) => {
  const out = [];
  idxs.forEach((ai, k) => { const p = decodeArc(ai); out.push(...(k ? p.slice(1) : p)); });
  return out;
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

function ptsToD(pts) {
  let d = '', px = null, py = null;
  pts.forEach((p, i) => {
    const x = Math.round(p[0]), y = Math.round(p[1]);
    if (i && x === px && y === py) return;
    d += (i === 0 ? 'M' : 'L') + x + ' ' + y;
    px = x; py = y;
  });
  return d.length > 12 ? d + 'Z' : '';
}

function ringToPath(lonlat) {
  let pts = unwrap(lonlat).map(([lon, lat]) => project(lon, lat));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  if (maxX - minX < 2 && Math.max(...ys) - Math.min(...ys) < 2) return '';
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

function geomToPath(geom) {
  const polys = geom.type === 'Polygon' ? [geom.arcs] : geom.arcs;
  let d = '', best = null, bestArea = 0;
  for (const poly of polys) {
    poly.forEach((ringArcs, ri) => {
      const pts = ringPoints(ringArcs);
      d += ringToPath(pts);
      if (ri === 0) {
        const u = unwrap(pts);
        const lons = u.map((p) => p[0]), lats = u.map((p) => p[1]);
        const a = (Math.max(...lons) - Math.min(...lons)) * (Math.max(...lats) - Math.min(...lats));
        if (a > bestArea) { bestArea = a; best = pts; }
      }
    });
  }
  let centre = null;
  if (best) {
    const u = unwrap(best);
    let a2 = 0, sx = 0, sy = 0;
    for (let i = 0; i < u.length; i++) {
      const [x0, y0] = u[i], [x1, y1] = u[(i + 1) % u.length];
      const cross = x0 * y1 - x1 * y0;
      a2 += cross; sx += (x0 + x1) * cross; sy += (y0 + y1) * cross;
    }
    let lon, lat;
    if (Math.abs(a2) > 1e-9) {
      lon = sx / (3 * a2); lat = sy / (3 * a2);
    } else {
      lon = u.reduce((s, p) => s + p[0], 0) / u.length;
      lat = u.reduce((s, p) => s + p[1], 0) / u.length;
    }
    while (lon > 180) lon -= 360;
    while (lon < -180) lon += 360;
    const [cx, cy] = project(lon, lat);
    centre = [+((cx / W) * 100).toFixed(2), +((cy / H) * 100).toFixed(2)];
  }
  return { d, centre };
}

let base = '', markedPaths = '';
const marks = [];

for (const geom of topo.objects.countries.geometries) {
  const name = geom.properties && geom.properties.name;
  if (name === 'Antarctica') continue;
  const { d, centre } = geomToPath(geom);
  if (!d) continue;
  if (MARKED.has(name)) {
    const [ru, en] = MARKED.get(name);
    markedPaths += d;
    marks.push({ key: name, ru, en, centre });
  } else base += d;
}

const missing = [...MARKED.values()].map((v) => v[0]).filter((ru) => !marks.some((m) => m.ru === ru));
if (missing.length) throw new Error('Не найдены страны: ' + missing.join(', '));

/* Внешний SVG: сам переключает цвета по системной теме */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="World map">
<style>
.l{fill:#e0e4ea;stroke:#cdd3db;stroke-width:.5}
.m{fill:#9fb4e2;stroke:#1e4bad;stroke-width:.6}
@media (prefers-color-scheme:dark){.l{fill:#1c212b;stroke:#2a3140}.m{fill:#2f4f96;stroke:#7ea3f0}}
</style>
<path class="l" d="${base}"/>
<path class="m" d="${markedPaths}"/>
</svg>`;

mkdirSync('assets', { recursive: true });
writeFileSync('assets/map.svg', svg);

writeFileSync(
  'src/map.generated.mjs',
  `/* Сгенерировано tools/genmap.mjs. Вручную не править. */
export const mapMeta = {
  ratio: ${(H / W).toFixed(4)},
  marks: ${JSON.stringify(marks)},
};
`
);

console.log(`assets/map.svg — ${(svg.length / 1024).toFixed(1)} КБ, viewBox 0 0 ${W} ${H}`);
console.log(`подсвечено стран: ${marks.length}`);
