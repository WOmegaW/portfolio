/* Nácar Nail Studio — логика сайта: галерея работ с ценами, запись по календарю, WhatsApp для своего дизайна, «Мои записи».
   Данные (цены, цвета, мастера) — в data.js. */
(() => {
'use strict';
const { SITE, TECH, LENGTHS, FINISHES, DESIGNS, EXTRAS, MASTERS, LOOKS, WORKS, ADVICE } = window;
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
  'hero.eyebrow': 'Маникюр в Марбелье', 'hero.title': 'Маникюр,|достойный|<em>крупного плана</em>',
  'hero.lead': 'Выберите работу мастеров — цена и время указаны сразу. Свой дизайн? Пришлите фото мастеру в WhatsApp.',
  'hero.cta1': 'Выбрать дизайн', 'hero.cta2': 'Свой дизайн — в WhatsApp', 'trust.1': 'Цена окончательная', 'trust.2': 'Стерилизация как в клинике', 'trust.3': 'ES · EN · RU',
  'badge.t': 'Сегодня есть свободные окна', 'badge.t0': 'На сегодня всё занято', 'badge.next': (d, h) => `Ближайшее окно: ${d}, ${h}`, 'badge.none': 'Сегодня всё занято — ближайшие окна завтра', 'badge.n': n => `${n} ${plural(n, 'окно', 'окна', 'окон')} для гель-лака сегодня`,
  'studio.eyebrow': 'Конфигуратор', 'studio.title': 'Соберите свой маникюр', 'studio.lead': 'Нажмите на ноготь, чтобы сделать его акцентным, или меняйте все сразу.',
  'skin': 'Тон кожи', 'reset': 'Сбросить', 'hint': 'Потяните, чтобы повернуть · нажмите на ноготь — он станет акцентным', 'disclaim': 'На экране цвет может немного отличаться — мастер покажет живую палитру.',
  'c.tech': 'Техника', 'c.shape': 'Форма', 'c.length': 'Длина', 'c.finish': 'Покрытие', 'c.target': 'Что красим', 'c.color': 'Цвет', 'c.design': 'Дизайн', 'c.custom': 'Свой цвет (мастер подберёт ближайший)',
  'tg.all': 'Все ногти', 'tg.sel': n => `Выбрано: ${n}`, 'tg.note': 'или нажмите на ноготь',
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
  'm.eyebrow': 'В ролях', 'm.title': 'Кто будет делать ваш маникюр', 'm.days': 'Работает', 'any': 'Любой мастер', 'm.cant': 'не делает эту технику',
  'b.eyebrow': 'Запись', 'b.title': 'Выберите день и время', 'b.lead': 'В календаре — только окна, в которые ваша услуга помещается целиком.',
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
  'foot.demo': 'Концепт-проект для портфолио: салон, мастера, цены и отзывы вымышлены. Фото: StockSnap (CC0). 3D: three.js (MIT). Карта: OpenFreeMap © OpenStreetMap.',
  'wd': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], 'today': 'Сегодня', 'tomorrow': 'Завтра', 'sending': 'Отправляем…', 'nail': n => `Ноготь ${n}`,
  'hero.kicker': 'Nácar представляет · Марбелья',
  'hero.scene': 'Сцена',
  'inter.tag': 'Крупный план', 'inter.q': 'Каждая деталь — крупным планом.',
  'r.ticket': 'Билет',
  'fingers': ['Большой', 'Указательный', 'Средний', 'Безымянный', 'Мизинец'],
  'nav.works': 'Работы и цены',
  'works.eyebrow': 'Работы и цены',
  'works.title': 'Понравилось — записывайтесь',
  'works.lead': 'Под каждой работой — окончательная цена и время. Нажмите на фото, чтобы рассмотреть и записаться.',
  'f.all': 'Все',
  'w.price': 'Цена',
  'w.time': 'Время',
  'w.master': 'Мастер',
  'w.book': 'Записаться на этот дизайн',
  'w.wa': 'Хочу похоже — спросить в WhatsApp',
  'w.fixed': 'Цена окончательная: без доплат за форму или «сложность».',
  'w.chosen': 'Дизайн выбран — осталось выбрать время',
  'wa.like': (n, p) => `Здравствуйте! Хочу как «${n}» (${p}), но со своими изменениями — пришлю фото.`,
  'own.title': 'Свой дизайн?',
  'own.text': 'Пришлите фото мастеру в WhatsApp: посмотрит и скажет цену. Обычно отвечаем в течение часа.',
  'own.btn': 'Отправить фото в WhatsApp',
  'wa.own': 'Здравствуйте! Хочу маникюр по своему фото — сейчас пришлю. Сколько это будет стоить?',
  'adv.title': 'Не знаете, что выбрать?',
  'adv.text': 'Мастер подберёт форму и цвет на месте, цену скажет до начала работы.',
  'adv.btn': 'Пусть решит мастер',
  'adv.name': 'Мастер подберёт на месте',
  'from': p => `от ${p}`,
  'b.pick': 'Выберите дизайн в галерее или доверьтесь мастеру.',
  'b.change': 'Выбрать другой дизайн',
  'b.toWorks': 'Открыть галерею',
  'f.note': 'Комментарий мастеру',
  'ph.note': 'Например: хочу чуть короче',
  'e.work': 'Выберите дизайн или «Пусть решит мастер».',
  'r.depAdv': d => `Сейчас — предоплата ${d} €, остальное — в салоне, когда мастер назовёт цену. Демо: оплата не списывается.`,
  'faq.q6': 'Можно прийти со своим фото?',
  'faq.a6': 'Да. Пришлите его в WhatsApp заранее — мастер скажет цену и время, и мы подберём окно.'
},
es: {
  'nav.studio': 'Configurador', 'nav.looks': 'Diseños', 'nav.prices': 'Precios', 'nav.hyg': 'Higiene', 'nav.book': 'Reservar', 'mine': 'Mis citas', 'cta.book': 'Reservar',
  'hero.eyebrow': 'Manicura en Marbella', 'hero.title': 'Uñas que|merecen un|<em>primer plano</em>',
  'hero.lead': 'Elige un trabajo del equipo: precio y tiempo a la vista. ¿Tienes tu propio diseño? Envía la foto por WhatsApp.',
  'hero.cta1': 'Elegir diseño', 'hero.cta2': 'Tu diseño — por WhatsApp', 'trust.1': 'Precio cerrado', 'trust.2': 'Esterilización de clínica', 'trust.3': 'ES · EN · RU',
  'badge.t': 'Hoy hay huecos libres', 'badge.t0': 'Hoy está completo', 'badge.next': (d, h) => `Próximo hueco: ${d}, ${h}`, 'badge.none': 'Hoy está completo — los próximos huecos, mañana', 'badge.n': n => `${n} ${n === 1 ? 'hueco' : 'huecos'} para semipermanente hoy`,
  'studio.eyebrow': 'Configurador', 'studio.title': 'Diseña tu manicura', 'studio.lead': 'Toca una uña para hacerla de acento o cambia todas a la vez.',
  'skin': 'Tono de piel', 'reset': 'Reiniciar', 'hint': 'Arrastra para girar · toca una uña para hacerla de acento', 'disclaim': 'El color en pantalla puede variar un poco: la manicurista te enseñará la carta real.',
  'c.tech': 'Técnica', 'c.shape': 'Forma', 'c.length': 'Largo', 'c.finish': 'Acabado', 'c.target': 'Qué pintamos', 'c.color': 'Color', 'c.design': 'Diseño', 'c.custom': 'Tu color (buscamos el más parecido)',
  'tg.all': 'Todas las uñas', 'tg.sel': n => `Seleccionadas: ${n}`, 'tg.note': 'o toca una uña',
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
  'm.eyebrow': 'Reparto', 'm.title': 'Quién hará tu manicura', 'm.days': 'Trabaja', 'any': 'Cualquiera', 'm.cant': 'no hace esta técnica',
  'b.eyebrow': 'Reserva', 'b.title': 'Elige día y hora', 'b.lead': 'El calendario solo muestra huecos donde cabe tu servicio entero.',
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
  'foot.demo': 'Proyecto conceptual para portafolio: el salón, el equipo, los precios y las opiniones son ficticios. Fotos: StockSnap (CC0). 3D: three.js (MIT). Mapa: OpenFreeMap © OpenStreetMap.',
  'wd': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], 'today': 'Hoy', 'tomorrow': 'Mañana', 'sending': 'Enviando…', 'nail': n => `Uña ${n}`,
  'hero.kicker': 'Nácar presenta · Marbella',
  'hero.scene': 'Escena',
  'inter.tag': 'Primer plano', 'inter.q': 'Cada detalle, en primer plano.',
  'r.ticket': 'Entrada',
  'fingers': ['Pulgar', 'Índice', 'Corazón', 'Anular', 'Meñique'],
  'nav.works': 'Trabajos y precios',
  'works.eyebrow': 'Trabajos y precios',
  'works.title': '¿Te gusta? Reserva',
  'works.lead': 'Bajo cada trabajo, el precio final y el tiempo. Toca la foto para verla de cerca y reservar.',
  'f.all': 'Todo',
  'w.price': 'Precio',
  'w.time': 'Tiempo',
  'w.master': 'Manicurista',
  'w.book': 'Reservar este diseño',
  'w.wa': 'Quiero algo parecido — WhatsApp',
  'w.fixed': 'Precio final: sin suplementos por forma ni «dificultad».',
  'w.chosen': 'Diseño elegido: ahora elige la hora',
  'wa.like': (n, p) => `¡Hola! Quiero algo como «${n}» (${p}), con algunos cambios — te envío una foto.`,
  'own.title': '¿Tu propio diseño?',
  'own.text': 'Envía la foto por WhatsApp: la manicurista te dirá el precio. Solemos responder en menos de una hora.',
  'own.btn': 'Enviar foto por WhatsApp',
  'wa.own': '¡Hola! Quiero una manicura como en mi foto, ahora la envío. ¿Cuánto costaría?',
  'adv.title': '¿No sabes qué elegir?',
  'adv.text': 'La manicurista elegirá contigo forma y color; el precio, antes de empezar.',
  'adv.btn': 'Que decida la manicurista',
  'adv.name': 'Lo decidimos en el salón',
  'from': p => `desde ${p}`,
  'b.pick': 'Elige un diseño en la galería o deja que decida la manicurista.',
  'b.change': 'Elegir otro diseño',
  'b.toWorks': 'Abrir la galería',
  'f.note': 'Comentario',
  'ph.note': 'Por ejemplo: un poco más cortas',
  'e.work': 'Elige un diseño o «Que decida la manicurista».',
  'r.depAdv': d => `Ahora, señal de ${d} €; el resto en el salón cuando sepas el precio. Demo: no se cobra nada.`,
  'faq.q6': '¿Puedo venir con mi propia foto?',
  'faq.a6': 'Sí. Envíala antes por WhatsApp: te diremos precio y tiempo y buscamos el hueco.'
},
en: {
  'nav.studio': 'Configurator', 'nav.looks': 'Designs', 'nav.prices': 'Prices', 'nav.hyg': 'Hygiene', 'nav.book': 'Book', 'mine': 'My bookings', 'cta.book': 'Book now',
  'hero.eyebrow': 'Manicure in Marbella', 'hero.title': 'Nails that|deserve a|<em>close-up</em>',
  'hero.lead': 'Pick a design by our artists — price and time shown upfront. Have your own idea? Send the photo on WhatsApp.',
  'hero.cta1': 'Choose a design', 'hero.cta2': 'Your design — on WhatsApp', 'trust.1': 'Fixed price', 'trust.2': 'Clinic-grade sterilisation', 'trust.3': 'ES · EN · RU',
  'badge.t': 'Free slots today', 'badge.t0': 'Fully booked today', 'badge.next': (d, h) => `Next free slot: ${d}, ${h}`, 'badge.none': 'Fully booked today — next slots tomorrow', 'badge.n': n => `${n} gel-polish ${n === 1 ? 'slot' : 'slots'} left today`,
  'studio.eyebrow': 'Configurator', 'studio.title': 'Design your manicure', 'studio.lead': 'Tap a nail to make it an accent, or change them all at once.',
  'skin': 'Skin tone', 'reset': 'Reset', 'hint': 'Drag to rotate · tap a nail to make it an accent', 'disclaim': 'Colours on screen may vary slightly — we will show you the real swatches.',
  'c.tech': 'Technique', 'c.shape': 'Shape', 'c.length': 'Length', 'c.finish': 'Finish', 'c.target': 'What we paint', 'c.color': 'Colour', 'c.design': 'Design', 'c.custom': 'Your own colour (we match the closest)',
  'tg.all': 'All nails', 'tg.sel': n => `Selected: ${n}`, 'tg.note': 'or tap a nail',
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
  'm.eyebrow': 'Cast', 'm.title': 'Who will do your nails', 'm.days': 'Works', 'any': 'Any artist', 'm.cant': 'does not do this technique',
  'b.eyebrow': 'Booking', 'b.title': 'Pick a day and time', 'b.lead': 'The calendar only shows slots where your whole service fits.',
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
  'foot.demo': 'Portfolio concept project: the salon, artists, prices and reviews are fictional. Photos: StockSnap (CC0). 3D: three.js (MIT). Map: OpenFreeMap © OpenStreetMap.',
  'wd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 'today': 'Today', 'tomorrow': 'Tomorrow', 'sending': 'Sending…', 'nail': n => `Nail ${n}`,
  'hero.kicker': 'Nácar presents · Marbella',
  'hero.scene': 'Scene',
  'inter.tag': 'Close-up', 'inter.q': 'Every detail, in close-up.',
  'r.ticket': 'Ticket',
  'fingers': ['Thumb', 'Index', 'Middle', 'Ring', 'Little'],
  'nav.works': 'Work & prices',
  'works.eyebrow': 'Work & prices',
  'works.title': 'Love it? Book it',
  'works.lead': 'Every design shows its final price and time. Tap a photo to see it close up and book.',
  'f.all': 'All',
  'w.price': 'Price',
  'w.time': 'Time',
  'w.master': 'Artist',
  'w.book': 'Book this design',
  'w.wa': 'Something similar — ask on WhatsApp',
  'w.fixed': 'Final price: no extras for shape or “difficulty”.',
  'w.chosen': 'Design chosen — now pick a time',
  'wa.like': (n, p) => `Hello! I would like something like “${n}” (${p}) with a few changes — I will send a photo.`,
  'own.title': 'Your own design?',
  'own.text': 'Send the photo on WhatsApp: the artist will tell you the price. We usually reply within an hour.',
  'own.btn': 'Send photo on WhatsApp',
  'wa.own': 'Hello! I would like a manicure like my photo — sending it now. How much would it be?',
  'adv.title': 'Not sure what to choose?',
  'adv.text': 'Your artist will pick shape and colour with you and tell the price before starting.',
  'adv.btn': 'Let the artist decide',
  'adv.name': 'We decide at the salon',
  'from': p => `from ${p}`,
  'b.pick': 'Pick a design in the gallery or let the artist decide.',
  'b.change': 'Choose another design',
  'b.toWorks': 'Open the gallery',
  'f.note': 'Note for the artist',
  'ph.note': 'e.g. a bit shorter',
  'e.work': 'Pick a design or “Let the artist decide”.',
  'r.depAdv': d => `€${d} deposit now, the rest at the salon once you know the price. Demo: nothing is charged.`,
  'faq.q6': 'Can I bring my own photo?',
  'faq.a6': 'Yes. Send it on WhatsApp beforehand — we will tell you the price and time and find a slot.'
}};
function plural(n, one, few, many) { const a = n % 10, b = n % 100; if (a === 1 && b !== 11) return one; if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few; return many; }
const nav = (navigator.language || '').slice(0, 2);
let lang = store.get('nc-lang', ['ru', 'es', 'en'].includes(nav) ? nav : 'es');
const t = (k, ...a) => { const v = (T[lang] || T.es)[k]; return typeof v === 'function' ? v(...a) : v; };
const L = o => o[lang] || o.en;
const N = o => o['n' + lang] || o.nen;
const LOCALE = { ru: 'ru-RU', es: 'es-ES', en: 'en-GB' };
const eur = n => new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const dur = m => { const h = Math.floor(m / 60), r = m % 60; return h ? `${h} ${t('h')}${r ? ` ${r} ${t('min')}` : ''}` : `${r} ${t('min')}`; };
const hm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
const toastEl = $('#toast'); let toastT = 0;
const toast = msg => { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2600); };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const waLink = text => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const masterName = id => (MASTERS.find(m => m.id === id) || {}).name || '';
const workById = id => WORKS.find(w => w.id === id);
const photo = w => `img/works/${w.photo}.webp`;

