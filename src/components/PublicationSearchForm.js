import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Field} from 'redux-form/immutable';
import { validate } from '../providers/validator';
import { reduxForm } from 'redux-form/immutable';
import { HelpIcon, TextField } from 'uqlibrary-react-toolbox';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import provide from 'react-redux-provide';
import '../sass/PublicationSearchForm.scss';

@provide
class PublicationSearchForm extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string.isRequired,
        defaultSearchFieldLabel: PropTypes.string,
        buttonLabel: PropTypes.string,
        pristine: PropTypes.bool,
        invalid: PropTypes.bool,
        handleSubmit: PropTypes.func,
        formValues: PropTypes.object,
        help: PropTypes.object,
        updateSearch: PropTypes.func.isRequired,
        performSearch: PropTypes.func.isRequired,
        searchText: PropTypes.string,
        increaseStep: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.props = props;
    }

    checkIfSubmitted = (event) => {
        if (event && event.key && event.key !== 'Enter') return;
        this.props.performSearch(this.props.searchText);
    };

    submitSearch = () => {
        this.props.performSearch(this.props.searchText);
    };

    render() {
        const { pristine, invalid, handleSubmit } = this.props;
        const { title, help, buttonLabel, explanationText, defaultSearchFieldLabel} = this.props;
        const { updateSearch } = this.props;

        return (
            <form ref="publicationSearchForm" onSubmit={ handleSubmit(this.props.increaseStep) }>
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
                        <div>{explanationText}</div>
                        <Field component={TextField}
                               name="search"
                               fullWidth
                               floatingLabelText={ defaultSearchFieldLabel}
                               autoComplete="off"
                               autoFocus
                               onChange={ updateSearch }
                               onKeyPress={ this.checkIfSubmitted }
                        />
                        <div style={{textAlign: 'right', marginTop: '20px'}}>
                            <RaisedButton
                                label={ buttonLabel }
                                secondary
                                onTouchTap={ this.submitSearch }
                                disabled={pristine || invalid}
                                type="submit"
                            />
                        </div>
                    </CardText>
                </Card>
            </form>
        );
    }
}

export default reduxForm({
    form: 'publicationSearchForm',
    validate
})(PublicationSearchForm);
