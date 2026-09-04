import type {
  AnswerCard,
  LandingFaq,
  LandingLink,
  LandingPageData,
  LandingServiceCard,
  LandingTestimonial,
  LandingVideo,
  RepertoireCategory,
  WeddingPack,
} from './landingPages';
import type { LocationEntry } from './locations';
import {
  getEnglishLocationName,
  getEnglishLocationSlug,
  getLaunchedLocations,
} from './locations';
import { buildWhatsAppHref } from '../lib/site';

interface EnglishCityProfile {
  intro: string;
  logistics: string;
  music: string;
  venueStyle: string;
  nearbyContext: string;
  fit: string;
  booking: string;
}

const englishCityProfiles: Record<string, EnglishCityProfile> = {
  'saxofonista-para-bodas-en-alicante': {
    intro:
      'Alicante is a Mediterranean wedding destination with sea-view venues, inland estates and celebrations where the cocktail hour often sets the tone for the whole day.',
    logistics:
      'The proposal adapts well to outdoor ceremonies, coastal venues, hotels and private estates where timing, sound and guest flow matter.',
    music:
      'Live saxophone can move from elegant ceremony moments to a warmer cocktail set and a more energetic open-bar performance.',
    venueStyle: 'coastal venues, inland estates, hotels and destination weddings in Alicante',
    nearbyContext: 'Elche, Benidorm, Altea and other nearby areas of the province',
    fit:
      'In Alicante, saxophone works especially well when the wedding moves between outdoor spaces, sea-view cocktails and a more festive final part.',
    booking:
      'For Alicante weddings, it helps to know the venue, schedule, outdoor setup and whether you want saxophone for one moment or several parts of the day.',
  },
  'saxofonista-para-bodas-en-almeria': {
    intro:
      'Almeria is a Mediterranean wedding location shaped by bright light, dry climate, terraces, hotels and open-air venues near the sea or across the province.',
    logistics:
      'The service adapts to outdoor ceremonies, hotel weddings, coastal terraces and estates where timing, sound setup and guest flow are especially important.',
    music:
      'Live saxophone can begin with an elegant ceremony or cocktail atmosphere and then grow into a more interactive banquet, open-bar or Sax + DJ moment.',
    venueStyle: 'hotels, terraces, estates, coastal spaces and Mediterranean weddings in Almeria',
    nearbyContext: 'Roquetas de Mar, El Ejido, Aguadulce and nearby areas of the province',
    fit:
      'In Almeria, saxophone works especially well for Mediterranean weddings that move through outdoor spaces and need a balance of elegance, atmosphere and party energy.',
    booking:
      'For Almeria weddings, it helps to share the date, venue, whether the performance is indoors or outdoors, and which moments you want to highlight with live saxophone.',
  },
  'saxofonista-para-bodas-en-barcelona': {
    intro:
      'Barcelona combines urban weddings, destination celebrations, boutique hotels and masias where design, production and guest experience are usually very important.',
    logistics:
      'The service is designed to coordinate smoothly with wedding planners, hotels, premium estates and city venues with carefully planned timings.',
    music:
      'A modern saxophone set can bring elegance to the cocktail hour and stronger stage presence when the party begins.',
    venueStyle: 'urban venues, masias, premium hotels and destination weddings in Barcelona',
    nearbyContext: 'Sitges, Mataro, Sant Cugat del Valles and the Barcelona area',
    fit:
      'In Barcelona, saxophone is a strong fit for couples looking for a polished, modern and flexible live performance.',
    booking:
      'For Barcelona weddings, it is useful to define if the event is urban, coastal or in an estate, and which moments need the strongest musical impact.',
  },
  'saxofonista-para-bodas-en-madrid': {
    intro:
      'Madrid has a very diverse wedding scene, from exclusive estates and hotels to urban venues where production, timing and coordination are usually key.',
    logistics:
      'The proposal adapts to planner-led weddings, technical schedules, multiple suppliers and venues where every transition needs to feel precise.',
    music:
      'Live saxophone can start with a sophisticated tone and grow into a more powerful Sax + DJ format for the final party.',
    venueStyle: 'exclusive estates, hotels, urban venues and premium weddings in Madrid',
    nearbyContext: 'Alcala de Henares, Pozuelo, San Lorenzo de El Escorial and the Madrid area',
    fit:
      'In Madrid, saxophone works very well for weddings with several marked moments and a high level of production.',
    booking:
      'For Madrid weddings, it helps to share the venue, planner details, schedule and whether the saxophone should be elegant, festive or both.',
  },
  'saxofonista-para-bodas-en-malaga': {
    intro:
      'Malaga and the Costa del Sol are known for destination weddings, sea-view venues, premium estates and celebrations where the guest experience is central.',
    logistics:
      'The service adapts to international weddings, coastal venues, hotels and productions where the cocktail, dinner and party may happen in different spaces.',
    music:
      'Live saxophone can create an elegant atmosphere early in the day and then lift the energy for the banquet entrance, open bar or Sax + DJ set.',
    venueStyle: 'sea-view venues, premium estates, hotels and destination weddings in Malaga',
    nearbyContext: 'Marbella, Estepona, Nerja and the Costa del Sol',
    fit:
      'In Malaga, saxophone is especially suitable for destination weddings that need atmosphere, interaction and a memorable party transition.',
    booking:
      'For Malaga weddings, it helps to know if the event is a destination wedding, the type of venue and how important the final party will be.',
  },
  'saxofonista-para-bodas-en-murcia': {
    intro:
      'Murcia has many weddings in estates, haciendas and Mediterranean venues where the ceremony, cocktail hour, banquet entrance and open bar each need a different energy.',
    logistics:
      'The service adapts to local estates, outdoor spaces, DJs and venues where flexible setup and clear timing make the day flow better.',
    music:
      'Live saxophone can bring emotion to the ceremony, rhythm to the cocktail hour and a strong party moment when the open bar starts.',
    venueStyle: 'estates, haciendas, hotels and Mediterranean wedding venues in Murcia',
    nearbyContext: 'Cartagena, Molina de Segura, Lorca and the Region of Murcia',
    fit:
      'In Murcia, saxophone works very well for couples who want elegance at the beginning and a lively celebration later in the day.',
    booking:
      'For Murcia weddings, it helps to share the date, venue, DJ setup and which moments you want to highlight with live saxophone.',
  },
  'saxofonista-para-bodas-en-palma': {
    intro:
      'Palma and Mallorca are a natural setting for destination weddings in hotels, villas, sea-view spaces and fincas where many guests travel from abroad.',
    logistics:
      'The proposal adapts to island logistics, planner coordination, hotels, villas and venues where the cocktail at sunset often has a central role.',
    music:
      'Live saxophone can feel elegant and Mediterranean during the day, then become more energetic for the banquet or open bar.',
    venueStyle: 'hotels, villas, fincas and sea-view wedding venues in Mallorca',
    nearbyContext: 'Calvia, Llucmajor, Alcudia and other areas of Mallorca',
    fit:
      'In Palma, saxophone is very appropriate for destination weddings where atmosphere, timing and guest experience are carefully designed.',
    booking:
      'For Palma weddings, it helps to define the island venue, travel logistics, planner coordination and the moments where live saxophone should stand out.',
  },
  'saxofonista-para-bodas-en-sevilla': {
    intro:
      'Seville is a city of haciendas, estates and weddings with strong personality, where music often plays a visible role in the ceremony, aperitif and party.',
    logistics:
      'The service adapts to large weddings, Andalusian estates, hotels and venues where coordination is important so each moment enters with strength.',
    music:
      'Live saxophone can combine emotion, elegance and a powerful final section for the banquet entrance or open bar.',
    venueStyle: 'haciendas, estates, hotels and wedding venues in Seville',
    nearbyContext: 'Dos Hermanas, Alcala de Guadaira, Carmona and the Seville area',
    fit:
      'In Seville, saxophone is a good choice when the wedding needs elegance early on and a high-energy party later.',
    booking:
      'For Seville weddings, it helps to know if you want more presence during the cocktail, banquet entrance, open bar or a combination of several moments.',
  },
  'saxofonista-para-bodas-en-valencia': {
    intro:
      'Valencia has Mediterranean weddings in estates, hotels and urban venues where the cocktail hour, atmosphere changes and transition to the party are often carefully planned.',
    logistics:
      'The service adapts to Mediterranean estates, city venues, DJs and planners who need a live performance that fits the rhythm of the day.',
    music:
      'Live saxophone can bring flow to the cocktail hour, create a strong banquet entrance and keep the final party dynamic.',
    venueStyle: 'Mediterranean estates, hotels, urban venues and weddings in Valencia',
    nearbyContext: 'Paterna, Torrent, Sagunto and nearby areas of Valencia',
    fit:
      'In Valencia, saxophone fits weddings that mix elegance, Mediterranean atmosphere and a lively final celebration.',
    booking:
      'For Valencia weddings, it helps to define the venue, performance blocks and whether the party will have a central role.',
  },
  'saxofonista-para-bodas-en-valladolid': {
    intro:
      'Valladolid brings together weddings in estates, hotels and quieter venues where couples often value an elegant, warm and well-measured live performance.',
    logistics:
      'The service adapts to estates and hotels where the cocktail hour, banquet entrance and party need a smooth musical progression.',
    music:
      'Live saxophone can start with a refined tone and gain intensity when the banquet or party begins.',
    venueStyle: 'estates, hotels and wedding venues in Valladolid',
    nearbyContext: 'Tordesillas, Medina del Campo, Arroyo de la Encomienda and the Valladolid area',
    fit:
      'In Valladolid, saxophone works especially well when the wedding needs elegance, closeness and a final lift of energy.',
    booking:
      'For Valladolid weddings, it helps to define whether the service is focused on the aperitif, banquet, party or several moments.',
  },
  'saxofonista-para-bodas-en-zaragoza': {
    intro:
      'Zaragoza combines urban weddings and estate celebrations where music often needs to accompany the cocktail, dinner and final party with a clear progression.',
    logistics:
      'The proposal adapts to city venues, estates and weddings where the saxophone should integrate smoothly with the schedule and the DJ setup.',
    music:
      'Live saxophone can begin with an elegant atmosphere and become more powerful for the open bar or Sax + DJ format.',
    venueStyle: 'urban venues, estates, hotels and wedding spaces in Zaragoza',
    nearbyContext: 'Utebo, Cuarte de Huerva, La Muela and the Zaragoza area',
    fit:
      'In Zaragoza, saxophone is a strong option for weddings that want a refined start and a more energetic final celebration.',
    booking:
      'For Zaragoza weddings, it helps to share the date, venue, DJ setup and the part of the day where you want the live saxophone to have more impact.',
  },
};

