/* ============================================================
   ДАННЫЕ САЛОНА — этот файл меняет владелец.
   Цены в евро, время в минутах. Тексты — на трёх языках (es, en, ru).
   ============================================================ */

window.SITE = {
  brand: 'Nácar',
  tagline: 'Nail Studio · Marbella',
  phone: '+34 000 000 000',              // демо
  whatsapp: '34000000000',                // без «+» и пробелов (демо)
  email: 'hola@nacar.example',
  address: 'Calle Ricardo Soriano 00, Marbella',
  lat: 36.5102, lng: -4.8852,             // точка на карте
  hours: { weekdays: [10, 20], saturday: [10, 15] },   // воскресенье — выходной
  deposit: 10,                            // предоплата при записи, €
  lateMinutes: 15,                        // опоздание больше этого — запись отменяется
  web3formsKey: ''                        // ключ web3forms.com — заявки на почту; пусто — демо
};

/* Техника — основа цены */
window.TECH = {
  classic:    { price: 20, min: 40,  es: 'Esmalte clásico',     en: 'Classic polish',   ru: 'Обычный лак' },
  gel:        { price: 30, min: 60,  es: 'Semipermanente',      en: 'Gel polish',       ru: 'Гель-лак' },
  extensions: { price: 45, min: 105, es: 'Uñas de gel (extensión)', en: 'Gel extensions', ru: 'Наращивание гелем' }
};

/* Длина: для наращивания длинные +8 € */
window.LENGTHS = { short: { price: 0, min: 0 }, medium: { price: 0, min: 0 }, long: { price: 8, min: 15 } };

/* Покрытие */
window.FINISHES = {
  gloss:  { price: 0, min: 0 },
  matte:  { price: 3, min: 0 },
  chrome: { price: 8, min: 10 },
  cateye: { price: 6, min: 10 }
};

/* Дизайн на ноготь (цена за один ноготь; рука повторяется на второй руке) */
window.DESIGNS = {
  none:    { price: 0, min: 0 },
  french:  { price: 2, min: 3 },
  glitter: { price: 1, min: 2 },
  ombre:   { price: 2, min: 4 }
};

/* Дополнительно */
window.EXTRAS = {
  removal:  { price: 8,  min: 15, es: 'Retirada de esmalte anterior', en: 'Removal of old coating', ru: 'Снятие старого покрытия' },
  pedicure: { price: 35, min: 50, es: 'Pedicura spa', en: 'Spa pedicure', ru: 'Спа-педикюр' }
};

/* Мастера: у кого какие дни (0 — вс … 6 — сб) и что умеют */
window.MASTERS = [
  { id: 'lucia', photo: 'master-1', name: 'Lucía', days: [1, 2, 3, 4, 5, 6], techs: ['classic', 'gel', 'extensions'],
    es: 'Nail art y francesas finas', en: 'Nail art and fine French', ru: 'Нейл-арт и тонкий френч' },
  { id: 'amara', photo: 'master-2', name: 'Amara', days: [2, 3, 4, 5, 6], techs: ['gel', 'extensions'],
    es: 'Extensiones y formas almendra', en: 'Extensions and almond shapes', ru: 'Наращивание и миндаль' },
  { id: 'elena', photo: 'master-3', name: 'Elena', days: [1, 2, 3, 5, 6], techs: ['classic', 'gel'],
    es: 'Manicura rusa y spa', en: 'Russian manicure and spa', ru: 'Аппаратный маникюр и спа' }
];

/* ГАЛЕРЕЯ РАБОТ С ЦЕНАМИ — главное на сайте.
   Клиентка выбирает работу → видит цену и время → записывается.
   photo — файлы в img/works/: <photo>.webp (800 px) и <photo>-l.webp (1600 px). pos — какую часть фото показывать в превью.
   price — итоговая цена, €; min — время, минуты. tech — техника (classic / gel / extensions): по ней подбираются мастера.
   Фото — Unsplash (бесплатная лицензия). У салона здесь будут фото его работ. */
