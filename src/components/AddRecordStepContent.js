/**
 * Created by uqvasai on 30/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import PublicationSearchForm from '../components/PublicationSearchForm';
import { locale } from '../config';
import { InlineLoader } from 'uqlibrary-react-toolbox';
import SearchResults from '../components/SearchResults';
import NoMatchingRecords from '../components/NoMatchingRecords';
import provide from 'react-redux-provide';

const STEP_1 = 0;
const STEP_2 = 1;
const STEP_3 = 2;

@provide
export default class AddRecordStepContent extends React.Component {
    static propTypes = {
        currentIndex: PropTypes.number.isRequired,
        loadingSearch: PropTypes.bool.isRequired,
        searchText: PropTypes.string.isRequired,
        publicationSearchResult: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    renderContent(index) {
        switch (index) {
            case STEP_1:
                const searchForPublicationInformation = locale.pages.addRecord.searchForPublication;
                return (
                        <PublicationSearchForm
                            title={searchForPublicationInformation.title}
                            explanationText={searchForPublicationInformation.explanationText}
                            defaultSearchFieldLabel={searchForPublicationInformation.defaultSearchFieldLabel}
                            defaultButtonLabel={searchForPublicationInformation.defaultButtonLabel}
                            help={searchForPublicationInformation.help}
                        />
                );
            case STEP_2:
                const searchResultsInformation = locale.pages.addRecord.searchResults;
                const noMatchingRecordsInformation = locale.pages.addRecord.noMatchingRecords;

                // on initial load this will be null
                return (
                    <div>
                        { this.props.loadingSearch &&
                            <div className="is-centered">
                                <InlineLoader message="Loading ..." />
                            </div>
                        }

                        { !this.props.loadingSearch && this.props.publicationSearchResult.size > 0 &&
                            <SearchResults
                                title={searchResultsInformation.title}
                                explanationText={searchResultsInformation.explanationText}
                                claimRecordBtnLabel={searchResultsInformation.claimRecordBtnLabel}
                                help={searchResultsInformation.help}
                            />
                        }

                        { !this.props.loadingSearch &&
                            <NoMatchingRecords
                                title={noMatchingRecordsInformation.title}
                                explanationText={noMatchingRecordsInformation.explanationText}
                                searchAgainBtnLabel={noMatchingRecordsInformation.searchAgainBtnLabel}
                                addPublicationBtnLabel={noMatchingRecordsInformation.addPublicationBtnLabel}
                                help={noMatchingRecordsInformation.help}
                            />
                        }
                    </div>

                );
            case STEP_3:
                return (
                    <div>Step 3</div>
                );
            default:
                return 'Error Message';
        }
    }

    render() {
        return (
            <div style={{width: '100%', maxWidth: '1320px', margin: '0 auto'}}>
                <div style={{margin: '0', overflow: 'hidden'}}>
                    { this.renderContent(this.props.currentIndex) }
                </div>
            </div>
        );
    }
}
