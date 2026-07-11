/**
 * Everlasting Hibachi — Location Page Generator
 * Run: node build-locations.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = '/Users/xinqixiao/Desktop/70nyc/everlastinghibachi/website';
const PHONE = '(347) 653-8882';
const PHONE_RAW = '3476538882';
const EMAIL = 'everlastinghibachiwithus@gmail.com';
const DOMAIN = 'https://www.everlastinghibachi.com';

const NAV = `<nav class="navbar" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="Everlasting Hibachi Home">
        <div class="nav-logo-mark">🔥</div>
        <div class="nav-logo-text">Everlasting Hibachi<span>Outdoor Hibachi Show</span></div>
      </a>
      <ul class="nav-menu" role="list">
        <li><a href="/service-area/">Locations</a></li>
        <li><a href="/menu/">Menu & Pricing</a></li>
        <li><a href="/gallery/">Gallery</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
      <a href="tel:${PHONE_RAW}" class="nav-phone">📞 ${PHONE}</a>
      <div class="nav-cta"><a href="/book-online/" class="btn btn-primary btn-sm">Book Now</a></div>
      <button class="hamburger" aria-label="Toggle mobile menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
<div class="mobile-menu">
  <ul>
    <li><a href="/service-area/">📍 Locations</a></li>
    <li><a href="/menu/">🍱 Menu & Pricing</a></li>
    <li><a href="/gallery/">📷 Gallery</a></li>
    <li><a href="/faq/">❓ FAQ</a></li>
    <li><a href="/contact/">✉️ Contact</a></li>
  </ul>
  <div class="mobile-cta">
    <a href="/book-online/" class="btn btn-primary">🔥 Book Your Party</a>
    <a href="tel:${PHONE_RAW}" class="btn btn-outline">📞 ${PHONE}</a>
  </div>
</div>`;

const FOOTER = `<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo-text">🔥 Everlasting Hibachi<span>Outdoor Hibachi Show</span></div>
        <p class="footer-tagline">Private hibachi chef and mobile catering for backyard parties across the Southeast.</p>
      </div>
      <div class="footer-col"><h4>Locations</h4><ul><li><a href="/georgia/">Georgia</a></li><li><a href="/tennessee/">Tennessee</a></li><li><a href="/alabama/">Alabama</a></li><li><a href="/north-carolina/">North Carolina</a></li><li><a href="/south-carolina/">South Carolina</a></li></ul></div>
      <div class="footer-col"><h4>Quick Links</h4><ul><li><a href="/menu/">Menu & Pricing</a></li><li><a href="/gallery/">Gallery</a></li><li><a href="/faq/">FAQ</a></li><li><a href="/book-online/">Book Online</a></li><li><a href="/service-area/">All Locations</a></li><li><a href="/contact/">Contact Us</a></li></ul></div>
      <div class="footer-col"><h4>Contact</h4>
        <div class="footer-contact-item"><span class="fc-icon">📞</span><a href="tel:${PHONE_RAW}">${PHONE}</a></div>
        <div class="footer-contact-item"><span class="fc-icon">✉️</span><a href="mailto:${EMAIL}" style="font-size:0.8rem">${EMAIL}</a></div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Everlasting Hibachi. All rights reserved.</p>
      <p>Serving GA · TN · AL · NC · SC</p>
    </div>
  </div>
</footer>
<script src="/script.js"></script>`;

// ---- State pages ----
const states = [
  {
    slug: 'georgia',
    name: 'Georgia',
    abbr: 'GA',
    emoji: '🍑',
    tagline: 'Atlanta Metro & Statewide',
    desc: 'Everlasting Hibachi serves all of Georgia — from Atlanta and the surrounding suburbs to Augusta, Savannah, Columbus, and beyond.',
    cities: ['Atlanta', 'Augusta', 'Savannah', 'Columbus', 'Macon', 'Athens', 'Sandy Springs', 'Roswell', 'Albany', 'Warner Robins'],
    cityLinks: [
      { name: 'Atlanta', slug: 'atlanta-hibachi-at-home' },
      { name: 'Augusta', slug: 'georgia' },
      { name: 'Savannah', slug: 'georgia' },
      { name: 'Columbus', slug: 'georgia' },
      { name: 'Macon', slug: 'georgia' },
    ],
    schema_area: 'Georgia',
  },
  {
    slug: 'tennessee',
    name: 'Tennessee',
    abbr: 'TN',
    emoji: '🎸',
    tagline: 'Nashville, Memphis & All of Tennessee',
    desc: 'Everlasting Hibachi brings the outdoor hibachi experience to Nashville, Memphis, Knoxville, Chattanooga, and everywhere in between.',
    cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City'],
    cityLinks: [
      { name: 'Nashville', slug: 'nashville-hibachi-at-home' },
      { name: 'Memphis', slug: 'memphis-hibachi-at-home' },
      { name: 'Knoxville', slug: 'knoxville-hibachi-at-home' },
      { name: 'Chattanooga', slug: 'chattanooga-hibachi-at-home' },
      { name: 'Clarksville', slug: 'tennessee' },
    ],
    schema_area: 'Tennessee',
  },
  {
    slug: 'alabama',
    name: 'Alabama',
    abbr: 'AL',
    emoji: '⭐',
    tagline: 'Birmingham, Huntsville & Statewide',
    desc: 'Everlasting Hibachi serves Alabama from the Birmingham metro to Huntsville, Montgomery, Mobile, and communities across the state.',
    cities: ['Birmingham', 'Huntsville', 'Montgomery', 'Mobile', 'Tuscaloosa', 'Hoover', 'Dothan', 'Decatur', 'Auburn'],
    cityLinks: [
      { name: 'Birmingham', slug: 'birmingham-hibachi-at-home' },
      { name: 'Huntsville', slug: 'huntsville-hibachi-at-home' },
      { name: 'Montgomery', slug: 'montgomery-hibachi-at-home' },
      { name: 'Mobile', slug: 'alabama' },
      { name: 'Tuscaloosa', slug: 'alabama' },
    ],
    schema_area: 'Alabama',
  },
  {
    slug: 'north-carolina',
    name: 'North Carolina',
    abbr: 'NC',
    emoji: '🌲',
    tagline: 'Charlotte, Raleigh & All of NC',
    desc: 'Everlasting Hibachi serves North Carolina — from Charlotte and the Piedmont to Raleigh-Durham, Greensboro, and the Outer Banks region.',
    cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Cary', 'Fayetteville', 'High Point', 'Wilmington'],
    cityLinks: [
      { name: 'Charlotte', slug: 'charlotte-hibachi-at-home' },
      { name: 'Raleigh', slug: 'raleigh-hibachi-at-home' },
      { name: 'Greensboro', slug: 'north-carolina' },
      { name: 'Durham', slug: 'north-carolina' },
      { name: 'Winston-Salem', slug: 'north-carolina' },
    ],
    schema_area: 'North Carolina',
  },
  {
    slug: 'south-carolina',
    name: 'South Carolina',
    abbr: 'SC',
    emoji: '🌴',
    tagline: 'Charleston, Columbia & Coastal SC',
    desc: 'Everlasting Hibachi brings the chef and fire show to South Carolina — from historic Charleston and coastal communities to Columbia, Greenville, and the Upstate.',
    cities: ['Charleston', 'Columbia', 'Greenville', 'Rock Hill', 'Mount Pleasant', 'Spartanburg', 'Anderson', 'Myrtle Beach', 'Hilton Head'],
    cityLinks: [
      { name: 'Charleston', slug: 'charleston-hibachi-at-home' },
      { name: 'Columbia', slug: 'columbia-hibachi-at-home' },
      { name: 'Greenville', slug: 'south-carolina' },
      { name: 'Rock Hill', slug: 'south-carolina' },
      { name: 'Mount Pleasant', slug: 'south-carolina' },
    ],
    schema_area: 'South Carolina',
  },
];

// ---- City pages ----
const cities = [
  { slug: 'atlanta-hibachi-at-home', name: 'Atlanta', state: 'Georgia', stateSlug: 'georgia', abbr: 'GA', emoji: '🏙️',
    desc: 'Atlanta, Georgia\'s capital and largest city, is home to millions of families, professionals, and party hosts looking for a unique backyard experience.',
    nearby: ['Sandy Springs', 'Roswell', 'Marietta', 'Alpharetta', 'Decatur', 'Smyrna', 'Johns Creek'] },
  { slug: 'nashville-hibachi-at-home', name: 'Nashville', state: 'Tennessee', stateSlug: 'tennessee', abbr: 'TN', emoji: '🎸',
    desc: 'Music City is full of energy — and your next backyard party should be too. Everlasting Hibachi brings the live fire show to Nashville homes and venues.',
    nearby: ['Brentwood', 'Franklin', 'Murfreesboro', 'Hendersonville', 'Smyrna', 'Mt. Juliet', 'Gallatin'] },
  { slug: 'memphis-hibachi-at-home', name: 'Memphis', state: 'Tennessee', stateSlug: 'tennessee', abbr: 'TN', emoji: '🎵',
    desc: 'Memphis knows how to celebrate. Add a live hibachi chef show to your next backyard party with Everlasting Hibachi, serving Memphis and surrounding areas.',
    nearby: ['Germantown', 'Bartlett', 'Collierville', 'Cordova', 'Millington', 'Arlington', 'Southaven MS'] },
  { slug: 'knoxville-hibachi-at-home', name: 'Knoxville', state: 'Tennessee', stateSlug: 'tennessee', abbr: 'TN', emoji: '🏔️',
    desc: 'Gateway to the Smoky Mountains, Knoxville is perfect for outdoor entertaining. Everlasting Hibachi brings the chef and grill directly to your Knoxville backyard.',
    nearby: ['Maryville', 'Oak Ridge', 'Alcoa', 'Farragut', 'Powell', 'Lenoir City', 'Sevierville'] },
  { slug: 'chattanooga-hibachi-at-home', name: 'Chattanooga', state: 'Tennessee', stateSlug: 'tennessee', abbr: 'TN', emoji: '⚓',
    desc: 'Chattanooga\'s outdoor culture is a perfect match for our outdoor hibachi show. Book a private chef for your next backyard party in the Chattanooga area.',
    nearby: ['East Ridge', 'Hixson', 'Soddy-Daisy', 'Cleveland TN', 'Red Bank', 'Signal Mountain', 'Fort Oglethorpe GA'] },
  { slug: 'birmingham-hibachi-at-home', name: 'Birmingham', state: 'Alabama', stateSlug: 'alabama', abbr: 'AL', emoji: '⚒️',
    desc: 'Birmingham is the largest city in Alabama and a hub for backyard entertaining. Everlasting Hibachi brings the outdoor fire show directly to your Birmingham home.',
    nearby: ['Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood', 'Pelham', 'Alabaster', 'Trussville'] },
  { slug: 'huntsville-hibachi-at-home', name: 'Huntsville', state: 'Alabama', stateSlug: 'alabama', abbr: 'AL', emoji: '🚀',
    desc: 'Huntsville — Rocket City — is growing fast, and so is the demand for unique backyard experiences. Book Everlasting Hibachi for your Huntsville party.',
    nearby: ['Madison', 'Decatur', 'Athens AL', 'Hampton Cove', 'Owens Cross Roads', 'New Market', 'Meridianville'] },
  { slug: 'montgomery-hibachi-at-home', name: 'Montgomery', state: 'Alabama', stateSlug: 'alabama', abbr: 'AL', emoji: '🏛️',
    desc: 'Montgomery, Alabama\'s capital city, deserves a celebration worth remembering. Everlasting Hibachi brings the private chef and fire show to your backyard.',
    nearby: ['Prattville', 'Millbrook', 'Pike Road', 'Wetumpka', 'Elmore', 'Hope Hull'] },
  { slug: 'charlotte-hibachi-at-home', name: 'Charlotte', state: 'North Carolina', stateSlug: 'north-carolina', abbr: 'NC', emoji: '🏦',
    desc: 'Charlotte is the largest city in the Carolinas and a prime destination for unique backyard parties. Everlasting Hibachi serves Charlotte and the greater metro.',
    nearby: ['Concord', 'Gastonia', 'Huntersville', 'Matthews', 'Kannapolis', 'Mooresville', 'Cornelius', 'Rock Hill SC'] },
  { slug: 'raleigh-hibachi-at-home', name: 'Raleigh', state: 'North Carolina', stateSlug: 'north-carolina', abbr: 'NC', emoji: '🌳',
    desc: 'Raleigh and the Research Triangle are home to thousands of young families who love hosting backyard parties. Everlasting Hibachi brings the chef show to you.',
    nearby: ['Durham', 'Cary', 'Chapel Hill', 'Apex', 'Morrisville', 'Wake Forest', 'Garner'] },
  { slug: 'charleston-hibachi-at-home', name: 'Charleston', state: 'South Carolina', stateSlug: 'south-carolina', abbr: 'SC', emoji: '⚓',
    desc: 'Historic Charleston and its gorgeous coastal surroundings are perfect for an outdoor hibachi show. Everlasting Hibachi brings the experience to your property.',
    nearby: ['Mount Pleasant', 'North Charleston', 'Summerville', 'Goose Creek', 'Hanahan', 'Isle of Palms', 'Sullivan\'s Island'] },
  { slug: 'columbia-hibachi-at-home', name: 'Columbia', state: 'South Carolina', stateSlug: 'south-carolina', abbr: 'SC', emoji: '🌆',
    desc: 'Columbia, South Carolina\'s capital and home to the University of South Carolina, is a great place to host a backyard hibachi party with Everlasting Hibachi.',
    nearby: ['Lexington', 'Irmo', 'Cayce', 'West Columbia', 'Chapin', 'Blythewood', 'Forest Acres'] },
];

function makePage(type, data) {
  if (type === 'state') {
    const s = data;
    const cityLinksHTML = s.cityLinks.map(c =>
      `<a href="/${c.slug}/" class="city-link">${c.name}</a>`
    ).join('\n            ');
    const allCities = s.cities.join(' · ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hibachi at Home ${s.name} | Everlasting Hibachi | Private Chef ${s.abbr}</title>
  <meta name="description" content="Everlasting Hibachi brings a private hibachi chef to your backyard across ${s.name}. Serving ${s.cities.slice(0,5).join(', ')} and more. $55/adult, $550 minimum. Fire show included.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${DOMAIN}/${s.slug}/">
  <meta property="og:title" content="Hibachi at Home ${s.name} | Everlasting Hibachi">
  <meta property="og:description" content="Private hibachi chef in ${s.name}. $55/adult, $550 minimum. Fire show included. Serving ${s.cities.slice(0,4).join(', ')} and more.">
  <meta property="og:url" content="${DOMAIN}/${s.slug}/">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"LocalBusiness","name":"Everlasting Hibachi","url":"${DOMAIN}/","telephone":"+1-${PHONE_RAW}","email":"${EMAIL}","description":"Private hibachi chef and mobile hibachi catering in ${s.name}.","areaServed":${JSON.stringify(s.cities.map(c => ({"@type":"City","name":c,"addressRegion":s.abbr})))},"priceRange":"$$","servesCuisine":["Hibachi","Teppanyaki","Japanese Steakhouse"]}
  </script>
</head>
<body>
${NAV}

<div class="location-hero">
  <div class="container">
    <div class="location-breadcrumb">
      <a href="/">Home</a>
      <span>›</span>
      <a href="/service-area/">Locations</a>
      <span>›</span>
      <span>${s.name}</span>
    </div>
    <div class="hero-badge" style="margin-bottom:1.25rem">${s.emoji} ${s.name} · Private Hibachi Chef</div>
    <h1>Hibachi at Home <em>${s.name}</em></h1>
    <p class="hero-desc">${s.desc} We bring the chef, grill, fresh ingredients, and live fire show directly to your home. Serving <strong>${allCities}</strong>.</p>
    <div class="hero-actions" style="margin-top:2rem">
      <a href="/book-online/" class="btn btn-primary btn-lg">🔥 Book Your Party</a>
      <a href="tel:${PHONE_RAW}" class="btn btn-outline btn-lg">📞 ${PHONE}</a>
    </div>
    <div class="location-quick-info">
      <div class="quick-info-item"><span class="qi-icon">💵</span> <span>From <strong>$55</strong>/adult</span></div>
      <div class="quick-info-item"><span class="qi-icon">📋</span> <span><strong>$550</strong> minimum</span></div>
      <div class="quick-info-item"><span class="qi-icon">🔥</span> <span><strong>Fire show</strong> included</span></div>
      <div class="quick-info-item"><span class="qi-icon">🌿</span> <span><strong>Outdoor</strong> events only</span></div>
    </div>
  </div>
</div>

<!-- Cities -->
<section class="section" style="background:#fff">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">Cities We Serve</div>
      <h2 class="section-title reveal">Hibachi Delivery Across <em>${s.name}</em></h2>
      <p class="section-desc reveal">Find your city below. Don't see yours? Call us — we may still be able to travel to your location.</p>
    </div>
    <div class="areas-grid reveal" style="margin-top:3rem">
      ${s.cityLinks.map((c, i) => `<div class="area-card">
        <div class="area-state">${s.name}</div>
        <h3>${c.name} Hibachi at Home</h3>
        <p class="area-cities">Private hibachi chef for backyard parties in ${c.name} and surrounding communities.</p>
        <a href="/${c.slug}/" class="area-link">View ${c.name} Page</a>
      </div>`).join('\n      ')}
      <div class="area-card" style="background:var(--primary-bg);border-color:rgba(234,88,12,0.2)">
        <div class="area-state" style="color:var(--primary)">Don't See Your City?</div>
        <h3>We May Still Serve You</h3>
        <p class="area-cities">Contact us with your ZIP code, date, and guest count. We'll confirm availability in your area.</p>
        <a href="/contact/" class="area-link">Ask About Your Location</a>
      </div>
    </div>
  </div>
</section>

<!-- How It Works -->
<section class="section" style="background:var(--bg-warm)">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">How It Works</div>
      <h2 class="section-title reveal">Your ${s.name} Hibachi <em>Experience</em></h2>
    </div>
    <div class="steps-grid reveal" style="margin-top:3rem">
      <div class="step-card"><span class="step-num">01</span><div class="step-icon">📅</div><h3 class="step-title">Book Your Date</h3><p class="step-desc">Call ${PHONE} or submit a booking request. We confirm availability and collect a 20–30% deposit to secure your ${s.name} event date.</p></div>
      <div class="step-card"><span class="step-num">02</span><div class="step-icon">🍽️</div><h3 class="step-title">Submit Your Order</h3><p class="step-desc">Share your final headcount and protein choices at least 5–10 days before your event. Each guest chooses 2 proteins from our menu.</p></div>
      <div class="step-card"><span class="step-num">03</span><div class="step-icon">🔥</div><h3 class="step-title">Enjoy the Show</h3><p class="step-desc">Your chef arrives 15–45 minutes early for setup, then delivers a live fire show and fresh hibachi meal your guests will never forget.</p></div>
    </div>
  </div>
</section>

<!-- Pricing -->
<section class="section" style="background:#fff">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">Pricing</div>
      <h2 class="section-title reveal">${s.name} Hibachi <em>Pricing</em></h2>
    </div>
    <div class="pricing-grid reveal" style="margin-top:3rem">
      <div class="price-card featured">
        <div class="price-card-icon">🧑</div>
        <div class="price-card-label">Adult (14+)</div>
        <div class="price-card-price"><sup>$</sup>55<sub>/person</sub></div>
        <p class="price-card-note">$550 minimum · All events</p>
        <ul class="price-card-features">
          <li class="price-feat">Choose 2 proteins per person</li>
          <li class="price-feat">Salad, fried rice & vegetables</li>
          <li class="price-feat">Live fire show included</li>
          <li class="price-feat">Chef & all equipment provided</li>
        </ul>
      </div>
      <div class="price-card">
        <div class="price-card-icon">👶</div>
        <div class="price-card-label">Child (Ages 5–13)</div>
        <div class="price-card-price"><sup>$</sup>30<sub>/person</sub></div>
        <p class="price-card-note">Children under 4 are <strong style="color:var(--green)">FREE</strong></p>
        <ul class="price-card-features">
          <li class="price-feat">Choose 1 protein per child</li>
          <li class="price-feat">Salad, fried rice & vegetables</li>
          <li class="price-feat">Kids under 4 always free</li>
          <li class="price-feat">Family-style for all ages</li>
        </ul>
      </div>
    </div>
    <div style="text-align:center;margin-top:2rem">
      <a href="/menu/" class="btn btn-outline">View Full Menu & Add-Ons →</a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section" style="background:var(--bg-warm)">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">FAQ</div>
      <h2 class="section-title reveal">${s.name} Hibachi <em>Questions</em></h2>
    </div>
    <div class="faq-list reveal" style="margin-top:3rem">
      <div class="faq-item"><button class="faq-question">Do you serve all of ${s.name}?<span class="faq-icon">+</span></button><div class="faq-answer">Yes! We serve ${allCities} and surrounding communities. Contact us with your location for confirmation.</div></div>
      <div class="faq-item"><button class="faq-question">What is the minimum for a ${s.name} event?<span class="faq-icon">+</span></button><div class="faq-answer">All events have a $550 minimum spend. Pricing is $55 per adult and $30 per child (ages 5–13). Children under 4 are always free.</div></div>
      <div class="faq-item"><button class="faq-question">What proteins are available in ${s.name}?<span class="faq-icon">+</span></button><div class="faq-answer">Choose 2 proteins per adult from: Chicken, Steak, Shrimp, Scallop, Salmon, Tofu. Upgrades: Filet Mignon (+$5), Lobster Tail (+$10).</div></div>
      <div class="faq-item"><button class="faq-question">How far in advance should I book?<span class="faq-icon">+</span></button><div class="faq-answer">We recommend booking as early as possible to secure your preferred date. A 20–30% deposit confirms your booking, and final headcount is due 5–10 days before your event.</div></div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2 class="section-title" style="color:#fff">Book Your ${s.name} Hibachi Party</h2>
    <p class="section-desc" style="color:rgba(255,255,255,0.8)">Call us or submit a request — we'll confirm your date and walk you through the next steps.</p>
    <div class="cta-actions">
      <a href="/book-online/" class="btn btn-ghost btn-lg">🔥 Book Online</a>
      <a href="tel:${PHONE_RAW}" class="btn btn-gold btn-lg">📞 ${PHONE}</a>
    </div>
  </div>
</section>

${FOOTER}
</body>
</html>`;
  }

  // City page
  if (type === 'city') {
    const c = data;
    const nearbyList = c.nearby.join(', ');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hibachi at Home ${c.name} ${c.abbr} | Everlasting Hibachi | Private Chef</title>
  <meta name="description" content="Book a private hibachi chef in ${c.name}, ${c.state}. Everlasting Hibachi brings the grill, chef & fire show to your backyard. $55/adult, $550 minimum. Serving ${c.name} and surrounding areas.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${DOMAIN}/${c.slug}/">
  <meta property="og:title" content="Hibachi at Home ${c.name} | Everlasting Hibachi">
  <meta property="og:description" content="Private hibachi chef in ${c.name}, ${c.abbr}. $55/adult, $550 minimum. Fire show included. We come to your backyard.">
  <meta property="og:url" content="${DOMAIN}/${c.slug}/">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"LocalBusiness","name":"Everlasting Hibachi — ${c.name}","url":"${DOMAIN}/${c.slug}/","telephone":"+1-${PHONE_RAW}","email":"${EMAIL}","description":"Private hibachi chef and mobile hibachi catering for backyard parties in ${c.name}, ${c.state}.","areaServed":[{"@type":"City","name":"${c.name}","addressRegion":"${c.abbr}"}],"priceRange":"$$","servesCuisine":["Hibachi","Teppanyaki"]}
  </script>
</head>
<body>
${NAV}

<div class="location-hero">
  <div class="container">
    <div class="location-breadcrumb">
      <a href="/">Home</a>
      <span>›</span>
      <a href="/service-area/">Locations</a>
      <span>›</span>
      <a href="/${c.stateSlug}/">${c.state}</a>
      <span>›</span>
      <span>${c.name}</span>
    </div>
    <div class="hero-badge" style="margin-bottom:1.25rem">${c.emoji} ${c.name}, ${c.abbr} · Private Hibachi Chef</div>
    <h1>Hibachi at Home <em>${c.name}</em></h1>
    <p class="hero-desc">${c.desc} We bring the chef, hibachi grill, fresh ingredients, and a live fire show directly to your home. Also serving <strong>${nearbyList}</strong>.</p>
    <div class="hero-actions" style="margin-top:2rem">
      <a href="/book-online/" class="btn btn-primary btn-lg">🔥 Book Your ${c.name} Party</a>
      <a href="tel:${PHONE_RAW}" class="btn btn-outline btn-lg">📞 ${PHONE}</a>
    </div>
    <div class="location-quick-info">
      <div class="quick-info-item"><span class="qi-icon">💵</span> <span>From <strong>$55</strong>/adult</span></div>
      <div class="quick-info-item"><span class="qi-icon">📋</span> <span><strong>$550</strong> minimum</span></div>
      <div class="quick-info-item"><span class="qi-icon">🔥</span> <span><strong>Fire show</strong> included</span></div>
      <div class="quick-info-item"><span class="qi-icon">👶</span> <span>Under 4 <strong>FREE</strong></span></div>
    </div>
  </div>
</div>

<!-- Why Choose Us -->
<section class="section" style="background:#fff">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">Private Hibachi in ${c.name}</div>
      <h2 class="section-title reveal">Your ${c.name} Backyard <em>Becomes the Restaurant</em></h2>
      <p class="section-desc reveal">No reservation, no restaurant. We bring everything directly to you — chef, grill, fresh food, and a live fire show your guests won't stop talking about.</p>
    </div>
    <div class="features-grid reveal" style="margin-top:3rem;grid-template-columns:repeat(4,1fr)">
      <div class="feature-card" style="background:var(--bg-warm);border-color:var(--border-warm)">
        <div class="feature-icon">🔥</div>
        <h3 style="color:var(--text)">Fire Show</h3>
        <p style="color:var(--text-muted)">Live fire performance included with every booking — no extra charge.</p>
      </div>
      <div class="feature-card" style="background:var(--bg-warm);border-color:var(--border-warm)">
        <div class="feature-icon">🏡</div>
        <h3 style="color:var(--text)">We Come to You</h3>
        <p style="color:var(--text-muted)">Your ${c.name} backyard, patio, or outdoor space becomes the stage.</p>
      </div>
      <div class="feature-card" style="background:var(--bg-warm);border-color:var(--border-warm)">
        <div class="feature-icon">🍺</div>
        <h3 style="color:var(--text)">BYOB-Friendly</h3>
        <p style="color:var(--text-muted)">Bring your own drinks. We focus on the food and the entertainment.</p>
      </div>
      <div class="feature-card" style="background:var(--bg-warm);border-color:var(--border-warm)">
        <div class="feature-icon">🧹</div>
        <h3 style="color:var(--text)">No Cleanup</h3>
        <p style="color:var(--text-muted)">We bring and take away all cooking equipment. Zero cleanup stress.</p>
      </div>
    </div>
  </div>
</section>

<!-- Pricing -->
<section class="section" style="background:var(--bg-warm)">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">Pricing</div>
      <h2 class="section-title reveal">${c.name} Hibachi <em>Pricing</em></h2>
      <p class="section-desc reveal">All-inclusive pricing — salad, fried rice, vegetables, 2 proteins, and the fire show.</p>
    </div>
    <div class="pricing-grid reveal" style="margin-top:3rem">
      <div class="price-card featured">
        <div class="price-card-icon">🧑</div>
        <div class="price-card-label">Adult (14+)</div>
        <div class="price-card-price"><sup>$</sup>55<sub>/person</sub></div>
        <p class="price-card-note">$550 minimum for all events</p>
        <ul class="price-card-features">
          <li class="price-feat">Choose 2 proteins per person</li>
          <li class="price-feat">Salad, fried rice & vegetables</li>
          <li class="price-feat">Live fire show</li>
          <li class="price-feat">20–30% deposit to secure date</li>
        </ul>
      </div>
      <div class="price-card">
        <div class="price-card-icon">👶</div>
        <div class="price-card-label">Child (Ages 5–13)</div>
        <div class="price-card-price"><sup>$</sup>30<sub>/person</sub></div>
        <p class="price-card-note">Under 4 are <strong style="color:var(--green)">FREE</strong></p>
        <ul class="price-card-features">
          <li class="price-feat">Choose 1 protein per child</li>
          <li class="price-feat">Salad, fried rice & vegetables</li>
          <li class="price-feat">Kids under 4 always free</li>
          <li class="price-feat">Family-style for all ages</li>
        </ul>
      </div>
    </div>
    <div style="text-align:center;margin-top:2rem">
      <a href="/menu/" class="btn btn-outline">Full Menu & Add-Ons →</a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section" style="background:#fff">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">FAQ</div>
      <h2 class="section-title reveal">${c.name} Hibachi <em>Questions</em></h2>
    </div>
    <div class="faq-list reveal" style="margin-top:3rem;max-width:780px;margin-left:auto;margin-right:auto">
      <div class="faq-item"><button class="faq-question">Do you serve ${c.name}, ${c.abbr}?<span class="faq-icon">+</span></button><div class="faq-answer">Yes! We serve ${c.name} and surrounding areas including ${nearbyList}. Contact us with your exact address to confirm availability.</div></div>
      <div class="faq-item"><button class="faq-question">How much does hibachi at home cost in ${c.name}?<span class="faq-icon">+</span></button><div class="faq-answer">Pricing is $55 per adult and $30 per child (ages 5–13). Children under 4 are always free. All events have a $550 minimum. Gratuity is not included.</div></div>
      <div class="faq-item"><button class="faq-question">What is included in the ${c.name} hibachi package?<span class="faq-icon">+</span></button><div class="faq-answer">Every guest receives a side salad, fried rice, hibachi vegetables, and 2 protein choices. A live fire show is included with every event at no extra cost.</div></div>
      <div class="faq-item"><button class="faq-question">What do I need to have ready in ${c.name}?<span class="faq-icon">+</span></button><div class="faq-answer">Set up tables and chairs, and provide plates, utensils, and beverages. We bring the chef, grill, and all ingredients. You need a safe, dry outdoor cooking area.</div></div>
      <div class="faq-item"><button class="faq-question">How do I book a ${c.name} hibachi party?<span class="faq-icon">+</span></button><div class="faq-answer">Call ${PHONE} or submit a booking request online. We'll confirm availability, collect a 20–30% deposit, and handle the rest. Final headcount is due 5–10 days before your event.</div></div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2 class="section-title" style="color:#fff">Book Your ${c.name} Hibachi Party Today</h2>
    <p class="section-desc" style="color:rgba(255,255,255,0.8)">We serve ${c.name} and surrounding communities. Submit a request online or call us to check availability.</p>
    <div class="cta-actions">
      <a href="/book-online/" class="btn btn-ghost btn-lg">🔥 Book Online</a>
      <a href="tel:${PHONE_RAW}" class="btn btn-gold btn-lg">📞 ${PHONE}</a>
    </div>
    <p style="color:rgba(255,255,255,0.5);font-size:0.83rem;margin-top:1.5rem">Also serving: ${nearbyList}</p>
  </div>
</section>

${FOOTER}
</body>
</html>`;
  }
}

// Generate state pages
for (const s of states) {
  const dir = join(BASE, s.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), makePage('state', s));
  console.log(`✓ State: /${s.slug}/`);
}

// Generate city pages
for (const c of cities) {
  const dir = join(BASE, c.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), makePage('city', c));
  console.log(`✓ City: /${c.slug}/`);
}

console.log('\n✅ All location pages generated!');
