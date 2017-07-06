import {combineReducers} from 'redux-immutable';

// import {reducer as formReducer} from 'redux-form/immutable';

// Load reducers
import {appReducer} from 'modules/App';
import {reducer as dashboardReducer} from 'modules/Dashboard';
import {reducer as formReducer} from 'redux-form/immutable';
import {helpDrawerReducer} from 'uqlibrary-react-toolbox';

const rootReducer = combineReducers({
    app: appReducer,
    form: formReducer,
    dashboard: dashboardReducer,
    helpDrawer: helpDrawerReducer
});

export default rootReducer;