/* ===================== Выбор: работа из галереи или «пусть решит мастер» ===================== */
const B = { work: null, master: 'any', day: null, start: null, who: null };   // work: id работы | 'advice' | null
const extras = { removal: false, pedicure: false };
function quote() {
  const items = [];
  let price = 0, min = 0, from = false;
  const w = B.work && B.work !== 'advice' ? workById(B.work) : null;
  if (w) { items.push([L(w), w.price, w.min]); price += w.price; min += w.min; }
  else if (B.work === 'advice') { items.push([t('adv.name'), ADVICE.price, ADVICE.min]); price += ADVICE.price; min += ADVICE.min; from = true; }
  Object.keys(extras).filter(k => extras[k]).forEach(k => { items.push([L(EXTRAS[k]), EXTRAS[k].price, EXTRAS[k].min]); price += EXTRAS[k].price; min += EXTRAS[k].min; });
  return { items, price, min: Math.ceil(min / 15) * 15, from, tech: w ? w.tech : null };
}
const priceText = q => q.from ? t('from', eur(q.price)) : eur(q.price);
function choose(id, go = true) {
  B.work = id; B.start = null;
  renderBooking(); renderMbar();
  if (go) $('#book').scrollIntoView({ behavior: 'smooth' });
}

/* ===================== Галерея работ с ценами ===================== */
let filter = 'all';
function renderWorks() {
  const techs = ['all', ...new Set(WORKS.map(w => w.tech))];
  $('#workFilter').innerHTML = techs.map(k => `<button type="button" class="pill" data-f="${k}" aria-pressed="${filter === k}">${k === 'all' ? t('f.all') : L(TECH[k])}</button>`).join('');
  const list = WORKS.filter(w => filter === 'all' || w.tech === filter);
  $('#worksGrid').innerHTML = list.map((w, i) => `<button type="button" class="work reveal" data-work="${w.id}" style="transition-delay:${(i % 3) * .08}s">
      <span class="ph"><img src="${photo(w)}" alt="${esc(L(w))}" loading="lazy"${w.pos ? ` style="object-position:${w.pos}"` : ''}></span>
      <span class="cap"><b>${esc(L(w))}</b><small>${L(TECH[w.tech])} · ${dur(w.min)}</small></span>
      <span class="price">${eur(w.price)}</span>
    </button>`).join('');
  reveal($$('#worksGrid .work'));
}
$('#workFilter').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) { filter = b.dataset.f; renderWorks(); } });
$('#worksGrid').addEventListener('click', e => { const b = e.target.closest('[data-work]'); if (b) openWork(b.dataset.work); });

