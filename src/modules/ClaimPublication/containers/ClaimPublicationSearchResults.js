/**
 * Created by uqvasai on 18/07/2017.
 */
import { connect } from 'react-redux';
import { loadUsersPublications } from '../actions';

import SearchResults from '../../SearchResults/components/SearchResults';

export default connect(state => {
    return {
        searchResultsList: state.get('claimPublication').get('searchResultsList'),
        loadingSearch: state.get('searchResult').get('loadingSearch')
    };
}, dispatch => {
    return {
        performSearch: () => dispatch(loadUsersPublications())
    };
})(SearchResults);
