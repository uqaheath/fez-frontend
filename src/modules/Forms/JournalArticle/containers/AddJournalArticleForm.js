import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form/immutable';
import Immutable from 'immutable';
import AddJournalArticleForm from '../components/AddJournalArticleForm';

const scrollToElement = require('scrollto-element');

let AddJournalArticleFormContainer = reduxForm({
    validate: (values) => {
        const errors = {};
        // validate partial date of custom date picker
        if (values.get('partialDateYear') && values.get('partialDateMonth') && values.get('partialDateDay')) {
            const parsedDate = new Date(
                parseInt(values.get('partialDateYear'), 10),
                parseInt(values.get('partialDateMonth'), 10),
                parseInt(values.get('partialDateDay'), 10));

            if (parsedDate.getMonth() !== parseInt(values.get('partialDateMonth'), 10)) {
                errors.partialDateDay = 'Invalid date';
            }
        }
        return errors;
    },

    onSubmitFail: (result) => {
        try {
            const target = Object.keys(result);
            const invalidField = document.getElementsByName(target[0])[0];
            if (invalidField) {
                // scroll to the first erroneous field
                scrollToElement(invalidField, 800);
                // set focus to first invalid field
                invalidField.focus();
                const invalidFieldSubElements = invalidField.querySelectorAll('button, select, input, textArea, a');
                if (invalidFieldSubElements.length > 0) {
                    invalidFieldSubElements[0].focus();
                }
            }
        } catch (e) {
            console.debug(e);
        }
    }
})(AddJournalArticleForm);

const mapStateToProps = (state) => {
    const journalArticleState = state.get('journalArticle');
    const fileUploadState = state.get('fileUpload');

    return {
        acceptedFiles: fileUploadState.get('acceptedFiles'),
        formValues: getFormValues('AddJournalArticleForm')(state) || Immutable.Map({}),
        isUploadCompleted: fileUploadState.get('isUploadCompleted'),
        publicationSubTypeList: journalArticleState.get('publicationSubTypeList'),
        recordSubmissionState: journalArticleState.get('recordSubmissionState'),
        recordSubmissionErrorMessage: journalArticleState.get('recordSubmissionErrorMessage'),
        selectedPublicationId: state.get('publicationTypes').get('selectedPublicationType')
    };
};

AddJournalArticleFormContainer = connect(mapStateToProps)(AddJournalArticleFormContainer);

export default AddJournalArticleFormContainer;
