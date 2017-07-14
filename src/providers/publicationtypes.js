/**
 * Created by uqvasai on 11/07/2017.
 */
import { loadPublicationTypesData } from '../helpers/publication-types';
import { locale } from '../config';

export const PUBLICATION_TYPES_LOADING = 'PUBLICATION_TYPES_LOADING';
export const PUBLICATION_TYPES_LOADED = 'PUBLICATION_TYPES_LOADED';
export const PUBLICATION_TYPE_SELECTED = 'PUBLICATION_TYPE_SELECTED';
export const PUBLICATION_TYPE_CLEARED = 'PUBLICATION_TYPE_CLEARED';

const actions = {
    loadPublicationTypesList() {
        return (dispatch) => {
            dispatch({ type: PUBLICATION_TYPES_LOADING });
            loadPublicationTypesData().then(publicationTypes => {
                dispatch({
                    type: PUBLICATION_TYPES_LOADED,
                    payload: publicationTypes
                });
            }).catch((error) => {
                throw(error);
            });
        };
    },
    loadSelectedPublicationType(event, selectedId) {
        return {
            type: PUBLICATION_TYPE_SELECTED,
            payload: selectedId
        };
    },
    clearSelectedPublicationType() {
        return {
            type: PUBLICATION_TYPE_CLEARED,
            payload: {}
        };
    }
};

const reducers = {
    loadingTypes(state = false, action) {
        switch(action.type) {
            case PUBLICATION_TYPES_LOADING:
                return true;
            case PUBLICATION_TYPES_LOADED:
                return false;
            default:
                return state;
        }
    },
    publicationTypeList(state = [], action) {
        switch (action.type) {
            case PUBLICATION_TYPES_LOADED:
                let displayPubTypeList = [];
                const popularTypesList = locale.publicationTypeForm.popularTypesList;
                const allPublicationTypeList = action.payload;
                if (popularTypesList.length > 0) {
                    displayPubTypeList = allPublicationTypeList.filter(item => (popularTypesList.indexOf(item.name) >= 0));
                    displayPubTypeList.push({id: 0, name: 'divider'});
                }
                return displayPubTypeList.concat(allPublicationTypeList);
            default:
                return state;
        }
    }
};

export default { actions, reducers };
