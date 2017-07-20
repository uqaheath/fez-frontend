/**
 * Created by uqvasai on 20/07/2017.
 */
import { performSearch } from '../repositories/publicationSearch';
import { flattenResults } from '../helpers/search';
import {
    SEARCH_LOADING, SEARCH_COMPLETED, CLEAR_SEARCH_RESULTS,
    SOURCE_WOS, SOURCE_SCOPUS, SOURCE_PUBMED, SOURCE_CROSSREF,
    WOS_SEARCH_LOADING, SCOPUS_SEARCH_LOADING, CROSSREF_SEARCH_LOADING, PUBMED_SEARCH_LOADING, INTERNAL_SEARCH_LOADING,
    WOS_SEARCH_COMPLETED, SCOPUS_SEARCH_COMPLETED, CROSSREF_SEARCH_COMPLETED, PUBMED_SEARCH_COMPLETED, INTERNAL_SEARCH_COMPLETED,
    WOS_SEARCH_FAILED, SCOPUS_SEARCH_FAILED, CROSSREF_SEARCH_FAILED, PUBMED_SEARCH_FAILED, INTERNAL_SEARCH_FAILED
} from '../constants/search';

/**
 * Generic search function to perform search based on provided parameters
 *
 * @param dispatch
 * @param source (optional)
 * @param searchText
 * @param name
 * @param loading
 * @param completed
 * @param failed
 *
 * @returns {Promise}
 */
function search(dispatch, { source, searchText, name, loading, completed, failed }) {
    return new Promise((resolve) => {
        dispatch({ type: loading });
        performSearch(searchText, source).then(results => {
            dispatch({
                type: completed,
                payload: flattenResults(results),
                name: name
            });
            resolve(true);
        }).catch((error) => {
            console.log(error);
            dispatch({ type: failed });
            resolve(true);
        });
    });
}

/**
 * Search WOS
 *
 * @param dispatch
 * @param searchText
 * @param name
 *
 * @returns {Promise}
 */
export function searchWos(dispatch, searchText, name) {
    const wos = {
        searchText: searchText,
        name: name,
        source: SOURCE_WOS,
        loading: WOS_SEARCH_LOADING,
        completed: WOS_SEARCH_COMPLETED,
        failed: WOS_SEARCH_FAILED
    };
    return search(dispatch, wos);
}

/**
 * Search SCOPUS
 *
 * @param dispatch
 * @param searchText
 * @param name
 *
 * @returns {Promise}
 */
export function searchScopus(dispatch, searchText, name) {
    const scopus = {
        searchText: searchText,
        name: name,
        source: SOURCE_SCOPUS,
        loading: SCOPUS_SEARCH_LOADING,
        completed: SCOPUS_SEARCH_COMPLETED,
        failed: SCOPUS_SEARCH_FAILED
    };
    return search(dispatch, scopus);
}

/**
 * Search CROSSREF
 *
 * @param dispatch
 * @param searchText
 * @param name
 *
 * @returns {Promise}
 */
export function searchCrossref(dispatch, searchText, name) {
    const crossref = {
        searchText: searchText,
        name: name,
        source: SOURCE_CROSSREF,
        loading: CROSSREF_SEARCH_LOADING,
        completed: CROSSREF_SEARCH_COMPLETED,
        failed: CROSSREF_SEARCH_FAILED
    };
    return search(dispatch, crossref);
}

/**
 * Search PUBMED
 *
 * @param dispatch
 * @param searchText
 * @param name
 *
 * @returns {Promise}
 */
export function searchPubmed(dispatch, searchText, name) {
    const pubmed = {
        searchText: searchText,
        name: name,
        source: SOURCE_PUBMED,
        loading: PUBMED_SEARCH_LOADING,
        completed: PUBMED_SEARCH_COMPLETED,
        failed: PUBMED_SEARCH_FAILED
    };
    return search(dispatch, pubmed);
}

/**
 * Search Internal (eSpace)
 * @param dispatch
 * @param searchText
 * @param name
 *
 * @returns {Promise}
 */
export function searchInternal(dispatch, searchText, name) {
    const internal = {
        searchText: searchText,
        name: name,
        loading: INTERNAL_SEARCH_LOADING,
        completed: INTERNAL_SEARCH_COMPLETED,
        failed: INTERNAL_SEARCH_FAILED
    };
    return search(dispatch, internal);
}

/**
 * Load publication search from various sources
 *
 * @param name
 *
 * @returns {function(*=, *)}
 */
export function loadPublicationSearchResults(name) {
    return (dispatch, getState) => {
        const searchText = getState().get('publicationSearch').get('publicationSearchText');

        dispatch({ type: CLEAR_SEARCH_RESULTS, name: name});
        dispatch({ type: SEARCH_LOADING });

        Promise.all([
            searchInternal(dispatch, searchText, name),
            searchWos(dispatch, searchText, name),
            searchScopus(dispatch, searchText, name),
            searchCrossref(dispatch, searchText, name),
            searchPubmed(dispatch, searchText, name)
        ]).then(() => {
            dispatch({ type: SEARCH_COMPLETED });
        });
    };
}