window.WORKS = [
  { id: 'lilac', photo: 'lilac', tech: 'gel', price: 42, min: 90, master: 'lucia',
    es: 'Lavanda y brillo', en: 'Lavender & sparkle', ru: 'Лаванда и блеск',
    nes: 'Semipermanente en tres tonos: lavanda, blanco y un acento con purpurina plata.', nen: 'Gel polish in three shades: lavender, white and a silver glitter accent.', nru: 'Гель-лак в трёх оттенках: лаванда, белый и акцентный ноготь с серебряными блёстками.' },
  { id: 'love', photo: 'love', tech: 'extensions', price: 62, min: 135, master: 'amara', pos: '50% 60%',
    es: 'Rojo «love»', en: 'Red “love”', ru: 'Красный «love»',
    nes: 'Extensión en almendra, francesa roja y rotulado a mano en dos uñas.', nen: 'Almond extensions, red French and hand lettering on two nails.', nru: 'Наращивание, миндаль, красный френч и надпись от руки на двух ногтях.' },
  { id: 'abstract', photo: 'abstract', tech: 'gel', price: 55, min: 120, master: 'lucia', pos: '50% 45%',
    es: 'Abstracción de color', en: 'Colour abstraction', ru: 'Цветная абстракция',
    nes: 'Pintura a mano: manchas de color sobre base nude, forma oval.', nen: 'Hand-painted colour blocks on a nude base, oval shape.', nru: 'Роспись от руки: цветные пятна на нюдовой базе, форма овал.' },
  { id: 'blush', photo: 'blush', tech: 'gel', price: 38, min: 80, master: 'elena', pos: '50% 35%',
    es: 'Rosa lechoso', en: 'Milky pink', ru: 'Молочно-розовый',
    nes: 'Semipermanente rosa lechoso, almendra corta, uña natural.', nen: 'Milky pink gel polish, short almond, natural nails.', nru: 'Молочно-розовый гель-лак, короткий миндаль, свои ногти.' },
  { id: 'mocha', photo: 'mocha', tech: 'gel', price: 48, min: 105, master: 'amara', pos: '60% 55%',
    es: 'Carey y negro', en: 'Tortoiseshell & black', ru: 'Черепаха и чёрный',
    nes: 'Efecto carey, negro brillante y una uña con hilo dorado.', nen: 'Tortoiseshell effect, glossy black and one nail with a gold line.', nru: 'Эффект черепахи, чёрный глянец и ноготь с золотой линией.' },
  { id: 'rose', photo: 'rose', tech: 'extensions', price: 55, min: 120, master: 'amara', pos: '50% 40%',
    es: 'Nude rosado', en: 'Rosy nude', ru: 'Розовый нюд',
    nes: 'Extensión en almendra larga, tono nude rosado.', nen: 'Long almond extensions in a rosy nude shade.', nru: 'Наращивание, длинный миндаль, розово-нюдовый оттенок.' },
  { id: 'noir', photo: 'noir', tech: 'gel', price: 50, min: 110, master: 'lucia', pos: '55% 45%',
    es: 'Negro y oro', en: 'Black & gold', ru: 'Чёрное золото',
    nes: 'Negro brillante, cromo dorado y una uña con línea fina.', nen: 'Glossy black, gold chrome and one nail with a fine line.', nru: 'Чёрный глянец, золотой хром и ноготь с тонкой линией.' },
  { id: 'nude', photo: 'nude', tech: 'gel', price: 32, min: 70, master: 'elena', pos: '45% 50%',
    es: 'Nude natural', en: 'Natural nude', ru: 'Естественный нюд',
    nes: 'Manicura rusa y semipermanente transparente rosado: uñas cuidadas sin «efecto laca».', nen: 'Russian manicure and sheer pink gel: groomed nails without a “polished” look.', nru: 'Аппаратный маникюр и прозрачно-розовый гель-лак: ухоженные ногти без эффекта «накрашено».' }
];

/* ПЕРВЫЙ ЭКРАН — слайд-шоу. Фото в img/hero/: <img>.webp (2400 px) и <img>-s.webp (1200 px, для телефона).
   type: 'cert' — слайд с сертификатами мастеров (CERTS ниже), фото не нужно. */
window.SLIDES = [
  { img: 'master', pos: '50% 50%', es: 'Lucía, en plena faena', en: 'Lucía at work', ru: 'Lucía за работой' },
  { img: 'nude', pos: '50% 50%', es: 'Natural, como tus uñas', en: 'Natural, like your own nails', ru: 'Естественно — как свои' },
  { type: 'cert', es: 'Formación certificada', en: 'Certified training', ru: 'Подтверждённое обучение' },
  { img: 'process', pos: '50% 40%', es: 'El ritual', en: 'The ritual', ru: 'Ритуал' },
  { img: 'salon', pos: '50% 70%', es: 'Nuestro estudio', en: 'Our studio', ru: 'Наша студия' }
];

/* Сертификаты мастеров (демо: школы вымышленные — у салона будут его настоящие сертификаты, можно фото) */
window.CERTS = [
  { who: 'Lucía', year: 2023, es: 'Nail art y diseño a mano alzada', en: 'Freehand nail art', ru: 'Нейл-арт и роспись', school: 'Escuela Lumbre de Uñas · Madrid' },
  { who: 'Amara', year: 2024, es: 'Extensiones de gel, nivel máster', en: 'Gel extensions, master level', ru: 'Наращивание гелем, мастер-уровень', school: 'Forma & Gel Atelier · Barcelona' },
  { who: 'Elena', year: 2022, es: 'Manicura rusa y esterilización', en: 'Russian manicure & sterilisation', ru: 'Аппаратный маникюр и стерилизация', school: 'Instituto Albahaca · Málaga' }
];

/* «Не знаю — пусть решит мастер»: цена «от», время закладываем с запасом */
window.ADVICE = { price: 30, min: 90 };
