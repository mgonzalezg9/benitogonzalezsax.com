import { slugify } from '../lib/typography';

export interface LocationEntry {
  slug: string;
  city: string;
  province: string;
  autonomousCommunity: string;
  latitude: number;
  longitude: number;
  nearbyAreas: string[];
  serviceAngle: string;
  localIntro: string;
  faqAngle: string;
  testimonialTag: string;
  serviceContext: string;
  logisticsAngle: string;
  musicAngle: string;
  bookingAngle: string;
  venueStyle: string;
  proofHighlights: string[];
  faqVariants: {
    price: string;
    fit: string;
    travel: string;
    timing: string;
    personalization: string;
  };
  repertoireAngle: string;
  videoAngle: string;
  packAngle: string;
  testimonialAngle: string;
  cityIntentVariant: string;
  rolloutPhase: 1 | 2 | 3;
  relatedSlugs: string[];
}

type Seed = [
  city: string,
  province: string,
  autonomousCommunity: string,
  latitude: number,
  longitude: number,
  nearbyAreas: string[],
  serviceAngle: string,
  localIntro: string,
  faqAngle: string,
  testimonialTag: string,
  rolloutPhase: 1 | 2 | 3,
  relatedSlugs: string[],
];

const createLocation = (seed: Seed): LocationEntry => {
  const city = seed[0];
  const province = seed[1];
  const nearbyAreas = seed[5];
  const serviceAngle = seed[6];
  const localIntro = seed[7];
  const faqAngle = seed[8];

  return {
    city,
    province,
    autonomousCommunity: seed[2],
    latitude: seed[3],
    longitude: seed[4],
    nearbyAreas,
    serviceAngle,
    localIntro,
    faqAngle,
    testimonialTag: seed[9],
    serviceContext: localIntro,
    logisticsAngle: `La propuesta se adapta al tipo de espacio, la coordinación con el lugar de celebración y la logística habitual de bodas en ${city}.`,
    musicAngle: `El directo funciona muy bien en ${city} cuando la boda necesita pasar de una atmósfera elegante a una fiesta con más energía sin perder coherencia.`,
    bookingAngle: `Lo más útil para cerrar una propuesta en ${city} es compartir fecha, lugar, momentos de actuación y el ambiente que queréis crear.`,
    venueStyle: `organizadores de bodas, fincas, hoteles y espacios de boda de ${province}`,
    proofHighlights: [
      localIntro,
      `Cobertura habitual en ${city} y zonas cercanas como ${nearbyAreas.join(', ')}.`,
      `Montaje adaptable a ceremonia, cóctel, banquete, barra libre y formato Saxo + DJ en ${city}.`,
    ],
    faqVariants: {
      price: `El presupuesto en ${city} depende de la fecha, el lugar, el desplazamiento, la duración y si queréis uno o varios momentos de actuación.`,
      fit: `En ${city} el saxo encaja muy bien cuando buscáis elegancia en la ceremonia, buen ambiente en el cóctel y una entrada potente en la fiesta.`,
      travel: `Trabajo bodas en ${city}, ${province} y zonas cercanas como ${nearbyAreas.join(', ')}, coordinando horarios, montaje y desplazamiento con cada espacio.`,
      timing: `En ${city} conviene consultar disponibilidad cuanto antes, sobre todo para primavera, verano y sábados con más demanda.`,
      personalization: `El repertorio y la intensidad del directo se ajustan en ${city} al tipo de boda, al espacio y al momento que queréis destacar.`,
    },
    repertoireAngle: `Una selección orientativa para entender qué repertorio suele encajar mejor en bodas de ${city}, desde momentos emotivos hasta fiesta final.`,
    videoAngle: `Vídeos reales para ver cómo suena el saxo en bodas y eventos de un estilo parecido al que muchas parejas buscan en ${city}.`,
    packAngle: `Dos formas de reservar el servicio en ${city}: una más cerrada y otra más personalizada, según el protagonismo que queráis dar al saxo en la boda.`,
    testimonialAngle: `Opiniones reales que ayudan a entender cómo se vive el directo cuando el servicio se adapta al ritmo de una boda en ${city}.`,
    cityIntentVariant: `saxofonista para bodas en ${city}`,
    rolloutPhase: seed[10],
    relatedSlugs: seed[11],
    slug: `saxofonista-para-bodas-en-${slugify(city)}`,
  };
};

export const ACTIVE_ROLLOUT_PHASE = 1;