/* окно работы: крупное фото, цена, время, мастер → записаться или спросить в WhatsApp */
function openWork(id, fromHash) {
  const w = workById(id); if (!w) return;
  const m = MASTERS.find(x => x.id === w.master);
  $('#workBox').innerHTML = `<div class="wk-ph"><img src="${photo(w)}" alt="${esc(L(w))}"></div>
    <div class="wk-in">
      <p class="eyebrow">${L(TECH[w.tech])}</p>
      <h3>${esc(L(w))}</h3>
      <p class="wk-note">${esc(N(w))}</p>
      <dl class="wk-facts"><div><dt>${t('w.price')}</dt><dd>${eur(w.price)}</dd></div><div><dt>${t('w.time')}</dt><dd>${dur(w.min)}</dd></div>${m ? `<div><dt>${t('w.master')}</dt><dd>${m.name}</dd></div>` : ''}</dl>
      <p class="wk-fix">${t('w.fixed')}</p>
      <div class="wk-acts"><button class="btn" type="button" id="wkBook">${t('w.book')}</button>
        <a class="btn ghost" href="${waLink(t('wa.like', L(w), eur(w.price)))}" target="_blank" rel="noopener">${t('w.wa')}</a></div>
    </div>`;
  $('#wkBook').addEventListener('click', () => { $('#workDlg').close(); choose(w.id); toast(t('w.chosen')); });
  if (!fromHash) { try { history.replaceState(null, '', '#work/' + w.id); } catch (e) { /* file:// */ } }
  $('#workDlg').showModal();
}
$('#workDlg').addEventListener('close', () => { if (location.hash.startsWith('#work/')) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* */ } } });

