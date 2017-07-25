/**
 * Created by uqvasai on 21/07/2017.
 */
import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { Field } from 'redux-form';
import { StandardCard } from 'uqlibrary-react-toolbox';
import PartialDateField from './PartialDateField';

const SampleForm = () => {
    return(
        <form>
            <StandardCard title="allowedPartial: true, dateFormat:'YYYY-MM-DD'">
                <Field name="startDate" component={ PartialDateField } dateFormat="YYYY-MM-DD" allowPartial />
            </StandardCard>
            <StandardCard title="allowedPartial: false, dateFormat:'DD/MM/YYYY'">
                <Field name="endDate" component={ PartialDateField } dateFormat="DD/MM/YYYY"/>
            </StandardCard>
        </form>
    );
};

const SampleReduxForm = reduxForm({
    form: 'SampleForm'
})(SampleForm);

const mapStateToProps = (state) => {
    return {
        formValues: getFormValues('SampleForm')(state) || Immutable.Map({})
    };
};

export default connect(mapStateToProps)(SampleReduxForm);
