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
      <p>© 2026 Everlasting Hibachi. All rights reserved.</p>
      <p>Serving GA · TN · AL · NC · SC</p>
      <p style="font-size:0.75rem;opacity:0.5">Design by <a href="https://70nyc.com" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">70NYC</a></p>
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

// City pages removed — only state-level pages are used.

function bookingFormHTML(locationLabel) {
  return `
<!-- Booking Form -->
<section class="section" id="book" style="background:var(--bg-warm)">
  <div class="container">
    <div class="text-center" style="margin-bottom:3rem">
      <div class="section-label reveal">Reserve Your Date</div>
      <h2 class="section-title reveal">Book Your <em>${locationLabel}</em> Hibachi Party</h2>
      <p class="section-desc reveal">Fill out the form below and we'll reach out within 24 hours to confirm your date and collect your deposit.</p>
    </div>
    <div class="booking-form-full reveal">
      <div class="bf-header">
        <h2>🔥 Everlasting Hibachi — Outdoor Hibachi Show</h2>
        <p>Private hibachi chef · Serving GA, TN, AL, NC &amp; SC</p>
      </div>
      <div class="bf-info-box">
        <p>📲 Please make sure your contact number is a <strong>CELL PHONE</strong>.</p>
        <p>💰 $550.00 Minimum spend &nbsp;·&nbsp; $55.00/adult &nbsp;·&nbsp; $30.00/child (5–13) &nbsp;·&nbsp; Under 4 FREE</p>
        <p>💰 Chef Gratuity is <strong>NOT included</strong>. &nbsp;·&nbsp; Deposit: 20–30% required to secure your date.</p>
        <p>🍱 Final headcount &amp; food orders due <strong>5–10 days before</strong> your event.</p>
        <p>🍗 <strong>Protein Choices</strong> — 2 per adult · 2 per child: Chicken · Steak · Shrimp · Salmon · Tofu · Scallop &nbsp;·&nbsp; Upgrades: Filet Mignon +$5 · Lobster +$10</p>
      </div>
      <div class="bf-body">
        <!-- Step indicator -->
        <div id="step-indicator" style="display:flex;gap:0;margin-bottom:1.5rem;border-radius:var(--radius);overflow:hidden;border:1.5px solid var(--primary-lt)">
          <div id="step-tab-1" style="flex:1;text-align:center;padding:0.6rem 0.5rem;font-size:0.82rem;font-weight:700;background:var(--primary);color:#fff;transition:all .2s">Step 1 · Your Info &amp; Quote</div>
          <div id="step-tab-2" style="flex:1;text-align:center;padding:0.6rem 0.5rem;font-size:0.82rem;font-weight:700;background:#fff;color:var(--text-muted);transition:all .2s">Step 2 · Food &amp; Details</div>
        </div>

        <form action="https://api.web3forms.com/submit" method="POST" onsubmit="updateQuote()">
          <input type="hidden" name="access_key" value="bd4a4810-7d3c-4c8b-8e0d-a338bae94cf8">
          <input type="hidden" name="subject" value="🔥 New Hibachi Booking — ${locationLabel} — Everlasting Hibachi">
          <input type="hidden" name="from_name" value="Everlasting Hibachi Website">
          <input type="hidden" name="redirect" value="https://www.everlastinghibachi.com/thank-you/">
          <input type="hidden" name="location_page" value="${locationLabel}">
          <input type="checkbox" name="botcheck" style="display:none">

          <!-- STEP 1 -->
          <div id="form-step-1">
            <div class="bf-section-title">Contact Information</div>
            <div class="bf-row">
              <div class="bf-group"><label>First Name <span>*</span></label><input type="text" name="first_name" placeholder="First name" required></div>
              <div class="bf-group"><label>Last Name <span>*</span></label><input type="text" name="last_name" placeholder="Last name" required></div>
            </div>
            <div class="bf-group">
              <label>Cell Phone <span>*</span></label>
              <div class="bf-phone-row"><span class="bf-phone-prefix">🇺🇸 +1</span><input type="tel" name="phone" placeholder="(XXX) XXX-XXXX" required></div>
            </div>
            <div class="bf-group"><label>Email Address <span>*</span></label><input type="email" name="email" placeholder="your@email.com" required></div>

            <div class="bf-section-title">Event Details</div>
            <div class="bf-row">
              <div class="bf-group"><label>Event Date <span>*</span></label><input type="date" name="event_date" required></div>
              <div class="bf-group"><label>Start Time <span>*</span></label>
                <select name="start_time" required>
                  <option value="">Select a time...</option>
                  <option>11:00 AM</option><option>12:00 PM</option><option>1:00 PM</option><option>2:00 PM</option>
                  <option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option><option>6:00 PM</option>
                  <option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option>
                </select>
              </div>
            </div>

            <div class="bf-section-title">Event Location</div>
            <div class="bf-group"><label>Full Party Address <span>*</span> <small style="font-weight:400;color:var(--text-muted)">(House #, Street, Town, ZIP)</small></label><input type="text" name="address" placeholder="e.g. 123 Main St, ${locationLabel} 30301" required></div>

            <div class="bf-section-title">Guest Count</div>
            <div class="bf-row">
              <div class="bf-group"><label>Adults (14+) <span>*</span></label><input type="number" id="calc_adults" name="adults" placeholder="e.g. 10" min="0" required oninput="updateQuote()"></div>
              <div class="bf-group"><label>Children (5–13)</label><input type="number" id="calc_children" name="children" placeholder="e.g. 3" min="0" value="0" oninput="updateQuote()"></div>
            </div>
            <div class="bf-group"><label>Under 4 (FREE)</label><input type="number" name="children_under_4" placeholder="e.g. 1" min="0" value="0"></div>

            <div id="price-estimate" style="display:none;background:linear-gradient(135deg,var(--primary-bg),#fff8f2);border:2px solid var(--primary-lt);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;margin-bottom:1rem">
              <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--primary-lt);margin-bottom:0.75rem">Estimated Quote</div>
              <div style="display:flex;flex-wrap:wrap;gap:0.5rem 2rem;margin-bottom:0.75rem;font-size:0.9rem;color:var(--text-muted)" id="price-breakdown"></div>
              <div style="display:flex;align-items:baseline;gap:0.75rem;flex-wrap:wrap">
                <div style="font-family:var(--font-head);font-size:2rem;font-weight:900;color:var(--primary-lt)" id="price-total"></div>
                <div style="font-size:0.82rem;color:var(--text-muted)" id="price-note"></div>
              </div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.6rem;line-height:1.5">* Estimate only · Gratuity not included · Deposit 20–30% required.</div>
            </div>
            <input type="hidden" name="estimated_total" id="estimated_total_input" value="Not calculated (guest count not entered)">
            <script>
            function updateQuote(){
              var a=parseInt(document.getElementById('calc_adults').value)||0;
              var c=parseInt(document.getElementById('calc_children').value)||0;
              var el=document.getElementById('price-estimate');
              if(a===0&&c===0){el.style.display='none';return;}
              var food=(a*55)+(c*30),min=550,foodFinal=Math.max(food,min);
              var addons=0,addonLines=[];
              if(document.getElementById('ao_gyoza')&&document.getElementById('ao_gyoza').checked){addons+=8;addonLines.push('Gyoza $8');}
              if(document.getElementById('ao_edamame')&&document.getElementById('ao_edamame').checked){addons+=7;addonLines.push('Edamame $7');}
              if(document.getElementById('ao_noodles')&&document.getElementById('ao_noodles').checked){addons+=5;addonLines.push('Noodles $5');}
              var travel=0;
              if(document.getElementById('travel_fee')&&document.getElementById('travel_fee').checked){travel=100;}
              var grand=foodFinal+addons+travel;
              var b='';
              if(a>0) b+='<span>'+a+' adult'+(a>1?'s':'')+' × $55 = <strong>$'+(a*55)+'</strong></span>';
              if(c>0) b+='<span>'+c+' child'+(c>1?'ren':'')+' × $30 = <strong>$'+(c*30)+'</strong></span>';
              if(food<min) b+='<span>Min. <strong>$'+min+'</strong></span>';
              if(addonLines.length>0) b+='<span>Add-ons: <strong>+$'+addons+'</strong></span>';
              if(travel>0) b+='<span>Travel fee: <strong>+$100</strong></span>';
              document.getElementById('price-breakdown').innerHTML=b;
              document.getElementById('price-total').textContent='$'+grand.toLocaleString();
              document.getElementById('price-note').textContent='estimated total';
              el.style.display='block';
              var summary='Estimated Total: $'+grand;
              if(a>0) summary+=' | Adults: '+a+' × $55 = $'+(a*55);
              if(c>0) summary+=' | Children: '+c+' × $30 = $'+(c*30);
              if(food<min) summary+=' | $550 minimum applied';
              if(addonLines.length>0) summary+=' | Add-ons: '+addonLines.join(', ')+' = $'+addons;
              if(travel>0) summary+=' | Travel fee: $100';
              document.getElementById('estimated_total_input').value=summary;
            }
            function goStep2(){
              var s1=document.getElementById('form-step-1');
              var inputs=s1.querySelectorAll('input[required],select[required]');
              for(var i=0;i<inputs.length;i++){if(!inputs[i].value.trim()){inputs[i].focus();inputs[i].reportValidity();return;}}
              updateQuote();
              s1.style.display='none';
              document.getElementById('form-step-2').style.display='block';
              document.getElementById('step-tab-1').style.background='#e8e8e8';
              document.getElementById('step-tab-1').style.color='var(--text-muted)';
              document.getElementById('step-tab-2').style.background='var(--primary)';
              document.getElementById('step-tab-2').style.color='#fff';
              window.scrollTo({top:document.getElementById('step-indicator').offsetTop-80,behavior:'smooth'});
            }
            function goStep1(){
              document.getElementById('form-step-2').style.display='none';
              document.getElementById('form-step-1').style.display='block';
              document.getElementById('step-tab-1').style.background='var(--primary)';
              document.getElementById('step-tab-1').style.color='#fff';
              document.getElementById('step-tab-2').style.background='#fff';
              document.getElementById('step-tab-2').style.color='var(--text-muted)';
              window.scrollTo({top:document.getElementById('step-indicator').offsetTop-80,behavior:'smooth'});
            }
            </script>

            <button type="button" onclick="goStep2()" class="bf-submit" style="margin-top:0.5rem">Next: Food &amp; Details →</button>
            <p class="bf-note">Step 1 of 2 · No commitment until deposit is paid</p>
          </div><!-- /form-step-1 -->

          <!-- STEP 2 -->
          <div id="form-step-2" style="display:none">
            <div class="bf-section-title">Event Details</div>
            <div class="bf-group"><label>Type of Event / Occasion <span>*</span></label>
              <select name="occasion" required>
                <option value="">Select occasion...</option>
                <option>Birthday Party</option><option>Wedding / Rehearsal Dinner</option><option>Anniversary</option>
                <option>Graduation Party</option><option>Bachelorette / Bachelor Party</option>
                <option>Corporate Event / Team Dinner</option><option>Family Reunion</option>
                <option>Vacation Rental / Airbnb</option><option>Holiday Celebration</option><option>Other</option>
              </select>
            </div>
            <div class="bf-group"><label>Guest of Honor <small style="font-weight:400;color:var(--text-muted)">(optional)</small></label><input type="text" name="guest_of_honor" placeholder="e.g. Sarah's 30th Birthday"></div>

            <div class="bf-section-title">Food Order</div>
            <div class="bf-group">
              <label>Protein Selection (2 per adult · 2 per child) <span>*</span>
                <small style="display:block;font-weight:400;color:var(--text-muted);margin-top:0.2rem">Chicken · Steak · Shrimp · Salmon · Tofu · Scallop · Filet Mignon (+$5) · Lobster (+$10). Type <strong>"TBD"</strong> to confirm 5–10 days before event.</small>
              </label>
              <textarea name="food_order" placeholder="e.g. 10 adults: 6 chicken, 4 steak — 3 kids: 3 chicken&#10;OR type TBD to confirm later" required></textarea>
            </div>
            <div class="bf-group"><label>Food Allergies / Dietary Restrictions <span>*</span> <small style="font-weight:400;color:var(--text-muted)">(Gluten-free &amp; HALAL available)</small></label><textarea name="allergies" placeholder="List allergies or type 'None'" style="min-height:70px" required></textarea></div>

            <div class="bf-section-title">Add-Ons</div>
            <div class="bf-group">
              <div style="display:flex;flex-direction:column;gap:0.5rem">
                <label style="display:flex;align-items:center;gap:0.5rem;font-weight:400;font-size:0.95rem;cursor:pointer"><input type="checkbox" id="ao_gyoza" name="addon_gyoza" value="Gyoza (6 pcs) $8" onchange="updateQuote()" style="flex-shrink:0;width:16px;height:16px"> Gyoza (6 pcs) — $8</label>
                <label style="display:flex;align-items:center;gap:0.5rem;font-weight:400;font-size:0.95rem;cursor:pointer"><input type="checkbox" id="ao_edamame" name="addon_edamame" value="Edamame $7" onchange="updateQuote()" style="flex-shrink:0;width:16px;height:16px"> Edamame — $7</label>
                <label style="display:flex;align-items:center;gap:0.5rem;font-weight:400;font-size:0.95rem;cursor:pointer"><input type="checkbox" id="ao_noodles" name="addon_noodles" value="Noodles $5" onchange="updateQuote()" style="flex-shrink:0;width:16px;height:16px"> Noodles — $5</label>
              </div>
            </div>
            <div class="bf-group">
              <label style="display:flex;align-items:flex-start;gap:0.5rem;font-weight:400;font-size:0.95rem;cursor:pointer;line-height:1.5;width:100%">
                <input type="checkbox" id="travel_fee" name="travel_fee" value="Travel fee +$100" onchange="updateQuote()" style="flex-shrink:0;width:16px;height:16px;margin-top:0.2rem">
                <span style="flex:1;min-width:0"><strong>Travel Fee (+$100):</strong> My event is outside the Atlanta metro area</span>
              </label>
            </div>

            <div class="bf-section-title">Other Info</div>
            <div class="bf-group"><label>Special Requests <small style="font-weight:400;color:var(--text-muted)">(optional)</small></label><textarea name="special_requests" placeholder="Theme, setup notes, anything else..." style="min-height:70px"></textarea></div>
            <div class="bf-group"><label>How Did You Hear About Us?</label>
              <select name="referral_source">
                <option value="">Select...</option>
                <option>Google Search</option><option>Instagram</option><option>TikTok</option>
                <option>Facebook</option><option>Friend / Family Referral</option><option>Yelp</option>
                <option>Returning Customer</option><option>Other</option>
              </select>
            </div>

            <div class="bf-terms-box" style="margin-top:1rem">
              A 20–30% non-refundable deposit is required to secure your date. Cancellations less than 72 hours before the event may forfeit the deposit. Final headcount and food orders are due 5–10 days before the event. Everlasting Hibachi is not liable for property damage on the host's premises.
            </div>
            <div class="bf-checkbox-row">
              <input type="checkbox" id="terms_loc_${locationLabel.replace(/\s+/g,'_')}" name="terms_agreed" value="Agreed" required>
              <label for="terms_loc_${locationLabel.replace(/\s+/g,'_')}">I agree to the Terms &amp; Conditions above. <span style="color:var(--primary-lt)">*</span></label>
            </div>
            <div style="background:var(--primary-bg);border-radius:var(--radius);padding:0.9rem 1.1rem;margin-bottom:1.25rem;font-size:0.85rem;color:var(--primary);font-weight:600">
              ⚠️ Double-check your cell phone # and full address (House #, Street, Town, ZIP).
            </div>
            <button type="submit" class="bf-submit">🔥 Submit Booking Request</button>
            <button type="button" onclick="goStep1()" style="display:block;width:100%;margin-top:0.75rem;padding:0.75rem;background:none;border:1.5px solid var(--primary-lt);border-radius:var(--radius);color:var(--primary);font-size:0.95rem;cursor:pointer;font-weight:600">← Back to Step 1</button>
            <p class="bf-note">We'll respond within 24 hours · Questions? Call ${PHONE}</p>
          </div><!-- /form-step-2 -->
        </form>
      </div>
    </div>
  </div>
</section>`;
}

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
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NSX45JTLDM"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NSX45JTLDM');gtag('config','AW-18307599886');</script>
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
    <div class="hero-badge" style="margin-bottom:1.25rem">${s.name} · Private Hibachi Chef</div>
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

