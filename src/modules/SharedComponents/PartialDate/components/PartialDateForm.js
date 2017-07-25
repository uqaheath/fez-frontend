import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const moment = require('moment');
class PartialDateForm extends Component {
    static propTypes = {
        locale: PropTypes.object,
        onDateSelected: PropTypes.func,
        allowPartial: PropTypes.bool,
        resetDate: PropTypes.func
    };

    static defaultProps = {
        locale: {
            dayLabel: 'Day',
            monthLabel: 'Month',
            yearLabel: 'Year',
            validateMessage: 'Invalid date'
        },
        allowPartial: false
    };

    constructor(props) {
        super(props);
        this.state = {
            day: null,
            month: null,
            year: null
        };
        this.errors = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    componentWillUpdate(nextProps, nextState) {
        if (this._validate(nextState)) {
            this.props.onDateSelected(nextState);
        } else {
            this.props.resetDate();
        }
    }

    _validate = (state) => {
        this.errors.year = (state.year > 0 && moment(state).isAfter(new Date(), 'year')) || isNaN(state.year);
        this.errors.month = state.month < 0;

        if (this.props.allowPartial) {
            this.errors.day = state.day && ! moment(state).isValid();
        } else {
            this.errors.day = isNaN(state.day) || state.day < 1;
            this.errors.day = !(this.errors.day || this.errors.month || this.errors.year) ? ! moment(state).isValid() : this.errors.day;
        }

        return !(this.errors.year || this.errors.month || this.errors.day);
    };

    _onDayChanged = (event) => {
        this.setState({ day: parseInt(event.target.value, 10) });
    };

    _onMonthChanged = (event, index, value) => {
        this.setState({ month: parseInt(value, 10) });
    };

    _onYearChanged = (event) => {
        this.setState({ year: parseInt(event.target.value, 10) });
    };

    render() {
        const { locale } = this.props;
        return (
            <div className="column">
                <div className="columns">
                    <div className="column">
                        <TextField
                            name="day"
                            type="number"
                            maxLength="2"
                            style={{ marginTop: '12px' }}
                            fullWidth
                            floatingLabelText={ locale.dayLabel }
                            floatingLabelFixed
                            errorText={ this.errors.day ? locale.validateMessage : '' }
                            onChange={ this._onDayChanged }
                            onBlur={ !this.props.allowPartial ? this._onDayChanged : undefined }
                        />
                    </div>
                    <div className="form-spacer"/>
                    <div className="column">
                        <SelectField
                            name="month"
                            fullWidth
                            value={ this.state.month }
                            style={{ marginTop: '12px' }}
                            floatingLabelText={ locale.monthLabel }
                            floatingLabelFixed
                            errorText={ this.errors.month ? locale.validateMessage : '' }
                            onChange={ this._onMonthChanged }>
                            <MenuItem key={-1} value={-1} primaryText=""/>
                            <MenuItem key={0} value={0} primaryText="January"/>
                            <MenuItem key={1} value={1} primaryText="February"/>
                            <MenuItem key={2} value={2} primaryText="March"/>
                            <MenuItem key={3} value={3} primaryText="April"/>
                            <MenuItem key={4} value={4} primaryText="May"/>
                            <MenuItem key={5} value={5} primaryText="June"/>
                            <MenuItem key={6} value={6} primaryText="July"/>
                            <MenuItem key={7} value={7} primaryText="August"/>
                            <MenuItem key={8} value={8} primaryText="September"/>
                            <MenuItem key={9} value={9} primaryText="October"/>
                            <MenuItem key={10} value={10} primaryText="November"/>
                            <MenuItem key={11} value={11} primaryText="December"/>
                        </SelectField>
                    </div>
                    <div className="form-spacer"/>
                    <div className="column">
                        <TextField
                            name="year"
                            type="number"
                            fullWidth
                            style={{ marginTop: '12px' }}
                            maxLength="4"
                            floatingLabelText={ locale.yearLabel }
                            floatingLabelFixed
                            errorText={ this.errors.year ? locale.validateMessage : '' }
                            onBlur={ this._onYearChanged }
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default PartialDateForm;
