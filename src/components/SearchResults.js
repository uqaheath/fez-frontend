import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { reduxForm } from 'redux-form/immutable';
import { HelpIcon } from 'uqlibrary-react-toolbox';
import PropTypes from 'prop-types';
import provide from 'react-redux-provide';
import SearchResultsRow from './SearchResultsRow';
import './ClaimPublication.scss';

@provide
class SearchResults extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string.isRequired,
        claimRecordBtnLabel: PropTypes.string,
        publicationSearchResult: PropTypes.object.isRequired,
        help: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    setExplanationText = () => {
        return this.props.explanationText.replace('[noOfResults]', this.props.publicationSearchResult.size);
    };

    render() {
        const {publicationSearchResult, help, title} = this.props;
        const searchResultEntries = publicationSearchResult.map((source, i) => {
            const entry = {
                title: source.get('rek_title'),
                journalName: source.get('fez_record_search_key_journal_name').get('rek_journal_name'),
                authors: source.get('fez_record_search_key_author'),
                counts: {
                    thomson: source.get('rek_thomson_citation_count'),
                    scopus: source.get('rek_scopus_citation_count'),
                    google: 0,
                    altmetric: 0,
                    downloads: 0
                }
            };
            return (
                <SearchResultsRow key={i} entry={entry} claimRecordBtnLabel={this.props.claimRecordBtnLabel} />
            );
        });

        return (
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
                    <div>{this.setExplanationText()}</div>
                    {searchResultEntries}
                </CardText>
            </Card>
        );
    }
}

export default reduxForm({
    form: 'SearchResultsForm'
})(SearchResults);
