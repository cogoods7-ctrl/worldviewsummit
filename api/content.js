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
      <p class="section-body">The agenda below is the current working itinerary and is subject to change. Sessions marked <strong style="color:#fff;">TBA</strong> are still being finalized by the Student Leadership Team. Items marked <strong style="color:#fff;">$</strong> are meals students pay for on their own.</p>
    </div>
  </section>
  <section class="section section-cream">
    <div class="section-inner">
      <div class="schedule-tabs">
        <button class="schedule-tab active" onclick="showDay('day1',this)">Mon, Jan 18</button>
        <button class="schedule-tab" onclick="showDay('day2',this)">Tue, Jan 19</button>
        <button class="schedule-tab" onclick="showDay('day3',this)">Wed, Jan 20</button>
        <button class="schedule-tab" onclick="showDay('day4',this)">Thu, Jan 21</button>
        <button class="schedule-tab" onclick="showDay('day5',this)">Fri, Jan 22</button>
      </div>

      <!-- MONDAY -->
      <div id="day1" class="day-panel active">
        <div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Monday, January 18 — Travel Day</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Departure &amp; Arrival in D.C.</p></div>
        <div class="timeline">
          <div class="timeline-item"><div class="time-label">6:45 AM</div><div class="timeline-title">Report to MHA &amp; Load Bus</div></div>
          <div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Departure &amp; Lunch on the Road</div><span class="timeline-tag pay">$ Self-Pay Meal</span></div>
          <div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Arrival in D.C. &amp; Check into Capitol Hill Hotel</div></div>
          <div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">DINNER</div></div>
          <div class="timeline-item"><div class="time-label">7:30 PM</div><div class="timeline-title">Evening Activity: National Mall Monuments</div><div class="timeline-desc">Guided walk to the Washington, Lincoln, WWII, Vietnam, and Korean War Memorials — an evening introduction to the story America tells about itself in stone.</div></div>
          <div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div>
          <div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div>
        </div>
      </div>

      <!-- TUESDAY -->
      <div id="day2" class="day-panel">
        <div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Tuesday, January 19 — Museum of the Bible</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day One of the Summit</p></div>
        <div class="timeline">
          <div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:00 AM.</div></div>
          <div class="timeline-item"><div class="time-label">8:15 AM</div><div class="timeline-title">Walk to Museum of the Bible</div></div>
          <div class="timeline-item tba"><div class="time-label">9:00 AM</div><div class="timeline-title">Session 1</div><div class="timeline-desc">Likely focus: the American founding and the biblical roots of national identity.</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item tba"><div class="time-label">10:15 AM</div><div class="timeline-title">Session 2</div><div class="timeline-desc">Likely focus: what makes American identity and culture unique.</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item"><div class="time-label">11:30 AM</div><div class="timeline-title">LUNCH</div></div>
          <div class="timeline-item tba"><div class="time-label">1:30 PM</div><div class="timeline-title">Session 3</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item tba"><div class="time-label">2:45 PM</div><div class="timeline-title">Session 4</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item"><div class="time-label">3:45 PM</div><div class="timeline-title">Afternoon Activity: Touring the Museum of the Bible</div></div>
          <div class="timeline-item"><div class="time-label">5:00 PM</div><div class="timeline-title">Depart Museum of the Bible</div></div>
          <div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">DINNER</div></div>
          <div class="timeline-item tba"><div class="time-label">7:30 PM</div><div class="timeline-title">Evening Activity</div><span class="timeline-tag tba">TBA</span></div>
          <div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div>
          <div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div>
        </div>
      </div>

      <!-- WEDNESDAY -->
      <div id="day3" class="day-panel">
        <div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Wednesday, January 20 — Capitol Hill Baptist Church</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day Two of the Summit</p></div>
        <div class="timeline">
          <div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:00 AM.</div></div>
          <div class="timeline-item"><div class="time-label">8:30 AM</div><div class="timeline-title">Walk to Capitol Hill Baptist Church</div></div>
          <div class="timeline-item tba"><div class="time-label">9:00 AM</div><div class="timeline-title">Session 5</div><div class="timeline-desc">Likely focus: the role of faith in unifying American society.</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item tba"><div class="time-label">10:15 AM</div><div class="timeline-title">Session 6</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item tba"><div class="time-label">11:30 AM</div><div class="timeline-title">Session 7</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item"><div class="time-label">12:30 PM</div><div class="timeline-title">LUNCH: Union Station</div><span class="timeline-tag pay">$ Self-Pay Meal</span></div>
          <div class="timeline-item tba"><div class="time-label">2:45 PM</div><div class="timeline-title">Afternoon Activity</div><span class="timeline-tag tba">TBA</span></div>
          <div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">DINNER</div></div>
          <div class="timeline-item tba"><div class="time-label">7:30 PM</div><div class="timeline-title">Evening Activity</div><span class="timeline-tag tba">TBA</span></div>
          <div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div>
          <div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div>
        </div>
      </div>

      <!-- THURSDAY -->
      <div id="day4" class="day-panel">
        <div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Thursday, January 21 — Heritage Foundation</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">Day Three of the Summit</p></div>
        <div class="timeline">
          <div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 8:30 AM.</div></div>
          <div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Walk to Heritage Foundation</div></div>
          <div class="timeline-item tba"><div class="time-label">9:30 AM</div><div class="timeline-title">Session 8</div><div class="timeline-desc">Likely focus: when it is appropriate for government to limit people's freedom.</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item tba"><div class="time-label">10:30 AM</div><div class="timeline-title">Session 9</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item tba"><div class="time-label">11:30 AM</div><div class="timeline-title">Session 10</div><div class="timeline-desc">Likely focus: American immigration policy.</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item"><div class="time-label">12:30 PM</div><div class="timeline-title">LUNCH: Heritage Foundation</div></div>
          <div class="timeline-item tba"><div class="time-label">2:00 PM</div><div class="timeline-title">Afternoon Activity</div><span class="timeline-tag tba">TBA</span></div>
          <div class="timeline-item"><div class="time-label">6:00 PM</div><div class="timeline-title">DINNER: Capitol Hill Club</div><div class="timeline-desc">Formal dinner — business/formal attire required. See the Student Guide for dress code details.</div></div>
          <div class="timeline-item tba"><div class="time-label">7:30 PM</div><div class="timeline-title">Session 11</div><div class="timeline-desc">Closing keynote address of the Summit.</div><span class="timeline-tag tba">Speaker TBA</span></div>
          <div class="timeline-item"><div class="time-label">9:00 PM</div><div class="timeline-title">Open Mic Sharing</div><div class="timeline-desc">Students reflect on the week and share what they've learned.</div></div>
          <div class="timeline-item"><div class="time-label">10:30 PM</div><div class="timeline-title">Devotions / Rest</div></div>
          <div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">In Your Own Room for the Night</div></div>
        </div>
      </div>

      <!-- FRIDAY -->
      <div id="day5" class="day-panel">
        <div style="margin-bottom:32px;"><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy);">Friday, January 22 — Return Day</h3><p style="font-size:12px;color:var(--muted);font-family:'Josefin Sans',sans-serif;letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;">March for Life &amp; Departure</p></div>
        <div class="timeline">
          <div class="timeline-item"><div class="time-label">7:00 AM</div><div class="timeline-title">Breakfast at Capitol Hill Hotel</div><div class="timeline-desc">Go at your convenience before 9:00 AM.</div></div>
          <div class="timeline-item"><div class="time-label">9:00 AM</div><div class="timeline-title">Check Out &amp; Store Luggage</div></div>
          <div class="timeline-item"><div class="time-label">10:00 AM</div><div class="timeline-title">March for Life Rally / Touring</div></div>
          <div class="timeline-item"><div class="time-label">1:00 PM</div><div class="timeline-title">March for Life</div><div class="timeline-desc">Students participate publicly in the March for Life on the National Mall — connecting the week's formation to embodied civic action.</div></div>
          <div class="timeline-item"><div class="time-label">2:30 PM</div><div class="timeline-title">Load Bus &amp; Lunch on the Road</div><span class="timeline-tag pay">$ Self-Pay Meal</span></div>
          <div class="timeline-item"><div class="time-label">6:30 PM</div><div class="timeline-title">Dinner on the Road</div><span class="timeline-tag pay">$ Self-Pay Meal</span></div>
          <div class="timeline-item"><div class="time-label">12:00 AM</div><div class="timeline-title">Arrive at MHA</div></div>
        </div>
      </div>
    </div>
  </section>
