import { clearSession } from '_helpers/auth';

export function handleErrors(response) {
  if (response.status === 401) {
    // The Google ID token is short-lived (~1h) and not refreshed, so an
    // authenticated request eventually 401s once it expires. Drop the stale
    // session and send the user to log in again (a full navigation resets the
    // empty Redux store on reload). Guard against a redirect loop on /login.
    clearSession();
    if (window.location.pathname !== '/login') {
      window.location.assign('/login');
    }
    throw Error('Your session has expired. Please log in again.');
  }
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}
