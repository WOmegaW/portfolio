/* ============================================================
   ДАННЫЕ САЙТА — этот файл меняет владелец агентства.
   Дизайн и логика лежат в index.html и app.js, их трогать не нужно.

   Как добавить виллу: скопировать блок { id: ... } целиком,
   поменять id (латиницей, без пробелов), цифры, фото и тексты.
   Фото кладутся в папку img/ в двух размерах: имя-800.webp и имя-1600.webp,
   а в gallery пишется только имя (без -800/-1600 и .webp).
   ============================================================ */

window.SITE = {
  brand: 'Vertiente',
  phone: '+34 000 000 000',          // показывается в подвале (демо)
  whatsapp: '34000000000',            // номер для WhatsApp без «+» и пробелов (демо)
  email: 'hola@vertiente.example',
  address: 'Avenida del Mar 14, Marbella',
  demo: true                          // true — форма заявки ничего не отправляет
};

/* Районы: время на машине из аэропорта Малаги (минуты) */
window.AREAS = {
  marbella:  { airport: 40 },
  benahavis: { airport: 50 },
  estepona:  { airport: 55 },
  mijas:     { airport: 25 }
};

/* Виллы. Поля:
   price — цена в евро; beds/baths — спальни/ванные; built/plot — м² дома/участка;
   sun — солнце на террасе летом [час, мин, час, мин]; face — куда смотрит терраса (s, sw, w, se);
   sea — вид на море; newBuild — новостройка; beach — минут до пляжа; year — год постройки;
   energy — энергосертификат (A–G); ref — номер объекта в агентстве;
   lat/lng — координаты виллы на карте (широта/долгота, можно взять из Google Maps). */
