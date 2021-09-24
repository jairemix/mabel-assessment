let next = 1;

/**
 * 
 * @return a unique ID by using a global counter to ensure uniqueness. ID returned is not a UUID.
 * 
 * if we have stricter uniqueness requirements, we may use a UUID generating library https://www.npmjs.com/package/uuid
 */
export function getUniqueID(): string {
  return 'id_' + next++;
}
