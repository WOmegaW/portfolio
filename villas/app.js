/* Vertiente — логика сайта. Данные (виллы, контакты) — в data.js. */
(() => {
'use strict';
const SITE = window.SITE, AREAS = window.AREAS, VILLAS = window.VILLAS;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = id => VILLAS.find(v => v.id === id);

/* ===================== Тексты интерфейса ===================== */
function plural(n, one, few, many) { const a = n % 10, b = n % 100; if (a === 1 && b !== 11) return one; if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few; return many; }
const T = {
ru: {
 'nav.villas': 'Виллы', 'nav.coast': 'Районы', 'nav.buy': 'Как купить', 'nav.visit': 'Просмотр', 'nav.menu': 'Меню', 'nav.sell': 'Продать', 'pdf': 'Буклет PDF', 'cur.label': 'Валюта',
 'tour.video': 'Видео-тур', 'tour.360': '3D-тур 360°', 'tour.badge': '3D-тур', 'tour.hint': 'Тяните, чтобы осмотреться', 'tour.rooms': 'Комнаты', 'tour.zoomIn': 'Приблизить', 'tour.zoomOut': 'Отдалить',
 'tour.pause': 'Пауза', 'tour.play': 'Продолжить', 'tour.replay': 'Смотреть ещё раз', 'tour.beds': 'спальни', 'tour.endText': 'Понравилось? Покажем виллу вживую — или проведём видеопросмотр по WhatsApp.',
 'room.living': 'Гостиная', 'room.kitchen': 'Кухня', 'room.dining': 'Столовая', 'room.bed': 'Спальня', 'room.bath': 'Ванная', 'room.pool': 'Бассейн', 'room.view': 'Вид с террасы', 'room.terrace': 'Терраса', 'room.garden': 'Сад', 'room.inside': 'Интерьер', 'room.outside': 'Вилла снаружи',
 
 'near.title': 'Что рядом', 'near.note': 'Минуты на машине, до пляжа — пешком или на машине.',
 'near': { beach: 'Пляж', golf: 'Гольф', school: 'Международная школа', hospital: 'Больница', shops: 'Магазины', town: 'Центр города', airport: 'Аэропорт Малаги' },
 'st.new': 'Новое', 'st.reduced': 'Цена снижена', 'st.reserved': 'Зарезервирована', 'st.sold': 'Продана', 'st.was': 'Прежняя цена',
 'cur.note': d => `Пересчёт по курсу Европейского ЦБ${d ? ' на ' + d : ''}. Сделка проводится в евро.`,
 'sell.title': 'Продаёте виллу?', 'sell.lead': 'Оценим ваш дом бесплатно за 48 часов: по реальным сделкам в вашем районе, с учётом вида, террасы и солнца. Наши покупатели из Великобритании, Скандинавии, Германии и Бельгии уже ищут дома на этом побережье.',
 'sell.p1': 'Оценка по реальным сделкам в вашем районе, а не по средней цене', 'sell.p2': 'Профессиональная съёмка: фото, видео и 3D-тур', 'sell.p3': 'Показ на трёх языках, на этом сайте и международных порталах',
 'sell.form': 'Бесплатная оценка', 'sell.area': 'Район', 'sell.other': 'Другой район', 'sell.type': 'Тип недвижимости',
 'sell.types': { villa: 'Вилла', townhouse: 'Таунхаус', apartment: 'Квартира', plot: 'Участок', other: 'Другое' },
 'sell.beds': 'Спальни', 'sell.built': 'Площадь, м²', 'sell.addr': 'Адрес или урбанизация (необязательно)', 'sell.send': 'Получить оценку',
 'sell.ok.t': 'Заявка на оценку принята', 'sell.ok.p': n => `${n}, свяжемся с вами в течение 24 часов и договоримся о визите.`,
 'cta.visit': 'Записаться на просмотр', 'cta.see': 'Смотреть виллы', 'cta.visitThis': 'Записаться на просмотр',
 'hero.title': 'Виллы над морем Коста-дель-Соль',
 'hero.text': n => `Подбираем дом по тому, как в нём падает свет: утренний кофе на восточной террасе, ужин у бассейна на закате. ${n} ${plural(n, 'вилла', 'виллы', 'вилл')} от Сотогранде до Малаги.`,
 'dial.label': 'Время суток', 'dial.hint': 'Потяните солнце по небу или просто листайте вниз: за одну страницу на побережье пройдёт целый день.',
 'dayhint.text': '<b>Пока вы листаете, на побережье проходит день.</b> Вверху утро, внизу вечерние огни. Часы в углу показывают, который час на побережье.', 'dayhint.btn': 'Время дня на сайте', 'toTop': 'Наверх',
 'ph.dawn': 'Раннее утро', 'ph.morning': 'Утро', 'ph.noon': 'Полдень', 'ph.afternoon': 'После обеда', 'ph.golden': 'Золотой час', 'ph.dusk': 'После заката',
 'villas.title': 'Дома, в которых живёт свет',
 'villas.lead': 'У каждой виллы указано, куда смотрит терраса и сколько часов на ней солнце летом. Это первое, о чём спрашивают наши покупатели.',
 'filter.area': 'Район', 'filter.all': 'Все районы', 'filter.beds': 'Спальни', 'filter.any': 'любое', 'filter.price': 'Цена', 'filter.anyp': 'любая',
 'filter.p2': 'до 2 млн €', 'filter.p3': 'до 3 млн €', 'filter.p5': 'до 5 млн €',
 'flt.sea': 'Вид на море', 'flt.new': 'Новостройка', 'flt.beach': 'До пляжа 10 минут', 'flt.fav': 'Только избранное',
 'sort.label': 'Сортировка', 'sort.rec': 'Рекомендуем', 'sort.pa': 'Сначала дешевле', 'sort.pd': 'Сначала дороже', 'sort.area': 'Больше площадь',
 'count': n => `${n} ${plural(n, 'вилла', 'виллы', 'вилл')}`,
 'empty': 'Под эти условия вилл нет.', 'emptyFav': 'В избранном пока пусто. Нажмите на сердечко у виллы, чтобы сохранить её.', 'reset': 'Сбросить фильтры',
 'sun': (a, b) => `Солнце на террасе ${a}–${b}`, 'photos': n => `${n} фото`,
 'badge.new': 'Новостройка', 'badge.sea': 'Вид на море',
 'beds': n => `${n} ${plural(n, 'спальня', 'спальни', 'спален')}`, 'm2': 'м²',
 'fav.add': 'Добавить в избранное', 'fav.remove': 'Убрать из избранного', 'fav.header': 'Избранное',
 'cmp.add': 'Сравнить', 'cmp.added': 'В сравнении', 'cmp.tray': n => `В сравнении ${n} из 3`, 'cmp.open': 'Сравнить', 'cmp.clear': 'Очистить сравнение',
 'cmp.max': 'Сравнить можно до трёх вилл. Уберите одну, чтобы добавить новую.', 'cmp.title': 'Сравнение вилл', 'cmp.remove': 'Убрать из сравнения', 'cmp.need': 'Добавьте ещё одну виллу, чтобы сравнить.',
 'share': 'Поделиться', 'copied': 'Ссылка на виллу скопирована', 'favAdded': 'Добавлено в избранное', 'favRemoved': 'Убрано из избранного',
 'coast.title': 'Побережье за один час', 'coast.lead': 'От аэропорта Малаги до Эстепоны меньше часа по трассе вдоль моря. Выберите район: карта приблизится и покажет каждую виллу с ценой.',
 'atlas.allTitle': 'Всё побережье', 'atlas.allText': (a, v) => `${a} ${plural(a, 'район', 'района', 'районов')} и ${v} ${plural(v, 'вилла', 'виллы', 'вилл')} от Гибралтара до Малаги. Чем западнее, тем длиннее закаты и тише вечера; ближе к Малаге — аэропорт в пятнадцати минутах.`, 'atlas.airport': n => `${n} мин из аэропорта`, 'atlas.from': p => `от ${p}`, 'atlas.range': (a, b) => `от ${a} до ${b}`, 'atlas.show': n => `Показать ${n} ${plural(n, 'виллу', 'виллы', 'вилл')} в каталоге`, 'atlas.pick': 'Нажмите на виллу на карте или в списке, и здесь откроется её карточка с калькулятором.', 'atlas.more': 'Все фото и подробности', 'atlas.scale': '10 км',
 'coast.map': 'Карта побережья от Гибралтара до Малаги', 'coast.sea': 'Средиземное море',
 'zone.villas': n => `${n} ${plural(n, 'вилла', 'виллы', 'вилл')} в продаже`,
 'buy.title': 'Как купить дом в Испании', 'buy.lead': 'Обычно от первого просмотра до ключей проходит шесть–восемь недель. Мы ведём сделку на русском, испанском и английском.',
 's1.t': 'Просмотр', 's1.p': 'Показываем дом в то время суток, которое для вас важно. Если вы не в Испании — по видеосвязи, с той же террасы.', 's1.d': '1–3 дня',
 's2.t': 'Задаток', 's2.p': 'Договор задатка (contrato de arras), обычно 10% цены. После него дом снимают с продажи.', 's2.d': '1 неделя',
 's3.t': 'Проверка', 's3.p': 'Юрист проверяет выписку из реестра (nota simple), долги и лицензии. Помогаем оформить NIE и счёт в банке.', 's3.d': '3–5 недель',
 's4.t': 'Нотариус и ключи', 's4.p': 'Подписание у нотариуса. Налог на покупку вторичного жилья в Андалусии — 7%, на новостройку — НДС 10%. Ключи в тот же день.', 's4.d': '1 день',
 'visit.title': 'Записаться на просмотр', 'visit.lead': 'Оставьте контакт — перезвоним в течение часа в рабочее время и предложим время.',
 'visit.q': 'Чаще всего просят показать дом на закате.', 'visit.qs': 'Мы подстраиваем просмотр под солнце: приезжайте за час до заката, и вы увидите дом в его лучшем свете.',
 'f.phone': 'Телефон', 'f.email': 'E-mail', 'f.both': 'Оставьте и телефон, и e-mail: если в одном будет опечатка, свяжемся по другому.',
 'e.phone': 'Проверьте номер: нужно минимум 9 цифр.', 'e.email': 'Проверьте e-mail: например, anna@gmail.com',
 'ph.name': 'Например, Анна', 'ph.phone': '+34 600 123 456', 'ph.email': 'anna@gmail.com', 'ph.msg': 'Например: хочу посмотреть ещё пару вилл рядом',
 'ph.addr': 'Например: Nueva Andalucía, La Cerquilla', 'ph.sellMsg': 'Когда удобно встретиться, есть ли ремонт, бассейн…',
 'map.in': 'Приблизить', 'map.out': 'Отдалить', 'map.reset': 'Показать весь район', 'map.hint': 'Ctrl + колесо — масштаб. Карту можно двигать мышью.',
 'loc.title': 'Где находится', 'loc.gmaps': 'Открыть в Google Картах', 'loc.note': 'Показан примерный район. Точный адрес — при записи на просмотр.',
 'agent.title': 'Ваш агент по этой вилле', 'agent.call': 'Позвонить', 'agent.wa': 'Здравствуйте! Интересует {0}.',
 'f.name': 'Имя', 'f.contact': 'Телефон или e-mail', 'f.villa': 'Вилла', 'f.any': 'Пока не выбрал(а) — помогите подобрать', 'f.light': 'Когда показать дом',
 'l.m': 'Утром', 'l.d': 'Днём', 'l.s': 'На закате', 'l.st': 'за час до заката',
 'f.msg': 'Комментарий (необязательно)', 'f.send': 'Отправить заявку', 'f.note': 'Это демонстрационная форма: заявка никуда не отправляется.', 'f.privacy': 'Отправляя заявку, вы соглашаетесь с политикой конфиденциальности.',
 'f.sending': 'Отправляем…', 'e.send': 'Не получилось отправить заявку. Проверьте интернет и попробуйте ещё раз или напишите нам в WhatsApp.',
 'legal.raia': 'Номер в реестре агентов недвижимости Андалусии (RAIA)', 'openPage': 'Страница виллы',
 'cookie.text': 'Мы используем cookies статистики, чтобы понимать, какие виллы смотрят. Включить их?', 'cookie.yes': 'Принять', 'cookie.no': 'Отклонить', 'cookie.more': 'Подробнее',
 'e.name': 'Напишите, как к вам обращаться.', 'e.contact': 'Нужен телефон или e-mail, чтобы мы могли связаться.',
 'ok.t': 'Заявка отправлена', 'ok.p': (n, v) => `${n}, перезвоним в течение часа и предложим время просмотра${v ? ': ' + v : ''}.`, 'ok.again': 'Отправить ещё одну',
 'wa': 'Написать в WhatsApp', 'wa.text': v => v ? `Здравствуйте! Интересует ${v}. Когда можно посмотреть?` : 'Здравствуйте! Помогите подобрать виллу на Коста-дель-Соль.',
 'foot.tag': 'Виллы на склонах Коста-дель-Соль.', 'foot.demo': 'Концепт-проект для портфолио. Агентство Vertiente, виллы, цены и контакты вымышлены, люди на фото — не сотрудники. Фото: Unsplash, StockSnap (CC0).',
 'd.close': 'Закрыть', 'd.ref': 'Объект', 'd.beds': 'Спальни', 'd.baths': 'Ванные', 'd.built': 'Площадь дома', 'd.plot': 'Участок', 'd.face': 'Терраса смотрит',
 'd.sun': 'Солнце на террасе летом', 'd.year': 'Год постройки', 'd.energy': 'Энергосертификат', 'd.beach': 'До пляжа', 'd.ppm': 'Цена за м²', 'd.sea': 'Вид на море',
 'min': n => `${n} мин`, 'yes': 'Да', 'no': 'Нет',
 'face': { s: 'на юг', sw: 'на юго-запад', w: 'на запад', se: 'на юго-восток' },
 'gal.prev': 'Предыдущее фото', 'gal.next': 'Следующее фото', 'gal.full': 'Открыть фото на весь экран', 'gal.of': (i, n) => `${i} из ${n}`,
 'calc.title': 'Сколько стоит покупка', 'calc.price': 'Цена виллы', 'calc.itp': 'Налог на передачу (ITP), 7%', 'calc.iva': 'НДС (IVA) 10% и гербовый сбор (AJD) 1,2%',
 'calc.notary': 'Нотариус и реестр, около 0,5%', 'calc.lawyer': 'Юрист, 1% + НДС', 'calc.total': 'Всего с расходами',
 'calc.mort': 'Ипотека', 'calc.down': 'Первый взнос', 'calc.rate': 'Ставка, % годовых', 'calc.term': 'Срок', 'calc.years': n => `${n} ${plural(n, 'год', 'года', 'лет')}`,
 'calc.loan': 'Кредит', 'calc.monthly': 'Платёж в месяц', 'calc.cash': 'Нужно своих денег (взнос и расходы)',
 'calc.note': 'Расчёт ориентировочный. Нерезидентам испанские банки обычно дают до 60–70% стоимости дома.',
 'title': 'виллы на Коста-дель-Соль'
},
es: {
 'nav.villas': 'Villas', 'nav.coast': 'Zonas', 'nav.buy': 'Cómo comprar', 'nav.visit': 'Visita', 'nav.menu': 'Menú', 'nav.sell': 'Vender', 'pdf': 'Ficha PDF', 'cur.label': 'Moneda',
 'tour.video': 'Vídeo tour', 'tour.360': 'Tour 3D 360°', 'tour.badge': 'Tour 3D', 'tour.hint': 'Arrastra para mirar alrededor', 'tour.rooms': 'Estancias', 'tour.zoomIn': 'Acercar', 'tour.zoomOut': 'Alejar',
 'tour.pause': 'Pausa', 'tour.play': 'Continuar', 'tour.replay': 'Ver otra vez', 'tour.beds': 'dormitorios', 'tour.endText': '¿Te gusta? Te la enseñamos en persona o por videollamada de WhatsApp.',
 'room.living': 'Salón', 'room.kitchen': 'Cocina', 'room.dining': 'Comedor', 'room.bed': 'Dormitorio', 'room.bath': 'Baño', 'room.pool': 'Piscina', 'room.view': 'Vistas desde la terraza', 'room.terrace': 'Terraza', 'room.garden': 'Jardín', 'room.inside': 'Interior', 'room.outside': 'Exterior',
 
 'near.title': 'Qué hay cerca', 'near.note': 'Minutos en coche; a la playa, a pie o en coche.',
 'near': { beach: 'Playa', golf: 'Golf', school: 'Colegio internacional', hospital: 'Hospital', shops: 'Tiendas', town: 'Centro', airport: 'Aeropuerto de Málaga' },
 'st.new': 'Novedad', 'st.reduced': 'Precio rebajado', 'st.reserved': 'Reservada', 'st.sold': 'Vendida', 'st.was': 'Precio anterior',
 'cur.note': d => `Conversión al cambio del Banco Central Europeo${d ? ' del ' + d : ''}. La compraventa se realiza en euros.`,
 'sell.title': '¿Vendes tu villa?', 'sell.lead': 'Valoramos tu casa gratis en 48 horas, según operaciones reales en tu zona y teniendo en cuenta las vistas, la terraza y el sol. Nuestros compradores del Reino Unido, Escandinavia, Alemania y Bélgica ya buscan casa en esta costa.',
 'sell.p1': 'Valoración con operaciones reales de tu zona, no con precios medios', 'sell.p2': 'Reportaje profesional: fotos, vídeo y tour 3D', 'sell.p3': 'Difusión en tres idiomas, en esta web y en portales internacionales',
 'sell.form': 'Valoración gratuita', 'sell.area': 'Zona', 'sell.other': 'Otra zona', 'sell.type': 'Tipo de inmueble',
 'sell.types': { villa: 'Villa', townhouse: 'Adosado', apartment: 'Piso o apartamento', plot: 'Parcela', other: 'Otro' },
 'sell.beds': 'Dormitorios', 'sell.built': 'Superficie, m²', 'sell.addr': 'Dirección o urbanización (opcional)', 'sell.send': 'Pedir valoración',
 'sell.ok.t': 'Solicitud de valoración recibida', 'sell.ok.p': n => `${n}, te contactamos en menos de 24 horas para acordar la visita.`,
 'cta.visit': 'Reservar una visita', 'cta.see': 'Ver villas', 'cta.visitThis': 'Reservar visita',
 'hero.title': 'Villas sobre el mar de la Costa del Sol',
 'hero.text': n => `Elegimos casas por cómo entra la luz: el café de la mañana en la terraza este, la cena junto a la piscina al atardecer. ${n} villas entre Sotogrande y Málaga.`,
 'dial.label': 'Hora del día', 'dial.hint': 'Arrastra el sol por el cielo o simplemente desliza hacia abajo: en una página pasa un día entero en la costa.',
 'dayhint.text': '<b>Mientras te desplazas, en la costa pasa un día.</b> Arriba es por la mañana, abajo, las luces de la noche. El reloj de la esquina marca la hora en la costa.', 'dayhint.btn': 'Hora del día en la web', 'toTop': 'Volver arriba',
 'ph.dawn': 'Primera hora', 'ph.morning': 'Mañana', 'ph.noon': 'Mediodía', 'ph.afternoon': 'Tarde', 'ph.golden': 'Hora dorada', 'ph.dusk': 'Tras la puesta de sol',
 'villas.title': 'Casas donde vive la luz',
 'villas.lead': 'En cada villa indicamos hacia dónde mira la terraza y cuántas horas de sol tiene en verano. Es lo primero que preguntan nuestros clientes.',
 'filter.area': 'Zona', 'filter.all': 'Todas las zonas', 'filter.beds': 'Dormitorios', 'filter.any': 'cualquiera', 'filter.price': 'Precio', 'filter.anyp': 'cualquiera',
 'filter.p2': 'hasta 2 M€', 'filter.p3': 'hasta 3 M€', 'filter.p5': 'hasta 5 M€',
 'flt.sea': 'Vistas al mar', 'flt.new': 'Obra nueva', 'flt.beach': 'Playa a 10 minutos', 'flt.fav': 'Solo favoritas',
 'sort.label': 'Ordenar', 'sort.rec': 'Recomendadas', 'sort.pa': 'Precio más bajo', 'sort.pd': 'Precio más alto', 'sort.area': 'Más superficie',
 'count': n => `${n} ${n === 1 ? 'villa' : 'villas'}`,
 'empty': 'No hay villas con estos filtros.', 'emptyFav': 'Aún no tienes favoritas. Pulsa el corazón de una villa para guardarla.', 'reset': 'Quitar filtros',
 'sun': (a, b) => `Sol en la terraza ${a}–${b}`, 'photos': n => `${n} fotos`,
 'badge.new': 'Obra nueva', 'badge.sea': 'Vistas al mar',
 'beds': n => `${n} ${n === 1 ? 'dormitorio' : 'dormitorios'}`, 'm2': 'm²',
 'fav.add': 'Añadir a favoritas', 'fav.remove': 'Quitar de favoritas', 'fav.header': 'Favoritas',
 'cmp.add': 'Comparar', 'cmp.added': 'Comparando', 'cmp.tray': n => `Comparando ${n} de 3`, 'cmp.open': 'Comparar', 'cmp.clear': 'Vaciar comparación',
 'cmp.max': 'Puedes comparar hasta tres villas. Quita una para añadir otra.', 'cmp.title': 'Comparar villas', 'cmp.remove': 'Quitar de la comparación', 'cmp.need': 'Añade otra villa para comparar.',
 'share': 'Compartir', 'copied': 'Enlace de la villa copiado', 'favAdded': 'Añadida a favoritas', 'favRemoved': 'Quitada de favoritas',
 'coast.title': 'La costa en una hora', 'coast.lead': 'Del aeropuerto de Málaga a Estepona hay menos de una hora por la autopista junto al mar. Elige una zona: el mapa se acerca y muestra cada villa con su precio.',
 'atlas.allTitle': 'Toda la costa', 'atlas.allText': (a, v) => `${a} zonas y ${v} villas de Gibraltar a Málaga. Cuanto más al oeste, más largos los atardeceres y más tranquilas las noches; cerca de Málaga, el aeropuerto queda a quince minutos.`, 'atlas.airport': n => `${n} min del aeropuerto`, 'atlas.from': p => `desde ${p}`, 'atlas.range': (a, b) => `de ${a} a ${b}`, 'atlas.show': n => `Ver ${n} villas en el catálogo`, 'atlas.pick': 'Pulsa una villa en el mapa o en la lista y aquí se abrirá su ficha con la calculadora.', 'atlas.more': 'Todas las fotos y detalles', 'atlas.scale': '10 km',
 'coast.map': 'Mapa de la costa de Gibraltar a Málaga', 'coast.sea': 'Mar Mediterráneo',
 'zone.villas': n => `${n} ${n === 1 ? 'villa' : 'villas'} en venta`,
 'buy.title': 'Cómo comprar una casa en España', 'buy.lead': 'Desde la primera visita hasta las llaves suelen pasar de seis a ocho semanas. Llevamos la operación en español, inglés y ruso.',
 's1.t': 'Visita', 's1.p': 'Te enseñamos la casa a la hora del día que te importa. Si no estás en España, por videollamada desde la misma terraza.', 's1.d': '1–3 días',
 's2.t': 'Arras', 's2.p': 'Contrato de arras, normalmente el 10% del precio. Desde ese momento la casa se retira del mercado.', 's2.d': '1 semana',
 's3.t': 'Comprobación', 's3.p': 'El abogado revisa la nota simple, deudas y licencias. Te ayudamos con el NIE y la cuenta bancaria.', 's3.d': '3–5 semanas',
 's4.t': 'Notaría y llaves', 's4.p': 'Firma ante notario. El ITP de vivienda usada en Andalucía es del 7%; en obra nueva, IVA del 10%. Llaves el mismo día.', 's4.d': '1 día',
 'visit.title': 'Reservar una visita', 'visit.lead': 'Déjanos tu contacto: te llamamos en menos de una hora en horario laboral para proponerte una hora.',
 'visit.q': 'Casi todos piden ver la casa al atardecer.', 'visit.qs': 'Ajustamos la visita al sol: ven una hora antes de la puesta y verás la casa con su mejor luz.',
 'f.phone': 'Teléfono', 'f.email': 'E-mail', 'f.both': 'Déjanos teléfono y e-mail: si uno tiene una errata, te contactamos por el otro.',
 'e.phone': 'Revisa el número: al menos 9 dígitos.', 'e.email': 'Revisa el e-mail: por ejemplo, ana@gmail.com',
 'ph.name': 'Por ejemplo, Ana', 'ph.phone': '+34 600 123 456', 'ph.email': 'ana@gmail.com', 'ph.msg': 'Por ejemplo: me gustaría ver un par de villas más en la zona',
 'ph.addr': 'Por ejemplo: Nueva Andalucía, La Cerquilla', 'ph.sellMsg': 'Cuándo te viene bien la visita, reformas, piscina…',
 'map.in': 'Acercar', 'map.out': 'Alejar', 'map.reset': 'Ver toda la zona', 'map.hint': 'Ctrl + rueda para el zoom. Arrastra el mapa con el ratón.',
 'loc.title': 'Ubicación', 'loc.gmaps': 'Abrir en Google Maps', 'loc.note': 'Zona aproximada. La dirección exacta, al reservar la visita.',
 'agent.title': 'Tu agente para esta villa', 'agent.call': 'Llamar', 'agent.wa': '¡Hola! Me interesa {0}.',
 'f.name': 'Nombre', 'f.contact': 'Teléfono o e-mail', 'f.villa': 'Villa', 'f.any': 'Aún no lo sé, ayúdame a elegir', 'f.light': 'Cuándo ver la casa',
 'l.m': 'Por la mañana', 'l.d': 'A mediodía', 'l.s': 'Al atardecer', 'l.st': 'una hora antes de la puesta',
 'f.msg': 'Comentario (opcional)', 'f.send': 'Enviar solicitud', 'f.note': 'Formulario de demostración: la solicitud no se envía a ningún sitio.', 'f.privacy': 'Al enviar la solicitud aceptas la política de privacidad.',
 'f.sending': 'Enviando…', 'e.send': 'No se ha podido enviar la solicitud. Revisa la conexión e inténtalo de nuevo o escríbenos por WhatsApp.',
 'legal.raia': 'Nº de inscripción en el Registro de Agentes Inmobiliarios de Andalucía (RAIA)', 'openPage': 'Página de la villa',
 'cookie.text': 'Usamos cookies de estadística para saber qué villas se ven más. ¿Las activamos?', 'cookie.yes': 'Aceptar', 'cookie.no': 'Rechazar', 'cookie.more': 'Más información',
 'e.name': 'Dinos cómo te llamas.', 'e.contact': 'Necesitamos un teléfono o un e-mail para contactarte.',
 'ok.t': 'Solicitud enviada', 'ok.p': (n, v) => `${n}, te llamamos en menos de una hora para proponerte la visita${v ? ': ' + v : ''}.`, 'ok.again': 'Enviar otra',
 'wa': 'Escribir por WhatsApp', 'wa.text': v => v ? `¡Hola! Me interesa ${v}. ¿Cuándo podría verla?` : '¡Hola! Me gustaría que me ayudarais a elegir una villa en la Costa del Sol.',
 'foot.tag': 'Villas en las laderas de la Costa del Sol.', 'foot.demo': 'Proyecto conceptual para portafolio. La agencia Vertiente, las villas, los precios y los contactos son ficticios; las personas de las fotos no son empleados. Fotos: Unsplash, StockSnap (CC0).',
 'd.close': 'Cerrar', 'd.ref': 'Referencia', 'd.beds': 'Dormitorios', 'd.baths': 'Baños', 'd.built': 'Construidos', 'd.plot': 'Parcela', 'd.face': 'Orientación de la terraza',
 'd.sun': 'Sol en la terraza en verano', 'd.year': 'Año', 'd.energy': 'Certificado energético', 'd.beach': 'A la playa', 'd.ppm': 'Precio por m²', 'd.sea': 'Vistas al mar',
 'min': n => `${n} min`, 'yes': 'Sí', 'no': 'No',
 'face': { s: 'sur', sw: 'suroeste', w: 'oeste', se: 'sureste' },
 'gal.prev': 'Foto anterior', 'gal.next': 'Foto siguiente', 'gal.full': 'Ver foto a pantalla completa', 'gal.of': (i, n) => `${i} de ${n}`,
 'calc.title': 'Cuánto cuesta la compra', 'calc.price': 'Precio de la villa', 'calc.itp': 'Impuesto de transmisiones (ITP), 7%', 'calc.iva': 'IVA 10% y AJD 1,2%',
 'calc.notary': 'Notaría y registro, aprox. 0,5%', 'calc.lawyer': 'Abogado, 1% + IVA', 'calc.total': 'Total con gastos',
 'calc.mort': 'Hipoteca', 'calc.down': 'Entrada', 'calc.rate': 'Interés, % anual', 'calc.term': 'Plazo', 'calc.years': n => `${n} años`,
 'calc.loan': 'Préstamo', 'calc.monthly': 'Cuota mensual', 'calc.cash': 'Ahorros necesarios (entrada y gastos)',
 'calc.note': 'Cálculo orientativo. A no residentes los bancos españoles suelen financiar hasta el 60–70% del valor.',
 'title': 'villas en la Costa del Sol'
},
en: {
 'nav.villas': 'Villas', 'nav.coast': 'Areas', 'nav.buy': 'How to buy', 'nav.visit': 'Viewing', 'nav.menu': 'Menu', 'nav.sell': 'Sell', 'pdf': 'PDF brochure', 'cur.label': 'Currency',
 'tour.video': 'Video tour', 'tour.360': '3D tour 360°', 'tour.badge': '3D tour', 'tour.hint': 'Drag to look around', 'tour.rooms': 'Rooms', 'tour.zoomIn': 'Zoom in', 'tour.zoomOut': 'Zoom out',
 'tour.pause': 'Pause', 'tour.play': 'Play', 'tour.replay': 'Watch again', 'tour.beds': 'bedrooms', 'tour.endText': 'Like it? We will show it to you in person — or on a WhatsApp video call.',
 'room.living': 'Living room', 'room.kitchen': 'Kitchen', 'room.dining': 'Dining room', 'room.bed': 'Bedroom', 'room.bath': 'Bathroom', 'room.pool': 'Pool', 'room.view': 'Terrace view', 'room.terrace': 'Terrace', 'room.garden': 'Garden', 'room.inside': 'Interior', 'room.outside': 'Exterior',
 
 'near.title': 'What’s nearby', 'near.note': 'Minutes by car; to the beach on foot or by car.',
 'near': { beach: 'Beach', golf: 'Golf', school: 'International school', hospital: 'Hospital', shops: 'Shops', town: 'Town centre', airport: 'Málaga airport' },
 'st.new': 'New listing', 'st.reduced': 'Price reduced', 'st.reserved': 'Reserved', 'st.sold': 'Sold', 'st.was': 'Previous price',
 'cur.note': d => `Converted at the European Central Bank rate${d ? ' of ' + d : ''}. The purchase is completed in euros.`,
 'sell.title': 'Selling your villa?', 'sell.lead': 'We value your home for free within 48 hours, based on real sales in your area and taking the views, terrace and sun into account. Our buyers from the UK, Scandinavia, Germany and Belgium are already looking for homes on this coast.',
 'sell.p1': 'A valuation based on real sales in your area, not average prices', 'sell.p2': 'Professional photos, video and a 3D tour', 'sell.p3': 'Marketing in three languages, on this site and international portals',
 'sell.form': 'Free valuation', 'sell.area': 'Area', 'sell.other': 'Another area', 'sell.type': 'Property type',
 'sell.types': { villa: 'Villa', townhouse: 'Townhouse', apartment: 'Apartment', plot: 'Plot', other: 'Other' },
 'sell.beds': 'Bedrooms', 'sell.built': 'Built area, m²', 'sell.addr': 'Address or development (optional)', 'sell.send': 'Get a valuation',
 'sell.ok.t': 'Valuation request received', 'sell.ok.p': n => `${n}, we will contact you within 24 hours to arrange a visit.`,
 'cta.visit': 'Book a viewing', 'cta.see': 'See the villas', 'cta.visitThis': 'Book a viewing',
 'hero.title': 'Villas above the sea on the Costa del Sol',
 'hero.text': n => `We choose homes by how the light falls: morning coffee on an east terrace, dinner by the pool at sunset. ${n} villas between Sotogrande and Málaga.`,
 'dial.label': 'Time of day', 'dial.hint': 'Drag the sun across the sky or just scroll down: a whole day on the coast passes in one page.',
 'dayhint.text': '<b>As you scroll, a day passes on the coast.</b> Morning at the top, evening lights at the bottom. The clock in the corner shows the time on the coast.', 'dayhint.btn': 'Time of day on the site', 'toTop': 'Back to top',
 'ph.dawn': 'Early morning', 'ph.morning': 'Morning', 'ph.noon': 'Midday', 'ph.afternoon': 'Afternoon', 'ph.golden': 'Golden hour', 'ph.dusk': 'After sunset',
 'villas.title': 'Houses that live in the light',
 'villas.lead': 'For every villa we show which way the terrace faces and how many hours of summer sun it gets. It is the first thing our buyers ask.',
 'filter.area': 'Area', 'filter.all': 'All areas', 'filter.beds': 'Bedrooms', 'filter.any': 'any', 'filter.price': 'Price', 'filter.anyp': 'any',
 'filter.p2': 'up to €2M', 'filter.p3': 'up to €3M', 'filter.p5': 'up to €5M',
 'flt.sea': 'Sea views', 'flt.new': 'New build', 'flt.beach': 'Beach within 10 min', 'flt.fav': 'Favourites only',
 'sort.label': 'Sort', 'sort.rec': 'Recommended', 'sort.pa': 'Lowest price', 'sort.pd': 'Highest price', 'sort.area': 'Largest',
 'count': n => `${n} ${n === 1 ? 'villa' : 'villas'}`,
 'empty': 'No villas match these filters.', 'emptyFav': 'No favourites yet. Tap the heart on a villa to save it.', 'reset': 'Clear filters',
 'sun': (a, b) => `Sun on the terrace ${a}–${b}`, 'photos': n => `${n} photos`,
 'badge.new': 'New build', 'badge.sea': 'Sea views',
 'beds': n => `${n} ${n === 1 ? 'bedroom' : 'bedrooms'}`, 'm2': 'm²',
 'fav.add': 'Add to favourites', 'fav.remove': 'Remove from favourites', 'fav.header': 'Favourites',
 'cmp.add': 'Compare', 'cmp.added': 'Comparing', 'cmp.tray': n => `Comparing ${n} of 3`, 'cmp.open': 'Compare', 'cmp.clear': 'Clear comparison',
 'cmp.max': 'You can compare up to three villas. Remove one to add another.', 'cmp.title': 'Compare villas', 'cmp.remove': 'Remove from comparison', 'cmp.need': 'Add one more villa to compare.',
 'share': 'Share', 'copied': 'Villa link copied', 'favAdded': 'Added to favourites', 'favRemoved': 'Removed from favourites',
 'coast.title': 'The coast in one hour', 'coast.lead': 'From Málaga airport to Estepona is under an hour on the motorway along the sea. Pick an area: the map zooms in and shows every villa with its price.',
 'atlas.allTitle': 'The whole coast', 'atlas.allText': (a, v) => `${a} areas and ${v} villas from Gibraltar to Málaga. The further west, the longer the sunsets and the quieter the evenings; near Málaga, the airport is fifteen minutes away.`, 'atlas.airport': n => `${n} min from the airport`, 'atlas.from': p => `from ${p}`, 'atlas.range': (a, b) => `${a} to ${b}`, 'atlas.show': n => `Show ${n} villas in the catalogue`, 'atlas.pick': 'Tap a villa on the map or in the list and its card with the calculator opens here.', 'atlas.more': 'All photos and details', 'atlas.scale': '10 km',
 'coast.map': 'Map of the coast from Gibraltar to Málaga', 'coast.sea': 'Mediterranean Sea',
 'zone.villas': n => `${n} ${n === 1 ? 'villa' : 'villas'} for sale`,
 'buy.title': 'How to buy a home in Spain', 'buy.lead': 'From the first viewing to the keys usually takes six to eight weeks. We handle the purchase in English, Spanish and Russian.',
 's1.t': 'Viewing', 's1.p': 'We show the house at the time of day that matters to you. If you are not in Spain, by video call from the same terrace.', 's1.d': '1–3 days',
 's2.t': 'Deposit', 's2.p': 'A deposit contract (contrato de arras), usually 10% of the price. The house then comes off the market.', 's2.d': '1 week',
 's3.t': 'Checks', 's3.p': 'A lawyer reviews the land registry extract (nota simple), debts and licences. We help you get an NIE and a bank account.', 's3.d': '3–5 weeks',
 's4.t': 'Notary and keys', 's4.p': 'Signing at the notary. Transfer tax on resale homes in Andalusia is 7%; new builds pay 10% VAT. Keys the same day.', 's4.d': '1 day',
 'visit.title': 'Book a viewing', 'visit.lead': 'Leave your contact and we will call back within an hour during office hours to suggest a time.',
 'visit.q': 'Most people ask to see the house at sunset.', 'visit.qs': 'We time the viewing to the sun: come an hour before sunset and you will see the house in its best light.',
 'f.phone': 'Phone', 'f.email': 'Email', 'f.both': 'Leave both phone and email: if one has a typo, we will reach you on the other.',
 'e.phone': 'Check the number: at least 9 digits.', 'e.email': 'Check the email, e.g. anna@gmail.com',
 'ph.name': 'e.g. Anna', 'ph.phone': '+34 600 123 456', 'ph.email': 'anna@gmail.com', 'ph.msg': 'e.g. I would like to see a couple more villas nearby',
 'ph.addr': 'e.g. Nueva Andalucía, La Cerquilla', 'ph.sellMsg': 'When suits you for a visit, renovations, pool…',
 'map.in': 'Zoom in', 'map.out': 'Zoom out', 'map.reset': 'Show the whole area', 'map.hint': 'Ctrl + scroll to zoom. Drag the map with the mouse.',
 'loc.title': 'Location', 'loc.gmaps': 'Open in Google Maps', 'loc.note': 'Approximate area shown. Exact address when you book a viewing.',
 'agent.title': 'Your agent for this villa', 'agent.call': 'Call', 'agent.wa': 'Hello! I am interested in {0}.',
 'f.name': 'Name', 'f.contact': 'Phone or email', 'f.villa': 'Villa', 'f.any': 'Not sure yet, help me choose', 'f.light': 'When to see the house',
 'l.m': 'Morning', 'l.d': 'Midday', 'l.s': 'At sunset', 'l.st': 'an hour before sunset',
 'f.msg': 'Comment (optional)', 'f.send': 'Send request', 'f.note': 'This is a demo form: the request is not sent anywhere.', 'f.privacy': 'By sending the request you accept the privacy policy.',
 'f.sending': 'Sending…', 'e.send': 'The request could not be sent. Check your connection and try again, or message us on WhatsApp.',
 'legal.raia': 'Andalusian Real Estate Agents Register (RAIA) no.', 'openPage': 'Villa page',
 'cookie.text': 'We use analytics cookies to see which villas people look at. Turn them on?', 'cookie.yes': 'Accept', 'cookie.no': 'Decline', 'cookie.more': 'Learn more',
 'e.name': 'Tell us what to call you.', 'e.contact': 'We need a phone number or email to reach you.',
 'ok.t': 'Request sent', 'ok.p': (n, v) => `${n}, we will call within an hour to suggest a viewing time${v ? ': ' + v : ''}.`, 'ok.again': 'Send another',
 'wa': 'Message on WhatsApp', 'wa.text': v => v ? `Hello! I am interested in ${v}. When could I see it?` : 'Hello! Could you help me choose a villa on the Costa del Sol?',
 'foot.tag': 'Villas on the hillsides of the Costa del Sol.', 'foot.demo': 'Portfolio concept project. The Vertiente agency, villas, prices and contacts are fictional; the people pictured are not employees. Photos: Unsplash, StockSnap (CC0).',
 'd.close': 'Close', 'd.ref': 'Reference', 'd.beds': 'Bedrooms', 'd.baths': 'Bathrooms', 'd.built': 'Built area', 'd.plot': 'Plot', 'd.face': 'Terrace faces',
 'd.sun': 'Summer sun on the terrace', 'd.year': 'Year built', 'd.energy': 'Energy rating', 'd.beach': 'To the beach', 'd.ppm': 'Price per m²', 'd.sea': 'Sea views',
 'min': n => `${n} min`, 'yes': 'Yes', 'no': 'No',
 'face': { s: 'south', sw: 'south-west', w: 'west', se: 'south-east' },
 'gal.prev': 'Previous photo', 'gal.next': 'Next photo', 'gal.full': 'Open photo full screen', 'gal.of': (i, n) => `${i} of ${n}`,
 'calc.title': 'What the purchase costs', 'calc.price': 'Villa price', 'calc.itp': 'Transfer tax (ITP), 7%', 'calc.iva': 'VAT (IVA) 10% and stamp duty (AJD) 1.2%',
 'calc.notary': 'Notary and land registry, about 0.5%', 'calc.lawyer': 'Lawyer, 1% + VAT', 'calc.total': 'Total with costs',
 'calc.mort': 'Mortgage', 'calc.down': 'Deposit', 'calc.rate': 'Interest, % a year', 'calc.term': 'Term', 'calc.years': n => `${n} years`,
 'calc.loan': 'Loan', 'calc.monthly': 'Monthly payment', 'calc.cash': 'Own funds needed (deposit and costs)',
 'calc.note': 'An estimate. Spanish banks usually lend non-residents up to 60–70% of the property value.',
 'title': 'villas on the Costa del Sol'
}};

/* ===================== Хранилище (не обязательно доступно) ===================== */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* приватный режим — живём без сохранения */ } }
};

