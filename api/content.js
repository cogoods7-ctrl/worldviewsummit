// api/content.js
// GET /api/content?page=schedule|locations|guide
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
      <div id="day0" class="day-panel active"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Pre-Summit Events</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">At MHA, before the trip</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">Mon, Jan 11 · 8:30–9:00 AM</div><div class="timeline-title">Pre-Summit Convocation (Gymnasium)</div><div class="timeline-desc">Marius Pienaar: Personal Reflections on Immigration</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">Tue, Jan 12 · 10:15–11:50 AM</div><div class="timeline-title">Pre-Summit Convocation &amp; Discussion Groups (Gymnasium)</div><div class="timeline-desc">Glenn Duerr: Patriotism and the Cross</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">Fri, Jan 15 · 7:00–9:30 PM</div><div class="timeline-title">Optional Pre-Watching &amp; Discussion (Schatz Home)</div><div class="timeline-desc"><em>The Immigration Crisis that will Destroy the West</em> by The Heritage Foundation</div></div></div></div>
      <div id="day1" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Monday, January 18 — Travel Day</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Departure &amp; arrival in D.C.</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">6:45 AM</div><div class="timeline-title">Report to MHA &amp; Load Bus</div></div><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Departure &amp; Lunch on the Road</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Arrival in D.C. &amp; Check into Capitol Hill Hotel</div></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Dinner at Capitol Hill Hotel</div><div class="timeline-desc">Cava Mediterranean Bar</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">7:30 PM</div><div class="timeline-title">Evening Activity: National Mall Monuments</div><div class="timeline-desc">Washington, Lincoln, WWII, Vietnam, Korea</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day2" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Tuesday, January 19 — Museum of the Bible</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day One of the Summit</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:00 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">8:15 AM</div><div class="timeline-title">Walk to Museum of the Bible</div></div><div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Session 1 — John Fry</div><div class="timeline-desc">Launching Out: A Christian Perspective on the History of Immigration to America</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item tba"><div class="time-label">10:15 AM</div><div class="timeline-title">Session 2 — Speaker TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item tba"><div class="time-label">11:15 AM</div><div class="timeline-title">Session 3 — Speaker TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item"><div class="time-label">12:00 PM</div><div class="timeline-title">Afternoon Activity: Self-Guided Touring at Museum of the Bible</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">12:30 PM</div><div class="timeline-title">Lunch at Museum of the Bible</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">1:30 PM</div><div class="timeline-title">Session 4 — Paul Miller</div><div class="timeline-desc">Christian Nationalism</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">2:45 PM</div><div class="timeline-title">Session 5 — Andrew Spangenberg</div><div class="timeline-desc">Are There Limits to Religious Liberty?</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">3:45 PM</div><div class="timeline-title">Afternoon Activity: Self-Guided Touring at Museum of the Bible</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Dinner at Neighborhood Restaurants</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">7:00 PM</div><div class="timeline-title">Evening Activity</div><div class="timeline-desc">Capitals Hockey Game ($) <em>or</em> Ice Skating ($) <em>or</em> More Monuments Walk <em>or</em> Game Night at Hotel</div><span class="timeline-tag pay" style="margin-right:6px;">$ On Some Options</span></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day3" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Wednesday, January 20 — Capitol Hill Baptist Church</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day Two of the Summit</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 9:00 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">10:00 AM</div><div class="timeline-title">Morning Activity</div><div class="timeline-desc">Natural History Museum <em>or</em> Gallery of Art <em>or</em> Museum of the Bible ($)</div><span class="timeline-tag " style="margin-right:6px;">Touring</span><span class="timeline-tag pay" style="margin-right:6px;">$ On Some Options</span></div><div class="timeline-item"><div class="time-label">12:00 PM</div><div class="timeline-title">Lunch at Union Station</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">1:00 PM</div><div class="timeline-title">Walk to Capitol Hill Baptist Church</div></div><div class="timeline-item"><div class="time-label">1:30 PM</div><div class="timeline-title">Session 6 — Gary Smith</div><div class="timeline-desc">Was America Founded as a Christian Nation?</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">2:45 PM</div><div class="timeline-title">Session 7 — Richard Samuelson</div><div class="timeline-desc">Is America a Nation of Immigrants?</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Evening Activity: U.S. Capitol Building Tour</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">7:00 PM</div><div class="timeline-title">Dinner <em>or</em> Bible Study</div><div class="timeline-desc">Dinner at Neighborhood Restaurants ($) <em>or</em> Evening Activity: Capitol Hill Baptist Church Bible Study</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ On Some Options</span></div><div class="timeline-item"><div class="time-label">8:30 PM</div><div class="timeline-title">Evening Activity: Free Time at Hotel</div></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day4" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Thursday, January 21 — Heritage Foundation</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day Three of the Summit</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:30 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">7:45 AM</div><div class="timeline-title">Optional Morning Activity: Eastern Market</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Walk to Heritage Foundation</div></div><div class="timeline-item"><div class="time-label">9:30 AM</div><div class="timeline-title">Session 8 — Ron Simmons</div><div class="timeline-desc">Topic TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item tba"><div class="time-label">10:30 AM</div><div class="timeline-title">Session 9 — Heritage Foundation Speaker</div><div class="timeline-desc">Topic TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item tba"><div class="time-label">11:30 AM</div><div class="timeline-title">Session 10 — Heritage Foundation Speaker</div><div class="timeline-desc">Topic TBD</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span><span class="timeline-tag tba" style="margin-right:6px;">TBD</span></div><div class="timeline-item"><div class="time-label">12:30 PM</div><div class="timeline-title">Lunch at Heritage: Santa Rosa Tacos</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">1:30 PM</div><div class="timeline-title">Afternoon Activity</div><div class="timeline-desc"><strong>Part 1 (1:30–3:00 PM):</strong> Air and Space Museum <em>or</em> Supreme Court<br><strong>Part 2 (3:00–5:00 PM):</strong> Air and Space Museum <em>or</em> Botanical Gardens <em>or</em> Library of Congress <em>or</em> Free Time at the Hotel</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">Dinner at Capitol Hill Club</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">7:30 PM</div><div class="timeline-title">Session 11 — Abby Balmert</div><div class="timeline-desc">Fatal Mistake: How SCOTUS Betrayed Babies</div><span class="timeline-tag " style="margin-right:6px;">Speaker</span></div><div class="timeline-item"><div class="time-label">8:45 PM</div><div class="timeline-title">Open Mic Sharing</div></div><div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div><div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div></div></div>
      <div id="day5" class="day-panel"><div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Friday, January 22 — Return Day</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">March for Life &amp; the trip home</p></div><div class="timeline"><div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:30 AM.</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Check Out &amp; Store Luggage</div></div><div class="timeline-item"><div class="time-label">9:30 AM</div><div class="timeline-title">Walk to the March for Life Rally <em>or</em> American History Museum</div></div><div class="timeline-item"><div class="time-label">10:00 AM</div><div class="timeline-title">Morning Activity</div><div class="timeline-desc">March for Life Rally <em>or</em> American History Museum</div><span class="timeline-tag " style="margin-right:6px;">Touring</span></div><div class="timeline-item"><div class="time-label">12:00 PM</div><div class="timeline-title">Lunch at American History Museum <em>or</em> Snacks at March for Life Rally</div><span class="timeline-tag " style="margin-right:6px;">Meal</span></div><div class="timeline-item"><div class="time-label">1:00 PM</div><div class="timeline-title">March for Life</div></div><div class="timeline-item"><div class="time-label">3:00 PM</div><div class="timeline-title">Load Bus &amp; Dinner on the Road</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">9:00 PM</div><div class="timeline-title">Late Night Snack on the Road</div><span class="timeline-tag " style="margin-right:6px;">Meal</span><span class="timeline-tag pay" style="margin-right:6px;">$ Self-Pay</span></div><div class="timeline-item"><div class="time-label">2:00 AM</div><div class="timeline-title">Arrive at MHA</div></div></div><div class="return-notes"><p>Please note that it is unusually difficult to predict our ETA for return to MHA, due to multiple factors beyond our control, including the schedule of the March for Life, traffic, and weather. Thank you in advance for your flexibility.</p><p>In addition, due to the State of Ohio's curfew for drivers under the age of 18, student drivers are encouraged to keep this schedule as written documentation if they are pulled over by police while driving after curfew due to a school event.</p></div></div>
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
        <div class="location-card"><span class="location-icon">📖</span><div class="location-name">Museum of the Bible</div><div class="location-address">400 4th St SW, Washington, D.C.</div><p class="location-desc">Tuesday's home base: five speaker sessions, lunch, and self-guided touring. Also one of the Wednesday morning options ($).</p></div><div class="location-card"><span class="location-icon">⛪</span><div class="location-name">Capitol Hill Baptist Church</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Wednesday afternoon: Session 6 with Gary Smith at 1:30 PM and Session 7 with Richard Samuelson at 2:45 PM. At 7:00 PM, students may attend the church's Bible study instead of dinner at neighborhood restaurants.</p></div><div class="location-card"><span class="location-icon">🏛️</span><div class="location-name">Heritage Foundation</div><div class="location-address">214 Massachusetts Ave NE, Washington, D.C.</div><p class="location-desc">Thursday morning: Sessions 8 through 10, then lunch on site.</p></div><div class="location-card"><span class="location-icon">🍽️</span><div class="location-name">Capitol Hill Club</div><div class="location-address">300 First St SE, Washington, D.C.</div><p class="location-desc">Thursday dinner, followed by Session 11 with Abby Balmert and Open Mic Sharing.</p></div><div class="location-card"><span class="location-icon">🦅</span><div class="location-name">National Mall Monuments</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Monday evening: the Washington, Lincoln, WWII, Vietnam, and Korea monuments.</p></div><div class="location-card"><span class="location-icon">🇺🇸</span><div class="location-name">U.S. Capitol</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Wednesday at 5:00 PM: a tour of the U.S. Capitol Building.</p></div><div class="location-card"><span class="location-icon">🚉</span><div class="location-name">Union Station</div><div class="location-address">50 Massachusetts Ave NE, Washington, D.C.</div><p class="location-desc">Wednesday lunch, on your own ($).</p></div><div class="location-card"><span class="location-icon">🏨</span><div class="location-name">Capitol Hill Hotel</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Check in Monday at 5:00 PM, Monday dinner, breakfast each morning, and check out Friday at 9:00 AM.</p></div><div class="location-card"><span class="location-icon">🕊️</span><div class="location-name">March for Life &amp; American History Museum</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Friday morning: the March for Life rally or the American History Museum, with lunch at the museum or snacks at the rally, then the March for Life at 1:00 PM.</p></div><div class="location-card"><span class="location-icon">🖼️</span><div class="location-name">Natural History Museum &amp; Gallery of Art</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Wednesday morning options, along with the Museum of the Bible.</p></div><div class="location-card"><span class="location-icon">🧺</span><div class="location-name">Eastern Market</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Thursday at 7:45 AM: an optional morning visit before the walk to the Heritage Foundation.</p></div><div class="location-card"><span class="location-icon">🚀</span><div class="location-name">Thursday Afternoon Touring</div><div class="location-address">Washington, D.C.</div><p class="location-desc">Part 1: Air and Space Museum or Supreme Court. Part 2: Air and Space Museum, Botanical Gardens, Library of Congress, or free time at the hotel.</p></div>
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
        <div class="quickfact"><div class="quickfact-label">Back at MHA</div><div class="quickfact-value">Around 2:00 AM Saturday</div></div>
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
      <p class="section-body">Pack efficiently while ensuring you have everything you need for the week.</p>
      <div class="packing-grid">
        <div class="packing-card"><h4>Clothing</h4><ul class="checklist"><li>Clothing for cold weather (coat, hat, gloves, etc.) and comfortable shoes for walking. An umbrella or poncho may also be useful</li><li>Basic clothing (sleepwear, etc.) and personal items (toothbrush, etc.) for five days and four nights</li><li>Dress shoes to change into when we enter venues</li><li>Clothing for exercise, if you would like to use the hotel's fitness facility</li></ul></div><div class="packing-card"><h4>Daily Essentials</h4><ul class="checklist"><li>Money for fast food/food court meals, as well as snacks, drinks, and souvenirs you may want to purchase. As more vendors move away from accepting cash, a pre-paid debit card (or equivalent) is strongly recommended</li><li>Substantial and nourishing snacks, especially for the long days on Wednesday and Friday</li><li>A personal water bottle, so that you can stay hydrated throughout our activities</li></ul></div><div class="packing-card"><h4>Things to Bring</h4><ul class="checklist"><li>Your pre-reading folder, Bible, notebook paper, and pens/pencils for notetaking</li><li>A tote bag or small backpack to carry these items and your shoes if you are switching from tennis shoes/boots to dress shoes</li><li>Your valid driver's license or other state-issued identification, with you at all times during the trip. Although some form of ID is recommended, it is not required if you are under sixteen years old</li><li>Any medications or other personal health items you may need</li><li>Your phone, if your parents permit it, as long as it is used responsibly. If phones are used in any distracting or otherwise irresponsible way, this privilege will be taken away at the discretion of the teacher in charge. Other electronics should stay home</li></ul></div>
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
        <div class="value-card"><h3>Monday &amp; Friday</h3><p>Attire should be warm and may be casual. Layers recommended.</p></div>
        <div class="value-card"><h3>Tuesday – Thursday: MHA Senior Dress</h3><p>Boys should wear collared and tucked-in shirts with ties. Girls should wear dress slacks or knee-length skirts or dresses.</p></div>
      </div>
      <p class="meal-note">Be prepared for cold weather and walking. You may wear comfortable shoes for long walks and change into dress shoes when we enter venues.</p>
    </div>
  </section>

  <section class="section section-light" id="guide-money">
    <div class="section-inner">
      <div class="section-label">Meals &amp; Money</div>
      <h2 class="section-title">Meals marked $ are on you</h2>
      <div class="divider"></div>
      <p class="meal-note">Meals marked $ on the Schedule are paid for on your own. On the current agenda, those are:</p>
      <ul class="meal-list">
        <li>Monday: lunch on the road</li><li>Tuesday: dinner at neighborhood restaurants</li><li>Tuesday evening: the Capitals hockey game or ice skating, if you choose either</li><li>Wednesday morning: the Museum of the Bible, if you choose it</li><li>Wednesday: lunch at Union Station</li><li>Wednesday: dinner at neighborhood restaurants, if you choose dinner over the Bible study</li><li>Friday: dinner on the road and a late night snack on the road</li>
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
        <li>Arrive at MHA, ready to load and board the bus, <strong>Monday at 6:45 a.m.</strong> When you arrive, please bring your luggage into the gym, and then wait in the gym for instructions about loading the bus. Throughout the rest of the trip, <strong>always be on time for everything.</strong></li><li>Throughout the trip, <strong>stay with the group.</strong> When we are out around Washington, never go off on your own. Stay with at least one buddy; your room leader should always know where you are.</li><li><strong>Always wear proper attire:</strong> casual (no pajamas) on Monday and Friday, “MHA Senior” on Tuesday, Wednesday and Thursday when we are hearing from our speakers. Remove hats and coats when we are listening to speakers. If you are not dressed properly, you will be told to change.</li><li><strong>Dress warmly</strong> for long walks. If it's helpful, you may wear more comfortable shoes for long walks and then change into dress shoes when we arrive at the destination.</li><li><strong>Be mindful of your health.</strong> Drink water, eat heartily, and sleep well to stay strong for enjoying a full, busy week.</li><li><strong>At the hotel,</strong> you may not visit opposite-sex rooms. You must also stay in your own room after midnight (12:00 am) until morning. Exceptions must be permitted in advance by the teacher in charge.</li><li>There are two buildings at the hotel: our hotel rooms and breakfast are in one; the main lobby and the exercise room are in the other. <strong>After dark, do not walk between buildings alone</strong> — take along a buddy. (Walking between buildings after dark should not often be necessary.)</li><li>Wherever you are, <strong>be considerate of others</strong> — including those NOT in our group. <em>Share the sidewalks, leave doorways unblocked, and be silent in hotel hallways.</em> How happy will everyone around you be if you are consistently mindful of how you can bless others?</li><li><strong>Use technology wisely.</strong> Phones can be helpful during this trip, but they must be used wisely. Phones should not be used during speakers or tours. If phones are used in any distracting or otherwise irresponsible way, this privilege will be taken away at the discretion of the teacher in charge. Leave the TV in your hotel room off, and leave your other electronics at home.</li><li><strong>Leave NO MESS behind</strong> anywhere you go (bus, hotel room, meals). Clean up after yourself.</li><li>Respect, obey, and enjoy spending time with the parents participating.</li><li>Pursue loving, God-honoring fellowship with <strong>one another</strong> — even those who aren't your best friends.</li>
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