const fallbackProfile = (location: LocationEntry): EnglishCityProfile => ({
  intro: `${location.city} is a wedding destination with venues, hotels and celebration spaces where live music can shape the atmosphere of the day.`,
  logistics: `The proposal adapts to wedding venues in ${location.city}, the schedule of the celebration and the kind of experience you want for your guests.`,
  music: `Live saxophone can move from elegant ceremony or cocktail moments to a more energetic party section.`,
  venueStyle: `wedding venues, hotels and estates in ${location.province}`,
  nearbyContext: `${location.nearbyAreas.join(', ')} and nearby areas`,
  fit: `In ${location.city}, saxophone works well when the wedding needs elegance, atmosphere and energy at different moments of the day.`,
  booking: `For weddings in ${location.city}, it helps to share the date, venue, performance moments and the style of celebration you are planning.`,
});

const getProfile = (location: LocationEntry) =>
  englishCityProfiles[location.slug] ?? fallbackProfile(location);

const sharedTestimonials: LandingTestimonial[] = [
  {
    name: 'Chloe Harris',
    role: 'Hen party',
    quote:
      "Benito was FANTASTIC! He performed at our villa for my best friend's hen do and he really brought the party vibes - he had us all up dancing and really made it so special! Thank you Benito - what a legend!",
    avatar: 'chloe-harris',
  },
  {
    name: 'Marie Jimenez',
    role: 'Private event',
    quote:
      "Thanks Benito, great time! Fantastic! You're an excellent musician and very kind; thanks to you, the atmosphere was amazing.",
    avatar: 'marie-jimenez',
  },
  {
    name: 'Vincent Sexton',
    role: 'Private event',
    quote: 'Absolutely first class... played for 2 hours!! Highly recommend.',
    avatar: 'vincent-sexton',
  },
  {
    name: 'Kyle Mann',
    role: 'Wedding',
    quote:
      'Benito played at our wedding and it was fantastic! We had a wonderful time and all our guests told us how much they enjoyed that part of the day. We wanted party music and Benito gave us an hour of great songs with everyone dancing! I highly recommend him. Thank you so much, Benito!',
    avatar: 'kyle-mann',
  },
  {
    name: 'Jack',
    role: 'Wedding',
    quote:
      'Incredible artist and professional. Communication with Benito was excellent and he made our day even more special.',
    avatar: 'jack',
  },
  {
    name: 'Jessica Valdes',
    role: 'Wedding',
    quote:
      'Highly recommended. Benito played at our wedding and everyone loved it. He adapted to our ideas and everything went brilliantly.',
    avatar: 'jessica-valdes',
  },
  {
    name: 'Nicolas Rodriguez Carmona',
    role: 'Celebration',
    quote:
      'A great choice for the celebration. Very kind, easy-going and he really knows how to bring energy to a party. We were delighted and highly recommend him.',
    avatar: 'nicolas-rodriguez-carmona',
  },
  {
    name: 'Karen',
    role: 'Wedding',
    quote:
      'Excellent service. I loved how flexible he was with the timing and price. He gave the wedding a very special touch and it was a wonderful moment. Thank you for being part of our day.',
    avatar: 'karen',
  },
  {
    name: 'Rafael Valero Agullo',
    role: 'Event',
    quote:
      'Benito won everyone over. His performance was excellent, he achieved exactly what I was looking for and surprised me in the best possible way.',
    avatar: 'rafael-valero-agullo',
  },
];

