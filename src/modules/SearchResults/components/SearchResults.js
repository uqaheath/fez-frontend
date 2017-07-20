import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';

import { StandardCard, InlineLoader } from 'uqlibrary-react-toolbox';
import SearchResultsRow from './SearchResultsRow';
// import { locale } from '../../../config';

class SearchResults extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string.isRequired,
        claimRecordBtnLabel: PropTypes.string,
        searchResultsList: PropTypes.array,
        help: PropTypes.object,
        performSearch: PropTypes.func,
        loadingSearch: PropTypes.bool,
        loadingMoreSearch: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /**
         * Make an API call to load search result
         */
        this.props.performSearch();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchResultsList: nextProps.searchResultsList
        });
    }

    componentWillUnmount() {
        this.setState({
            searchResultsList: []
        });
    }

    render() {
        const { searchResultsList, help, title} = this.props;
        const searchResultEntries = searchResultsList.map((source, index) => {
            const entry = {
                index,
                id: source.rek_pid,
                title: source.rek_title,
                journalName: source.fez_record_search_key_journal_name ? source.fez_record_search_key_journal_name.rek_journal_name : null,
                authors: source.fez_record_search_key_author,
                publisher: source.fez_record_search_key_publisher ? source.fez_record_search_key_publisher.rek_publisher : null,
                volumeNumber: source.fez_record_search_key_volume_number ? source.fez_record_search_key_volume_number.rek_volume_number : null,
                issueNumber: source.fez_record_search_key_issue_number ? source.fez_record_search_key_issue_number.rek_issue_number : null,
                startPage: source.fez_record_search_key_start_page ? source.fez_record_search_key_start_page.rek_start_page : null,
                endPage: source.fez_record_search_key_end_page ? source.fez_record_search_key_end_page.rek_end_page : null,
                doi: source.fez_record_search_key_doi ? source.fez_record_search_key_doi.rek_doi : null,
                counts: {
                    thomson: source.rek_thomson_citation_count ? source.rek_thomson_citation_count : null
                }
            };

            return (
                <SearchResultsRow key={index} entry={entry} claimRecordBtnLabel={this.props.claimRecordBtnLabel} />
            );
        });

        // const noMatchingRecordsInformation = locale.pages.addRecord.noMatchingRecords;

        return (
            <StandardCard title={title} help={help}>
                {
                    this.props.loadingSearch &&
                    <div className="is-centered">
                        <InlineLoader message="Searching for your publications..." />
                    </div>
                }
                <div>
                    {this.props.explanationText.replace('[noOfResults]', this.props.searchResultsList.length)}
                </div>

                {searchResultEntries}

                {
                    /*
                    !this.props.loadingSearch &&
                    this.props.searchResultsList.length === 0 &&
                    <NoMatchingRecords
                        title={noMatchingRecordsInformation.title}
                        explanationText={noMatchingRecordsInformation.explanationText}
                        searchAgainBtnLabel={noMatchingRecordsInformation.searchAgainBtnLabel}
                        addPublicationBtnLabel={noMatchingRecordsInformation.addPublicationBtnLabel}
                        help={noMatchingRecordsInformation.help}
                    />
                    */
                }
            </StandardCard>
        );
    }
}

export default reduxForm({
    form: 'SearchResultsForm'
})(SearchResults);
