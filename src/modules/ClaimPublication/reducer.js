/*
import Immutable from 'immutable';
*/
import {
    CLAIM_SUBMITTING,
    CLAIM_SUBMITTED,
    CLAIM_SUBMIT_FAILED,
    CLAIM_SUBMIT_RESET,
    PUBLICATION_SELECTED,
    PUBLICATION_SELECTED_CLEARED
} from './actions';

import { combineReducers } from 'redux-immutable';
import { createSearchResultsListReducer } from '../SearchResults/reducer';
import { SEARCH_RESULT_CLAIM_PUBLICATION } from '../../constants/search';

const RecordState = {
    clear: {
        submitting: false,
        failed: false,
        submitted: false
    },
    submitting: {
        submitting: true,
        failed: false,
        submitted: false
    },
    failed: {
        submitting: false,
        failed: true,
        submitted: false
    },
    submitted: {
        submitting: false,
        failed: false,
        submitted: true
    }
};

function selectedPublication(state = {}, action) {
    switch (action.type) {
        case PUBLICATION_SELECTED:
            return state.get('claimPublication').get('searchResultsList').find(entry => {
                return entry.get('rek_pid') === action.payload;
            });
        case PUBLICATION_SELECTED_CLEARED:
            return {};
        default:
            return state;
    }
}

function recordClaimState(state = {}, action) {
    switch (action.type) {
        case CLAIM_SUBMITTING:
            return RecordState.submitting;
        case CLAIM_SUBMITTED:
            return RecordState.submitted;
        case CLAIM_SUBMIT_FAILED:
            return RecordState.failed;
        case CLAIM_SUBMIT_RESET:
            return RecordState.clear;
        default:
            return state;
    }
}

function recordClaimErrorMessage(state = '', action) {
    switch (action.type) {
        case CLAIM_SUBMIT_FAILED:
            return action.payload;
        case CLAIM_SUBMITTING:
        case CLAIM_SUBMITTED:
        case CLAIM_SUBMIT_RESET:
        default:
            return state;
    }
}

export default combineReducers({
    searchResultsList: createSearchResultsListReducer(SEARCH_RESULT_CLAIM_PUBLICATION),
    selectedPublication,
    recordClaimState,
    recordClaimErrorMessage
});