/* ===================== Язык и форматирование ===================== */
const navLang = (navigator.language || '').slice(0, 2);
let lang = store.get('vt-lang', null);
if (!T[lang]) lang = T[navLang] ? navLang : 'en';
const t = (k, ...a) => { const v = T[lang][k]; return typeof v === 'function' ? v(...a) : v; };
const LOCALE = { ru: 'ru-RU', es: 'es-ES', en: 'en-GB' };
/* Валюта: цены в базе в евро, показываем в выбранной валюте по курсу ЕЦБ */
const CURS = SITE.currencies || ['EUR'];
let cur = store.get('vt-cur', 'EUR'); if (!CURS.includes(cur)) cur = 'EUR';
let rates = { EUR: 1, ...(SITE.fallbackRates || {}) }, ratesDate = '';
const conv = n => n * (rates[cur] || 1);
const money = n => new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(conv(n));
const num = n => new Intl.NumberFormat(LOCALE[lang]).format(n);
const hm = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
const L = v => v[lang] || v.en;
const areaName = a => AREAS[a].name[lang] || AREAS[a].name.en;
const areaText = a => AREAS[a].text[lang] || AREAS[a].text.en;
// районы, в которых сейчас есть виллы (пустые не показываем во вкладках, на карте и в фильтре)
const liveAreas = () => Object.keys(AREAS).filter(a => VILLAS.some(v => v.area === a));
const sunText = v => t('sun', hm(v.sun[0], v.sun[1]), hm(v.sun[2], v.sun[3]));
// фото: имя из папки img/ (две версии 800/1600) или прямая ссылка https://… (например, из Google Таблицы)
const isUrl = name => /^https?:\/\//.test(name);
const img = (name, w) => isUrl(name) ? name : `img/${name}-${w}.webp`;
const srcset = name => isUrl(name) ? name : `${img(name, 800)} 800w, ${img(name, 1600)} 1600w`;
// отдельная страница виллы (для Google и превью ссылок): villas/<язык>/<id>/
const pageUrl = (id, abs) => `${abs ? SITE.url + '/' : ''}${lang}/${id}/`;

