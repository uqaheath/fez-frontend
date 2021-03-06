// TODO: can load user preferences from cookies or local storage
// export const APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_LOADING = 'APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_LOADING';
// export const APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_LOADED = 'APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_LOADED';
export const APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_HIDE = 'APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_HIDE';

/**
 * Hides possibly yours lure application-wide
 * @returns {action}
 */
export function hidePossiblyYourPublicationsLure() {
    return {
        type: APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_HIDE
    };
}
