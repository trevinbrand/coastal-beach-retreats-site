# SEO launch checklist

The intended production address is https://coastalbeachretreats.com.
SEO metadata lives in `src/data/seo.js` and is rendered by `SeoHead.astro`.
Each page has its own title, description, canonical URL, sharing image, and
structured data. The sitemap is generated from that same page registry.
Add new pages to the registry when adding routes.

## Before publishing

- Confirm the domain is connected to the correct Cloudflare project with HTTPS.
- Choose the non-www domain as primary and redirect www to it in Cloudflare.
- Do not publish this SEO setup on an unrelated custom domain: its canonical
  URLs and sitemap intentionally point to the future production domain.
- Temporary `pages.dev` hosts receive `X-Robots-Tag: noindex`; local development
  also emits noindex metadata and a robots.txt that disallows crawling.
- Production builds permit indexing on the intended custom domain. Canonical
  tags alone do not prevent an alternate custom staging domain being indexed.
- Review all property facts before launch, especially guest capacity, addresses,
  bedrooms, bathrooms, fees, and sleeping arrangements. Keep OwnerRez aligned.

## At launch

- Verify domain ownership in Google Search Console using its DNS record.
- Submit https://coastalbeachretreats.com/sitemap.xml.
- Inspect the homepage and each of the six property URLs in Search Console.
- Check HTTPS, redirects, canonical tags, and response headers on the real host.
- Confirm production pages do not have a noindex response header or meta tag.
- Test social previews once their absolute image URLs are live.
- Review the markup in Google's Rich Results Test and Schema.org Validator.

## What structured data does and does not do

The site describes the organization, website, page breadcrumbs, homepage rental
list, and each vacation rental's existing facts. No ratings, reviews, prices,
availability, or amenities are invented or copied out of live widgets.
Google's vacation-rental rich-result integration has additional eligibility
requirements; this markup does not establish eligibility or guarantee display.
Search Console verification and Google Hotel Center onboarding are account tasks,
not something these source changes can complete.

## After launch

- Monitor indexing, search queries, clicks, and Core Web Vitals in Search Console.
- Write useful destination and resort guides from firsthand knowledge rather than
  creating repetitive pages for keyword variations.
- Keep page descriptions, accessibility text, contact information, and images current.
- Preserve the established URL paths or add permanent redirects when changing them.
