/**
 * Created by uqvasai on 17/07/2017.
 */
import { isDOIValue, isPubMedValue } from './validator';
import { validExternalSources } from '../constants/search';

const _ = require('lodash');

/**
 * Check if provided source is valid or not
 *
 * @param source
 * @returns {boolean}
 */
const isValidSource = (source) => {
    return (source !== undefined) && (_.indexOf(validExternalSources, source) > -1);
};

/**
 * Flatten given results
 *
 * @param results
 */
export const flattenResults = (results) => {
    const flattenedResults = [].concat.apply([], results);
    return flattenedResults.slice(0, Math.min(5, flattenedResults.length));
};

/**
 * Get URL to perform either internal or external searches
 *  -   provide a valid source to perform external search
 *  -   leave source to perform internal search
 *
 * @param querystring
 * @param source
 * @returns {string}
 */
export const getSearchUrl = (querystring, source) => {
    if (isValidSource(source)) {
        return encodeURI(`search/external?${querystring}&source=${source}`);
    }

    return encodeURI(`search/internal?${querystring}`);
};

/**
 * Convert given search text to valid DOI/PUBMED/TITLE search query string
 *
 * @param searchText
 * @param rekDisplayType
 * @returns {string}
 */
export const convertToQueryString = (searchText, rekDisplayType = 179) => {
    if (isDOIValue(searchText)) {
        return `doi=${searchText}`;
    } else if (isPubMedValue(searchText)) {
        return `pub_med_id=${searchText}`;
    } else {
        return `rek_display_type=${rekDisplayType}&title=${searchText}`;
    }
};
