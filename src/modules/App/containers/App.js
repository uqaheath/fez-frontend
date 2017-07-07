import {connect} from 'react-redux';

import App from '../components/App';
import {hideSnackbar, loadAccount, toggleDrawer} from '../actions';

const AppContainer = connect(state => {
    const appState = state.get('app');
    return {
        error: appState.get('error'),
        account: appState.get('account'),
        accountLoaded: appState.get('accountLoaded'),
        menuDrawerOpen: appState.get('menuDrawerOpen'),
        snackbar: appState.get('snackbar')
    };
}, dispatch => {
    return {
        hideSnackbar: () => dispatch(hideSnackbar()),
        loadAccount: () => dispatch(loadAccount()),
        toggleDrawer: open => dispatch(toggleDrawer(open))
    };
})(App);

export default AppContainer;
