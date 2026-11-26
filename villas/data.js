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

  // Адрес сайта агентства (для страниц вилл, карты сайта и превью ссылок). Без «/» в конце.
  url: 'https://womegaw.github.io/portfolio/villas',

  // Заявки на почту: бесплатный ключ с https://web3forms.com (вводите e-mail — ключ придёт письмом).
  // Пусто — форма демонстрационная и ничего не отправляет.
  web3formsKey: '',

  // Виллы из Google Таблицы: Файл → Поделиться → Опубликовать в интернете → CSV, ссылку — сюда.
  // Пусто — виллы берутся из списка VILLAS ниже. Шаблон таблицы: plantilla-villas.csv
  sheetUrl: '',

  // Юридические данные для страниц Aviso legal / Privacidad / Cookies и подвала
  legal: {
    company: 'Vertiente Real Estate S.L. (empresa ficticia)',
    nif: 'B-00000000',
    registry: 'Registro Mercantil de Málaga, tomo 0000, folio 00, hoja MA-000000',
    raia: 'AT/MA/00000',              // номер в реестре агентов недвижимости Андалусии (RAIA)
    dpoEmail: 'privacidad@vertiente.example'
  },

  // Статистика посещений (необязательно).
  // plausible: домен сайта в Plausible — без cookies, баннер не нужен.
  // gaId: Google Analytics (G-XXXX) — включится только после согласия посетителя в баннере.
  plausible: '',
  gaId: '',

  // Валюты для переключателя в шапке. Курсы сайт берёт у Европейского ЦБ (сервис frankfurter);
  // если он недоступен — использует запасные курсы ниже (сколько единиц валюты за 1 €).
  currencies: ['EUR', 'GBP', 'USD', 'SEK', 'NOK'],
  fallbackRates: { GBP: 0.85, USD: 1.08, SEK: 11.3, NOK: 11.7 }
};

/* Районы (порядок — с запада на восток, так же они идут во вкладках).
   airport — минут на машине из аэропорта Малаги; name/text — название и описание на трёх языках. */
