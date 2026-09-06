// api/logout.js
const { clearCookie, SITE_SESSION_COOKIE } = require('./_lib/auth');

module.exports = async (req, res) => {
  clearCookie(res, SITE_SESSION_COOKIE);
  res.status(200).json({ ok: true });
};
