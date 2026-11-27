/* Nácar Nail Studio — логика сайта: конфигуратор, цена и время, расписание и запись, «Мои записи».
   Данные (цены, цвета, мастера) — в data.js. */
(() => {
'use strict';
const { SITE, TECH, SHAPES, LENGTHS, FINISHES, DESIGNS, EXTRAS, COLORS, SKINS, MASTERS, LOOKS } = window;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* приватный режим */ } }
};

/* ===================== Тексты ===================== */
const T = {
ru: {
  'nav.studio': 'Конфигуратор', 'nav.looks': 'Дизайны', 'nav.prices': 'Цены', 'nav.hyg': 'Гигиена', 'nav.book': 'Запись', 'mine': 'Мои записи', 'cta.book': 'Записаться',
  'hero.eyebrow': 'Маникюр в Марбелье', 'hero.title': 'Увидьте маникюр <em>до</em> записи',
  'hero.lead': 'Соберите дизайн в конфигураторе: форма, длина, цвет, френч. Цена и время считаются сразу, а в календаре видны только окна, куда ваш маникюр помещается целиком.',
  'hero.cta1': 'Собрать дизайн', 'hero.cta2': 'Свободные окна', 'trust.1': 'Цена окончательная', 'trust.2': 'Стерилизация как в клинике', 'trust.3': 'ES · EN · RU',
  'badge.t': 'Сегодня есть свободные окна', 'badge.t0': 'На сегодня всё занято', 'badge.next': (d, h) => `Ближайшее окно: ${d}, ${h}`, 'badge.none': 'Сегодня всё занято — ближайшие окна завтра', 'badge.n': n => `${n} ${plural(n, 'окно', 'окна', 'окон')} для гель-лака сегодня`,
  'studio.eyebrow': 'Конфигуратор', 'studio.title': 'Соберите свой маникюр', 'studio.lead': 'Нажмите на ноготь, чтобы сделать его акцентным, или меняйте все сразу.',
  'skin': 'Тон кожи', 'reset': 'Сбросить', 'hint': 'Нажмите на ноготь — он станет акцентным', 'disclaim': 'На экране цвет может немного отличаться — мастер покажет живую палитру.',
  'c.tech': 'Техника', 'c.shape': 'Форма', 'c.length': 'Длина', 'c.finish': 'Покрытие', 'c.target': 'Что красим', 'c.color': 'Цвет', 'c.design': 'Дизайн', 'c.custom': 'Свой цвет (мастер подберёт ближайший)',
  'tg.all': 'Все ногти', 'tg.sel': n => `Выбрано: ${n}`, 'tg.note': 'или нажмите на ногти на руке',
  'shape.square': 'Квадрат', 'shape.oval': 'Овал', 'shape.almond': 'Миндаль', 'shape.coffin': 'Балерина', 'shape.stiletto': 'Стилет',
  'len.short': 'Короткие', 'len.medium': 'Средние', 'len.long': 'Длинные', 'len.own': 'свои ногти', 'len.ext': 'только наращивание',
  'fin.gloss': 'Глянец', 'fin.matte': 'Мат', 'fin.chrome': 'Хром', 'fin.cateye': 'Кошачий глаз', 'fin.gel': 'только с гелем',
  'des.none': 'Однотон', 'des.french': 'Френч', 'des.glitter': 'Блёстки', 'des.ombre': 'Омбре', 'per': 'за ноготь',
  'q.long': 'Длинные ногти', 'min': 'мин', 'h': 'ч', 'free': 'бесплатно',
  'promise': 'Это окончательная цена: без доплат за форму, дизайн или «сложность».', 'toBook': 'Записаться с этим дизайном', 'toBookShort': 'Записаться', 'share': 'Поделиться', 'copied': 'Ссылка на дизайн скопирована',
  'looks.eyebrow': 'Работы мастеров', 'looks.title': 'Хочу так же', 'looks.lead': 'Нажмите на дизайн — он откроется в конфигураторе. Можно поменять цвет или форму и сразу записаться.', 'looks.btn': 'Хочу так же', 'loaded': 'Дизайн открыт в конфигураторе',
  'prices.eyebrow': 'Цены', 'prices.title': 'Честный прайс', 'pc.base': 'Маникюр', 'pc.decor': 'Покрытие и дизайн', 'pc.extra': 'Дополнительно',
  'prices.note': 'Цена, которую вы видите при записи, — та, что вы заплатите. Если мастер предложит что-то сверх, это только с вашего согласия и до начала работы.',
  'hyg.eyebrow': 'Гигиена', 'hyg.title': 'Чистота, которую видно', 'hyg.lead': 'Вы можете проверить каждый шаг — мы ничего не делаем «за кулисами».',
  'h1.t': 'Автоклав 134 °C', 'h1.p': 'Инструмент стерилизуем паром под давлением — как в стоматологии.', 'h2.t': 'Крафт-пакет при вас', 'h2.p': 'Пакет с индикатором стерильности вскрываем на ваших глазах.',
  'h3.t': 'Одноразовые пилки', 'h3.p': 'Пилки и бафы — новые для каждого клиента, забираете с собой.', 'h4.t': 'Гель без HEMA', 'h4.p': 'Для чувствительной кожи и аллергиков; вытяжка над каждым столом.',
  'm.eyebrow': 'Мастера', 'm.title': 'Кто будет делать ваш маникюр', 'm.days': 'Работает', 'any': 'Любой мастер', 'm.cant': 'не делает эту технику',
  'b.eyebrow': 'Запись', 'b.title': 'Выберите день и время', 'b.lead': 'В календаре — только окна, в которые ваш маникюр помещается целиком.',
  'b.s1': 'Услуга', 'b.s2': 'Мастер', 'b.s3': 'День и время', 'b.s4': 'Контакты', 'b.edit': 'Изменить дизайн',
  'slots': n => `${n} ${plural(n, 'окно', 'окна', 'окон')}`, 'nofree': 'нет мест', 'closed': 'выходной', 'morning': 'Утро', 'day': 'День', 'evening': 'Вечер',
  'pickday': 'Выберите день', 'noslots': 'В этот день окон под вашу длительность нет — выберите другой день или мастера.', 'fit': d => `Показаны окна, куда помещается ${d} подряд.`,
  'f.name': 'Имя', 'f.phone': 'Телефон', 'f.email': 'E-mail', 'ph.name': 'Например, Анна', 'ph.phone': '+34 600 123 456', 'ph.email': 'anna@gmail.com',
  'e.name': 'Напишите, как к вам обращаться.', 'e.phone': 'Проверьте номер: нужно минимум 9 цифр.', 'e.email': 'Проверьте e-mail: например, anna@gmail.com', 'e.policy': 'Отметьте, что согласны с правилом опозданий.', 'e.slot': 'Выберите день и время.',
  'policy': (m, d) => `Понимаю: если опоздаю больше чем на ${m} минут, запись отменится, время отдадут другим клиентам, а предоплата ${d} € вернётся на карту.`,
  'r.title': 'Ваша запись', 'r.total': 'Итого', 'r.submit': 'Подтвердить запись', 'r.when0': 'Выберите день и время', 'r.dep': (d, r) => `Сейчас — предоплата ${d} €, остальные ${r} € — в салоне. Демо: оплата не списывается.`,
  'r.with': 'мастер',
  'ok.t': 'Вы записаны!', 'ok.p': (d, m) => `${d}, мастер ${m}. Мы прислали бы подтверждение на e-mail и в WhatsApp.`, 'ok.ics': 'Добавить в календарь', 'ok.remind': 'Напомнить о коррекции через 3 недели', 'ok.mine': 'Мои записи', 'ok.wa': 'Написать мастеру в WhatsApp',
  'ics.title': 'Маникюр в Nácar', 'ics.remind': 'Коррекция маникюра в Nácar', 'wa.hello': 'Здравствуйте! Хочу записаться на маникюр.', 'wa.code': c => `Здравствуйте! Моя запись ${c}.`,
  'mine.empty': 'Записей пока нет.', 'st.active': 'Запись в силе', 'st.late': 'Мастер предупреждён', 'st.cancel': 'Отменена', 'st.lateCancel': 'Отменена: опоздание',
  'late': 'Я опаздываю', 'cancel': 'Отменить запись', 'refund': d => `Предоплата ${d} € вернётся на карту за 3–5 рабочих дней.`, 'lateNote': t => `Мастер ждёт вас до ${t}.`,
  'late.title': 'Опаздываете?', 'late.text': (m, d) => `Ничего страшного — предупредите нас. Если опоздание больше ${m} минут, запись отменяется: время отдаём другим клиентам, а предоплату ${d} € возвращаем.`,
  'late.a': m => `Опоздаю меньше чем на ${m} минут`, 'late.ap': 'Мастер подождёт — процедура пройдёт полностью.', 'late.b': m => `Опоздаю больше чем на ${m} минут`, 'late.bp': d => `Запись отменится, время освободится, ${d} € вернём.`,
  'late.c': 'Перенести на другое время', 'late.cp': 'Отменим эту запись и откроем календарь с тем же дизайном.', 'canceled': 'Запись отменена, предоплата вернётся',
  'rv.eyebrow': 'Отзывы (пример)', 'rv.title': 'Что говорят клиенты', 'rv1': '«Собрала дизайн на сайте ещё в самолёте — в салоне ничего объяснять не пришлось».', 'rv2': '«Заплатила ровно ту сумму, что показал сайт. Пакет с инструментом вскрыли при мне».', 'rv3': '«Гель продержался весь отпуск и даже море. Amara — волшебница».',
  'faq.title': 'Частые вопросы', 'q1': 'Сколько держится гель-лак?', 'a1': '2–3 недели. Через 3 недели мы напомним о коррекции — можно добавить напоминание в календарь при записи.',
  'q2': 'Можно купаться в море и бассейне?', 'a2': 'Да, гель-лак и наращивание не боятся соли и хлора. Подождите пару часов после процедуры.', 'q3': 'Что будет, если я опоздаю?',
  'a3': (m, d) => `Если опоздание больше ${m} минут, запись отменяется автоматически: время отдаём другим клиентам, а предоплату ${d} € возвращаем на карту. Опаздываете — нажмите «Я опаздываю» в «Моих записях».`,
  'q4': 'Снимаете чужое покрытие?', 'a4': 'Да — отметьте «Снятие старого покрытия» при записи, чтобы мы заложили на это время.', 'q5': 'Как оплатить?', 'a5': 'Предоплата при записи, остальное — картой или наличными в салоне.',
  'ct.title': 'Как нас найти', 'ct.route': 'Маршрут', 'ct.hours': (a, b, c, d) => `Пн–Пт ${a}:00–${b}:00 · Сб ${c}:00–${d}:00 · Вс — выходной`,
  'foot.demo': 'Концепт-проект для портфолио: салон, мастера, цены и отзывы вымышлены. Фото: StockSnap (CC0). Карта: OpenFreeMap © OpenStreetMap.',
  'wd': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], 'today': 'Сегодня', 'tomorrow': 'Завтра', 'sending': 'Отправляем…', 'nail': n => `Ноготь ${n}`
},
es: {
  'nav.studio': 'Configurador', 'nav.looks': 'Diseños', 'nav.prices': 'Precios', 'nav.hyg': 'Higiene', 'nav.book': 'Reservar', 'mine': 'Mis citas', 'cta.book': 'Reservar',
  'hero.eyebrow': 'Manicura en Marbella', 'hero.title': 'Mira tu manicura <em>antes</em> de reservar',
  'hero.lead': 'Diseña tus uñas en el configurador: forma, largo, color, francesa. El precio y el tiempo se calculan al instante y el calendario solo muestra huecos donde cabe tu manicura entera.',
  'hero.cta1': 'Diseñar mis uñas', 'hero.cta2': 'Huecos libres', 'trust.1': 'Precio cerrado', 'trust.2': 'Esterilización de clínica', 'trust.3': 'ES · EN · RU',
  'badge.t': 'Hoy hay huecos libres', 'badge.t0': 'Hoy está completo', 'badge.next': (d, h) => `Próximo hueco: ${d}, ${h}`, 'badge.none': 'Hoy está completo — los próximos huecos, mañana', 'badge.n': n => `${n} ${n === 1 ? 'hueco' : 'huecos'} para semipermanente hoy`,
  'studio.eyebrow': 'Configurador', 'studio.title': 'Diseña tu manicura', 'studio.lead': 'Toca una uña para hacerla de acento o cambia todas a la vez.',
  'skin': 'Tono de piel', 'reset': 'Reiniciar', 'hint': 'Toca una uña para hacerla de acento', 'disclaim': 'El color en pantalla puede variar un poco: la manicurista te enseñará la carta real.',
  'c.tech': 'Técnica', 'c.shape': 'Forma', 'c.length': 'Largo', 'c.finish': 'Acabado', 'c.target': 'Qué pintamos', 'c.color': 'Color', 'c.design': 'Diseño', 'c.custom': 'Tu color (buscamos el más parecido)',
  'tg.all': 'Todas las uñas', 'tg.sel': n => `Seleccionadas: ${n}`, 'tg.note': 'o toca las uñas en la mano',
  'shape.square': 'Cuadrada', 'shape.oval': 'Ovalada', 'shape.almond': 'Almendra', 'shape.coffin': 'Bailarina', 'shape.stiletto': 'Stiletto',
  'len.short': 'Cortas', 'len.medium': 'Medias', 'len.long': 'Largas', 'len.own': 'uña natural', 'len.ext': 'solo extensión',
  'fin.gloss': 'Brillo', 'fin.matte': 'Mate', 'fin.chrome': 'Cromado', 'fin.cateye': 'Ojo de gato', 'fin.gel': 'solo con gel',
  'des.none': 'Liso', 'des.french': 'Francesa', 'des.glitter': 'Purpurina', 'des.ombre': 'Degradado', 'per': 'por uña',
  'q.long': 'Uñas largas', 'min': 'min', 'h': 'h', 'free': 'gratis',
  'promise': 'Es el precio final: sin suplementos por forma, diseño o «dificultad».', 'toBook': 'Reservar con este diseño', 'toBookShort': 'Reservar', 'share': 'Compartir', 'copied': 'Enlace al diseño copiado',
  'looks.eyebrow': 'Trabajos del equipo', 'looks.title': 'Lo quiero así', 'looks.lead': 'Toca un diseño y se abrirá en el configurador. Cambia el color o la forma y reserva al momento.', 'looks.btn': 'Lo quiero así', 'loaded': 'Diseño abierto en el configurador',
  'prices.eyebrow': 'Precios', 'prices.title': 'Precios claros', 'pc.base': 'Manicura', 'pc.decor': 'Acabado y diseño', 'pc.extra': 'Extras',
  'prices.note': 'El precio que ves al reservar es el que pagas. Si la manicurista te propone algo más, solo con tu permiso y antes de empezar.',
  'hyg.eyebrow': 'Higiene', 'hyg.title': 'Limpieza que se ve', 'hyg.lead': 'Puedes comprobar cada paso: nada ocurre «entre bastidores».',
  'h1.t': 'Autoclave a 134 °C', 'h1.p': 'Esterilizamos el instrumental con vapor a presión, como en una clínica dental.', 'h2.t': 'Bolsa abierta delante de ti', 'h2.p': 'La bolsa con indicador de esterilidad se abre ante tus ojos.',
  'h3.t': 'Limas de un solo uso', 'h3.p': 'Limas y bloques nuevos para cada clienta; te los llevas.', 'h4.t': 'Gel sin HEMA', 'h4.p': 'Para piel sensible y alergias; extracción en cada mesa.',
  'm.eyebrow': 'Equipo', 'm.title': 'Quién hará tu manicura', 'm.days': 'Trabaja', 'any': 'Cualquiera', 'm.cant': 'no hace esta técnica',
  'b.eyebrow': 'Reserva', 'b.title': 'Elige día y hora', 'b.lead': 'El calendario solo muestra huecos donde cabe tu manicura entera.',
  'b.s1': 'Servicio', 'b.s2': 'Manicurista', 'b.s3': 'Día y hora', 'b.s4': 'Contacto', 'b.edit': 'Cambiar diseño',
  'slots': n => `${n} ${n === 1 ? 'hueco' : 'huecos'}`, 'nofree': 'completo', 'closed': 'cerrado', 'morning': 'Mañana', 'day': 'Mediodía', 'evening': 'Tarde',
  'pickday': 'Elige un día', 'noslots': 'Ese día no hay huecos para tu duración: prueba otro día u otra manicurista.', 'fit': d => `Solo huecos donde caben ${d} seguidos.`,
  'f.name': 'Nombre', 'f.phone': 'Teléfono', 'f.email': 'E-mail', 'ph.name': 'Por ejemplo, Ana', 'ph.phone': '+34 600 123 456', 'ph.email': 'ana@gmail.com',
  'e.name': 'Dinos cómo te llamas.', 'e.phone': 'Revisa el número: al menos 9 dígitos.', 'e.email': 'Revisa el e-mail: por ejemplo, ana@gmail.com', 'e.policy': 'Acepta la norma de retrasos.', 'e.slot': 'Elige día y hora.',
  'policy': (m, d) => `Entiendo que si llego más de ${m} minutos tarde, la cita se anula, el hueco pasa a otra clienta y la señal de ${d} € se devuelve a mi tarjeta.`,
  'r.title': 'Tu cita', 'r.total': 'Total', 'r.submit': 'Confirmar cita', 'r.when0': 'Elige día y hora', 'r.dep': (d, r) => `Ahora, señal de ${d} €; los ${r} € restantes, en el salón. Demo: no se cobra nada.`,
  'r.with': 'con',
  'ok.t': '¡Cita confirmada!', 'ok.p': (d, m) => `${d}, con ${m}. Te enviaríamos la confirmación por e-mail y WhatsApp.`, 'ok.ics': 'Añadir al calendario', 'ok.remind': 'Recordar el relleno en 3 semanas', 'ok.mine': 'Mis citas', 'ok.wa': 'Escribir por WhatsApp',
  'ics.title': 'Manicura en Nácar', 'ics.remind': 'Relleno de manicura en Nácar', 'wa.hello': '¡Hola! Quiero reservar una manicura.', 'wa.code': c => `¡Hola! Mi cita es la ${c}.`,
  'mine.empty': 'Aún no tienes citas.', 'st.active': 'Confirmada', 'st.late': 'Avisada del retraso', 'st.cancel': 'Anulada', 'st.lateCancel': 'Anulada por retraso',
  'late': 'Llego tarde', 'cancel': 'Anular cita', 'refund': d => `La señal de ${d} € vuelve a tu tarjeta en 3–5 días hábiles.`, 'lateNote': t => `Te esperamos hasta las ${t}.`,
  'late.title': '¿Llegas tarde?', 'late.text': (m, d) => `No pasa nada: avísanos. Si el retraso supera ${m} minutos, la cita se anula: el hueco pasa a otra clienta y te devolvemos la señal de ${d} €.`,
  'late.a': m => `Llegaré menos de ${m} minutos tarde`, 'late.ap': 'Te esperamos y hacemos el servicio completo.', 'late.b': m => `Llegaré más de ${m} minutos tarde`, 'late.bp': d => `La cita se anula, el hueco queda libre y te devolvemos ${d} €.`,
  'late.c': 'Cambiar a otra hora', 'late.cp': 'Anulamos esta cita y abrimos el calendario con el mismo diseño.', 'canceled': 'Cita anulada, la señal se devuelve',
  'rv.eyebrow': 'Opiniones (ejemplo)', 'rv.title': 'Lo que dicen las clientas', 'rv1': '«Diseñé las uñas en el avión: en el salón no tuve que explicar nada».', 'rv2': '«Pagué exactamente lo que marcaba la web. Abrieron la bolsa del instrumental delante de mí».', 'rv3': '«El gel aguantó todas las vacaciones, mar incluido. Amara es una artista».',
  'faq.title': 'Preguntas frecuentes', 'q1': '¿Cuánto dura el semipermanente?', 'a1': 'De 2 a 3 semanas. A las 3 semanas te recordamos el relleno; puedes añadir el aviso al calendario al reservar.',
  'q2': '¿Puedo bañarme en el mar y la piscina?', 'a2': 'Sí, el semipermanente y las extensiones aguantan la sal y el cloro. Espera un par de horas tras la cita.', 'q3': '¿Qué pasa si llego tarde?',
  'a3': (m, d) => `Si el retraso supera ${m} minutos, la cita se anula automáticamente: el hueco pasa a otra clienta y te devolvemos la señal de ${d} €. Si vas tarde, pulsa «Llego tarde» en «Mis citas».`,
  'q4': '¿Retiráis esmalte de otro salón?', 'a4': 'Sí: marca «Retirada de esmalte anterior» al reservar para que reservemos el tiempo.', 'q5': '¿Cómo se paga?', 'a5': 'Señal al reservar; el resto con tarjeta o en efectivo en el salón.',
  'ct.title': 'Dónde estamos', 'ct.route': 'Cómo llegar', 'ct.hours': (a, b, c, d) => `L–V ${a}:00–${b}:00 · S ${c}:00–${d}:00 · D cerrado`,
  'foot.demo': 'Proyecto conceptual para portafolio: el salón, el equipo, los precios y las opiniones son ficticios. Fotos: StockSnap (CC0). Mapa: OpenFreeMap © OpenStreetMap.',
  'wd': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], 'today': 'Hoy', 'tomorrow': 'Mañana', 'sending': 'Enviando…', 'nail': n => `Uña ${n}`
},
en: {
  'nav.studio': 'Configurator', 'nav.looks': 'Designs', 'nav.prices': 'Prices', 'nav.hyg': 'Hygiene', 'nav.book': 'Book', 'mine': 'My bookings', 'cta.book': 'Book now',
  'hero.eyebrow': 'Manicure in Marbella', 'hero.title': 'See your manicure <em>before</em> you book',
  'hero.lead': 'Design your nails in the configurator: shape, length, colour, French. Price and time update instantly, and the calendar only shows slots where your whole manicure fits.',
  'hero.cta1': 'Design my nails', 'hero.cta2': 'Free slots', 'trust.1': 'Fixed price', 'trust.2': 'Clinic-grade sterilisation', 'trust.3': 'ES · EN · RU',
  'badge.t': 'Free slots today', 'badge.t0': 'Fully booked today', 'badge.next': (d, h) => `Next free slot: ${d}, ${h}`, 'badge.none': 'Fully booked today — next slots tomorrow', 'badge.n': n => `${n} gel-polish ${n === 1 ? 'slot' : 'slots'} left today`,
  'studio.eyebrow': 'Configurator', 'studio.title': 'Design your manicure', 'studio.lead': 'Tap a nail to make it an accent, or change them all at once.',
  'skin': 'Skin tone', 'reset': 'Reset', 'hint': 'Tap a nail to make it an accent', 'disclaim': 'Colours on screen may vary slightly — we will show you the real swatches.',
  'c.tech': 'Technique', 'c.shape': 'Shape', 'c.length': 'Length', 'c.finish': 'Finish', 'c.target': 'What we paint', 'c.color': 'Colour', 'c.design': 'Design', 'c.custom': 'Your own colour (we match the closest)',
  'tg.all': 'All nails', 'tg.sel': n => `Selected: ${n}`, 'tg.note': 'or tap the nails on the hand',
  'shape.square': 'Square', 'shape.oval': 'Oval', 'shape.almond': 'Almond', 'shape.coffin': 'Coffin', 'shape.stiletto': 'Stiletto',
  'len.short': 'Short', 'len.medium': 'Medium', 'len.long': 'Long', 'len.own': 'natural nails', 'len.ext': 'extensions only',
  'fin.gloss': 'Gloss', 'fin.matte': 'Matte', 'fin.chrome': 'Chrome', 'fin.cateye': 'Cat-eye', 'fin.gel': 'gel only',
  'des.none': 'Plain', 'des.french': 'French', 'des.glitter': 'Glitter', 'des.ombre': 'Ombré', 'per': 'per nail',
  'q.long': 'Long nails', 'min': 'min', 'h': 'h', 'free': 'free',
  'promise': 'This is the final price: no extras for shape, design or "difficulty".', 'toBook': 'Book this design', 'toBookShort': 'Book', 'share': 'Share', 'copied': 'Design link copied',
  'looks.eyebrow': 'Our work', 'looks.title': 'I want this', 'looks.lead': 'Tap a design to open it in the configurator. Change the colour or shape and book straight away.', 'looks.btn': 'I want this', 'loaded': 'Design opened in the configurator',
  'prices.eyebrow': 'Prices', 'prices.title': 'Honest prices', 'pc.base': 'Manicure', 'pc.decor': 'Finish and design', 'pc.extra': 'Extras',
  'prices.note': 'The price you see when booking is the price you pay. Anything extra is only with your consent and before we start.',
  'hyg.eyebrow': 'Hygiene', 'hyg.title': 'Cleanliness you can see', 'hyg.lead': 'You can check every step — nothing happens "behind the scenes".',
  'h1.t': 'Autoclave at 134 °C', 'h1.p': 'Tools are sterilised with pressurised steam, as in a dental clinic.', 'h2.t': 'Pouch opened in front of you', 'h2.p': 'The pouch with a sterility indicator is opened before your eyes.',
  'h3.t': 'Single-use files', 'h3.p': 'New files and buffers for every client — yours to take home.', 'h4.t': 'HEMA-free gel', 'h4.p': 'For sensitive skin and allergies; extraction at every desk.',
  'm.eyebrow': 'Team', 'm.title': 'Who will do your nails', 'm.days': 'Works', 'any': 'Any artist', 'm.cant': 'does not do this technique',
  'b.eyebrow': 'Booking', 'b.title': 'Pick a day and time', 'b.lead': 'The calendar only shows slots where your whole manicure fits.',
  'b.s1': 'Service', 'b.s2': 'Nail artist', 'b.s3': 'Day and time', 'b.s4': 'Contact', 'b.edit': 'Change design',
  'slots': n => `${n} ${n === 1 ? 'slot' : 'slots'}`, 'nofree': 'full', 'closed': 'closed', 'morning': 'Morning', 'day': 'Midday', 'evening': 'Evening',
  'pickday': 'Pick a day', 'noslots': 'No slots long enough on this day — try another day or artist.', 'fit': d => `Only slots with ${d} in a row are shown.`,
  'f.name': 'Name', 'f.phone': 'Phone', 'f.email': 'Email', 'ph.name': 'e.g. Anna', 'ph.phone': '+34 600 123 456', 'ph.email': 'anna@gmail.com',
  'e.name': 'Tell us your name.', 'e.phone': 'Check the number: at least 9 digits.', 'e.email': 'Check the email, e.g. anna@gmail.com', 'e.policy': 'Please accept the late-arrival rule.', 'e.slot': 'Pick a day and time.',
  'policy': (m, d) => `I understand that if I am more than ${m} minutes late, the booking is cancelled, the slot goes to another client and my €${d} deposit is refunded to my card.`,
  'r.title': 'Your booking', 'r.total': 'Total', 'r.submit': 'Confirm booking', 'r.when0': 'Pick a day and time', 'r.dep': (d, r) => `€${d} deposit now, the remaining €${r} at the salon. Demo: nothing is charged.`,
  'r.with': 'with',
  'ok.t': 'You are booked!', 'ok.p': (d, m) => `${d}, with ${m}. We would send the confirmation by email and WhatsApp.`, 'ok.ics': 'Add to calendar', 'ok.remind': 'Remind me about a refill in 3 weeks', 'ok.mine': 'My bookings', 'ok.wa': 'Message us on WhatsApp',
  'ics.title': 'Manicure at Nácar', 'ics.remind': 'Manicure refill at Nácar', 'wa.hello': 'Hello! I would like to book a manicure.', 'wa.code': c => `Hello! My booking is ${c}.`,
  'mine.empty': 'No bookings yet.', 'st.active': 'Confirmed', 'st.late': 'Running late (notified)', 'st.cancel': 'Cancelled', 'st.lateCancel': 'Cancelled: late',
  'late': 'I am running late', 'cancel': 'Cancel booking', 'refund': d => `Your €${d} deposit returns to your card in 3–5 working days.`, 'lateNote': t => `We will wait until ${t}.`,
  'late.title': 'Running late?', 'late.text': (m, d) => `No problem — just let us know. If you are more than ${m} minutes late, the booking is cancelled: the slot goes to another client and we refund your €${d} deposit.`,
  'late.a': m => `Less than ${m} minutes late`, 'late.ap': 'We will wait and do the full service.', 'late.b': m => `More than ${m} minutes late`, 'late.bp': d => `The booking is cancelled, the slot is freed and €${d} refunded.`,
  'late.c': 'Move to another time', 'late.cp': 'We cancel this booking and open the calendar with the same design.', 'canceled': 'Booking cancelled, deposit refunded',
  'rv.eyebrow': 'Reviews (sample)', 'rv.title': 'What clients say', 'rv1': '"I designed my nails on the plane — no explaining needed at the salon."', 'rv2': '"I paid exactly what the website showed. They opened the tool pouch in front of me."', 'rv3': '"The gel lasted the whole holiday, sea included. Amara is a magician."',
  'faq.title': 'FAQ', 'q1': 'How long does gel polish last?', 'a1': '2–3 weeks. After 3 weeks we remind you about a refill — you can add the reminder to your calendar when booking.',
  'q2': 'Can I swim in the sea and pool?', 'a2': 'Yes, gel polish and extensions handle salt and chlorine. Wait a couple of hours after your appointment.', 'q3': 'What if I am late?',
  'a3': (m, d) => `If you are more than ${m} minutes late, the booking is cancelled automatically: the slot goes to another client and we refund your €${d} deposit. Running late? Tap "I am running late" in "My bookings".`,
  'q4': 'Do you remove polish from other salons?', 'a4': 'Yes — tick "Removal of old coating" when booking so we plan the time.', 'q5': 'How do I pay?', 'a5': 'A deposit when booking; the rest by card or cash at the salon.',
  'ct.title': 'Find us', 'ct.route': 'Directions', 'ct.hours': (a, b, c, d) => `Mon–Fri ${a}:00–${b}:00 · Sat ${c}:00–${d}:00 · Sun closed`,
  'foot.demo': 'Portfolio concept project: the salon, artists, prices and reviews are fictional. Photos: StockSnap (CC0). Map: OpenFreeMap © OpenStreetMap.',
  'wd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 'today': 'Today', 'tomorrow': 'Tomorrow', 'sending': 'Sending…', 'nail': n => `Nail ${n}`
}};
function plural(n, one, few, many) { const a = n % 10, b = n % 100; if (a === 1 && b !== 11) return one; if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few; return many; }
const nav = (navigator.language || '').slice(0, 2);
let lang = store.get('nc-lang', ['ru', 'es', 'en'].includes(nav) ? nav : 'es');
const t = (k, ...a) => { const v = (T[lang] || T.es)[k]; return typeof v === 'function' ? v(...a) : v; };
const L = o => o[lang] || o.en;
const LOCALE = { ru: 'ru-RU', es: 'es-ES', en: 'en-GB' };
const eur = n => new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const dur = m => { const h = Math.floor(m / 60), r = m % 60; return h ? `${h} ${t('h')}${r ? ` ${r} ${t('min')}` : ''}` : `${r} ${t('min')}`; };
const hm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
const toastEl = $('#toast'); let toastT = 0;
const toast = msg => { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2600); };

