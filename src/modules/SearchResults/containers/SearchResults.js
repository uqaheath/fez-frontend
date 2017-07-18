import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { loadResultsList } from '../actions';

import SearchResults from '../components/SearchResults';

const SearchResultsForm = reduxForm({
    form: 'SearchResultsForm'
})(SearchResults);

export default connect((state) => {
    return {
        searchText: state.get('searchResult').get('searchPublicationText'),
        dataSource: state.get('searchResult').get('searchResultsList'),
        loadingSearch: state.get('searchResult').get('loadingSearch'),
        loadingMoreSearch: state.get('searchResult').get('loadingMoreSearch')
    };
}, dispatch => {
    return {
        performSearch: searchText => dispatch(loadResultsList(searchText))
    };
})(SearchResultsForm);
