import type { APIRoute } from 'astro';
import { getLaunchedLocations } from '../data/locations';
import { absoluteUrl } from '../lib/site';

const staticPaths = ['/', '/en', '/politica-de-privacidad', '/en/privacy-policy'];

export const GET: APIRoute = () => {
  const urls = [
    ...staticPaths.map((path) => absoluteUrl(path)),
    ...getLaunchedLocations().map((location) => absoluteUrl(`/${location.slug}`)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map(
      (url) =>
        `\n  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === absoluteUrl('/') ? '1.0' : '0.8'}</priority>\n  </url>`,
    )
    .join('')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