/* ===================== Цвета ===================== */
const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, n >> 8 & 255, n & 255]; };
const rgb2hex = (r, g, b) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, k) => { const x = hex2rgb(a), y = hex2rgb(b); return rgb2hex(x[0] + (y[0] - x[0]) * k, x[1] + (y[1] - x[1]) * k, x[2] + (y[2] - x[2]) * k); };
const light = (c, k) => mix(c, '#ffffff', k), dark = (c, k) => mix(c, '#000000', k);
const colorName = hex => { const c = COLORS.find(x => x.hex.toLowerCase() === hex.toLowerCase()); return c ? c.name : hex.toUpperCase(); };

/* ===================== Рисунок руки и ногтей (SVG) ===================== */
// Пальцы: центр кончика (x, y), наклон и ширина — рука сверху, большой палец слева
const FINGERS = [{ x: 96, y: 262, a: -32, w: 60 }, { x: 190, y: 120, a: -9, w: 54 }, { x: 270, y: 86, a: 0, w: 57 }, { x: 350, y: 114, a: 8, w: 53 }, { x: 426, y: 188, a: 18, w: 45 }];
const EXT = { short: .06, medium: .42, long: .8 };
function nailGeom(shape, w, len) {
  const nw = w * .74, h = nw / 2, B = w * .98 + 6, T = 6 - EXT[len] * w, room = B - h * .55 - T - 4;
  const k = Math.min(room, { square: nw * .14, oval: h, almond: h * 1.7, coffin: h * 1.5, stiletto: h * 2.4 }[shape]);
  const base = `M${-h} ${B - h * .55} Q${-h} ${B} 0 ${B} Q${h} ${B} ${h} ${B - h * .55}`;
  let top;
  if (shape === 'square') top = `L${h} ${T + k} Q${h} ${T} ${h - k} ${T} L${-h + k} ${T} Q${-h} ${T} ${-h} ${T + k}`;
  else if (shape === 'oval') top = `L${h} ${T + k} C${h} ${T + k * .35} ${h * .55} ${T} 0 ${T} C${-h * .55} ${T} ${-h} ${T + k * .35} ${-h} ${T + k}`;
  else if (shape === 'almond') top = `L${h} ${T + k} C${h} ${T + k * .45} ${h * .3} ${T + 1} 0 ${T} C${-h * .3} ${T + 1} ${-h} ${T + k * .45} ${-h} ${T + k}`;
  else if (shape === 'coffin') { const q = h * .5; top = `L${h} ${T + k} L${q} ${T + 1.5} Q${q} ${T} ${q - 2} ${T} L${-q + 2} ${T} Q${-q} ${T} ${-q} ${T + 1.5} L${-h} ${T + k}`; }
  else top = `L${h} ${T + k} C${h} ${T + k * .4} ${h * .12} ${T + 6} 0 ${T} C${-h * .12} ${T + 6} ${-h} ${T + k * .4} ${-h} ${T + k}`;
  return { d: `${base} ${top} Z`, h, B, T };
}
let uid = 0;
function handSVG(s, opt = {}) {
  const p = 'h' + (++uid), mini = !!opt.mini, skin = s.skin || SKINS[1];
  const vb = mini ? '40 20 440 300' : opt.crop ? '10 30 490 280' : '0 0 520 420';   // crop — крупный план ногтей для телефона
  let defs = `<linearGradient id="${p}sk" x1="0" x2="1"><stop offset="0" stop-color="${dark(skin, .16)}"/><stop offset=".35" stop-color="${skin}"/><stop offset=".7" stop-color="${light(skin, .08)}"/><stop offset="1" stop-color="${dark(skin, .12)}"/></linearGradient>
    <pattern id="${p}gl" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#fff" opacity=".9"/><circle cx="6.5" cy="5" r=".9" fill="#F7E3A1"/><circle cx="4" cy="7.6" r=".7" fill="#fff" opacity=".7"/></pattern>`;
  let body = '';
  FINGERS.forEach((f, i) => {
    const n = s.nails[i], g = nailGeom(s.shape, f.w, s.length), w = f.w, c = n.c;
    // заливка ногтя: покрытие и дизайн
    let fill = c;
    if (n.d === 'ombre') { defs += `<linearGradient id="${p}om${i}" gradientUnits="userSpaceOnUse" x1="0" y1="${g.B}" x2="0" y2="${g.T}"><stop offset=".05" stop-color="#F3DDD4"/><stop offset=".95" stop-color="${c}"/></linearGradient>`; fill = `url(#${p}om${i})`; }
    else if (s.finish === 'chrome') { defs += `<linearGradient id="${p}ch${i}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${dark(c, .25)}"/><stop offset=".3" stop-color="${light(c, .55)}"/><stop offset=".5" stop-color="${c}"/><stop offset=".72" stop-color="${light(c, .7)}"/><stop offset="1" stop-color="${dark(c, .18)}"/></linearGradient>`; fill = `url(#${p}ch${i})`; }
    else if (s.finish === 'cateye') { fill = dark(c, .45); }
    let over = '';
    if (s.finish === 'cateye' && n.d !== 'ombre') { defs += `<linearGradient id="${p}ce${i}" x1="0" y1="1" x2="1" y2="0"><stop offset=".25" stop-color="${light(c, .6)}" stop-opacity="0"/><stop offset=".5" stop-color="${light(c, .55)}" stop-opacity=".95"/><stop offset=".75" stop-color="${light(c, .6)}" stop-opacity="0"/></linearGradient>`; over += `<path d="${g.d}" fill="url(#${p}ce${i})"/>`; }
    if (n.d === 'glitter') over += `<path d="${g.d}" fill="url(#${p}gl)"/>`;
    if (n.d === 'french') { const S = 6 + w * .1; over += `<path d="M${-g.h - 2} ${S + 4} Q0 ${S - w * .2} ${g.h + 2} ${S + 4} L${g.h + 2} ${g.T - 6} L${-g.h - 2} ${g.T - 6} Z" fill="${n.t || '#FFFFFF'}" clip-path="url(#${p}cl${i})"/>`; }
    if (s.finish !== 'matte') { const op = s.finish === 'chrome' ? .8 : .55; over += `<path d="M${-g.h * .5} ${g.B - g.h * .9} C${-g.h * .62} ${(g.T + g.B) / 2} ${-g.h * .48} ${g.T + 12} ${-g.h * .2} ${g.T + 9}" stroke="#fff" stroke-width="${w * .07}" stroke-linecap="round" fill="none" opacity="${op}" clip-path="url(#${p}cl${i})"/>`; }
    defs += `<clipPath id="${p}cl${i}"><path d="${g.d}"/></clipPath>`;
    const nailAttrs = opt.interactive ? ` class="nail" data-n="${i}" role="button" tabindex="0" aria-label="${t('nail', i + 1)}" aria-pressed="${s.sel.includes(i)}"` : '';
    body += `<g class="finger${opt.interactive && s.sel.includes(i) ? ' sel' : ''}" transform="translate(${f.x} ${f.y}) rotate(${f.a})">
      <path d="M${-w / 2} 640 L${-w / 2} ${w / 2} A${w / 2} ${w / 2} 0 0 1 ${w / 2} ${w / 2} L${w / 2} 640 Z" fill="url(#${p}sk)"/>
      <path d="M${-w * .3} ${w * 2.45} Q0 ${w * 2.3} ${w * .3} ${w * 2.45}" stroke="${dark(skin, .25)}" stroke-width="1.4" fill="none" opacity=".35"/>
      <path d="M${-g.h - 3} ${g.B - g.h * .4} Q0 ${g.B + 8} ${g.h + 3} ${g.B - g.h * .4}" stroke="${dark(skin, .2)}" stroke-width="2" fill="none" opacity=".35"/>
      <g${nailAttrs}><path d="${g.d}" fill="${fill}" stroke="rgba(0,0,0,.14)" stroke-width="1"/>${over}
      ${opt.interactive ? `<path class="sel-ring" d="${g.d}" transform="scale(1.16) translate(0 -4)"/>` : ''}</g>
    </g>`;
  });
  return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="${opt.interactive ? 'false' : 'true'}"><defs>${defs}</defs>${body}</svg>`;
}

/* ===================== Состояние конфигуратора ===================== */
const DEFAULT = () => ({ tech: 'gel', shape: 'almond', length: 'medium', finish: 'gloss', skin: SKINS[1], sel: [], nails: Array.from({ length: 5 }, () => ({ c: '#C98A7C', d: 'none', t: '#FFFFFF' })) });
let S = DEFAULT();
const extras = { removal: false, pedicure: false };
const fixLength = () => { if (S.tech !== 'extensions' && S.length === 'long') S.length = 'medium'; if (S.length === 'short' && (S.shape === 'coffin' || S.shape === 'stiletto')) S.length = S.tech === 'extensions' ? 'medium' : 'medium'; };
const fixFinish = () => { if (S.tech === 'classic' && (S.finish === 'chrome' || S.finish === 'cateye')) S.finish = 'gloss'; };
const targets = () => S.sel.length ? S.sel : [0, 1, 2, 3, 4];

function quote() {
  const items = [], tech = TECH[S.tech];
  items.push([L(tech), tech.price, tech.min]);
  if (S.tech === 'extensions' && S.length === 'long') items.push([t('q.long'), LENGTHS.long.price, LENGTHS.long.min]);
  const f = FINISHES[S.finish]; if (f.price || f.min) items.push([t('fin.' + S.finish), f.price, f.min]);
  const cnt = {}; S.nails.forEach(n => { cnt[n.d] = (cnt[n.d] || 0) + 2; });      // вторая рука повторяет первую
  Object.keys(cnt).filter(d => d !== 'none').forEach(d => items.push([`${t('des.' + d)} × ${cnt[d]}`, DESIGNS[d].price * cnt[d], DESIGNS[d].min * cnt[d]]));
  Object.keys(extras).filter(k => extras[k]).forEach(k => items.push([L(EXTRAS[k]), EXTRAS[k].price, EXTRAS[k].min]));
  const price = items.reduce((a, x) => a + x[1], 0), min = Math.ceil(items.reduce((a, x) => a + x[2], 0) / 15) * 15;
  return { items, price, min };
}

/* ===================== Конфигуратор: отрисовка ===================== */
const shapeIcon = sh => { const g = nailGeom(sh, 30, sh === 'square' || sh === 'oval' ? 'medium' : 'long'); return `<svg viewBox="-16 -22 32 54" aria-hidden="true"><path d="${g.d}" fill="currentColor" opacity=".85"/></svg>`; };
function opt(group, key, label, small, pressed, disabled, extra = '') {
  return `<button type="button" class="opt ${extra}" data-g="${group}" data-k="${key}" aria-pressed="${pressed}"${disabled ? ' disabled' : ''}>${extra === 'shape' ? shapeIcon(key) : ''}<b>${label}</b>${small ? `<small>${small}</small>` : ''}</button>`;
}
const plus = (p, m) => p || m ? `${p ? '+' + eur(p) : ''}${p && m ? ' · ' : ''}${m ? '+' + m + ' ' + t('min') : ''}` : t('free');
function renderControls() {
  $('#optTech').innerHTML = Object.keys(TECH).map(k => opt('tech', k, L(TECH[k]), `${eur(TECH[k].price)} · ${dur(TECH[k].min)}`, S.tech === k)).join('');
  $('#optShape').innerHTML = SHAPES.map(k => opt('shape', k, t('shape.' + k), '', S.shape === k, false, 'shape')).join('');
  $('#optLength').innerHTML = Object.keys(LENGTHS).map(k => {
    const dis = k === 'long' && S.tech !== 'extensions';
    const small = k === 'long' ? (dis ? t('len.ext') : plus(LENGTHS.long.price, LENGTHS.long.min)) : S.tech === 'extensions' ? t('free') : t('len.own');
    return opt('length', k, t('len.' + k), small, S.length === k, dis);
  }).join('');
  $('#optFinish').innerHTML = Object.keys(FINISHES).map(k => {
    const dis = S.tech === 'classic' && (k === 'chrome' || k === 'cateye');
    return opt('finish', k, t('fin.' + k), dis ? t('fin.gel') : plus(FINISHES[k].price, FINISHES[k].min), S.finish === k, dis);
  }).join('');
  const tg = targets(), d0 = S.nails[tg[0]].d, c0 = S.nails[tg[0]].c;
  $('#optDesign').innerHTML = Object.keys(DESIGNS).map(k => opt('design', k, t('des.' + k), k === 'none' ? '' : `+${eur(DESIGNS[k].price)} ${t('per')}`, tg.every(i => S.nails[i].d === k))).join('');
  $('#target').innerHTML = `<button type="button" class="pill" id="selAll" aria-pressed="${!S.sel.length}">${t('tg.all')}</button>${S.sel.length ? `<span class="pill" aria-pressed="true">${t('tg.sel', S.sel.length)}</span>` : ''}<span class="note">${t('tg.note')}</span>`;
  $('#selAll').addEventListener('click', () => { S.sel = []; render(); });
  $('#palette').innerHTML = COLORS.map(c => `<button type="button" class="sw" style="background:${c.hex}" data-c="${c.hex}" aria-label="${c.name}" title="${c.name}" aria-pressed="${tg.every(i => S.nails[i].c.toLowerCase() === c.hex.toLowerCase())}"></button>`).join('');
  const others = [...new Set(S.nails.map(n => colorName(n.c)))].filter(n => n !== colorName(c0));
  $('#cname').innerHTML = `<b>${colorName(c0)}</b>${others.length ? ' + ' + others.join(', ') : ''}`;
  $('#skins').innerHTML = `<span>${t('skin')}</span>` + SKINS.map(k => `<button type="button" style="background:${k}" data-skin="${k}" aria-label="${t('skin')}" aria-pressed="${S.skin === k}"></button>`).join('');
}
const phone = matchMedia('(max-width: 900px)');
phone.addEventListener('change', () => renderHand());
function renderHand() {
  $('#hand').innerHTML = handSVG(S, { interactive: true, crop: phone.matches });
  $$('#hand .nail').forEach(el => {
    const tog = () => { const i = +el.dataset.n; S.sel = S.sel.includes(i) ? S.sel.filter(x => x !== i) : [...S.sel, i].sort(); render(); };
    el.addEventListener('click', tog);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
  });
}
function renderSummary() {
  const q = quote();
  $('#sumList').innerHTML = q.items.map(([k, p, m]) => `<div><dt>${k}</dt><dd>${p ? eur(p) : t('free')}${m ? ` · ${m} ${t('min')}` : ''}</dd></div>`).join('');
  $('#sumPrice').textContent = eur(q.price); $('#sumTime').textContent = dur(q.min);
  $('#mPrice').textContent = eur(q.price); $('#mTime').textContent = dur(q.min);
}
function render() {
  fixLength(); fixFinish();
  renderControls(); renderHand(); renderSummary(); renderBooking();
  try { history.replaceState(null, '', location.pathname + location.search + (location.hash.startsWith('#d=') ? '#d=' + encodeDesign() : location.hash)); } catch (e) { /* file:// */ }
}
document.addEventListener('click', e => {
  const b = e.target.closest('.opt[data-g]');
  if (b) {
    const g = b.dataset.g, k = b.dataset.k;
    if (g === 'tech') S.tech = k; else if (g === 'shape') { S.shape = k; if (S.length === 'short' && (k === 'coffin' || k === 'stiletto')) S.length = 'medium'; }
    else if (g === 'length') { S.length = k; if (k === 'short' && (S.shape === 'coffin' || S.shape === 'stiletto')) S.shape = 'almond'; }
    else if (g === 'finish') S.finish = k; else if (g === 'design') targets().forEach(i => { S.nails[i].d = k; });
    render(); return;
  }
  const sw = e.target.closest('.sw[data-c]'); if (sw) { targets().forEach(i => { S.nails[i].c = sw.dataset.c; }); render(); return; }
  const sk = e.target.closest('[data-skin]'); if (sk) { S.skin = sk.dataset.skin; render(); }
});
$('#customColor').addEventListener('input', e => { targets().forEach(i => { S.nails[i].c = e.target.value; }); render(); });
$('#resetBtn').addEventListener('click', () => { const sk = S.skin; S = DEFAULT(); S.skin = sk; render(); });

/* Поделиться дизайном: всё состояние — в ссылке */
const encodeDesign = () => btoa(JSON.stringify({ t: S.tech, s: S.shape, l: S.length, f: S.finish, k: S.skin, n: S.nails.map(n => [n.c, n.d]) })).replace(/=+$/, '');
function decodeDesign(str) {
  try {
    const o = JSON.parse(atob(str));
    if (!TECH[o.t] || !SHAPES.includes(o.s) || !LENGTHS[o.l] || !FINISHES[o.f] || !Array.isArray(o.n) || o.n.length !== 5) return false;
    S.tech = o.t; S.shape = o.s; S.length = o.l; S.finish = o.f; if (/^#[0-9a-f]{6}$/i.test(o.k)) S.skin = o.k;
    S.nails = o.n.map(([c, d]) => ({ c: /^#[0-9a-f]{6}$/i.test(c) ? c : '#C98A7C', d: DESIGNS[d] ? d : 'none', t: '#FFFFFF' })); S.sel = [];
    return true;
  } catch (e) { return false; }
}
$('#shareBtn').addEventListener('click', async () => {
  const url = `${location.origin}${location.pathname}#d=${encodeDesign()}`;
  if (navigator.share) { try { await navigator.share({ title: 'Nácar', url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(url); toast(t('copied')); } catch (e) { prompt(t('share'), url); }
});

/* ===================== Галерея «Хочу так же» ===================== */
function renderLooks() {
  $('#looksGrid').innerHTML = LOOKS.map(l => {
    const st = { ...DEFAULT(), tech: l.tech, shape: l.shape, length: l.length, finish: l.finish, skin: S.skin, nails: l.nails.map(n => ({ c: n.c, d: n.d, t: n.t || '#FFFFFF' })) };
    const s0 = S; S = st; const q = quote(); S = s0;
    return `<article class="look reveal"><div class="pv">${handSVG(st, { mini: true })}</div><div class="meta"><div><h3>${L(l)}</h3><small>${eur(q.price)} · ${dur(q.min)}</small></div><button type="button" class="btn" data-look="${l.id}">${t('looks.btn')}</button></div></article>`;
  }).join('');
  reveal($$('#looksGrid .look'));
}
$('#looksGrid').addEventListener('click', e => {
  const b = e.target.closest('[data-look]'); if (!b) return;
  const l = LOOKS.find(x => x.id === b.dataset.look);
  Object.assign(S, { tech: l.tech, shape: l.shape, length: l.length, finish: l.finish, sel: [], nails: l.nails.map(n => ({ c: n.c, d: n.d, t: n.t || '#FFFFFF' })) });
  render(); $('#studio').scrollIntoView({ behavior: 'smooth' }); toast(t('loaded'));
});

/* ===================== Цены ===================== */
function renderPrices() {
  const row = (k, p, m) => `<div><dt>${k}</dt><dd>${p}${m ? `<small>${m}</small>` : ''}</dd></div>`;
  const base = Object.keys(TECH).map(k => row(L(TECH[k]), eur(TECH[k].price), dur(TECH[k].min))).join('');
  const decor = [row(t('fin.matte'), '+' + eur(FINISHES.matte.price)), row(t('fin.chrome'), '+' + eur(FINISHES.chrome.price), '+' + FINISHES.chrome.min + ' ' + t('min')),
    row(t('fin.cateye'), '+' + eur(FINISHES.cateye.price), '+' + FINISHES.cateye.min + ' ' + t('min')), row(t('q.long'), '+' + eur(LENGTHS.long.price), '+' + LENGTHS.long.min + ' ' + t('min')),
    ...['french', 'glitter', 'ombre'].map(d => row(`${t('des.' + d)}, ${t('per')}`, '+' + eur(DESIGNS[d].price)))].join('');
  const ex = Object.keys(EXTRAS).map(k => row(L(EXTRAS[k]), eur(EXTRAS[k].price), dur(EXTRAS[k].min))).join('') + row(t('shape.square') + ' / ' + t('shape.almond') + ' / …', t('free'));
  $('#priceCards').innerHTML = [[t('pc.base'), base], [t('pc.decor'), decor], [t('pc.extra'), ex]].map(([h, d]) => `<div class="pcard reveal"><h3>${h}</h3><dl>${d}</dl></div>`).join('');
  reveal($$('#priceCards .pcard'));
}

/* ===================== Мастера ===================== */
function renderMasters() {
  $('#mastersGrid').innerHTML = MASTERS.map(m => `<div class="mcard reveal"><img src="img/${m.photo}.webp" alt="${m.name}" loading="lazy"><div><h3>${m.name}</h3><p>${L(m)}</p><small>${t('m.days')}: ${m.days.map(d => T[lang].wd[d]).join(' ')} · ${m.techs.map(k => L(TECH[k])).join(', ')}</small></div></div>`).join('');
  reveal($$('#mastersGrid .mcard'));
}

/* ===================== Расписание ===================== */
// Занятость мастеров — псевдослучайная, но одинаковая для одного дня и мастера (у агентства здесь будет их календарь)
function rng(seed) { let h = 2166136261; for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; }
const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const hoursOf = d => d.getDay() === 0 ? null : d.getDay() === 6 ? SITE.hours.saturday : SITE.hours.weekdays;
const bookings = () => store.get('nc-bookings', []);
function busyOf(master, d) {
  const hrs = hoursOf(d); if (!hrs || !master.days.includes(d.getDay())) return null;
  const r = rng(dayKey(d) + master.id), open = hrs[0] * 60, close = hrs[1] * 60, busy = [];
  for (let m = open + Math.floor(r() * 4) * 15; m < close;) { const len = 45 + Math.floor(r() * 6) * 15; if (r() < .62) busy.push([m, m + len]); m += len + Math.floor(r() * 3) * 15; }
  bookings().filter(b => b.status !== 'cancel' && b.master === master.id && b.date === dayKey(d)).forEach(b => busy.push([b.start, b.start + b.min]));
  const now = new Date(); if (dayKey(now) === dayKey(d)) busy.push([open, now.getHours() * 60 + now.getMinutes() + 60]);   // сегодня — не раньше чем через час
  return { open, close, busy };
}
function freeStarts(master, d, need) {
  const b = busyOf(master, d); if (!b) return null;
  const out = [];
  for (let m = b.open; m + need <= b.close; m += 15) if (!b.busy.some(([x, y]) => m < y && m + need > x)) out.push(m);
  return out;
}
const canDo = m => m.techs.includes(S.tech);
function slotsFor(d, need) {                       // { 600: 'lucia', … } — время → кто свободен
  const list = (B.master === 'any' ? MASTERS.filter(canDo) : MASTERS.filter(m => m.id === B.master && canDo(m)));
  const map = {}; let open = false;
  list.forEach(m => { const f = freeStarts(m, d, need); if (f) { open = true; f.forEach(x => { if (!map[x]) map[x] = m.id; }); } });
  return open ? map : null;
}
const days14 = () => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + i); return d; });

