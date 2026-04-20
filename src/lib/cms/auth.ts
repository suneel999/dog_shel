import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'sct_admin_session';

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'change-this-password';
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'local-dev-secret';
}

function signValue(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

function buildSessionToken() {
  const payload = 'second-chance-tails-admin';
  return `${payload}.${signValue(payload)}`;
}

export function isUsingDefaultAdminPassword() {
  return getAdminPassword() === 'change-this-password';
}

export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token === buildSessionToken();
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login');
  }
}

export function createAdminSession() {
  cookies().set(ADMIN_COOKIE, buildSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
  });
}

export function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE);
}

export function verifyAdminPassword(password: string) {
  const expected = Buffer.from(getAdminPassword());
  const actual = Buffer.from(password);

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}
