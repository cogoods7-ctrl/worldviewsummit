// api/content.js
// GET /api/content?page=schedule|locations|guide|faq
// Only returns the actual page HTML if the request carries a valid session
// cookie (set by /api/login.js after a correct password). This is the file
// that makes the protection real: unauthenticated requests never receive
// the protected markup at all.
//
// Note: each value below is the INNER content only (no outer
// <div id="page-x" class="page"> wrapper, no top spacer div) — those live
// permanently in index.html so the page shell exists immediately, while
// this content is injected inside it only after authentication succeeds.

const { isSiteAuthenticated } = require('./_lib/auth');

const PAGES = {
  schedule: `  <section class="section section-dark" style="padding-bottom:48px;">
    <div class="section-inner">
      <div class="section-label">Full Itinerary</div>
      <h2 class="section-title">January 18–22, 2027</h2>
      <div class="divider"></div>
      <p class="section-body">This is the current working agenda and it is subject to change. Items marked <strong style="color:#fff;">TBD</strong> are still being finalized, and items marked <strong style="color:#fff;">$</strong> are paid for on your own. Pre-Summit events at MHA are on the first tab.</p>
    </div>
  </section>
  <section class="section section-cream">
    <div class="section-inner">
      <div class="schedule-tabs">
        <button class="schedule-tab active" onclick="showDay('day0',this)">Pre-Summit</button>
        <button class="schedule-tab" onclick="showDay('day1',this)">Mon, Jan 18</button>
        <button class="schedule-tab" onclick="showDay('day2',this)">Tue, Jan 19</button>
        <button class="schedule-tab" onclick="showDay('day3',this)">Wed, Jan 20</button>
        <button class="schedule-tab" onclick="showDay('day4',this)">Thu, Jan 21</button>
        <button class="schedule-tab" onclick="showDay('day5',this)">Fri, Jan 22</button>
      </div>
      <div id="day0" class="day-panel active"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Pre-Summit Events</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">At MHA, before the trip</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">Mon, Jan 11 · 8:30–9:00 AM</div><div class="timeline-title">Pre-Summit Convocation (Gym)</div><div class="timeline-desc">Marius Pienaar: Immigration</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">Tue, Jan 12 · 10:15–11:50 AM</div><div class="timeline-title">Pre-Summit Convocation &amp; Discussion Groups (Gym)</div><div class="timeline-desc">Glenn Duerr: Patriotism and the Cross</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item tba"><div class="time-label">Fri, Jan 15 · 7:00–9:30 PM</div><div class="timeline-title">Worldview Summit Pre-Watching</div><div class="timeline-desc">The Immigration Crisis that will Destroy the West (Schatz House)</div><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div></div></div>
      <div id="day1" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Monday, January 18 — Travel Day</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Departure &amp; arrival in D.C.</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">6:45 AM</div><div class="timeline-title">Report to MHA &amp; Load Bus</div></div><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Departure &amp; Lunch on the Road</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Arrival in D.C. &amp; Check into Capitol Hill Hotel</div></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Dinner: CAVA</div><div class="timeline-desc">Catering at the hotel.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">7:30 PM</div><div class="timeline-title">Evening Activity: National Mall Monuments</div><div class="timeline-desc">Washington, Lincoln, WWII, Vietnam, Korea</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day2" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Tuesday, January 19 — Museum of the Bible</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day One of the Summit</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast: Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:00 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">8:15 AM</div><div class="timeline-title">Walk to Museum of the Bible</div></div><div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Session 1 — John Fry</div><div class="timeline-desc">Launching Out: A Christian Perspective on the History of Immigration to America</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">10:15 AM</div><div class="timeline-title">Session 2 — Luma Simms</div><div class="timeline-desc">The Bond Between Creed and Covenant</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">11:15 AM</div><div class="timeline-title">Session 3 — Luma Simms</div><div class="timeline-desc">Illegals, Refugees, and Human Dignity</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">12:00 PM</div><div class="timeline-title">Afternoon Activity: Touring the Museum of the Bible</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">12:30 PM</div><div class="timeline-title">Lunch: Catering at Museum of the Bible</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">1:30 PM</div><div class="timeline-title">Session 4 — Paul Miller</div><div class="timeline-desc">Christian Nationalism</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">2:45 PM</div><div class="timeline-title">Session 5 — Andrew Spangenberg</div><div class="timeline-desc">Are There Limits to Religious Liberty?</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">3:45 PM</div><div class="timeline-title">Afternoon Activity: Touring the Museum of the Bible</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Depart Museum of the Bible</div></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Dinner: Neighborhood Restaurants</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">7:00 PM</div><div class="timeline-title">Evening Activity</div><div class="timeline-desc">Capitals Hockey Game ($) <em>or</em> Ice Skating ($) <em>or</em> More Monuments Walk <em>or</em> Game Night at Hotel</div><span class="timeline-tag pay" style="margin-right:6px;">$ On Some Options</span></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day3" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Wednesday, January 20 — Capitol Hill Baptist Church</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day Two of the Summit · Two options</p></div><div style="font-family:'Josefin Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin:8px 0 24px;padding-bottom:8px;border-bottom:1px solid var(--border);">Option 1</div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast: Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 9:00 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">9:30 AM</div><div class="timeline-title">Depart for Touring</div></div><div class="timeline-item"><div class="time-label">10:00 AM</div><div class="timeline-title">Morning Activity</div><div class="timeline-desc">National Museum of Natural History <em>or</em> Gallery of Art</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">12:00 PM</div><div class="timeline-title">Lunch: Union Station</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">1:00 PM</div><div class="timeline-title">Walk to Capitol Hill Baptist Church</div></div><div class="timeline-item tba"><div class="time-label">1:30 PM</div><div class="timeline-title">Session 6 — Gary Smith</div><div class="timeline-desc">Topic TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item tba"><div class="time-label">2:45 PM</div><div class="timeline-title">Session 7 — Richard Samuelson</div><div class="timeline-desc">Topic TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item"><div class="time-label">3:45 PM</div><div class="timeline-title">Depart Capitol Hill Baptist Church for Capitol Hill Hotel</div></div><div class="timeline-item"><div class="time-label">4:30 PM</div><div class="timeline-title">Depart Capitol Hill Hotel for the Capitol</div></div><div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Capitol Tour</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">7:00 PM</div><div class="timeline-title">Dinner: Neighborhood Restaurants</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">7:00 PM</div><div class="timeline-title">Evening Activity</div><div class="timeline-desc">Capitol Hill Baptist Bible Study / Game Night</div></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div><div style="font-family:'Josefin Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin:56px 0 24px;padding-bottom:8px;border-bottom:1px solid var(--border);">Option 2</div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast: Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 9:00 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">9:30 AM</div><div class="timeline-title">Depart for Touring</div></div><div class="timeline-item"><div class="time-label">10:00 AM</div><div class="timeline-title">Morning Activity</div><div class="timeline-desc">National Museum of Natural History <em>or</em> Gallery of Art</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">12:00 PM</div><div class="timeline-title">Lunch: Union Station</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">1:00 PM</div><div class="timeline-title">Walk to Capitol Hill Baptist Church</div></div><div class="timeline-item tba"><div class="time-label">1:30 PM</div><div class="timeline-title">Session 6 — Richard Samuelson</div><div class="timeline-desc">Topic TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item tba"><div class="time-label">2:45 PM</div><div class="timeline-title">Session 7 — Speaker TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item"><div class="time-label">3:45 PM</div><div class="timeline-title">Depart Capitol Hill Baptist Church</div></div><div class="timeline-item"><div class="time-label">4:30 PM</div><div class="timeline-title">Dinner: Neighborhood Restaurants</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Arrive at Capitol Hill Hotel</div></div><div class="timeline-item"><div class="time-label">7:00 PM</div><div class="timeline-title">Depart for the Capitol</div></div><div class="timeline-item"><div class="time-label">7:30 PM</div><div class="timeline-title">Capitol Tour</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day4" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Thursday, January 21 — Heritage Foundation</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day Three of the Summit</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast: Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:30 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Walk to Heritage Foundation</div></div><div class="timeline-item"><div class="time-label">9:30 AM</div><div class="timeline-title">Session 8 — Ron Simmons</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">10:30 AM</div><div class="timeline-title">Session 9 — Heritage Speakers</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">11:30 AM</div><div class="timeline-title">Session 10 — Heritage Speakers</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">12:30 PM</div><div class="timeline-title">Lunch: Santa Rosa</div><div class="timeline-desc">Catering at Heritage.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">1:30 PM</div><div class="timeline-title">Depart Heritage for Touring</div></div><div class="timeline-item"><div class="time-label">2:00 PM</div><div class="timeline-title">Afternoon Activity</div><div class="timeline-desc"><strong>Block 1:</strong> Air and Space Museum <em>or</em> Supreme Court.<br><strong>Block 2:</strong> Air and Space Museum <em>or</em> Botanical Gardens <em>or</em> Library of Congress <em>or</em> Free Time.</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Dinner: Capitol Hill Club</div><div class="timeline-desc">With discussion groups.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">7:30 PM</div><div class="timeline-title">Session 11 — Abby Balmert, SBA</div><div class="timeline-desc">Fatal Mistake: How SCOTUS Betrayed Babies</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">8:30 PM</div><div class="timeline-title">Open Mic Sharing</div></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day5" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Friday, January 22 — Return Day</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">March for Life &amp; the trip home</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast: Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 9:00 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Check Out &amp; Store Luggage</div></div><div class="timeline-item"><div class="time-label">10:00 AM</div><div class="timeline-title">March for Life Rally <em>or</em> American History Museum</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">1:00 PM</div><div class="timeline-title">March for Life</div></div><div class="timeline-item"><div class="time-label">2:30 PM</div><div class="timeline-title">Load Bus &amp; Lunch on the Road</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">6:30 PM</div><div class="timeline-title">Dinner on the Road</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">Arrive at MHA</div></div></div></div>
    </div>
  </section>
`,

  locations: `  <section class="section section-dark" style="padding-bottom:48px;">
    <div class="section-inner">
      <div class="section-label">Where We Go</div>
      <h2 class="section-title">Washington, D.C.</h2>
      <div class="divider"></div>
      <p class="section-body">The 2027 Summit takes place entirely in Washington, D.C. Here is where the week's sessions, meals, and tours happen.</p>
    </div>
  </section>
  <section class="section section-cream">
    <div class="section-inner">
      <div class="locations-grid">
        <div class="location-card"><span class="location-icon">📖</span><div class="location-name">Museum of the Bible</div><div class="location-address">400 4th St SW, Washington, D.C.</div><p class="location-desc">Tuesday's home base. Students hear five speaker sessions, eat lunch on site, and tour the museum.</p></div><div class="location-card"><span class="location-icon">⛪</span><div class="location-name">Capitol Hill Baptist Church</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Wednesday afternoon's speaker sessions. Under the first Wednesday option, the evening also includes a Bible study and game night here.</p></div><div class="location-card"><span class="location-icon">🏛️</span><div class="location-name">Heritage Foundation</div><div class="location-address">214 Massachusetts Ave NE, Washington, D.C.</div><p class="location-desc">Thursday's home base. Students hear speaker sessions in the morning and eat lunch on site.</p></div><div class="location-card"><span class="location-icon">🍽️</span><div class="location-name">Capitol Hill Club</div><div class="location-address">300 First St SE, Washington, D.C.</div><p class="location-desc">Thursday dinner, with discussion groups.</p></div><div class="location-card"><span class="location-icon">🦅</span><div class="location-name">National Mall Monuments</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Monday evening: the Washington, Lincoln, WWII, Vietnam, and Korea monuments.</p></div><div class="location-card"><span class="location-icon">🇺🇸</span><div class="location-name">U.S. Capitol</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Wednesday's Capitol tour.</p></div><div class="location-card"><span class="location-icon">🚉</span><div class="location-name">Union Station</div><div class="location-address">50 Massachusetts Ave NE, Washington, D.C.</div><p class="location-desc">Wednesday lunch, on your own ($).</p></div><div class="location-card"><span class="location-icon">🏨</span><div class="location-name">Capitol Hill Hotel</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Check in Monday at 5:00 PM, breakfast each morning, and check out Friday at 9:00 AM.</p></div><div class="location-card"><span class="location-icon">🕊️</span><div class="location-name">March for Life</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Friday: the rally in the morning (or the American History Museum), then the March for Life at 1:00 PM.</p></div><div class="location-card"><span class="location-icon">🖼️</span><div class="location-name">Natural History Museum &amp; Gallery of Art</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Wednesday morning: students visit the National Museum of Natural History or the Gallery of Art.</p></div><div class="location-card"><span class="location-icon">🏺</span><div class="location-name">American History Museum</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Friday morning option, as an alternative to the March for Life rally.</p></div><div class="location-card"><span class="location-icon">🚀</span><div class="location-name">Thursday Afternoon Touring</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Air and Space Museum, Supreme Court, Botanical Gardens, or Library of Congress, with some free time.</p></div>
      </div>
    </div>
  </section>
`,

  guide: `  <section class="section section-dark" style="padding-bottom:48px;">
    <div class="section-inner">
      <div class="section-label">Student Trip Guide</div>
      <h2 class="section-title">Everything you need<br>for the trip</h2>
      <div class="divider"></div>
      <p class="section-body">Packing guidelines and student expectations for the 2027 Worldview Summit.</p>
      <div class="quickfacts-grid">
        <div class="quickfact"><div class="quickfact-label">Dates</div><div class="quickfact-value">Jan 18–22, 2027</div></div>
        <div class="quickfact"><div class="quickfact-label">Report Time</div><div class="quickfact-value">6:45 AM Monday at MHA</div></div>
        <div class="quickfact"><div class="quickfact-label">Back at MHA</div><div class="quickfact-value">Around 12:00 AM Friday night</div></div>
        <div class="quickfact"><div class="quickfact-label">Hotel</div><div class="quickfact-value">Capitol Hill Hotel</div></div>
      </div>
      <div class="guide-nav">
        <a onclick="scrollToGuide('guide-packing')">Packing List</a>
        <a onclick="scrollToGuide('guide-dress')">Dress Code</a>
        <a onclick="scrollToGuide('guide-money')">Meals &amp; Money</a>
        <a onclick="scrollToGuide('guide-expect')">Expectations</a>
        <a onclick="scrollToGuide('guide-merch')">Merchandise</a>
      </div>
    </div>
  </section>

  <section class="section section-light" id="guide-packing">
    <div class="section-inner">
      <div class="section-label">Packing List</div>
      <h2 class="section-title">What to bring</h2>
      <div class="divider"></div>
      <p class="section-body">Plan wisely what you need to bring. Try to pack efficiently while having everything you need.</p>
      <div class="packing-card packing-single">
        <ul class="checklist">
          <li>Your pre-reading folder, Bible, notebook paper, and pens or pencils for note-taking</li><li>Your valid, current driver's license or other state-issued ID, with you at all times (if you're too young to have one, that's fine)</li><li>Clothing (including sleepwear) and personal items for five days and four nights, plus any medication or other special needs</li><li>Warm clothes for cold weather (coat, hat) and comfortable shoes for walking; an umbrella or poncho may be useful</li><li>Money for fast food and food court meals, snacks, drinks, and souvenirs. A pre-paid debit card (or equivalent) is strongly recommended, since more vendors no longer accept cash</li><li>Your favorite snacks and games for the hotel</li><li>A personal water bottle</li><li>Exercise clothes, if you'd like to use the hotel's exercise room</li><li>Your phone, if your parents want you to bring it. Other electronics stay home</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section-cream" id="guide-dress">
    <div class="section-inner">
      <div class="section-label">Dress Code</div>
      <h2 class="section-title">What to wear</h2>
      <div class="divider"></div>
      <p class="section-body">Normal MHA expectations for modesty and propriety apply. Be wise!</p>
      <div class="dress-grid">
        <div class="value-card"><h3>Monday &amp; Friday</h3><p>Warm and casual (no pajamas).</p></div>
        <div class="value-card"><h3>Tuesday – Thursday: “MHA Senior”</h3><p>Warm attire with dress shoes that are comfortable for walking and standing. Boys wear collared, tucked-in shirts with ties; girls wear dress slacks or knee-length skirts or dresses. You may change into dress shoes when you arrive at a venue after a long walk.</p></div>
      </div>
    </div>
  </section>

  <section class="section section-light" id="guide-money">
    <div class="section-inner">
      <div class="section-label">Meals &amp; Money</div>
      <h2 class="section-title">Meals marked $ are on you</h2>
      <div class="divider"></div>
      <p class="meal-note">Meals marked $ on the Schedule are paid for on your own. On the current agenda, those are:</p>
      <ul class="meal-list">
        <li>Monday: lunch on the road</li><li>Tuesday evening: the Capitals hockey game or ice skating, if you choose either</li><li>Wednesday: lunch at Union Station</li><li>Wednesday: dinner at neighborhood restaurants</li><li>Friday: dinner on the road</li>
      </ul>
      <p class="meal-note">The agenda is subject to change, so check the Schedule for the latest.</p>
    </div>
  </section>

  <section class="section section-cream" id="guide-expect">
    <div class="section-inner">
      <div class="section-label">Student Expectations</div>
      <h2 class="section-title">How we carry ourselves</h2>
      <div class="divider"></div>
      <ul class="expect-list">
        <li><strong>Be on time.</strong> Arrive at MHA ready to load and board the bus Monday at 6:45 a.m. Bring your luggage into the gym and wait there for instructions. Throughout the trip, always be on time for everything.</li><li><strong>Stay with the group.</strong> Never go off on your own. Stay with at least one buddy; your room leader should always know where you are.</li><li><strong>Dress properly.</strong> Casual (no pajamas) on Monday and Friday; “MHA Senior” on Tuesday, Wednesday, and Thursday. Remove hats and coats when listening to speakers. If you are not dressed properly, you will be told to change.</li><li><strong>Dress warmly for long walks.</strong> You may wear more comfortable shoes for the walk and change into dress shoes when you arrive.</li><li><strong>Be mindful of your health.</strong> Drink water, eat heartily, and sleep well to stay strong for a full, busy week.</li><li><strong>At the hotel,</strong> do not visit opposite-sex rooms. Stay in your own room after midnight (12:00 a.m.) until morning. Exceptions must be permitted in advance by the teacher in charge.</li><li><strong>Be considerate of others,</strong> including those not in our group. Share the sidewalks, leave doorways unblocked, and be silent in hotel hallways.</li><li><strong>Use technology wisely.</strong> Phones should not be used during speakers or tours. If a phone is used in a distracting or irresponsible way, the privilege may be taken away at the discretion of the teacher in charge. Leave the hotel TV off, and leave your other electronics at home.</li><li><strong>Leave no mess behind</strong> anywhere you go: bus, hotel room, or meals. Clean up after yourself.</li><li><strong>Respect, obey, and enjoy</strong> spending time with the parents participating.</li><li><strong>Pursue loving, God-honoring fellowship</strong> with one another, even those who aren't your best friends.</li>
      </ul>
    </div>
  </section>

  <section class="section section-light" id="guide-merch">
    <div class="section-inner">
      <div class="section-label">Trip Merchandise</div>
      <h2 class="section-title">Show your Summit spirit</h2>
      <div class="divider"></div>
      <p class="section-body">Commemorative 2027 Worldview Summit apparel and gear will be available for order before the trip.</p>
      <div class="merch-card">
        <h4>2027 Summit Store — Coming Soon</h4>
        <p>The Student Leadership Team is finalizing this year's merchandise design, pricing, and sizing.</p>
        <a href="#" onclick="showPage('store');return false;" class="btn-primary">Preview the Store →</a>
      </div>
    </div>
  </section>
`,

  faq: `  <section class="section section-dark" style="padding-bottom:48px;">
    <div class="section-inner">
      <div class="section-label">Frequently Asked Questions</div>
      <h2 class="section-title">Everything you need<br>to know</h2>
      <div class="divider"></div>
      <p class="section-body">Common questions from parents and students about the Summit's structure, length, cost, speakers, and purpose.</p>
    </div>
  </section>
  <section class="section section-cream">
    <div class="section-inner">
      <div class="faq-list">
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">What is the 2027 Summit topic? <span class="faq-icon">+</span></div><div class="faq-a">"One Nation Under God: Allegiance, Assimilation, and the Meaning of America." As America marks the conclusion of its 250th birthday, the Summit explores American identity, the role of faith in public life, the proper limits of government, and immigration policy — from a distinctly Christian worldview.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Who can attend the Worldview Summit? <span class="faq-icon">+</span></div><div class="faq-a">The Worldview Summit is open to all Mars Hill Academy students in grades 9–12 (the Rhetoric School). It is one of the annual highlights of high school life at MHA.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">What are the exact trip dates? <span class="faq-icon">+</span></div><div class="faq-a">The 2027 Worldview Summit runs Monday, January 18 through Friday, January 22, 2027 — a five-day trip including travel. Students report to MHA at 6:45 AM Monday and return to campus around midnight Friday.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Where does the Summit take place? <span class="faq-icon">+</span></div><div class="faq-a">The entire 2027 Summit takes place in Washington, D.C. Students stay at the Capitol Hill Hotel and visit the Museum of the Bible, Capitol Hill Baptist Church, the Heritage Foundation, the Capitol Hill Club, Union Station, the U.S. Capitol, and the National Mall — concluding with the March for Life on Friday.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Who plans and runs the Summit? <span class="faq-icon">+</span></div><div class="faq-a">Students plan and run it. Under the mentorship of faculty advisor Mr. Andy Stapleton, the Student Leadership Team selects the annual theme, recruits speakers, coordinates logistics, leads touring experiences, and facilitates every session.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Who are the 2027 speakers? <span class="faq-icon">+</span></div><div class="faq-a">The current line-up is on the Schedule page and is still being finalized by the Student Leadership Team. Speakers are being recruited from academia, public policy institutions, and advocacy organizations. Visit the Speakers page to see the caliber of past speakers.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Is there a cost to attend? <span class="faq-icon">+</span></div><div class="faq-a">There is a cost covering transportation, hotel, most meals, and event fees. A few meals are self-pay (marked "$" on the schedule). Specific pricing will be communicated by the school. Please contact the MHA office for details: (513) 770-3223 or info@marshill.edu.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">What should students pack? <span class="faq-icon">+</span></div><div class="faq-a">See the Student Guide page for the packing guidelines. In short: warm clothes and comfortable shoes, “MHA Senior” attire for Tuesday through Thursday, and money for the meals marked $ on the Schedule.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Where can I buy Summit merchandise? <span class="faq-icon">+</span></div><div class="faq-a">2027 Summit merchandise ordering will open closer to the trip. Check the Store page for updates.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">How is this different from a regular school trip? <span class="faq-icon">+</span></div><div class="faq-a">The Worldview Summit is not a sightseeing trip — it is a formation event. Students engage speakers from academia, policy institutions, and advocacy organizations on the most pressing cultural questions of our time, from a distinctly Christian vantage point.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">How do I contact the school? <span class="faq-icon">+</span></div><div class="faq-a">Mars Hill Academy's main office: (513) 770-3223 | info@marshill.edu | 4230 Aero Drive, Mason, Ohio 45040. Office hours: Monday–Friday, 8:00 a.m. – 3:30 p.m.</div></div>
      </div>
    </div>
  </section>
`,

};

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isSiteAuthenticated(req)) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const page = req.query.page;
  const html = PAGES[page];
  if (!html) {
    res.status(404).json({ error: 'Unknown page' });
    return;
  }

  res.status(200).json({ html });
};
