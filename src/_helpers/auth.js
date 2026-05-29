// Lightweight session persistence. Google ID tokens are short-lived (~1h);
// we cache the logged-in user (incl. idToken) so a page reload keeps them
// signed in until an authenticated request fails, at which point the caller
// should clear the session and prompt for login again.
const KEY = 'curatedlist_user';

export function saveSession(user) {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (e) {
    /* ignore storage errors (private mode, quota) */
  }
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    /* ignore */
  }
}
