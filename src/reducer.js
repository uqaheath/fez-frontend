import { combineReducers } from 'redux-immutable';

// Load reducers
import { reducer as formReducer } from 'redux-form/immutable';
import { helpDrawerReducer } from 'uqlibrary-react-toolbox';

const rootReducer = combineReducers({
    form: formReducer,
    helpDrawer: helpDrawerReducer
});

export default rootReducer;
