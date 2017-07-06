/**
 * Created by uqvasai on 5/07/2017.
 */
import { api } from '../config';

function performExternalSearch(querystring) {
    return new Promise((resolve, reject) => {
        api.get(`search/external?${querystring}`).then(response => {
            resolve(response.data);
        }).catch(e => {
            reject(e);
            throw e;
        });
    });
}

export function performSearch(querystring) {
    return new Promise((resolve) => {
        api.get(`search/internal?${querystring}`)
            .then(response => {
                if (response.data.length > 0) {
                    resolve(response.data);
                } else {
                    resolve(performExternalSearch(querystring));
                }
            }).catch(() => {
                // if it errors, try an external search
                resolve(performExternalSearch(querystring));
            });
    });
}
