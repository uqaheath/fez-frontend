import {
    fetchAuthors,
    fetchAuthorDetails
} from 'repositories';

export const AUTHORS_LOADING = 'AUTHORS_LOADING';
export const AUTHORS_LOAD_FAILED = 'AUTHORS_LOAD_FAILED';
export const AUTHORS_LOADED = 'AUTHORS_LOADED';

export const AUTHOR_DETAILS_LOADING = 'AUTHOR_DETAILS_LOADING';
export const AUTHOR_DETAILS_FAILED = 'AUTHOR_DETAILS_FAILED';
export const AUTHOR_DETAILS_LOADED = 'AUTHOR_DETAILS_LOADED';

/**
 * Returns the authors list based on a query, filtered locally by filterBy function
 * @param {string} query passed on to api call
 * @param {function} filterBy function to filter/transform results from api list, eg users with org ids only
 * @returns {action}
 */
export function searchAuthors(query, filterBy) {
    return dispatch => {
        dispatch({type: AUTHORS_LOADING});

        fetchAuthors(query).then((data) => {
            dispatch({
                type: AUTHORS_LOADED,
                payload: filterBy ? data.filter(filterBy) : data
            });
        }).catch(error => {
            dispatch({
                type: AUTHORS_LOAD_FAILED,
                payload: error
            });
        });
    };
}

/**
 * Returns the authors details from app.libarary api
 * @param {string} author username
 * @returns {action}
 */
export function loadAuthorDetails(authorId) {
    return dispatch => {
        dispatch({type: AUTHOR_DETAILS_LOADING});

        fetchAuthorDetails(authorId).then((data) => {
            dispatch({
                type: AUTHOR_DETAILS_LOADED,
                payload: data
            });
        }).catch(error => {
            dispatch({
                type: AUTHOR_DETAILS_FAILED,
                payload: error
            });
        });
    };
}
