// api/admin-logs.js
// GET -> requires a valid admin session. Returns the most recent 50 access
// attempts (timestamp + success/fail + browser info) so admin has basic
// visibility into who's using the password and whether anyone is guessing.

const { isAdminAuthenticated, supabaseFetch } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: 'Admin session required or expired. Please log in again.' });
    return;
  }

  try {
    const result = await supabaseFetch('access_logs?select=*&order=created_at.desc&limit=50');
    if (!result.ok) {
      res.status(500).json({ error: 'Could not fetch logs.' });
      return;
    }
    const logs = await result.json();
    res.status(200).json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching logs.' });
  }
};
