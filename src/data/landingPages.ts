import { BUSINESS, absoluteUrl, buildWhatsAppHref } from '../lib/site';
import type { LocationEntry } from './locations';
import { getLaunchedLocations } from './locations';

export interface LandingLink {
  href: string;
  label: string;
  description: string;
}

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingTestimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface LandingVideo {
  title: string;
  platform: 'youtube' | 'instagram';
  url: string;
  description: string;
}

export interface RepertoireCategory {
  title: string;
  songs: string[];
}

export interface WeddingPack {
  name: string;
  tagline: string;
  bullets: string[];
}

export interface AnswerCard {
  title: string;
  body: string;
}

export interface LandingPageData {
  type: 'home' | 'city';
  title: string;
  description: string;
  canonicalPath: string;
  heroTitle: string;
  heroLabel: string;
  heroSummary: string;
  heroBody: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  introTitle: string;
  introParagraphs: string[];
  trustPoints: string[];
  serviceTitle: string;
  serviceDescription: string;
  moments: Array<{ title: string; description: string }>;
  extrasTitle: string;
  extras: string[];
  answerBlockTitle: string;
  answerBlockIntro: string;
  answerCards: AnswerCard[];
  serviceTypes: string[];
  packsTitle: string;
  packsIntro: string;
  packs: WeddingPack[];
  packPreviewImages: string[];
  repertoireTitle: string;
  repertoireIntro: string;
  repertoireCategories: RepertoireCategory[];
  repertoireDownloadLabel: string;
  repertoireDownloadHref: string;
  repertoirePreviewImages: string[];
  videosTitle: string;
  videosIntro: string;
  videos: LandingVideo[];
  citiesTitle: string;
  citiesIntro: string;
  cityLinks: LandingLink[];
  cityCoverageBullets: string[];
  testimonialsTitle: string;
  testimonialsDescription: string;
  testimonials: LandingTestimonial[];
  faqTitle: string;
  faqs: LandingFaq[];
  contactTitle: string;
  contactDescription: string;
  contactHighlight: string;
  formSubject: string;
  whatsappHref: string;
  breadcrumb?: { label: string; href: string }[];
}

const sharedTestimonials: LandingTestimonial[] = [
  {
    name: 'Jessica Valdes',
    role: 'Boda',
    quote:
      'Muy recomendado, Benito tocó en nuestra boda y a todo el mundo le encantó, no querían irse a cenar de lo bien que lo pasaron. Se adaptó a nuestras propuestas e ideas y todo salió genial.',
    avatar: 'jessica-valdes',
  },
  {
    name: 'Nicolás Rodríguez Carmona',
    role: 'Celebración',
    quote:
      'Todo un acierto contar con Benito en la celebración. Chico muy amable y súper enrollado que sabe cómo animar una fiesta. Estuvimos encantados, muy recomendable.',
    avatar: 'nicolas-rodriguez-carmona',
  },
  {
    name: 'Rafael Valero Agullo',
    role: 'Evento',
    quote:
      'Benito se metió a la gente en el bolsillo, muy bien su actuación, consiguió lo que yo buscaba y me sorprendió para bien.',
    avatar: 'rafael-valero-agullo',
  },
  {
    name: 'Vincent Sexton',
    role: 'Evento privado',
    quote:
      'Absolutely first class... played for 2 hours!! Highly recommend.',
    avatar: 'vincent-sexton',
  },
  {
    name: 'Eva Pelegrin',
    role: 'Boda',
    quote:
      'Coincidí con él en una boda y fue un espectáculo. Animó a los invitados, se adaptó a los novios y transmitió una energía y un buen rollo que nos dejó a todos atónitos. Espero volver a coincidir con él, en algún otro evento, porque llevarlo es garantía de éxito!!',
    avatar: 'eva-pelegrin',
  },
  {
    name: 'Karen',
    role: 'Boda',
    quote:
      'Excelente servicio. Me encantó, lo flexible que fue en cuanto al horario y el precio, le dio un toque muy especial a la boda, fue un momento maravilloso, mil gracias por formar parte de nuestro día.',
    avatar: 'karen',
  },
  {
    name: 'Betty',
    role: 'Boda',
    quote:
      'Benito fue muy profesional y un gran músico, nos encantó su actuación, lo recomendaría con los ojos cerrados, la boda se retrasó y fue muy paciente, la experiencia 1000000000000/10 no lo dudes y contrátalo.',
    avatar: 'betty',
  },
  {
    name: 'Jack',
    role: 'Boda',
    quote:
      'Increíble artista y profesional. La comunicación con Benito fue muy profesional y tuvimos un par de cambios de horario y él fue muy comprensible. También muy amable con la selección de canciones y una variedad para todos los públicos. Lo contrataría para todo tipo de celebraciones. Un hombre muy amable y nos hizo el día aún más especial.',
    avatar: 'jack',
  },
  {
    name: 'Yolanda',
    role: 'Boda',
    quote:
      'Un profesional de 10. Súper contentos con el trabajo de este chico. Un profesional de los pies a la cabeza. A los invitados les encantó como amenizó el cóctel.',
    avatar: 'yolanda',
  },
];