window.AREAS = {
  sotogrande: { airport: 75,
    name: { ru: 'Сотогранде', es: 'Sotogrande', en: 'Sotogrande' },
    text: { ru: 'Яхтенный порт, поло и гольф мирового уровня. Самое закрытое и зелёное место побережья, большие участки у моря.',
            es: 'Puerto deportivo, polo y golf de primer nivel. El rincón más reservado y verde de la costa, con grandes parcelas junto al mar.',
            en: 'A yacht harbour, polo and world-class golf. The most private and green corner of the coast, with large plots by the sea.' } },
  casares: { airport: 60,
    name: { ru: 'Касарес', es: 'Casares', en: 'Casares' },
    text: { ru: 'Белая деревня на скале и тихий берег под ней. Виды на Гибралтар и Африку, цены ниже, чем в Марбелье.',
            es: 'Un pueblo blanco sobre la roca y una costa tranquila a sus pies. Vistas a Gibraltar y África, precios por debajo de Marbella.',
            en: 'A white village on the rock and a quiet coast below it. Views of Gibraltar and Africa, prices below Marbella.' } },
  estepona: { airport: 55,
    name: { ru: 'Эстепона', es: 'Estepona', en: 'Estepona' },
    text: { ru: 'Белый старый город и новая набережная. Самые длинные закаты: побережье здесь смотрит на запад.',
            es: 'Casco antiguo blanco y paseo marítimo nuevo. Los atardeceres más largos: la costa mira al oeste.',
            en: 'A white old town and a new seafront. The longest sunsets: the coast here faces west.' } },
  benahavis: { airport: 50,
    name: { ru: 'Бенаавис', es: 'Benahavís', en: 'Benahavís' },
    text: { ru: 'Тихая деревня в горах над Марбельей. Большие участки, сосны, гольф-поля.',
            es: 'Pueblo tranquilo en la montaña sobre Marbella. Parcelas grandes, pinos y campos de golf.',
            en: 'A quiet mountain village above Marbella. Large plots, pine trees and golf courses.' } },
  nuevaandalucia: { airport: 45,
    name: { ru: 'Нуэва-Андалусия', es: 'Nueva Andalucía', en: 'Nueva Andalucía' },
    text: { ru: '«Долина гольфа» над Пуэрто-Банусом: шесть полей, рестораны и яхты в пяти минутах. Любимый район семей.',
            es: 'El «valle del golf» sobre Puerto Banús: seis campos, restaurantes y yates a cinco minutos. El barrio favorito de las familias.',
            en: 'The “golf valley” above Puerto Banús: six courses, with restaurants and yachts five minutes away. A favourite with families.' } },
  marbella: { airport: 40,
    name: { ru: 'Марбелья', es: 'Marbella', en: 'Marbella' },
    text: { ru: 'Город, рестораны и пляжи в десяти минутах. Склоны Сьерра-Бланки дают вид сразу на море и Африку.',
            es: 'Ciudad, restaurantes y playas a diez minutos. Desde Sierra Blanca se ve el mar y África.',
            en: 'Town, restaurants and beaches ten minutes away. The slopes of Sierra Blanca look over the sea to Africa.' } },
  mijas: { airport: 25,
    name: { ru: 'Михас', es: 'Mijas', en: 'Mijas' },
    text: { ru: 'Двадцать пять минут до аэропорта. Холмы Каласонды и пляжи Ла-Калы, вид на всё побережье.',
            es: 'A veinticinco minutos del aeropuerto. Las colinas de Calahonda y las playas de La Cala, con vistas a toda la costa.',
            en: 'Twenty-five minutes from the airport. The hills of Calahonda and the beaches of La Cala, with views along the whole coast.' } },
  benalmadena: { airport: 15,
    name: { ru: 'Бенальмадена', es: 'Benalmádena', en: 'Benalmádena' },
    text: { ru: 'Пятнадцать минут до аэропорта. Холмы Торрекебрады над морем, гольф и пляжи рядом, круглый год живой город.',
            es: 'A quince minutos del aeropuerto. Las colinas de Torrequebrada sobre el mar, golf y playas cerca, una ciudad viva todo el año.',
            en: 'Fifteen minutes from the airport. The Torrequebrada hills above the sea, golf and beaches nearby, a town that is lively all year.' } },
  malaga: { airport: 20,
    name: { ru: 'Малага Восток', es: 'Málaga Este', en: 'Málaga East' },
    text: { ru: 'Эль-Лимонар и Серрадо-де-Кальдерон: старые виллы в садах, десять минут до музеев, порта и центра Малаги.',
            es: 'El Limonar y Cerrado de Calderón: villas señoriales entre jardines, a diez minutos de los museos, el puerto y el centro de Málaga.',
            en: 'El Limonar and Cerrado de Calderón: grand villas among gardens, ten minutes from the museums, harbour and centre of Málaga.' } }
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

  { id: 'patio', ref: 'VT-1031', area: 'nuevaandalucia', lat: 36.5, lng: -4.96, gallery: ['patio', 'in-living-12', 'in-kitchen-2', 'in-bed-1', 'in-bath-4'],
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
    en: { name: 'Villa Brisa', where: 'Calahonda, Mijas Costa', desc: 'A compact villa with garden and pool. Morning sun in the kitchen and a shaded terrace in the evening, easy living in high summer.' } },
  { id: 'palmera', ref: 'VT-1141', area: 'sotogrande', lat: 36.30, lng: -5.285, gallery: ['palmera', 'in-living-15', 'in-kitchen-4', 'in-bed-5', 'in-bath-5'],
    price: 6200000, beds: 6, baths: 6, built: 690, plot: 4200, sun: [8, 50, 21, 35], face: 's', sea: true, newBuild: false, beach: 3, year: 2015, energy: 'B',
    ru: { name: 'Вилла Пальмера', where: 'Сотогранде-Коста', desc: 'Пальмовая аллея ведёт к бассейну, за которым только пляж. Шесть спален, гостевой дом, теннисный корт. До яхтенного порта и поло-клуба пять минут.' },
    es: { name: 'Villa Palmera', where: 'Sotogrande Costa', desc: 'Un paseo de palmeras lleva a la piscina, y detrás solo queda la playa. Seis dormitorios, casa de invitados y pista de tenis. A cinco minutos del puerto y del club de polo.' },
    en: { name: 'Villa Palmera', where: 'Sotogrande Costa', desc: 'A palm-lined walk leads to the pool, with only the beach beyond it. Six bedrooms, a guest house and a tennis court. Five minutes from the harbour and polo club.' } },

  { id: 'marina', ref: 'VT-1143', area: 'sotogrande', lat: 36.31, lng: -5.265, gallery: ['marina', 'in-living-13', 'in-dining-1', 'in-bed-2', 'ext-pool'],
    price: 3900000, beds: 5, baths: 5, built: 450, plot: 1500, sun: [9, 10, 21, 20], face: 'sw', sea: true, newBuild: false, beach: 6, year: 2019, energy: 'B',
    ru: { name: 'Каса Марина', where: 'Ла-Марина, Сотогранде', desc: 'Белый дом с длинным бассейном и ночной подсветкой фасада. Пешком до ресторанов порта, рядом гольф Вальдеррама.' },
    es: { name: 'Casa Marina', where: 'La Marina, Sotogrande', desc: 'Casa blanca con piscina larga y fachada iluminada por la noche. A pie de los restaurantes del puerto y cerca del golf de Valderrama.' },
    en: { name: 'Casa Marina', where: 'La Marina, Sotogrande', desc: 'A white house with a long pool and a façade lit at night. Walk to the harbour restaurants, with Valderrama golf close by.' } },

  { id: 'cortijo', ref: 'VT-1136', area: 'casares', lat: 36.44, lng: -5.255, gallery: ['cortijo', 'in-living-5', 'in-kitchen-1', 'in-bed-3', 'in-bath-2'],
    price: 2100000, beds: 4, baths: 4, built: 380, plot: 5200, sun: [8, 0, 21, 15], face: 'sw', sea: true, newBuild: false, beach: 12, year: 2008, energy: 'C',
    ru: { name: 'Кортихо-дель-Соль', where: 'Касарес', desc: 'Андалусская усадьба из тёплого камня: круглый бассейн с подогревом, оливковая роща и вид на Гибралтар. На закате фасад светится золотом.' },
    es: { name: 'Cortijo del Sol', where: 'Casares', desc: 'Cortijo andaluz de piedra cálida: piscina redonda climatizada, olivar y vistas a Gibraltar. Al atardecer la fachada brilla dorada.' },
    en: { name: 'Cortijo del Sol', where: 'Casares', desc: 'An Andalusian farmhouse in warm stone: a heated round pool, an olive grove and views of Gibraltar. At sunset the façade glows gold.' } },

  { id: 'mirlo', ref: 'VT-1138', area: 'casares', lat: 36.39, lng: -5.235, gallery: ['mirlo', 'in-living-17', 'in-dining-2', 'in-bed-4', 'in-bath-3'],
    price: 1350000, beds: 3, baths: 3, built: 230, plot: 900, sun: [9, 30, 21, 10], face: 'w', sea: true, newBuild: true, beach: 8, year: 2025, energy: 'A',
    ru: { name: 'Каса Мирло', where: 'Касарес-Коста', desc: 'Новый дом на склоне: тёмное дерево, тёплый свет в окнах, терраса над долиной. Самая доступная вилла каталога с видом на море.' },
    es: { name: 'Casa Mirlo', where: 'Casares Costa', desc: 'Obra nueva en la ladera: madera oscura, luz cálida en las ventanas y una terraza sobre el valle. La villa más asequible del catálogo con vistas al mar.' },
    en: { name: 'Casa Mirlo', where: 'Casares Costa', desc: 'A new house on the hillside: dark timber, warm light in the windows and a terrace over the valley. The most affordable sea-view villa in the catalogue.' } },

  { id: 'lago', ref: 'VT-1133', area: 'nuevaandalucia', lat: 36.515, lng: -4.975, gallery: ['lago', 'in-living-14', 'in-kitchen-3', 'in-bed-5', 'in-bath-5'],
    price: 3600000, beds: 5, baths: 5, built: 470, plot: 1300, sun: [9, 0, 20, 50], face: 's', sea: false, newBuild: true, beach: 9, year: 2024, energy: 'A',
    ru: { name: 'Вилла Лаго', where: 'Лос-Наранхос, Нуэва-Андалусия', desc: 'Новый дом у поля Лос-Наранхос: бассейн подходит к самой гостиной, вечером подсвечен изнутри. Пять минут до Пуэрто-Бануса.' },
    es: { name: 'Villa Lago', where: 'Los Naranjos, Nueva Andalucía', desc: 'Obra nueva junto al campo de Los Naranjos: la piscina llega hasta el salón y por la noche se ilumina desde dentro. A cinco minutos de Puerto Banús.' },
    en: { name: 'Villa Lago', where: 'Los Naranjos, Nueva Andalucía', desc: 'A new build by the Los Naranjos course: the pool runs right up to the living room and glows from within at night. Five minutes from Puerto Banús.' } },

  { id: 'quebrada', ref: 'VT-1146', area: 'benalmadena', lat: 36.595, lng: -4.555, gallery: ['quebrada', 'in-living-18', 'in-kitchen-4', 'in-bed-1', 'in-bath-1'],
    price: 1950000, beds: 4, baths: 4, built: 320, plot: 1100, sun: [8, 20, 21, 0], face: 'se', sea: true, newBuild: false, beach: 7, year: 2013, energy: 'C',
    ru: { name: 'Вилла Кебрада', where: 'Торрекебрада, Бенальмадена', desc: 'Деревянная палуба с шезлонгами и столовая под стеклянным навесом. Над гольф-полем Торрекебрады, пятнадцать минут до аэропорта.' },
    es: { name: 'Villa Quebrada', where: 'Torrequebrada, Benalmádena', desc: 'Cubierta de madera con tumbonas y comedor bajo un porche acristalado. Sobre el golf de Torrequebrada, a quince minutos del aeropuerto.' },
    en: { name: 'Villa Quebrada', where: 'Torrequebrada, Benalmádena', desc: 'A timber deck with loungers and a dining room under a glass canopy. Above Torrequebrada golf, fifteen minutes from the airport.' } },

  { id: 'ola', ref: 'VT-1149', area: 'benalmadena', lat: 36.606, lng: -4.522, gallery: ['ola', 'in-living-16', 'in-dining-2', 'in-bed-2', 'sea'],
    price: 1250000, beds: 3, baths: 2, built: 190, plot: 520, sun: [7, 45, 20, 30], face: 'se', sea: true, newBuild: false, beach: 1, year: 2006, energy: 'D',
    ru: { name: 'Каса Ола', where: 'Бенальмадена-Коста', desc: 'Дом прямо над пляжем: слышно волны из спальни. Небольшой, но с террасой над водой, которая есть не у каждой виллы за десять миллионов.' },
    es: { name: 'Casa Ola', where: 'Benalmádena Costa', desc: 'Una casa justo sobre la playa: las olas se oyen desde el dormitorio. Pequeña, pero con una terraza sobre el agua que no tienen ni villas de diez millones.' },
    en: { name: 'Casa Ola', where: 'Benalmádena Costa', desc: 'A house right above the beach: you can hear the waves from the bedroom. Small, but with a terrace over the water that ten-million villas lack.' } },

  { id: 'limonar', ref: 'VT-1152', area: 'malaga', lat: 36.728, lng: -4.392, gallery: ['limonar', 'in-living-15', 'in-dining-1', 'in-bed-5', 'in-bath-3'],
    price: 4100000, beds: 5, baths: 5, built: 540, plot: 1900, sun: [8, 15, 21, 0], face: 's', sea: true, newBuild: false, beach: 5, year: 2017, energy: 'B',
    ru: { name: 'Вилла Лимонар', where: 'Эль-Лимонар, Малага', desc: 'Бассейн на крыше с видом на порт и собор Малаги, на закате всё побережье в огнях. Десять минут до центра и музея Пикассо.' },
    es: { name: 'Villa Limonar', where: 'El Limonar, Málaga', desc: 'Piscina en la azotea con vistas al puerto y a la catedral de Málaga; al atardecer toda la costa se enciende. A diez minutos del centro y del Museo Picasso.' },
    en: { name: 'Villa Limonar', where: 'El Limonar, Málaga', desc: 'A rooftop pool overlooking Málaga’s harbour and cathedral; at sunset the whole coast lights up. Ten minutes from the centre and the Picasso Museum.' } },

  { id: 'calderon', ref: 'VT-1155', area: 'malaga', lat: 36.736, lng: -4.372, gallery: ['calderon', 'in-living-13', 'in-kitchen-3', 'in-bed-4', 'ext-cube'],
    price: 2400000, beds: 4, baths: 4, built: 350, plot: 1000, sun: [9, 0, 20, 45], face: 'sw', sea: false, newBuild: true, beach: 8, year: 2025, energy: 'A',
    ru: { name: 'Каса Кальдерон', where: 'Серрадо-де-Кальдерон, Малага', desc: 'Новостройка в закрытом посёлке на холме: стекло, тёмное дерево и бассейн с ночной подсветкой. Город рядом, а вокруг тишина и сады.' },
    es: { name: 'Casa Calderón', where: 'Cerrado de Calderón, Málaga', desc: 'Obra nueva en una urbanización cerrada en la colina: cristal, madera oscura y piscina iluminada. La ciudad al lado y alrededor, silencio y jardines.' },
    en: { name: 'Casa Calderón', where: 'Cerrado de Calderón, Málaga', desc: 'A new build in a gated hillside estate: glass, dark timber and a lit pool. The city close by, silence and gardens all around.' } }
];
