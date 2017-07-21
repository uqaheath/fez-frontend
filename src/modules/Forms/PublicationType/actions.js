// Types
export const PUBLICATION_TYPES_LOADING = 'PUBLICATION_TYPES_LOADING';
export const PUBLICATION_TYPES_LOADED = 'PUBLICATION_TYPES_LOADED';
export const PUBLICATION_TYPE_SELECTED = 'PUBLICATION_TYPE_SELECTED';
export const PUBLICATION_TYPE_CLEARED = 'PUBLICATION_TYPE_CLEARED';


/**
 * Selects the publication type id
 * @returns {{type: string, payload: int}}
 */
export function loadSelectedPublicationType(selectedId) {
    return {
        type: PUBLICATION_TYPE_SELECTED,
        payload: selectedId
    };
}


/**
 * Clears the selected publication type to an empty immutable map
 * @returns {{type: string, payload: object}}
 */
export function clearSelectedPublicationType() {
    return {
        type: PUBLICATION_TYPE_CLEARED,
        payload: {}
    };
}