/* ===================== Запись ===================== */
const B = { master: 'any', day: null, start: null, who: null };
function renderBooking() {
  const q = quote();
  const tags = [`<span class="tag">${L(TECH[S.tech])}</span>`, `<span class="tag">${t('shape.' + S.shape)} · ${t('len.' + S.length)}</span>`, `<span class="tag">${t('fin.' + S.finish)}</span>`,
    ...[...new Set(S.nails.map(n => n.c))].map(c => `<span class="tag"><i style="background:${c}"></i>${colorName(c)}</span>`),
    `<a class="pill" href="#studio">${t('b.edit')}</a>`];
  $('#chosen').innerHTML = tags.join('');
  $('#extras').innerHTML = Object.keys(EXTRAS).map(k => `<label class="check"><input type="checkbox" data-ex="${k}"${extras[k] ? ' checked' : ''}>${L(EXTRAS[k])} · +${eur(EXTRAS[k].price)}</label>`).join('');
  if (B.master !== 'any' && !canDo(MASTERS.find(m => m.id === B.master))) B.master = 'any';
  $('#mpick').innerHTML = `<button type="button" data-m="any" aria-pressed="${B.master === 'any'}"><span class="any">✦</span>${t('any')}</button>` +
    MASTERS.map(m => `<button type="button" data-m="${m.id}" aria-pressed="${B.master === m.id}"${canDo(m) ? '' : ` disabled title="${t('m.cant')}"`}><img src="img/${m.photo}.webp" alt="">${m.name}</button>`).join('');
  // дни
  const ds = days14();
  $('#days').innerHTML = ds.map((d, i) => {
    const map = slotsFor(d, q.min), n = map ? Object.keys(map).length : 0, k = dayKey(d);
    const label = i === 0 ? t('today') : i === 1 ? t('tomorrow') : T[lang].wd[d.getDay()];
    return `<button type="button" class="day${n ? '' : ' full'}" data-day="${k}" aria-pressed="${B.day === k}"><small>${label}</small><b>${d.getDate()}</b><em>${map ? (n ? t('slots', n) : t('nofree')) : t('closed')}</em></button>`;
  }).join('');
  if (!B.day) { const first = ds.find(d => { const m = slotsFor(d, q.min); return m && Object.keys(m).length; }); if (first) B.day = dayKey(first); $$('#days .day').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.day === B.day))); }
  // время
  const d = ds.find(x => dayKey(x) === B.day), map = d ? slotsFor(d, q.min) || {} : {}, starts = Object.keys(map).map(Number).sort((a, b) => a - b);
  if (B.start !== null && !map[B.start]) { B.start = null; B.who = null; }
  const grp = [[t('morning'), x => x < 720], [t('day'), x => x >= 720 && x < 960], [t('evening'), x => x >= 960]];
  $('#slots').innerHTML = !d ? `<p class="empty">${t('pickday')}</p>` : !starts.length ? `<p class="empty">${t('noslots')}</p>` :
    grp.map(([h, f]) => { const xs = starts.filter(f); return xs.length ? `<h4>${h}</h4><div class="row">${xs.map(x => `<button type="button" class="slot" data-start="${x}" aria-pressed="${B.start === x}">${hm(x)}</button>`).join('')}</div>` : ''; }).join('');
  $('#fit').textContent = t('fit', dur(q.min));
  // чек
  $('#rMini').innerHTML = handSVG(S, { mini: true });
  $('#rList').innerHTML = q.items.map(([k, p]) => `<div><dt>${k}</dt><dd>${p ? eur(p) : t('free')}</dd></div>`).join('');
  $('#rTotal').textContent = eur(q.price);
  const who = B.who && MASTERS.find(m => m.id === B.who);
  $('#rWhen').textContent = d && B.start !== null ? `${d.toLocaleDateString(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long' })}, ${hm(B.start)}–${hm(B.start + q.min)} · ${t('r.with')} ${who ? who.name : ''}` : t('r.when0');
  $('#rDep').textContent = t('r.dep', SITE.deposit, Math.max(0, q.price - SITE.deposit));
  $('#policyText').textContent = t('policy', SITE.lateMinutes, SITE.deposit);
}
$('#book').addEventListener('click', e => {
  const m = e.target.closest('[data-m]'); if (m) { B.master = m.dataset.m; B.start = null; renderBooking(); return; }
  const dd = e.target.closest('[data-day]'); if (dd) { B.day = dd.dataset.day; B.start = null; renderBooking(); return; }
  const s = e.target.closest('[data-start]');
  if (s) { const q = quote(), d = days14().find(x => dayKey(x) === B.day), map = slotsFor(d, q.min); B.start = +s.dataset.start; B.who = map[B.start]; setErr('ePolicy', ''); renderBooking(); }
});
$('#book').addEventListener('change', e => { const x = e.target.closest('[data-ex]'); if (x) { extras[x.dataset.ex] = x.checked; renderSummary(); renderBooking(); } });

