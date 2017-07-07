/**
 * Created by uqvasai on 6/07/2017.
 */
// Repositories
import {getAccount as apiGetAccount} from 'repositories/account';
import {LOCATION_CHANGE} from 'connected-react-router';
import Immutable from 'immutable';

export const APP_ACCOUNT_LOADING = 'APP_ACCOUNT_LOADING';
export const APP_ACCOUNT_LOADED = 'APP_ACCOUNT_LOADED';
export const APP_ACCOUNT_ANONYMOUS = 'APP_ACCOUNT_ANONYMOUS';

export const APP_MENU_DRAWER_TOGGLE = 'APP_MENU_DRAWER_TOGGLE';

export const APP_SNACKBAR_SHOW = 'CORE_SNACKBAR_SHOW';
export const APP_SNACKBAR_HIDE = 'CORE_SNACKBAR_HIDE';

export const APP_LOADING_ERROR = 'APP_LOADING_ERROR';

const actions = {
    /**
     * Loads the user's account into the application
     * @returns {function(*)}
     */
    loadAccount() {
        return dispatch => {
            dispatch({type: APP_ACCOUNT_LOADING});
            apiGetAccount().then(account => {
                dispatch({
                    type: APP_ACCOUNT_LOADED,
                    payload: account
                });
            }).catch(error => {
                if (error.hasOwnProperty('response') && error.response !== null && typeof(error.response) !== 'undefined'
                    && error.response.hasOwnProperty('status') && (error.response.status === 401 || error.response.status === 403)) {
                    dispatch({type: APP_ACCOUNT_ANONYMOUS});
                } else {
                    console.dir(error);

                    dispatch({
                        type: APP_LOADING_ERROR,
                        payload: error
                    });
                    // throw(error);
                }
            });
        };
    },
    /**
     * Toggles the menu drawer
     * @param open
     * @returns {{type: string, payload: *}}
     */
    toggleDrawer(open) {
        return {
            type: APP_MENU_DRAWER_TOGGLE,
            payload: open
        };
    },
    /**
     * Shows the snack bar
     * @param message
     * @returns {{type: string, payload: *}}
     */
    showSnackbar(message) {
        return {
            type: APP_SNACKBAR_SHOW,
            payload: message
        };
    },
    /**
     * Hides the snack bar
     * @returns {{type: string}}
     */
    hideSnackbar() {
        return {type: APP_SNACKBAR_HIDE};
    }
};

const initialState = Immutable.fromJS({
    account: {},
    accountLoaded: false, // TODO: more indicative name to the variable - user might not have a session, eg anon user
    menuDrawerOpen: false,
    snackbar: {
        open: false,
        message: ''
    },
    error: {
        displayError: false,
        message: ''
    }
});

const reducers = {
    error(state = initialState.get('error'), action) {
        switch (action.type) {
            case APP_LOADING_ERROR:
                return Immutable.fromJS(action.payload);
            default:
                return state;
        }
    },
    account(state = initialState.get('account'), action) {
        switch (action.type) {
            case APP_ACCOUNT_LOADED:
                return Immutable.fromJS(action.payload);
            case APP_ACCOUNT_ANONYMOUS:
                return Immutable.fromJS(null);
            default:
                return state;
        }
    },
    snackbar(state = initialState.get('snackbar'), action) {
        switch (action.type) {
            case APP_SNACKBAR_SHOW:
                return Immutable.fromJS({
                    open: true,
                    message: action.payload
                });
            case APP_SNACKBAR_HIDE:
            default:
                return state;
        }
    },
    menuDrawerOpen(state = false, action) {
        switch (action.type) {
            case LOCATION_CHANGE:
                return false;
            case APP_MENU_DRAWER_TOGGLE:
                return action.payload;
            default:
                return state;
        }
    },
    accountLoading(state = false, action) {
        switch (action.type) {
            case APP_ACCOUNT_LOADING:
                return true;
            default:
                return state;
        }
    },
    accountLoaded(state = false, action) {
        switch (action.type) {
            case APP_LOADING_ERROR:
            case APP_ACCOUNT_LOADED:
            case APP_ACCOUNT_ANONYMOUS:
                return true;
            default:
                return state;
        }
    }
};

export default { actions, reducers };
