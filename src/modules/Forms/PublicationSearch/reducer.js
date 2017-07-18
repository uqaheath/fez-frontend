import { combineReducers } from 'redux-immutable';
import { SEARCH_INITIATED } from '../../SearchResults/constants';
import { convertToQueryString } from '../../../helpers/search';

function publicationSearchText(state = '', action) {
    switch (action.type) {
        case SEARCH_INITIATED:
            return convertToQueryString(action.payload);
        default:
            return state;
    }
}
const publicationSearchReducer = combineReducers({
    publicationSearchText
});

export default publicationSearchReducer;