<!-- Cities We Serve (text only) -->
<section class="section" style="background:#fff">
  <div class="container">
    <div class="text-center">
      <div class="section-label reveal">Cities We Serve</div>
      <h2 class="section-title reveal">Serving All of <em>${s.name}</em></h2>
      <p class="section-desc reveal">We travel across ${s.name} for private hibachi events. Don't see your city? Contact us — we may still be able to come to you.</p>
    </div>
    <div class="reveal" style="margin-top:2.5rem;text-align:center">
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.75rem">
        ${s.cities.map(city => `<span style="padding:0.55rem 1.25rem;background:var(--bg-warm);border:1.5px solid var(--border-warm);border-radius:999px;font-size:0.9rem;font-weight:600;color:var(--text-2)">${city}</span>`).join('\n        ')}
        <span style="padding:0.55rem 1.25rem;background:var(--primary-bg);border:1.5px solid rgba(234,88,12,0.2);border-radius:999px;font-size:0.9rem;font-weight:600;color:var(--primary-lt)">+ more areas</span>
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

${bookingFormHTML(s.name)}

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
      <div class="faq-item"><button class="faq-question">What proteins are available in ${s.name}?<span class="faq-icon">+</span></button><div class="faq-answer">Choose 2 proteins per adult · 2 per child from: Chicken, Steak, Shrimp, Scallop, Salmon, Tofu. Upgrades: Filet Mignon (+$5), Lobster Tail (+$10).</div></div>
      <div class="faq-item"><button class="faq-question">How far in advance should I book?<span class="faq-icon">+</span></button><div class="faq-answer">We recommend booking as early as possible to secure your preferred date. A 20–30% deposit confirms your booking, and final headcount is due 5–10 days before your event.</div></div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2 class="section-title" style="color:#fff">Book Your ${s.name} Hibachi Party</h2>
    <p class="section-desc" style="color:rgba(255,255,255,0.8)">Call us or submit a request — we'll confirm your date and walk you through the next steps.</p>
    <div class="cta-actions">
      <a href="#book" class="btn btn-ghost btn-lg">🔥 Request Online</a>
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

${bookingFormHTML(c.name + ', ' + c.abbr)}

<section class="cta-section">
  <div class="container">
    <h2 class="section-title" style="color:#fff">Book Your ${c.name} Hibachi Party Today</h2>
    <p class="section-desc" style="color:rgba(255,255,255,0.8)">We serve ${c.name} and surrounding communities. Submit a request online or call us to check availability.</p>
    <div class="cta-actions">
      <a href="#book" class="btn btn-ghost btn-lg">🔥 Request Online</a>
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

console.log('\n✅ All state pages generated!');