const sharedMoments = [
  {
    title: 'Ceremonia',
    description:
      'Versiones emotivas para entradas, firmas o momentos clave sin romper el ritmo de la ceremonia.',
  },
  {
    title: 'Cóctel',
    description:
      'Saxo en directo para crear ambiente, conectar con los invitados y elevar el aperitivo con repertorio sofisticado y actual.',
  },
  {
    title: 'Banquete',
    description:
      'Intervenciones puntuales para entradas especiales, sorpresas y momentos del banquete que merecen un punto más memorable.',
  },
  {
    title: 'Barra libre y Saxo + DJ',
    description:
      'Actuación con energía para la fiesta final, coordinada con DJ o sonido del espacio para mantener la pista viva.',
  },
];

const sharedExtras = [
  'Repertorio adaptable a estilos elegantes, house, versiones, hits comerciales y fiesta final.',
  'Coordinación con wedding planners, DJs, fincas, hoteles y equipos técnicos del lugar.',
  'Desplazamiento para bodas en capitales de provincia de la Península y Baleares.',
  'Formato pensado para que cada bloque de la boda tenga su propia energía sin perder coherencia.',
];

const sharedServiceTypes = [
  'Ceremonia',
  'Cóctel',
  'Banquete',
  'Barra libre',
  'Saxo + DJ',
];

const buildHomeAnswerCards = (): AnswerCard[] => [
  {
    title: 'Qué hace Benito González Sax',
    body:
      'Ofrece saxo en directo para bodas y eventos, con formatos pensados para ceremonia, cóctel, banquete, barra libre y sesiones con DJ.',
  },
  {
    title: 'Dónde trabaja',
    body:
      'Trabaja bodas en capitales de provincia de la Península y Baleares, adaptando la propuesta al lugar, la fecha y el tipo de celebración.',
  },
  {
    title: 'Qué formatos ofrece',
    body:
      'Puede actuar solo sobre bases, coordinarse con wedding planners y espacios, o integrarse en un formato Saxo + DJ más potente para la fiesta.',
  },
  {
    title: 'Cómo pedir presupuesto',
    body:
      'La forma más rápida es enviar fecha, ciudad, lugar y momentos de actuación por formulario o WhatsApp para recibir una propuesta realista.',
  },
];

const buildCityAnswerCards = (location: LocationEntry): AnswerCard[] => [
  {
    title: `Qué ofrece en ${location.city}`,
    body: `Saxo en directo para bodas en ${location.city} con servicio adaptable a ceremonia, cóctel, banquete, barra libre y formato Saxo + DJ.`,
  },
  {
    title: `Dónde trabaja en ${location.province}`,
    body: `Cubre bodas en ${location.city}, ${location.province} y zonas cercanas como ${location.nearbyAreas.join(', ')}.`,
  },
  {
    title: 'Qué tipo de formato encaja mejor',
    body: `El formato está pensado para ${location.serviceAngle}, ajustando repertorio, intensidad y coordinación técnica según el evento.`,
  },
  {
    title: `Cómo reservar en ${location.city}`,
    body: `Con fecha, lugar y momentos de actuación definidos, se puede pedir presupuesto para ${location.city} por formulario, email o WhatsApp.`,
  },
];