/* свой дизайн и «пусть решит мастер» */
$('#ownWa').addEventListener('click', () => { $('#ownWa').href = waLink(t('wa.own')); });
$('#adviceBtn').addEventListener('click', () => { choose('advice'); });

/* ===================== Цены ===================== */
function renderPrices() {
  const row = (k, p, m) => `<div><dt>${k}</dt><dd>${p}${m ? `<small>${m}</small>` : ''}</dd></div>`;
  const base = Object.keys(TECH).map(k => row(L(TECH[k]), t('from', eur(TECH[k].price)), dur(TECH[k].min))).join('');
  const decor = [row(t('fin.matte'), '+' + eur(FINISHES.matte.price)), row(t('fin.chrome'), '+' + eur(FINISHES.chrome.price)), row(t('fin.cateye'), '+' + eur(FINISHES.cateye.price)),
    row(t('q.long'), '+' + eur(LENGTHS.long.price)), ...['french', 'glitter', 'ombre'].map(d => row(`${t('des.' + d)}, ${t('per')}`, '+' + eur(DESIGNS[d].price)))].join('');
  const ex = Object.keys(EXTRAS).map(k => row(L(EXTRAS[k]), eur(EXTRAS[k].price), dur(EXTRAS[k].min))).join('') + row(t('adv.name'), t('from', eur(ADVICE.price)));
  $('#priceCards').innerHTML = [[t('pc.base'), base], [t('pc.decor'), decor], [t('pc.extra'), ex]].map(([h, d]) => `<div class="pcard reveal"><h3>${h}</h3><dl>${d}</dl></div>`).join('');
  reveal($$('#priceCards .pcard'));
}

