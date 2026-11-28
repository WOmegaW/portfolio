/* Nácar — 3D-ногти (three.js).
   Форма — как у мастеров: овальная кутикула, прямые боковые валики, «апекс» (самая толстая точка ~на трети длины),
   C-изгиб поперёк, тонкий свободный край. Все формы и длины строятся из одной сетки — поэтому одна форма плавно
   перетекает в другую, а цвет и покрытие меняются растворением, без рывков.
   Свет — студийный: длинные софтбоксы дают на лаке ровные полосы бликов, как на съёмке ювелирки.
   API для app.js — window.Nail3D: stage(canvas, opt) и snap(state, w, h). */
import * as THREE from 'three';

const LEN = { short: 1.25, medium: 1.78, long: 2.45 };
const WIDTH = [1.14, .93, 1, .92, .78];                    // большой, указательный, средний, безымянный, мизинец
const FAN = [{ a: .5, x: -2.5, y: -1.25 }, { a: .2, x: -1.22, y: .05 }, { a: 0, x: 0, y: .38 }, { a: -.18, x: 1.2, y: .08 }, { a: -.42, x: 2.28, y: -.7 }];
const ROWS = 96, RING = 44, CUT = .3;
const ease = x => x < .5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
const lerp = (a, b, k) => a + (b - a) * k;

/* ---------- Контур (правая половина): от центра кутикулы вверх по краю до центра кончика ---------- */
function contour(shape, H) {
  const pts = [], add = (w, y) => pts.push([w, y]);
  for (let i = 0; i <= 24; i++) { const f = i / 24 * Math.PI / 2; add(.5 * Math.sin(f), CUT * (1 - Math.cos(f))); }   // кутикула — четверть эллипса
  const side = s => { for (let i = 1; i <= 12; i++) add(.5, lerp(CUT, s, i / 12)); };
  const bez = (p0, p1, p2, p3, n = 40) => { for (let i = 1; i <= n; i++) { const t = i / n, u = 1 - t; add(u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0], u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1]); } };
  const line = (a, b, n = 16) => { for (let i = 1; i <= n; i++) add(lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n)); };
  if (shape === 'square') {
    const r = .08; side(H - r);
    for (let i = 1; i <= 12; i++) { const a = i / 12 * Math.PI / 2; add(.5 - r + r * Math.cos(a), H - r + r * Math.sin(a)); }
    line([.5 - r, H], [0, H]);
  } else if (shape === 'oval') {
    const e = Math.min(.46, H * .3); side(H - e);
    for (let i = 1; i <= 30; i++) { const a = i / 30 * Math.PI / 2; add(.5 * Math.cos(a), H - e + e * Math.sin(a)); }
  } else if (shape === 'almond') {
    const s = Math.max(CUT + .1, H * .44); side(s);
    bez([.5, s], [.5, s + (H - s) * .58], [.19, H], [0, H]);
  } else if (shape === 'coffin') {
    const s = Math.max(CUT + .1, H * .42); side(s);
    line([.5, s], [.29, H - .045], 24); bez([.29, H - .045], [.282, H - .01], [.26, H], [.225, H], 8); line([.225, H], [0, H]);
  } else {                                                  // стилет
    const s = Math.max(CUT + .1, H * .3); side(s);
    bez([.5, s], [.5, s + (H - s) * .38], [.1, H - (H - s) * .1], [0, H]);
  }
  // равномерно по длине контура → ROWS точек (одинаково для всех форм — можно перетекать)
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const out = [], tot = L[L.length - 1];
  for (let r = 0, j = 0; r < ROWS; r++) {
    const want = tot * (1 - Math.cos(r / (ROWS - 1) * Math.PI)) / 2;   // гуще у кутикулы и кончика
    while (j < L.length - 2 && L[j + 1] < want) j++;
    const k = (want - L[j]) / Math.max(1e-6, L[j + 1] - L[j]);
    out.push([lerp(pts[j][0], pts[j + 1][0], k), lerp(pts[j][1], pts[j + 1][1], k)]);
  }
  return out;
}

