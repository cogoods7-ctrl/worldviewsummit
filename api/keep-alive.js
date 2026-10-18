// api/keep-alive.js
// Hit once a day by Vercel Cron (see vercel.json) to register activity on the
// Supabase project so the free tier never auto-pauses it for inactivity.
//
// Deliberately NOT password-protected: it performs one tiny read and returns a
// bare ok / not-ok, so there is nothing to leak. (The first version required a
// CRON_SECRET that was never set in Vercel, so every scheduled run was rejected
// with a 401 and Supabase never saw any activity.)
//
// It returns 502 when the Supabase call fails, so a broken ping shows up as a
// failed run in Vercel's Cron Jobs logs (and in any uptime monitor) instead of
// looking like a success.

const { supabaseFetch } = require('./_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const result = await supabaseFetch('site_config?select=id&limit=1');
    if (!result.ok) {
      console.error('keep-alive: Supabase responded with', result.status);
      res.status(502).json({ ok: false });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('keep-alive failed:', err);
    res.status(502).json({ ok: false });
  }
};
