/**
 * Created by uqvasai on 4/07/2017.
 */
import { getButtonLabel } from '../helpers/button-label';
import { performSearch } from '../helpers/publication-search';
import { getQueryString } from '../helpers/repository-query-string';

import Immutable from 'immutable';

export const SEARCH_INPUT_CHANGED = 'SEARCH_INPUT_CHANGED';
export const SEARCH_SUBMITTED = 'SEARCH_SUBMITTED';
export const SEARCH_FINISHED = 'SEARCH_FINISHED';

const actions = {
    completeSearch() {
        return {
            type: SEARCH_FINISHED
        };
    },
    updateSearch(event, value) {
        return {
            type: SEARCH_INPUT_CHANGED,
            payload: value
        };
    },
    performSearch(value) {
        return (dispatch) => {
            dispatch({ type: SEARCH_SUBMITTED });
            performSearch(getQueryString(value))
                .then(list => {
                    dispatch({
                        type: SEARCH_FINISHED,
                        payload: list
                    });
                }).catch(error => {
                    throw(error);
                });
        };
    }
};

const reducers = {
    loadingSearch(state = false, action) {
        switch (action.type) {
            case SEARCH_SUBMITTED:
                return true;
            case SEARCH_FINISHED:
                return false;
            default:
                return state;
        }
    },
    searchText(state = '', action) {
        switch (action.type) {
            case SEARCH_INPUT_CHANGED:
                return action.payload;
            default:
                return state;
        }
    },
    buttonLabel(state = 'Search', action) {
        switch (action.type) {
            case SEARCH_INPUT_CHANGED:
                return getButtonLabel(action.payload);
            default:
                return state;
        }
    },
    publicationSearchResult(state = Immutable.Map(), action) {
        console.log(action);
        switch (action.type) {
            case SEARCH_FINISHED:
                return Immutable.fromJS(action.payload);
            default:
                return state;
        }
    }
};

export default { actions, reducers };
