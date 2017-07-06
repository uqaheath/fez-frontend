import React from 'react';
import {locale} from 'config';
import AddRecordStepper from '../../components/AddRecordStepper';
// import AddRecordStepContentContainer from '../../containers/AddRecordStepContentContainer';
import AddRecordStepContent from '../../components/AddRecordStepContent';

export default class AddRecord extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout-fill">
                <h1 className="page-title display-1">{ locale.pages.addRecord.title }</h1>
                <AddRecordStepper />
                <AddRecordStepContent />
            </div>
        );
    }
}
