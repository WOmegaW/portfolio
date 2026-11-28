/* Nácar — 3D-ногти (three.js): настоящий лак — глянец с бликами, мат, хром с перламутром, кошачий глаз, френч, омбре, блёстки.
   Сцена: пять типсов веером, как на руке, но без нарисованных пальцев — как украшения на витрине.
   API для app.js — window.Nail3D: stage(canvas, opt) и snap(state, w, h). */
import * as THREE from 'three';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
import { mergeVertices } from './vendor/BufferGeometryUtils.js';

const LEN = { short: 1.3, medium: 1.8, long: 2.45 };
const WIDTH = [1.16, .94, 1, .92, .78];                   // большой, указательный, средний, безымянный, мизинец
const FAN = [                                              // веер: угол и положение каждого типса
  { a: .5, x: -2.5, y: -1.25 }, { a: .2, x: -1.22, y: .05 }, { a: 0, x: 0, y: .38 }, { a: -.18, x: 1.2, y: .08 }, { a: -.42, x: 2.28, y: -.7 }
];
const CUT = .34;                                           // высота закругления у кутикулы

/* ---------- Форма ногтя ---------- */
function outline(shape, H) {
  const s = new THREE.Shape(), h = .5;
  s.moveTo(-h, CUT);
  s.bezierCurveTo(-h, -.1, h, -.1, h, CUT);
  if (shape === 'square') {
    s.lineTo(h, H - .09); s.quadraticCurveTo(h, H, h - .09, H); s.lineTo(-h + .09, H); s.quadraticCurveTo(-h, H, -h, H - .09);
  } else if (shape === 'oval') {
    s.lineTo(h, H - .4); s.bezierCurveTo(h, H - .1, .27, H, 0, H); s.bezierCurveTo(-.27, H, -h, H - .1, -h, H - .4);
  } else if (shape === 'almond') {
    s.lineTo(h, H * .46); s.bezierCurveTo(h, H * .8, .13, H * .97, 0, H); s.bezierCurveTo(-.13, H * .97, -h, H * .8, -h, H * .46);
  } else if (shape === 'coffin') {
    s.lineTo(h, H * .46); s.lineTo(.29, H - .04); s.quadraticCurveTo(.28, H, .24, H); s.lineTo(-.24, H); s.quadraticCurveTo(-.28, H, -.29, H - .04); s.lineTo(-h, H * .46);
  } else {                                                 // стилет
    s.lineTo(h, H * .34); s.bezierCurveTo(h * .96, H * .74, .07, H * .93, 0, H); s.bezierCurveTo(-.07, H * .93, -h * .96, H * .74, -h, H * .34);
  }
  s.closePath();
  return s;
}
const uvOf = (x, y, H) => [(x + .56) / 1.12, (y + .1) / (H + .16)];
const geoCache = new Map();
function nailGeometry(shape, length) {
  const key = shape + length;
  if (geoCache.has(key)) return geoCache.get(key);
  const H = LEN[length];
  let g = new THREE.ExtrudeGeometry(outline(shape, H), { depth: .03, bevelEnabled: true, bevelThickness: .028, bevelSize: .022, bevelSegments: 5, curveSegments: 56, steps: 1 });
  g.deleteAttribute('normal');
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) { const [u, v] = uvOf(p.getX(i), p.getY(i), H); uv.setXY(i, u, v); }
  g = mergeVertices(g, 1e-4);
  const q = g.attributes.position;
  for (let i = 0; i < q.count; i++) {                      // изгиб: поперёк (C-изгиб) и чуть вниз к кончику
    const x = q.getX(i), y = q.getY(i);
    q.setZ(i, q.getZ(i) - .95 * x * x - .045 * Math.max(0, y - .6) ** 2);
  }
  g.computeVertexNormals();
  g.translate(0, -.15, 0);
  const out = { g, H };
  geoCache.set(key, out);
  return out;
}