/* ===================== Состояние ===================== */
const F = { area: 'all', beds: 0, price: 0, sea: false, newBuild: false, beach: false, fav: false, sort: 'rec' };
let favs = store.get('vt-fav', []).filter(byId);
let compare = [];

/* ===================== Всплывающие подсказки ===================== */
const toastEl = $('#toast'); let toastTimer = 0;
function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2600); }

/* ===================== Шапка ===================== */
const top_ = $('#top'), menuBtn = $('.menu-btn');
const onScrollHeader = () => top_.classList.toggle('solid', scrollY > innerHeight * .75);
addEventListener('scroll', onScrollHeader, { passive: true }); onScrollHeader();
// меню на телефоне: пока открыто, страница под ним не листается
const setMenu = o => { top_.classList.toggle('open', o); menuBtn.setAttribute('aria-expanded', String(o)); document.documentElement.classList.toggle('menu-lock', o); };
menuBtn.addEventListener('click', () => setMenu(!top_.classList.contains('open')));
$$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && top_.classList.contains('open')) setMenu(false); });
matchMedia('(min-width: 961px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
$('#favBtn').addEventListener('click', () => { F.fav = true; $('#fFav').checked = true; renderGrid(); $('#villas').scrollIntoView(); });

/* ===================== Солнце: время суток = положение на странице ===================== */
// Время суток задаёт только прокрутка: вверху утро, внизу вечер — меняется свет фона.
const layersEl = $('#layers'), tint = $('#tint'), glow = $('#glow');
const DAY_START = 420, DAY_END = 1290, MORNING = 560;
const KEYS = [
  [420, [150, 172, 205, .55], [255, 190, 150, .10], .78, .80],
  [540, [205, 218, 232, .28], [255, 236, 210, .10], .95, .95],
  [780, [255, 255, 255, 0], [255, 255, 255, 0], 1.04, 1.05],
  [960, [255, 246, 230, .10], [255, 230, 190, .06], 1.02, 1.05],
  [1170, [255, 150, 80, .58], [255, 165, 80, .40], 1.02, 1.28],
  [1230, [205, 105, 100, .62], [255, 115, 60, .26], .84, 1.12],
  [1290, [52, 70, 128, .78], [255, 150, 90, .06], .62, .85]
];
const lerp = (a, b, k) => a + (b - a) * k;
function lightAt(m) {
  let i = 0; while (i < KEYS.length - 2 && m > KEYS[i + 1][0]) i++;
  const A = KEYS[i], B = KEYS[i + 1], k = Math.min(1, Math.max(0, (m - A[0]) / (B[0] - A[0])));
  const mix = (x, y) => x.map((v, j) => lerp(v, y[j], k));
  return { sh: mix(A[1], B[1]), li: mix(A[2], B[2]), br: lerp(A[3], B[3], k), sa: lerp(A[4], B[4], k) };
}
const phaseKey = m => m < 500 ? 'ph.dawn' : m < 690 ? 'ph.morning' : m < 870 ? 'ph.noon' : m < 1110 ? 'ph.afternoon' : m < 1250 ? 'ph.golden' : 'ph.dusk';
let minutes = MORNING, base = MORNING, introRaf = 0, raf = 0;
function updateSun(m) {
  minutes = m;
  const p = (m - DAY_START) / (DAY_END - DAY_START);
  const s = lightAt(m), rgba = c => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${c[3].toFixed(3)})`;
  tint.style.background = `linear-gradient(${lerp(200, 250, p)}deg, ${rgba(s.sh)} 0%, ${rgba([s.sh[0], s.sh[1], s.sh[2], s.sh[3] * .55])} 100%)`;
  glow.style.background = `radial-gradient(circle at ${lerp(15, 92, p)}% ${lerp(30, 8, Math.sin(Math.PI * p))}%, ${rgba(s.li)} 0%, rgba(0,0,0,0) 60%)`;
  layersEl.style.filter = `brightness(${s.br.toFixed(3)}) saturate(${s.sa.toFixed(3)})`;
}
const progress = () => { const h = document.documentElement.scrollHeight - innerHeight; return h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0; };
const timeFromScroll = () => base + (DAY_END - base) * progress();
function onScrollLight() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0; if (!introRaf) updateSun(timeFromScroll());
    $('#toTop').classList.toggle('on', scrollY > innerHeight * 1.4);
  });
}
addEventListener('scroll', onScrollLight, { passive: true });
addEventListener('resize', onScrollLight);

/* Кнопка «Наверх» — день плавно перематывается к утру */
$('#toTop').addEventListener('click', () => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
function stopIntro() { if (introRaf) { cancelAnimationFrame(introRaf); introRaf = 0; } }
function intro() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || scrollY > 10) { updateSun(timeFromScroll()); return; }
  const dur = 2400, t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); updateSun(lerp(DAY_START, timeFromScroll(), e)); introRaf = k < 1 ? requestAnimationFrame(step) : 0; };
  introRaf = requestAnimationFrame(step);
}

/* Фото разделов сменяют друг друга */
const layerEls = $$('.layer'), scrim = $('#scrim');
const wallEl = document.getElementById('wall'), hasWall = !!(SITE.wall && wallEl);
// Под всеми разделами, кроме первого экрана, — фон «о фирме» (если он заполнен в data.js)
function showBg(key) { const k = hasWall && key !== 'hero' ? 'brand' : key; layerEls.forEach(l => l.classList.toggle('on', l.dataset.bg === k)); scrim.classList.toggle('on', key !== 'hero'); runWall(k === 'brand'); }
const WALL_STEP = 6500;
const wallOne = matchMedia('(max-width: 700px), (max-height: 520px)');
wallOne.addEventListener('change', () => renderWall());                                             // каждая полоса меняет кадр раз в 6,5 с, полосы — со сдвигом
let wallTimers = [], wallOn = false;
function renderWall() {
  const txt = o => (o && (o[lang] || o.en)) || '';
  const st = $('#heroStats');
  if (st) st.innerHTML = (SITE.stats || []).map(o => `<li><b>${typeof o.big === 'object' ? txt(o.big) : o.big}</b><span>${txt(o)}</span></li>`).join('');
  if (!hasWall) return;
  const w = SITE.wall, one = wallOne.matches;
  const photo = (o, i) => `<div class="slide${i ? '' : ' on'}" style="--pan:${i % 2 ? -1.5 : 1.5}%"><img src="img/brand/${o.photo}.webp" alt="" loading="${i ? 'lazy' : 'eager'}" decoding="async"></div>`;
  // на узком или низком экране три колонки слишком мелкие — показываем одно фото на весь экран, по очереди из всех колонок
  const groups = ['team', 'place', 'firm'].map(k => w[k] || []), mixed = [];
  for (let i = 0; i < Math.max(...groups.map(g => g.length)); i++) groups.forEach(g => g[i] && mixed.push(g[i]));   // команда, место, офис, команда…
  const cols = one ? [mixed] : groups;
  wallEl.classList.toggle('one', one);
  wallEl.innerHTML = cols.map(c => `<div class="band">${c.map(photo).join('')}</div>`).join('');
  if (wallOn) runWall(true, true);                                  // после смены языка — заново запустить смену кадров
}
function runWall(on, force) {
  if (on === wallOn && !force) return; wallOn = on;
  wallTimers.forEach(clearInterval); wallTimers = [];
  if (!on || !hasWall || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  wallEl.querySelectorAll('.band').forEach((band, bi) => {
    const slides = band.querySelectorAll('.slide'); if (slides.length < 2) return;
    const tick = () => {
      const cur = [...slides].findIndex(x => x.classList.contains('on'));
      slides[cur].classList.remove('on'); slides[(cur + 1) % slides.length].classList.add('on');
    };
    wallTimers.push(setTimeout(() => { tick(); wallTimers.push(setInterval(tick, WALL_STEP)); }, 1800 + bi * 2200));
  });
}
showBg('hero');
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) showBg(e.target.dataset.bg); }), { rootMargin: '-45% 0px -45% 0px' });
$$('section[data-bg]').forEach(sec => io.observe(sec));

/* ===================== Избранное ===================== */
const isFav = id => favs.includes(id);
function toggleFav(id) {
  favs = isFav(id) ? favs.filter(x => x !== id) : [...favs, id];
  store.set('vt-fav', favs);
  toast(t(isFav(id) ? 'favAdded' : 'favRemoved'));
  syncFavs();
  if (F.fav) renderGrid();
}
function syncFavs() {
  $('#favCount').textContent = favs.length;
  $('#favBtn').classList.toggle('has', favs.length > 0);
  $$('[data-fav]').forEach(b => { const on = isFav(b.dataset.fav); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', t(on ? 'fav.remove' : 'fav.add')); });
}

/* ===================== Сравнение ===================== */
function toggleCompare(id) {
  if (compare.includes(id)) compare = compare.filter(x => x !== id);
  else if (compare.length >= 3) { toast(t('cmp.max')); return; }
  else compare = [...compare, id];
  syncCompare();
}
function syncCompare() {
  $$('[data-cmp]').forEach(b => { const on = compare.includes(b.dataset.cmp); b.setAttribute('aria-pressed', String(on)); b.querySelector('span').textContent = t(on ? 'cmp.added' : 'cmp.add'); });
  const tray = $('#tray');
  tray.classList.toggle('on', compare.length > 0);
  document.body.classList.toggle('has-tray', compare.length > 0);
  $('#trayText').textContent = t('cmp.tray', compare.length);
  $('#trayThumbs').innerHTML = compare.map(id => `<img src="${img(byId(id).gallery[0], 800)}" alt="${L(byId(id)).name}">`).join('');
  if ($('#cmpDlg').open) { if (compare.length) renderCompare(); else $('#cmpDlg').close(); }
}
function renderCompare() {
  const vs = compare.map(byId);
  const rows = [
    ['', v => `<img src="${img(v.gallery[0], 800)}" alt=""><button type="button" class="linkish" data-openv="${v.id}">${L(v).name}</button><div class="muted">${L(v).where}</div>`],
    [t('calc.price'), v => `${statusTag(v)} ${oldPrice(v)} ${money(v.price)}`], [t('d.ppm'), v => money(Math.round(v.price / v.built))],
    [t('d.beds'), v => v.beds], [t('d.baths'), v => v.baths], [t('d.built'), v => `${num(v.built)} ${t('m2')}`], [t('d.plot'), v => `${num(v.plot)} ${t('m2')}`],
    [t('d.face'), v => t('face')[v.face]], [t('d.sun'), v => `${hm(v.sun[0], v.sun[1])}–${hm(v.sun[2], v.sun[3])}`],
    [t('d.sea'), v => t(v.sea ? 'yes' : 'no')], [t('d.beach'), v => t('min', v.beach)], [t('d.year'), v => v.year], [t('d.energy'), v => v.energy],
    ['', v => `<button type="button" class="btn ghost small" data-uncmp="${v.id}">${t('cmp.remove')}</button>`]
  ];
  $('#cmpTitle').textContent = t('cmp.title');
  $('#cmpBody').innerHTML = (vs.length < 2 ? `<p class="muted">${t('cmp.need')}</p>` : '') +
    `<div class="cmp-scroll"><table class="cmp"><tbody>${rows.map(([h, f]) => `<tr><th scope="row">${h}</th>${vs.map(v => `<td>${f(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  $$('[data-uncmp]', $('#cmpBody')).forEach(b => b.addEventListener('click', () => toggleCompare(b.dataset.uncmp)));
  $$('[data-openv]', $('#cmpBody')).forEach(b => b.addEventListener('click', () => { $('#cmpDlg').close(); openVilla(b.dataset.openv); }));
}
$('#trayOpen').addEventListener('click', () => { renderCompare(); $('#cmpDlg').showModal(); });
$('#trayClear').addEventListener('click', () => { compare = []; syncCompare(); });
$('#cmpClose').addEventListener('click', () => $('#cmpDlg').close());

/* ===================== Появление при прокрутке ===================== */
// карточки «влетают» волной: соседние в ряду — с небольшой задержкой друг за другом
const revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; revealIO.unobserve(el); el.classList.add('in');
  const done = ev => { if (ev.target !== el || ev.propertyName !== 'transform') return; el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); el.removeEventListener('transitionend', done); };
  el.addEventListener('transitionend', done);
}), { rootMargin: '0px 0px -8% 0px', threshold: .12 }) : null;
function reveal(els) {
  if (!revealIO || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cols = el => getComputedStyle(el.parentElement).gridTemplateColumns.split(' ').length || 1;
  els.forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--d', `${(i % cols(el)) * .06}s`); revealIO.observe(el); });
}

/* ===================== Каталог ===================== */
const grid = $('#grid'), count = $('#count');
function renderChips() {
  const el = $('#areaChips'); el.innerHTML = '';
  ['all', ...liveAreas()].forEach(a => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
    b.textContent = a === 'all' ? t('filter.all') : areaName(a); b.setAttribute('aria-pressed', String(F.area === a));
    b.addEventListener('click', () => { F.area = a; renderChips(); renderGrid(); }); el.appendChild(b);
  });
}
function filtered() {
  const list = VILLAS.filter(v => (F.area === 'all' || v.area === F.area) && v.beds >= F.beds && (!F.price || v.price <= F.price) &&
    (!F.sea || v.sea) && (!F.newBuild || v.newBuild) && (!F.beach || v.beach <= 10) && (!F.fav || isFav(v.id)));
  const by = { pa: (a, b) => a.price - b.price, pd: (a, b) => b.price - a.price, area: (a, b) => b.built - a.built }[F.sort];
  const sorted = by ? [...list].sort(by) : [...list];
  // зарезервированные и проданные — в конце каталога (порядок внутри групп сохраняется)
  return sorted.sort((a, b) => taken(a) - taken(b));
}
/* Статус виллы: новое / цена снижена / зарезервирована / продана */
const taken = v => v.status === 'sold' ? 2 : v.status === 'reserved' ? 1 : 0;
const statusTag = v => v.status ? `<span class="st st-${v.status}">${t('st.' + v.status)}</span>` : '';
const oldPrice = v => v.status === 'reduced' && v.oldPrice ? `<s class="old" aria-label="${t('st.was')}">${money(v.oldPrice)}</s>` : '';
/* «Что рядом»: минуты на машине (пляж — из beach, аэропорт — из района) */
const NEAR_ICON = {
  beach: '<path d="M3 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M12 4a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8zM12 12v6"/>',
  golf: '<path d="M6 21V3l10 4-10 4M3 21h10"/>',
  school: '<path d="M3 9l9-5 9 5-9 5-9-5zM7 11v5c3 2 7 2 10 0v-5"/>',
  hospital: '<path d="M4 4h16v16H4zM12 8v8M8 12h8"/>',
  shops: '<path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2"/>',
  town: '<path d="M4 21V9l6-4v16M10 21V3h10v18M3 21h18M14 7h2M14 11h2M14 15h2"/>',
  airport: '<path d="M21 15l-8-5V4a1 1 0 0 0-2 0v6l-8 5v2l8-2.5V19l-2 1.5V22l3-1 3 1v-1.5L13 19v-4.5l8 2.5z"/>'
};
function nearHTML(v) {
  const n = { beach: v.beach, ...(v.near || {}), airport: (AREAS[v.area] || {}).airport };
  return Object.keys(NEAR_ICON).filter(k => n[k]).map(k =>
    `<li><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">${NEAR_ICON[k]}</svg><span>${t('near')[k]}</span><b>${t('min', n[k])}</b></li>`).join('');
}
const pinLabel = v => v.status === 'sold' ? t('st.sold') : v.status === 'reserved' ? t('st.reserved') : compact(v.price);
const heart = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.1 4c2 0 3.6 1.1 4.9 2.8C13.3 5.1 14.9 4 16.9 4c3.5 0 5.7 3.6 4.4 7.1-1.8 4.8-9.3 9.4-9.3 9.4z"/></svg>';
const sunIcon = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="9" r="3.2" fill="#E3A33B"/><path d="M1 13h14" stroke="#10242E" stroke-width="1.2"/></svg>';
function cardHTML(v, feature) {
  const l = L(v), badges = [v.newBuild && t('badge.new'), v.sea && t('badge.sea')].filter(Boolean);
  return `<article class="card${feature ? ' feature' : ''}${v.status ? ' is-' + v.status : ''}">
    <div class="ph"><img src="${img(v.gallery[0], 800)}" srcset="${srcset(v.gallery[0])}" sizes="(max-width:640px) 100vw, ${feature ? '66vw' : '33vw'}" alt="${l.name}" loading="lazy">
      <span class="badges">${statusTag(v)}${v.tour ? `<span class="badge-360">${t('tour.badge')}</span>` : ''}${badges.map(b => `<span>${b}</span>`).join('')}</span>
      <span class="photos">${t('photos', v.gallery.length)}</span>
      <span class="sunline">${sunIcon}${sunText(v)}</span></div>
    <div class="body">
      <div class="row"><h3><a class="open" href="${pageUrl(v.id)}" data-open="${v.id}">${l.name}</a></h3><span class="price">${oldPrice(v)}${money(v.price)}</span></div>
      <div class="meta">${l.where}. ${t('beds', v.beds)}, ${num(v.built)} ${t('m2')}</div>
      <div class="actions">
        <button type="button" class="icon-btn fav" data-fav="${v.id}" aria-pressed="false">${heart}</button>
        <button type="button" class="pill" data-cmp="${v.id}" aria-pressed="false"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h5v10H2zM9 3h5v10H9z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg><span></span></button>
      </div>
    </div></article>`;
}
function renderGrid() {
  const list = filtered();
  count.textContent = t('count', list.length);
  if (!list.length) {
    grid.innerHTML = `<div class="empty panel"><p>${t(F.fav && !favs.length ? 'emptyFav' : 'empty')}</p><button class="btn ghost" type="button" id="resetBtn">${t('reset')}</button></div>`;
    $('#resetBtn').addEventListener('click', resetFilters); return;
  }
  grid.innerHTML = list.map((v, i) => cardHTML(v, i === 0 && F.sort === 'rec' && list.length > 2)).join('');
  // название — настоящая ссылка на страницу виллы (её видит Google); обычный клик открывает окно на месте
  $$('[data-open]', grid).forEach(b => b.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;   // открыть в новой вкладке — как обычная ссылка
    e.preventDefault(); flyOpen(b.dataset.open, b.closest('.card').querySelector('.ph img'));
  }));
  $$('[data-fav]', grid).forEach(b => b.addEventListener('click', () => toggleFav(b.dataset.fav)));
  $$('[data-cmp]', grid).forEach(b => b.addEventListener('click', () => toggleCompare(b.dataset.cmp)));
  syncFavs(); syncCompare(); reveal($$('.card', grid));
}
function resetFilters() {
  Object.assign(F, { area: 'all', beds: 0, price: 0, sea: false, newBuild: false, beach: false, fav: false });
  $('#beds').value = '0'; $('#price').value = '0'; ['fSea', 'fNew', 'fBeach', 'fFav'].forEach(id => { $('#' + id).checked = false; });
  renderChips(); renderGrid();
}
$('#beds').addEventListener('change', e => { F.beds = +e.target.value; renderGrid(); });
$('#price').addEventListener('change', e => { F.price = +e.target.value; renderGrid(); });
$('#sort').addEventListener('change', e => { F.sort = e.target.value; renderGrid(); });
[['fSea', 'sea'], ['fNew', 'newBuild'], ['fBeach', 'beach'], ['fFav', 'fav']].forEach(([id, k]) => $('#' + id).addEventListener('change', e => { F[k] = e.target.checked; renderGrid(); }));