/* ---------- Поверхность: петля сечения (скруглённый прямоугольник) на каждом ряду контура ---------- */
const spow = (v, p) => Math.sign(v) * Math.abs(v) ** p;
function surface(shape, length) {
  const H = LEN[length], c = contour(shape, H), pos = new Float32Array(ROWS * RING * 3), uv = new Float32Array(ROWS * RING * 2);
  for (let r = 0; r < ROWS; r++) {
    const [w, y] = c[r], t = Math.min(1, y / H);
    const th = .05 - .022 * t;                                   // к кончику тоньше
    const apex = .075 * (t / .36) * Math.exp(1 - t / .36);       // «апекс» — горка на трети длины
    for (let j = 0; j < RING; j++) {
      const a = j / RING * Math.PI * 2, cx = spow(Math.cos(a), .32), sz = spow(Math.sin(a), .55);
      const x = w * cx, top = sz > 0;
      let z = top ? sz * (th / 2 + apex * (1 - cx * cx * .6)) : sz * th / 2;
      z -= (1.05 + .25 * t) * x * x + .045 * Math.max(0, y - .8) ** 2;  // C-изгиб и лёгкий изгиб к кончику
      const i = r * RING + j;
      pos[i * 3] = x; pos[i * 3 + 1] = y - .15; pos[i * 3 + 2] = z;
      uv[i * 2] = (x + .56) / 1.12; uv[i * 2 + 1] = .03 + .94 * t;
    }
  }
  return { pos, uv, H };
}
let INDEX = null;
function indexArr() {
  if (INDEX) return INDEX;
  const idx = [];
  for (let r = 0; r < ROWS - 1; r++) for (let j = 0; j < RING; j++) {
    const a = r * RING + j, b = r * RING + (j + 1) % RING, c = a + RING, d = b + RING;
    idx.push(a, c, b, b, c, d);
  }
  return (INDEX = idx);
}
const surfCache = new Map();
const surfOf = (shape, length) => { const k = shape + length; if (!surfCache.has(k)) surfCache.set(k, surface(shape, length)); return surfCache.get(k); };
class NailGeo {                                                // общая геометрия для всех пяти ногтей набора
  constructor(shape, length) {
    this.g = new THREE.BufferGeometry(); const s = surfOf(shape, length);
    this.g.setIndex(indexArr());
    this.g.setAttribute('position', new THREE.BufferAttribute(s.pos.slice(), 3));
    this.g.setAttribute('uv', new THREE.BufferAttribute(s.uv.slice(), 2));
    this.g.computeVertexNormals(); this.key = shape + length; this.from = null; this.to = s; this.k = 1; this.H = s.H;
  }
  morph(shape, length, instant) {
    const key = shape + length; if (key === this.key) return; this.key = key;
    const p = this.g.attributes.position.array, u = this.g.attributes.uv.array;
    this.from = { pos: p.slice(), uv: u.slice() }; this.to = surfOf(shape, length); this.H = this.to.H; this.k = instant ? 1 : 0;
    if (instant) this.apply(1);
  }
  apply(k) {
    const p = this.g.attributes.position.array, u = this.g.attributes.uv.array, e = ease(k);
    if (k >= 1 || !this.from) { p.set(this.to.pos); u.set(this.to.uv); }
    else { for (let i = 0; i < p.length; i++) p[i] = lerp(this.from.pos[i], this.to.pos[i], e); for (let i = 0; i < u.length; i++) u[i] = lerp(this.from.uv[i], this.to.uv[i], e); }
    this.g.attributes.position.needsUpdate = true; this.g.attributes.uv.needsUpdate = true; this.g.computeVertexNormals(); this.g.computeBoundingSphere();
  }
  tick(dt) { if (this.k < 1) { this.k = Math.min(1, this.k + dt / .75); this.apply(this.k); } }
}

