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

/* Форма — без доплаты; длина: для наращивания длинные +8 € */
window.SHAPES = ['square', 'oval', 'almond', 'coffin', 'stiletto'];
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

/* Палитра салона — своя коллекция оттенков (названия можно менять) */
window.COLORS = [
  { hex: '#F3DDD4', name: 'Nácar' },        { hex: '#EBC7BA', name: 'Arena' },        { hex: '#E2B3A3', name: 'Melocotón' },
  { hex: '#D9A08E', name: 'Canela' },       { hex: '#C98A7C', name: 'Rosa viejo' },   { hex: '#B5735F', name: 'Caramelo' },
  { hex: '#F7F3EE', name: 'Leche' },        { hex: '#FFFFFF', name: 'Blanco' },       { hex: '#E8DDF0', name: 'Lavanda' },
  { hex: '#F4B6C2', name: 'Flamenco' },     { hex: '#EE8FA4', name: 'Chicle' },       { hex: '#E5677F', name: 'Fresa' },
  { hex: '#FF7F6B', name: 'Coral' },        { hex: '#F25C47', name: 'Atardecer' },    { hex: '#D7263D', name: 'Rojo Málaga' },
  { hex: '#A4161A', name: 'Cereza' },       { hex: '#6D1A36', name: 'Burdeos' },      { hex: '#4A1730', name: 'Vino' },
  { hex: '#8E5A3C', name: 'Moca' },         { hex: '#5A3A2E', name: 'Chocolate' },    { hex: '#2B1D24', name: 'Noche' },
  { hex: '#0F0F12', name: 'Negro' },        { hex: '#2F4B7C', name: 'Marino' },       { hex: '#3F7CAC', name: 'Mediterráneo' },
  { hex: '#8FC1D4', name: 'Cielo' },        { hex: '#1E6F5C', name: 'Esmeralda' },    { hex: '#88A47C', name: 'Oliva' },
  { hex: '#C9D8B6', name: 'Pistacho' },     { hex: '#F2C14E', name: 'Mimosa' },       { hex: '#C9A227', name: 'Oro' }
];

/* Тона кожи для примерки */
window.SKINS = ['#F6D7C3', '#E9BC9C', '#C98F6A', '#9A6343', '#5E3A27'];

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
   photo — файл в img/works/ (WebP, вертикальное 4:5); pos — какую часть фото показывать в превью (необязательно). price — итоговая цена, €; min — время, минуты.
   tech — техника (classic / gel / extensions): по ней подбираются мастера, которые это делают.
   ВНИМАНИЕ: фото сейчас временные (StockSnap, CC0) — у салона будут фото своих работ. */
window.WORKS = [
  { id: 'milk', photo: 'milk', tech: 'gel', price: 35, min: 75, master: 'lucia',
    es: 'Blanco leche', en: 'Milky white', ru: 'Молочный однотон',
    nes: 'Semipermanente liso, forma oval, uña natural.', nen: 'Plain gel polish, oval shape, natural nails.', nru: 'Гель-лак в один цвет, форма овал, свои ногти.' },
  { id: 'wine', photo: 'wine', pos: '50% 90%', tech: 'gel', price: 35, min: 75, master: 'elena',
    es: 'Burdeos corto', en: 'Short burgundy', ru: 'Короткое бордо',
    nes: 'Semipermanente burdeos, uñas cortas cuadradas suaves.', nen: 'Burgundy gel polish, short soft-square nails.', nru: 'Гель-лак бордо, короткие ногти, мягкий квадрат.' },
  { id: 'cherry', photo: 'cherry', tech: 'gel', price: 40, min: 90, master: 'amara',
    es: 'Cereza con brillo', en: 'Cherry with sparkle', ru: 'Вишня с блеском',
    nes: 'Semipermanente cereza con acabado brillante y destellos.', nen: 'Cherry gel polish with a glossy, sparkly finish.', nru: 'Вишнёвый гель-лак, глянец с лёгким сиянием.' },
  { id: 'fuchsia', photo: 'fuchsia', tech: 'classic', price: 22, min: 45, master: 'elena',
    es: 'Fucsia clásico', en: 'Classic fuchsia', ru: 'Фуксия, обычный лак',
    nes: 'Esmalte clásico, se seca en 15 minutos. Ideal para una ocasión.', nen: 'Classic polish, dries in 15 minutes. Perfect for one event.', nru: 'Обычный лак, сохнет 15 минут. Хорошо «на один выход».' },
  { id: 'plum', photo: 'plum', tech: 'gel', price: 38, min: 80, master: 'lucia',
    es: 'Ciruela almendra', en: 'Plum almond', ru: 'Слива, миндаль',
    nes: 'Semipermanente ciruela, forma almendra, uña natural.', nen: 'Plum gel polish, almond shape, natural nails.', nru: 'Гель-лак сливового цвета, форма миндаль, свои ногти.' }
];

