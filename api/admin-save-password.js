// api/admin-save-password.js
// POST { newPassword } -> requires a valid admin session (see admin-login.js).
// Hashes the new password and stores it in Supabase's site_config table.
// This is what makes the site password "rotatable" without a redeploy.

const { isAdminAuthenticated, hashPassword, upsertSiteConfig } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: 'Admin session required or expired. Please log in again.' });
    return;
  }

  const { newPassword } = req.body || {};
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    res.status(400).json({ error: 'New password must be at least 6 characters.' });
    return;
  }

  try {
    const { salt, hash } = hashPassword(newPassword);
    const success = await upsertSiteConfig(salt, hash);
    if (!success) {
      res.status(500).json({ error: 'Could not save the new password. Check Supabase connection.' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving password.' });
  }
};
