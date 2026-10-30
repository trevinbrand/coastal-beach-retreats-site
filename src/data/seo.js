import { properties } from './properties.js';

export const siteUrl = 'https://coastalbeachretreats.com';
export const siteName = 'Coastal Beach Retreats';
export const absoluteUrl = (pathname) => new URL(pathname, siteUrl).href;

const rentals = {
  'heavenly-hideaway': { resort: 'Edgewater', unit: 'Tower 1-1106', city: 'Panama City Beach', guests: 10, bedrooms: 2, bathrooms: 2, image: '/images/props/heavenly-hideaway/h1.webp', street: '11483 Front Beach Rd, Tower 1-1106', postal: '32407', description: 'Stay at Heavenly Hideaway, a 2-bedroom Edgewater condo in Panama City Beach. Sleeps 10 with Gulf views, resort amenities, and parking for two vehicles.' },
  'sailors-delight': { resort: 'Edgewater', unit: 'Tower 1-911', city: 'Panama City Beach', guests: 9, bedrooms: 2, bathrooms: 2, image: '/images/props/sailors/RS1.webp', street: '11483 Front Beach Rd, Tower 1-911', postal: '32407', description: "Book Sailor's Delight at Edgewater in Panama City Beach. This 2-bedroom condo sleeps 9, with Gulf views, resort amenities, and parking for two vehicles." },
  'red-sky-nights': { resort: 'Edgewater', unit: 'Tower 1-1002', city: 'Panama City Beach', guests: 9, bedrooms: 2, bathrooms: 2, image: '/images/props/red-sky-nights/RSN1.webp', street: '11483 Front Beach Rd, Tower 1-1002', postal: '32407', description: 'Red Sky Nights at Edgewater Tower 1-1002 offers Gulf and lagoon views in Panama City Beach. This 2-bedroom condo sleeps 9. View photos and book direct.' },
  'destin-dreams': { resort: 'Sterling Shores', unit: '311', city: 'Destin', guests: 4, bedrooms: 1, bathrooms: 1, image: '/images/props/destin-dreams/d1.webp', street: '1751 Scenic Hwy 98, Unit 311', postal: '32541', description: 'Stay at Destin Dreams at Sterling Shores 311. This 1-bedroom Destin condo sleeps 4 and offers Gulf views, a private balcony, pools, and beach access.' },
  'destin-diamond': { resort: 'Sterling Sands', unit: '111', city: 'Destin', guests: 4, bedrooms: 2, bathrooms: 2, image: '/images/props/destin-diamond/dd1.webp', street: '1080 Highway 98 E, Unit 111', postal: '32541', description: 'Discover Destin Diamond at Sterling Sands 111: a remodeled 2-bedroom beachfront condo in Destin. Sleeps 4 with Gulf views, a pool, and a hot tub.' },
  'fanta-sea': { resort: 'Waterscape', unit: 'A328', city: 'Fort Walton Beach', guests: 6, bedrooms: 1, bathrooms: 2, image: '/images/props/fanta-sea/fs1.webp', street: '1110 Santa Rosa Blvd, Unit A328', postal: '32548', description: 'Fanta Sea at Waterscape A328 offers a bedroom, bunk nook, and 2 bathrooms on Okaloosa Island. Sleeps 6 with resort pools and beach access. Book direct.' },
};