`,

  locations: `  <section class="section section-dark" style="padding-bottom:48px;">
    <div class="section-inner">
      <div class="section-label">Where We Go</div>
      <h2 class="section-title">Washington, D.C.</h2>
      <div class="divider"></div>
      <p class="section-body">The Worldview Summit takes place entirely in our nation's capital. Every venue is chosen because it embodies the Summit's themes of allegiance, faith, government, and American identity.</p>
    </div>
  </section>
  <section class="section section-cream">
    <div class="section-inner">
      <div class="locations-grid">
        <div class="location-card"><span class="location-icon">📖</span><div class="location-name">Museum of the Bible</div><div class="location-address">400 4th St SW, Washington, D.C.</div><p class="location-desc">The Summit's Day One home. Students hear speaker sessions and tour the museum's exhibits on how Scripture has shaped Western civilization, law, and the American founding.</p></div>
        <div class="location-card"><span class="location-icon">⛪</span><div class="location-name">Capitol Hill Baptist Church</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Day Two's venue, directly engaging the question of faith's role in American public life — meeting inside a historic congregation just steps from the Capitol.</p></div>
        <div class="location-card"><span class="location-icon">🏛️</span><div class="location-name">Heritage Foundation</div><div class="location-address">214 Massachusetts Ave NE, Washington, D.C.</div><p class="location-desc">Day Three's venue. One of the nation's leading conservative policy institutions hosts sessions on government, liberty, and immigration policy, plus lunch on-site.</p></div>
        <div class="location-card"><span class="location-icon">🍽️</span><div class="location-name">Capitol Hill Club</div><div class="location-address">300 First St SE, Washington, D.C.</div><p class="location-desc">Site of the Summit's formal Thursday dinner — a formation moment in itself, where students practice hospitality and conversation in a prestigious civic setting.</p></div>
        <div class="location-card"><span class="location-icon">🦅</span><div class="location-name">National Mall Monuments</div><div class="location-address">The Mall, Washington, D.C.</div><p class="location-desc">Monday evening's opening activity — the Washington, Lincoln, WWII, Vietnam, and Korean War Memorials. A civic catechism in stone that frames the whole week.</p></div>
        <div class="location-card"><span class="location-icon">🚉</span><div class="location-name">Union Station</div><div class="location-address">50 Massachusetts Ave NE, Washington, D.C.</div><p class="location-desc">Wednesday's lunch stop — a historic transportation hub turned dining and shopping destination near Capitol Hill.</p></div>
        <div class="location-card"><span class="location-icon">🏨</span><div class="location-name">Capitol Hill Hotel</div><div class="location-address">Capitol Hill, Washington, D.C.</div><p class="location-desc">Home base for the week. Students check in Monday evening and stay through Friday morning checkout, walking to most venues from here.</p></div>
        <div class="location-card"><span class="location-icon">🕊️</span><div class="location-name">March for Life</div><div class="location-address">National Mall, Washington, D.C.</div><p class="location-desc">Friday's capstone activity. Students participate publicly in the March for Life — putting the week's formation into concrete, embodied civic action.</p></div>
      </div>
    </div>
  </section>