/* «Не знаю — пусть решит мастер»: цена «от», время закладываем с запасом */
window.ADVICE = { price: 30, min: 90 };

/* Галерея «Хочу так же»: готовые дизайны (открываются в конфигураторе).
   nails — по одному на палец: [большой, указательный, средний, безымянный, мизинец] */
window.LOOKS = [
  { id: 'nude-french', es: 'Nude con francesa', en: 'Nude French', ru: 'Нюд с френчем',
    tech: 'gel', shape: 'almond', length: 'medium', finish: 'gloss', nails: Array(5).fill({ c: '#F3DDD4', d: 'french', t: '#FFFFFF' }) },
  { id: 'red-classic', es: 'Rojo Málaga', en: 'Málaga red', ru: 'Красный «Малага»',
    tech: 'gel', shape: 'oval', length: 'short', finish: 'gloss', nails: Array(5).fill({ c: '#D7263D', d: 'none' }) },
  { id: 'pearl-chrome', es: 'Perla cromada', en: 'Pearl chrome', ru: 'Жемчужный хром',
    tech: 'extensions', shape: 'almond', length: 'long', finish: 'chrome', nails: Array(5).fill({ c: '#F7F3EE', d: 'none' }) },
  { id: 'emerald-cat', es: 'Ojo de gato esmeralda', en: 'Emerald cat-eye', ru: 'Кошачий глаз «изумруд»',
    tech: 'gel', shape: 'square', length: 'short', finish: 'cateye', nails: Array(5).fill({ c: '#1E6F5C', d: 'none' }) },
  { id: 'peach-ombre', es: 'Degradado melocotón', en: 'Peach ombré', ru: 'Омбре «персик»',
    tech: 'extensions', shape: 'coffin', length: 'medium', finish: 'gloss', nails: Array(5).fill({ c: '#FF7F6B', d: 'ombre' }) },
  { id: 'burgundy-matte', es: 'Burdeos mate', en: 'Matte burgundy', ru: 'Матовое бордо',
    tech: 'gel', shape: 'almond', length: 'medium', finish: 'matte', nails: Array(5).fill({ c: '#6D1A36', d: 'none' }) },
  { id: 'coral-accent', es: 'Coral con brillo', en: 'Coral with sparkle', ru: 'Коралл с блёстками',
    tech: 'gel', shape: 'oval', length: 'short', finish: 'gloss',
    nails: [{ c: '#FF7F6B', d: 'none' }, { c: '#FF7F6B', d: 'none' }, { c: '#FF7F6B', d: 'none' }, { c: '#C9A227', d: 'glitter' }, { c: '#FF7F6B', d: 'none' }] },
  { id: 'mocha-coffin', es: 'Moca', en: 'Mocha', ru: 'Мокко',
    tech: 'extensions', shape: 'coffin', length: 'long', finish: 'gloss', nails: Array(5).fill({ c: '#8E5A3C', d: 'none' }) },
  { id: 'milk-stiletto', es: 'Leche stiletto', en: 'Milky stiletto', ru: 'Молочный стилет',
    tech: 'extensions', shape: 'stiletto', length: 'long', finish: 'gloss',
    nails: [{ c: '#F7F3EE', d: 'none' }, { c: '#F7F3EE', d: 'none' }, { c: '#F7F3EE', d: 'none' }, { c: '#F7F3EE', d: 'glitter' }, { c: '#F7F3EE', d: 'none' }] }
];
