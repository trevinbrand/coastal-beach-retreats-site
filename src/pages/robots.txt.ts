import { siteUrl } from '../data/seo.js';

export function GET() {
  return new Response(import.meta.env.PROD
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
