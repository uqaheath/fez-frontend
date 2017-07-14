import React from 'react';
import PropTypes from 'prop-types';

import {locale} from 'config';
import AddRecordStepper from './AddRecordStepper';
import AddRecordStepContent from './AddRecordStepContent';

import stepper from '../providers/stepper';
import publicationsearch from '../providers/publicationsearch';

import provide from 'react-redux-provide';

@provide
export default class AddRecord extends React.Component {
    static propTypes = {
        toggleDrawer: PropTypes.func
    };

    componentDidMount() {
        this.props.toggleDrawer(false);
    }

    render() {
        return (
            <div className="layout-fill">
                <h1 className="page-title display-1">{ locale.pages.addRecord.title }</h1>
                <AddRecordStepper providers={{ stepper }} />
                <AddRecordStepContent providers={{ stepper, publicationsearch }} />
            </div>
        );
    }
}
