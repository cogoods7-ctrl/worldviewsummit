// api/login.js
// POST { password } -> verifies against the hash stored in Supabase's site_config
// table. On success, sets an httpOnly session cookie good for 12 hours.

const { verifyPassword, getSiteConfig, grantSiteSession, logAccess } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { password } = req.body || {};
    if (!password || typeof password !== 'string') {
      res.status(400).json({ error: 'Password required' });
      return;
    }

    const config = await getSiteConfig();
    if (!config || !config.password_hash || !config.password_salt) {
      // No password has been set up yet in Supabase
      res.status(503).json({ error: 'Site password has not been configured yet. Ask an admin to set it up.' });
      return;
    }

    const ok = verifyPassword(password, config.password_salt, config.password_hash);
    await logAccess(ok, req);

    if (!ok) {
      res.status(401).json({ error: 'Incorrect password.' });
      return;
    }

    grantSiteSession(res);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
