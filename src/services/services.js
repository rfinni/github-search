import { URLS } from '../config/config';

/**
 * Searchs github for user suggestions based on input value
 * @param {string} val
 * @returns {Promise}
 */
export const searchForUserSuggestions = async (val) => {
  const request = await fetch(`${URLS.SEARCH}${val}`);
  return request.json();
}

/**
 * Gets a specific user's data
 * @param {string} user
 * @returns {Promise}
 */
export const requestUser = async (user) => {
  const request = await fetch(`${URLS.USERS}${user}`);
  return request.json();
}
