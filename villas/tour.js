/* ============================================================
   ВИДЕО-ТУР и 3D-ТУР 360° для окна виллы.
   Видео-тур: «кино» из фото виллы (плавный наезд камеры, подписи комнат,
   титры в начале и кнопки записи в конце) — или настоящее видео агентства,
   если у виллы заполнено поле video (YouTube или ссылка на .mp4).
   3D-тур: свой просмотрщик панорам 360° на WebGL (без сторонних библиотек)
   или ссылка Matterport в поле tour.
   app.js вызывает VTour.init(...) и VTour.video(v) / VTour.pano(v).
   ============================================================ */
(() => {
'use strict';
let ctx = null;                                  // t, L, img, money, onBook, waLink, onClose — из app.js
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const dlg = document.createElement('dialog');
dlg.id = 'tour'; dlg.className = 'tour';
document.body.appendChild(dlg);
const q = s => dlg.querySelector(s);
let stop = () => {};                             // останавливает текущий режим
dlg.addEventListener('close', () => { stop(); stop = () => {}; dlg.innerHTML = ''; if (ctx && ctx.onClose) ctx.onClose(); });
dlg.addEventListener('click', e => { if (e.target.closest('[data-x]')) dlg.close(); });

const X_BTN = '<button class="t-x" type="button" data-x aria-label="×"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2"/></svg></button>';
const ICON = {
  play: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  pause: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>',
  replay: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  plus: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/></svg>',
  minus: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2"/></svg>',
  full: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  hand: '<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4M17 12h4M5 9.5 2.5 12 5 14.5M19 9.5l2.5 2.5-2.5 2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
};

/* ---------- Подпись комнаты по имени фото: in-living-8 → «Гостиная» ---------- */
function roomOf(name) {
  const n = String(name).toLowerCase();
  const map = [['living', 'living'], ['kitchen', 'kitchen'], ['dining', 'dining'], ['bed', 'bed'], ['bath', 'bath'], ['pool', 'pool'], ['sea', 'view'], ['patio', 'terrace'], ['terrace', 'terrace'], ['garden', 'garden']];
  for (const [k, r] of map) if (n.includes(k)) return ctx.t('room.' + r);
  return /-in$|-in-|interior/.test(n) ? ctx.t('room.inside') : ctx.t('room.outside');
}

/* ---------- Настоящее видео агентства: YouTube или файл .mp4 ---------- */
function ytId(url) { const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/); return m ? m[1] : ''; }
function realVideo(v) {
  const id = ytId(v.video);
  const media = id
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0" title="${esc(ctx.L(v).name)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    : `<video src="${esc(v.video)}" controls autoplay playsinline></video>`;
  dlg.innerHTML = `<div class="t-real">${media}</div>${X_BTN}`;
  stop = () => { const el = q('video'); if (el) el.pause(); };
}

/* ---------- Видео-тур из фото ---------- */
const SLIDE = 4800, FADE = 1100, INTRO = 2600;
function cinema(v) {
  const l = ctx.L(v), shots = v.gallery.slice(0, 8);
  const facts = [`${v.beds} ${ctx.t('tour.beds')}`, `${v.built} ${ctx.t('m2')}`, ctx.money(v.price)].map(esc).join(' · ');
  dlg.innerHTML = `
    <div class="t-film" data-state="play">
      <div class="t-frames"><div class="t-frame"></div><div class="t-frame"></div></div>
      <div class="t-shade"></div>
      <div class="t-bars">${shots.map(() => '<i><b></b></i>').join('')}</div>
      <div class="t-title"><p class="t-brand">${esc(ctx.brand)} · ${esc(v.ref)}</p><h2>${esc(l.name)}</h2><p>${esc(l.where)}</p><p class="t-facts">${facts}</p></div>
      <p class="t-cap"><span></span><small></small></p>
      <button class="t-zone prev" type="button" aria-label="${esc(ctx.t('gal.prev'))}"></button>
      <button class="t-zone mid" type="button" aria-label="${esc(ctx.t('tour.pause'))}"></button>
      <button class="t-zone next" type="button" aria-label="${esc(ctx.t('gal.next'))}"></button>
      <button class="t-pp" type="button" aria-label="${esc(ctx.t('tour.pause'))}">${ICON.pause}</button>
      <div class="t-end">
        <h2>${esc(l.name)}</h2><p>${esc(ctx.t('tour.endText'))}</p>
        <div class="t-end-btns">
          <button class="btn" type="button" data-book>${esc(ctx.t('cta.visitThis'))}</button>
          <a class="btn wa" href="${esc(ctx.waLink(l.name))}" target="_blank" rel="noopener">${esc(ctx.t('wa'))}</a>
        </div>
        <div class="t-end-btns">
          <button class="pill" type="button" data-replay>${ICON.replay}<span>${esc(ctx.t('tour.replay'))}</span></button>
          ${hasPano(v) ? `<button class="pill" type="button" data-pano><b class="t-360">360°</b><span>${esc(ctx.t('tour.badge'))}</span></button>` : ''}
        </div>
      </div>
    </div>${X_BTN}`;
  const film = q('.t-film'), frames = [...dlg.querySelectorAll('.t-frame')], bars = [...dlg.querySelectorAll('.t-bars b')];
  const cap = q('.t-cap span'), capN = q('.t-cap small'), pp = q('.t-pp');
  let i = -1, front = 0, timer = 0, started = 0, left = SLIDE, paused = false, raf = 0;
  shots.forEach(s => { const im = new Image(); im.src = ctx.img(s, 1600); });   // заранее грузим все кадры

  function show(n) {
    i = n; front ^= 1;
    const f = frames[front], b = frames[front ^ 1];
    const kx = (Math.random() * 2 - 1) * 4, ky = (Math.random() * 2 - 1) * 3, zin = n % 2 === 0;
    f.style.backgroundImage = `url("${ctx.img(shots[n], 1600)}")`;
    f.style.setProperty('--x0', `${-kx}%`); f.style.setProperty('--y0', `${-ky}%`);
    f.style.setProperty('--x1', `${kx}%`); f.style.setProperty('--y1', `${ky}%`);
    f.style.setProperty('--s0', zin ? 1.04 : 1.16); f.style.setProperty('--s1', zin ? 1.16 : 1.04);
    f.classList.remove('kb'); void f.offsetWidth; f.classList.add('kb', 'on'); b.classList.remove('on');
    f.style.animationPlayState = paused ? 'paused' : 'running';
    film.classList.toggle('intro', n === 0);
    if (n === 0) setTimeout(() => { if (i === 0) film.classList.remove('intro'); }, reduce() ? 1200 : INTRO);   // титры поверх первого кадра
    cap.textContent = roomOf(shots[n]); capN.textContent = `${n + 1} / ${shots.length}`;
    bars.forEach((x, j) => { x.style.transition = 'none'; x.style.width = j < n ? '100%' : '0%'; });
    left = SLIDE; run();
  }
  function run() {
    clearTimeout(timer); cancelAnimationFrame(raf);
    if (paused) return;
    started = performance.now();
    const bar = bars[i], from = 1 - left / SLIDE;
    const tick = now => { bar.style.width = `${Math.min(1, from + (now - started) / SLIDE) * 100}%`; raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    timer = setTimeout(next, left);
  }
  function next() { if (i + 1 < shots.length) show(i + 1); else end(); }
  function prev() { film.dataset.state = 'play'; show(Math.max(0, i - 1)); }
  function end() {
    clearTimeout(timer); cancelAnimationFrame(raf); bars.forEach(x => { x.style.width = '100%'; });
    film.dataset.state = 'end'; film.classList.remove('intro'); q('[data-book]').focus({ preventScroll: true });
  }
  function setPaused(p) {
    if (film.dataset.state === 'end') return;
    paused = p; film.classList.toggle('paused', p);
    pp.innerHTML = p ? ICON.play : ICON.pause; pp.setAttribute('aria-label', ctx.t(p ? 'tour.play' : 'tour.pause'));
    frames.forEach(f => { f.style.animationPlayState = p ? 'paused' : 'running'; });
    if (p) { clearTimeout(timer); cancelAnimationFrame(raf); left = Math.max(0, left - (performance.now() - started)); } else run();
  }
  q('.t-zone.prev').addEventListener('click', prev);
  q('.t-zone.next').addEventListener('click', () => { if (film.dataset.state !== 'end') next(); });
  q('.t-zone.mid').addEventListener('click', () => setPaused(!paused));
  pp.addEventListener('click', () => setPaused(!paused));
  q('[data-replay]').addEventListener('click', () => { film.dataset.state = 'play'; paused = false; setPaused(false); show(0); });
  q('[data-book]').addEventListener('click', () => { dlg.close(); ctx.onBook(v); });
  const pb = q('[data-pano]'); if (pb) pb.addEventListener('click', () => pano(v));
  const onKey = e => {
    if (e.key === 'ArrowRight') next(); else if (e.key === 'ArrowLeft') prev();
    else if (e.key === ' ' && film.dataset.state !== 'end') { e.preventDefault(); setPaused(!paused); }
  };
  dlg.addEventListener('keydown', onKey);
  const onVis = () => { if (document.hidden && !paused) setPaused(true); };
  document.addEventListener('visibilitychange', onVis);
  stop = () => { clearTimeout(timer); cancelAnimationFrame(raf); dlg.removeEventListener('keydown', onKey); document.removeEventListener('visibilitychange', onVis); };
  show(0);
}

/* ---------- 3D-тур: сцены панорам ---------- */
const hasPano = v => !!v.tour;
const isUrl = s => typeof s === 'string' && /^https?:\/\//.test(s);
function scenesOf(v) {
  const list = Array.isArray(v.tour) ? v.tour : [];
  return list.map(s => ({ src: isUrl(s.pano) ? s.pano : `img/pano/${s.pano}`, name: ctx.L(s.name || {}) || '' }));
}
const panoSrc = (s, size) => isUrl(s.src) ? s.src : `${s.src}${size}.webp`;

/* Шейдер: для каждого пикселя экрана считаем направление взгляда и берём точку из равнопромежуточной панорамы */
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = `precision highp float;
uniform sampler2D tex;uniform vec2 res;uniform float yaw,pitch,fov;
void main(){
  vec2 c=(gl_FragCoord.xy*2.-res)/res.y;
  vec3 d=normalize(vec3(c.x,c.y,-1./tan(fov*.5)));
  float cp=cos(pitch),sp=sin(pitch);d=vec3(d.x,d.y*cp-d.z*sp,d.y*sp+d.z*cp);
  float cy=cos(yaw),sy=sin(yaw);d=vec3(d.x*cy-d.z*sy,d.y,d.x*sy+d.z*cy);
  float u=atan(d.x,-d.z)/6.2831853+.5,v=.5-asin(clamp(d.y,-1.,1.))/3.1415927;
  gl_FragColor=texture2D(tex,vec2(u,v));
}`;
function makeGL(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, preserveDrawingBuffer: false }) || canvas.getContext('experimental-webgl');
  if (!gl) return null;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([16, 36, 46]));
  const U = n => gl.getUniformLocation(pr, n);
  return { gl, u: { res: U('res'), yaw: U('yaw'), pitch: U('pitch'), fov: U('fov') }, max: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    setImage(im) { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im); } };
}

