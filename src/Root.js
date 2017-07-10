import React, {PropTypes} from 'react';
import {ConnectedRouter} from 'connected-react-router/immutable';
import { Switch } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {theme} from 'config';

// Top level "pages"
import App from 'components/App';
import app from 'providers/app';

const Root = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <Switch>
                    <App providers={{ app }} />
                </Switch>
            </MuiThemeProvider>
        </ConnectedRouter>
    );
};

Root.propTypes = {
    history: PropTypes.object,
};

export default Root;
