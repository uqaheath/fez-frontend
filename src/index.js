// External
import {AppContainer} from 'react-hot-loader';
import {applyMiddleware, compose, createStore} from 'redux';
import {createBrowserHistory, createHashHistory} from 'history';
import {routerMiddleware, connectRouter} from 'connected-react-router/immutable';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';

// Tap fix for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Internal
import Root from './Root';
import rootReducer from './reducer';
import 'sass/index.scss';

let history;

if (process.env.NODE_ENV === 'production') {
    history = createBrowserHistory();
} else {
    history = createHashHistory();
}

const initialState = Immutable.Map();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        ),
    ),
);

// Import mock data if required
if (process.env.NODE_ENV !== 'production' && process.env.USE_MOCK) {
    require('./mock');
}

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Root history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('react-root')
    );
};

render();

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./Root', () => {
        render();
    });

    // Reload reducers
    module.hot.accept('./reducer', () => {
        store.replaceReducer(connectRouter(history)(rootReducer));
    });
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

