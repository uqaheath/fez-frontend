import { combineReducers } from 'redux-immutable';

// Load reducers
import { appReducer } from 'modules/App';
import { reducer as dashboardReducer } from 'modules/Dashboard';
import { reducer as formReducer } from 'redux-form/immutable';
import { helpDrawerReducer } from 'uqlibrary-react-toolbox';
import stepper from 'providers/stepper';
import publicationsearch from 'providers/publicationsearch';

const rootReducer = combineReducers({
    app: appReducer,
    form: formReducer,
    dashboard: dashboardReducer,
    helpDrawer: helpDrawerReducer,
    ...stepper.reducers,
    ...publicationsearch.reducers
});

export default rootReducer;