/* ===================== Карта побережья ===================== */
const LNG0 = -5.42, LAT0 = 36.80, KX = 952, KY = 1182;          // равнопромежуточная проекция для широты ~36.5°
const proj = (lat, lng) => [(lng - LNG0) * KX, (LAT0 - lat) * KY];
const KM10 = 0.1118 * KX;                                          // 10 км по долготе в единицах карты
const COAST = [[36.11,-5.345],[36.16,-5.35],[36.23,-5.31],[36.29,-5.27],[36.355,-5.23],[36.39,-5.19],[36.415,-5.16],[36.425,-5.145],[36.445,-5.10],[36.452,-5.07],
  [36.46,-5.04],[36.475,-5.01],[36.48,-4.99],[36.485,-4.95],[36.495,-4.915],[36.505,-4.885],[36.503,-4.855],[36.50,-4.83],[36.495,-4.80],[36.49,-4.77],[36.486,-4.74],
  [36.487,-4.71],[36.495,-4.69],[36.505,-4.68],[36.52,-4.65],[36.54,-4.62],[36.565,-4.575],[36.59,-4.53],[36.62,-4.495],[36.65,-4.47],[36.685,-4.445],[36.715,-4.42],[36.72,-4.38],[36.725,-4.30],[36.73,-4.15]].map(([a, b]) => proj(a, b));