const sharedWeddingPacks: WeddingPack[] = [
  {
    name: 'Premium',
    tagline: 'Una actuación más allá de la carta',
    bullets: [
      'Elige tus canciones favoritas, estén dentro del repertorio o no.',
      'Personaliza al máximo tu evento, con opción de saxo con leds incluida.',
      'Entradas, sorpresas, detalles y momentos especiales incluidos para que todo se sienta más vuestro.',
      'Si el repertorio de la actuación es una de tus mayores preocupaciones, este es tu pack.',
    ],
  },
  {
    name: 'Básico',
    tagline: 'Un menú delicioso de actuación',
    bullets: [
      'Elige el estilo que necesites para tu evento, aunque no el repertorio concreto.',
      'Actuación dentro de la carta de repertorio, con saxo con leds y otras personalizaciones disponibles como extra.',
      'Una opción pensada para quien quiere disfrutar de un buen concierto a buen precio, sin complicarse con tanta personalización.',
    ],
  },
];

const sharedVideos: LandingVideo[] = [
  {
    title: 'Flying Free en boda',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=Ent8OtW2DKU',
    description: 'Clásico de remember en boda con un enfoque potente para elevar la fiesta.',
  },
  {
    title: 'Destination Calabria en boda',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=hILiOtCMEBA',
    description: 'Temazo de saxo en directo con energía para cóctel o barra libre.',
  },
  {
    title: 'Titanium - David Guetta',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=Gq-AV9kIV-4',
    description: 'Canción épica de David Guetta tocada en un evento corporativo.',
  },
  {
    title: 'Versiones y House',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=HsD3AflaXnk',
    description: 'Selección musical para bodas modernas, beach clubs y fiestas.',
  },
  {
    title: 'Viva la Vida - Coldplay',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/xdaxq8prjeQ',
    description: 'Entrada a cóctel con el clásico de Coldplay Viva La Vida.',
  },
  {
    title: 'El fin del mundo - La La Love You',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/OYBTzqE-wv0',
    description: 'Tema moderno y actual con gran energía para animar a todos los invitados.',
  },
  {
    title: 'Entrada a banquete con We found Love',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/cxNwwvrbJI8',
    description:
      'Energía, cercanía, ambiente y un momento inolvidable para la entrada del banquete de boda.',
  },
  {
    title: 'Si antes te hubiera conocido - Karol G',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/OgdHranFOTE',
    description: 'Canción actual para bailar y animar la boda.',
  },
  {
    title: 'Será Por Que te Amo - Remix',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/xc1HRWgJVI4',
    description: 'Tema épico ya clásico en todas las bodas modernas.',
  },
];

const sharedRepertoireCategories: RepertoireCategory[] = [
  {
    title: 'Ceremonia',
    songs: [
      'La vie en rose',
      'La Vita è Bella',
      'Stand by Me',
      'Perfect - Ed Sheeran',
      'A Thousand Years',
      'Hallelujah',
      'Ave María',
      'For the Love of a Princess',
      'Sky Full of Stars',
      'The Moment - Kenny G',
      'Viva la Vida - Coldplay',
    ],
  },
  {
    title: 'Jazz, Boleros y Bossa Nova',
    songs: [
      'All the Things You Are',
      'Fly Me to the Moon',
      'Take Five',
      'Blue Bossa',
      'Almost Blue',
      'Autumn Leaves',
      'Hit the Road Jack',
      'Stand by Me',
      'Money - Pink Floyd',
      'Just the Two of Us',
      'Careless Whisper',
      'Baker Street',
      'Lambada',
      'La Vita è Bella',
      'Calm Down',
      'Wave',
      'Garota de Ipanema',
      'Desafinado',
      'Chega de Saudade',
      'Triste',
      'Sabor a Mí',
      'Dos Gardenias',
      'Es la historia de un amor',
      'Bésame Mucho',
      'Si tú me dices ven',
      'Toda una vida',
      'La mentira',
    ],
  },
  {
    title: 'EDM, Pop y Fiesta',
    songs: [
      'Titanium - David Guetta',
      'Levels - Avicii',
      'Destination Calabria',
      'We Found Love - Rihanna',
      'Freed From Desire - Gala',
      'Viva la Vida - Coldplay',
      'Stereo Love',
      'On the Floor - Pitbull',
      'Give Me Everything Tonight',
      'Don’t You Worry Child',
      'Payphone - Maroon 5',
      'Wake Me Up - Avicii',
      'Baila Conmigo',
      'Pepas - Farruko',
      'El fin del mundo - La La Love You',
      'Si antes te hubiera conocido - Karol G',
      'La Morocha - Luck Ra',
      'I’m Good - David Guetta',
      'Infinity - Guru Josh',
      'Safe and Sound - Capital Cities',
    ],
  },
];

