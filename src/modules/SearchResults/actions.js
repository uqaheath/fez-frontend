/**
 * Created by uqvasai on 14/07/2017.
 */

import {
    performInternalSearch,
    performExternalWosSearch,
    performExternalScopusSearch,
    performExternalCrossrefSearch,
    performExternalPubmedSearch
} from '../../repositories/publicationSearch';

import {
    SEARCH_INITIATED,
    SEARCH_LOADING, WOS_SEARCH_LOADING, SCOPUS_SEARCH_LOADING, CROSSREF_SEARCH_LOADING, PUBMED_SEARCH_LOADING, INTERNAL_SEARCH_LOADING,
    WOS_SEARCH_COMPLETED, SCOPUS_SEARCH_COMPLETED, CROSSREF_SEARCH_COMPLETED, PUBMED_SEARCH_COMPLETED, INTERNAL_SEARCH_COMPLETED,
    WOS_SEARCH_FAILED, SCOPUS_SEARCH_FAILED, CROSSREF_SEARCH_FAILED, PUBMED_SEARCH_FAILED, INTERNAL_SEARCH_FAILED,
    SEARCH_COMPLETED
} from './constants';


export function setPublicationSearchText(searchQuery) {
    return {
        type: SEARCH_INITIATED,
        payload: searchQuery
    };
}

function flattenResults(results) {
    const flattenedResults = [].concat.apply([], results);
    return flattenedResults.slice(0, Math.min(5, flattenedResults.length));
}

export function searchWos(dispatch, searchText) {
    return new Promise((resolve) => {
        dispatch({ type: WOS_SEARCH_LOADING });
        performExternalWosSearch(searchText).then(results => {
            dispatch({
                type: WOS_SEARCH_COMPLETED,
                payload: flattenResults(results)
            });
            resolve(true);
        }).catch((error) => {
            console.log(error);
            dispatch({ type: WOS_SEARCH_FAILED });
            resolve(true);
        });
    });
}

export function searchScopus(dispatch, searchText) {
    return new Promise((resolve) => {
        dispatch({ type: SCOPUS_SEARCH_LOADING });
        performExternalScopusSearch(searchText).then(results => {
            dispatch({
                type: SCOPUS_SEARCH_COMPLETED,
                payload: flattenResults(results)
            });
            resolve(true);
        }).catch((error) => {
            console.log(error);
            dispatch({ type: SCOPUS_SEARCH_FAILED });
            resolve(true);
        });
    });
}

export function searchCrossref(dispatch, searchText) {
    return new Promise((resolve) => {
        dispatch({ type: CROSSREF_SEARCH_LOADING });
        performExternalCrossrefSearch(searchText).then(results => {
            dispatch({
                type: CROSSREF_SEARCH_COMPLETED,
                payload: flattenResults(results)
            });
            resolve(true);
        }).catch((error) => {
            console.log(error);
            dispatch({ type: CROSSREF_SEARCH_FAILED });
            resolve(true);
        });
    });
}

export function searchPubmed(dispatch, searchText) {
    return new Promise((resolve) => {
        dispatch({ type: PUBMED_SEARCH_LOADING });
        performExternalPubmedSearch(searchText).then(results => {
            dispatch({
                type: PUBMED_SEARCH_COMPLETED,
                payload: flattenResults(results)
            });
            resolve(true);
        }).catch((error) => {
            console.log(error);
            dispatch({ type: PUBMED_SEARCH_FAILED });
            resolve(true);
        });
    });
}

export function searchInternal(dispatch, searchText) {
    return new Promise((resolve) => {
        dispatch({ type: INTERNAL_SEARCH_LOADING });
        performInternalSearch(searchText).then(results => {
            dispatch({
                type: INTERNAL_SEARCH_COMPLETED,
                payload: flattenResults(results)
            });
            resolve(true);
        }).catch((error) => {
            console.log(error);
            dispatch({ type: INTERNAL_SEARCH_FAILED });
            resolve(true);
        });
    });
}

/**
 * Performs search
 * @returns {function(*)}
 */
export function loadResultsList(searchText) {
    return dispatch => {
        dispatch({type: SEARCH_LOADING});
        Promise.all([
            searchInternal(dispatch, searchText),
            searchWos(dispatch, searchText),
            searchScopus(dispatch, searchText),
            searchCrossref(dispatch, searchText),
            searchPubmed(dispatch, searchText)
        ]).then(() => {
            dispatch({ type: SEARCH_COMPLETED });
        });
    };
}
