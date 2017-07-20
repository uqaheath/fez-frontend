/**
 * Created by uqvasai on 18/07/2017.
 */
import { connect } from 'react-redux';
import { loadPublicationSearchResults } from '../../../actions/search';
import { SEARCH_RESULT_ADD_RECORD } from '../../../constants/search';

import SearchResults from '../../SearchResults/components/SearchResults';

export default connect(state => {
    return {
        searchResultsList: state.get('addRecord').get('searchResultsList'),
        loadingSearch: state.get('searchResult').get('loadingSearch'),
        loadingMoreSearch: state.get('searchResult').get('loadingMoreSearch')
    };
}, dispatch => {
    return {
        performSearch: () => dispatch(loadPublicationSearchResults(SEARCH_RESULT_ADD_RECORD))
    };
})(SearchResults);