const setErr = (id, msg) => { const el = $('#' + id); el.textContent = msg || ''; const f = el.closest('.field'); if (f) { if (msg) f.setAttribute('data-invalid', ''); else f.removeAttribute('data-invalid'); } };
['bName', 'bPhone', 'bEmail'].forEach((id, i) => $('#' + id).addEventListener('input', () => setErr(['eName', 'ePhone', 'eEmail'][i], '')));
$('#bPolicy').addEventListener('change', () => setErr('ePolicy', ''));
$('#bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#bName').value.trim(), phone = $('#bPhone').value.trim(), email = $('#bEmail').value.trim();
  const errs = [['eName', name ? '' : t('e.name'), '#bName'], ['ePhone', phone.replace(/\D/g, '').length >= 9 ? '' : t('e.phone'), '#bPhone'],
    ['eEmail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : t('e.email'), '#bEmail'], ['ePolicy', $('#bPolicy').checked ? '' : t('e.policy'), '#bPolicy']];
  errs.forEach(([id, msg]) => setErr(id, msg));
  if (B.start === null) { toast(t('e.slot')); $('#days').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  const bad = errs.find(x => x[1]); if (bad) { $(bad[2]).focus(); return; }
  const q = quote(), code = 'NC-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const bk = { id: Date.now(), code, date: B.day, start: B.start, min: q.min, master: B.who, price: q.price, deposit: SITE.deposit, status: 'active',
    design: encodeDesign(), summary: `${L(TECH[S.tech])}, ${t('shape.' + S.shape)}, ${[...new Set(S.nails.map(n => colorName(n.c)))].join(', ')}`, name, phone, email };
  const done = () => { store.set('nc-bookings', [...bookings(), bk]); B.start = null; renderBooking(); renderMine(); showOk(bk); };
  if (!SITE.web3formsKey) { done(); return; }
  const btn = $('#bSubmit'); btn.disabled = true; btn.textContent = t('sending');
  fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: SITE.web3formsKey, subject: `Nácar: ${code}`, ...bk }) })
    .then(r => r.json()).then(j => { if (!j.success) throw new Error(); done(); })
    .catch(() => toast('Error')).finally(() => { btn.disabled = false; btn.textContent = t('r.submit'); });
});