const TOWNS = [['Málaga', 36.721, -4.421], ['Torremolinos', 36.622, -4.500], ['Fuengirola', 36.540, -4.625], ['Marbella', 36.510, -4.883], ['San Pedro', 36.487, -4.992],
  ['Estepona', 36.427, -5.146], ['Sotogrande', 36.29, -5.27], ['Benahavís', 36.523, -5.046], ['Mijas', 36.596, -4.637],
  ['Benalmádena', 36.598, -4.517], ['Casares', 36.444, -5.274], ['Gibraltar', 36.14, -5.353]];
// Подробности карты: гольф-поля, марины, вершины (видны при приближении) и реки
const GOLF = [['Valderrama', 36.284, -5.318], ['Finca Cortesín', 36.405, -5.214], ['Los Arqueros', 36.532, -5.032], ['Golf Valley', 36.513, -4.975],
  ['Santa Clara', 36.513, -4.838], ['Mijas Golf', 36.556, -4.683], ['Torrequebrada', 36.588, -4.540], ['La Cala Golf', 36.548, -4.737], ['Guadalmina', 36.474, -5.002]];
const MARINAS = [['Puerto de Sotogrande', 36.286, -5.262], ['La Duquesa', 36.356, -5.228], ['Puerto de Estepona', 36.418, -5.160],
  ['Puerto Banús', 36.483, -4.953], ['Puerto Deportivo', 36.506, -4.889], ['Puerto de Fuengirola', 36.535, -4.620], ['Puerto Marina', 36.597, -4.512]];
const PEAKS = [['Los Reales', 36.485, -5.235, 1452], ['La Concha', 36.546, -4.930, 1215], ['Pico de Mijas', 36.619, -4.662, 1150], ['Cerro Torrecilla', 36.68, -5.02, 1919]];
const RIVERS = [[[36.669, -4.447], [36.685, -4.48], [36.70, -4.52], [36.715, -4.57], [36.74, -4.62]],
  [[36.29, -5.275], [36.32, -5.29], [36.35, -5.31], [36.39, -5.33]],
  [[36.497, -4.925], [36.52, -4.94], [36.55, -4.96], [36.58, -4.985]],
  [[36.506, -4.775], [36.53, -4.79], [36.56, -4.80]]];