window.VILLAS = [
  { id: 'horizonte', ref: 'VT-1101', area: 'marbella', lat: 36.515, lng: -4.915, gallery: ['hero', 'in-living-8', 'in-kitchen-2', 'in-bed-2', 'in-bath-3'],
    price: 8900000, beds: 6, baths: 7, built: 820, plot: 3100, sun: [9, 0, 21, 25], face: 's', sea: true, newBuild: false, beach: 6, year: 2019, energy: 'A',
    ru: { name: 'Вилла Горизонте', where: 'Золотая миля, Марбелья', desc: 'Флагман нашего каталога. Терраса под деревянным навесом во всю ширину дома, бассейн с подсветкой и сад с пальмами. Шесть спален с ванными, кинозал, винный погреб и квартира для персонала.' },
    es: { name: 'Villa Horizonte', where: 'Milla de Oro, Marbella', desc: 'La joya de nuestro catálogo. Terraza bajo pérgola de madera a lo ancho de la casa, piscina iluminada y jardín con palmeras. Seis dormitorios en suite, sala de cine, bodega y apartamento de servicio.' },
    en: { name: 'Villa Horizonte', where: 'Golden Mile, Marbella', desc: 'The flagship of our portfolio. A terrace under a timber canopy across the full width of the house, a lit pool and a palm garden. Six en-suite bedrooms, cinema, wine cellar and staff apartment.' } },

  { id: 'mirador', ref: 'VT-1088', area: 'marbella', lat: 36.53, lng: -4.89, gallery: ['mirador', 'mirador-in', 'in-living-9', 'in-bed-4', 'sea'],
    price: 6400000, beds: 5, baths: 6, built: 610, plot: 2300, sun: [9, 30, 21, 20], face: 'sw', sea: true, newBuild: false, beach: 12, year: 2018, energy: 'B',
    ru: { name: 'Вилла Мирадор', where: 'Сьерра-Бланка, Марбелья', desc: 'Три уровня над морем, стеклянные стены в гостиной и бассейн-инфинити, который на закате сливается с горизонтом. В ясный день видно Гибралтар и горы Марокко.' },
    es: { name: 'Villa Mirador', where: 'Sierra Blanca, Marbella', desc: 'Tres niveles sobre el mar, salón con paredes de cristal y piscina infinita que al atardecer se funde con el horizonte. En días claros se ven Gibraltar y las montañas de Marruecos.' },
    en: { name: 'Villa Mirador', where: 'Sierra Blanca, Marbella', desc: 'Three levels above the sea, a glass-walled living room and an infinity pool that merges with the horizon at sunset. On clear days you can see Gibraltar and the mountains of Morocco.' } },

  { id: 'blanca', ref: 'VT-1124', area: 'marbella', lat: 36.512, lng: -4.825, gallery: ['blanca', 'blanca-2', 'in-living-10', 'in-kitchen-3', 'in-bath-4'],
    price: 4750000, beds: 5, baths: 5, built: 520, plot: 1400, sun: [8, 40, 20, 55], face: 's', sea: true, newBuild: true, beach: 4, year: 2025, energy: 'A',
    ru: { name: 'Вилла Бланка', where: 'Лос-Монтерос, Марбелья', desc: 'Новый дом 2025 года: белый камень, большой бассейн с пляжной зоной и летняя гостиная под навесом. Четыре минуты пешком до моря, умный дом, аэротермия и солнечные панели.' },
    es: { name: 'Villa Blanca', where: 'Los Monteros, Marbella', desc: 'Obra nueva de 2025: piedra blanca, gran piscina con zona de playa y salón de verano bajo porche. A cuatro minutos a pie del mar, domótica, aerotermia y placas solares.' },
    en: { name: 'Villa Blanca', where: 'Los Monteros, Marbella', desc: 'A 2025 new build in white stone, with a large pool with a beach entry and a covered summer lounge. Four minutes on foot to the sea, smart home, heat pump and solar panels.' } },

  { id: 'alba', ref: 'VT-1042', area: 'benahavis', lat: 36.52, lng: -5.045, gallery: ['alba', 'alba-in', 'in-living-5', 'in-bed-3', 'in-bath-2'],
    price: 3950000, beds: 4, baths: 4, built: 412, plot: 1850, sun: [8, 45, 21, 5], face: 's', sea: true, newBuild: false, beach: 18, year: 2012, energy: 'C',
    ru: { name: 'Каса Альба', where: 'Бенаавис', desc: 'Белый кубический дом среди сосен в духе андалусских деревень. Внутренний двор с оливой, гостиная с деревянными балками, кабинет с отдельным входом и гостевой дом у бассейна.' },
    es: { name: 'Casa Alba', where: 'Benahavís', desc: 'Casa blanca de volúmenes puros entre pinos, al estilo de los pueblos andaluces. Patio con olivo, salón con vigas de madera, despacho con entrada propia y casa de invitados junto a la piscina.' },
    en: { name: 'Casa Alba', where: 'Benahavís', desc: 'A white cubic house among pines in the spirit of Andalusian villages. Courtyard with an olive tree, a living room with timber beams, a study with its own entrance and a guest house by the pool.' } },

  { id: 'sierra', ref: 'VT-1067', area: 'benahavis', lat: 36.54, lng: -5.02, gallery: ['sierra', 'in-living-1', 'in-dining-1', 'in-bed-1', 'in-bath-1'],
    price: 3450000, beds: 4, baths: 4, built: 395, plot: 2100, sun: [9, 50, 21, 30], face: 'sw', sea: true, newBuild: false, beach: 15, year: 2016, energy: 'C',
    ru: { name: 'Вилла Сьерра', where: 'Ла-Херрадура, Бенаавис', desc: 'Дом из дерева и камня на склоне: вечером окна светятся, как фонарь над долиной. Панорамная гостиная, столовая на двенадцать человек и тихая спальня с видом на горы.' },
    es: { name: 'Villa Sierra', where: 'La Herradura, Benahavís', desc: 'Casa de madera y piedra en la ladera: por la noche sus ventanas brillan como un farol sobre el valle. Salón panorámico, comedor para doce personas y un dormitorio tranquilo con vistas a la sierra.' },
    en: { name: 'Villa Sierra', where: 'La Herradura, Benahavís', desc: 'A house of timber and stone on the hillside: at night its windows glow like a lantern over the valley. A panoramic living room, dining for twelve and a quiet bedroom facing the mountains.' } },

  { id: 'lindero', ref: 'VT-1075', area: 'estepona', lat: 36.462, lng: -5.07, gallery: ['lindero', 'in-living-7', 'in-kitchen-1', 'in-bed-2', 'sea'],
    price: 3200000, beds: 5, baths: 5, built: 480, plot: 1600, sun: [10, 0, 21, 30], face: 'w', sea: true, newBuild: false, beach: 5, year: 2021, energy: 'B',
    ru: { name: 'Вилла Линдеро', where: 'Новая Золотая миля, Эстепона', desc: 'Пять минут пешком до пляжа. Терраса смотрит на запад: солнце уходит в море прямо напротив бассейна. Светлая гостиная открывается в сад, кухня с островом.' },
    es: { name: 'Villa Lindero', where: 'Nueva Milla de Oro, Estepona', desc: 'A cinco minutos a pie de la playa. La terraza mira al oeste: el sol se pone en el mar justo frente a la piscina. Salón luminoso abierto al jardín y cocina con isla.' },
    en: { name: 'Villa Lindero', where: 'New Golden Mile, Estepona', desc: 'Five minutes on foot to the beach. The terrace faces west: the sun sets into the sea right across the pool. A bright living room opening onto the garden and a kitchen with an island.' } },

  { id: 'azul', ref: 'VT-1112', area: 'marbella', lat: 36.525, lng: -4.855, gallery: ['azul', 'in-living-3', 'in-dining-2', 'in-bed-4', 'in-bath-1'],
    price: 2980000, beds: 4, baths: 4, built: 340, plot: 900, sun: [8, 20, 20, 40], face: 'se', sea: false, newBuild: false, beach: 8, year: 2020, energy: 'B',
    ru: { name: 'Вилла Асуль', where: 'Рио-Реаль, Марбелья', desc: 'Современный дом с бассейном вдоль всей гостиной: раздвижные стены убираются, и дом становится террасой. Утром солнце на кухне, днём тень у воды.' },
    es: { name: 'Villa Azul', where: 'Río Real, Marbella', desc: 'Casa contemporánea con la piscina a lo largo de todo el salón: las paredes correderas se abren y la casa se convierte en terraza. Sol de mañana en la cocina y sombra junto al agua a mediodía.' },
    en: { name: 'Villa Azul', where: 'Río Real, Marbella', desc: 'A contemporary house with the pool running the length of the living room: the sliding walls open and the house becomes a terrace. Morning sun in the kitchen, shade by the water at midday.' } },

  { id: 'patio', ref: 'VT-1031', area: 'marbella', lat: 36.5, lng: -4.96, gallery: ['patio', 'in-living-12', 'in-kitchen-2', 'in-bed-1', 'in-bath-4'],
    price: 2750000, beds: 4, baths: 4, built: 360, plot: 1200, sun: [8, 30, 20, 15], face: 's', sea: false, newBuild: false, beach: 10, year: 2009, energy: 'D',
    ru: { name: 'Каса Патио', where: 'Нуэва-Андалусия, Марбелья', desc: 'Одноэтажный дом вокруг бассейна: каждая комната открывается на воду. Летняя кухня под навесом и гольф в пяти минутах.' },
    es: { name: 'Casa Patio', where: 'Nueva Andalucía, Marbella', desc: 'Casa de una planta alrededor de la piscina: cada estancia se abre al agua. Cocina de verano bajo pérgola y golf a cinco minutos.' },
    en: { name: 'Casa Patio', where: 'Nueva Andalucía, Marbella', desc: 'A single-storey house around the pool: every room opens onto the water. Summer kitchen under a pergola, golf five minutes away.' } },

  { id: 'cubo', ref: 'VT-1130', area: 'estepona', lat: 36.45, lng: -5.12, gallery: ['cubo', 'in-living-2', 'in-kitchen-3', 'in-bed-3', 'in-bath-3'],
    price: 2350000, beds: 4, baths: 3, built: 310, plot: 820, sun: [9, 0, 21, 0], face: 'sw', sea: false, newBuild: true, beach: 7, year: 2025, energy: 'A',
    ru: { name: 'Каса Кубо', where: 'Эль-Пресидио, Эстепона', desc: 'Новостройка 2025 года: белый объём с тёплым деревом, гараж на две машины, солярий на крыше. Готова к заселению, мебель по желанию покупателя.' },
    es: { name: 'Casa Cubo', where: 'El Presidio, Estepona', desc: 'Obra nueva de 2025: volumen blanco con madera cálida, garaje para dos coches y solárium en la cubierta. Lista para entrar a vivir, amueblada a elección del comprador.' },
    en: { name: 'Casa Cubo', where: 'El Presidio, Estepona', desc: 'A 2025 new build: a white volume with warm timber, a double garage and a rooftop solarium. Ready to move in, furnished to the buyer’s choice.' } },

  { id: 'faro', ref: 'VT-1097', area: 'estepona', lat: 36.43, lng: -5.16, gallery: ['faro', 'in-living-4', 'in-dining-1', 'in-bed-2', 'sea'],
    price: 1890000, beds: 4, baths: 3, built: 298, plot: 920, sun: [9, 15, 21, 10], face: 'sw', sea: true, newBuild: true, beach: 6, year: 2024, energy: 'A',
    ru: { name: 'Каса-дель-Фаро', where: 'Эль-Падрон, Эстепона', desc: 'Новый дом 2024 года с солярием на крыше. Видно маяк Эстепоны и порт, до старого города десять минут.' },
    es: { name: 'Casa del Faro', where: 'El Padrón, Estepona', desc: 'Obra nueva de 2024 con solárium en la cubierta. Vistas al faro y al puerto de Estepona, a diez minutos del casco antiguo.' },
    en: { name: 'Casa del Faro', where: 'El Padrón, Estepona', desc: 'New build from 2024 with a rooftop solarium. Views of the Estepona lighthouse and harbour, ten minutes from the old town.' } },

  { id: 'pinar', ref: 'VT-1058', area: 'benahavis', lat: 36.53, lng: -5.0, gallery: ['pinar', 'in-living-6', 'in-kitchen-1', 'in-bed-3', 'in-bath-2'],
    price: 1750000, beds: 3, baths: 3, built: 280, plot: 2400, sun: [7, 40, 20, 10], face: 'se', sea: false, newBuild: false, beach: 20, year: 2014, energy: 'C',
    ru: { name: 'Вилла Пинар', where: 'Эль-Мадроньяль, Бенаавис', desc: 'Дом построен вокруг старого эвкалипта: дерево даёт тень всей террасе. Большой участок, тишина, утреннее солнце в гостиной. Для тех, кто работает из дома.' },
    es: { name: 'Villa Pinar', where: 'El Madroñal, Benahavís', desc: 'La casa se construyó alrededor de un viejo eucalipto que da sombra a toda la terraza. Parcela grande, silencio y sol de mañana en el salón. Ideal para trabajar desde casa.' },
    en: { name: 'Villa Pinar', where: 'El Madroñal, Benahavís', desc: 'The house was built around an old eucalyptus that shades the whole terrace. A large plot, silence and morning sun in the living room. Made for working from home.' } },

  { id: 'cala', ref: 'VT-1103', area: 'mijas', lat: 36.51, lng: -4.68, gallery: ['cala', 'in-living-11', 'in-dining-2', 'in-bed-4', 'resort'],
    price: 2150000, beds: 3, baths: 3, built: 260, plot: 700, sun: [8, 10, 21, 15], face: 's', sea: true, newBuild: false, beach: 2, year: 2017, energy: 'B',
    ru: { name: 'Каса Кала', where: 'Ла-Кала-де-Михас', desc: 'Две минуты до пляжа. Деревянная палуба с шезлонгами и бассейн, за которым сразу море. Рестораны и набережная Ла-Калы в пешей доступности.' },
    es: { name: 'Casa Cala', where: 'La Cala de Mijas', desc: 'A dos minutos de la playa. Cubierta de madera con tumbonas y una piscina con el mar justo detrás. Restaurantes y paseo marítimo de La Cala a pie.' },
    en: { name: 'Casa Cala', where: 'La Cala de Mijas', desc: 'Two minutes to the beach. A timber deck with loungers and a pool with the sea right behind it. La Cala’s restaurants and promenade within walking distance.' } },

  { id: 'ocaso', ref: 'VT-1127', area: 'mijas', lat: 36.505, lng: -4.72, gallery: ['ocaso', 'in-living-3', 'in-kitchen-2', 'in-bed-1', 'in-bath-1'],
    price: 1690000, beds: 4, baths: 3, built: 270, plot: 850, sun: [9, 40, 21, 25], face: 'w', sea: true, newBuild: true, beach: 9, year: 2025, energy: 'A',
    ru: { name: 'Вилла Окасо', where: 'Ривьера-дель-Соль, Михас', desc: 'Тёмный фасад и высокие окна: вечером дом светится изнутри. Новостройка 2025 года, терраса на запад и сад, готовый к первому лету.' },
    es: { name: 'Villa Ocaso', where: 'Riviera del Sol, Mijas', desc: 'Fachada oscura y ventanales altos: al anochecer la casa brilla desde dentro. Obra nueva de 2025, terraza orientada al oeste y jardín listo para el primer verano.' },
    en: { name: 'Villa Ocaso', where: 'Riviera del Sol, Mijas', desc: 'A dark façade and tall windows: at dusk the house glows from within. A 2025 new build with a west-facing terrace and a garden ready for its first summer.' } },

  { id: 'brisa', ref: 'VT-1015', area: 'mijas', lat: 36.512, lng: -4.755, gallery: ['brisa', 'in-living-11', 'in-kitchen-1', 'in-bed-3', 'in-bath-4'],
    price: 1450000, beds: 3, baths: 3, built: 245, plot: 780, sun: [7, 50, 19, 40], face: 'se', sea: true, newBuild: false, beach: 8, year: 2011, energy: 'D',
    ru: { name: 'Вилла Бриса', where: 'Каласонда, Михас-Коста', desc: 'Компактная вилла с садом и бассейном. Утреннее солнце на кухне, вечером терраса в тени, это удобно жарким летом.' },
    es: { name: 'Villa Brisa', where: 'Calahonda, Mijas Costa', desc: 'Villa compacta con jardín y piscina. Sol de mañana en la cocina y terraza en sombra por la tarde, cómoda en pleno verano.' },
    en: { name: 'Villa Brisa', where: 'Calahonda, Mijas Costa', desc: 'A compact villa with garden and pool. Morning sun in the kitchen and a shaded terrace in the evening, easy living in high summer.' } }
];