const repertoirePreviewImages = [
  '/repertoire/1.svg',
  '/repertoire/2.svg',
  '/repertoire/3.svg',
  '/repertoire/4.svg',
  '/repertoire/5.svg',
];

const packPreviewImages = ['/packs/premium.svg', '/packs/basico.svg'];

const sharedHomeFaqs: LandingFaq[] = [
  {
    question: '¿Qué incluye el servicio de saxofonista para bodas?',
    answer:
      'Puedo actuar en ceremonia, cóctel, entrada al banquete, momentos especiales y barra libre, adaptando el formato a lo que necesite vuestra boda.',
  },
  {
    question: '¿Cuánto cuesta contratar a un saxofonista para una boda?',
    answer:
      'El precio depende de la ciudad, el desplazamiento, la duración, los momentos de la boda en los que quieras saxo y si el formato es solo o junto a DJ. La mejor forma de recibir una cifra realista es pedir presupuesto con fecha, lugar y tipo de servicio.',
  },
  {
    question: '¿Es apropiado tocar el saxofón en una boda?',
    answer:
      'Sí. El saxo encaja muy bien en bodas porque puede aportar elegancia, emoción y también energía, según el momento. Funciona especialmente bien en ceremonia, cóctel, entrada al banquete y barra libre.',
  },
  {
    question: '¿Trabajas solo o junto a DJ?',
    answer:
      'Puedo trabajar solo con backing tracks o coordinarme con DJ y sonido del espacio para un formato Saxo + DJ más potente durante la fiesta.',
  },
  {
    question: '¿En qué zonas trabajas?',
    answer:
      'Estoy disponible para bodas en Murcia, Alicante, Madrid, Valencia, Barcelona, Sevilla, Málaga, Zaragoza, Palma, Valladolid y otras capitales de provincia de la Península y Baleares.',
  },
  {
    question: '¿Cómo se solicita presupuesto?',
    answer:
      'Podéis rellenar el formulario con fecha, ciudad y tipo de servicio, o contactar por teléfono, email o WhatsApp para revisar disponibilidad.',
  },
];