/* ===================== Мастера ===================== */
function renderMasters() {
  $('#mastersGrid').innerHTML = MASTERS.map(m => `<div class="mcard reveal"><img src="img/${m.photo}.webp" alt="${m.name}" loading="lazy"><div><h3>${m.name}</h3><p>${L(m)}</p><small>${t('m.days')}: ${m.days.map(d => T[lang].wd[d]).join(' ')} · ${m.techs.map(k => L(TECH[k])).join(', ')}</small></div></div>`).join('');
  reveal($$('#mastersGrid .mcard'));
}

/* ===================== Расписание ===================== */
// Демо: занятость мастеров — псевдослучайная, но постоянная для дня и мастера. У салона здесь будет его календарь.
function rng(seed) { let h = 2166136261; for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; }
const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const hoursOf = d => d.getDay() === 0 ? null : d.getDay() === 6 ? SITE.hours.saturday : SITE.hours.weekdays;
const bookings = () => store.get('nc-bookings', []);
function busyOf(master, d) {
  const r = rng(dayKey(d) + master.id), h = hoursOf(d), busy = [];
  for (let s = h[0] * 60; s < h[1] * 60; s += 30) if (r() < .42) busy.push([s, s + 30 + Math.floor(r() * 3) * 30]);
  bookings().filter(b => b.status !== 'cancel' && b.master === master.id && b.date === dayKey(d)).forEach(b => busy.push([b.start, b.start + b.min]));
  return busy;
}
function freeStarts(master, d, need) {
  const h = hoursOf(d); if (!h || !master.days.includes(d.getDay())) return null;
  const busy = busyOf(master, d), now = new Date(), today = dayKey(d) === dayKey(now), nowMin = now.getHours() * 60 + now.getMinutes() + 30, out = [];
  for (let s = h[0] * 60; s + need <= h[1] * 60; s += 15) { if (today && s < nowMin) continue; if (!busy.some(([a, b]) => s < b && s + need > a)) out.push(s); }
  return out;
}
const canDo = (m, tech) => !tech || m.techs.includes(tech);
function slotsFor(d, need, tech) {                    // { 600: 'lucia', … } — время → кто свободен
  const list = MASTERS.filter(m => canDo(m, tech) && (B.master === 'any' || B.master === m.id)), map = {};
  let open = false;
  list.forEach(m => { const fs = freeStarts(m, d, need); if (fs) { open = true; fs.forEach(s => { if (!map[s]) map[s] = m.id; }); } });
  return open ? map : null;
}
const days14 = () => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + i); return d; });