function pano(v) {
  if (isUrl(v.tour)) {                                       // Matterport или другой готовый тур по ссылке
    dlg.innerHTML = `<div class="t-real"><iframe src="${esc(v.tour)}" title="${esc(ctx.L(v).name)}" allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen></iframe></div>${X_BTN}`;
    stop = () => {}; if (!dlg.open) dlg.showModal(); return;
  }
  stop();
  const scenes = scenesOf(v), l = ctx.L(v);
  dlg.innerHTML = `
    <div class="t-pano">
      <canvas aria-label="${esc(ctx.t('tour.360'))}: ${esc(l.name)}"></canvas>
      <div class="t-load"><i></i></div>
      <div class="t-top"><p class="t-brand">${esc(l.name)} · ${esc(v.ref)}</p><h2 class="t-scene"></h2></div>
      <p class="t-hint">${ICON.hand}<span>${esc(ctx.t('tour.hint'))}</span></p>
      <div class="t-tools">
        <button type="button" data-z="-1" aria-label="${esc(ctx.t('tour.zoomIn'))}">${ICON.plus}</button>
        <button type="button" data-z="1" aria-label="${esc(ctx.t('tour.zoomOut'))}">${ICON.minus}</button>
        <button type="button" data-fs aria-label="${esc(ctx.t('gal.full'))}">${ICON.full}</button>
      </div>
      <nav class="t-scenes" aria-label="${esc(ctx.t('tour.rooms'))}">${scenes.map((s, j) => `<button type="button" data-s="${j}"><img src="${esc(isUrl(s.src) ? s.src : s.src + '-t.webp')}" alt=""><span>${esc(s.name)}</span></button>`).join('')}</nav>
    </div>${X_BTN}`;
  if (!dlg.open) dlg.showModal();
  const wrap = q('.t-pano'), canvas = q('canvas'), title = q('.t-scene'), hint = q('.t-hint');
  const R = makeGL(canvas);
  if (!R) { wrap.classList.add('flat'); }
  const view = { yaw: 0, pitch: 0, fov: 1.35, vy: 0, vp: 0, auto: !reduce() };
  const FOV_MIN = 0.55, FOV_MAX = 1.75, PITCH_MAX = 1.45;
  let raf = 0, last = 0, sceneN = -1, loadId = 0, interacted = false;

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  function frame(now) {
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    if (view.auto) view.yaw += dt * 0.07;
    view.yaw += view.vy; view.pitch += view.vp; view.vy *= 0.92; view.vp *= 0.92;
    view.pitch = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, view.pitch));
    if (R) {
      if (canvas.width !== Math.round(canvas.clientWidth * Math.min(devicePixelRatio || 1, 2))) resize();
      const { gl, u } = R; gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.res, canvas.width, canvas.height); gl.uniform1f(u.yaw, view.yaw); gl.uniform1f(u.pitch, view.pitch);
      // поле зрения задаём по вертикали; на узком экране телефона расширяем его, чтобы было видно больше комнаты
      const aspect = canvas.width / Math.max(1, canvas.height);
      gl.uniform1f(u.fov, aspect < 1 ? Math.min(2.2, view.fov / Math.max(.62, aspect)) : view.fov);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    raf = requestAnimationFrame(frame);
  }
  function load(src, cb) { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => cb(im); im.onerror = () => cb(null); im.src = src; }
  function go(n) {
    if (n === sceneN) return; sceneN = n; const s = scenes[n], id = ++loadId;
    title.textContent = s.name;
    dlg.querySelectorAll('.t-scenes button').forEach((b, j) => b.setAttribute('aria-current', String(j === n)));
    const btn = dlg.querySelector(`.t-scenes [data-s="${n}"]`); if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    wrap.classList.add('loading');
    if (!R) { wrap.style.setProperty('--flat', `url("${panoSrc(s, '-s')}")`); wrap.classList.remove('loading'); return; }
    const small = isUrl(s.src) ? s.src : panoSrc(s, '-s'), big = isUrl(s.src) ? '' : panoSrc(s, '');
    load(small, im => {
      if (id !== loadId) return;
      if (im) R.setImage(im);
      wrap.classList.remove('loading'); wrap.classList.add('fade'); setTimeout(() => wrap.classList.remove('fade'), 30);
      view.yaw = 0; view.pitch = 0; view.vy = view.vp = 0;
      if (big && R.max >= 4096) load(big, im2 => { if (id === loadId && im2) R.setImage(im2); });   // потом подменяем на чёткую 4K
    });
  }

  // Управление: тянуть пальцем / мышью, щипок и колесо — приближение, стрелки на клавиатуре
  const pts = new Map(); let pinch0 = 0, fov0 = view.fov;
  const firstTouch = () => { if (!interacted) { interacted = true; view.auto = false; hint.classList.add('off'); } };
  canvas.addEventListener('pointerdown', e => { canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); firstTouch(); view.vy = view.vp = 0;
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); fov0 = view.fov; } });
  canvas.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    const [x0, y0] = pts.get(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]);
    if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch0) view.fov = Math.max(FOV_MIN, Math.min(FOV_MAX, fov0 * pinch0 / d)); return; }
    const k = view.fov / canvas.clientHeight;
    const dy = -(e.clientX - x0) * k, dp = (e.clientY - y0) * k;
    view.yaw += dy; view.pitch += dp; view.vy = dy * 0.6; view.vp = dp * 0.6;
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = 0; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', e => { e.preventDefault(); firstTouch(); view.fov = Math.max(FOV_MIN, Math.min(FOV_MAX, view.fov * (1 + e.deltaY * 0.0012))); }, { passive: false });
  const onKey = e => {
    const m = { ArrowLeft: [-.12, 0], ArrowRight: [.12, 0], ArrowUp: [0, .1], ArrowDown: [0, -.1] }[e.key];
    if (m) { e.preventDefault(); firstTouch(); view.vy += m[0] * .25; view.vp += m[1] * .25; }
    else if (e.key === '+' || e.key === '=') zoom(-1); else if (e.key === '-') zoom(1);
  };
  dlg.addEventListener('keydown', onKey);
  const zoom = d => { firstTouch(); view.fov = Math.max(FOV_MIN, Math.min(FOV_MAX, view.fov * (d > 0 ? 1.18 : 1 / 1.18))); };
  dlg.querySelectorAll('[data-z]').forEach(b => b.addEventListener('click', () => zoom(+b.dataset.z)));
  q('[data-fs]').addEventListener('click', () => {
    const el = wrap; if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  });
  dlg.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => go(+b.dataset.s)));
  addEventListener('resize', resize);
  resize(); go(0); raf = requestAnimationFrame(frame);
  stop = () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); dlg.removeEventListener('keydown', onKey); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
}

window.VTour = {
  init(c) { ctx = c; },
  has360: hasPano,
  video(v) { stop(); if (v.video) realVideo(v); else cinema(v); if (!dlg.open) dlg.showModal(); },
  pano(v) { if (!hasPano(v)) return; pano(v); },
  close() { if (dlg.open) dlg.close(); },
  get open() { return dlg.open; }
};
})();
