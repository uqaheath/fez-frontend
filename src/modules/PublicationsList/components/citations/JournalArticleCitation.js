import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

export default class JournalArticleCitation extends Component {

    static propTypes = {
        publication: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        // TODO: think! is that really necessary? why can't we just use search keys?
        const journalArticle = {
            id: this.props.publication.rek_pid,
            title: this.props.publication.rek_title,
            publisher: this.props.publication.fez_record_search_key_publisher ?
                this.props.publication.fez_record_search_key_publisher.rek_publisher : null,
            journalName: this.props.publication.fez_record_search_key_journal_name ?
                this.props.publication.fez_record_search_key_journal_name.rek_journal_name : null,
            authors: this.props.publication.fez_record_search_key_author,
            volumeNumber: this.props.publication.fez_record_search_key_volume_number ?
                this.props.publication.fez_record_search_key_volume_number.rek_volume_number : null,
            issueNumber: this.props.publication.fez_record_search_key_issue_number ?
                this.props.publication.fez_record_search_key_issue_number.rek_issue_number : null,
            startPage: this.props.publication.fez_record_search_key_start_page ?
                this.props.publication.fez_record_search_key_start_page.rek_start_page : null,
            endPage: this.props.publication.fez_record_search_key_end_page ?
                this.props.publication.fez_record_search_key_end_page.rek_end_page : null,
            doi: this.props.publication.fez_record_search_key_doi ?
                this.props.publication.fez_record_search_key_doi.rek_doi : null
        };
        const authors = journalArticle.authors ? journalArticle.authors.map((author, index) => {
            return (<span className="citationAuthor" key={index}> {author.rek_author}</span>);
        }) : null;
        return (
            <div className="citationContent citationJournalArticle">
                <FontIcon className="material-icons citationIcon" data-place="left">
                    format_quote
                </FontIcon>

                <span className="citationAuthors">{authors} </span>
                <span className="citationPublisher">({journalArticle.publisher}) </span>
                <span className="citationTitle">{journalArticle.title}. </span>
                {
                    journalArticle.journalName &&
                    <span className="citationJournalName"> {journalArticle.journalName}, </span>
                }
                {
                    journalArticle.volumeNumber &&
                    <span className="citationVolumeNumber"> {journalArticle.volumeNumber}: </span>
                }
                {
                    journalArticle.issueNumber &&
                    <span className="citationIssueNumber"> {journalArticle.issueNumber}: </span>
                }
                {
                    journalArticle.startPage &&
                    <span className="citationStartPage"> {journalArticle.startPage} - </span>
                }
                {
                    journalArticle.endPage &&
                    <span className="citationEndPage"> {journalArticle.endPage}. </span>
                }
                {
                    journalArticle.doi &&
                    <span className="citationDOI">
                        <span className="citationLabel"> doi: </span>
                        <span className="citationValue"> {journalArticle.doi} </span>
                    </span>
                }
            </div>
        );
    }
}