/* ===================== Запись ===================== */
function renderBooking() {
  const q = quote(), w = B.work && B.work !== 'advice' ? workById(B.work) : null;
  // 1. услуга
  $('#chosen').innerHTML = w ? `<div class="pick"><img src="${photo(w)}" alt=""><div><b>${esc(L(w))}</b><span>${L(TECH[w.tech])} · ${dur(w.min)} · ${eur(w.price)}</span></div></div>`
    : B.work === 'advice' ? `<div class="pick adv"><span class="any">✦</span><div><b>${t('adv.name')}</b><span>${t('adv.text')}</span></div></div>`
    : `<p class="empty">${t('b.pick')}</p>`;
  $('#chosenActs').innerHTML = `<a class="pill" href="#works">${w || B.work === 'advice' ? t('b.change') : t('b.toWorks')}</a>${B.work === 'advice' ? '' : `<button type="button" class="pill" id="advPick">${t('adv.btn')}</button>`}`;
  $('#extras').innerHTML = Object.keys(EXTRAS).map(k => `<label class="check"><input type="checkbox" data-ex="${k}"${extras[k] ? ' checked' : ''}>${L(EXTRAS[k])} · +${eur(EXTRAS[k].price)}</label>`).join('');
  // 2. мастер
  if (B.master !== 'any' && !canDo(MASTERS.find(m => m.id === B.master), q.tech)) B.master = 'any';
  $('#mpick').innerHTML = `<button type="button" data-m="any" aria-pressed="${B.master === 'any'}"><span class="any">✦</span>${t('any')}</button>` +
    MASTERS.map(m => `<button type="button" data-m="${m.id}" aria-pressed="${B.master === m.id}"${canDo(m, q.tech) ? '' : ` disabled title="${t('m.cant')}"`}><img src="img/${m.photo}.webp" alt="">${m.name}</button>`).join('');
  // 3. день и время — окна, куда услуга помещается целиком
  const ds = days14(), need = q.min || ADVICE.min;
  $('#days').innerHTML = ds.map((d, i) => {
    const map = slotsFor(d, need, q.tech), n = map ? Object.keys(map).length : 0, k = dayKey(d);
    const label = i === 0 ? t('today') : i === 1 ? t('tomorrow') : T[lang].wd[d.getDay()];
    return `<button type="button" class="day${n ? '' : ' full'}" data-day="${k}" aria-pressed="${B.day === k}"><small>${label}</small><b>${d.getDate()}</b><em>${map ? (n ? t('slots', n) : t('nofree')) : t('closed')}</em></button>`;
  }).join('');
  if (!B.day) { const first = ds.find(d => { const m = slotsFor(d, need, q.tech); return m && Object.keys(m).length; }); if (first) B.day = dayKey(first); $$('#days .day').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.day === B.day))); }
  const d = ds.find(x => dayKey(x) === B.day), map = d ? slotsFor(d, need, q.tech) || {} : {}, starts = Object.keys(map).map(Number).sort((a, b) => a - b);
  if (B.start !== null && !map[B.start]) { B.start = null; B.who = null; }
  const grp = [[t('morning'), x => x < 720], [t('day'), x => x >= 720 && x < 960], [t('evening'), x => x >= 960]];
  $('#slots').innerHTML = !d ? `<p class="empty">${t('pickday')}</p>` : !starts.length ? `<p class="empty">${t('noslots')}</p>` :
    grp.map(([h, f]) => { const xs = starts.filter(f); return xs.length ? `<h4>${h}</h4><div class="row">${xs.map(x => `<button type="button" class="slot" data-start="${x}" aria-pressed="${B.start === x}">${hm(x)}</button>`).join('')}</div>` : ''; }).join('');
  $('#fit').textContent = t('fit', dur(need));
  // билет
  $('#rMini').innerHTML = w ? `<img src="${photo(w)}" alt="">` : `<div class="mini-empty">${B.work === 'advice' ? '✦' : 'Nácar'}</div>`;
  $('#rList').innerHTML = q.items.length ? q.items.map(([k, p]) => `<div><dt>${esc(k)}</dt><dd>${q.from && p === ADVICE.price && k === t('adv.name') ? t('from', eur(p)) : eur(p)}</dd></div>`).join('') : `<div><dt>${t('b.pick')}</dt></div>`;
  $('#rTotal').textContent = q.items.length ? priceText(q) : '—';
  const who = B.who && MASTERS.find(m => m.id === B.who);
  $('#rWhen').textContent = d && B.start !== null ? `${d.toLocaleDateString(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long' })}, ${hm(B.start)}–${hm(B.start + need)} · ${t('r.with')} ${who ? who.name : ''}` : t('r.when0');
  $('#rDep').textContent = q.from ? t('r.depAdv', SITE.deposit) : t('r.dep', SITE.deposit, Math.max(0, q.price - SITE.deposit));
  $('#policyText').textContent = t('policy', SITE.lateMinutes, SITE.deposit);
}
$('#book').addEventListener('click', e => {
  if (e.target.closest('#advPick')) { choose('advice', false); return; }
  const m = e.target.closest('[data-m]'); if (m) { B.master = m.dataset.m; B.start = null; renderBooking(); return; }
  const dd = e.target.closest('[data-day]'); if (dd) { B.day = dd.dataset.day; B.start = null; renderBooking(); return; }
  const s = e.target.closest('[data-start]');
  if (s) { const q = quote(), d = days14().find(x => dayKey(x) === B.day), map = slotsFor(d, q.min || ADVICE.min, q.tech); B.start = +s.dataset.start; B.who = map[B.start]; setErr('ePolicy', ''); renderBooking(); }
});
$('#book').addEventListener('change', e => { const x = e.target.closest('[data-ex]'); if (x) { extras[x.dataset.ex] = x.checked; renderBooking(); renderMbar(); } });