const sharedMoments = [
  {
    title: 'Ceremony',
    description:
      'Emotional versions, entrances and key moments for a ceremony soundtrack that feels elegant and personal.',
  },
  {
    title: 'Cocktail hour',
    description:
      'Live saxophone to create atmosphere, connect with guests and lift the welcome drink with energy.',
  },
  {
    title: 'Banquet',
    description:
      'Banquet show to animate your guests and move into the open bar with energy, including banquet entrance options.',
  },
  {
    title: 'Open bar and Sax + DJ',
    description:
      'A higher-energy performance for the final party, coordinated with the DJ or venue sound system.',
  },
];

const sharedExtras = [
  'Flexible repertoire for elegant sets, house, pop versions, commercial hits and party moments.',
  'Coordination with wedding planners, DJs, estates, hotels and the technical team at the venue.',
  'Sound system up to 2400W included in the price.',
  'A format designed so each part of the wedding has its own energy while the whole day still feels coherent.',
];

const sharedEventServices: LandingServiceCard[] = [
  {
    title: 'Weddings',
    description:
      'Elegant music for your ceremony, cocktail, banquet or open bar. Special moments accompanied by unforgettable melodies.',
    href: '#wedding-services',
    icon: 'weddings',
  },
  {
    title: 'Corporate events',
    description:
      'Musical entertainment for conferences, company dinners or inaugurations. The perfect touch to impress your clients.',
    icon: 'corporate',
  },
  {
    title: 'Private parties',
    description:
      'From birthdays to anniversaries. Create a unique atmosphere with live music that will surprise your guests.',
    icon: 'private',
  },
  {
    title: 'Hotels and restaurants',
    description:
      "Ambient music for your establishment. Enhance your customers' experience with a sophisticated atmosphere.",
    icon: 'hospitality',
  },
];

