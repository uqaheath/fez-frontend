import React, {Component} from 'react';
import {Field} from 'redux-form/immutable';
import PropTypes from 'prop-types';
import {TextField, StandardCard} from 'uqlibrary-react-toolbox';
import RaisedButton from 'material-ui/RaisedButton';
import {locale} from 'config';

export default class PublicationSearchForm extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string.isRequired,
        pristine: PropTypes.bool,
        handleSubmit: PropTypes.func,
        onSearchSubmit: PropTypes.func,
        formValues: PropTypes.object,
        help: PropTypes.object,
        searchTitleField: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    performSearch = (event) => {
        // workaround: if user clicks Enter on search field OR search button, search is initiated and form is submitted
        if (event && event.key && event.key !== 'Enter') {
            return;
        }

        const { formValues } = this.props;
        const fieldValue = formValues.get('publicationSearchText');

        this.props.onSearchSubmit(fieldValue);
    };

    render() {
        const {pristine, handleSubmit, title, help, explanationText} = this.props;
        const searchForPublicationInformation = locale.pages.addRecord.searchForPublication;

        return (
            <form ref="publicationSearchForm" onSubmit={handleSubmit}>
                <StandardCard title={title} help={help}>
                    <div>{explanationText}</div>
                    <div className="columns is-gapless is-mobile">
                        <div className="column">
                            <Field component={TextField}
                                   name="publicationSearchText"
                                   fullWidth
                                   floatingLabelText={searchForPublicationInformation.defaultSearchFieldLabel}
                                   autoComplete="off"
                                   autoFocus
                                   onKeyPress={this.performSearch}
                            />
                        </div>
                        <div className="column is-narrow is-helpicon">
                            <RaisedButton
                                label={searchForPublicationInformation.defaultButtonLabel}
                                secondary
                                onTouchTap={this.performSearch}
                                disabled={pristine}
                                type="submit"
                            />
                        </div>
                    </div>
                </StandardCard>
            </form>
        );
    }
}
