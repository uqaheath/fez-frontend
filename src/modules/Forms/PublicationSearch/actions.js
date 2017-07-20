import { SEARCH_INITIATED } from '../../../constants/search';

export const SEARCH_RESULTS_CLEARED = 'SEARCH_RESULTS_CLEARED';

export function setPublicationSearchText(searchQuery) {
    return {
        type: SEARCH_INITIATED,
        payload: searchQuery
    };
}

/**
 * Clears the search results from the searchResultsList state
 * @returns {type: String}
 */
export function clearSearchResults() {
    return {
        type: SEARCH_RESULTS_CLEARED
    };
}