const SIERRAS = [[36.53, -5.20, 95, 70], [36.575, -4.92, 85, 45], [36.61, -4.66, 90, 48], [36.64, -5.05, 120, 62], [36.70, -4.78, 110, 50]];
const smooth = (pts, dy = 0) => {                                  // плавная линия через точки (Catmull-Rom → кривые Безье)
  const p = pts.map(([x, y]) => [x, y + dy]);
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
    d += ` C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
};
function drawGeography() {
  const coast = smooth(COAST), last = COAST[COAST.length - 1], first = COAST[0];
  const land = `M-600 ${first[1] - 140} L${first[0] - 10} ${first[1] - 4} L${first[0]} ${first[1]} ` + coast.slice(coast.indexOf('C')) + ` L1600 ${last[1]} L1600 -800 L-600 -800 Z`;
  $('#land').setAttribute('d', land); $('#landClip').setAttribute('d', land); $('#shore').setAttribute('d', coast);
  const roadPts = COAST.filter(p => p[0] > 170 && p[0] < 960);
  $('#road').setAttribute('d', smooth(roadPts, -16));
  $('#waves').innerHTML = [18, 46, 90].map(d => `<path d="${smooth(COAST, d)}"/>`).join('');
  $('#rivers').innerHTML = RIVERS.map(r => `<path d="${smooth(r.map(([a, b]) => proj(a, b)))}"/>`).join('');
  const ring = (cx, cy, rx, ry, k, seed) => {
    let d = ''; for (let i = 0; i <= 64; i++) {
      const th = i / 64 * Math.PI * 2, w = 1 + .09 * Math.sin(3 * th + seed) + .05 * Math.sin(5 * th + seed * 2);
      d += `${i ? 'L' : 'M'}${(cx + Math.cos(th) * rx * k * w).toFixed(1)} ${(cy + Math.sin(th) * ry * k * w).toFixed(1)}`;
    } return d + 'Z';
  };
  $('#relief').innerHTML = SIERRAS.map(([la, ln, rx, ry], si) => { const [cx, cy] = proj(la, ln);
    return [1, .82, .64, .47, .31, .16].map((k, ki) => `<path d="${ring(cx, cy, rx, ry, k, si * 1.7)}" opacity="${(.22 + ki * .09).toFixed(2)}"/>`).join(''); }).join('');
}
const atlasMap = $('#atlasMap'), mapSvg = $('#mapSvg'), atlasPins = $('#atlasPins');
let atlasArea = 'all', atlasVilla = null, vb = null, vbAnim = 0;
/* Настоящая карта с улицами и домами: MapLibre (vendor/) + бесплатные карты OpenFreeMap (без ключа).
   Если библиотека или карты недоступны — остаётся нарисованная карта (SVG). */
const unproj = (x, y) => [x / KX + LNG0, LAT0 - y / KY];
const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty';
const GEO_TXT = {
  ru: ['Двигайте карту двумя пальцами', 'Ctrl + колесо — масштаб', '⌘ + колесо — масштаб'],
  es: ['Usa dos dedos para mover el mapa', 'Ctrl + rueda para el zoom', '⌘ + rueda para el zoom'],
  en: ['Use two fingers to move the map', 'Ctrl + scroll to zoom', '⌘ + scroll to zoom']
};
let GEO = null;
function initGeo() {
  const gl = (() => { try { return !!document.createElement('canvas').getContext('webgl'); } catch (e) { return false; } })();
  if (!window.maplibregl || !gl || !$('#geoMap')) return null;
  const tx = GEO_TXT[lang] || GEO_TXT.en;
  let m, touch;
  try {
    // «два пальца» — только на телефонах и планшетах без мыши; на компьютере колесо сразу приближает карту
    touch = matchMedia('(hover: none) and (pointer: coarse)').matches;
    m = new maplibregl.Map({
      container: 'geoMap', style: MAP_STYLE, center: [-4.85, 36.48], zoom: 8.6, minZoom: 8, maxZoom: 18,
      maxBounds: [[-7.6, 35.1], [-2.4, 38.0]], dragRotate: false, pitchWithRotate: false, touchPitch: false,
      cooperativeGestures: touch, attributionControl: { compact: true },
      locale: { 'CooperativeGesturesHandler.MobileHelpText': tx[0], 'CooperativeGesturesHandler.WindowsHelpText': tx[1], 'CooperativeGesturesHandler.MacHelpText': tx[2] }
    });
  } catch (e) { return null; }
  m.touchZoomRotate.disableRotation();
  m.addControl(new maplibregl.ScaleControl({ maxWidth: 110, unit: 'metric' }), 'bottom-left');
  m.on('move', () => applyVb());
  m.on('moveend', () => { atlasPins.classList.remove('fade'); atlasMap.classList.remove('flying'); });
  m.on('zoom', () => atlasMap.classList.toggle('street', m.getZoom() > 13.5));
  // Метки (ценники, районы) пропускают мышь к карте: тянуть можно откуда угодно, а нажатие и наведение ловим сами
  const pinAt = (x, y) => [...atlasPins.querySelectorAll('.vpin, .apin')].reverse().find(el => {
    if (el.hidden) return false; const r = el.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  });
  let over = null;
  const setOver = el => {
    if (el === over) return;
    if (over) { over.classList.remove('hover'); if (over.dataset.vid) hot(over.dataset.vid, false); }
    over = el || null;
    if (over) { over.classList.add('hover'); if (over.dataset.vid) hot(over.dataset.vid, true); }
    m.getCanvas().style.cursor = over ? 'pointer' : '';
  };
  m.on('mousemove', e => setOver(pinAt(e.originalEvent.clientX, e.originalEvent.clientY)));
  m.on('mouseout', () => setOver(null));
  m.on('click', e => { const el = pinAt(e.originalEvent.clientX, e.originalEvent.clientY); if (el) { setOver(null); el.click(); } });
  // карты не загрузились (нет интернета, сервис недоступен) — возвращаемся к нарисованной карте
  const fail = setTimeout(() => { if (!m.isStyleLoaded()) dropGeo(); }, 9000);
  m.once('load', () => { clearTimeout(fail); atlasMap.classList.add('geo-ready'); applyVb(); });
  atlasMap.classList.add('geo-on');
  return m;
}
function dropGeo() {
  if (!GEO) return; try { GEO.remove(); } catch (e) { /* уже удалена */ }
  GEO = null; atlasMap.classList.remove('geo-on', 'geo-ready'); flyTo(atlasArea, true);
}
const atlasCalc = { down: 40, years: 20, rate: 3.4 };
const villaXY = v => proj(v.lat, v.lng);
function targetBox(area) {
  // «Всё побережье» — весь берег от Гибралтара до Малаги
  const pts = area === 'all' ? [...VILLAS.map(villaXY), proj(36.13, -5.35), proj(36.725, -4.40)] : VILLAS.filter(v => v.area === area).map(villaXY);
  const pad = area === 'all' ? 30 : 55;
  let x0 = Math.min(...pts.map(p => p[0])) - pad, x1 = Math.max(...pts.map(p => p[0])) + pad;
  let y0 = Math.min(...pts.map(p => p[1])) - pad, y1 = Math.max(...pts.map(p => p[1])) + pad;
  const r = atlasMap.clientWidth / Math.max(1, atlasMap.clientHeight), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  let w = Math.max(x1 - x0, area === 'all' ? 0 : 230), h = y1 - y0;
  if (w / h > r) h = w / r; else w = h * r;
  return [cx - w / 2, cy - h / 2, w, h];
}
function applyVb(b) {
  const W = atlasMap.clientWidth, H = atlasMap.clientHeight;
  if (GEO) b = vb || [0, 0, 1, 1]; else { vb = b; mapSvg.setAttribute('viewBox', b.map(n => n.toFixed(2)).join(' ')); }
  $$('[data-x]', atlasPins).forEach(el => {
    let x, y;
    if (GEO) {                                                      // на настоящей карте: широта/долгота → пиксели
      const pt = GEO.project(unproj(+el.dataset.x, +(el.dataset.oy || el.dataset.y)));
      x = pt.x; y = pt.y - (el.dataset.oy ? (el.classList.contains('apin') ? 26 : 22) : 0);
    } else { x = (+el.dataset.x - b[0]) / b[2] * W; y = (+el.dataset.y - b[1]) / b[3] * H; }
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.hidden = GEO ? x < 0 || x > W || y < 0 || y > H : x < -40 || x > W + 40 || y < -20 || y > H + 20;
  });
  // ценники вилл не должны налезать друг на друга: сдвигаем мешающий вверх
  const tags = $$('.vpin, .apin', atlasPins).map(el => ({ el, x: parseFloat(el.style.left), y: parseFloat(el.style.top), w: el.offsetWidth + 6, h: el.offsetHeight + 6 }))
    .sort((p, q) => q.y - p.y);
  tags.forEach((p, i) => {
    for (let k = 0; k < 6; k++) {
      const hit = tags.slice(0, i).find(q => Math.abs(p.x - q.x) < (p.w + q.w) / 2 && Math.abs(p.y - q.y) < (p.h + q.h) / 2);
      if (!hit) break;
      p.y = hit.y - (p.h + hit.h) / 2;
    }
    p.el.style.top = p.y + 'px';
    // не выходить за края карты
    const W2 = atlasMap.clientWidth, half = (p.w - 6) / 2 + 6;
    if (p.x - half < 0 || p.x + half > W2) p.el.style.left = Math.min(W2 - half, Math.max(half, p.x)) + 'px';
    p.el.classList.toggle('below', p.y < 190);
  });
  if (GEO) return;
  $('#scaleBar').style.width = Math.round(KM10 / b[2] * W) + 'px';
  atlasMap.classList.toggle('near', b[2] < 520); atlasMap.classList.toggle('closer', b[2] < 260);
}
// Вид вокруг выбранной виллы: камера подлетает ближе, вилла чуть ниже центра (над ней — ценник)
function villaBox(id) {
  const [x, y] = villaXY(byId(id)), r = atlasMap.clientWidth / Math.max(1, atlasMap.clientHeight);
  let w = 150, h = w / r; if (h < 110) { h = 110; w = h * r; }
  return [x - w / 2, y - h * .45, w, h];
}
function geoFly(area, instant) {
  const dur = instant || matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1800;
  if (dur) atlasMap.classList.add('flying');
  if (atlasVilla && area !== 'all') {
    const v = byId(atlasVilla);
    GEO.flyTo({ center: [v.lng, v.lat], zoom: 15, duration: dur, curve: 1.6, offset: [0, 40], essential: true });
  } else {
    const pts = area === 'all' ? [...VILLAS.map(v => [v.lng, v.lat]), [-5.35, 36.14], [-4.42, 36.72]] : VILLAS.filter(v => v.area === area).map(v => [v.lng, v.lat]);
    const lo = [Math.min(...pts.map(p => p[0])), Math.min(...pts.map(p => p[1]))], hi = [Math.max(...pts.map(p => p[0])), Math.max(...pts.map(p => p[1]))];
    GEO.fitBounds([lo, hi], { padding: { top: 70, bottom: 40, left: 50, right: 90 }, maxZoom: 13.2, duration: dur, essential: true });
  }
  if (!dur) setTimeout(() => atlasPins.classList.remove('fade'), 280);
}
function flyTo(area, instant) {
  if (GEO) { geoFly(area, instant); return; }
  const to = atlasVilla && area !== 'all' ? villaBox(atlasVilla) : targetBox(area), from = vb || to;
  cancelAnimationFrame(vbAnim);
  if (instant || matchMedia('(prefers-reduced-motion: reduce)').matches) { applyVb(to); setTimeout(() => atlasPins.classList.remove('fade'), 280); return; }
  // «Камера»: центр едет плавно, масштаб меняется по нарастающей (в логарифме — так глаз воспринимает приближение ровно).
  // Между двумя районами камера сначала немного отдаляется, «пролетает» и приближается снова.
  const c0 = [from[0] + from[2] / 2, from[1] + from[3] / 2], c1 = [to[0] + to[2] / 2, to[1] + to[3] / 2];
  const travel = Math.hypot(c1[0] - c0[0], c1[1] - c0[1]) / Math.max(from[2], to[2]);
  const bump = Math.min(.9, travel * 1.4);                     // насколько отдалиться в середине полёта
  const dur = 1100 + Math.min(500, travel * 900), t0 = performance.now(), aspect = to[2] / to[3];
  const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  const step = now => {
    const k = Math.min(1, (now - t0) / dur), e = ease(k);
    const w = Math.exp(lerp(Math.log(from[2]), Math.log(to[2]), e)) * (1 + bump * Math.sin(Math.PI * e));
    const h = w / aspect, cx = lerp(c0[0], c1[0], e), cy = lerp(c0[1], c1[1], e);
    applyVb([cx - w / 2, cy - h / 2, w, h]);
    if (k < 1) vbAnim = requestAnimationFrame(step); else { vbAnim = 0; applyVb(to); atlasMap.classList.remove('flying'); atlasPins.classList.remove('fade'); }
  };
  atlasMap.classList.add('flying');
  vbAnim = requestAnimationFrame(step);
}
/* Карту можно двигать мышью и пальцем, приближать щипком, Ctrl + колесом и кнопками */
const MAP_W = [45, 1500];                                          // пределы масштаба (ширина видимой области)
function clampVb(b) {
  const w = Math.min(MAP_W[1], Math.max(MAP_W[0], b[2])), h = w * b[3] / b[2];
  const cx = Math.min(1260, Math.max(20, b[0] + b[2] / 2)), cy = Math.min(860, Math.max(20, b[1] + b[3] / 2));
  return [cx - w / 2, cy - h / 2, w, h];
}
function zoomMap(f, px, py) {                                      // f < 1 — приблизить; точка (px, py) под курсором стоит на месте
  if (!vb) return; cancelAnimationFrame(vbAnim); atlasMap.classList.remove('flying');
  const W = atlasMap.clientWidth, H = atlasMap.clientHeight; px = px == null ? W / 2 : px; py = py == null ? H / 2 : py;
  const mx = vb[0] + px / W * vb[2], my = vb[1] + py / H * vb[3];
  const w = Math.min(MAP_W[1], Math.max(MAP_W[0], vb[2] * f)), h = w * vb[3] / vb[2];
  applyVb(clampVb([mx - px / W * w, my - py / H * h, w, h]));
}
{
  const pts = new Map(); let last = null, pinch = 0, moved = 0;
  const onPin = e => e.target.closest('button, a, .atlas-legend, .map-zoom');
  atlasMap.addEventListener('pointerdown', e => {
    if (GEO || onPin(e) || e.button) return;
    pts.set(e.pointerId, [e.clientX, e.clientY]); moved = 0;
    if (pts.size === 1) last = [e.clientX, e.clientY];
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = Math.hypot(a[0] - b[0], a[1] - b[1]); }
    cancelAnimationFrame(vbAnim); atlasMap.classList.remove('flying');
  });
  atlasMap.addEventListener('pointermove', e => {
    if (GEO || !pts.has(e.pointerId) || !vb) return;
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    const W = atlasMap.clientWidth, H = atlasMap.clientHeight, r = atlasMap.getBoundingClientRect();
    if (pts.size === 2) {
      const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (pinch) zoomMap(pinch / d, (a[0] + b[0]) / 2 - r.left, (a[1] + b[1]) / 2 - r.top);
      pinch = d; return;
    }
    const dx = e.clientX - last[0], dy = e.clientY - last[1]; last = [e.clientX, e.clientY];
    moved += Math.abs(dx) + Math.abs(dy);
    if (moved < 4) return;
    if (!atlasMap.classList.contains('dragging')) { atlasMap.classList.add('dragging'); try { atlasMap.setPointerCapture(e.pointerId); } catch (_) { /* старые браузеры */ } }
    applyVb(clampVb([vb[0] - dx / W * vb[2], vb[1] - dy / H * vb[3], vb[2], vb[3]]));
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = 0; if (!pts.size) atlasMap.classList.remove('dragging'); else last = [...pts.values()][0]; };
  atlasMap.addEventListener('pointerup', up); atlasMap.addEventListener('pointercancel', up);
  let hintT = 0;
  atlasMap.addEventListener('wheel', e => {
    if (GEO) return;
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); const r = atlasMap.getBoundingClientRect(); zoomMap(Math.exp(e.deltaY * .0025), e.clientX - r.left, e.clientY - r.top); return; }
    atlasMap.classList.add('hint'); clearTimeout(hintT); hintT = setTimeout(() => atlasMap.classList.remove('hint'), 1400);
  }, { passive: false });
  atlasMap.addEventListener('dblclick', e => { if (GEO || onPin(e)) return; const r = atlasMap.getBoundingClientRect(); zoomMap(.6, e.clientX - r.left, e.clientY - r.top); });
  $$('[data-mz]', atlasMap).forEach(b => b.addEventListener('click', () => {
    const z = +b.dataset.mz;
    if (GEO) { if (z > 0) GEO.zoomIn(); else if (z < 0) GEO.zoomOut(); else flyTo(atlasArea); return; }
    if (z) zoomMap(z > 0 ? 1 / 1.45 : 1.45); else flyTo(atlasArea);
  }));
}
const compact = n => new Intl.NumberFormat(LOCALE[lang], { notation: 'compact', style: 'currency', currency: cur, maximumFractionDigits: 2 }).format(conv(n));
const areaVillas = a => VILLAS.filter(v => v.area === a).sort((x, y) => y.price - x.price);
function renderPins() {
  const A = atlasArea, html = [];
  TOWNS.forEach(([n, la, ln]) => { const [x, y] = proj(la, ln); html.push(`<span class="mtown" data-x="${x}" data-y="${y}">${n}</span>`); });
  { const [x, y] = proj(36.675, -4.499); html.push(`<span class="mtown airport" data-x="${x}" data-y="${y}">✈ AGP</span>`); }
  { const [x, y] = proj(36.555, -4.76); html.push(`<span class="mtown road-l" data-x="${x}" data-y="${y}">AP-7</span>`); }
  { const [x, y] = proj(36.36, -4.86); html.push(`<span class="mtown sea" data-x="${x}" data-y="${y}">${t('coast.sea')}</span>`); }
  GOLF.forEach(([n, la, ln]) => { const [x, y] = proj(la, ln); html.push(`<span class="mpoi golf" data-x="${x}" data-y="${y}"><i aria-hidden="true">⛳</i>${n}</span>`); });
  MARINAS.forEach(([n, la, ln]) => { const [x, y] = proj(la, ln); html.push(`<span class="mpoi marina" data-x="${x}" data-y="${y}"><i aria-hidden="true">⚓</i>${n}</span>`); });
  PEAKS.forEach(([n, la, ln, h]) => { const [x, y] = proj(la, ln); html.push(`<span class="mpoi peak" data-x="${x}" data-y="${y}"><i aria-hidden="true">▲</i>${n} <small>${h} m</small></span>`); });
  if (A === 'all') {
    VILLAS.forEach(v => { const [x, y] = villaXY(v); html.push(`<span class="vdot" data-x="${x}" data-y="${y}"></span>`); });
    liveAreas().forEach(a => { const vs = areaVillas(a), pts = vs.map(villaXY);
      const x = pts.reduce((s, p) => s + p[0], 0) / pts.length, y = Math.min(...pts.map(p => p[1])) - (a === 'benahavis' ? 70 : a === 'casares' || a === 'nuevaandalucia' ? 50 : 30);
      const top = pts.reduce((q, p) => p[1] < q[1] ? p : q);
      html.push(`<button type="button" class="apin" data-area="${a}" data-x="${GEO ? top[0] : x}" data-y="${y}"${GEO ? ` data-oy="${top[1]}"` : ''} aria-label="${areaName(a)}: ${t('zone.villas', vs.length)}"><span class="an">${areaName(a)}</span> <b>${vs.length}</b></button>`); });
  } else {
    areaVillas(A).forEach(v => { const [x, y] = villaXY(v);
      html.push(`<button type="button" class="vpin${v.status === 'sold' || v.status === 'reserved' ? ' taken' : ''}" data-vid="${v.id}" data-x="${x}" data-y="${y - 14}" data-oy="${y}" aria-label="${L(v).name}, ${v.status ? t('st.' + v.status) + ', ' : ''}${money(v.price)}">${pinLabel(v)}<span class="vcard" aria-hidden="true"><img src="${img(v.gallery[0], 800)}" alt=""><span>${L(v).name}</span></span></button>`); });
  }
  atlasPins.innerHTML = html.join('');
  $$('.apin', atlasPins).forEach(b => b.addEventListener('click', () => selectArea(b.dataset.area)));
  $$('.vpin', atlasPins).forEach(b => { b.addEventListener('click', () => selectVilla(b.dataset.vid)); b.addEventListener('mouseenter', () => hot(b.dataset.vid, true)); b.addEventListener('mouseleave', () => hot(b.dataset.vid, false)); });
  markSelected();
  if (vb) applyVb(vb);
}
// наведение: подсветить ценник и строку, а фото справа сменить на фото этой виллы
function hot(id, on) {
  $$(`[data-vid="${id}"]`, $('#coast')).forEach(el => el.classList.toggle('hot', on));
  // фото остаётся на последней вилле, на которую навели (не возвращается к первой)
  const ph = $('#atlasInfo .ai-photo[data-preview]');
  if (ph && on && ph.dataset.preview !== id) { const v = byId(id); ph.dataset.preview = id; ph.src = img(v.gallery[0], 800); ph.alt = L(v).name; }
}
const markSelected = () => $$('.vpin', atlasPins).forEach(b => b.classList.toggle('sel', b.dataset.vid === atlasVilla));
function renderAtlasInfo() {
  const A = atlasArea, box = $('#atlasInfo');
  if (A === 'all') {
    box.innerHTML = `<h3>${t('atlas.allTitle')}</h3><p>${t('atlas.allText', liveAreas().length, VILLAS.length)}</p>
      <ul class="ai-list">${liveAreas().map(a => { const vs = areaVillas(a);
        return `<li><button type="button" data-area="${a}"><span><span class="an">${areaName(a)}</span><br><span class="muted">${t('atlas.airport', AREAS[a].airport)}</span></span><span>${t('atlas.from', compact(vs[vs.length - 1].price))}</span></button></li>`; }).join('')}</ul>`;
    $$('[data-area]', box).forEach(b => b.addEventListener('click', () => selectArea(b.dataset.area)));
    return;
  }
  if (atlasVilla) { renderAtlasVilla(box); return; }
  const vs = areaVillas(A);
  box.innerHTML = `<img class="ai-photo" data-preview="${vs[0].id}" src="${img(vs[0].gallery[0], 800)}" alt="${L(vs[0]).name}">
    <h3>${areaName(A)}</h3><p>${areaText(A)}</p>
    <div class="ai-facts"><span>✈ ${t('atlas.airport', AREAS[A].airport)}</span><span>${t('atlas.range', compact(vs[vs.length - 1].price), compact(vs[0].price))}</span></div>
    <ul class="ai-list">${vs.map(v => `<li><button type="button" data-vid="${v.id}"><span>${L(v).name}</span><span>${money(v.price)}</span></button></li>`).join('')}</ul>
    <p class="muted">${t('atlas.pick')}</p>
    <button type="button" class="btn" id="aiShow">${t('atlas.show', vs.length)}</button>`;
  $$('[data-vid]', box).forEach(b => { b.addEventListener('click', () => selectVilla(b.dataset.vid)); b.addEventListener('mouseenter', () => hot(b.dataset.vid, true)); b.addEventListener('mouseleave', () => hot(b.dataset.vid, false)); });
  $('#aiShow').addEventListener('click', () => pickArea(A));
}
// Карточка виллы прямо в панели карты: фото, характеристики, калькулятор и кнопки
function renderAtlasVilla(box) {
  const v = byId(atlasVilla), l = L(v);
  const specs = [[t('d.beds'), v.beds], [t('d.baths'), v.baths], [t('d.built'), `${num(v.built)} ${t('m2')}`], [t('d.plot'), `${num(v.plot)} ${t('m2')}`],
    [t('d.sun'), `${hm(v.sun[0], v.sun[1])}–${hm(v.sun[2], v.sun[3])}`], [t('d.beach'), t('min', v.beach)], [t('d.year'), v.year], [t('d.energy'), v.energy]];
  box.innerHTML = `<button type="button" class="ai-back" id="aiBack"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg>${areaName(v.area)}</button>
    <div class="ai-gal"><img class="ai-photo ai-main" id="aiImg" src="${img(v.gallery[0], 800)}" alt="${l.name}">
      <div class="ai-thumbs">${v.gallery.map((g, i) => `<button type="button" data-g="${i}" aria-current="${i === 0}" aria-label="${t('gal.of', i + 1, v.gallery.length)}"><img src="${img(g, 800)}" alt=""></button>`).join('')}</div></div>
    <div><p class="ref">${t('d.ref')} ${v.ref}</p><h3>${l.name}</h3><p class="muted">${l.where}</p></div>
    <div class="price-row">${statusTag(v)}<span class="price">${oldPrice(v)}${money(v.price)}</span><span class="ppm">${money(Math.round(v.price / v.built))} / ${t('m2')}</span></div>
    <div class="tour-btns tour-row">${tourBtns(v)}</div>
    <dl class="ai-specs">${specs.map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join('')}</dl>
    <div><h4 class="near-h">${t('near.title')}</h4><ul class="near">${nearHTML(v)}</ul></div>
    <p>${l.desc}</p>
    <div class="ai-calc">
      <h4>${t('calc.title')}</h4>
      <dl class="costs" id="aiCosts"></dl>
      <label><span>${t('calc.down')}</span><output id="aiDownOut"></output><input type="range" id="aiDown" min="30" max="100" step="5" value="${atlasCalc.down}"></label>
      <label><span>${t('calc.term')}</span><output id="aiTermOut"></output><input type="range" id="aiTerm" min="5" max="30" step="1" value="${atlasCalc.years}"></label>
      <label class="rate"><span>${t('calc.rate')}</span><input type="number" id="aiRate" min="0" max="15" step="0.1" value="${atlasCalc.rate}" inputmode="decimal"></label>
      <dl class="costs result" id="aiResult"></dl>
      <p class="calc-note">${t('calc.note')}</p>
    </div>
    <div class="ai-cta">
      <button type="button" class="btn" id="aiOpen">${t('atlas.more')}</button>
      <a class="pill" href="${lang}/${v.id}/brochure.html" target="_blank" rel="noopener">${t('pdf')}</a>
      <button type="button" class="icon-btn fav" data-fav="${v.id}" aria-pressed="false">${heart}</button>
      <a class="btn wa" href="${waLink(l.name)}" target="_blank" rel="noopener" aria-label="${t('wa')}"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>WhatsApp</a>
    </div>`;
  $('#aiBack').addEventListener('click', () => backToArea());
  $$('[data-g]', box).forEach(b => b.addEventListener('click', () => {
    const n = +b.dataset.g, was = +($('[data-g][aria-current=true]', box) || b).dataset.g;
    swapImg($('#aiImg'), img(v.gallery[n], 800), n < was ? -1 : 1);
    $$('[data-g]', box).forEach(x => x.setAttribute('aria-current', String(x === b)));
  }));
  swipe($('.ai-gal', box), d => {
    const cur = +($('[data-g][aria-current=true]', box) || { dataset: { g: 0 } }).dataset.g, n = (cur + d + v.gallery.length) % v.gallery.length;
    $(`[data-g="${n}"]`, box).click();
  });
  $('#aiOpen').addEventListener('click', () => flyOpen(v.id, $('#aiImg')));
  $('#aiImg').addEventListener('click', () => flyOpen(v.id, $('#aiImg')));
  $('[data-fav]', box).addEventListener('click', e => toggleFav(e.currentTarget.dataset.fav));
  ['aiDown', 'aiTerm', 'aiRate'].forEach(id => $('#' + id).addEventListener('input', renderAtlasCalc));
  renderAtlasCalc(); syncFavs();
  box.scrollTop = 0;
}
function renderAtlasCalc() {
  const v = byId(atlasVilla);
  atlasCalc.down = +$('#aiDown').value; atlasCalc.years = +$('#aiTerm').value; atlasCalc.rate = Math.max(0, +$('#aiRate').value || 0);
  const c = calcNums(v, atlasCalc.down, atlasCalc.rate, atlasCalc.years);
  $('#aiDownOut').textContent = `${atlasCalc.down}% · ${money(v.price * atlasCalc.down / 100)}`;
  $('#aiTermOut').textContent = t('calc.years', atlasCalc.years);
  $('#aiCosts').innerHTML = [[t(v.newBuild ? 'calc.iva' : 'calc.itp'), c.tax], [t('calc.notary'), c.notary], [t('calc.lawyer'), c.lawyer]]
    .map(([k, x]) => `<div><dt>${k}</dt><dd>${money(x)}</dd></div>`).join('') + `<div class="sum"><dt>${t('calc.total')}</dt><dd>${money(c.p + c.costs)}</dd></div>`;
  $('#aiResult').innerHTML = `<div class="sum"><dt>${t('calc.monthly')}</dt><dd>${money(Math.round(c.monthly))}</dd></div><div><dt>${t('calc.cash')}</dt><dd>${money(c.cash)}</dd></div>`;
}
// Выбор виллы на карте: камера подлетает, справа — её карточка
function selectVilla(id) {
  if (atlasVilla === id) return;
  atlasVilla = id; markSelected();
  const info = $('#atlasInfo'); info.classList.add('fade');
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => { renderAtlasInfo(); info.classList.remove('fade'); }, 220);
  flyTo(atlasArea);
}
function backToArea() {
  atlasVilla = null; markSelected();
  const info = $('#atlasInfo'); info.classList.add('fade');
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => { renderAtlasInfo(); info.classList.remove('fade'); }, 220);
  flyTo(atlasArea);
}
function renderAtlasTabs() {
  const el = $('#atlasTabs');
  el.innerHTML = ['all', ...liveAreas()].map(a => `<button type="button" class="chip" data-tab="${a}" aria-pressed="${atlasArea === a}">${a === 'all' ? t('atlas.allTitle') : areaName(a)}</button>`).join('');
  $$('[data-tab]', el).forEach(b => b.addEventListener('click', () => selectArea(b.dataset.tab)));
}
// Смена района: метки и панель гаснут, камера летит, новые метки проявляются по прилёте
let swapTimer = 0;
function selectArea(a) {
  if (a === atlasArea && !atlasVilla && !vbAnim) return;
  atlasArea = a; atlasVilla = null; renderAtlasTabs();
  const info = $('#atlasInfo');
  atlasPins.classList.add('fade'); info.classList.add('fade');
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => { renderPins(); renderAtlasInfo(); info.classList.remove('fade'); }, 260);
  flyTo(a);
}
function renderAtlas() { renderAtlasTabs(); renderPins(); renderAtlasInfo(); if (GEO) { if (!renderAtlas.done) flyTo(atlasArea, true); renderAtlas.done = 1; applyVb(); } else if (!vb) flyTo(atlasArea, true); else applyVb(vb); }
function pickArea(a) { F.area = a; renderChips(); renderGrid(); $('#villas').scrollIntoView(); }
drawGeography();
// Размер карты поменялся (поворот телефона, окно): подогнать вид, не обрывая полёт
GEO = initGeo();
new ResizeObserver(() => { if (GEO) { GEO.resize(); applyVb(); } else if (vb && !vbAnim) flyTo(atlasArea, true); }).observe(atlasMap);

/* ===================== Карточка виллы ===================== */
/* Плавная смена фото: старое уезжает и тает, новое въезжает с лёгким приближением */
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function swapImg(el, src, dir = 1) {
  if (!el) return;
  if (el.getAttribute('src') === src) return;
  if (!el.getAttribute('src') || !el.animate || calm() || !el.offsetWidth) { el.src = src; return; }
  const token = el.swapToken = (el.swapToken || 0) + 1;
  const pre = new Image(); pre.src = src;
  (pre.decode ? pre.decode() : Promise.resolve()).catch(() => {}).then(() => {
    if (el.swapToken !== token) return;                         // пока грузилось, уже листнули дальше
    el.parentNode.querySelectorAll('.img-ghost').forEach(g => g.remove());
    const ghost = el.cloneNode(); ghost.removeAttribute('id'); ghost.classList.add('img-ghost'); ghost.style.viewTransitionName = '';
    Object.assign(ghost.style, { left: el.offsetLeft + 'px', top: el.offsetTop + 'px', width: el.offsetWidth + 'px', height: el.offsetHeight + 'px' });
    el.after(ghost); el.src = src;
    const ease = 'cubic-bezier(.2,.7,.1,1)', d = 560, shift = 7 * dir;
    el.animate([{ opacity: 0, transform: `translateX(${shift}%) scale(1.06)` }, { opacity: 1, transform: 'none' }], { duration: d, easing: ease });
    ghost.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-shift}%) scale(.97)` }], { duration: d, easing: ease, fill: 'forwards' })
      .finished.then(() => ghost.remove(), () => ghost.remove());
  });
}
/* Кнопки «Видео-тур» и «3D-тур 360°» (сам тур — в tour.js) */
const PLAY_ICO = '<svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z" fill="currentColor"/></svg>';
const tourBtns = v => `<button type="button" data-tour="video" data-vid="${v.id}"><span class="ico">${PLAY_ICO}</span>${t('tour.video')}</button>`
  + (v.tour ? `<button type="button" data-tour="360" data-vid="${v.id}"><span class="ico">360°</span>${t('tour.badge')}</button>` : '');