`,

  guide: `  <section class="section section-dark" style="padding-bottom:48px;">
    <div class="section-inner">
      <div class="section-label">Student Trip Guide</div>
      <h2 class="section-title">Everything you need<br>for the trip</h2>
      <div class="divider"></div>
      <p class="section-body">Packing lists, money matters, merchandise, etiquette, and everything else you need to know before we load the bus on January 18th.</p>
      <div class="quickfacts-grid">
        <div class="quickfact"><div class="quickfact-label">Dates</div><div class="quickfact-value">Jan 18–22, 2027</div></div>
        <div class="quickfact"><div class="quickfact-label">Report Time</div><div class="quickfact-value">6:45 AM at MHA</div></div>
        <div class="quickfact"><div class="quickfact-label">Return</div><div class="quickfact-value">~Midnight, Friday</div></div>
        <div class="quickfact"><div class="quickfact-label">Hotel</div><div class="quickfact-value">Capitol Hill Hotel</div></div>
        <div class="quickfact"><div class="quickfact-label">Weather</div><div class="quickfact-value">Cold — Highs 30s–40s°F</div></div>
      </div>
      <div class="guide-nav">
        <a onclick="scrollToGuide('guide-packing')">Packing List</a>
        <a onclick="scrollToGuide('guide-money')">Money &amp; Meals</a>
        <a onclick="scrollToGuide('guide-merch')">Merchandise</a>
        <a onclick="scrollToGuide('guide-etiquette')">Etiquette &amp; Expectations</a>
        <a onclick="scrollToGuide('guide-safety')">Health &amp; Safety</a>
      </div>
    </div>
  </section>

  <!-- PACKING LIST -->
  <section class="section section-light" id="guide-packing">
    <div class="section-inner">
      <div class="section-label">Packing List</div>
      <h2 class="section-title">What to bring</h2>
      <div class="divider"></div>
      <p class="section-body">Washington, D.C. in January is cold — average highs in the 30s–40s°F, with wind on the Mall. Layers are essential. Students will do a lot of walking, so comfortable, broken-in shoes matter more than anything else on this list.</p>

      <div class="packing-grid">
        <div class="packing-card">
          <h4>🧥 Cold-Weather Clothing</h4>
          <ul class="checklist">
            <li>Warm winter coat</li>
            <li>Hat, gloves, and scarf</li>
            <li>Layers — sweaters, thermal shirts</li>
            <li>Comfortable, broken-in walking shoes</li>
            <li>Warm socks (bring extra pairs)</li>
            <li>Casual clothes for touring days</li>
          </ul>
        </div>
        <div class="packing-card">
          <h4>👔 Formal Attire</h4>
          <ul class="checklist">
            <li>One dressy outfit for the Capitol Hill Club dinner (Thursday) — collared shirt, tie, and dress pants/sport coat for young men; a dress or skirt/blouse for young women</li>
            <li>Dress shoes to match</li>
          </ul>
        </div>
        <div class="packing-card">
          <h4>📄 Documents &amp; Money</h4>
          <ul class="checklist">
            <li>Government-issued photo ID</li>
            <li>Copy of insurance card</li>
            <li>Spending money for self-pay meals (see Money &amp; Meals below)</li>
            <li>A card or small amount of cash for souvenirs</li>
          </ul>
        </div>
        <div class="packing-card">
          <h4>🧴 Toiletries &amp; Health</h4>
          <ul class="checklist">
            <li>Toothbrush, toothpaste, deodorant</li>
            <li>Any personal medications (labeled, in original packaging)</li>
            <li>Hand sanitizer &amp; lip balm (D.C. winters are dry)</li>
            <li>Basic first-aid items (band-aids, pain reliever)</li>
          </ul>
        </div>
        <div class="packing-card">
          <h4>🔌 Electronics</h4>
          <ul class="checklist">
            <li>Phone &amp; charger</li>
            <li>Portable battery pack (lots of photos and walking = fast battery drain)</li>
            <li>Camera, if desired</li>
          </ul>
        </div>
        <div class="packing-card">
          <h4>📓 Summit Essentials</h4>
          <ul class="checklist">
            <li>Bible</li>
            <li>Notebook or journal for session notes</li>
            <li>Pen/pencil</li>
            <li>A backpack or day bag for walking days</li>
            <li>Reusable water bottle</li>
          </ul>
        </div>
      </div>

      <div class="not-bring-box">
        <h4>Please Do Not Bring</h4>
        <p>Large amounts of cash, valuable jewelry, video game consoles, or anything irreplaceable. Students are responsible for their own belongings throughout the trip. Vaping, tobacco, and alcohol products are strictly prohibited per MHA policy.</p>
      </div>
    </div>
  </section>

  <!-- MONEY & MEALS -->
  <section class="section section-cream" id="guide-money">
    <div class="section-inner">
      <div class="section-label">Money &amp; Meals</div>
      <h2 class="section-title">What's covered, what's not</h2>
      <div class="divider"></div>
      <p class="section-body">Most meals are included in the trip fee. A few meals are marked "$" on the schedule — these are self-pay, giving students a chance to explore D.C.'s food scene on their own budget.</p>

      <table class="money-table">
        <tr><th>Meal</th><th>Day</th><th>Status</th></tr>
        <tr><td>Lunch on the Road</td><td>Monday</td><td class="self">Self-Pay ($)</td></tr>
        <tr><td>Dinner — Monday</td><td>Monday</td><td class="paid">Included</td></tr>
        <tr><td>Breakfast — Capitol Hill Hotel</td><td>Tue–Fri</td><td class="paid">Included</td></tr>
        <tr><td>Lunch &amp; Dinner</td><td>Tuesday</td><td class="paid">Included</td></tr>
        <tr><td>Lunch — Union Station</td><td>Wednesday</td><td class="self">Self-Pay ($)</td></tr>
        <tr><td>Dinner — Wednesday</td><td>Wednesday</td><td class="paid">Included</td></tr>
        <tr><td>Lunch — Heritage Foundation</td><td>Thursday</td><td class="paid">Included</td></tr>
        <tr><td>Dinner — Capitol Hill Club</td><td>Thursday</td><td class="paid">Included</td></tr>
        <tr><td>Lunch on the Road</td><td>Friday</td><td class="self">Self-Pay ($)</td></tr>
        <tr><td>Dinner on the Road</td><td>Friday</td><td class="self">Self-Pay ($)</td></tr>
      </table>

      <div class="highlight-box" style="margin-top:40px;">
        <h3>Suggested Spending Money</h3>
        <p>Plan for roughly $60–$100 to cover the three self-pay meals plus any souvenirs or snacks at Union Station or the museum gift shops. Most D.C. vendors accept cards, but a little cash is handy for tips and smaller purchases.</p>
      </div>
    </div>
  </section>

  <!-- MERCHANDISE -->
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

  <!-- ETIQUETTE -->
  <section class="section section-cream" id="guide-etiquette">
    <div class="section-inner">
      <div class="section-label">Etiquette &amp; Expectations</div>
      <h2 class="section-title">How we carry ourselves</h2>
      <div class="divider"></div>
      <p class="section-body">The Worldview Summit is a formation trip, not a vacation. Students represent Mars Hill Academy in some of the nation's most prestigious institutions — how we dress, speak, and behave matters.</p>
      <div class="etiquette-grid">
        <div class="value-card"><h3>Formal Dinner Dress Code</h3><p>The Thursday dinner at the Capitol Hill Club requires business/formal attire — collared shirt and tie or sport coat for young men, a dress or skirt/blouse for young women. This is a practiced skill in hospitality and presence.</p></div>
        <div class="value-card"><h3>Curfew &amp; Rest</h3><p>Devotions and rest begin at 10:30 PM each night; students are in their own rooms by midnight. Rest is part of the Summit's intentional rhythm — full engagement requires real sleep.</p></div>
        <div class="value-card"><h3>Buddy System</h3><p>Students move in groups at all times in D.C., especially during free/touring blocks. Know your chaperone and your group before every activity.</p></div>
        <div class="value-card"><h3>March for Life Conduct</h3><p>Friday's March for Life draws large crowds. Students stay with their group, follow chaperone instructions closely, and represent MHA with maturity and respect.</p></div>
        <div class="value-card"><h3>Session Engagement</h3><p>Phones away during sessions. Bring a notebook — most students find their best Summit memories come from the notes and questions they wrote down in the room.</p></div>
        <div class="value-card"><h3>Respectful Dialogue</h3><p>Speakers may express views students disagree with. The Summit's purpose is to wrestle honestly with hard questions — model gracious, thoughtful engagement, not dismissiveness.</p></div>
      </div>
    </div>
  </section>

  <!-- SAFETY -->
  <section class="section section-light" id="guide-safety">
    <div class="section-inner">
      <div class="section-label">Health &amp; Safety</div>
      <h2 class="section-title">Before you go</h2>
      <div class="divider"></div>
      <div class="two-col" style="margin-top:30px;">
        <div class="value-card">
          <h3>Medications</h3>
          <p>All medications must be reported to a chaperone in advance and carried in original, labeled packaging. Please contact the school office with any medical needs before departure.</p>
        </div>
        <div class="value-card">
          <h3>Emergency Contact</h3>
          <p>Parents will receive a trip emergency contact sheet with chaperone cell numbers before departure. The MHA office — (513) 770-3223 — can also relay urgent messages during the trip.</p>
        </div>
      </div>
      <div class="highlight-box" style="margin-top:20px;">
        <h3>Questions Before the Trip?</h3>
        <p>Contact Mr. Andy Stapleton or the MHA main office with any packing, health, or logistics questions well before January 18th. Don't wait until the week of the trip!</p>
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
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Where does the Summit take place? <span class="faq-icon">+</span></div><div class="faq-a">The entire 2027 Summit takes place in Washington, D.C. Students stay at the Capitol Hill Hotel and visit the Museum of the Bible, Capitol Hill Baptist Church, the Heritage Foundation, the Capitol Hill Club, Union Station, and the National Mall — concluding with the March for Life on Friday.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Who plans and runs the Summit? <span class="faq-icon">+</span></div><div class="faq-a">Students plan and run it. Under the mentorship of faculty advisor Mr. Andy Stapleton, the Student Leadership Team selects the annual theme, recruits speakers, coordinates logistics, leads worship, and facilitates every session.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Who are the 2027 speakers? <span class="faq-icon">+</span></div><div class="faq-a">The speaker roster is still being finalized by the Student Leadership Team. Speakers are being recruited from Congress, public policy institutions, academia, and advocacy organizations. Visit the Speakers page for updates as they're confirmed, and see our Summit history for the caliber of past speakers.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Is there a cost to attend? <span class="faq-icon">+</span></div><div class="faq-a">There is a cost covering transportation, hotel, most meals, and event fees. A few meals are self-pay (marked "$" on the schedule). Specific pricing will be communicated by the school. Please contact the MHA office for details: (513) 770-3223 or info@marshill.edu.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">What should students pack? <span class="faq-icon">+</span></div><div class="faq-a">See the Student Guide page for a full packing list. In short: warm winter layers, comfortable walking shoes, one formal outfit for the Capitol Hill Club dinner, and spending money for self-pay meals.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Where can I buy Summit merchandise? <span class="faq-icon">+</span></div><div class="faq-a">2027 Summit merchandise ordering will open closer to the trip. See the Student Guide page for updates, or email info@marshill.edu to ask about availability.</div></div>
        <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">How is this different from a regular school trip? <span class="faq-icon">+</span></div><div class="faq-a">The Worldview Summit is not a sightseeing trip — it is a formation event. Students engage speakers from Congress, policy institutions, and academia on the most pressing cultural questions of our time, from a distinctly Christian vantage point.</div></div>
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
