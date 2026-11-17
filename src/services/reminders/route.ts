/**
 * Only a route inside the app. A notification's data can come from anyone
 * holding a push token, and the router hands an outside address (https:,
 * another app's scheme, or a protocol-relative //host) to the system.
 */
export function isAppRoute(route: unknown): route is string {
  return typeof route === 'string' && route.startsWith('/') && !route.startsWith('//') && !route.includes('\\');
}
