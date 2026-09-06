// api/_lib/auth.js
// Shared helpers used by every serverless function: session cookie signing,
// password hashing, and talking to Supabase over plain REST (no npm packages
// required — uses Node's built-in fetch, available on Vercel's Node 18+ runtime).

const crypto = require('crypto');

const SESSION_SECRET = process.env.SESSION_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const SITE_SESSION_COOKIE = 'mha_session';
const ADMIN_SESSION_COOKIE = 'mha_admin_session';

const SITE_SESSION_HOURS = 12;   // how long a student/parent stays logged in
const ADMIN_SESSION_MINUTES = 30; // admin sessions are shorter-lived

// ---------- Cookie helpers ----------

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  });
  return out;
}

function sign(payloadStr) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payloadStr).digest('hex');
}

function makeToken(expiresAtMs) {
  const payload = JSON.stringify({ exp: expiresAtMs });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const sig = sign(payloadB64);
  return `${payloadB64}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [payloadB64, sig] = token.split('.');
  const expectedSig = sign(payloadB64);
  const sigBuf = Buffer.from(sig || '', 'hex');
  const expectedBuf = Buffer.from(expectedSig, 'hex');
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    return typeof payload.exp === 'number' && Date.now() < payload.exp;
  } catch {
    return false;
  }
}

function setCookie(res, name, value, maxAgeSeconds) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${maxAgeSeconds}`,
  ];
  const existing = res.getHeader('Set-Cookie');
  const cookieStr = parts.join('; ');
  if (existing) {
    res.setHeader('Set-Cookie', Array.isArray(existing) ? [...existing, cookieStr] : [existing, cookieStr]);
  } else {
    res.setHeader('Set-Cookie', cookieStr);
  }
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
}

function isSiteAuthenticated(req) {
  const cookies = parseCookies(req);
  return verifyToken(cookies[SITE_SESSION_COOKIE]);
}

function grantSiteSession(res) {
  const expires = Date.now() + SITE_SESSION_HOURS * 60 * 60 * 1000;
  setCookie(res, SITE_SESSION_COOKIE, makeToken(expires), SITE_SESSION_HOURS * 60 * 60);
}

function isAdminAuthenticated(req) {
  const cookies = parseCookies(req);
  return verifyToken(cookies[ADMIN_SESSION_COOKIE]);
}

function grantAdminSession(res) {
  const expires = Date.now() + ADMIN_SESSION_MINUTES * 60 * 1000;
  setCookie(res, ADMIN_SESSION_COOKIE, makeToken(expires), ADMIN_SESSION_MINUTES * 60);
}

// ---------- Password hashing (Node's built-in scrypt, no dependencies) ----------

function hashPassword(password, saltHex) {
  const salt = saltHex ? Buffer.from(saltHex, 'hex') : crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return { salt: salt.toString('hex'), hash: hash.toString('hex') };
}

function verifyPassword(password, saltHex, hashHex) {
  const { hash } = hashPassword(password, saltHex);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(hashHex, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ---------- Supabase REST helpers (no @supabase/supabase-js dependency needed) ----------

async function supabaseFetch(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...(options.headers || {}),
    },
  });
  return res;
}

async function getSiteConfig() {
  const res = await supabaseFetch('site_config?id=eq.1&select=*');
  if (!res.ok) throw new Error(`Supabase read failed: ${res.status}`);
  const rows = await res.json();
  return rows[0] || null;
}

async function upsertSiteConfig(salt, hash) {
  const patchRes = await supabaseFetch('site_config?id=eq.1', {
    method: 'PATCH',
    body: JSON.stringify({ password_salt: salt, password_hash: hash, updated_at: new Date().toISOString() }),
  });
  const patchText = await patchRes.text();

  if (!patchRes.ok) {
    console.error('site_config PATCH failed:', patchRes.status, patchText);
    return { ok: false, detail: `Supabase PATCH error (${patchRes.status}): ${patchText}` };
  }

  let patchRows = [];
  try { patchRows = JSON.parse(patchText); } catch { /* not JSON, treat as empty */ }

  if (Array.isArray(patchRows) && patchRows.length > 0) {
    return { ok: true }; // an existing row was found and updated
  }

  // No row existed yet (first time setting a password) — insert it.
  const insertRes = await supabaseFetch('site_config', {
    method: 'POST',
    body: JSON.stringify({ id: 1, password_salt: salt, password_hash: hash, updated_at: new Date().toISOString() }),
  });
  const insertText = await insertRes.text();

  if (!insertRes.ok) {
    console.error('site_config INSERT failed:', insertRes.status, insertText);
    return { ok: false, detail: `Supabase INSERT error (${insertRes.status}): ${insertText}` };
  }

  return { ok: true };
}

async function logAccess(success, req) {
  try {
    await supabaseFetch('access_logs', {
      method: 'POST',
      prefer: 'return=minimal',
      body: JSON.stringify({
        success,
        created_at: new Date().toISOString(),
        user_agent: (req.headers['user-agent'] || '').slice(0, 300),
      }),
    });
  } catch (e) {
    // logging should never break the login flow
    console.error('access log failed', e);
  }
}

module.exports = {
  ADMIN_PASSWORD,
  isSiteAuthenticated,
  grantSiteSession,
  isAdminAuthenticated,
  grantAdminSession,
  clearCookie,
  SITE_SESSION_COOKIE,
  ADMIN_SESSION_COOKIE,
  hashPassword,
  verifyPassword,
  getSiteConfig,
  upsertSiteConfig,
  logAccess,
  supabaseFetch,
};
