// Repositories
import {loadPublicationSubTypeData} from 'repositories/publicationSubTypes';
// import {submitRecord} from 'repositories/addRecord';

// config
import {locale} from 'config';

// Types
export const PUBLICATION_SUB_TYPES_LOADING = 'PUBLICATION_SUB_TYPES_LOADING';
export const PUBLICATION_SUB_TYPES_LOADED = 'PUBLICATION_SUB_TYPES_LOADED';
// export const RECORD_SUBMITTED = 'RECORD_SUBMITTED';
// export const RECORD_SUBMIT_FAILED = 'RECORD_SUBMIT_FAILED';
// export const RECORD_SUBMITTING = 'RECORD_SUBMITTING';

// module imports
import {showSnackbar} from 'modules/App';

/**
 * Returns the vocab id entry
 * @returns {object}
 */
function getVocabId(id) {
    return locale.mapping.vocabs.filter(vocab => {
        return vocab.documentId === id;
    });
}

/**
 * Loads the publication sub types into the application
 * @returns {function(*)}
 */
export function loadPublicationSubTypesList(id) {
    return dispatch => {
        dispatch({type: PUBLICATION_SUB_TYPES_LOADING});
        const entry = getVocabId(id);

        loadPublicationSubTypeData(entry[0].vocabId).then(publicationTypes => {
            dispatch({
                type: PUBLICATION_SUB_TYPES_LOADED,
                payload: publicationTypes
            });
        }).catch(() => {
            // throw(error);
            // TODO: dispatch fail action
            dispatch({
                type: PUBLICATION_SUB_TYPES_LOADED,
                payload: []
            });
        });
    };
}


/**
 * Cancels the add record functionality
 * @returns {function(*)}
 */
export function cancelAddRecord(message) {
    return dispatch => {
        dispatch(showSnackbar(message));
    };
}

/**
 * Submits the record for approval
 * @returns {function(*)}
 */
// export function submitRecordForApproval(data) {
//     return dispatch => {
//         dispatch({type: RECORD_SUBMITTING});
//
//         submitRecord(data).then(() => {
//             dispatch({type: RECORD_SUBMITTED});
//         }).catch(error => {
//             dispatch({type: RECORD_SUBMIT_FAILED});
//             throw(error);
//         });
//     };
// }