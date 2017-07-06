import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import provide from 'react-redux-provide';

import { HelpIcon } from 'uqlibrary-react-toolbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { locale } from '../config';

const defaultProps = {
    searchAgainBtnLabel: locale.pages.addRecord.noMatchingRecords.defaultProps.searchAgainBtnLabel,
    addPublicationBtnLabel: locale.pages.addRecord.noMatchingRecords.defaultProps.addPublicationBtnLabel
};

@provide
export default class NoMatchingRecords extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        explanationText: PropTypes.string.isRequired,
        searchAgainBtnLabel: PropTypes.string,
        addPublicationBtnLabel: PropTypes.string,
        increaseStep: PropTypes.func,
        resetStepper: PropTypes.func,
        stepIndex: PropTypes.number,
        help: PropTypes.object
    };

    render() {
        const { title, explanationText, help, searchAgainBtnLabel, addPublicationBtnLabel} = this.props;
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
                    <div>{explanationText}</div>
                    <div style={{textAlign: 'right'}}>
                        <FlatButton
                            label={searchAgainBtnLabel}
                            onTouchTap={this.props.resetStepper}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label={addPublicationBtnLabel}
                            secondary
                            autoFocus
                            keyboardFocused
                            onTouchTap={this.props.increaseStep}
                        />
                    </div>
                </CardText>
            </Card>
        );
    }
}

NoMatchingRecords.defaultProps = defaultProps;
