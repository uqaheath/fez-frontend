import {connect} from 'react-redux';

import {reduxForm} from 'redux-form/immutable';
import AddRecord from '../components/AddRecord';
import {decreaseStep, increaseStep, loadPublicationTypesList, resetStepper, abandonSearch} from '../actions';
import {clearPublicationResults} from 'modules/ClaimPublication/actions';

let AddRecordContainer = reduxForm({
    form: 'AddRecordForm'
})(AddRecord);

AddRecordContainer = connect((state) => {
    return {
        searchResultsList: state.get('searchResult').get('searchResultsList'),
        loadingSearch: state.get('searchResult').get('loadingSearch'),
        selectedPublicationType: state.get('publicationTypes').get('selectedPublicationType'),
        stepperIndex: state.get('addRecord').get('stepperIndex'),
        publicationTypeList: state.get('publicationTypes').get('publicationTypeList')
    };
}, dispatch => {
    return {
        loadPublicationTypesList: () => dispatch(loadPublicationTypesList()),
        increaseStep: () => dispatch(increaseStep()),
        decreaseStep: () => dispatch(decreaseStep()),
        abandonSearch: () => dispatch(abandonSearch()),
        resetStepper: () => dispatch(resetStepper()),
        clearPublicationResults: () => dispatch(clearPublicationResults())
    };
})(AddRecordContainer);

export default AddRecordContainer;