/* ---------- Цвет и рисунок ---------- */
const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, n >> 8 & 255, n & 255]; };
const mix = (a, b, k) => { const x = hex2rgb(a), y = hex2rgb(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
function seeded(seed) { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
const TW = 256, TH = 512;
const X = x => (x + .56) / 1.12 * TW, Y = v => (1 - (.03 + .94 * v)) * TH;      // v — доля длины (0 кутикула, 1 кончик)
function tex(c, srgb = true) { const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
function paint(n, finish, i) {
  const c = document.createElement('canvas'); c.width = TW; c.height = TH; const g = c.getContext('2d');
  const base = finish === 'cateye' ? mix(n.c, '#000000', .5) : finish === 'chrome' ? mix(n.c, '#ffffff', .55) : n.c;
  g.fillStyle = base; g.fillRect(0, 0, TW, TH);
  if (n.d === 'ombre') {
    const gr = g.createLinearGradient(0, Y(.04), 0, Y(.9));
    gr.addColorStop(0, '#F5E3DA'); gr.addColorStop(.22, '#F5E3DA'); gr.addColorStop(1, base);
    g.fillStyle = gr; g.fillRect(0, 0, TW, TH);
  }
  if (n.d === 'french') {                                     // «улыбка» френча
    g.fillStyle = n.t || '#FFFFFF';
    g.beginPath(); g.moveTo(X(-.62), Y(.72)); g.bezierCurveTo(X(-.3), Y(.6), X(.3), Y(.6), X(.62), Y(.72)); g.lineTo(X(.62), 0); g.lineTo(X(-.62), 0); g.fill();
  }
  if (n.d === 'glitter') {
    const r = seeded(i + 7);
    for (let j = 0; j < 2200; j++) {
      const v = r(); if (r() > .3 + .7 * v) continue;
      g.fillStyle = ['#FFF6D8', '#E9C46A', '#FFFFFF', mix(n.c, '#ffffff', .6)][j % 4]; g.globalAlpha = .5 + r() * .5;
      g.beginPath(); g.arc(X(r() * 1.12 - .56), Y(v), .5 + r() * 1.6, 0, 7); g.fill();
    }
    g.globalAlpha = 1;
  }
  const sh = g.createLinearGradient(0, Y(0), 0, Y(.09));         // лак мягко «уходит» под кутикулу
  sh.addColorStop(0, mix(base, '#000000', .55) + 'aa'); sh.addColorStop(1, mix(base, '#000000', .55) + '00');
  g.fillStyle = sh; g.fillRect(0, Y(.09), TW, Y(0) - Y(.09) + 2);
  return tex(c);
}
let BLACK = null, BAND = null;
const black = () => BLACK || (BLACK = (() => { const c = document.createElement('canvas'); c.width = c.height = 4; c.getContext('2d').fillRect(0, 0, 4, 4); return tex(c); })());
function band() {                                             // полоса «кошачьего глаза»: двигаем — блик гуляет
  if (BAND) return BAND;
  const c = document.createElement('canvas'); c.width = 256; c.height = 8;
  const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 256, 0);
  [[0, '#000'], [.3, '#000'], [.42, '#333'], [.5, '#eee'], [.58, '#333'], [.7, '#000'], [1, '#000']].forEach(([o, col]) => gr.addColorStop(o, col));
  g.fillStyle = gr; g.fillRect(0, 0, 256, 8);
  BAND = tex(c); BAND.wrapS = THREE.RepeatWrapping; BAND.rotation = .45; BAND.center.set(.5, .5);
  return BAND;
}
function spark(i) {
  const c = document.createElement('canvas'); c.width = TW; c.height = TH; const g = c.getContext('2d'), r = seeded(i + 31);
  g.fillStyle = '#000'; g.fillRect(0, 0, TW, TH); g.fillStyle = '#fff';
  for (let j = 0; j < 420; j++) { const v = r(); if (r() > .3 + .7 * v) continue; g.beginPath(); g.arc(X(r() * 1.12 - .56), Y(v), .6 + r() * 1.4, 0, 7); g.fill(); }
  return tex(c);
}

/* ---------- Лак: один материал на ноготь, параметры перетекают ---------- */
const FIN = {
  gloss:  { roughness: .26, metalness: 0,   clearcoat: 1, clearcoatRoughness: .015, iridescence: 0,  sheen: 0,   envMapIntensity: 1.05 },
  matte:  { roughness: .86, metalness: 0,   clearcoat: 0, clearcoatRoughness: .6,   iridescence: 0,  sheen: .35, envMapIntensity: .45 },
  chrome: { roughness: .06, metalness: 1,   clearcoat: 1, clearcoatRoughness: .015, iridescence: .55, sheen: 0,   envMapIntensity: 2.6 },
  cateye: { roughness: .18, metalness: .45, clearcoat: 1, clearcoatRoughness: .015, iridescence: .15, sheen: 0,  envMapIntensity: 1 }
};
const EPS = 1e-4;
class Lacquer {
  constructor(i) {
    this.i = i; this.k = 1; this.mixK = { value: 0 };
    this.m = new THREE.MeshPhysicalMaterial({ map: black(), roughness: .3, clearcoat: 1, sheen: EPS, iridescence: EPS, iridescenceIOR: 1.55, iridescenceThicknessRange: [180, 640],
      sheenRoughness: .8, sheenColor: new THREE.Color('#ffffff'), emissive: new THREE.Color('#000000'), emissiveMap: black(), emissiveIntensity: 0 });
    this.mapB = { value: black() };
    this.m.onBeforeCompile = sh => {
      sh.uniforms.mapB = this.mapB; sh.uniforms.mixK = this.mixK;
      sh.fragmentShader = sh.fragmentShader.replace('#include <map_pars_fragment>', '#include <map_pars_fragment>\nuniform sampler2D mapB; uniform float mixK;')
        .replace('#include <map_fragment>', '#ifdef USE_MAP\n  vec4 sampledDiffuseColor = mix(texture2D(map, vMapUv), texture2D(mapB, vMapUv), mixK);\n  diffuseColor *= sampledDiffuseColor;\n#endif');
    };
    this.cur = { ...FIN.gloss, emi: 0 }; this.tgt = { ...this.cur }; this.emiCol = new THREE.Color(); this.emiTgt = new THREE.Color(); this.key = '';
  }
  set(n, finish, instant) {
    const key = JSON.stringify([n.c, n.d, n.t, finish]); if (key === this.key) return; this.key = key;
    const t = paint(n, finish, this.i);
    if (instant || this.m.map === BLACK) { if (this.m.map !== BLACK) this.m.map.dispose(); this.m.map = t; this.mixK.value = 0; this.k = 1; }
    else { if (this.k < 1) this.finishMix(); this.mapB.value = t; this.k = 0; }
    const cat = finish === 'cateye', gl = n.d === 'glitter' && !cat;
    this.tgt = { ...FIN[finish], emi: cat ? 1.3 : gl ? .5 : 0 };
    if (gl && finish !== 'chrome') this.tgt.metalness = .25;
    this.emiTgt.set(cat ? mix(n.c, '#ffffff', .45) : '#FFF3D0');
    this.sheenTgt = new THREE.Color(mix(n.c, '#ffffff', .45));
    this.emiNext = cat ? band() : gl ? spark(this.i) : null;
    this.cat = cat; this.gl = gl;
    if (instant) { this.cur = { ...this.tgt }; this.swapEmi(); this.emiCol.copy(this.emiTgt); this.apply(); }
  }
  swapEmi() { const old = this.m.emissiveMap; if (old && old !== BAND && old !== BLACK) old.dispose(); this.m.emissiveMap = this.emiNext || black(); this.emiNext = undefined; }
  finishMix() { const old = this.m.map; this.m.map = this.mapB.value; this.mapB.value = black(); this.mixK.value = 0; this.k = 1; if (old !== BLACK) old.dispose(); }
  apply() {
    const m = this.m, c = this.cur;
    m.roughness = c.roughness; m.metalness = c.metalness; m.clearcoat = Math.max(EPS, c.clearcoat); m.clearcoatRoughness = c.clearcoatRoughness;
    m.iridescence = Math.max(EPS, c.iridescence); m.sheen = Math.max(EPS, c.sheen); m.envMapIntensity = c.envMapIntensity;
    m.emissiveIntensity = c.emi; m.emissive.copy(this.emiCol); if (this.sheenTgt) m.sheenColor.copy(this.sheenTgt);
  }
  tick(t, dt, tilt) {
    const f = Math.min(1, dt * 5);
    if (this.k < 1) { this.k = Math.min(1, this.k + dt / .6); this.mixK.value = ease(this.k); if (this.k >= 1) this.finishMix(); }
    if (this.emiNext !== undefined) { this.cur.emi = lerp(this.cur.emi, 0, Math.min(1, dt * 9)); if (this.cur.emi < .03) this.swapEmi(); }
    for (const k in this.tgt) if (k !== 'emi' || this.emiNext === undefined) this.cur[k] = lerp(this.cur[k], this.tgt[k], f);
    this.emiCol.lerp(this.emiTgt, f);
    this.apply();
    if (this.cat && this.m.emissiveMap === BAND) BAND.offset.x = .16 * Math.sin(t * .7) + tilt * .4;
    if (this.gl) this.m.emissiveIntensity = this.cur.emi * (.55 + .45 * Math.max(0, Math.sin(t * 2.1 + this.i * 1.9)));
  }
}

/* ---------- Студийный свет ---------- */
function studioEnv(renderer) {
  const s = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(.16, .14, .15), side: THREE.BackSide })); s.add(room);
  const box = (w, h, x, y, z, k, col = [1, .97, .94]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col[0] * k, col[1] * k, col[2] * k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m);
  };
  box(2.2, 11, -7, 2, 6, 7);                 // длинный софтбокс слева — главная полоса блика
  box(1.2, 9, 7.5, 1, 5, 4.2, [1, .92, .9]); // узкий справа
  box(9, 2.6, 0, 9, 4, 3.2);                 // сверху
  box(6, 1.2, 0, -3, 9, 1.4, [1, .88, .82]); // тёплый низ — подсветка снизу
  box(3, 3, -2, 4, -8, 2.2, [.95, .9, 1]);   // контровой сзади
  box(14, 5, 0, -7, -2, .5, [1, .9, .86]);   // мягкий отражённый свет снизу — хром не уходит в черноту
  const pm = new THREE.PMREMGenerator(renderer), env = pm.fromScene(s, .02).texture; pm.dispose();
  return env;
}
function setupScene(renderer) {
  const scene = new THREE.Scene();
  scene.environment = studioEnv(renderer);
  const key = new THREE.DirectionalLight('#fff4ea', 1.1); key.position.set(-4, 6, 7); scene.add(key);
  const rim = new THREE.DirectionalLight('#ffd9cf', .8); rim.position.set(5, -3, 2); scene.add(rim);
  const sweep = new THREE.PointLight('#ffffff', 0, 9, 1.4); sweep.position.set(-6, 2, 3.5); scene.add(sweep);
  return { scene, sweep };
}
function makeRenderer(canvas, w, h, keep) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!keep, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); r.setSize(w, h, false);
  r.toneMapping = THREE.NeutralToneMapping; r.toneMappingExposure = .95; r.outputColorSpace = THREE.SRGBColorSpace; r.setClearColor(0, 0);
  return r;
}

