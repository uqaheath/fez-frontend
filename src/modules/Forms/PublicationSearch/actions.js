// Repositories
export const SEARCH_RESULTS_CLEARED = 'SEARCH_RESULTS_CLEARED';

/**
 * Clears the search results from the searchResultsList state
 * @returns {type: String}
 */
export function clearSearchResults() {
    return {
        type: SEARCH_RESULTS_CLEARED
    };
}
