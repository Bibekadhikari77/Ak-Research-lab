import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// Demo-only credentials for this boilerplate's admin panel. There is no real
// user store or password hashing here — replace this with a proper auth
// backend before this ever runs anywhere but a local demo.
const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ?? "admin@gmail.com"
).toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "dev-only-admin-secret";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function verifyAdminCredentials(
  email: string,
  password: string,
): boolean {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
  );
}

function sign(value: string): string {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function createAdminSessionToken(): string {
  const payload = Buffer.from(ADMIN_EMAIL).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

// Signature check only — this proves the cookie was minted by our login
// route, not that the session is still "current" (no expiry/revocation
// list). Good enough for a demo gate, not a substitute for real sessions.
export function isValidAdminSessionToken(
  token: string | undefined | null,
): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}
