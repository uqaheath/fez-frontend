import { api } from '../config';
import { getSearchUrl } from '../helpers/search';

/**
 * Process error
 *
 * @param error
 * @param resolve
 * @param reject
 */
function processError(error, resolve, reject) {
    if (error.hasOwnProperty('response') && error.response !== null && typeof(error.response) !== 'undefined'
        && error.response.hasOwnProperty('status') && (error.response.status === 404 || error.response.status === 500 || error.response.status === 422 || error.response.status === 504)) {
        resolve([]);
    } else {
        reject(error);
        throw error;
    }
}

/**
 * Get promise for a given url
 *
 * @param url
 * @returns {Promise}
 */
function getPromise(url) {
    return new Promise((resolve, reject) => {
        api.get(url)
            .then(response => { resolve(response.data); })
            .catch(error => { processError(error, resolve, reject); });
    });
}

/**
 * Perform search for given query string and source
 *
 * @param querystring
 * @param source
 * @returns {Promise}
 */
export function performSearch(querystring, source) {
    return getPromise(getSearchUrl(querystring, source));
}