const buildCityFaqs = (location: LocationEntry): LandingFaq[] => [
  {
    question: '¿Cuánto cuesta contratar a un saxofonista para una boda?',
    answer: `El precio puede variar según la fecha, el lugar, el desplazamiento hasta ${location.city}, la duración y si quieres uno o varios momentos de actuación. Si me compartes esos datos, puedo darte un presupuesto realista para tu boda en ${location.city}.`,
  },
  {
    question: '¿Es apropiado tocar el saxofón en una boda?',
    answer: `Sí. En ${location.city} muchas parejas buscan saxo en directo porque encaja muy bien en ceremonia, cóctel, entrada al banquete y fiesta. Es un formato elegante, versátil y muy agradecido para invitados de diferentes edades.`,
  },
  {
    question: `¿Te desplazas para bodas en ${location.city} y alrededores?`,
    answer: `Sí. Trabajo bodas en ${location.city}, ${location.province} y zonas cercanas como ${location.nearbyAreas.join(', ')}, ajustando la propuesta al horario y al espacio de la celebración.`,
  },
  {
    question: `¿Puedo contratar saxo para cóctel y barra libre en ${location.city}?`,
    answer: `Sí. Es uno de los formatos más solicitados en ${location.city}: un bloque elegante para el cóctel y un segundo tramo más potente para la fiesta, con saxo en directo sobre bases o junto a DJ.`,
  },
  {
    question: `¿Con cuánta antelación conviene reservar en ${location.city}?`,
    answer: `Lo ideal es consultar disponibilidad en cuanto tengáis fecha y lugar, especialmente para primavera, verano y sábados de alta demanda en ${location.city}.`,
  },
  {
    question: `¿Se puede personalizar el repertorio para vuestra boda en ${location.city}?`,
    answer: `Sí. Ajusto el repertorio al estilo del evento y a los momentos clave de la boda para que la música encaje con la energía y la identidad de vuestra celebración en ${location.city}.`,
  },
];

const buildHomeCityLinks = (): LandingLink[] =>
  getLaunchedLocations().map((location) => ({
    href: `/${location.slug}`,
    label: location.city,
    description: `${location.city}, ${location.province}`,
  }));

const buildNearbyLinks = (location: LocationEntry): LandingLink[] => {
  const launchedMap = new Map(
    getLaunchedLocations().map((entry) => [entry.slug, entry] as const),
  );

  return location.relatedSlugs
    .map((slug) => launchedMap.get(slug))
    .filter((entry): entry is LocationEntry => Boolean(entry))
    .map((entry) => ({
      href: `/${entry.slug}`,
      label: entry.city,
      description: `Saxofonista para bodas en ${entry.city}`,
    }));
};