/* ---------- Набор ногтей ---------- */
class NailSet {
  constructor(only) {
    this.root = new THREE.Group(); this.items = []; this.geo = null; this.only = only;
  }
  build(state, instant) {
    if (!this.geo) this.geo = new NailGeo(state.shape, state.length); else this.geo.morph(state.shape, state.length, instant);
    if (!this.items.length) {
      const list = this.only !== undefined ? [this.only] : [0, 1, 2, 3, 4];
      list.forEach(i => {
        const f = this.only !== undefined ? { a: 0, x: 0, y: 0 } : FAN[i], pivot = new THREE.Group(), lift = new THREE.Group(), lac = new Lacquer(i);
        const mesh = new THREE.Mesh(this.geo.g, lac.m); mesh.scale.set(WIDTH[i] * .86, WIDTH[i], WIDTH[i]); mesh.userData.i = i;
        pivot.position.set(f.x, f.y, 0); pivot.rotation.z = f.a; lift.add(mesh); pivot.add(lift); this.root.add(pivot);
        this.items.push({ i, pivot, lift, mesh, lac, lv: 0 });
      });
    }
    this.items.forEach(it => it.lac.set(state.nails[it.i], state.finish, instant));
  }
  tick(t, dt, sel, tilt = 0) {
    this.geo.tick(dt);
    this.items.forEach(it => {
      it.lv = lerp(it.lv, sel.includes(it.i) ? 1 : 0, Math.min(1, dt * 7));
      const e = ease(it.lv);
      it.lift.position.set(0, e * .2, e * .6); it.lift.rotation.x = -e * .14; it.lift.scale.setScalar(1 + e * .05);
      it.lac.tick(t, dt, tilt);
    });
  }
}

