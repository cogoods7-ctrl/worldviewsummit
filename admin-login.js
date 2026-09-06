// api/admin-login.js
// POST { password } -> checks against the ADMIN_PASSWORD Vercel environment
// variable (a separate, rarely-changed password known only to school admin).
// This gates access to the "change the site password" tools — it is NOT
// the same password students/parents use to view protected pages.

const crypto = require('crypto');
const { ADMIN_PASSWORD, grantAdminSession } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { password } = req.body || {};
  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'Password required' });
    return;
  }

  if (!ADMIN_PASSWORD) {
    res.status(503).json({ error: 'Admin password is not configured on the server yet.' });
    return;
  }

  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!ok) {
    res.status(401).json({ error: 'Incorrect admin password.' });
    return;
  }

  grantAdminSession(res);
  res.status(200).json({ ok: true });
};