const sharedServiceTypes = ['Ceremony', 'Cocktail hour', 'Banquet', 'Open bar', 'Sax + DJ'];

const buildPriceEstimateSentence = (place?: string) =>
  `As a guide, the Premium package is around €600-€1,000 and the Basic package around €400-€700, depending on the date and travel${place ? ` to ${place}` : ''}.`;

const sharedWeddingPacks: WeddingPack[] = [
  {
    name: 'Premium',
    tagline: 'A more personalised performance',
    priceEstimate: '€600 - €1,000 approx.',
    bullets: [
      'Choose your favourite songs, whether they are already in the repertoire or not.',
      'Personalise your event in detail, with LED saxophone available as part of the experience.',
      'Entrances, surprises and special moments can be included so the performance feels more personal.',
      'If repertoire and personalisation are a priority, this is the best fit.',
    ],
  },
  {
    name: 'Basic',
    tagline: 'A simple and effective live set',
    priceEstimate: '€400 - €700 approx.',
    bullets: [
      'Choose the style you need for your event without having to define every song.',
      'Performance based on the repertoire list, with LED saxophone and extra personalisation available as add-ons.',
      'A practical option for couples who want a strong live performance without overcomplicating the planning.',
    ],
  },
];

const sharedVideos: LandingVideo[] = [
  {
    title: 'Flying Free at a wedding',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=Ent8OtW2DKU',
    description: 'A powerful wedding party moment with live saxophone.',
  },
  {
    title: 'Destination Calabria at a wedding',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=hILiOtCMEBA',
    description: 'A saxophone classic with energy for cocktail hour or open bar.',
  },
  {
    title: 'Titanium - David Guetta',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=Gq-AV9kIV-4',
    description: 'An epic David Guetta track performed live at an event.',
  },
  {
    title: 'Versions and house',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=HsD3AflaXnk',
    description: 'Music for modern weddings, sea-view venues and party moments.',
  },
  {
    title: 'Viva la Vida - Coldplay',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/xdaxq8prjeQ',
    description: 'A Coldplay classic for a bright cocktail entrance.',
  },
];