const openTour = (kind, id) => { const v = byId(id); if (!v || !window.VTour) return; if (kind === '360' && v.tour) VTour.pano(v); else VTour.video(v); };
document.addEventListener('click', e => { const b = e.target.closest('[data-tour]'); if (b) { e.preventDefault(); e.stopPropagation(); openTour(b.dataset.tour, b.dataset.vid); } }, true);
if (window.VTour) VTour.init({
  t, L, img, brand: SITE.brand, money: n => money(n), waLink: n => waLink(n), onBook: v => bookVilla(v),
  onClose: () => { if (/^#(video|tour)\//.test(location.hash)) history.replaceState(null, '', location.pathname + location.search); }
});
const bookVilla = v => {
  fVilla.value = v.id; if (dlg.open) closeVilla();
  setTimeout(() => { $('#visit').scrollIntoView(); $('#fName').focus({ preventScroll: true }); }, 60);
};

const dlg = $('#dlg'); let current = null, galIdx = 0, pushedHash = false;
function setGal(i) {
  const g = current.gallery, dir = i < galIdx ? -1 : 1; galIdx = (i + g.length) % g.length;
  const main = $('#dImg'); swapImg(main, img(g[galIdx], 1600), dir); main.alt = `${L(current).name}, ${t('gal.of', galIdx + 1, g.length)}`;
  $('#dCount').textContent = t('gal.of', galIdx + 1, g.length);
  $$('#dThumbs button').forEach((b, j) => b.setAttribute('aria-current', String(j === galIdx)));
}
function renderVilla() {
  const v = current, l = L(v);
  $('#dRef').textContent = `${t('d.ref')} ${v.ref}`;
  $('#dName').textContent = l.name; $('#dWhere').textContent = l.where;
  $('#dPrice').innerHTML = `${statusTag(v)}${oldPrice(v)}${money(v.price)}`; $('#dPpm').textContent = `${money(Math.round(v.price / v.built))} / ${t('m2')}`;
  $('#dCurNote').textContent = cur === 'EUR' ? '' : t('cur.note', ratesDate);
  $('#dNear').innerHTML = nearHTML(v);
  $('#dDesc').textContent = l.desc;
  const rows = [[t('d.beds'), v.beds], [t('d.baths'), v.baths], [t('d.built'), `${num(v.built)} ${t('m2')}`], [t('d.plot'), `${num(v.plot)} ${t('m2')}`],
    [t('d.face'), t('face')[v.face]], [t('d.sun'), `${hm(v.sun[0], v.sun[1])}–${hm(v.sun[2], v.sun[3])}`], [t('d.beach'), t('min', v.beach)], [t('d.year'), v.year], [t('d.energy'), v.energy]];
  $('#dSpecs').innerHTML = rows.map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('');
  $('#dThumbs').innerHTML = v.gallery.map((im, i) => `<button type="button" aria-label="${t('gal.of', i + 1, v.gallery.length)}"><img src="${img(im, 800)}" alt=""></button>`).join('');
  $$('#dThumbs button').forEach((b, i) => b.addEventListener('click', () => setGal(i)));
  $('#dFav').dataset.fav = v.id; $('#dCmp').dataset.cmp = v.id;
  $('#dWa').href = waLink(l.name);
  $('#dPdf').href = `${lang}/${v.id}/brochure.html`;
  $('#dTour').innerHTML = tourBtns(v);
  renderAgent(v); $('#dGmaps').href = `https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}`;
  requestAnimationFrame(() => miniMap(v));
  setGal(galIdx); renderCalc(); syncFavs(); syncCompare();
}
/* Агент района виллы: фото, языки, звонок и WhatsApp с названием виллы в сообщении */
const agentFor = v => (SITE.agents || []).find(a => a.areas.includes(v.area)) || (SITE.agents || [])[0];
function renderAgent(v) {
  const a = agentFor(v), box = $('#dAgent'); if (!box) return;
  if (!a) { box.hidden = true; return; }
  box.hidden = false;
  const wa = `https://wa.me/${a.whatsapp}?text=${encodeURIComponent(t('agent.wa').replace('{0}', `${L(v).name} (${v.ref})`))}`;
  box.innerHTML = `<img src="img/brand/${a.photo}.webp" alt="${a.name}" loading="lazy"><div><p>${t('agent.title')}</p><b>${a.name}</b><span>${a.langs}</span></div>
    <div class="d-agent-btns"><a class="icon-btn" href="tel:${a.phone.replace(/\s/g, '')}" aria-label="${t('agent.call')}: ${a.name}"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></a>
    <a class="btn wa" href="${wa}" target="_blank" rel="noopener">WhatsApp</a></div>`;
}
/* Маленькая карта «Где находится»: улицы вокруг и круг ~350 м — примерный район, без точного адреса */
let mini = null;
function spotCircle(v, r = 350) {
  const pts = [], dLat = r / 111320, dLng = r / (111320 * Math.cos(v.lat * Math.PI / 180));
  for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2; pts.push([v.lng + Math.cos(a) * dLng, v.lat + Math.sin(a) * dLat]); }
  return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [pts] }, properties: {} };
}
function miniMap(v) {
  const box = $('#dLoc'), el = $('#dMap');
  if (!el || !dlg.open || !el.offsetWidth) return;
  const gl = !!window.maplibregl && (() => { try { return !!document.createElement('canvas').getContext('webgl'); } catch (e) { return false; } })();
  if (!gl) { box.hidden = true; return; }
  box.hidden = false;
  const put = () => {
    const src = mini.getSource('spot'); if (src) src.setData(spotCircle(v));
    mini.jumpTo({ center: [v.lng, v.lat], zoom: 14 }); mini.resize();
  };
  if (mini) { if (mini.loaded()) put(); else mini.once('load', put); return; }
  try {
    mini = new maplibregl.Map({ container: el, style: MAP_STYLE, center: [v.lng, v.lat], zoom: 14, minZoom: 10, maxZoom: 17,
      dragRotate: false, pitchWithRotate: false, touchPitch: false, attributionControl: { compact: true } });
  } catch (e) { box.hidden = true; return; }
  mini.touchZoomRotate.disableRotation();
  mini.on('load', () => {
    mini.addSource('spot', { type: 'geojson', data: spotCircle(current || v) });
    mini.addLayer({ id: 'spot-fill', type: 'fill', source: 'spot', paint: { 'fill-color': '#3557B8', 'fill-opacity': .18 } });
    mini.addLayer({ id: 'spot-line', type: 'line', source: 'spot', paint: { 'line-color': '#3557B8', 'line-width': 2 } });
    const at = el.querySelector('.maplibregl-ctrl-attrib'); if (at) at.classList.remove('maplibregl-compact-show');   // подпись карты — свёрнутым значком «i»
    put();
  });
}
function openVilla(id, fromHash) {
  const v = byId(id); if (!v) return;
  current = v; galIdx = 0; renderVilla();
  if (!dlg.open) dlg.showModal();
  dlg.scrollTop = 0; miniMap(v);
  if (!fromHash && location.hash !== `#villa/${id}`) { history.pushState(null, '', `#villa/${id}`); pushedHash = true; }
}
/* Перелёт фото: из карточки раскрывается в окно виллы и при закрытии улетает обратно (View Transitions) */
const canFly = () => !!document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches;
const cardImg = id => { const b = grid.querySelector(`[data-open="${id}"]`); return b ? b.closest('.card').querySelector('.ph img') : null; };
const inView = el => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
function flyOpen(id, from) {
  if (!canFly() || !from || dlg.open) { openVilla(id); return; }
  from.style.viewTransitionName = 'villa-photo'; dlg.classList.add('vt');
  const tr = document.startViewTransition(() => { from.style.viewTransitionName = ''; openVilla(id); $('#dImg').style.viewTransitionName = 'villa-photo'; });
  tr.finished.finally(() => { $('#dImg').style.viewTransitionName = ''; dlg.classList.remove('vt'); });
}
function closeVilla() {
  if (!dlg.open) return;
  const to = current && cardImg(current.id);
  if (!canFly() || !to || !inView(to)) { dlg.close(); return; }
  $('#dImg').style.viewTransitionName = 'villa-photo';
  const tr = document.startViewTransition(() => { $('#dImg').style.viewTransitionName = ''; dlg.close(); to.style.viewTransitionName = 'villa-photo'; });
  tr.finished.finally(() => { to.style.viewTransitionName = ''; });
}