/* ---------- Кадры для первого экрана: камера ездит, как на съёмке ---------- */
const SHOTS = [
  { a: [0, -.5, 1], b: [.22, -.4, .9], ta: [0, .3, 0], tb: [.08, .32, 0] },          // общий план, медленный наезд
  { a: [-.3, -.32, .78], b: [-.16, -.26, .72], ta: [-.2, .55, 0], tb: [-.1, .6, 0] }, // три четверти слева
  { a: [.18, -.22, .52], b: [.08, -.14, .46], ta: [0, .95, .05], tb: [0, 1, .05] },   // крупный план: средний ноготь
  { a: [.34, -.42, .84], b: [-.3, -.42, .84], ta: [.1, .4, 0], tb: [-.1, .4, 0] }     // проезд вдоль веера
];
const SCENE = 7.2, CUTT = 1.9;

function stage(canvas, opt = {}) {
  const mode = opt.mode || 'studio', hero = mode === 'hero', macro = mode === 'macro';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = () => canvas.getBoundingClientRect();
  let { width: w, height: h } = box();
  const renderer = makeRenderer(canvas, Math.max(1, w), Math.max(1, h));
  const { scene, sweep } = setupScene(renderer);
  const camera = new THREE.PerspectiveCamera(macro ? 24 : 27, 1, .05, 100);
  const set = new NailSet(macro ? 2 : undefined); scene.add(set.root);
  set.root.rotation.x = macro ? -.5 : -.28; if (macro) set.root.rotation.z = -.42;
  let built = false, sel = [], visible = true, raf = 0, last = performance.now(), clock = 0;
  let rotY = 0, rotX = 0, tRotY = 0, tRotX = 0, scrollP = 0, sweepT = 99, d = 10, wide = false;
  let looks = null, li = 0, si = 0, st = 0, mx = 0, my = 0;
  const fit = () => {
    ({ width: w, height: h } = box()); if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    const tan = Math.tan(camera.fov * Math.PI / 360), a = w / h; wide = hero && a > 1.15 && w > 900;
    const FW = macro ? 2.4 : hero ? (wide ? 6.6 / .52 : 6.6) : 7.5, FH = macro ? 2.7 : hero ? (wide ? 6.3 : 4.7) : (a < 1.6 ? 6.4 : 5.6);
    d = Math.max(FW / (2 * tan * a), FH / (2 * tan));
    if (wide) camera.setViewOffset(w, h, -w * .22, 0, w, h);
    else if (macro) camera.setViewOffset(w, h, a > 1.15 ? -w * .2 : 0, h * (a > 1.15 ? .06 : .14), w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };
  fit(); new ResizeObserver(fit).observe(canvas);
  const V = new THREE.Vector3(), T = new THREE.Vector3(), Pa = new THREE.Vector3(), Pb = new THREE.Vector3(), M = new THREE.Vector3();
  const shotAt = (s, u, outP, outT) => { const e = ease(u); outP.set(lerp(s.a[0], s.b[0], e) * d, lerp(s.a[1], s.b[1], e) * d, lerp(s.a[2], s.b[2], e) * d); outT.set(lerp(s.ta[0], s.tb[0], e), lerp(s.ta[1], s.tb[1], e), lerp(s.ta[2], s.tb[2], e)); };
  const frame = now => {
    raf = 0;
    const dt = Math.min(.05, (now - last) / 1000); last = now; clock += dt; const t = clock;
    const idle = reduce ? 0 : 1;
    if (hero) {
      if (looks && !reduce) {
        st += dt;
        if (st > SCENE) { st -= SCENE; li++; si++; set.build(looks[li % looks.length]); sweepT = 0; opt.onScene && opt.onScene(li % looks.length); }
      }
      const s = SHOTS[si % SHOTS.length], p = SHOTS[(si + SHOTS.length - 1) % SHOTS.length];
      shotAt(s, Math.min(1, st / SCENE), Pa, T);
      if (st < CUTT && si > 0) { shotAt(p, 1, Pb, V); const k = ease(st / CUTT); Pa.lerpVectors(Pb, Pa, k); T.lerpVectors(V, T, k); }   // плавный переезд к новому кадру
      Pa.x += mx * .5; Pa.y += my * .3;
      if (scrollP > 0) { V.set(0, 1.2, .05); M.set(.2, .9, 2.6); const k = ease(scrollP); Pa.lerp(M, k * .55); T.lerp(V, k * .6); }
      camera.position.copy(Pa); camera.lookAt(T);
    } else if (macro) {
      const a = t * .22;
      camera.position.set(Math.sin(a) * d * .5, -.16 * d + Math.sin(t * .3) * .15, Math.cos(a) * d * .5 + d * .5); camera.lookAt(0, .78, 0);
    } else {
      camera.position.set(0, -.6, d); camera.lookAt(0, .25, 0);
    }
    rotY = lerp(rotY, tRotY + idle * Math.sin(t * .3) * (hero ? .06 : .08), Math.min(1, dt * 3.5));
    rotX = lerp(rotX, tRotX, Math.min(1, dt * 3.5));
    set.root.rotation.y = rotY; set.root.rotation.x = (macro ? -.5 : -.28) + rotX;
    set.root.position.y = (hero ? -.15 : macro ? -.1 : -.25) + idle * Math.sin(t * .7) * .04;
    // свет: при смене кадра — пролёт софтбокса через ногти
    sweepT += dt;
    const sw = Math.min(1, sweepT / 1.8);
    sweep.intensity = sweepT < 1.8 ? 30 * Math.sin(sw * Math.PI) : 0;
    sweep.position.set(lerp(-6, 6, ease(sw)), 2.2, 3.4);
    set.tick(t, dt, sel, rotY);
    renderer.render(scene, camera);
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const go = () => { if (!raf && visible && !document.hidden && built) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; go(); }, { rootMargin: '150px' }).observe(canvas);
  document.addEventListener('visibilitychange', go);
  // потянуть — повернуть, нажать — выбрать ноготь
  const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
  const hit = e => { const b = box(); v2.set((e.clientX - b.left) / b.width * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(v2, camera); const r = ray.intersectObjects(set.items.map(i => i.mesh), false)[0]; return r ? r.object.userData.i : -1; };
  let down = null;
  if (mode === 'studio') canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, ry: tRotY, rx: tRotX, drag: false }; });
  addEventListener('pointermove', e => {
    if (down) {
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.drag && Math.hypot(dx, dy) > 6 && e.pointerType === 'mouse') { down.drag = true; canvas.setPointerCapture?.(e.pointerId); }
      if (down.drag) { tRotY = Math.max(-.9, Math.min(.9, down.ry + dx / 260)); tRotX = Math.max(-.35, Math.min(.45, down.rx + dy / 400)); go(); }
    } else if (e.target === canvas && mode === 'studio' && e.pointerType === 'mouse') canvas.style.cursor = hit(e) >= 0 ? 'pointer' : 'grab';
    if (hero && e.pointerType === 'mouse') { mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5); }
  });
  addEventListener('pointerup', e => { if (down && !down.drag && e.target === canvas && opt.onPick) { const i = hit(e); if (i >= 0) opt.onPick(i); } down = null; });
  return {
    set(s) { set.build(s, !built); if (built && mode !== 'studio') sweepT = 0; built = true; go(); },
    select(a) { sel = a.slice(); go(); },
    scroll(p) { scrollP = p; go(); },
    play(list, start = 0) { looks = list; li = start; st = 0; set.build(list[start % list.length], !built); built = true; go(); }
  };
}

