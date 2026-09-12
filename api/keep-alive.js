// api/keep-alive.js
// Called automatically once a day by Vercel Cron (see vercel.json).
// Does a trivial, harmless read from Supabase just to register "activity"
// on the project so it never gets auto-paused for inactivity on the free tier.

const { supabaseFetch } = require('./_lib/auth');

module.exports = async (req, res) => {
  // Only Vercel's own cron scheduler should be able to trigger this.
  // Vercel automatically sets CRON_SECRET and sends it as a Bearer token
  // when it invokes scheduled functions.
  const authHeader = req.headers.authorization || '';
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // A tiny, harmless read — just enough to count as activity.
    const result = await supabaseFetch('site_config?select=id&limit=1');
    res.status(200).json({ ok: true, pinged: result.ok });
  } catch (err) {
    console.error('keep-alive ping failed', err);
    // Still return 200 — a failed ping shouldn't cause Vercel to retry
    // aggressively or look like a broken deployment.
    res.status(200).json({ ok: false, error: err.message });
  }
};
