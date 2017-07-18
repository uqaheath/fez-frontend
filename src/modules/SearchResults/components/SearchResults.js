import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { locale } from '../../../config';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HelpIcon, InlineLoader } from 'uqlibrary-react-toolbox';
import SearchResultsRow from '../containers/SearchResultsRow';
import { NoMatchingRecords } from '../../NoMatchingRecords';

export default class SearchResults extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string.isRequired,
        claimRecordBtnLabel: PropTypes.string,
        dataSource: PropTypes.array,
        help: PropTypes.object,
        performSearch: PropTypes.func,
        searchText: PropTypes.string,
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
        this.props.performSearch(this.props.searchText);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource
        });
    }

    componentWillUnmount() {
        this.setState({
            dataSource: []
        });
    }

    render() {
        const { dataSource, help, title} = this.props;
        const searchResultEntries = dataSource.map((source, index) => {
            const entry = {
                index,
                id: source.rek_pid,
                title: source.rek_title,
                journalName: source.fez_record_search_key_journal_name ? source.fez_record_search_key_journal_name.rek_journal_name : null,
                authors: source.fez_record_search_key_author,
                publisher: source.fez_record_search_key_publisher.rek_publisher,
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

        const noMatchingRecordsInformation = locale.pages.addRecord.noMatchingRecords;

        return (
            <div>
                {
                    this.props.loadingSearch &&
                    <div className="is-centered">
                        <InlineLoader message="Searching for your publications..." />
                    </div>
                }

                {
                    !this.props.loadingSearch &&
                    <Card className="layout-card">
                        <CardHeader className="card-header">
                            <div className="columns is-gapless is-mobile">
                                <div className="column">
                                    <h2 className="title">{title}</h2>
                                </div>
                                <div className="column is-narrow is-helpicon">
                                    {help && (
                                        <HelpIcon
                                            title={help.title}
                                            text={help.text}
                                            buttonLabel={help.buttonLabel}
                                        />
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardText className="body-1">
                            <div>
                                {this.props.explanationText.replace('[noOfResults]', this.props.dataSource.length)}
                            </div>
                            { searchResultEntries }
                        </CardText>
                        {
                            this.props.loadingMoreSearch &&
                            <div className="is-centered">
                                <InlineLoader message="Searching more publications..." />
                            </div>
                        }
                    </Card>
                }

                {
                    !this.props.loadingSearch &&
                    this.props.dataSource.size === 0 &&
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
    }
}