export const seoPages = {
  '/': { title: 'Destin & Panama City Beach Vacation Rentals | Coastal Beach Retreats', description: 'Find your coastal escape in Destin, Okaloosa Island, or Panama City Beach. Explore six vacation condos, view photos, check availability, and book direct.', image: '/images/props/heavenly-hideaway/h1.webp', label: 'Home' },
  '/availability/': { title: 'Vacation Rental Availability | Coastal Beach Retreats', description: 'Compare live availability across our Destin, Okaloosa Island, and Panama City Beach vacation rentals. Find open dates for your next coastal getaway.', label: 'Availability' },
  '/quote/': { title: 'Vacation Rental Pricing & Booking | Coastal Beach Retreats', description: 'Choose a condo and travel dates to check live pricing and book direct with Coastal Beach Retreats in Destin, Okaloosa Island, or Panama City Beach.', label: 'Pricing & Booking' },
  '/reviews/': { title: 'Vacation Rental Guest Reviews | Coastal Beach Retreats', description: 'Read guest reviews of Coastal Beach Retreats vacation condos in Destin, Okaloosa Island, and Panama City Beach before planning your stay.', label: 'Guest Reviews' },
  '/map/': { title: 'Destin & Panama City Beach Rental Map | Coastal Beach Retreats', description: 'Explore the locations of our vacation condos at Edgewater, Sterling Shores, Sterling Sands, and Waterscape in Destin, Okaloosa Island, and Panama City Beach.', label: 'Property Map' },
  '/3d-condo-tours/': { title: 'Edgewater Condo 3D Tour | Coastal Beach Retreats', description: "Explore Sailor's Delight at Edgewater in Panama City Beach with an interactive Matterport 3D tour. Preview the condo's layout before booking your stay.", image: '/images/props/sailors/RS1.webp', label: '3D Condo Tours' },
};

for (const property of properties) {
  const details = rentals[property.id];
  const name = property.name.split(' @ ')[0];
  const destination = property.id === 'fanta-sea' ? 'Okaloosa Island' : details.city;
  seoPages[property.href] = {
    title: `${name} | ${details.resort} ${destination} Condo`,
    description: details.description,
    image: details.image,
    imageAlt: `${name} at ${details.resort} ${details.unit}, ${details.city}`,
    label: name,
    rental: { ...details, id: property.id, name },
  };
  seoPages[`${property.href}photos/`] = {
    title: `${name} Photos | ${details.resort} ${destination}`,
    description: `View the full photo gallery of ${name} at ${details.resort} ${details.unit} in ${destination}. Explore the condo and return to its details to check availability.`,
    image: details.image,
    imageAlt: `${name} vacation condo in ${destination}`,
    label: `${name} Photos`,
    parent: property.href,
  };
}

export function structuredData(pathname) {
  const page = seoPages[pathname];
  const url = absoluteUrl(pathname);
  const organization = { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: siteName, url: `${siteUrl}/`, logo: absoluteUrl('/images/logo.png'), telephone: '+1-918-734-3331', email: 'coastalbeachretreats@gmail.com' };
  const graph = [organization, { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: siteName, publisher: { '@id': organization['@id'] } }, { '@type': page.parent ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { '@id': `${siteUrl}/#website` }, ...(page.rental ? { mainEntity: { '@id': `${url}#rental` } } : {}) }];
  if (pathname !== '/') {
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }];
    if (page.parent) crumbs.push({ '@type': 'ListItem', position: 2, name: seoPages[page.parent].label, item: absoluteUrl(page.parent) });
    crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: page.label, item: url });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs });
  }
  if (page.rental) {
    const r = page.rental;
    graph.push({ '@type': 'VacationRental', '@id': `${url}#rental`, identifier: r.id, name: `${r.name} at ${r.resort} ${r.unit}`, url, description: page.description, image: [absoluteUrl(page.image)], address: { '@type': 'PostalAddress', streetAddress: r.street, addressLocality: r.city, addressRegion: 'FL', postalCode: r.postal, addressCountry: 'US' }, containsPlace: { '@type': 'Accommodation', numberOfBedrooms: r.bedrooms, numberOfBathroomsTotal: r.bathrooms, occupancy: { '@type': 'QuantitativeValue', value: r.guests } } });
  }
  if (pathname === '/') graph.push({ '@type': 'ItemList', name: 'Coastal Beach Retreats vacation rentals', itemListElement: properties.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: seoPages[p.href].label, url: absoluteUrl(p.href) })) });
  return { '@context': 'https://schema.org', '@graph': graph };
}
