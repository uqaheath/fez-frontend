import {combineReducers} from 'redux-immutable';

// Load reducers
import {reducer as formReducer} from 'redux-form/immutable';
import {appReducer} from 'modules/App';
import {authorsReducer, helpDrawerReducer} from 'uqlibrary-react-toolbox';
import {reducer as dashboardReducer} from 'modules/Dashboard';
import {publicationTypeReducer, publicationSearchReducer, publicationSubTypeReducer} from './modules/Forms';
import {fileUploadReducer} from './modules/sharedComponents';

const rootReducer = combineReducers({
    form: formReducer,
    // App reducers
    app: appReducer,
    authors: authorsReducer,
    dashboard: dashboardReducer,
    fileUpload: fileUploadReducer,
    helpDrawer: helpDrawerReducer,
    publicationTypes: publicationTypeReducer,
    publicationSubTypes: publicationSubTypeReducer,
    publicationSearch: publicationSearchReducer,
});

export default rootReducer;
