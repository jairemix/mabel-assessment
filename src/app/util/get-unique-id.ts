let next = 1;

/**
 * does not return a UUID but uses a global counter to ensure uniqueness
 * we may use a UUID generating library instead if we need to https://www.npmjs.com/package/uuid
 */
export function getUniqueID() {
  return 'id_' + next++;
}
