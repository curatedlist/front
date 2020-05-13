export function authHeader(didtoken) {
  if (didtoken) {
      return { 'Authorization': 'Bearer ' + didtoken };
  } else {
      return {};
  }
}
