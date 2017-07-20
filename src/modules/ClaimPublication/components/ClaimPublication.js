import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Immutable from 'immutable';

// forms & custom components
import ClaimPublicationSearchResults from '../containers/ClaimPublicationSearchResults';
import {NoMatchingRecords} from 'modules/NoMatchingRecords';
import {locale} from 'config';
import {showDialogBox} from 'modules/App';

import './ClaimPublication.scss';

export default class ClaimPublication extends React.Component {

    static propTypes = {
        account: PropTypes.object,
        claimPublicationResults: PropTypes.array,
        clearSearchResults: PropTypes.func,
        dispatch: PropTypes.func,
        loadingSearch: PropTypes.bool,
        loadUsersPublications: PropTypes.func,
        markPublicationsNotMine: PropTypes.func
    };

    static defaultProps = {
        searchResultsList: null
    };

    constructor(props) {
        super(props);

        this.props.clearSearchResults();
    }

    extractResultSet = () => {
        const {claimPublicationResults} = this.props;
        const claimPublicationsInformation = locale.pages.claimPublications;
        let resultSet = {};

        // limit the number of results
        if (claimPublicationResults.length > 0) {
            resultSet = Immutable.fromJS(claimPublicationResults);

            if (resultSet.length > claimPublicationsInformation.maxSearchResults) {
                resultSet = resultSet.slice(0, claimPublicationsInformation.maxSearchResults);
            }
        }

        return resultSet;
    };

    confirmMarkPublicationsNotMine = () => {
        const dialogConfig = locale.pages.claimPublications.claimPublicationResults.dialog.markNotMine;
        const combinedConfig = Object.assign({}, dialogConfig, {primaryHandleFn: this.markPublicationsNotMine});
        this.props.dispatch(showDialogBox(combinedConfig));
    };

    markPublicationsNotMine = () => {
        const {account, markPublicationsNotMine} = this.props;
        const resultSet = this.extractResultSet();

        // retrieve the publication ids
        const pids = resultSet.map(result => {
            return {pid: result.get('rek_pid')};
        });

        markPublicationsNotMine(account.get('id'), pids.toJS());
    };

    render() {
        const claimPublicationsInformation = locale.pages.claimPublications;
        const resultsInformation = claimPublicationsInformation.claimPublicationResults;
        const noRecordsInformation = resultsInformation.noMatchingPublications;
        const noMatchingRecordsInformation = locale.pages.addRecord.noMatchingRecords;
        const {
            account,
            claimPublicationResults,
            loadingSearch
        } = this.props;

        const resultSet = this.extractResultSet();
        const noOfResults = claimPublicationResults.length;

        const resultsCountText = `${resultSet.length} out of ${noOfResults} potential match(es) displayed. Select any item to claim it as your work.`;
        return (
            <div className="layout-fill">
                <h1 className="page-title display-1">{claimPublicationsInformation.title}</h1>

                <ClaimPublicationSearchResults
                    title={resultsInformation.title}
                    explanationText={resultsCountText}
                    claimRecordBtnLabel={resultsInformation.claimRecordBtnLabel}
                    help={resultsInformation.help}
                />

                {!loadingSearch && noOfResults > 0 &&
                    <div className="layout-card">
                        <div className="columns">
                            <div className="column is-hidden-mobile" />
                            <div className="column is-narrow-desktop is-12-mobile is-pulled-right">
                                <RaisedButton
                                    label={claimPublicationsInformation.formButtons.notMineLabel}
                                    secondary
                                    fullWidth
                                    onTouchTap={this.confirmMarkPublicationsNotMine}
                                />
                            </div>
                        </div>
                    </div>
                }

                {!loadingSearch && noOfResults === 0 &&
                    <NoMatchingRecords
                        title={noRecordsInformation.title}
                        explanationText={noRecordsInformation.explanationText.replace('[username]', account.get('id'))}
                        help={noMatchingRecordsInformation.help}
                    />
                }
            </div>
        );
    }
}