const sharedRepertoireCategories: RepertoireCategory[] = [
  {
    title: 'Ceremony',
    songs: [
      'La vie en rose',
      'La Vita e Bella',
      'Stand by Me',
      'Perfect - Ed Sheeran',
      'A Thousand Years',
      'Hallelujah',
      'Ave Maria',
      'Viva la Vida - Coldplay',
    ],
  },
  {
    title: 'Jazz, boleros and bossa nova',
    songs: [
      'Fly Me to the Moon',
      'Take Five',
      'Blue Bossa',
      'Autumn Leaves',
      'Stand by Me',
      'Careless Whisper',
      'Baker Street',
      'Besame Mucho',
    ],
  },
  {
    title: 'EDM, pop and party',
    songs: [
      'Titanium - David Guetta',
      'Levels - Avicii',
      'Destination Calabria',
      'We Found Love - Rihanna',
      'Freed From Desire - Gala',
      'Wake Me Up - Avicii',
      'Pepas - Farruko',
      'Si antes te hubiera conocido - Karol G',
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

const buildHomeCityLinks = (): LandingLink[] =>
  getLaunchedLocations().map((location) => ({
    href: `/en/${getEnglishLocationSlug(location)}`,
    label: getEnglishLocationName(location),
    description: `Saxophonist in ${getEnglishLocationName(location)}`,
  }));

const buildNearbyLinks = (location: LocationEntry): LandingLink[] => {
  const launchedMap = new Map(
    getLaunchedLocations().map((entry) => [entry.slug, entry] as const),
  );

  return location.relatedSlugs
    .map((slug) => launchedMap.get(slug))
    .filter((entry): entry is LocationEntry => Boolean(entry))
    .map((entry) => ({
      href: `/en/${getEnglishLocationSlug(entry)}`,
      label: getEnglishLocationName(entry),
      description: `Saxophonist in ${getEnglishLocationName(entry)}`,
    }));
};

const buildHomeAnswerCards = (): AnswerCard[] => [
  {
    title: 'What Benito Gonzalez Sax offers',
    body:
      'Professional wedding entertainment and live saxophone for destination weddings, private events and celebrations, with formats for ceremony, cocktail hour, banquet, open bar and Sax + DJ sessions.',
  },
  {
    title: 'Where he works',
    body:
      'Available for weddings and events across mainland Spain, the Balearic Islands, Costa del Sol, Mallorca, Barcelona, Madrid and other international wedding destinations, adapting each performance to the venue, date and celebration style.',
  },
  {
    title: 'Performance formats',
    body:
      'Solo saxophone with backing tracks, coordination with wedding planners and venues, or a more powerful Sax + DJ format for the party, with full sound equipment included when needed.',
  },
  {
    title: 'How to request a quote',
    body:
      'Requesting a quote from abroad is simple: click the request quote button, contact Benito directly or fill in the form with your date, city, venue and performance moments.',
  },
];

const buildHomeFaqs = (): LandingFaq[] => [
  {
    question: 'What is included in the wedding and event saxophonist service?',
    answer:
      'The service can include ceremony, cocktail hour, banquet entrance, special moments, open bar, private parties and corporate events, adapting the format to the event schedule.',
  },
  {
    question: 'How much does it cost to hire a saxophonist for a wedding or event?',
    answer:
      `The price depends on the city, travel, duration, number of performance moments and whether the format is solo saxophone, corporate entertainment or Sax + DJ. ${buildPriceEstimateSentence()}`,
  },
  {
    question: 'How much is a saxophonist for 1 hour in Spain?',
    answer:
      'A one-hour performance depends on the date, city, travel, venue requirements and whether sound equipment is needed. The fastest way to receive an accurate price is to request a quote with the event location and schedule.',
  },
  {
    question: 'Is saxophone appropriate for a wedding or event?',
    answer:
      'Yes. Saxophone can be elegant, emotional and energetic depending on the moment, so it works especially well for ceremonies, cocktail hours, banquet entrances, open bars, private parties and corporate events.',
  },
  {
    question: 'Do you perform solo or with a DJ?',
    answer:
      'Both options are possible. Benito can perform with backing tracks or coordinate with a DJ and the venue sound team for a more powerful party format.',
  },
  {
    question: 'Which areas do you cover?',
    answer:
      'Benito is available for weddings and events in Murcia, Alicante, Madrid, Valencia, Barcelona, Seville, Malaga, Zaragoza, Palma, Valladolid and other provinces in mainland Spain and the Balearic Islands.',
  },
  {
    question: 'How do we request a quote?',
    answer:
      'You can fill in the form with your date, city and type of event, or contact Benito directly by phone, email or WhatsApp.',
  },
];

const buildCityTrustPoints = (location: LocationEntry) => {
  const profile = getProfile(location);

  return [
    `Regular coverage in ${location.city} and nearby areas such as ${location.nearbyAreas.join(', ')}.`,
    `Flexible format for ceremony, cocktail hour, banquet, open bar and Sax + DJ in ${location.city}.`,
    `A proposal designed to adapt to ${profile.venueStyle}.`,
    'Fluent in English and French.',
  ];
};

const buildCityIntroParagraphs = (location: LocationEntry) => {
  const profile = getProfile(location);

  return [
    `${profile.intro} ${profile.logistics}`,
    `Benito Gonzalez has performed at more than 200 events and brings over 10 years of experience to weddings and private celebrations. ${profile.music}`,
  ];
};

const buildCityExtrasIntro = (location: LocationEntry) => {
  const profile = getProfile(location);

  return `In ${location.city}, weddings often move through different spaces and timings. Live saxophone helps connect the ceremony, cocktail hour, banquet and open bar so the music follows the real rhythm of the celebration.`;
};

const buildCityAnswerCards = (location: LocationEntry): AnswerCard[] => {
  const profile = getProfile(location);
  const place = getEnglishLocationName(location);
  const coverageArea =
    location.city === location.province ? place : `${place}, ${location.province}`;

  return [
    {
      title: `What Benito offers in ${place}`,
      body: `Professional live music and saxophone booking in ${place} for weddings, destination weddings and private events, with reliable communication, flexible formats and sound equipment included when needed.`,
    },
    {
      title: `Where he works in ${location.province}`,
      body: `Coverage includes ${coverageArea} and nearby areas such as ${location.nearbyAreas.join(', ')}.`,
    },
    {
      title: `How saxophone transforms a wedding in ${place}`,
      body: `${profile.fit} The performance creates sophisticated wedding entertainment for emotional moments and then lifts the energy when the celebration becomes more festive.`,
    },
    {
      title: `How to book in ${place}`,
      body: `${profile.booking} If you are planning from abroad, you can request a quote online by form, email or WhatsApp and receive a clear proposal for the event.`,
    },
  ];
};

const buildCityFaqs = (location: LocationEntry): LandingFaq[] => {
  const profile = getProfile(location);
  const place = getEnglishLocationName(location);
  const coverageArea =
    location.city === location.province ? place : `${place}, ${location.province}`;

  return [
    {
      question: `How much does it cost to hire a saxophonist for a wedding or event in ${place}?`,
      answer: `The price depends on the date, venue, travel, duration and the number of performance moments. In ${place}, the type of venue, local logistics and event style can also affect the quote. ${buildPriceEstimateSentence(place)}`,
    },
    {
      question: `How much is a saxophonist for 1 hour in ${place}?`,
      answer: `A one-hour performance in ${place} depends on the date, venue, travel, setup requirements and whether sound equipment is needed. The best option is to request a quote with the event location and schedule.`,
    },
    {
      question: `What is included in the wedding and event saxophonist service in ${place}?`,
      answer: `The service can include ceremony, cocktail hour, banquet entrance, special moments, open bar, private events and Sax + DJ. For ${place}, the format is adapted to the venue, schedule and atmosphere of the celebration.`,
    },
    {
      question: `Is saxophone appropriate for a wedding or event in ${place}?`,
      answer: profile.fit,
    },
    {
      question: `Do you travel for weddings and events in ${place} and nearby areas?`,
      answer: `Yes. Benito covers weddings and events in ${coverageArea} and nearby areas such as ${profile.nearbyContext}, adapting travel and setup to each venue.`,
    },
    {
      question: `Can we book saxophone for cocktail hour and open bar in ${place}?`,
      answer: `${profile.music} Many couples combine a more elegant cocktail set with a stronger open-bar or Sax + DJ moment.`,
    },
    {
      question: `How far in advance should we book in ${place}?`,
      answer: `It is best to ask as soon as you have the date and venue, especially for spring, summer and high-demand Saturdays in ${place}.`,
    },
    {
      question: `Can the repertoire be personalised for our wedding or event in ${place}?`,
      answer: `Yes. The repertoire and intensity can be adapted to your ceremony, cocktail hour, banquet, party or corporate event, depending on the style you are planning in ${place}.`,
    },
  ];
};

export const buildEnglishHomePageData = (): LandingPageData => ({
  type: 'home',
  title: 'Professional Saxophonist in Spain | Weddings & Events',
  description:
    'Professional saxophonist in Spain for weddings, destination weddings and events. Live music booking for ceremony, cocktail hour, banquet and open bar.',
  canonicalPath: '/en',
  heroTitle: 'Saxophonist in Spain',
  heroLabel: 'Benito Gonzalez Sax',
  trustTitle: 'Why choose my services?',
  heroSummary: 'Live saxophone for weddings and events.',
  heroBody:
    'Benito Gonzalez helps couples and event planners create an unforgettable celebration with professional live music and saxophone booking.',
  primaryCtaLabel: 'Request quote',
  primaryCtaHref: '#contact',
  secondaryCtaLabel: 'Watch videos',
  secondaryCtaHref: '#videos',
  introTitle: 'Live saxophone for weddings and events moments guests remember',
  introParagraphs: [
    'Benito Gonzalez provides a sophisticated live soundtrack for destination weddings, private parties and corporate events in Spain, with a polished saxophone performance adapted to each setting.',
    'Professional, reliable and easy to book from abroad, the service is designed for couples, planners and clients who want elegant wedding entertainment without logistical stress.',
  ],
  trustPoints: [
    'More than 10 years of experience performing at weddings, private events and brand celebrations.',
    'Adaptable format for elegant weddings, destination weddings and Sax + DJ celebrations.',
    'Available for weddings and events across mainland Spain and the Balearic Islands, depending on date and venue.',
    'Fluent in English and French.',
  ],
  eventServicesEyebrow: 'Services',
  eventServicesTitle: 'Live saxophone for weddings and events',
  eventServicesDescription:
    'A professional saxophone service for weddings, corporate events and private parties, with each format adapted to the atmosphere, schedule and audience.',
  eventServices: sharedEventServices,
  serviceTitle: 'Services for every moment of the wedding',
  serviceDescription:
    'A flexible live saxophone service designed to accompany the wedding from the most elegant moments to the most energetic part of the celebration.',
  moments: sharedMoments,
  extrasTitle: 'What is my proposal for weddings?',
  extrasIntro:
    'Ceremony, cocktail hour, banquet and open bar, all designed so music transforms the atmosphere of the wedding from the emotion of the ceremony to the energy of the party.',
  extras: sharedExtras,
  answerBlockTitle: 'Why choose a saxophonist for your wedding or event',
  answerBlockIntro:
    'What a saxophonist offers and how live saxophone can animate your wedding or event.',
  answerCards: buildHomeAnswerCards(),
  serviceTypes: sharedServiceTypes,
  packsTitle: 'Wedding packages',
  packsIntro:
    'Two ways to plan the performance depending on the level of personalisation you want for your wedding or event, your ideal repertoire and your budget.',
  packs: sharedWeddingPacks,
  packPreviewImages,
  repertoireTitle: 'Flexible repertoire for every moment',
  repertoireIntro:
    'A sample selection of songs for weddings, parties and corporate events. The repertoire is adapted to the wedding style and event format.',
  repertoireCategories: sharedRepertoireCategories,
  repertoireDownloadLabel: 'Download repertoire PDF',
  repertoireDownloadHref: '/downloads/repertorio-benito-gonzalez-sax.pdf',
  repertoirePreviewImages,
  videosTitle: 'Live videos',
  videosIntro:
    'Live videos from real weddings and events, including cocktail hour, banquet entrance, open bar and party moments.',
  videos: sharedVideos,
  citiesTitle: 'Find a wedding saxophonist by city',
  citiesIntro:
    'If you want information for the city where your wedding will take place, here are the locations where the service already has a dedicated page.',
  cityLinks: buildHomeCityLinks(),
  cityCoverageBullets: [],
  testimonialsTitle: 'Reviews about the service',
  testimonialsDescription:
    'Real experiences from couples and clients who booked Benito for weddings, celebrations and events.',
  testimonials: sharedTestimonials,
  faqTitle: 'Frequently asked questions before hiring a wedding saxophonist',
  faqs: buildHomeFaqs(),
  contactTitle: 'Request a quote for your wedding or event',
  contactDescription:
    'Tell us the date, city, venue, performance moment and package you need, so we can reply quickly.',
  contactHighlight:
    'You can also call or write by WhatsApp if you prefer a more direct option.',
  formSubject: 'Quote request - Wedding saxophonist',
  whatsappHref: buildWhatsAppHref(
    'Hello Benito, I would like to request a quote for my wedding. I am writing from the English wedding saxophonist page.',
  ),
});

export const buildEnglishCityPageData = (location: LocationEntry): LandingPageData => {
  const profile = getProfile(location);
  const place = getEnglishLocationName(location);

  return {
    type: 'city',
    title: `Professional Saxophonist in ${place} | Weddings & Luxury Events`,
    description: `Professional saxophonist in ${place} for weddings, destination weddings and events. Live music booking for ceremony, cocktail hour, banquet and open bar.`,
    canonicalPath: `/en/${getEnglishLocationSlug(location)}`,
    heroTitle: `Saxophonist in ${place}`,
    heroLabel:
      location.city === location.province
        ? `${place}, Province of ${location.province}`
        : `${place}, ${location.province}`,
    trustTitle: `Why choose my services in ${place}?`,
    heroSummary: 'Live saxophone for weddings and events.',
    heroBody: `Benito Gonzalez offers professional live music and saxophone booking in ${place} for weddings, destination weddings and private events.`,
    primaryCtaLabel: 'Check availability',
    primaryCtaHref: '#contact',
    secondaryCtaLabel: 'Watch videos',
    secondaryCtaHref: '#videos',
    introTitle: 'Live saxophone for weddings and events',
    introParagraphs: buildCityIntroParagraphs(location),
    trustPoints: buildCityTrustPoints(location),
    eventServicesEyebrow: 'Services',
    eventServicesTitle: `Live saxophone services in ${place}`,
    eventServicesDescription: `A professional saxophone service in ${place} for weddings, corporate events and private parties, with each performance adapted to the venue, schedule and audience.`,
    eventServices: sharedEventServices,
    serviceTitle: `What services does a wedding saxophonist cover in ${place}`,
    serviceDescription: `Every wedding is different, so the service adapts to the style, venue and moments you want to highlight in ${place} and nearby areas.`,
    moments: sharedMoments,
    extrasTitle: `Service essentials in ${place}`,
    extrasIntro: buildCityExtrasIntro(location),
    extras: [
      ...sharedExtras,
      `Local coverage and nearby areas: ${location.nearbyAreas.join(', ')}.`,
    ],
    answerBlockTitle: `Why choose a saxophonist in ${place}`,
    answerBlockIntro: `What Benito Gonzalez Sax offers in ${place}, how live saxophone can transform your wedding or event, how the service works and how to book.`,
    answerCards: buildCityAnswerCards(location),
    serviceTypes: sharedServiceTypes,
    packsTitle: `Wedding and event packages in ${place}`,
    packsIntro:
      'Two ways to plan the performance depending on the level of personalisation you want for your wedding or event, your ideal repertoire and your budget.',
    packs: sharedWeddingPacks,
    packPreviewImages,
    repertoireTitle: `Wedding and event repertoire in ${place}`,
    repertoireIntro:
      'A sample selection of songs for weddings, parties and corporate events. The repertoire is adapted to the wedding style and event format.',
    repertoireCategories: sharedRepertoireCategories,
    repertoireDownloadLabel: 'Download repertoire PDF',
    repertoireDownloadHref: '/downloads/repertorio-benito-gonzalez-sax.pdf',
    repertoirePreviewImages,
    videosTitle: `Live saxophone videos in ${place}`,
    videosIntro:
      'A selection of real videos so you can see how the live performance sounds and feels before requesting a quote.',
    videos: sharedVideos,
    citiesTitle: `Other cities related to the service from ${place}`,
    citiesIntro:
      buildNearbyLinks(location).length > 0
        ? 'If you are also considering other locations, here are nearby or related city pages with specific information.'
        : 'If the wedding city is not confirmed yet, you can return to the general page to see the full proposal.',
    cityLinks: buildNearbyLinks(location),
    cityCoverageBullets: [],
    testimonialsTitle: `Reviews and testimonials for weddings in ${place}`,
    testimonialsDescription:
      'Real reviews from couples and clients that help you understand how the service feels at a wedding.',
    testimonials: sharedTestimonials.map((testimonial) => ({
      ...testimonial,
      role: testimonial.role === 'Wedding' ? `Wedding in ${place}` : testimonial.role,
    })),
    faqTitle: `FAQ about hiring a saxophonist in ${place}`,
    faqs: buildCityFaqs(location),
    contactTitle: `Request a quote in ${place}`,
    contactDescription: `Share the date, venue, city and the wedding or event moment where you would like live saxophone. Then Benito can prepare a proposal for ${place} and nearby areas.`,
    contactHighlight: `If you already have a date and venue, WhatsApp is usually the fastest way to check availability in ${place}.`,
    formSubject: `Quote request - Saxophonist in ${place}`,
    whatsappHref: buildWhatsAppHref(
      `Hello Benito, I would like to request a quote for a wedding or event in ${place}.`,
    ),
    breadcrumb: [
      { label: 'Professional saxophonist in Spain', href: '/en' },
      {
        label: `Saxophonist in ${place}`,
        href: `/en/${getEnglishLocationSlug(location)}`,
      },
    ],
  };
};