/* Пока открыто любое окно, страница под ним не листается (важно для iPhone) */
const lockSync = () => document.documentElement.classList.toggle('lock', $$('dialog').some(d => d.open));
new MutationObserver(lockSync).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
dlg.addEventListener('close', () => {
  if (location.hash.startsWith('#villa/')) {
    if (pushedHash) history.back(); else history.replaceState(null, '', location.pathname + location.search);
  }
  pushedHash = false;
});
$('#dClose').addEventListener('click', closeVilla);
dlg.addEventListener('click', e => { if (e.target === dlg) closeVilla(); });
$('#dPrev').addEventListener('click', () => setGal(galIdx - 1));
$('#dNext').addEventListener('click', () => setGal(galIdx + 1));
$('#dFull').addEventListener('click', () => openLightbox(galIdx));
$('#dImg').addEventListener('click', () => openLightbox(galIdx));
$('#dFav').addEventListener('click', e => toggleFav(e.currentTarget.dataset.fav));
$('#dCmp').addEventListener('click', e => toggleCompare(e.currentTarget.dataset.cmp));
$('#dShare').addEventListener('click', async () => {
  // делимся страницей виллы: у неё своё превью (фото, название, цена) в WhatsApp и соцсетях
  const url = pageUrl(current.id, true), title = `${L(current).name} — ${SITE.brand}`;
  if (navigator.share) { try { await navigator.share({ title, url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(url); toast(t('copied')); } catch (e) { prompt(t('share'), url); }
});
$('#dBook').addEventListener('click', () => {
  $('#fVilla').value = current.id; closeVilla();
  setTimeout(() => { $('#visit').scrollIntoView(); $('#fName').focus({ preventScroll: true }); }, 60);
});
addEventListener('hashchange', () => {
  const m = location.hash.match(/^#villa\/([\w-]+)$/), tm = location.hash.match(/^#(video|tour)\/([\w-]+)$/);
  if (tm) { openTour(tm[1] === 'tour' ? '360' : 'video', tm[2]); return; }
  if (m) openVilla(m[1], true); else if (dlg.open) { pushedHash = false; dlg.close(); }
});
swipe($('#dGallery .gal-main'), d => setGal(galIdx + d));

/* ===================== Калькулятор покупки ===================== */
// Расходы на покупку и ипотека для виллы v: взнос down %, ставка rate % годовых, срок years лет
function calcNums(v, down, rate, years) {
  const p = v.price;
  const tax = v.newBuild ? Math.round(p * .112) : Math.round(p * .07), notary = Math.round(p * .005), lawyer = Math.round(p * .0121);
  const costs = tax + notary + lawyer;
  const loan = Math.round(p * (100 - down) / 100), n = years * 12, r = Math.max(0, rate) / 100 / 12;
  const monthly = loan <= 0 ? 0 : r === 0 ? loan / n : loan * r / (1 - Math.pow(1 + r, -n));
  return { p, tax, notary, lawyer, costs, loan, monthly, cash: Math.round(p * down / 100) + costs };
}
function renderCalc() {
  const v = current, p = v.price;
  const down = +$('#cDown').value, rate = Math.max(0, +$('#cRate').value || 0), years = +$('#cTerm').value;
  const { tax, notary, lawyer, costs, loan, monthly } = calcNums(v, down, rate, years);
  $('#cDownOut').textContent = `${down}% · ${money(p * down / 100)}`;
  $('#cTermOut').textContent = t('calc.years', years);
  $('#cCosts').innerHTML = [[t('calc.price'), p], [t(v.newBuild ? 'calc.iva' : 'calc.itp'), tax], [t('calc.notary'), notary], [t('calc.lawyer'), lawyer]]
    .map(([k, x]) => `<div><dt>${k}</dt><dd>${money(x)}</dd></div>`).join('') + `<div class="sum"><dt>${t('calc.total')}</dt><dd>${money(p + costs)}</dd></div>`;
  $('#cLoan').textContent = money(loan);
  $('#cMonthly').textContent = money(Math.round(monthly));
  $('#cCash').textContent = money(calcNums(v, down, rate, years).cash);
}
['cDown', 'cRate', 'cTerm'].forEach(id => $('#' + id).addEventListener('input', () => current && renderCalc()));

/* ===================== Фото на весь экран ===================== */
const lb = $('#lb'); let lbIdx = 0;
function setLb(i) {
  const g = current.gallery, dir = i < lbIdx ? -1 : 1; lbIdx = (i + g.length) % g.length;
  swapImg($('#lbImg'), img(g[lbIdx], 1600), dir); $('#lbImg').alt = `${L(current).name}, ${t('gal.of', lbIdx + 1, g.length)}`;
  $('#lbCount').textContent = t('gal.of', lbIdx + 1, g.length);
}
function openLightbox(i) { setLb(i); lb.showModal(); }
$('#lbClose').addEventListener('click', () => lb.close());
$('#lbPrev').addEventListener('click', () => setLb(lbIdx - 1));
$('#lbNext').addEventListener('click', () => setLb(lbIdx + 1));
lb.addEventListener('close', () => setGal(lbIdx));
lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-stage')) lb.close(); });
swipe($('#lbStage'), d => setLb(lbIdx + d));
addEventListener('keydown', e => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const d = e.key === 'ArrowLeft' ? -1 : 1;
  if (lb.open) setLb(lbIdx + d); else if (dlg.open && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) setGal(galIdx + d);
});
function swipe(el, cb) {
  // Листание пальцем и мышью: фото тянется за курсором, отпустили — следующее/предыдущее
  let x0 = null, y0 = 0, pid = null, drag = false;
  const pic = () => el.querySelector('img:not(.img-ghost)');
  const back = p => { p.style.transition = 'transform .35s cubic-bezier(.2,.7,.1,1)'; p.style.transform = ''; setTimeout(() => { p.style.transition = ''; }, 360); };
  el.addEventListener('dragstart', e => e.preventDefault());
  el.addEventListener('pointerdown', e => {
    if (e.button || e.target.closest('button,a')) return;
    x0 = e.clientX; y0 = e.clientY; pid = e.pointerId; drag = false;
  });
  el.addEventListener('pointermove', e => {
    if (x0 === null || e.pointerId !== pid) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    if (!drag && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { drag = true; el.classList.add('dragging'); try { el.setPointerCapture(pid); } catch (_) { /* старые браузеры */ } }
    const p = pic(); if (drag && p) p.style.transform = `translateX(${dx * .4}px)`;
  });
  const end = e => {
    if (x0 === null || e.pointerId !== pid) return;
    const dx = e.clientX - x0, dy = e.clientY - y0, p = pic(); x0 = null; el.classList.remove('dragging');
    if (drag && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) && e.type === 'pointerup') {
      if (p) p.style.transform = '';
      cb(dx < 0 ? 1 : -1); el.dataset.swiped = '1'; setTimeout(() => delete el.dataset.swiped, 0);
    } else if (p) back(p);
    drag = false;
  };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  el.addEventListener('click', e => { if (el.dataset.swiped) { e.stopPropagation(); e.preventDefault(); } }, true);
}

/* ===================== WhatsApp ===================== */
const waLink = name => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t('wa.text', name))}`;

/* ===================== Форма ===================== */
const form = $('#form'), fVilla = $('#fVilla');
function renderVillaSelect() {
  const keep = fVilla.value;
  fVilla.innerHTML = `<option value="">${t('f.any')}</option>` + VILLAS.map(v => `<option value="${v.id}">${L(v).name} — ${money(v.price)}</option>`).join('');
  fVilla.value = keep || '';
}
function setErr(input, box, msg) { const f = input.closest('.field'); box.textContent = msg || ''; if (msg) f.setAttribute('data-invalid', ''); else f.removeAttribute('data-invalid'); }
// Имя, телефон и e-mail: проверяем все три, ошибку показываем у каждого поля, курсор — в первое неверное
const okPhone = s => s.replace(/[^\d]/g, '').length >= 9;
const okEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
function checkContacts(ids) {
  const [n, p, m] = ids.map(([id]) => $('#' + id));
  const res = [[n, ids[0][1], n.value.trim() ? '' : t('e.name')], [p, ids[1][1], okPhone(p.value) ? '' : t('e.phone')], [m, ids[2][1], okEmail(m.value.trim()) ? '' : t('e.email')]];
  res.forEach(([el, err, msg]) => setErr(el, $('#' + err), msg));
  const first = res.find(r => r[2]); if (first) { first[0].focus(); return null; }
  return { name: n.value.trim(), phone: p.value.trim(), email: m.value.trim() };
}
const VISIT_IDS = [['fName', 'eName'], ['fPhone', 'ePhone'], ['fEmail', 'eEmail']], SELL_IDS = [['sName', 'esName'], ['sPhone', 'esPhone'], ['sEmail', 'esEmail']];
[...VISIT_IDS, ...SELL_IDS].forEach(([id, err]) => $('#' + id).addEventListener('input', e => setErr(e.target, $('#' + err), '')));
form.addEventListener('submit', e => {
  e.preventDefault();
  const c = checkContacts(VISIT_IDS); if (!c) return;
  const { name, phone, email } = c;
  if ($('#fTrap').value) return;                       // поле-ловушка: его заполняют только спам-боты
  const v = byId(fVilla.value), box = $('#formBox');
  const done = () => {
    box.innerHTML = `<div class="done" tabindex="-1"><h3>${t('ok.t')}</h3><p></p><button class="btn ghost" type="button">${t('ok.again')}</button></div>`;
    $('p', box).textContent = t('ok.p', name, v ? L(v).name : '');
    $('.done', box).focus();
    $('button', box).addEventListener('click', () => location.reload());
  };
  const light = (form.querySelector('input[name=light]:checked') || {}).value || '';
  postLead({ subject: `${SITE.brand}: ${v ? L(v).name + ' (' + v.ref + ')' : t('f.any')}`,
    name, phone, email, villa: v ? `${L(v).name} — ${v.ref} — ${money(v.price)}` : '—', time: t({ morning: 'l.m', day: 'l.d', sunset: 'l.s' }[light] || 'l.s'),
    message: $('#fMsg').value.trim() || '—' }, $('button[type=submit]', form), $('#eSend'), 'f.send', done);
});

// Отправка заявки агентству (Web3Forms). Без ключа — демо-режим: сразу «отправлено».
function postLead(fields, btn, err, btnKey, done) {
  if (!SITE.web3formsKey) { done(); return; }
  btn.disabled = true; btn.textContent = t('f.sending'); err.textContent = '';
  fetch('https://api.web3forms.com/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: SITE.web3formsKey, from_name: SITE.brand, ...fields, language: lang, page: location.href })
  }).then(r => r.json()).then(j => { if (!j.success) throw new Error(j.message || 'error'); done(); })
    .catch(() => { btn.disabled = false; btn.textContent = t(btnKey); err.textContent = t('e.send'); });
}

/* ===================== Валюта ===================== */
const CUR_LABEL = { EUR: '€ EUR', GBP: '£ GBP', USD: '$ USD', SEK: 'kr SEK', NOK: 'kr NOK', CHF: 'CHF', DKK: 'kr DKK' };
function renderCur() {
  const sel = $('#cur');
  sel.innerHTML = CURS.map(c => `<option value="${c}">${CUR_LABEL[c] || c}</option>`).join(''); sel.value = cur;
  $('#navCurs').innerHTML = CURS.map(c => `<button type="button" data-cur="${c}" aria-pressed="${c === cur}">${CUR_LABEL[c] || c}</button>`).join('');
  $$('[data-cur]', $('#navCurs')).forEach(b => b.addEventListener('click', () => setCur(b.dataset.cur)));
}
function setCur(c) { cur = c; store.set('vt-cur', c); applyLang(); }
$('#cur').addEventListener('change', e => setCur(e.target.value));
// курсы ЕЦБ: берём раз в 12 часов, при ошибке остаются запасные курсы из data.js
async function loadRates() {
  const cached = store.get('vt-rates', null);
  if (cached && Date.now() - cached.t < 12 * 3600e3) { rates = { EUR: 1, ...cached.rates }; ratesDate = cached.date; return; }
  try {
    const want = CURS.filter(c => c !== 'EUR').join(',');
    if (!want) return;
    const r = await fetch(`https://api.frankfurter.app/latest?from=EUR&to=${want}`);
    if (!r.ok) return;
    const j = await r.json();
    if (j && j.rates) { rates = { EUR: 1, ...j.rates }; ratesDate = j.date || ''; store.set('vt-rates', { t: Date.now(), rates: j.rates, date: ratesDate }); }
  } catch (e) { /* нет сети — остаются запасные курсы */ }
}

/* ===================== Продать дом: бесплатная оценка ===================== */
const sellForm = $('#sellForm');
function renderSellSelects() {
  const a = $('#sArea'), ty = $('#sType'), ka = a.value, kt = ty.value;
  a.innerHTML = liveAreas().map(x => `<option value="${x}">${areaName(x)}</option>`).join('') + `<option value="other">${t('sell.other')}</option>`;
  ty.innerHTML = Object.entries(t('sell.types')).map(([k, x]) => `<option value="${k}">${x}</option>`).join('');
  if (ka) a.value = ka; if (kt) ty.value = kt;
}
sellForm.addEventListener('submit', e => {
  e.preventDefault();
  const c = checkContacts(SELL_IDS); if (!c) return;
  const { name, phone, email } = c;
  if ($('#sTrap').value) return;
  const box = $('#sellBox'), area = $('#sArea').value;
  const done = () => {
    box.innerHTML = `<div class="done" tabindex="-1"><h3>${t('sell.ok.t')}</h3><p></p></div>`;
    $('p', box).textContent = t('sell.ok.p', name); $('.done', box).focus();
  };
  postLead({ subject: `${SITE.brand}: ${t('sell.form')} — ${area === 'other' ? t('sell.other') : areaName(area)}`, name, phone, email,
    area: area === 'other' ? t('sell.other') : areaName(area), type: t('sell.types')[$('#sType').value],
    beds: $('#sBeds').value || '—', built_m2: $('#sBuilt').value || '—', address: $('#sAddr').value.trim() || '—',
    message: $('#sMsg').value.trim() || '—' }, $('button[type=submit]', sellForm), $('#esSend'), 'sell.send', done);
});

/* ===================== Язык: применить ко всей странице ===================== */
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i]').forEach(el => { const v = T[lang][el.dataset.i]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-i-label]').forEach(el => el.setAttribute('aria-label', T[lang][el.dataset.iLabel]));
  $$('[data-i-ph]').forEach(el => el.setAttribute('placeholder', T[lang][el.dataset.iPh]));
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $('#heroText').textContent = t('hero.text', VILLAS.length);
  document.title = `${SITE.brand} — ${t('title')}`;
  $('#waFab').href = waLink(''); $('#waFab').setAttribute('aria-label', t('wa'));
  $('#footPhone').textContent = SITE.phone; $('#footAddr').textContent = SITE.address;
  $('#footEmail').textContent = SITE.email; $('#footEmail').href = `mailto:${SITE.email}`;
  $('#footRaia').textContent = (SITE.legal || {}).raia || '—';
  $('#fNote').textContent = SITE.web3formsKey ? t('f.privacy') : t('f.note');
  $$('.fNoteText').forEach(el => { el.textContent = SITE.web3formsKey ? t('f.privacy') : t('f.note'); });
  renderSellSelects(); renderCur(); renderWall();
  renderChips(); renderGrid(); renderAtlas(); renderVillaSelect(); updateSun(minutes);
  if (dlg.open && current) renderVilla();
  if ($('#cmpDlg').open) renderCompare();
}
$$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('vt-lang', lang); applyLang(); }));

/* ===================== Виллы из Google Таблицы (необязательно) ===================== */
// Таблица публикуется как CSV. Колонки — как в шаблоне plantilla-villas.csv.
function parseCSV(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; continue; }
    if (c === '"') q = true; else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(x => x.trim()));
}
const yes = s => /^(1|s[ií]|si|yes|y|да|true|x)$/i.test(String(s).trim());
const toNum = s => +String(s).replace(/[^\d]/g, '') || 0;                    // цены, метры: «6 200 000 €» → 6200000
const toFloat = s => parseFloat(String(s).replace(',', '.')) || 0;           // координаты: «36,515» или «36.515»
function rowsToVillas(rows) {
  const head = rows[0].map(h => h.trim().toLowerCase());
  return rows.slice(1).map(r => {
    const g = k => (r[head.indexOf(k)] || '').trim();
    const sun = (g('sun').match(/\d+/g) || [9, 0, 21, 0]).map(Number);
    const v = { id: g('id').toLowerCase().replace(/[^a-z0-9-]/g, '-'), ref: g('ref'), area: g('area'), lat: toFloat(g('lat')), lng: toFloat(g('lng')),
      price: toNum(g('price')), beds: toNum(g('beds')), baths: toNum(g('baths')), built: toNum(g('built')), plot: toNum(g('plot')),
      sun: [sun[0], sun[1] || 0, sun[2] || 21, sun[3] || 0], face: g('face') || 's', sea: yes(g('sea')), newBuild: yes(g('newbuild')),
      beach: toNum(g('beach')), year: toNum(g('year')), energy: g('energy') || '—',
      near: Object.fromEntries(['golf', 'school', 'hospital', 'shops', 'town'].map(k => [k, toNum(g(k))]).filter(([, x]) => x)),
      status: ['new', 'reduced', 'reserved', 'sold'].includes(g('status').toLowerCase()) ? g('status').toLowerCase() : '', oldPrice: toNum(g('oldprice')),
      tour: g('tour'), video: g('video'),
      gallery: g('photos').split(/[|\n]|,\s*(?=https?:|[a-z])/).map(s => s.trim()).filter(Boolean) };
    ['ru', 'es', 'en'].forEach(l => { v[l] = { name: g('name_' + l), where: g('where_' + l), desc: g('desc_' + l) }; });
    return v;
  }).filter(v => v.id && AREAS[v.area] && v.price && v.gallery.length && (v.es.name || v.en.name || v.ru.name));
}
async function loadSheet() {
  if (!SITE.sheetUrl) return;
  try {
    const r = await fetch(SITE.sheetUrl, { cache: 'no-store' });
    if (!r.ok) return;
    const vs = rowsToVillas(parseCSV(await r.text()));
    if (vs.length) { VILLAS.splice(0, VILLAS.length, ...vs); favs = favs.filter(byId); }
  } catch (e) { /* таблица недоступна — остаются виллы из data.js */ }
}

/* ===================== Статистика посещений ===================== */
function loadGA() {
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(SITE.gaId)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date()); window.gtag('config', SITE.gaId, { anonymize_ip: true });
}
function analytics() {
  if (SITE.plausible) {                                  // Plausible — без cookies, согласие не нужно
    const s = document.createElement('script'); s.defer = true; s.dataset.domain = SITE.plausible; s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }
  if (!SITE.gaId) return;                                 // Google Analytics — только после согласия
  const c = store.get('vt-cookies', null);
  if (c === 'yes') { loadGA(); return; }
  if (c === 'no') return;
  const d = document.createElement('div'); d.className = 'cookie'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Cookies');
  d.innerHTML = `<p>${t('cookie.text')} <a href="cookies.html">${t('cookie.more')}</a></p><button class="btn ghost" type="button" data-c="no">${t('cookie.no')}</button><button class="btn" type="button" data-c="yes">${t('cookie.yes')}</button>`;
  document.body.appendChild(d);
  d.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => { store.set('vt-cookies', b.dataset.c); if (b.dataset.c === 'yes') loadGA(); d.remove(); }));
}

/* ===================== Запуск ===================== */
Promise.all([loadSheet(), loadRates()]).finally(() => {
  applyLang(); intro();
  reveal($$('.steps li'));
  const startHash = location.hash.match(/^#villa\/([\w-]+)$/);
  if (startHash) openVilla(startHash[1], true);
  // прямая ссылка на тур: #video/<id> или #tour/<id> (со страниц вилл и для рассылки клиентам)
  const tourHash = location.hash.match(/^#(video|tour)\/([\w-]+)$/);
  if (tourHash) openTour(tourHash[1] === 'tour' ? '360' : 'video', tourHash[2]);
  // пришли со страницы виллы по кнопке «Записаться» (?villa=id#visit): вилла уже выбрана в форме
  const pre = new URLSearchParams(location.search).get('villa');
  if (pre && byId(pre)) fVilla.value = pre;
  analytics();
});
})();
