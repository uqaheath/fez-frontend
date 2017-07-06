/**
 * Created by uqvasai on 29/06/2017.
 */
import React from 'react';
import {locale} from 'config';
import PropTypes from 'prop-types';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import '../sass/stepper.scss';
import provide from 'react-redux-provide';

export const steps = locale.pages.addRecord.stepper.steps;

@provide
export default class AddRecordStepper extends React.Component {
    static propTypes = {
        currentIndex: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Stepper">
                <Stepper activeStep={this.props.currentIndex} style={{padding: '0', margin: '-10px auto'}}>
                    {
                        steps.map((step, key) =>
                            <Step key={key}>
                                <StepLabel style={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden'
                                }}>{step.label}</StepLabel>
                            </Step>
                        )
                    }
                </Stepper>
            </div>
        );
    }
}