export const buildHomePageData = (): LandingPageData => ({
  type: 'home',
  title: 'Saxofonista para bodas | Benito González Sax',
  description:
    'Saxofonista para bodas en España. Benito González Sax ofrece música en directo para ceremonia, cóctel, banquete y barra libre con presupuesto personalizado.',
  canonicalPath: '/',
  heroTitle: 'Saxofonista para bodas',
  heroLabel: 'Música en directo para bodas en España',
  heroSummary: 'Saxofonista para bodas en toda España.',
  heroBody:
    'Benito González ayuda a parejas a montar una boda inolvidable con saxo en directo.',
  primaryCtaLabel: 'Solicitar presupuesto',
  primaryCtaHref: '#contacto',
  secondaryCtaLabel: 'Ver vídeos',
  secondaryCtaHref: '#videos',
  introTitle: 'Saxo para bodas en España para momentos que de verdad se recuerdan',
  introParagraphs: [
    'Benito González pone el saxo en directo al servicio de bodas que quieren emocionar, sorprender y dejar un recuerdo potente en cada momento importante.',
    'Desde la ceremonia hasta la barra libre, la música se adapta al estilo de la pareja y al ritmo real de la celebración para que todo fluya de forma natural.',
  ],
  trustPoints: [
    'Más de 10 años de experiencia actuando en bodas, eventos privados y celebraciones de marca.',
    'Formato adaptable a bodas elegantes, bodas de destino y celebraciones con Saxo + DJ.',
    'Disponible para bodas en ciudades de la Península y Baleares, con desplazamiento según fecha y lugar del evento.',
  ],
  serviceTitle: 'Servicios para cada momento de la boda',
  serviceDescription:
    'Un servicio pensado para acompañar la boda desde los momentos más elegantes hasta la parte más animada, con un formato flexible y fácil de adaptar al ritmo del evento.',
  moments: sharedMoments,
  extrasTitle: '¿Cuál es mi propuesta para bodas o eventos?',
  extras: sharedExtras,
  answerBlockTitle: 'Respuesta rápida sobre el servicio',
  answerBlockIntro:
    'Un resumen directo para parejas, buscadores y asistentes que necesitan entender rápido qué ofrece Benito González Sax y cómo reservar.',
  answerCards: buildHomeAnswerCards(),
  serviceTypes: sharedServiceTypes,
  packsTitle: 'Packs para boda',
  packsIntro:
    'Dos formas de enfocar la actuación según el nivel de personalización que queráis para vuestra boda. Así podéis elegir el pack que mejor encaja con vuestro evento, vuestro repertorio ideal y vuestro presupuesto.',
  packs: sharedWeddingPacks,
  packPreviewImages,
  repertoireTitle: 'Repertorio adaptable para cada momento',
  repertoireIntro:
    'Una selección de canciones orientativa para ceremonia, cóctel, momentos elegantes y fiesta. El repertorio se adapta al estilo de la boda, al ambiente que queréis crear y al formato del evento.',
  repertoireCategories: sharedRepertoireCategories,
  repertoireDownloadLabel: 'Descargar repertorio en PDF',
  repertoireDownloadHref: '/downloads/repertorio-benito-gonzalez-sax.pdf',
  repertoirePreviewImages,
  videosTitle: 'Vídeos en directo',
  videosIntro:
    'Vídeos en directo de bodas reales, cóctel, entrada a cóctel, banquete, barra libre, entrada a banquete y más.',
  videos: sharedVideos,
  citiesTitle: 'Buscar saxofonista para bodas por ciudad',
  citiesIntro:
    'Si quieres ver información más específica según la ciudad de tu boda, aquí tienes una selección de ubicaciones donde ya está disponible el servicio.',
  cityLinks: buildHomeCityLinks(),
  cityCoverageBullets: [],
  testimonialsTitle: 'Opiniones sobre el servicio',
  testimonialsDescription:
    'Experiencias reales de parejas y clientes que ya han contado con Benito para bodas, celebraciones y eventos.',
  testimonials: sharedTestimonials,
  faqTitle: 'Preguntas frecuentes antes de contratar saxofonista para bodas',
  faqs: sharedHomeFaqs,
  contactTitle: 'Solicita presupuesto para tu boda',
  contactDescription:
    'Cuanto más contexto nos deis sobre fecha, ciudad, lugar y momento de la actuación, más fácil será dar una propuesta realista y una respuesta rápida.',
  contactHighlight:
    'También puedes llamar o escribir por WhatsApp si prefieres una vía más directa.',
  formSubject: 'Solicitud de presupuesto - Saxofonista para bodas',
  whatsappHref: buildWhatsAppHref(
    'Hola Benito, quiero pedir presupuesto para mi boda. Te escribo desde la página general de saxofonista para bodas.',
  ),
});