/* ---------- Снимок дизайна (галерея и чек) ---------- */
let snapR = null, snapS = null;
function snap(state, w = 480, h = 330) {
  if (!snapR) { snapR = makeRenderer(document.createElement('canvas'), w, h, true); snapS = setupScene(snapR); snapS.cam = new THREE.PerspectiveCamera(27, 1, .1, 100); }
  snapR.setSize(w, h, false); snapR.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const cam = snapS.cam, tan = Math.tan(cam.fov * Math.PI / 360), a = w / h, d = Math.max(7.4 / (2 * tan * a), 5.4 / (2 * tan));
  cam.aspect = a; cam.position.set(0, -.6, d); cam.lookAt(0, .25, 0); cam.updateProjectionMatrix();
  const set = new NailSet(); set.build(state, true); set.root.rotation.set(-.28, -.1, 0); set.root.position.y = -.25; set.tick(1.3, 0, []);
  snapS.scene.add(set.root); snapR.render(snapS.scene, cam);
  const url = snapR.domElement.toDataURL('image/webp', .92);
  snapS.scene.remove(set.root);
  set.items.forEach(it => { if (it.lac.m.map !== BLACK) it.lac.m.map.dispose(); it.lac.m.dispose(); }); set.geo.g.dispose();
  return url;
}

function webgl() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
if (webgl()) { window.Nail3D = { stage, snap }; dispatchEvent(new Event('nail3d')); }