/* ---------- Цвет и рисунок (текстура на холсте) ---------- */
const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, n >> 8 & 255, n & 255]; };
const mix = (a, b, k) => { const x = hex2rgb(a), y = hex2rgb(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
function seeded(seed) { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
function canvasFor(H) {
  const c = document.createElement('canvas'); c.width = 256; c.height = Math.round(256 * (H + .16) / 1.12); return c;
}
function painter(c, H) {                                   // координаты ногтя → холст
  const k = c.width / 1.12;
  return { X: x => (x + .56) * k, Y: y => (H + .06 - y) * k, k };
}
function paint(n, finish, H, i) {
  const c = canvasFor(H), g = c.getContext('2d'), { X, Y, k } = painter(c, H);
  const base = finish === 'cateye' ? mix(n.c, '#000000', .5) : finish === 'chrome' ? mix(n.c, '#ffffff', .22) : n.c;
  g.fillStyle = base; g.fillRect(0, 0, c.width, c.height);
  if (n.d === 'ombre') {
    const gr = g.createLinearGradient(0, Y(.05), 0, Y(H * .9));
    gr.addColorStop(0, '#F4E1D8'); gr.addColorStop(.25, '#F4E1D8'); gr.addColorStop(1, base);
    g.fillStyle = gr; g.fillRect(0, 0, c.width, c.height);
  }
  if (n.d === 'french') {
    const s = H - Math.min(.44, H * .3);
    g.fillStyle = n.t || '#FFFFFF';
    g.beginPath(); g.moveTo(X(-.6), Y(s)); g.quadraticCurveTo(X(0), Y(s - .24), X(.6), Y(s)); g.lineTo(X(.6), Y(H + .2)); g.lineTo(X(-.6), Y(H + .2)); g.fill();
  }
  if (n.d === 'glitter') {
    const r = seeded(i + 7);
    for (let j = 0; j < 1400; j++) {
      const y = r() * (H + .1), dens = .35 + .65 * (y / H);
      if (r() > dens) continue;
      g.fillStyle = ['#FFF6D8', '#E9C46A', '#FFFFFF', mix(n.c, '#ffffff', .6)][j % 4];
      g.globalAlpha = .55 + r() * .45;
      g.beginPath(); g.arc(X(r() * 1.1 - .55), Y(y), .6 + r() * 1.9, 0, 7); g.fill();
    }
    g.globalAlpha = 1;
  }
  // мягкая тень у кутикулы — лак «уходит» под кожу
  const sh = g.createLinearGradient(0, Y(-.05), 0, Y(.2));
  sh.addColorStop(0, 'rgba(40,20,25,.45)'); sh.addColorStop(1, 'rgba(40,20,25,0)');
  g.fillStyle = sh; g.fillRect(0, Y(.2), c.width, Y(-.1) - Y(.2));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
function sparkMap(H, i) {                                  // блёстки, которые мерцают (свечение)
  const c = canvasFor(H), g = c.getContext('2d'), { X, Y } = painter(c, H), r = seeded(i + 7);
  g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
  for (let j = 0; j < 1400; j++) {
    const y = r() * (H + .1), dens = .35 + .65 * (y / H);
    if (r() > dens) continue;
    r(); const x = r() * 1.1 - .55, rad = .6 + r() * 1.9;
    if (j % 5) continue;
    g.fillStyle = '#fff'; g.beginPath(); g.arc(X(x), Y(y), rad, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
let bandTex = null;
function catBand() {                                       // полоса «кошачьего глаза»: сдвигаем её — блик гуляет по ногтю
  if (bandTex) return bandTex;
  const c = document.createElement('canvas'); c.width = 256; c.height = 8;
  const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 256, 0);
  gr.addColorStop(0, '#000'); gr.addColorStop(.3, '#000'); gr.addColorStop(.42, '#3a3a3a'); gr.addColorStop(.5, '#e8e8e8'); gr.addColorStop(.58, '#3a3a3a'); gr.addColorStop(.7, '#000'); gr.addColorStop(1, '#000');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 8);
  bandTex = new THREE.CanvasTexture(c); bandTex.colorSpace = THREE.SRGBColorSpace; bandTex.wrapS = THREE.RepeatWrapping; bandTex.rotation = .5; bandTex.center.set(.5, .5);
  return bandTex;
}
function material(n, finish, H, i) {
  const m = new THREE.MeshPhysicalMaterial({ map: paint(n, finish, H, i), roughness: .32, metalness: 0, clearcoat: 1, clearcoatRoughness: .035, envMapIntensity: 1 });
  if (finish === 'matte') Object.assign(m, { roughness: .82, clearcoat: 0, sheen: .25, sheenRoughness: .8, sheenColor: new THREE.Color(mix(n.c, '#ffffff', .4)), envMapIntensity: .45 });
  if (finish === 'chrome') Object.assign(m, { metalness: 1, roughness: .1, clearcoat: 1, iridescence: .85, iridescenceIOR: 1.55, iridescenceThicknessRange: [180, 620], envMapIntensity: 1.6 });
  if (finish === 'cateye') {
    const b = catBand().clone(); b.needsUpdate = true;
    Object.assign(m, { metalness: .35, roughness: .22, emissive: new THREE.Color(mix(n.c, '#ffffff', .45)), emissiveMap: b, emissiveIntensity: 1.25 });
    m.userData.band = b;
  }
  if (n.d === 'glitter' && finish !== 'cateye') {
    Object.assign(m, { emissive: new THREE.Color('#FFF3D0'), emissiveMap: sparkMap(H, i), emissiveIntensity: .45, metalness: finish === 'chrome' ? 1 : .25 });
    m.userData.spark = true;
  }
  return m;
}
function freeMat(m) { if (!m) return; ['map', 'emissiveMap'].forEach(k => { if (m[k] && m[k] !== bandTex) m[k].dispose(); }); m.dispose(); }

/* ---------- Свет и окружение ---------- */
function setupScene(renderer) {
  const scene = new THREE.Scene(), pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture; pm.dispose();
  scene.environmentIntensity = .6;
  const key = new THREE.DirectionalLight('#fff1e6', 1.3); key.position.set(-3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight('#f4d6ff', .7); rim.position.set(4, -2, 3); scene.add(rim);
  const sweep = new THREE.PointLight('#ffffff', 14, 14, 1.6); sweep.position.set(0, 2, 4); scene.add(sweep);
  return { scene, sweep };
}
function makeRenderer(canvas, w, h, keep) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!keep, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); r.setSize(w, h, false);
  r.toneMapping = THREE.NeutralToneMapping; r.toneMappingExposure = .9; r.outputColorSpace = THREE.SRGBColorSpace;
  r.setClearColor(0x000000, 0);
  return r;
}

/* ---------- Набор из пяти типсов ---------- */
class NailSet {
  constructor() { this.root = new THREE.Group(); this.items = []; this.sig = ''; }
  build(state) {
    const { g, H } = nailGeometry(state.shape, state.length), sig = state.shape + state.length;
    if (!this.items.length) {
      FAN.forEach((f, i) => {
        const pivot = new THREE.Group(), lift = new THREE.Group(), mesh = new THREE.Mesh(g, null);
        pivot.position.set(f.x, f.y, 0); pivot.rotation.z = f.a; mesh.scale.set(WIDTH[i] * .86, WIDTH[i], WIDTH[i]); mesh.userData.i = i;
        lift.add(mesh); pivot.add(lift); this.root.add(pivot);
        this.items.push({ pivot, lift, mesh, key: '', flip: 0, flipTo: null, lv: 0 });
      });
    }
    this.items.forEach((it, i) => {
      if (this.sig !== sig) it.mesh.geometry = g;
      const k = JSON.stringify([state.nails[i], state.finish, sig]);
      if (k !== it.key) { freeMat(it.mesh.material); it.mesh.material = material(state.nails[i], state.finish, H, i); it.key = k; }
    });
    if (this.sig && this.sig !== sig) this.items.forEach((it, i) => { it.pop = 1 + i * .06; });
    this.sig = sig;
  }
  tick(t, dt, sel) {
    this.items.forEach((it, i) => {
      const want = sel.includes(i) ? 1 : 0;
      it.lv += (want - it.lv) * Math.min(1, dt * 9);
      it.lift.position.set(0, it.lv * .22, it.lv * .55);
      it.lift.rotation.x = -it.lv * .12;
      let s = 1;
      if (it.pop > 0) { it.pop = Math.max(0, it.pop - dt * 2.6); const p = Math.min(1, it.pop); s = 1 - .1 * Math.sin(p * Math.PI); }
      it.lift.scale.setScalar(s * (1 + it.lv * .05));
      const m = it.mesh.material;
      if (m && m.userData.band) m.userData.band.offset.x = .18 * Math.sin(t * .8 + i * .5) + (this.tilt || 0) * .35;
      if (m && m.userData.spark) m.emissiveIntensity = .3 + .3 * Math.max(0, Math.sin(t * 2.3 + i * 1.7));
    });
  }
  dispose() { this.items.forEach(it => freeMat(it.mesh.material)); }
}

/* ---------- Сцена на странице ---------- */
function stage(canvas, opt = {}) {
  const hero = opt.mode === 'hero', reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = () => canvas.getBoundingClientRect();
  let { width: w, height: h } = box();
  const renderer = makeRenderer(canvas, Math.max(1, w), Math.max(1, h));
  const { scene, sweep } = setupScene(renderer);
  const camera = new THREE.PerspectiveCamera(hero ? 26 : 28, w / h, .1, 100);
  const set = new NailSet(); scene.add(set.root);
  set.root.rotation.x = -.28;
  let state = null, next = null, sel = [], visible = true, raf = 0, last = performance.now(), t0 = last;
  let rotY = 0, rotX = 0, tRotY = 0, tRotX = 0, scrollP = 0, flipping = null;
  let offX = 0;
  const fit = () => {
    ({ width: w, height: h } = box()); if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    const tan = Math.tan(camera.fov * Math.PI / 360), a = w / h, wide = hero && a > 1.15 && w > 900;
    const FW = hero ? (wide ? 6.6 / .5 : 6.6) : 7.5, FH = hero ? (wide ? 5.4 / .86 : 4.7) : 5.6;   // какую часть сцены уместить в кадр
    const d = Math.max(FW / (2 * tan * a), FH / (2 * tan));
    camera.position.set(0, -.6, d); camera.lookAt(0, .25, 0); camera.updateProjectionMatrix();
    offX = wide ? 2 * d * tan * a * .24 : 0;                // на компьютере веер справа от заголовка
  };
  fit();
  new ResizeObserver(fit).observe(canvas);
  const frame = now => {
    raf = 0;
    const dt = Math.min(.05, (now - last) / 1000), t = (now - t0) / 1000; last = now;
    if (flipping) {                                        // смена образа: типсы переворачиваются по очереди
      flipping.p += dt * 1.25;
      set.items.forEach((it, i) => {
        const p = Math.min(1, Math.max(0, (flipping.p - i * .09) / .55)), e = p < .5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        it.pivot.rotation.y = e * Math.PI * 2;
        if (p >= .25 && !it.swapped) { it.swapped = true; const s = { ...flipping.to, nails: state.nails.map((n, j) => j <= i ? flipping.to.nails[j] : n) }; state = s; set.build(s); }
      });
      if (flipping.p > 1.2) { set.items.forEach(it => { it.pivot.rotation.y = 0; it.swapped = false; }); state = flipping.to; set.build(state); flipping = null; if (next) { const n = next; next = null; api.set(n); } }
    }
    const idle = reduce ? 0 : 1;
    rotY += (tRotY + idle * Math.sin(t * .35) * (hero ? .22 : .1) - rotY) * Math.min(1, dt * 4);
    rotX += (tRotX - rotX) * Math.min(1, dt * 4);
    set.root.rotation.y = rotY; set.root.rotation.x = -.28 + rotX + (hero ? scrollP * .5 : 0);
    set.root.position.x = offX; set.root.position.y = (hero ? -.15 - scrollP * 1.2 : -.25) + idle * Math.sin(t * .8) * .06;
    set.tilt = rotY;
    sweep.position.set(Math.sin(t * .5) * 5, 2.5 + Math.cos(t * .37) * 1.5, 4.2);
    set.tick(t, dt, sel);
    renderer.render(scene, camera);
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const go = () => { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new IntersectionObserver(es => { visible = es[0].isIntersecting; go(); }, { rootMargin: '120px' }).observe(canvas);
  document.addEventListener('visibilitychange', go);
  // мышь и палец: потянуть — повернуть веер, нажать — выбрать ноготь
  const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
  const hit = e => { const b = box(); v2.set((e.clientX - b.left) / b.width * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(v2, camera); const r = ray.intersectObjects(set.items.map(i => i.mesh), false)[0]; return r ? r.object.userData.i : -1; };
  let down = null;
  canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, ry: tRotY, rx: tRotX, drag: false }; });
  addEventListener('pointermove', e => {
    if (down) {
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.drag && Math.hypot(dx, dy) > 6 && e.pointerType === 'mouse') { down.drag = true; canvas.setPointerCapture?.(e.pointerId); }
      if (down.drag) { tRotY = Math.max(-.9, Math.min(.9, down.ry + dx / 260)); tRotX = Math.max(-.35, Math.min(.45, down.rx + dy / 400)); go(); }
    } else if (e.target === canvas && !hero && e.pointerType === 'mouse') canvas.style.cursor = hit(e) >= 0 ? 'pointer' : 'grab';
    if (hero && e.pointerType === 'mouse') { tRotY = (e.clientX / innerWidth - .5) * .5; tRotX = (e.clientY / innerHeight - .5) * .25; }
  });
  addEventListener('pointerup', e => {
    if (down && !down.drag && e.target === canvas && opt.onPick) { const i = hit(e); if (i >= 0) opt.onPick(i); }
    down = null;
  });
  const api = {
    set(s) {
      if (opt.flip && state && !reduce) { if (flipping) { next = s; return; } flipping = { p: 0, to: s }; set.items.forEach(it => { it.swapped = false; }); go(); return; }
      state = s; set.build(s); go();
    },
    select(a) { sel = a.slice(); go(); },
    scroll(p) { scrollP = p; go(); }
  };
  return api;
}

/* ---------- Снимок дизайна (для галереи и чека) ---------- */
let snapR = null, snapS = null;
function snap(state, w = 480, h = 330) {
  if (!snapR) { const c = document.createElement('canvas'); snapR = makeRenderer(c, w, h, true); snapS = setupScene(snapR); snapS.cam = new THREE.PerspectiveCamera(27, w / h, .1, 100); }
  snapR.setSize(w, h, false); snapR.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const cam = snapS.cam; cam.aspect = w / h; cam.position.set(0, -.5, 10.2); cam.lookAt(0, .2, 0); cam.updateProjectionMatrix();
  const set = new NailSet(); set.build(state); set.root.rotation.set(-.28, -.12, 0); set.tick(1.3, 0, []);
  snapS.sweep.position.set(-2.2, 3, 4.2);
  snapS.scene.add(set.root); snapR.render(snapS.scene, cam);
  const url = snapR.domElement.toDataURL('image/webp', .9);
  snapS.scene.remove(set.root); set.dispose();
  return url;
}

function webgl() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
if (webgl()) {
  window.Nail3D = { stage, snap };
  dispatchEvent(new Event('nail3d'));
}
