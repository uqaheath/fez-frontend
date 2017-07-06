import {api} from 'config';

/**
 * Fetches the document access types
 * @returns {Promise}
 */
export function loadDocumentAccessData() {
    return new Promise((resolve, reject) => {
        api.get('acml/quick-templates').then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}