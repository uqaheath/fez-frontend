import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {publicationYearsBig as publicationYearsMockData} from '../../../mock/data/academic/publicationYears';
import{Shortcuts} from '../../../modules/Shortcuts';

import {AuthorsPublicationsPerYearChart} from 'uqlibrary-react-toolbox';
import './Dashboard.scss';

class Dashboard extends React.Component {
    static propTypes = {
        account: PropTypes.object.isRequired
    };

    componentDidMount() {
        // fetch data to display here
    }

    render() {
        const {
            account
        } = this.props;

        return (
            <div className="layout-fill">
                <div className="layout-card">
                    <div className="image-cover">
                        <div className="user-information" style={{color: '#FFF'}}>
                            <span className="display-1">{account.get('title')} {account.get('name')}</span><br />
                            <span className="subhead">{account.get('fullTitle')}</span><br />
                            <span className="body-1">{account.get('school')}</span>
                        </div>
                    </div>
                    <div className="time-display-wrap" />
                </div>

                <Card className="layout-card">
                    <CardHeader className="card-header">
                        <div className="columns is-gapless">

                            <div className="column">
                                <h2 className="headline">eSpace publications by year</h2>
                            </div>

                        </div>
                    </CardHeader>

                    <CardText className="body-1">
                        <br />
                        <div>
                            <AuthorsPublicationsPerYearChart rawData={publicationYearsMockData} yAxisTitle="Total publications"/>
                        </div>

                        <div>
                            <Shortcuts name="'TODO_ITEM" handler={this._handleShortcuts} />
                        </div>
                    </CardText>

                </Card>
            </div>
        );
    }
}

export default Dashboard;
