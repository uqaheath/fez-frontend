import {connect} from 'react-redux';

import {reduxForm, getFormValues} from 'redux-form/immutable';
import PublicationSearchForm from '../components/PublicationSearchForm';
import {validate} from '../validator';
import Immutable from 'immutable';
import { setPublicationSearchText } from '../actions';


let PublicationSearchFormContainer = reduxForm({
    form: 'PublicationSearchForm',
    validate
})(PublicationSearchForm);

PublicationSearchFormContainer = connect((state) => {
    return {
        formValues: getFormValues('PublicationSearchForm')(state) || Immutable.Map({})
    };
}, dispatch => {
    return {
        onSearchSubmit: searchText => dispatch(setPublicationSearchText(searchText))
    };
})(PublicationSearchFormContainer);

export default PublicationSearchFormContainer;
