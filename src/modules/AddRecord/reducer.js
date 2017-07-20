import { combineReducers } from 'redux-immutable';
import { createSearchResultsListReducer } from '../SearchResults/reducer';
import { SEARCH_RESULT_ADD_RECORD } from '../../constants/search';
import {
    ADD_RECORD_STEPPER_INDEX_INCREASED,
    ADD_RECORD_STEPPER_INDEX_DECREASED,
    ADD_RECORD_STEPPER_INDEX_RESET
} from './actions';

function stepperIndex(state = 0, action) {
    switch (action.type) {
        case ADD_RECORD_STEPPER_INDEX_INCREASED:
            return state + 1;
        case ADD_RECORD_STEPPER_INDEX_DECREASED:
            return state - 1;
        case ADD_RECORD_STEPPER_INDEX_RESET:
            return 0;
        default:
            return state;
    }
}

export default combineReducers({
    stepperIndex,
    searchResultsList: createSearchResultsListReducer(SEARCH_RESULT_ADD_RECORD)
});
