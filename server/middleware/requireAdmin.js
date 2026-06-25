// server/middleware/requireAdmin.js
//
// Simple shared-secret auth for admin endpoints.
// The admin dashboard sends this key on every request as a header.
//
// Set ADMIN_API_KEY in your Render environment variables to a long
// random value. Generate one with:
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
//
export function requireAdmin(req, res, next) {
  const providedKey = req.headers["x-admin-key"] || null;
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    // Fail closed: if the server isn't configured with a key,
    // refuse all admin access rather than silently allowing it.
    console.error(
      "ADMIN_API_KEY is not set — refusing admin access."
    );
    return res.status(500).json({ error: "Admin access not configured" });
  }

  if (!providedKey || providedKey !== expectedKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
