#!/usr/bin/env node
/* Генератор страниц вилл для Google: villas/<язык>/<id>/index.html (es, en, ru),
   карта сайта sitemap.xml, robots.txt и шаблон Google Таблицы plantilla-villas.csv.
   Запуск из папки villas:  node tools/build-pages.js
   Берёт данные из data.js — после любых изменений вилл запустите его снова. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'), ctx);
const { SITE, AREAS, VILLAS } = ctx.window;
const LANGS = ['es', 'en', 'ru'];
const TODAY = new Date().toISOString().slice(0, 10);

const T = {
  es: { locale: 'es-ES', title: 'villas en la Costa del Sol', all: 'Todas las villas', book: 'Reservar una visita', wa: 'Escribir por WhatsApp', map: 'Ver en el mapa y la calculadora',
    photos: 'Fotos', about: 'Sobre la casa', facts: 'Características', beds: 'Dormitorios', baths: 'Baños', built: 'Construidos', plot: 'Parcela', face: 'Terraza orientada al',
    sun: 'Sol en la terraza en verano', beach: 'A la playa', year: 'Año', energy: 'Certificado energético', ref: 'Referencia', ppm: 'm²', min: 'min', airport: 'min del aeropuerto de Málaga',
    costs: 'Cuánto cuesta la compra', itp: 'ITP (vivienda usada), 7%', iva: 'IVA 10% y AJD 1,2% (obra nueva)', notary: 'Notaría y registro, aprox. 0,5%', lawyer: 'Abogado, 1% + IVA', total: 'Total con gastos',
    mortgage: 'Hipoteca orientativa', monthly: 'al mes', mnote: '40% de entrada, 20 años, 3,4% anual. Cálculo orientativo.', similar: 'Otras villas en', newBuild: 'Obra nueva', sea: 'Vistas al mar',
    faces: { s: 'sur', sw: 'suroeste', w: 'oeste', se: 'sureste' }, raia: 'Nº RAIA', demo: 'Proyecto conceptual para portafolio: la agencia, las villas, los precios y los contactos son ficticios. Fotos: Unsplash.',
    waText: n => `¡Hola! Me interesa ${n}. ¿Cuándo podría verla?`, desc: (l, v, p) => `${l.name}, ${l.where}: ${v.beds} dormitorios, ${v.built} m², ${p}. ${l.desc}` },
  en: { locale: 'en-GB', title: 'villas on the Costa del Sol', all: 'All villas', book: 'Book a viewing', wa: 'Message on WhatsApp', map: 'See it on the map and calculator',
    photos: 'Photos', about: 'About the house', facts: 'Key facts', beds: 'Bedrooms', baths: 'Bathrooms', built: 'Built area', plot: 'Plot', face: 'Terrace faces',
    sun: 'Summer sun on the terrace', beach: 'To the beach', year: 'Year built', energy: 'Energy rating', ref: 'Reference', ppm: 'm²', min: 'min', airport: 'min from Málaga airport',
    costs: 'What the purchase costs', itp: 'Transfer tax (resale), 7%', iva: 'VAT 10% and stamp duty 1.2% (new build)', notary: 'Notary and land registry, about 0.5%', lawyer: 'Lawyer, 1% + VAT', total: 'Total with costs',
    mortgage: 'Mortgage estimate', monthly: 'a month', mnote: '40% deposit, 20 years, 3.4% a year. An estimate.', similar: 'More villas in', newBuild: 'New build', sea: 'Sea views',
    faces: { s: 'south', sw: 'south-west', w: 'west', se: 'south-east' }, raia: 'RAIA no.', demo: 'Portfolio concept project: the agency, villas, prices and contacts are fictional. Photos: Unsplash.',
    waText: n => `Hello! I am interested in ${n}. When could I see it?`, desc: (l, v, p) => `${l.name}, ${l.where}: ${v.beds} bedrooms, ${v.built} m², ${p}. ${l.desc}` },
  ru: { locale: 'ru-RU', title: 'виллы на Коста-дель-Соль', all: 'Все виллы', book: 'Записаться на просмотр', wa: 'Написать в WhatsApp', map: 'Посмотреть на карте и в калькуляторе',
    photos: 'Фото', about: 'О доме', facts: 'Характеристики', beds: 'Спальни', baths: 'Ванные', built: 'Площадь дома', plot: 'Участок', face: 'Терраса смотрит на',
    sun: 'Солнце на террасе летом', beach: 'До пляжа', year: 'Год постройки', energy: 'Энергосертификат', ref: 'Объект', ppm: 'м²', min: 'мин', airport: 'мин из аэропорта Малаги',
    costs: 'Сколько стоит покупка', itp: 'Налог на вторичное жильё (ITP), 7%', iva: 'НДС 10% и гербовый сбор 1,2% (новостройка)', notary: 'Нотариус и реестр, около 0,5%', lawyer: 'Юрист, 1% + НДС', total: 'Всего с расходами',
    mortgage: 'Ипотека, примерно', monthly: 'в месяц', mnote: 'Взнос 40%, 20 лет, 3,4% годовых. Расчёт ориентировочный.', similar: 'Другие виллы: ', newBuild: 'Новостройка', sea: 'Вид на море',
    faces: { s: 'юг', sw: 'юго-запад', w: 'запад', se: 'юго-восток' }, raia: 'Номер RAIA', demo: 'Концепт-проект для портфолио: агентство, виллы, цены и контакты вымышлены. Фото: Unsplash.',
    waText: n => `Здравствуйте! Интересует ${n}. Когда можно посмотреть?`, desc: (l, v, p) => `${l.name}, ${l.where}: ${v.beds} спален, ${v.built} м², ${p}. ${l.desc}` }
};

// метки статуса и доступность для Google
const ST = { es: { new: 'Novedad', reduced: 'Precio rebajado', reserved: 'Reservada', sold: 'Vendida' },
  en: { new: 'New listing', reduced: 'Price reduced', reserved: 'Reserved', sold: 'Sold' },
  ru: { new: 'Новое', reduced: 'Цена снижена', reserved: 'Зарезервирована', sold: 'Продана' } };
// «Что рядом»
const NEAR = { es: { t: 'Qué hay cerca', beach: 'Playa', golf: 'Golf', school: 'Colegio internacional', hospital: 'Hospital', shops: 'Tiendas', town: 'Centro', airport: 'Aeropuerto de Málaga' },
  en: { t: 'What’s nearby', beach: 'Beach', golf: 'Golf', school: 'International school', hospital: 'Hospital', shops: 'Shops', town: 'Town centre', airport: 'Málaga airport' },
  ru: { t: 'Что рядом', beach: 'Пляж', golf: 'Гольф', school: 'Международная школа', hospital: 'Больница', shops: 'Магазины', town: 'Центр города', airport: 'Аэропорт Малаги' } };
const nearList = (v, l) => { const n = { beach: v.beach, ...(v.near || {}), airport: AREAS[v.area].airport };
  return ['beach', 'golf', 'school', 'hospital', 'shops', 'town', 'airport'].filter(k => n[k]).map(k => [NEAR[l][k], `${n[k]} ${T[l].min}`]); };
const AVAIL = { sold: 'https://schema.org/SoldOut', reserved: 'https://schema.org/Reserved' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n, L) => new Intl.NumberFormat(T[L].locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const num = (n, L) => new Intl.NumberFormat(T[L].locale).format(n);
const hm = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
const isUrl = s => /^https?:\/\//.test(s);
const rel = (name, w) => isUrl(name) ? name : `../../img/${name}-${w}.webp`;
const abs = (name, w) => isUrl(name) ? name : `${SITE.url}/img/${name}-${w}.webp`;
const ogImg = v => fs.existsSync(path.join(ROOT, 'img/og', v.id + '.jpg')) ? `${SITE.url}/img/og/${v.id}.jpg` : abs(v.gallery[0], 1600);
const L = (v, l) => v[l] && v[l].name ? v[l] : (v.es && v.es.name ? v.es : v.en);
const areaName = (a, l) => AREAS[a].name[l] || AREAS[a].name.en;

function calc(v) {
  const p = v.price, tax = Math.round(p * (v.newBuild ? .112 : .07)), notary = Math.round(p * .005), lawyer = Math.round(p * .0121);
  const loan = p * .6, r = .034 / 12, n = 240;
  return { tax, notary, lawyer, total: p + tax + notary + lawyer, monthly: Math.round(loan * r / (1 - Math.pow(1 + r, -n))) };
}

function villaPage(v, l) {
  const t = T[l], d = L(v, l), price = money(v.price, l), c = calc(v), url = `${SITE.url}/${l}/${v.id}/`;
  const title = `${d.name} — ${d.where} | ${SITE.brand}`;
  const metaDesc = t.desc(d, v, price).slice(0, 300);
  const others = VILLAS.filter(x => x.area === v.area && x.id !== v.id).concat(VILLAS.filter(x => x.area !== v.area && x.id !== v.id)).slice(0, 3);
  const ld = { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: d.name, description: d.desc, url, datePosted: TODAY,
    image: v.gallery.map(g => abs(g, 1600)),
    offers: { '@type': 'Offer', price: v.price, priceCurrency: 'EUR', availability: AVAIL[v.status] || 'https://schema.org/InStock', seller: { '@type': 'RealEstateAgent', name: SITE.brand, telephone: SITE.phone, email: SITE.email } },
    about: { '@type': 'SingleFamilyResidence', numberOfRooms: v.beds, numberOfBathroomsTotal: v.baths,
      floorSize: { '@type': 'QuantitativeValue', value: v.built, unitCode: 'MTK' },
      address: { '@type': 'PostalAddress', addressLocality: d.where, addressRegion: v.area === 'sotogrande' ? 'Cádiz' : 'Málaga', addressCountry: 'ES' },
      geo: { '@type': 'GeoCoordinates', latitude: v.lat, longitude: v.lng } } };
  const facts = [[t.beds, v.beds], [t.baths, v.baths], [t.built, `${num(v.built, l)} ${t.ppm}`], [t.plot, `${num(v.plot, l)} ${t.ppm}`],
    [t.face, t.faces[v.face] || v.face], [t.sun, `${hm(v.sun[0], v.sun[1])}–${hm(v.sun[2], v.sun[3])}`], [t.beach, `${v.beach} ${t.min}`],
    [t.year, v.year], [t.energy, v.energy], [t.ref, v.ref]];
  const badges = [v.status && ST[l][v.status], v.newBuild && t.newBuild, v.sea && t.sea, `✈ ${AREAS[v.area].airport} ${t.airport}`].filter(Boolean);
  return `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(metaDesc)}">
<link rel="canonical" href="${url}">
${LANGS.map(x => `<link rel="alternate" hreflang="${x}" href="${SITE.url}/${x}/${v.id}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE.url}/es/${v.id}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.brand)}">
<meta property="og:title" content="${esc(`${d.name} — ${price}`)}">
<meta property="og:description" content="${esc(metaDesc)}">
<meta property="og:image" content="${ogImg(v)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#10242E">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Prata&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../page.css?v=${TODAY}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="../../">${esc(SITE.brand)}</a>
  <nav aria-label="Idioma">${LANGS.map(x => `<a href="../../${x}/${v.id}/" hreflang="${x}"${x === l ? ' aria-current="page"' : ''}>${x.toUpperCase()}</a>`).join('')}</nav>
  <a class="btn" href="../../?villa=${v.id}#visit">${t.book}</a>
</div></header>
<main>
<section class="v-hero">
  <img src="${rel(v.gallery[0], 1600)}" srcset="${isUrl(v.gallery[0]) ? '' : `${rel(v.gallery[0], 800)} 800w, ${rel(v.gallery[0], 1600)} 1600w`}" sizes="100vw" alt="${esc(d.name)}" fetchpriority="high">
  <div class="wrap">
    <p class="crumbs"><a href="../../#villas">${t.all}</a> / ${esc(areaName(v.area, l))}</p>
    <h1>${esc(d.name)}</h1>
    <p class="where">${esc(d.where)}</p>
    <div class="v-price">${v.status === 'reduced' && v.oldPrice ? `<s>${money(v.oldPrice, l)}</s>` : ''}<b>${price}</b><span>${money(Math.round(v.price / v.built), l)} / ${t.ppm}</span></div>
    <div class="badges">${badges.map(b => `<span>${esc(b)}</span>`).join('')}</div>
  </div>
</section>
<div class="wrap v-main">
  <div>
    <h2>${t.about}</h2>
    <p class="desc">${esc(d.desc)}</p>
    <h2>${t.photos}</h2>
    <div class="v-gal">${v.gallery.map((g, i) => `<a href="${rel(g, 1600)}"><img src="${rel(g, 800)}" alt="${esc(d.name)}, ${i + 1}" loading="${i ? 'lazy' : 'eager'}"></a>`).join('')}</div>
    <h2>${t.facts}</h2>
    <dl class="facts">${facts.map(([k, x]) => `<div><dt>${k}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>
    <h2 style="margin-top:36px">${NEAR[l].t}</h2>
    <dl class="facts">${nearList(v, l).map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join('')}</dl>
  </div>
  <aside class="side">
    <div class="box">
      <h3>${t.costs}</h3>
      <dl class="costs">
        <div><dt>${v.newBuild ? t.iva : t.itp}</dt><dd>${money(c.tax, l)}</dd></div>
        <div><dt>${t.notary}</dt><dd>${money(c.notary, l)}</dd></div>
        <div><dt>${t.lawyer}</dt><dd>${money(c.lawyer, l)}</dd></div>
        <div class="sum"><dt>${t.total}</dt><dd>${money(c.total, l)}</dd></div>
      </dl>
    </div>
    <div class="box">
      <h3>${t.mortgage}</h3>
      <p class="big">${money(c.monthly, l)} <span style="font:400 16px var(--text);color:var(--muted)">${t.monthly}</span></p>
      <p class="note">${t.mnote}</p>
    </div>
    <div class="ctas">
      <a class="btn" href="../../?villa=${v.id}#visit">${t.book}</a>
      <a class="btn wa" href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t.waText(`${d.name} (${v.ref})`))}" target="_blank" rel="noopener">${t.wa}</a>
      <a class="btn ghost" href="../../#villa/${v.id}">${t.map}</a>
      <a class="btn ghost" href="brochure.html">${B[l].save.split(' / ')[0]}</a>
    </div>
  </aside>
</div>
<section class="wrap more">
  <h2>${t.similar} ${esc(areaName(v.area, l))}</h2>
  <div class="cards">${others.map(o => { const od = L(o, l); return `<a class="card" href="../../${l}/${o.id}/"><img src="${rel(o.gallery[0], 800)}" alt="${esc(od.name)}" loading="lazy"><div><b>${esc(od.name)}</b><span>${esc(od.where)} — ${money(o.price, l)}</span></div></a>`; }).join('')}</div>
</section>
</main>
<footer><div class="wrap">
  <p>${esc(SITE.brand)} · ${esc(SITE.address)} · ${esc(SITE.phone)} · ${t.raia} ${esc((SITE.legal || {}).raia || '—')}</p>
  <nav aria-label="Legal"><a href="../../aviso-legal.html">Aviso legal</a><a href="../../privacidad.html">Privacidad</a><a href="../../cookies.html">Cookies</a></nav>
  <p style="flex-basis:100%">${t.demo}</p>
</div></footer>
</body>
</html>
`;
}

/* ===== Буклет виллы для печати и PDF: villas/<язык>/<id>/brochure.html (2 листа A4) ===== */
const B = {
  es: { save: 'Guardar PDF / imprimir', back: 'Volver a la villa', hint: 'En el móvil: «Compartir» → «Imprimir» → pellizca la vista previa → «Guardar en Archivos».',
    online: 'Fotos, mapa y calculadora en', contact: 'Contacto', desc: 'Sobre la casa', costs: 'Cuánto cuesta la compra' },
  en: { save: 'Save PDF / print', back: 'Back to the villa', hint: 'On a phone: “Share” → “Print” → pinch the preview → “Save to Files”.',
    online: 'Photos, map and calculator at', contact: 'Contact', desc: 'About the house', costs: 'What the purchase costs' },
  ru: { save: 'Сохранить PDF / печать', back: 'Вернуться к вилле', hint: 'На телефоне: «Поделиться» → «Напечатать» → разведите пальцами превью → «Сохранить в Файлы».',
    online: 'Фото, карта и калькулятор:', contact: 'Контакты', desc: 'О доме', costs: 'Сколько стоит покупка' }
};
function brochure(v, l) {
  const t = T[l], b = B[l], d = L(v, l), c = calc(v), url = `${SITE.url}/${l}/${v.id}/`, short = url.replace(/^https?:\/\//, '');
  const photo = (g, w) => rel(g, w);
  const facts = [[t.beds, v.beds], [t.baths, v.baths], [t.built, `${num(v.built, l)} ${t.ppm}`], [t.plot, `${num(v.plot, l)} ${t.ppm}`],
    [t.face, t.faces[v.face] || v.face], [t.sun, `${hm(v.sun[0], v.sun[1])}–${hm(v.sun[2], v.sun[3])}`], [t.beach, `${v.beach} ${t.min}`],
    [t.year, v.year], [t.energy, v.energy]];
  const badges = [v.status && ST[l][v.status], v.newBuild && t.newBuild, v.sea && t.sea, `✈ ${AREAS[v.area].airport} ${t.airport}`].filter(Boolean);
  const more = v.gallery.slice(1, 5);
  const foot = `<div class="b-foot"><div><b>${esc(SITE.brand)}</b><span>${esc(SITE.address)}</span><span>${esc(SITE.phone)} · ${esc(SITE.email)}</span></div>
      <div class="b-url"><span>${b.online}</span><b>${esc(short)}</b></div></div>`;
  return `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(d.name)} — ${esc(SITE.brand)} (PDF)</title>
<meta name="robots" content="noindex">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Prata&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../brochure.css?v=${TODAY}">
</head>
<body>
<div class="toolbar"><a href="./">${b.back}</a><button type="button" onclick="window.print()">${b.save}</button><p>${b.hint}</p></div>
<section class="sheet">
  <div class="b-hero"><img src="${photo(v.gallery[0], 1600)}" alt="${esc(d.name)}"><span class="b-brand">${esc(SITE.brand)}</span><span class="b-ref">${t.ref} ${esc(v.ref)}</span></div>
  <div class="b-body">
    <p class="b-where">${esc(d.where)}</p>
    <h1>${esc(d.name)}</h1>
    <div class="b-price">${v.status === 'reduced' && v.oldPrice ? `<s>${money(v.oldPrice, l)}</s>` : ''}<b>${money(v.price, l)}</b><span>${money(Math.round(v.price / v.built), l)} / ${t.ppm}</span></div>
    <div class="b-badges">${badges.map(x => `<span>${esc(x)}</span>`).join('')}</div>
    <dl class="b-facts">${facts.map(([k, x]) => `<div><dt>${k}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>
  </div>
  ${foot}
</section>
<section class="sheet">
  <div class="b-grid">${more.map(g => `<img src="${photo(g, 800)}" alt="">`).join('')}</div>
  <div class="b-two">
    <div><h2>${b.desc}</h2><p>${esc(d.desc)}</p>
      <h2 style="margin-top:6mm">${NEAR[l].t}</h2>
      <dl class="b-costs">${nearList(v, l).map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join('')}</dl></div>
    <div><h2>${b.costs}</h2>
      <dl class="b-costs">
        <div><dt>${v.newBuild ? t.iva : t.itp}</dt><dd>${money(c.tax, l)}</dd></div>
        <div><dt>${t.notary}</dt><dd>${money(c.notary, l)}</dd></div>
        <div><dt>${t.lawyer}</dt><dd>${money(c.lawyer, l)}</dd></div>
        <div class="sum"><dt>${t.total}</dt><dd>${money(c.total, l)}</dd></div>
        <div><dt>${t.mortgage}</dt><dd>${money(c.monthly, l)} ${t.monthly}</dd></div>
      </dl>
      <p class="b-note">${t.mnote}</p>
    </div>
  </div>
  ${foot}
  <p class="b-demo">${t.raia} ${esc((SITE.legal || {}).raia || '—')}. ${t.demo}</p>
</section>
<script>
// на узком экране лист A4 уменьшается под ширину; при печати — снова точный A4
(function () {
  var fit = function () { var k = Math.min(1, (innerWidth - 16) / 794);
    document.querySelectorAll('.sheet').forEach(function (s) { s.style.zoom = k < 1 ? k : ''; }); };
  fit(); addEventListener('resize', fit);
  addEventListener('beforeprint', function () { document.querySelectorAll('.sheet').forEach(function (s) { s.style.zoom = ''; }); });
  addEventListener('afterprint', fit);
})();
</script>
</body>
</html>
`;
}

// страницы вилл
let pages = 0;
for (const l of LANGS) {
  const dir = path.join(ROOT, l); fs.rmSync(dir, { recursive: true, force: true });
  for (const v of VILLAS) {
    fs.mkdirSync(path.join(dir, v.id), { recursive: true });
    fs.writeFileSync(path.join(dir, v.id, 'index.html'), villaPage(v, l)); pages++;
    fs.writeFileSync(path.join(dir, v.id, 'brochure.html'), brochure(v, l));
  }
}
// карта сайта и robots.txt
const urls = [`${SITE.url}/`, ...LANGS.flatMap(l => VILLAS.map(v => `${SITE.url}/${l}/${v.id}/`))];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
// шаблон Google Таблицы из текущих вилл
const cols = ['id', 'ref', 'area', 'lat', 'lng', 'price', 'status', 'oldprice', 'beds', 'baths', 'built', 'plot', 'sun', 'face', 'sea', 'newbuild', 'beach', 'golf', 'school', 'hospital', 'shops', 'town', 'year', 'energy', 'photos',
  'name_es', 'where_es', 'desc_es', 'name_en', 'where_en', 'desc_en', 'name_ru', 'where_ru', 'desc_ru'];
const cell = x => /[",\n]/.test(String(x)) ? `"${String(x).replace(/"/g, '""')}"` : String(x);
const csv = [cols.join(','), ...VILLAS.map(v => [v.id, v.ref, v.area, v.lat, v.lng, v.price, v.status || '', v.oldPrice || '', v.beds, v.baths, v.built, v.plot,
  `${hm(v.sun[0], v.sun[1])}-${hm(v.sun[2], v.sun[3])}`, v.face, v.sea ? 'si' : 'no', v.newBuild ? 'si' : 'no', v.beach, ...['golf', 'school', 'hospital', 'shops', 'town'].map(k => (v.near || {})[k] || ''), v.year, v.energy, v.gallery.join(' | '),
  v.es.name, v.es.where, v.es.desc, v.en.name, v.en.where, v.en.desc, v.ru.name, v.ru.where, v.ru.desc].map(cell).join(','))].join('\n');
fs.writeFileSync(path.join(ROOT, 'plantilla-villas.csv'), '﻿' + csv + '\n');
console.log(`Готово: ${pages} страниц вилл, sitemap.xml (${urls.length} адресов), robots.txt, plantilla-villas.csv`);
