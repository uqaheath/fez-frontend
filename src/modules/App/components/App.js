import React from 'react';
import PropTypes from 'prop-types';

import {Route, Switch} from 'react-router';
import AppBar from 'material-ui/AppBar';

import {AppLoader, MenuDrawer, HelpDrawer, Alert} from 'uqlibrary-react-toolbox';

import {defaultMenuItems, researcherMenuItems} from 'config';
import {locale} from 'config';

import {AUTH_URL_LOGIN, AUTH_URL_LOGOUT} from 'config';
import {AuthButton} from 'uqlibrary-react-toolbox';

// Pages
import {Dashboard} from 'modules/Dashboard';
import {Research} from 'modules/Research';
import {AddRecord} from 'modules/AddRecord';
import {StandardPage} from 'uqlibrary-react-toolbox';
import {Browse} from 'modules/Browse';
import {ClaimPublication} from 'modules/ClaimPublication';
import {ClaimPublicationForm} from 'modules/ClaimPublicationForm';

export default class App extends React.Component {

    static propTypes = {
        error: PropTypes.object,
        account: PropTypes.object,
        authorDetails: PropTypes.object,
        loaded: PropTypes.bool.isRequired,
        loadAccount: PropTypes.func.isRequired,
        getCurrentAuthor: PropTypes.func.isRequired,
        menuDrawerOpen: PropTypes.bool.isRequired,
        toggleMenuDrawer: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            mediaQuery: window.matchMedia('(min-width: 1600px)')
        };
    }

    /**
     * Set up default values, event handlers when component is mounted
     */
    componentDidMount() {
        this.props.loadAccount();
        this.props.getCurrentAuthor();

        this.handleResize(this.state.mediaQuery);
        this.state.mediaQuery.addListener(this.handleResize);
    }

    /**
     * Clean up after the container has been unmounted
     */
    componentWillUnmount() {
        this.state.mediaQuery.removeListener(this.handleResize);
    }

    handleResize = (mediaQuery) => {
        this.setState({
            docked: mediaQuery.matches
        });
    };

    toggleDrawer = () => {
        this.props.toggleMenuDrawer(!this.props.menuDrawerOpen);
    };

    render() {
        const {
            error,
            account,
            authorDetails,
            loaded,
            menuDrawerOpen,
        } = this.props;

        const {
            docked
        } = this.state;

        const titleStyle = docked ? { paddingLeft: 320 } : {};
        const container = docked ? { paddingLeft: 340 } : {};

        const isAuthorizedUser = loaded && account !== null && account.get('id') !== undefined;
        const components = {
            Browse, StandardPage, Dashboard, Research, AddRecord, ClaimPublication
        };

        const menuItems = isAuthorizedUser ?
            [...researcherMenuItems(locale, account.get('mail'), components), ...defaultMenuItems(locale, components)]
            :
            defaultMenuItems(locale, components);

        // TODO: implement error display if required
        if (error) {
            console.log(error);
        }

        return (
            <div className="layout-fill">
                {!loaded ? (
                    <AppLoader title={locale.global.title} logoImage={locale.global.logo} logoText={locale.global.title} />
                    ) : (
                    <div className="layout-fill align-stretch">
                        {/* TODO: app bar buttons should be components */}
                        <AppBar
                            className="AppBar align-center"
                            showMenuIconButton={!docked}
                            style={{height: 75}}
                            iconStyleLeft={{marginTop: 0}}
                            title={locale.global.title}
                            titleStyle={titleStyle}
                            onLeftIconButtonTouchTap={this.toggleDrawer}
                            iconElementRight={
                                <div style={{marginTop: '-10px'}}>
                                    <AuthButton isAuthorizedUser={isAuthorizedUser}
                                                loginUrl={AUTH_URL_LOGIN}
                                                logoutUrl={AUTH_URL_LOGOUT}
                                                signInTooltipText={locale.authentication.signInText}
                                                signOutTooltipText={isAuthorizedUser ? (locale.authentication.signOutText + ' - ' + account.get('name')) : ''}
                                    />
                                </div>
                            }
                        />
                        <MenuDrawer menuItems={menuItems}
                                    drawerOpen={docked || menuDrawerOpen}
                                    docked={docked}
                                    logoImage={locale.global.logo}
                                    logoText={locale.global.title}
                                    toggleDrawer={this.toggleDrawer} />

                        <div className="content-container" style={container}>
                            <Switch>
                                <Route path="/" exact component={isAuthorizedUser ? Dashboard : Browse} />
                                <Route path="/claim-publication-form" component={ClaimPublicationForm} />
                                {menuItems.map((route, index) => (
                                    <Route key={index} {...route} />
                                ))}
                            </Switch>
                            {!account ? (
                                <Alert
                                    title={locale.pages.app.alerts.notLoggedInTitle}
                                    message={locale.pages.app.alerts.notLoggedInMessage}
                                    type={locale.pages.app.alerts.notLoggedInType}
                                    outsideLayout />
                            ) : (
                                !authorDetails && (
                                    <Alert
                                        title={locale.pages.app.alerts.notAuthorTitle}
                                        message={locale.pages.app.alerts.notAuthorMessage}
                                        type={locale.pages.app.alerts.notAuthorType}
                                        outsideLayout />
                                ))}
                        </div>
                        <HelpDrawer />
                    </div>
                )}
            </div>
        );
    }
}