export const buildCityPageData = (location: LocationEntry): LandingPageData => ({
  type: 'city',
  title: `Saxofonista para bodas en ${location.city} | Benito González Sax`,
  description: `Saxofonista para bodas en ${location.city}. Música en directo para ceremonia, cóctel, banquete y barra libre con presupuesto personalizado y cobertura en ${location.province}.`,
  canonicalPath: `/${location.slug}`,
  heroTitle: `Saxofonista para bodas en ${location.city}`,
  heroLabel: `${location.city}, ${location.province}`,
  heroSummary: `Saxofonista para bodas en ${location.city}.`,
  heroBody: `Benito González ayuda a parejas de ${location.city} a montar una boda inolvidable con saxo en directo.`,
  primaryCtaLabel: 'Consultar disponibilidad',
  primaryCtaHref: '#contacto',
  secondaryCtaLabel: 'Ver vídeos',
  secondaryCtaHref: '#videos',
  introTitle: `Música en directo para bodas en ${location.city}`,
  introParagraphs: [
    `Si estás buscando un saxofonista para bodas en ${location.city}, aquí puedes ver una propuesta pensada para acompañar desde los momentos más elegantes hasta la parte más animada del evento.`,
    `La música en directo se adapta al estilo de la pareja, al lugar de la celebración y al tipo de ambiente que queréis crear en ${location.city}.`,
  ],
  trustPoints: [
    `Cobertura habitual en ${location.city} y zonas cercanas como ${location.nearbyAreas.join(', ')}.`,
    `Formato adaptable a ceremonia, cóctel, banquete, barra libre y servicio Saxo + DJ en ${location.city}.`,
    `Propuesta pensada para adaptarse a wedding planners, fincas, hoteles y espacios de boda de ${location.province}.`,
  ],
  serviceTitle: `Cómo se vive el saxo en una boda en ${location.city}`,
  serviceDescription: `Cada boda es distinta, por eso el servicio se adapta al estilo del evento, al espacio y a los momentos que queréis destacar en ${location.city} y alrededores.`,
  moments: sharedMoments,
  extrasTitle: `Claves del servicio en ${location.city}`,
  extras: [
    ...sharedExtras,
    `Cobertura local y zonas cercanas: ${location.nearbyAreas.join(', ')}.`,
  ],
  answerBlockTitle: `Respuesta rápida para bodas en ${location.city}`,
  answerBlockIntro: `Datos claros para entender rápido qué ofrece Benito González Sax en ${location.city}, cómo trabaja y cómo reservar.`,
  answerCards: buildCityAnswerCards(location),
  serviceTypes: sharedServiceTypes,
  packsTitle: `Packs para boda en ${location.city}`,
  packsIntro: `Dos packs para que podáis elegir en ${location.city} entre una propuesta más cerrada basada en repertorio y otra más personalizada, pensada para entradas, sorpresas y canciones concretas.`,
  packs: sharedWeddingPacks,
  packPreviewImages,
  repertoireTitle: `Repertorio para bodas en ${location.city}`,
  repertoireIntro:
    'Una selección de canciones para que puedas ver el tipo de repertorio disponible en ceremonia, cóctel, momentos elegantes y fiesta. Siempre se adapta al estilo real de la boda.',
  repertoireCategories: sharedRepertoireCategories,
  repertoireDownloadLabel: 'Descargar repertorio en PDF',
  repertoireDownloadHref: '/downloads/repertorio-benito-gonzalez-sax.pdf',
  repertoirePreviewImages,
  videosTitle: `Vídeos de saxo para bodas en ${location.city}`,
  videosIntro:
    'Una selección de vídeos reales para que puedas ver cómo suena y cómo se vive el directo antes de pedir presupuesto.',
  videos: sharedVideos,
  citiesTitle: `Otras ciudades relacionadas con el servicio desde ${location.city}`,
  citiesIntro:
    buildNearbyLinks(location).length > 0
      ? 'Si también estáis valorando otras localizaciones, aquí tenéis ciudades cercanas o relacionadas que ya cuentan con información específica.'
      : 'Si todavía no tenéis cerrada la ciudad, también podéis volver a la página principal para ver la propuesta general.',
  cityLinks: buildNearbyLinks(location),
  cityCoverageBullets: [],
  testimonialsTitle: `Opiniones y confianza para bodas en ${location.city}`,
  testimonialsDescription: `Opiniones reales de clientes y parejas que ayudan a entender cómo se vive el servicio en una boda.`,
  testimonials: sharedTestimonials.map((testimonial) => ({
    ...testimonial,
    role: testimonial.role === 'Boda' ? location.testimonialTag : testimonial.role,
  })),
  faqTitle: `FAQ sobre contratar saxofonista para bodas en ${location.city}`,
  faqs: buildCityFaqs(location),
  contactTitle: `Pide presupuesto para tu boda en ${location.city}`,
  contactDescription: `Comparte fecha, lugar, ciudad y el momento de la boda en el que quieres el saxo. Así podré darte una propuesta para ${location.city} y alrededores.`,
  contactHighlight: `Si ya tenéis fecha y lugar, WhatsApp suele ser la vía más rápida para revisar disponibilidad en ${location.city}.`,
  formSubject: `Solicitud de presupuesto - Boda en ${location.city}`,
  whatsappHref: buildWhatsAppHref(
    `Hola Benito, quiero pedir presupuesto para una boda en ${location.city}.`,
  ),
  breadcrumb: [
    { label: 'Saxofonista para bodas', href: '/' },
    {
      label: `Saxofonista para bodas en ${location.city}`,
      href: `/${location.slug}`,
    },
  ],
});
