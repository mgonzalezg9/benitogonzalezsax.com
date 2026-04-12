export const SITE_URL = 'https://benitogonzalezsax.com';

export const BUSINESS = {
  name: 'Benito González Sax',
  legalName: 'Benito González García',
  phone: '+34 615 97 71 90',
  phoneHref: 'tel:+34615977190',
  whatsappHref: 'https://wa.me/34615977190',
  email: 'info@benitogonzalezsax.com',
  emailHref: 'mailto:info@benitogonzalezsax.com',
  addressLocality: 'Mazarrón',
  addressRegion: 'Murcia',
  addressCountry: 'ES',
  facebook:
    'https://www.facebook.com/people/Benito-Gonz%C3%A1lez/pfbid02aQaaHf2vJntMAxebPSyQL7Z5KsXh1BGABeSava492qYXhP2frwCm61iDiRY7FfKCl/',
  instagram: 'https://www.instagram.com/benitogonzalezsax/',
  youtube: 'https://www.youtube.com/@benitogonzalezsax/featured',
};

export const DEFAULT_OG_IMAGE = '/apple-touch-icon.png';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const buildWhatsAppHref = (message: string) =>
  `${BUSINESS.whatsappHref}?text=${encodeURIComponent(message)}`;
