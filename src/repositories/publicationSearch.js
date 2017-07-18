import {api} from 'config';

const SOURCE_WOS = 'wos';
const SOURCE_CROSSREF = 'crossref';
const SOURCE_SCOPUS = 'scopus';
const SOURCE_PUBMED = 'pubmed';

const externalUrl = querystring => (encodeURI(`search/external?${querystring}`));

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
 * Perform WOS search
 *
 * @param querystring
 * @returns {Promise}
 */
export function performExternalWosSearch(querystring) {
    const url = externalUrl(querystring);
    return getPromise(`${url}&source=${SOURCE_WOS}`);
}

/**
 * Perform SCOPUS search
 *
 * @param querystring
 * @returns {Promise}
 */
export function performExternalScopusSearch(querystring) {
    const url = externalUrl(querystring);
    return getPromise(`${url}&source=${SOURCE_SCOPUS}`);
}

/**
 * Perform CROSSREF search
 *
 * @param querystring
 * @returns {Promise}
 */
export function performExternalCrossrefSearch(querystring) {
    const url = externalUrl(querystring);
    return getPromise(`${url}&source=${SOURCE_CROSSREF}`);
}

/**
 * Perform PUBMED search
 *
 * @param querystring
 * @returns {Promise}
 */
export function performExternalPubmedSearch(querystring) {
    const url = externalUrl(querystring);
    return getPromise(`${url}&source=${SOURCE_PUBMED}`);
}

/**
 * Perform INTERNAL (eSpace) search
 *
 * @param querystring
 * @returns {Promise}
 */
export function performInternalSearch(querystring) {
    const url = `search/internal?${querystring}`;
    return getPromise(url);
}
