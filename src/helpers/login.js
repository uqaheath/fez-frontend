/**
 * Created by uqvasai on 6/07/2017.
 */

import { AUTH_URL_LOGIN, AUTH_URL_LOGOUT } from '../config';

/**
 * Logs in user into the application
 * @void redirects to login url
 */
export function login() {
    const returnUrl = window.btoa(window.location.href);
    window.location.href = `${AUTH_URL_LOGIN}?return=${returnUrl}`;
}

/**
 * Logs user out
 * @void redirects to logout url
 */
export function logout() {
    const returnUrl = window.btoa(window.location.href);
    window.location.href = `${AUTH_URL_LOGOUT}?return=${returnUrl}`;
}