const seeds: Seed[] = [
  [
    'A Coruña',
    'A Coruña',
    'Galicia',
    43.3623,
    -8.4115,
    ['Ferrol', 'Santiago de Compostela', 'Arteixo'],
    'bodas elegantes en pazos, fincas y celebraciones urbanas de la costa gallega',
    'Trabajo bodas en A Coruña con repertorios que funcionan tanto en espacios junto al mar como en pazos y celebraciones urbanas.',
    'desplazamiento por la costa coruñesa y coordinación con espacios de boda',
    'Boda en Galicia',
    3,
    ['saxofonista-para-bodas-en-lugo', 'saxofonista-para-bodas-en-pontevedra'],
  ],
  [
    'Albacete',
    'Albacete',
    'Castilla-La Mancha',
    38.9942,
    -1.8585,
    ['La Roda', 'Almansa', 'Hellín'],
    'bodas en haciendas, salones y fincas de Castilla-La Mancha con un directo elegante',
    'Ofrezco saxofón para bodas en Albacete pensado para parejas que quieren una entrada elegante, un cóctel con ritmo y una fiesta final memorable.',
    'cobertura por la provincia de Albacete y combinaciones saxo + DJ',
    'Boda en Castilla-La Mancha',
    2,
    ['saxofonista-para-bodas-en-murcia', 'saxofonista-para-bodas-en-alicante'],
  ],
  [
    'Alicante',
    'Alicante',
    'Comunidad Valenciana',
    38.3452,
    -0.481,
    ['Elche', 'Benidorm', 'Altea'],
    'bodas junto al mar, fincas de interior y celebraciones de destino con saxo en directo',
      'Trabajo bodas en Alicante con formatos flexibles para ceremonias, cócteles al aire libre, espacios junto al mar y barras libres donde el saxo necesita sonar con energía y elegancia.',
    'bodas de destino en Alicante, desplazamiento y coordinación con DJs del espacio',
    'Boda en Alicante',
    1,
    ['saxofonista-para-bodas-en-murcia', 'saxofonista-para-bodas-en-valencia'],
  ],
  [
    'Almería',
    'Almería',
    'Andalucía',
    36.834,
    -2.4637,
    ['Roquetas de Mar', 'El Ejido', 'Aguadulce'],
    'bodas mediterráneas con saxo en cóctel, cena y fiesta final',
    'Llevo un formato pensado para bodas en Almería donde el clima, las terrazas y los espacios abiertos piden una música elegante y adaptable al ambiente.',
    'cobertura en la provincia de Almería y repertorio para bodas costeras',
    'Boda en Andalucía',
    3,
    ['saxofonista-para-bodas-en-granada', 'saxofonista-para-bodas-en-murcia'],
  ],
  [
    'Ávila',
    'Ávila',
    'Castilla y León',
    40.6566,
    -4.6812,
    ['Arenas de San Pedro', 'Arévalo', 'El Barraco'],
    'bodas en hoteles históricos, fincas y entornos monumentales',
    'En Ávila adapto el directo para ceremonias emotivas, cócteles tranquilos y fiestas con más ritmo en espacios históricos y fincas de la provincia.',
    'logística en entornos patrimoniales y reserva con antelación',
    'Boda en Castilla y León',
    3,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-segovia'],
  ],
  [
    'Badajoz',
    'Badajoz',
    'Extremadura',
    38.8794,
    -6.9707,
    ['Mérida', 'Don Benito', 'Almendralejo'],
    'bodas con un directo elegante para cortijos, hoteles y grandes celebraciones',
    'Ofrezco saxo para bodas en Badajoz con planteamientos personalizados para ceremonia, cóctel, banquete y fiesta final.',
    'desplazamiento por Extremadura y personalización del repertorio',
    'Boda en Extremadura',
    3,
    ['saxofonista-para-bodas-en-caceres', 'saxofonista-para-bodas-en-sevilla'],
  ],
  [
    'Barcelona',
    'Barcelona',
    'Cataluña',
    41.3874,
    2.1686,
    ['Sitges', 'Mataró', 'Sant Cugat del Vallès'],
    'bodas urbanas, de destino y celebraciones premium con saxo para cada momento',
    'Trabajo bodas en Barcelona para parejas que quieren una puesta en escena cuidada, repertorio moderno y una actuación que eleve tanto el cóctel como la fiesta.',
      'coordinación con organizadores de bodas y espacios premium de Barcelona',
    'Boda en Barcelona',
    1,
    ['saxofonista-para-bodas-en-valencia', 'saxofonista-para-bodas-en-palma'],
  ],
  [
    'Bilbao',
    'Bizkaia',
    'País Vasco',
    43.263,
    -2.935,
    ['Getxo', 'Barakaldo', 'Durango'],
    'bodas modernas y celebraciones elegantes en Bizkaia con saxo en directo',
    'En Bilbao ofrezco un formato de saxo para bodas que funciona muy bien en hoteles, fincas, clubs y espacios con una producción cuidada.',
    'viajes al País Vasco, repertorio y coordinación técnica',
    'Boda en Bizkaia',
    2,
    ['saxofonista-para-bodas-en-vitoria-gasteiz', 'saxofonista-para-bodas-en-donostia-san-sebastian'],
  ],
  [
    'Burgos',
    'Burgos',
    'Castilla y León',
    42.3439,
    -3.6969,
    ['Aranda de Duero', 'Miranda de Ebro', 'Lerma'],
    'bodas en fincas, monasterios y hoteles con una actuación de saxo muy adaptable',
    'Llevo mi servicio de saxo para bodas a Burgos con repertorios para ceremonias emotivas, cócteles fluidos y barras libres más potentes.',
    'montaje en espacios de boda de Burgos y desplazamiento',
    'Boda en Burgos',
    3,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-logrono'],
  ],
  [
    'Cáceres',
    'Cáceres',
    'Extremadura',
    39.4762,
    -6.3708,
    ['Plasencia', 'Trujillo', 'Miajadas'],
    'bodas con atmósfera elegante en palacios, hoteles y fincas extremeñas',
    'Trabajo bodas en Cáceres con un enfoque muy musical y visual, ideal para parejas que buscan un directo elegante y fácil de integrar en el timing del día.',
    'cobertura en Cáceres, Trujillo y zonas de boda de Extremadura',
    'Boda en Cáceres',
    3,
    ['saxofonista-para-bodas-en-badajoz', 'saxofonista-para-bodas-en-salamanca'],
  ],
  [
    'Cádiz',
    'Cádiz',
    'Andalucía',
    36.5271,
    -6.2886,
    ['Jerez de la Frontera', 'El Puerto de Santa María', 'Chiclana de la Frontera'],
    'bodas junto al mar y celebraciones andaluzas con saxo para cóctel y fiesta',
      'Ofrezco saxo para bodas en Cádiz con formatos que funcionan muy bien en celebraciones junto al mar, fincas, bodegas y hoteles con fiesta final.',
    'bodas en la costa gaditana, timing y repertorio',
    'Boda en Cádiz',
    2,
    ['saxofonista-para-bodas-en-sevilla', 'saxofonista-para-bodas-en-malaga'],
  ],
  [
    'Castellón de la Plana',
    'Castellón',
    'Comunidad Valenciana',
    39.9864,
    -0.0513,
    ['Benicàssim', 'Vila-real', 'Oropesa del Mar'],
    'bodas mediterráneas con saxo para cóctel, banquete y barra libre',
    'En Castellón de la Plana llevo un servicio de saxo para bodas diseñado para terrazas, fincas y celebraciones frente al mar o en el interior.',
    'cobertura en Castellón, Benicàssim y entorno',
    'Boda en Castellón',
    2,
    ['saxofonista-para-bodas-en-valencia', 'saxofonista-para-bodas-en-tarragona'],
  ],
  [
    'Ciudad Real',
    'Ciudad Real',
    'Castilla-La Mancha',
    38.9864,
    -3.9291,
    ['Puertollano', 'Alcázar de San Juan', 'Valdepeñas'],
    'bodas manchegas con saxo elegante para ceremonia, cóctel y fiesta',
    'Trabajo bodas en Ciudad Real con un repertorio adaptable para espacios rurales, fincas y hoteles donde cada momento necesita una energía distinta.',
    'cobertura provincial y reserva para fechas clave',
    'Boda en Castilla-La Mancha',
    3,
    ['saxofonista-para-bodas-en-toledo', 'saxofonista-para-bodas-en-albacete'],
  ],
  [
    'Córdoba',
    'Córdoba',
    'Andalucía',
    37.8882,
    -4.7794,
    ['Lucena', 'Puente Genil', 'Priego de Córdoba'],
    'bodas en haciendas, cortijos y espacios históricos con un directo elegante',
    'En Córdoba llevo el saxo a bodas donde la ceremonia, el cóctel y la fiesta necesitan una progresión musical muy bien pensada.',
    'cócteles en patios, haciendas y espacios de boda de Córdoba',
    'Boda en Córdoba',
    2,
    ['saxofonista-para-bodas-en-sevilla', 'saxofonista-para-bodas-en-jaen'],
  ],
  [
    'Cuenca',
    'Cuenca',
    'Castilla-La Mancha',
    40.0704,
    -2.1374,
    ['Tarancón', 'Motilla del Palancar', 'San Clemente'],
    'bodas en espacios con encanto y fincas de interior con saxo en directo',
    'Ofrezco saxo para bodas en Cuenca con una propuesta flexible para parejas que valoran la elegancia del directo y una buena coordinación con el evento.',
    'desplazamiento a fincas y hoteles de boda en Cuenca',
    'Boda en Cuenca',
    3,
    ['saxofonista-para-bodas-en-madrid', 'saxofonista-para-bodas-en-valencia'],
  ],
  [
    'Donostia-San Sebastián',
    'Gipuzkoa',
    'País Vasco',
    43.3183,
    -1.9812,
    ['Hondarribia', 'Irún', 'Zarautz'],
    'bodas premium junto al mar y celebraciones cuidadas en Gipuzkoa',
    'Trabajo bodas en Donostia-San Sebastián con repertorios elegantes y modernos, pensados para cócteles con estilo y fiestas con mucha presencia escénica.',
      'bodas premium en Gipuzkoa y coordinación con organizadores',
    'Boda en Gipuzkoa',
    2,
    ['saxofonista-para-bodas-en-bilbao', 'saxofonista-para-bodas-en-vitoria-gasteiz'],
  ],
  [
    'Girona',
    'Girona',
    'Cataluña',
    41.9794,
    2.8214,
    ['Costa Brava', 'Figueres', 'Blanes'],
    'bodas de destino y celebraciones en fincas y hoteles con saxo en directo',
    'Ofrezco saxo para bodas en Girona y la Costa Brava con una actuación pensada para bodas de destino, hoteles boutique y fincas con mucho encanto.',
    'bodas de destino en Girona y Costa Brava',
    'Boda en Girona',
    2,
    ['saxofonista-para-bodas-en-barcelona', 'saxofonista-para-bodas-en-tarragona'],
  ],
  [
    'Granada',
    'Granada',
    'Andalucía',
    37.1773,
    -3.5986,
    ['Motril', 'Loja', 'Almuñécar'],
    'bodas con mucha personalidad en cármenes, hoteles y espacios con vistas',
    'En Granada trabajo bodas donde la ambientación y la emoción son tan importantes como la música, con saxo para ceremonia, cóctel y fiesta.',
    'bodas en Granada capital, Sierra Nevada y costa',
    'Boda en Granada',
    2,
    ['saxofonista-para-bodas-en-malaga', 'saxofonista-para-bodas-en-almeria'],
  ],
  [
    'Guadalajara',
    'Guadalajara',
    'Castilla-La Mancha',
    40.6333,
    -3.167,
    ['Azuqueca de Henares', 'Sigüenza', 'Cabanillas del Campo'],
    'bodas en fincas y espacios de interior con una propuesta musical versátil',
    'Llevo mi servicio de saxo para bodas a Guadalajara con formatos fáciles de adaptar al cóctel, al banquete y a la fiesta final.',
    'desplazamiento desde Murcia y trabajo en corredores de bodas cercanos a Madrid',
    'Boda en Guadalajara',
    3,
    ['saxofonista-para-bodas-en-madrid', 'saxofonista-para-bodas-en-cuenca'],
  ],
  [
    'Huelva',
    'Huelva',
    'Andalucía',
    37.2614,
    -6.9447,
    ['Punta Umbría', 'Lepe', 'El Rompido'],
    'bodas costeras y celebraciones andaluzas con saxo elegante y festivo',
      'Trabajo bodas en Huelva con una propuesta de saxo ideal para espacios junto al mar, fincas, hoteles y celebraciones con muy buena energía.',
    'desplazamiento a la costa onubense y repertorio adaptable',
    'Boda en Huelva',
    3,
    ['saxofonista-para-bodas-en-sevilla', 'saxofonista-para-bodas-en-cadiz'],
  ],
  [
    'Huesca',
    'Huesca',
    'Aragón',
    42.1362,
    -0.4087,
    ['Jaca', 'Barbastro', 'Monzón'],
    'bodas de interior y celebraciones con vistas donde el directo suma elegancia',
    'Ofrezco saxo para bodas en Huesca con repertorio pensado para ceremonias emotivas, cócteles con clase y barras libres más animadas.',
    'logística en bodas de Huesca y zonas de montaña',
    'Boda en Aragón',
    3,
    ['saxofonista-para-bodas-en-zaragoza', 'saxofonista-para-bodas-en-lleida'],
  ],
  [
    'Jaén',
    'Jaén',
    'Andalucía',
    37.7796,
    -3.7849,
    ['Úbeda', 'Baeza', 'Linares'],
    'bodas en haciendas y fincas con un directo elegante y flexible',
    'En Jaén adapto el saxo para bodas a ceremonias íntimas, cócteles largos y fiestas donde el saxo convive muy bien con DJ o pista abierta.',
    'bodas en Jaén, Úbeda y Baeza con repertorio personalizado',
    'Boda en Jaén',
    3,
    ['saxofonista-para-bodas-en-cordoba', 'saxofonista-para-bodas-en-granada'],
  ],
  [
    'León',
    'León',
    'Castilla y León',
    42.5987,
    -5.5671,
    ['Ponferrada', 'Astorga', 'La Bañeza'],
    'bodas con una ambientación cuidada en hoteles, fincas y espacios históricos',
    'Trabajo bodas en León con una propuesta de saxo pensada para momentos elegantes y para fiestas con más intensidad cuando llega la barra libre.',
    'desplazamiento por León y reserva para fechas altas',
    'Boda en León',
    3,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-oviedo'],
  ],
  [
    'Lleida',
    'Lleida',
    'Cataluña',
    41.6176,
    0.62,
    ['La Seu d’Urgell', 'Mollerussa', 'Balaguer'],
    'bodas de interior y celebraciones en fincas con saxo en directo',
    'Ofrezco saxo para bodas en Lleida con un repertorio que acompaña ceremonia, cóctel y una fiesta final con un punto más actual.',
    'logística y desplazamiento para bodas en la provincia de Lleida',
    'Boda en Lleida',
    3,
    ['saxofonista-para-bodas-en-zaragoza', 'saxofonista-para-bodas-en-barcelona'],
  ],
  [
    'Logroño',
    'La Rioja',
    'La Rioja',
    42.4627,
    -2.4449,
    ['Haro', 'Calahorra', 'Santo Domingo de la Calzada'],
    'bodas entre bodegas, fincas y hoteles con una actuación elegante',
    'Trabajo bodas en Logroño con saxo para parejas que buscan una atmósfera elegante, una buena selección musical y una puesta en escena profesional.',
    'bodas en bodegas riojanas y desplazamiento por la provincia',
    'Boda en La Rioja',
    3,
    ['saxofonista-para-bodas-en-vitoria-gasteiz', 'saxofonista-para-bodas-en-zaragoza'],
  ],
  [
    'Lugo',
    'Lugo',
    'Galicia',
    43.0123,
    -7.5559,
    ['Monforte de Lemos', 'Sarria', 'Ribadeo'],
    'bodas gallegas en pazos, hoteles y espacios de interior con saxo en vivo',
    'Ofrezco saxo para bodas en Lugo con un enfoque adaptable para celebraciones tradicionales, fincas y bodas más modernas con DJ.',
    'desplazamiento por la provincia de Lugo y zonas de enlace',
    'Boda en Lugo',
    3,
    ['saxofonista-para-bodas-en-a-coruna', 'saxofonista-para-bodas-en-ourense'],
  ],
  [
    'Madrid',
    'Madrid',
    'Comunidad de Madrid',
    40.4168,
    -3.7038,
    ['Alcalá de Henares', 'Pozuelo de Alarcón', 'San Lorenzo de El Escorial'],
    'bodas urbanas, fincas exclusivas y celebraciones premium con saxo para cada bloque del día',
      'Trabajo bodas en Madrid para parejas y organizadores que buscan un saxo en directo elegante, moderno y fácil de integrar en producciones de alto nivel.',
      'coordinación con organizadores, DJs y espacios premium en Madrid',
    'Boda en Madrid',
    1,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-valencia'],
  ],
  [
    'Málaga',
    'Málaga',
    'Andalucía',
    36.7213,
    -4.4214,
    ['Marbella', 'Estepona', 'Nerja'],
    'bodas de destino en la Costa del Sol con saxo para cóctel, cena y fiesta',
      'Ofrezco saxo para bodas en Málaga con un formato muy bien preparado para espacios junto al mar, fincas premium, hoteles y bodas internacionales.',
    'bodas de destino en Málaga y coordinación con producciones premium',
    'Boda en Málaga',
    1,
    ['saxofonista-para-bodas-en-sevilla', 'saxofonista-para-bodas-en-granada'],
  ],
  [
    'Murcia',
    'Murcia',
    'Región de Murcia',
    37.9922,
    -1.1307,
    ['Cartagena', 'Molina de Segura', 'Lorca'],
    'bodas en fincas, haciendas y celebraciones mediterráneas con saxo en directo',
    'Trabajo bodas en Murcia con una propuesta muy enfocada al cóctel, la ceremonia civil, la entrada al banquete y la barra libre junto a DJ.',
    'disponibilidad en Murcia, fincas cercanas y formatos saxo + DJ',
    'Boda en Murcia',
    1,
    ['saxofonista-para-bodas-en-alicante', 'saxofonista-para-bodas-en-valencia'],
  ],
  [
    'Ourense',
    'Ourense',
    'Galicia',
    42.3358,
    -7.8639,
    ['Verín', 'O Barco de Valdeorras', 'Ribadavia'],
    'bodas con un directo elegante en pazos, hoteles y fincas gallegas',
    'En Ourense adapto el saxo para bodas a ceremonias emotivas, cócteles relajados y momentos de fiesta con mucha interacción.',
    'cobertura por Ourense y zonas de interior de Galicia',
    'Boda en Ourense',
    3,
    ['saxofonista-para-bodas-en-lugo', 'saxofonista-para-bodas-en-pontevedra'],
  ],
  [
    'Oviedo',
    'Asturias',
    'Principado de Asturias',
    43.3619,
    -5.8494,
    ['Gijón', 'Avilés', 'Cangas de Onís'],
    'bodas en pazos, hoteles y celebraciones del norte con saxo elegante',
    'Ofrezco saxo para bodas en Oviedo y Asturias con un enfoque flexible para ceremonias, cócteles, cenas y fiestas con DJ.',
    'desplazamiento por Asturias y montaje en hoteles y fincas',
    'Boda en Asturias',
    3,
    ['saxofonista-para-bodas-en-santander', 'saxofonista-para-bodas-en-leon'],
  ],
  [
    'Palencia',
    'Palencia',
    'Castilla y León',
    42.0095,
    -4.528,
    ['Aguilar de Campoo', 'Venta de Baños', 'Carrión de los Condes'],
    'bodas en fincas y hoteles de Castilla con una música en directo cuidada',
    'Trabajo bodas en Palencia con saxo para parejas que quieren una experiencia elegante, fácil de coordinar y con repertorio adaptado a cada parte del día.',
    'servicio en Palencia, desplazamiento y necesidades técnicas',
    'Boda en Palencia',
    3,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-leon'],
  ],
  [
    'Palma',
    'Illes Balears',
    'Illes Balears',
    39.5696,
    2.6502,
    ['Calvià', 'Llucmajor', 'Alcúdia'],
      'bodas de destino en Mallorca con saxo elegante para ceremonia, cóctel al atardecer y fiesta',
      'Ofrezco saxo para bodas en Palma y Mallorca para parejas que buscan una actuación premium en hoteles, villas, espacios junto al mar y fincas de la isla.',
      'bodas de destino en Mallorca, coordinación con organizadores y ritmo del evento',
    'Boda en Mallorca',
    1,
    ['saxofonista-para-bodas-en-barcelona', 'saxofonista-para-bodas-en-valencia'],
  ],
  [
    'Pamplona',
    'Navarra',
    'Comunidad Foral de Navarra',
    42.8125,
    -1.6458,
    ['Tudela', 'Estella-Lizarra', 'Noáin'],
    'bodas elegantes y celebraciones de gran formato con saxo en directo',
    'Trabajo bodas en Pamplona con una propuesta musical pensada para ceremonia, aperitivo, banquete y una fiesta final con mucho dinamismo.',
    'cobertura en Navarra y coordinación con espacios de boda',
    'Boda en Navarra',
    3,
    ['saxofonista-para-bodas-en-logrono', 'saxofonista-para-bodas-en-zaragoza'],
  ],
  [
    'Pontevedra',
    'Pontevedra',
    'Galicia',
    42.4338,
    -8.648,
    ['Vigo', 'Sanxenxo', 'Ponteareas'],
    'bodas gallegas frente al mar y en pazos con una actuación elegante',
    'Ofrezco saxo para bodas en Pontevedra con repertorio adaptable para ceremonias, cócteles, cenas y fiestas junto a DJ o equipo del lugar.',
    'desplazamiento por las Rías Baixas y coordinación con espacios',
    'Boda en Pontevedra',
    3,
    ['saxofonista-para-bodas-en-a-coruna', 'saxofonista-para-bodas-en-ourense'],
  ],
  [
    'Salamanca',
    'Salamanca',
    'Castilla y León',
    40.9701,
    -5.6635,
    ['Ciudad Rodrigo', 'Santa Marta de Tormes', 'Béjar'],
    'bodas en espacios históricos, fincas y hoteles con un directo distinguido',
    'Trabajo bodas en Salamanca con una propuesta de saxo que combina elegancia, flexibilidad y muy buena presencia en directo.',
    'desplazamiento a fincas de Salamanca y personalización musical',
    'Boda en Salamanca',
    3,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-caceres'],
  ],
  [
    'Santander',
    'Cantabria',
    'Cantabria',
    43.4623,
    -3.8099,
    ['Somo', 'Torrelavega', 'Laredo'],
    'bodas del norte junto al mar y celebraciones elegantes con saxo',
    'Ofrezco saxo para bodas en Santander con una puesta en escena ideal para hoteles, fincas y celebraciones en la costa cántabra.',
    'bodas en Cantabria, desplazamiento y repertorio para cóctel y fiesta',
    'Boda en Cantabria',
    3,
    ['saxofonista-para-bodas-en-bilbao', 'saxofonista-para-bodas-en-oviedo'],
  ],
  [
    'Segovia',
    'Segovia',
    'Castilla y León',
    40.9481,
    -4.1184,
    ['La Granja de San Ildefonso', 'Sepúlveda', 'Cuéllar'],
    'bodas con encanto en castillos, fincas y hoteles con saxo en vivo',
    'Trabajo bodas en Segovia con un repertorio adaptable a ceremonias emotivas, cócteles elegantes y una fiesta final con más energía.',
    'logística en fincas y hoteles de boda de Segovia',
    'Boda en Segovia',
    3,
    ['saxofonista-para-bodas-en-madrid', 'saxofonista-para-bodas-en-valladolid'],
  ],
  [
    'Sevilla',
    'Sevilla',
    'Andalucía',
    37.3891,
    -5.9845,
    ['Dos Hermanas', 'Alcalá de Guadaíra', 'Carmona'],
    'bodas andaluzas, haciendas y celebraciones premium con saxo para cada bloque del día',
    'Ofrezco saxo para bodas en Sevilla con una actuación elegante y muy dinámica para ceremonia, cóctel, banquete y barra libre junto a DJ.',
      'haciendas de Sevilla, organizadores y montajes para bodas grandes',
    'Boda en Sevilla',
    1,
    ['saxofonista-para-bodas-en-malaga', 'saxofonista-para-bodas-en-cadiz'],
  ],
  [
    'Soria',
    'Soria',
    'Castilla y León',
    41.7633,
    -2.4688,
    ['Almazán', 'El Burgo de Osma', 'San Esteban de Gormaz'],
    'bodas de interior con una ambientación elegante y flexible',
    'Llevo mi servicio de saxo para bodas a Soria con repertorios adaptados a celebraciones de fin de semana, hoteles y fincas.',
    'cobertura en Soria y reservas con antelación',
    'Boda en Soria',
    3,
    ['saxofonista-para-bodas-en-zaragoza', 'saxofonista-para-bodas-en-logrono'],
  ],
  [
    'Tarragona',
    'Tarragona',
    'Cataluña',
    41.1189,
    1.2445,
    ['Reus', 'Salou', 'Cambrils'],
    'bodas junto al Mediterráneo con saxo para cóctel, banquete y fiesta',
      'Trabajo bodas en Tarragona con una propuesta de saxo en directo ideal para hoteles, masías, espacios junto al mar y celebraciones de destino.',
    'bodas de costa en Tarragona y coordinación con DJs del lugar',
    'Boda en Tarragona',
    2,
    ['saxofonista-para-bodas-en-barcelona', 'saxofonista-para-bodas-en-castellon-de-la-plana'],
  ],
  [
    'Teruel',
    'Teruel',
    'Aragón',
    40.344,
    -1.1069,
    ['Alcañiz', 'Calamocha', 'Mora de Rubielos'],
    'bodas en enclaves singulares con saxo elegante y adaptable',
    'Ofrezco saxo para bodas en Teruel con formatos fáciles de integrar en el planning del día, desde ceremonia a fiesta.',
    'desplazamiento a masías, hoteles y fincas de Teruel',
    'Boda en Teruel',
    3,
    ['saxofonista-para-bodas-en-zaragoza', 'saxofonista-para-bodas-en-valencia'],
  ],
  [
    'Toledo',
    'Toledo',
    'Castilla-La Mancha',
    39.8628,
    -4.0273,
    ['Talavera de la Reina', 'Illescas', 'Consuegra'],
    'bodas con encanto histórico y celebraciones elegantes con saxo en directo',
    'Trabajo bodas en Toledo con un formato pensado para fincas, cigarrales, hoteles y espacios donde la música en directo debe sumar valor sin complicar la producción.',
    'cigarrales, fincas de Toledo y timings de boda',
    'Boda en Toledo',
    2,
    ['saxofonista-para-bodas-en-madrid', 'saxofonista-para-bodas-en-ciudad-real'],
  ],
  [
    'Valencia',
    'Valencia',
    'Comunidad Valenciana',
    39.4699,
    -0.3763,
    ['Paterna', 'Torrent', 'Sagunto'],
    'bodas mediterráneas, fincas exclusivas y celebraciones con saxo para cóctel y fiesta',
    'Ofrezco saxo para bodas en Valencia con una actuación cuidada para ceremonias, cócteles con ritmo, entradas al banquete y barras libres junto a DJ.',
    'bodas en Valencia ciudad, fincas cercanas y coordinación técnica',
    'Boda en Valencia',
    1,
    ['saxofonista-para-bodas-en-alicante', 'saxofonista-para-bodas-en-barcelona'],
  ],
  [
    'Valladolid',
    'Valladolid',
    'Castilla y León',
    41.6523,
    -4.7245,
    ['Tordesillas', 'Medina del Campo', 'Arroyo de la Encomienda'],
    'bodas elegantes en Castilla con saxo para ceremonia, cóctel y fiesta',
    'Trabajo bodas en Valladolid con una propuesta muy equilibrada entre elegancia, cercanía y un directo que funciona tanto en aperitivos como en la fiesta final.',
      'servicio en Valladolid, fincas cercanas y reserva con organizadores',
    'Boda en Valladolid',
    1,
    ['saxofonista-para-bodas-en-madrid', 'saxofonista-para-bodas-en-salamanca'],
  ],
  [
    'Vitoria-Gasteiz',
    'Álava',
    'País Vasco',
    42.8467,
    -2.6726,
    ['Laguardia', 'Salvatierra', 'Miranda de Ebro'],
    'bodas elegantes en el País Vasco con saxo para cóctel y fiesta',
    'Ofrezco saxo para bodas en Vitoria-Gasteiz con una propuesta pensada para espacios elegantes, hoteles y celebraciones con mucho cuidado por el detalle.',
    'coordinación con espacios del País Vasco y repertorio adaptable',
    'Boda en Álava',
    2,
    ['saxofonista-para-bodas-en-bilbao', 'saxofonista-para-bodas-en-logrono'],
  ],
  [
    'Zamora',
    'Zamora',
    'Castilla y León',
    41.5035,
    -5.7468,
    ['Benavente', 'Toro', 'Puebla de Sanabria'],
    'bodas en entornos históricos y fincas con un directo de saxo versátil',
    'Trabajo bodas en Zamora con una música en directo que aporta elegancia en la ceremonia y energía en los momentos más festivos.',
    'cobertura en Zamora y pueblos cercanos con desplazamiento',
    'Boda en Zamora',
    3,
    ['saxofonista-para-bodas-en-valladolid', 'saxofonista-para-bodas-en-salamanca'],
  ],
  [
    'Zaragoza',
    'Zaragoza',
    'Aragón',
    41.6488,
    -0.8891,
    ['Utebo', 'Cuarte de Huerva', 'La Muela'],
    'bodas urbanas y de finca con saxo para cóctel, cena y fiesta final',
    'Ofrezco saxo para bodas en Zaragoza con un formato pensado para parejas que quieren elegancia durante el día y mucha energía en la fiesta final.',
    'espacios de boda en Zaragoza, repertorio y servicio técnico',
    'Boda en Zaragoza',
    1,
    ['saxofonista-para-bodas-en-madrid', 'saxofonista-para-bodas-en-valencia'],
  ],
];