/* Файл для календаря (.ics): запись и напоминание о коррекции */
function ics(title, date, start, min, note) {
  const [y, mo, d] = date.split('-'), p = n => String(n).padStart(2, '0');
  const at = m => `${y}${mo}${d}T${p(Math.floor(m / 60))}${p(m % 60)}00`;
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nacar//Booking//ES', 'BEGIN:VEVENT', `UID:${Date.now()}@nacar.example`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/Madrid:${at(start)}`, `DTEND;TZID=Europe/Madrid:${at(start + min)}`, `SUMMARY:${title}`, `LOCATION:${SITE.address}`, `DESCRIPTION:${note}`,
    'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', `DESCRIPTION:${title}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' })); a.download = 'nacar.ics'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
const addDays = (key, n) => { const [y, m, d] = key.split('-').map(Number), x = new Date(y, m - 1, d + n); return dayKey(x); };
const fmtDay = key => { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long' }); };
const masterName = id => (MASTERS.find(m => m.id === id) || {}).name || '';
const waLink = text => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
function showOk(bk) {
  const box = $('#okBox');
  box.innerHTML = `<h3>${t('ok.t')}</h3><span class="code">${bk.code}</span><p>${t('ok.p', `${fmtDay(bk.date)}, ${hm(bk.start)}`, masterName(bk.master))}</p><p class="muted">${bk.summary} · ${eur(bk.price)}</p>
    <div class="acts"><button class="btn" type="button" id="okIcs">${t('ok.ics')}</button><button class="btn ghost" type="button" id="okRem">${t('ok.remind')}</button>
    <a class="btn wa" href="${waLink(t('wa.code', bk.code))}" target="_blank" rel="noopener">${t('ok.wa')}</a><button class="pill" type="button" id="okMine">${t('ok.mine')}</button></div>`;
  $('#okIcs').addEventListener('click', () => ics(t('ics.title'), bk.date, bk.start, bk.min, `${bk.code} · ${bk.summary}`));
  $('#okRem').addEventListener('click', () => ics(t('ics.remind'), addDays(bk.date, 21), bk.start, 60, bk.summary));
  $('#okMine').addEventListener('click', () => { $('#okDlg').close(); openMine(); });
  $('#okDlg').showModal();
}

/* ===================== Мои записи и «Я опаздываю» ===================== */
function renderMine() {
  const list = bookings().slice().reverse(), act = list.filter(b => b.status === 'active' || b.status === 'late').length;
  $('#mineCount').textContent = act || '';
  $('#mineList').innerHTML = !list.length ? `<p class="muted">${t('mine.empty')}</p>` : list.map(b => {
    const st = b.status === 'active' ? ['', t('st.active')] : b.status === 'late' ? ['late', t('st.late')] : ['cancel', b.reason === 'late' ? t('st.lateCancel') : t('st.cancel')];
    const live = b.status === 'active' || b.status === 'late';
    return `<div class="bk"><div class="h"><b>${fmtDay(b.date)}, ${hm(b.start)}</b><span class="st ${st[0]}">${st[1]}</span></div>
      <p>${b.code} · ${masterName(b.master)} · ${b.summary} · ${eur(b.price)}</p>
      ${b.status === 'late' ? `<p>${t('lateNote', hm(b.start + SITE.lateMinutes))}</p>` : ''}${b.status === 'cancel' ? `<p>${t('refund', b.deposit)}</p>` : ''}
      ${live ? `<div class="acts"><button class="pill" type="button" data-late="${b.id}">${t('late')}</button><button class="pill" type="button" data-cancel="${b.id}">${t('cancel')}</button></div>` : ''}</div>`;
  }).join('');
}
const updateBk = (id, patch) => { store.set('nc-bookings', bookings().map(b => b.id === id ? { ...b, ...patch } : b)); renderMine(); renderBooking(); };
function openMine() { renderMine(); $('#mineDlg').showModal(); }
$('#mineBtn').addEventListener('click', openMine);
$('#mineList').addEventListener('click', e => {
  const c = e.target.closest('[data-cancel]'); if (c) { updateBk(+c.dataset.cancel, { status: 'cancel', reason: 'user' }); toast(t('canceled')); return; }
  const l = e.target.closest('[data-late]'); if (l) openLate(+l.dataset.late);
});
function openLate(id) {
  const m = SITE.lateMinutes, d = SITE.deposit;
  $('#lateText').textContent = t('late.text', m, d);
  $('#lateOpts').innerHTML = `<button type="button" data-lo="a"><b>${t('late.a', m)}</b><span>${t('late.ap')}</span></button>
    <button type="button" data-lo="b"><b>${t('late.b', m)}</b><span>${t('late.bp', d)}</span></button>
    <button type="button" data-lo="c"><b>${t('late.c')}</b><span>${t('late.cp')}</span></button>`;
  $('#lateOpts').onclick = e => {
    const o = e.target.closest('[data-lo]'); if (!o) return;
    const bk = bookings().find(b => b.id === id);
    if (o.dataset.lo === 'a') updateBk(id, { status: 'late' });
    else {
      updateBk(id, { status: 'cancel', reason: o.dataset.lo === 'b' ? 'late' : 'user' }); toast(t('canceled'));
      if (o.dataset.lo === 'c' && bk) { decodeDesign(bk.design); render(); $('#lateDlg').close(); $('#mineDlg').close(); $('#book').scrollIntoView({ behavior: 'smooth' }); return; }
    }
    $('#lateDlg').close();
  };
  $('#lateDlg').showModal();
}
$$('dialog').forEach(d => { d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); }); });

/* ===================== Контакты и карта ===================== */
function renderContact() {
  $('#cAddr').textContent = SITE.address; $('#cPhone').textContent = SITE.phone;
  $('#cHours').textContent = t('ct.hours', SITE.hours.weekdays[0], SITE.hours.weekdays[1], SITE.hours.saturday[0], SITE.hours.saturday[1]);
  $('#cWa').href = waLink(t('wa.hello')); $('#waFab').href = waLink(t('wa.hello'));
  $('#cMaps').href = `https://www.google.com/maps/search/?api=1&query=${SITE.lat},${SITE.lng}`;
  $('#a3').textContent = t('a3', SITE.lateMinutes, SITE.deposit);
}
addEventListener('load', () => {
  const el = $('#cmap'), gl = (() => { try { return !!document.createElement('canvas').getContext('webgl'); } catch (e) { return false; } })();
  if (!window.maplibregl || !gl) return;
  try {
    const m = new maplibregl.Map({ container: el, style: 'https://tiles.openfreemap.org/styles/liberty', center: [SITE.lng, SITE.lat], zoom: 15.5, cooperativeGestures: true, dragRotate: false, attributionControl: { compact: true } });
    new maplibregl.Marker({ color: '#5B2C45' }).setLngLat([SITE.lng, SITE.lat]).addTo(m);
  } catch (e) { /* без карты — остаются адрес и кнопка «Маршрут» */ }
});

