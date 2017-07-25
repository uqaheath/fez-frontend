import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class PartialDateForm extends Component {

    static propTypes = {
        locale: PropTypes.object,
        onDateSelected: PropTypes.func,
        errors: PropTypes.object
    };

    static defaultProps = {
        locale: {
            dayLabel: 'Day',
            monthLabel: 'Month',
            yearLabel: 'Year',
            validateMessage: 'Invalid date'
        }
    };

    constructor(props) {
        super(props);
    }

    state = {
        day: null,
        month: null,
        year: null
    };

    _onDayChanged = (event) => {
        const value = parseInt(event.target.value, 10);
        this.setState({
            day: value
        });
        this.props.onDateSelected({ day: value});
    };

    _onMonthChanged = (event, index, value) => {
        const val = parseInt(value, 10);
        this.setState({
            month: val
        });
        this.props.onDateSelected({ month: val});
    };

    _onYearChanged = (event) => {
        const value = parseInt(event.target.value, 10);
        this.setState({
            year: value
        });
        this.props.onDateSelected({ year: value});
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
                            errorText={ this.props.errors.day ? locale.validateMessage : '' }
                            onBlur={ this._onDayChanged }
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
                            errorText={ this.props.errors.month ? locale.validateMessage : '' }
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
                            errorText={ this.props.errors.year ? locale.validateMessage : '' }
                            onBlur={ this._onYearChanged }
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default PartialDateForm;