const locationOverrides: Record<string, Partial<LocationEntry>> = {
  'saxofonista-para-bodas-en-murcia': {
    serviceContext:
      'Murcia es una ciudad donde muchas bodas se viven con cercanía, un cóctel largo y espacios amplios en fincas y haciendas donde la música tiene que acompañar sin invadir. También es habitual que el banquete y la barra libre tengan mucho peso dentro de la celebración.',
    logisticsAngle:
      'En Murcia suelo coordinarme con fincas, haciendas y espacios de boda donde el timing del cóctel y la entrada al banquete marcan mucho la experiencia.',
    musicAngle:
      'En Murcia suele funcionar muy bien una combinación de elegancia en ceremonia y cóctel con un tramo final más energético para barra libre y Saxo + DJ.',
    bookingAngle:
      'Para bodas en Murcia, lo más importante al pedir presupuesto suele ser definir fecha, finca o espacio, momentos de actuación y si queréis un final de fiesta más potente.',
    venueStyle: 'fincas, haciendas y espacios de boda de la Región de Murcia',
    proofHighlights: [
      'Propuesta muy trabajada para bodas en Murcia donde el cóctel, la entrada al banquete y la barra libre son momentos clave.',
      'Cobertura habitual en Murcia, Cartagena, Molina de Segura y Lorca.',
      'Muy buena integración con fincas cercanas y formatos saxo + DJ cuando la fiesta necesita un extra de energía.',
    ],
    faqVariants: {
      price:
        'El presupuesto en Murcia suele depender mucho de si queréis solo cóctel, varios bloques durante el día o un formato más potente para banquete y barra libre.',
      fit:
        'En Murcia encaja especialmente bien cuando buscáis acompañar una ceremonia emotiva, dar ambiente a un cóctel largo y rematar con una fiesta muy viva.',
      travel:
        'Sí. Trabajo bodas en Murcia capital y en zonas cercanas como Cartagena, Molina de Segura y Lorca, adaptando desplazamiento, montaje y horarios al tipo de finca o espacio.',
      timing:
        'En Murcia conviene reservar con antelación, sobre todo en primavera y verano, porque muchas bodas se concentran en sábados y en fincas con mucho movimiento.',
      personalization:
        'Sí. El repertorio se ajusta a la energía que queréis en cada momento, desde una ceremonia más emocional hasta un banquete o barra libre con más fuerza.',
    },
  },
  'saxofonista-para-bodas-en-alicante': {
    serviceContext:
        'Alicante es una ciudad mediterránea donde conviven bodas en fincas, hoteles, villas y espacios junto al mar, muchas veces con espacios exteriores y un cóctel muy protagonista. En este tipo de celebraciones la música tiene que acompañar bien la luz, el entorno y el paso natural hacia la fiesta.',
      logisticsAngle:
        'En Alicante suelen importar mucho la coordinación con hoteles, fincas de interior, espacios junto al mar y bodas de destino donde cada bloque del evento tiene un ritmo distinto.',
    musicAngle:
      'En Alicante funciona especialmente bien una mezcla de elegancia mediterránea para el cóctel y un tramo de fiesta muy dinámico para banquete, barra libre o Saxo + DJ.',
      bookingAngle:
        'Cuando la boda es en Alicante, lo más útil es concretar fecha, tipo de espacio, si hay organización de boda y si queréis un servicio más de cóctel elegante o más enfocado a fiesta.',
      venueStyle: 'organizadores de bodas, fincas, hoteles, villas y espacios junto al mar de Alicante',
    proofHighlights: [
      'Servicio muy adaptado a bodas de destino en Alicante, fincas de interior y celebraciones junto al mar.',
      'Cobertura habitual en Alicante, Elche, Benidorm y Altea.',
        'Buena coordinación con DJs, organizadores y espacios donde el saxo acompaña tanto el cóctel como la fiesta.',
    ],
    faqVariants: {
      price:
          'En Alicante el presupuesto suele variar según si la boda es en finca, hotel o espacio junto al mar, el número de bloques de actuación y la logística del espacio.',
      fit:
        'Sí. En Alicante el saxo funciona muy bien tanto en ceremonias y cócteles elegantes como en bodas de destino y fiestas con más energía frente al mar o en finca.',
      travel:
        'Sí. Trabajo bodas en Alicante y alrededores, incluyendo zonas como Elche, Benidorm y Altea, coordinando montaje, horarios y necesidades técnicas con cada espacio.',
      timing:
          'En Alicante conviene reservar pronto, especialmente en temporada alta y en bodas de destino, donde organizadores, espacios y proveedores se cierran con bastante antelación.',
      personalization:
        'Sí. El repertorio y el formato se adaptan a si buscáis una boda más elegante, más mediterránea o con una parte final muy enfocada a la fiesta.',
    },
  },
  'saxofonista-para-bodas-en-almeria': {
    serviceContext:
        'Almería es una provincia donde muchas bodas se celebran en terrazas, hoteles y espacios abiertos donde el clima, el paisaje y la amplitud del lugar condicionan mucho el ritmo del evento. En estas celebraciones suele funcionar muy bien una música elegante al principio y una fiesta más libre después.',
    logisticsAngle:
      'En Almería suelen ser importantes los montajes en espacios abiertos, hoteles, terrazas y bodas costeras donde el horario y el sonido tienen mucho peso.',
    musicAngle:
      'En Almería suele funcionar muy bien un servicio que arranca elegante en ceremonia o cóctel y termina con mucha interacción en banquete o barra libre.',
    bookingAngle:
      'Para bodas en Almería, lo más práctico es definir fecha, espacio, si hay exterior o interior y qué momentos queréis reforzar con el saxo.',
    venueStyle: 'hoteles, terrazas, fincas y espacios de boda de la provincia de Almería',
    proofHighlights: [
      'Formato pensado para bodas en Almería donde el entorno y los espacios abiertos piden una propuesta elegante y flexible.',
      'Cobertura habitual en Almería, Roquetas de Mar, El Ejido y Aguadulce.',
      'Muy buena adaptación a bodas costeras y celebraciones donde el directo debe acompañar sin frenar el ritmo del evento.',
    ],
  },
  'saxofonista-para-bodas-en-barcelona': {
    serviceContext:
      'Barcelona es una ciudad mediterránea con bodas urbanas, masías, hoteles singulares y muchas celebraciones de destino donde la estética y la producción están muy cuidadas. En este tipo de bodas suele importar mucho que la música encaje con distintos espacios, timings y perfiles de invitados.',
      logisticsAngle:
        'En Barcelona suele ser clave la coordinación con organizadores de bodas, hoteles, fincas premium y bodas urbanas o de destino con una producción muy cuidada.',
    musicAngle:
      'En Barcelona funciona especialmente bien una propuesta elegante y moderna, con un cóctel muy fino y un tramo final con presencia escénica y mucha energía.',
    bookingAngle:
      'Para bodas en Barcelona suele ayudar mucho concretar si el evento es urbano, de destino o en finca, y si queréis más protagonismo en el cóctel, el banquete o la fiesta.',
      venueStyle: 'organizadores de bodas, hoteles premium, fincas y espacios de boda de Barcelona',
    proofHighlights: [
      'Propuesta muy orientada a bodas urbanas, de destino y celebraciones premium en Barcelona.',
      'Cobertura habitual en Barcelona, Sitges, Mataró y Sant Cugat del Vallès.',
        'Buena coordinación con organizadores, DJs y espacios donde la estética y el ritmo del evento importan mucho.',
    ],
    faqVariants: {
      price:
          'En Barcelona el presupuesto depende bastante del tipo de espacio, del número de intervenciones y de la coordinación técnica que necesite la boda.',
      fit:
        'Sí. En Barcelona el saxo encaja muy bien en bodas urbanas, de destino y celebraciones premium donde se busca una propuesta elegante, moderna y bien integrada.',
      travel:
        'Sí. Trabajo bodas en Barcelona y zonas cercanas como Sitges, Mataró y Sant Cugat del Vallès, adaptando la propuesta a ciudad, costa o finca.',
      timing:
          'En Barcelona conviene reservar con tiempo, especialmente en temporada alta y en bodas con organizador o espacio premium, donde los calendarios se cierran pronto.',
      personalization:
        'Sí. El repertorio se ajusta al estilo de la boda y al tipo de público, tanto si buscáis un cóctel más fino como una fiesta con más presencia escénica.',
    },
  },
  'saxofonista-para-bodas-en-madrid': {
    serviceContext:
        'Madrid es una ciudad con bodas muy variadas: fincas exclusivas, hoteles, espacios urbanos y celebraciones donde la producción y la coordinación con organizadores suelen tener mucho peso. En este tipo de eventos la música necesita integrarse bien en un ritmo cuidado y en varios momentos del día.',
      logisticsAngle:
        'En Madrid suelen pesar mucho la coordinación con organizadores, el nivel técnico del espacio y el encaje exacto entre ceremonia, cóctel, banquete y fiesta.',
    musicAngle:
      'En Madrid funciona muy bien una propuesta versátil que pase de la elegancia del día a una fiesta con mucha presencia, especialmente en formato Saxo + DJ.',
    bookingAngle:
        'En bodas de Madrid ayuda mucho definir desde el principio espacio, organizador, ritmo de cada bloque y si el saxo tendrá un papel más elegante, más festivo o mixto.',
      venueStyle: 'organizadores de bodas, fincas exclusivas, hoteles y espacios premium de Madrid',
    proofHighlights: [
      'Servicio muy adaptado a bodas premium y producciones cuidadas en Madrid.',
      'Cobertura habitual en Madrid, Alcalá de Henares, Pozuelo de Alarcón y San Lorenzo de El Escorial.',
        'Buena coordinación con organizadores, técnicos y DJs cuando el evento exige precisión y presencia escénica.',
    ],
    faqVariants: {
      price:
        'En Madrid el presupuesto depende bastante del tipo de espacio, del número de bloques de actuación y del nivel de coordinación técnica que requiera el evento.',
      fit:
        'Sí. En Madrid el saxo encaja muy bien en bodas donde hay varios momentos marcados y se necesita una propuesta elegante al principio y más potente al final.',
      travel:
          'Sí. Trabajo bodas en Madrid y alrededores, incluyendo zonas como Alcalá de Henares, Pozuelo y San Lorenzo de El Escorial, adaptando montaje y tiempos al espacio.',
      timing:
          'En Madrid conviene consultar disponibilidad cuanto antes, sobre todo en fechas premium y bodas con organizador, porque la demanda suele ser alta.',
      personalization:
        'Sí. El servicio se puede enfocar más a ceremonia y cóctel o ganar peso en banquete y Saxo + DJ, según el papel que queráis dar al directo.',
    },
  },
  'saxofonista-para-bodas-en-malaga': {
    serviceContext:
        'Málaga y la Costa del Sol concentran muchas bodas de destino, celebraciones premium y eventos en espacios junto al mar, fincas y hoteles donde la experiencia del invitado es fundamental. En estas bodas suele haber varios espacios, un cóctel muy visual y una fiesta final con mucha energía.',
      logisticsAngle:
        'En Málaga suelen ser importantes la coordinación con bodas de destino, montajes premium, ritmos de cóctel al atardecer y espacios con mucha producción.',
    musicAngle:
      'En Málaga suele funcionar especialmente bien una propuesta elegante al inicio y muy energética al final, con mucho peso en cóctel, banquete y Saxo + DJ.',
    bookingAngle:
        'Cuando la boda es en Málaga, ayuda mucho saber si es una boda de destino, el tipo de espacio y qué peso tendrá la fiesta final dentro del evento.',
      venueStyle: 'espacios junto al mar, fincas premium, hoteles y espacios de boda de Málaga',
    proofHighlights: [
      'Formato muy trabajado para bodas de destino en Málaga y celebraciones premium en la Costa del Sol.',
      'Cobertura habitual en Málaga, Marbella, Estepona y Nerja.',
        'Buena adaptación a organizadores, DJs y producciones donde la estética y el ambiente del evento importan mucho.',
    ],
    faqVariants: {
      price:
          'En Málaga el presupuesto suele variar según si la boda es de destino, el tipo de espacio, los bloques de actuación y la producción que requiera el lugar.',
        fit:
          'Sí. En Málaga el saxo funciona muy bien en bodas premium, espacios junto al mar, fincas y celebraciones internacionales donde hay varios momentos y mucha importancia del ambiente.',
        travel:
          'Sí. Trabajo bodas en Málaga y alrededores, incluyendo Marbella, Estepona y Nerja, coordinando horarios, montaje y necesidades técnicas con cada espacio.',
        timing:
          'En Málaga conviene reservar con tiempo, especialmente en bodas de destino y en temporada alta, donde organizadores, espacios y proveedores suelen cerrar agenda pronto.',
        personalization:
          'Sí. El repertorio y el formato se adaptan tanto a un cóctel al atardecer elegante como a una barra libre con mucha interacción junto a DJ.',
    },
  },
  'saxofonista-para-bodas-en-palma': {
    serviceContext:
        'Palma y Mallorca son un escenario muy habitual para bodas de destino en hoteles, villas, espacios junto al mar y fincas donde muchos invitados viajan desde fuera y todo se organiza con bastante detalle. En este tipo de celebraciones el ritmo del día, el cóctel al atardecer y la coordinación con el espacio tienen mucho peso.',
      logisticsAngle:
        'En Palma suelen ser importantes la coordinación con organizadores de destino, ritmos muy cerrados y espacios donde el saxo acompaña tanto la ceremonia como el cóctel al atardecer y la fiesta.',
    musicAngle:
      'En Palma funciona especialmente bien una propuesta elegante y mediterránea durante el día, con un cierre más potente para banquete o barra libre.',
    bookingAngle:
      'En bodas de Palma ayuda mucho concretar si la boda es de destino, el tipo de villa, hotel o finca y qué momentos queréis destacar con el saxo.',
      venueStyle: 'hoteles, villas, fincas y espacios junto al mar de Mallorca',
    proofHighlights: [
      'Propuesta orientada a bodas de destino en Palma y celebraciones premium en Mallorca.',
      'Cobertura habitual en Palma, Calvià, Llucmajor y Alcúdia.',
        'Muy buena coordinación con organizadores y espacios donde el ritmo del evento y la experiencia del invitado son clave.',
    ],
    faqVariants: {
      price:
          'En Palma el presupuesto depende mucho del tipo de hotel, finca, villa o espacio junto al mar, del número de momentos de actuación y de la logística propia de la isla.',
        fit:
          'Sí. En Palma el saxo encaja muy bien en bodas de destino y celebraciones premium donde se busca acompañar ceremonia, cóctel al atardecer y una fiesta cuidada.',
        travel:
          'Sí. Trabajo bodas en Palma y en otras zonas de Mallorca como Calvià, Llucmajor y Alcúdia, adaptando la propuesta al ritmo y a la logística del espacio.',
        timing:
          'En Palma conviene reservar con bastante antelación, especialmente en bodas de destino, porque muchas parejas organizan el evento con organizadores y espacios cerrados con tiempo.',
      personalization:
        'Sí. El formato se adapta al estilo de la boda, al tipo de invitados y a si queréis más protagonismo en ceremonia, cóctel, banquete o fiesta final.',
    },
  },
  'saxofonista-para-bodas-en-sevilla': {
    serviceContext:
      'Sevilla es una ciudad donde muchas bodas se celebran en haciendas, fincas y espacios con mucha personalidad, y donde la música suele tener un papel muy marcado en la ceremonia, el aperitivo y la fiesta. En este contexto funciona muy bien una propuesta que combine emoción, elegancia y fuerza final.',
    logisticsAngle:
        'En Sevilla suelen ser importantes las haciendas, las bodas grandes, los organizadores y una muy buena coordinación para que cada bloque del día entre con fuerza.',
    musicAngle:
      'En Sevilla funciona muy bien una combinación de elegancia al principio y mucha energía en la fiesta, con especial peso en entrada al banquete y barra libre.',
    bookingAngle:
      'Para bodas en Sevilla ayuda mucho definir si queréis más protagonismo en cóctel, banquete o fiesta final y qué tipo de montaje necesita el espacio.',
    venueStyle: 'haciendas, hoteles, fincas y espacios de boda de Sevilla',
    proofHighlights: [
      'Servicio muy adaptado a bodas andaluzas, haciendas y celebraciones premium en Sevilla.',
      'Cobertura habitual en Sevilla, Dos Hermanas, Alcalá de Guadaíra y Carmona.',
      'Muy buena respuesta en bodas grandes donde el saxo acompaña ceremonia, aperitivo y una fiesta con mucha energía.',
    ],
    faqVariants: {
      price:
        'En Sevilla el presupuesto suele depender del tipo de hacienda, finca u hotel, de los bloques de actuación y del peso que vaya a tener la fiesta dentro de la boda.',
      fit:
        'Sí. En Sevilla el saxo encaja muy bien cuando buscáis elegancia en ceremonia y cóctel, pero también una entrada al banquete o una barra libre con mucha energía.',
      travel:
        'Sí. Trabajo bodas en Sevilla y alrededores, incluyendo Dos Hermanas, Alcalá de Guadaíra y Carmona, adaptando la propuesta al espacio y al horario real del evento.',
      timing:
        'En Sevilla conviene mirar disponibilidad con tiempo, sobre todo en primavera y otoño, cuando la demanda de bodas en haciendas y fincas suele ser muy alta.',
      personalization:
        'Sí. El repertorio se ajusta al tono de la boda, desde momentos más elegantes y emotivos hasta una fiesta muy animada junto a DJ.',
    },
  },
  'saxofonista-para-bodas-en-valencia': {
    serviceContext:
      'Valencia es una ciudad mediterránea con bodas en fincas, hoteles y espacios urbanos donde el cóctel, los cambios de ambiente y la transición hacia la fiesta suelen estar muy trabajados. En este tipo de celebraciones la música tiene que ayudar a unir elegancia, dinamismo y buen ritmo durante todo el día.',
    logisticsAngle:
        'En Valencia suelen pesar mucho las fincas mediterráneas, los espacios de ciudad, el ritmo del cóctel y la coordinación técnica con DJs y organizadores.',
    musicAngle:
      'En Valencia encaja muy bien una propuesta mediterránea con un cóctel fluido y una fiesta final muy dinámica para que el saxo tenga recorrido durante todo el día.',
    bookingAngle:
      'Cuando la boda es en Valencia, ayuda mucho definir tipo de espacio, bloques de actuación y si la fiesta va a tener un papel muy protagonista.',
      venueStyle: 'fincas, hoteles, espacios urbanos y espacios de boda de Valencia',
    proofHighlights: [
      'Formato muy adaptado a bodas mediterráneas y celebraciones con ritmo en Valencia.',
      'Cobertura habitual en Valencia, Paterna, Torrent y Sagunto.',
        'Buena coordinación con organizadores, espacios y DJs para que el saxo acompañe desde ceremonia hasta barra libre.',
    ],
    faqVariants: {
      price:
        'En Valencia el presupuesto depende del tipo de finca u hotel, del número de bloques de actuación y de si queréis reforzar más el cóctel, el banquete o la fiesta.',
      fit:
        'Sí. En Valencia el saxo encaja muy bien cuando buscáis una boda con elegancia al principio, un cóctel con ritmo y una barra libre con mucha vida.',
      travel:
          'Sí. Trabajo bodas en Valencia y zonas cercanas como Paterna, Torrent y Sagunto, coordinando montaje, tiempos y necesidades del espacio.',
      timing:
          'En Valencia conviene reservar con margen, especialmente en fechas de alta demanda y en bodas donde participan varios proveedores y organizadores.',
      personalization:
        'Sí. El repertorio y el formato se adaptan muy bien a bodas mediterráneas, espacios con varios ambientes y celebraciones que mezclan elegancia y fiesta.',
    },
  },
  'saxofonista-para-bodas-en-valladolid': {
    serviceContext:
      'Valladolid reúne bodas en fincas, hoteles y espacios más tranquilos donde suele valorarse mucho una propuesta elegante, cercana y bien medida. En estas celebraciones funciona especialmente bien un directo que acompañe el aperitivo y gane presencia poco a poco hacia la fiesta.',
    logisticsAngle:
      'En Valladolid suelen importar mucho la finura del cóctel, la facilidad de montaje en fincas y la flexibilidad para adaptarse al ritmo real del evento.',
    musicAngle:
      'En Valladolid funciona muy bien un servicio que acompañe con elegancia el día y gane intensidad cuando llega la entrada al banquete o la fiesta.',
    bookingAngle:
      'En bodas de Valladolid conviene definir pronto si el servicio estará más centrado en aperitivo, banquete, fiesta o una combinación de varios bloques.',
    venueStyle: 'fincas, hoteles y espacios de boda de Valladolid',
    proofHighlights: [
      'Propuesta equilibrada para bodas en Valladolid donde se busca elegancia, cercanía y un final de fiesta con más ritmo.',
      'Cobertura habitual en Valladolid, Tordesillas, Medina del Campo y Arroyo de la Encomienda.',
        'Muy buena adaptación a fincas cercanas, organizadores y bodas donde el saxo acompaña varios momentos del día.',
    ],
  },
  'saxofonista-para-bodas-en-zaragoza': {
    serviceContext:
      'Zaragoza mezcla bodas urbanas y celebraciones en finca donde suele importar mucho que la música acompañe bien desde el cóctel hasta la fiesta final. En este tipo de eventos encaja muy bien una propuesta que arranque elegante y termine con más energía cuando el ambiente lo pide.',
    logisticsAngle:
      'En Zaragoza suelen tener peso los espacios urbanos, las fincas y la necesidad de que el servicio se integre bien en cóctel, cena y fiesta.',
    musicAngle:
      'En Zaragoza funciona muy bien un servicio que empiece con un tono elegante y termine con una parte más potente para barra libre o Saxo + DJ.',
    bookingAngle:
      'Para bodas en Zaragoza ayuda mucho concretar fecha, espacio, si habrá DJ y qué momento queréis reforzar más con el directo.',
    venueStyle: 'fincas, hoteles y espacios de boda de Zaragoza',
    proofHighlights: [
      'Servicio orientado a bodas urbanas y de finca en Zaragoza con un final de fiesta muy trabajado.',
      'Cobertura habitual en Zaragoza, Utebo, Cuarte de Huerva y La Muela.',
        'Buena coordinación con espacios y DJs cuando el saxo acompaña varias fases del día.',
    ],
  },
};

export const allLocations = seeds
  .map(createLocation)
  .map((location) => ({
    ...location,
    ...(locationOverrides[location.slug] ?? {}),
  }));

export const launchedLocations = allLocations.filter(
  (location) => location.rolloutPhase <= ACTIVE_ROLLOUT_PHASE,
);

export const getLocationBySlug = (slug: string) =>
  allLocations.find((location) => location.slug === slug);

export const getLaunchedLocations = () => launchedLocations;

export const getEnglishLocationName = (location: LocationEntry) => {
  const englishNames: Record<string, string> = {
    Málaga: 'Malaga',
    Palma: 'Mallorca',
    Sevilla: 'Seville',
  };

  return englishNames[location.city] ?? location.city;
};

export const getEnglishLocationSlug = (location: LocationEntry) =>
  `saxophonist-${slugify(getEnglishLocationName(location))}`;

export const getLocationByEnglishSlug = (slug: string) =>
  allLocations.find((location) => getEnglishLocationSlug(location) === slug);
