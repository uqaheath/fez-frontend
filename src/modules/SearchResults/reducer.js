/**
 * Created by uqvasai on 14/07/2017.
 */
import { combineReducers } from 'redux-immutable';
import {
    SEARCH_INITIATED,
    SEARCH_LOADING,
    SEARCH_COMPLETED,
    CLEAR_SEARCH_RESULTS,
    INTERNAL_SEARCH_LOADING, WOS_SEARCH_LOADING, SCOPUS_SEARCH_LOADING, CROSSREF_SEARCH_LOADING, PUBMED_SEARCH_LOADING,
    INTERNAL_SEARCH_COMPLETED, WOS_SEARCH_COMPLETED, SCOPUS_SEARCH_COMPLETED, CROSSREF_SEARCH_COMPLETED, PUBMED_SEARCH_COMPLETED,
    INTERNAL_SEARCH_FAILED, WOS_SEARCH_FAILED, SCOPUS_SEARCH_FAILED, CROSSREF_SEARCH_FAILED, PUBMED_SEARCH_FAILED
} from './constants';
import { convertToQueryString } from '../../helpers/search';

function searchPublicationText(state = '', action) {
    switch (action.type) {
        case SEARCH_INITIATED:
            return convertToQueryString(action.payload);
        default:
            return state;
    }
}

function loadingSearch(state = false, action) {
    switch (action.type) {
        case SEARCH_LOADING:
            return true;
        case INTERNAL_SEARCH_COMPLETED:
        case WOS_SEARCH_COMPLETED:
        case SCOPUS_SEARCH_COMPLETED:
        case CROSSREF_SEARCH_COMPLETED:
        case PUBMED_SEARCH_COMPLETED:
            return false;
        default:
            return state;
    }
}

function loadingMoreSearch(state = false, action) {
    switch (action.type) {
        case INTERNAL_SEARCH_LOADING:
        case WOS_SEARCH_LOADING:
        case SCOPUS_SEARCH_LOADING:
        case CROSSREF_SEARCH_LOADING:
        case PUBMED_SEARCH_LOADING:
            return true;
        case SEARCH_COMPLETED:
            return false;
        default:
            return state;
    }
}

function searchResultsList(state = [], action) {
    switch (action.type) {
        case INTERNAL_SEARCH_COMPLETED:
        case WOS_SEARCH_COMPLETED:
        case SCOPUS_SEARCH_COMPLETED:
        case CROSSREF_SEARCH_COMPLETED:
        case PUBMED_SEARCH_COMPLETED:
            return [...state, ...action.payload];
        case CLEAR_SEARCH_RESULTS:
            return [];
        case INTERNAL_SEARCH_FAILED:
        case WOS_SEARCH_FAILED:
        case SCOPUS_SEARCH_FAILED:
        case CROSSREF_SEARCH_FAILED:
        case PUBMED_SEARCH_FAILED:
        default:
            return state;
    }
}

const searchResultReducer = combineReducers({
    searchPublicationText,
    loadingSearch,
    loadingMoreSearch,
    searchResultsList
});

export default searchResultReducer;