/* ===================== Язык, появление, мобильная плашка ===================== */
const revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
function reveal(els) { els.forEach(el => { if (revealIO) revealIO.observe(el); else el.classList.add('in'); }); }
function heroFree() {
  // ближайшее свободное окно для гель-лака у любого мастера
  const s0 = S; S = DEFAULT(); const need = quote().min; S = s0;
  const ds = days14(), gel = MASTERS.filter(m => m.techs.includes('gel'));
  const today = gel.reduce((a, m) => a + (freeStarts(m, ds[0], need) || []).length, 0);
  let next = null;
  for (let i = today ? 0 : 1; i < ds.length && !next; i++) {
    const st = gel.map(m => (freeStarts(m, ds[i], need) || [])[0]).filter(x => x !== undefined);
    if (st.length) next = [i, Math.min(...st)];
  }
  $('#heroFreeT').textContent = today ? t('badge.t') : t('badge.t0');
  $('#heroFree').textContent = today ? t('badge.n', today) : next ? t('badge.next', next[0] === 1 ? t('tomorrow').toLowerCase() : ds[next[0]].toLocaleDateString(LOCALE[lang], { weekday: 'long', day: 'numeric' }), hm(next[1])) : '';
}
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i]').forEach(el => { const v = T[lang][el.dataset.i]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-i-ph]').forEach(el => el.setAttribute('placeholder', T[lang][el.dataset.iPh]));
  $('#heroTitle').innerHTML = t('hero.title');
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  render(); renderLooks(); renderPrices(); renderMasters(); renderContact(); renderMine(); heroFree();
}
$$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('nc-lang', lang); applyLang(); }));
const mbar = $('#mbar');
if ('IntersectionObserver' in window) {
  const vis = new Set();
  const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) vis.add(e.target.id); else vis.delete(e.target.id); }); mbar.classList.toggle('on', vis.has('studio') && !vis.has('book')); }, { threshold: .05 });
  io.observe($('#studio')); io.observe($('#book'));
}

if (location.hash.startsWith('#d=')) decodeDesign(location.hash.slice(3));
applyLang();
reveal($$('.reveal'));
})();
