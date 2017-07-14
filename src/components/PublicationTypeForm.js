import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Field} from 'redux-form/immutable';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import SelectField from './SelectField';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import {HelpIcon} from 'uqlibrary-react-toolbox';
import provide from 'react-redux-provide';

@provide
class PublicationTypeForm extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string,
        pristine: PropTypes.bool,
        handleSubmit: PropTypes.func,
        loadSelectedPublicationType: PropTypes.func,
        children: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object
        ]),
        maxSearchResults: PropTypes.number,
        publicationTypeLabel: PropTypes.string,
        help: PropTypes.object,
        clearSelectedPublicationType: PropTypes.func,
        loadPublicationTypesList: PropTypes.func,
        publicationTypeList: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPublicationTypesList();
        // TODO: find a better alternative to set focus to elements
        const selectField = document.querySelectorAll('.selectField button');
        if (selectField.length > 0) {
            selectField[0].focus();
        }
    }

    componentWillUnmount() {
        this.props.clearSelectedPublicationType();
    }

    render() {
        const {
            handleSubmit,
            loadSelectedPublicationType,
            title,
            help,
            children,
            publicationTypeLabel
        } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit}>
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
                            <div className="columns">
                                <div className="column">
                                    <Field component={SelectField}
                                           name="publicationType"
                                           fullWidth
                                           floatingLabelText={publicationTypeLabel}
                                           onChange={loadSelectedPublicationType}>
                                        {
                                            this.props.publicationTypeList.map((item, index) => (item.id !== 0 ? <MenuItem key={index} value={item.id} primaryText={item.name}/> :
                                                    <Divider key="-1"/>
                                            ))
                                        }
                                    </Field>
                                </div>
                            </div>
                        </CardText>
                    </Card>
                    {children}
                </form>
            </div>
        );
    }
}
export default reduxForm({
    form: 'PublicationTypeForm'
})(PublicationTypeForm);
