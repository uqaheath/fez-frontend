import React from 'react';

import {locale} from 'config';
import AddRecordStepper from './AddRecordStepper';
import AddRecordStepContent from './AddRecordStepContent';

import stepper from '../providers/stepper';
import publicationsearch from '../providers/publicationsearch';

export default class AddRecord extends React.Component {
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