const setErr = (id, msg) => { const el = $('#' + id); el.textContent = msg || ''; const f = el.closest('.field'); if (f) { if (msg) f.setAttribute('data-invalid', ''); else f.removeAttribute('data-invalid'); } };
['bName', 'bPhone', 'bEmail'].forEach((id, i) => $('#' + id).addEventListener('input', () => setErr(['eName', 'ePhone', 'eEmail'][i], '')));
$('#bPolicy').addEventListener('change', () => setErr('ePolicy', ''));
$('#bookForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!B.work) { toast(t('e.work')); $('#chosen').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  const name = $('#bName').value.trim(), phone = $('#bPhone').value.trim(), email = $('#bEmail').value.trim(), note = $('#bNote').value.trim();
  const errs = [['eName', name ? '' : t('e.name'), '#bName'], ['ePhone', phone.replace(/\D/g, '').length >= 9 ? '' : t('e.phone'), '#bPhone'],
    ['eEmail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : t('e.email'), '#bEmail'], ['ePolicy', $('#bPolicy').checked ? '' : t('e.policy'), '#bPolicy']];
  errs.forEach(([id, msg]) => setErr(id, msg));
  if (B.start === null) { toast(t('e.slot')); $('#days').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  const bad = errs.find(x => x[1]); if (bad) { $(bad[2]).focus(); return; }
  const q = quote(), code = 'NC-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const bk = { id: Date.now(), code, date: B.day, start: B.start, min: q.min, master: B.who, price: q.price, from: q.from, deposit: SITE.deposit, status: 'active',
    work: B.work, extras: Object.keys(extras).filter(k => extras[k]), summary: q.items.map(i => i[0]).join(' + '), name, phone, email, note };
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
const bkPrice = b => b.from ? t('from', eur(b.price)) : eur(b.price);
function showOk(bk) {
  const box = $('#okBox');
  box.innerHTML = `<h3>${t('ok.t')}</h3><span class="code">${bk.code}</span><p>${t('ok.p', `${fmtDay(bk.date)}, ${hm(bk.start)}`, masterName(bk.master))}</p><p class="muted">${esc(bk.summary)} · ${bkPrice(bk)}</p>
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
    const live = b.status === 'active' || b.status === 'late', w = b.work && workById(b.work);
    return `<div class="bk">${w ? `<img src="${photo(w)}" alt="">` : ''}<div><div class="h"><b>${fmtDay(b.date)}, ${hm(b.start)}</b><span class="st ${st[0]}">${st[1]}</span></div>
      <p>${b.code} · ${masterName(b.master)} · ${esc(b.summary)} · ${bkPrice(b)}</p>
      ${b.status === 'late' ? `<p>${t('lateNote', hm(b.start + SITE.lateMinutes))}</p>` : ''}${b.status === 'cancel' ? `<p>${t('refund', b.deposit)}</p>` : ''}
      ${live ? `<div class="acts"><button class="pill" type="button" data-late="${b.id}">${t('late')}</button><button class="pill" type="button" data-cancel="${b.id}">${t('cancel')}</button></div>` : ''}</div></div>`;
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
      if (o.dataset.lo === 'c' && bk) { B.work = bk.work || 'advice'; Object.keys(extras).forEach(k => { extras[k] = (bk.extras || []).includes(k); }); renderBooking(); $('#lateDlg').close(); $('#mineDlg').close(); $('#book').scrollIntoView({ behavior: 'smooth' }); return; }
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
  $('#cWa').href = waLink(t('wa.hello')); $('#waFab').href = waLink(t('wa.hello')); $('#ownWa').href = waLink(t('wa.own')); $('#heroWa').href = waLink(t('wa.own'));
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

/* ===================== Первый экран: 3D-сцены ===================== */
const look3 = st => ({ shape: st.shape, length: st.length, finish: st.finish, nails: st.nails.map(n => ({ c: n.c, d: n.d, t: n.t || '#FFFFFF' })) });
let hero3d = null, macro3d = null, heroI = 2, macroI = 5, macroT = 0;
function heroScene() {
  const l = LOOKS[heroI % LOOKS.length];
  $('#sceneNo').textContent = String(heroI % LOOKS.length + 1).padStart(2, '0');
  $('#sceneName').textContent = L(l);
  const sc = $('.scene'); sc.classList.remove('cut'); void sc.offsetWidth; sc.classList.add('cut');
}
function initHero() {
  if (hero3d || !window.Nail3D) return;
  try { hero3d = Nail3D.stage($('#heroCanvas'), { mode: 'hero', onScene: i => { heroI = i; heroScene(); } }); } catch (e) { return; }
  heroScene(); hero3d.play(LOOKS.map(look3), heroI);
  try {                                                   // интерлюдия: крупный план одного ногтя, образы медленно сменяются
    macro3d = Nail3D.stage($('#macroCanvas'), { mode: 'macro' });
    const show = () => { const l = LOOKS[macroI % LOOKS.length]; macro3d.set(look3(l)); $('#macroName').textContent = L(l); };
    show();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) macroT = setInterval(() => { if (!document.hidden) { macroI++; show(); } }, 6500);
  } catch (e) { macro3d = null; }
}

/* ===================== Язык, появление, мобильная плашка ===================== */
const revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
function reveal(els) { els.forEach(el => { if (revealIO) revealIO.observe(el); else el.classList.add('in'); }); }
function heroFree() {
  // ближайшее свободное окно для гель-лака у любого мастера
  const need = TECH.gel.min, ds = days14(), gel = MASTERS.filter(m => m.techs.includes('gel'));
  const today = gel.reduce((a, m) => a + (freeStarts(m, ds[0], need) || []).length, 0);
  let next = null;
  for (let i = today ? 0 : 1; i < ds.length && !next; i++) {
    const st = gel.map(m => (freeStarts(m, ds[i], need) || [])[0]).filter(x => x !== undefined);
    if (st.length) next = [i, Math.min(...st)];
  }
  $('#heroFreeT').textContent = today ? t('badge.t') : t('badge.t0');
  $('#heroFree').textContent = today ? t('badge.n', today) : next ? t('badge.next', next[0] === 1 ? t('tomorrow').toLowerCase() : ds[next[0]].toLocaleDateString(LOCALE[lang], { weekday: 'long', day: 'numeric' }), hm(next[1])) : '';
}
const mbar = $('#mbar');
const vis = new Set();
function renderMbar() {
  const q = quote();
  $('#mPrice').textContent = q.items.length ? priceText(q) : '';
  $('#mTime').textContent = q.items.length ? `${q.items[0][0]} · ${dur(q.min)}` : '';
  mbar.classList.toggle('on', !!B.work && !vis.has('book') && !vis.has('hero'));
}
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) vis.add(e.target.id); else vis.delete(e.target.id); }); renderMbar(); }, { threshold: .05 });
  io.observe($('#hero')); io.observe($('#book'));
}
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i]').forEach(el => { const v = T[lang][el.dataset.i]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-i-ph]').forEach(el => el.setAttribute('placeholder', T[lang][el.dataset.iPh]));
  $('#interQ').innerHTML = t('inter.q').split(' ').map((x, i) => `<span class="w" style="transition-delay:${i * .09}s">${x}</span>`).join(' ');
  $('#heroTitle').innerHTML = t('hero.title').split('|').map(x => `<span class="ln"><span>${x}</span></span>`).join('');
  $('#sceneName').textContent = L(LOOKS[heroI % LOOKS.length]);
  if (macro3d) $('#macroName').textContent = L(LOOKS[macroI % LOOKS.length]);
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  renderWorks(); renderPrices(); renderMasters(); renderBooking(); renderContact(); renderMine(); heroFree(); renderMbar();
}
$$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('nc-lang', lang); applyLang(); }));

applyLang();
reveal($$('.reveal'));
reveal([$('#interlude')]);
const fromHash = () => { const m = location.hash.match(/^#work\/([\w-]+)/); if (m && workById(m[1]) && !$('#workDlg').open) openWork(m[1], true); };
fromHash(); addEventListener('hashchange', fromHash);
if (window.Nail3D) initHero(); else addEventListener('nail3d', initHero, { once: true });
requestAnimationFrame(() => requestAnimationFrame(() => $('#hero').classList.add('open')));
// шапка темнеет после первого экрана; заголовок героя уезжает при прокрутке
const topBar = $('#top'), heroCopy = $('.hero-copy');
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    topBar.classList.toggle('solid', scrollY > innerHeight * .6);
    if (hero3d && scrollY < innerHeight * 1.2) hero3d.scroll(Math.min(1, scrollY / innerHeight));
    if (scrollY < innerHeight * 1.2) { const k = Math.min(1, scrollY / innerHeight); heroCopy.style.transform = `translateY(${-k * 90}px)`; heroCopy.style.opacity = String(1 - k * 1.1); }
  });
}, { passive: true });
})();
