import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const moment = require('moment');
class PartialDateForm extends Component {
    static propTypes = {
        locale: PropTypes.object,
        onChange: PropTypes.func,
        dateFormat: PropTypes.string,
        allowPartial: PropTypes.bool,
        resetDate: PropTypes.func
    };

    static defaultProps = {
        locale: {
            dayLabel: 'Day',
            monthLabel: 'Month',
            yearLabel: 'Year',
            validateMessage: {
                day: 'Invalid day',
                month: 'Invalid month',
                year: 'Invalid year'
            }
        },
        dateFormat: 'YYYY-MM-DD',
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

    componentWillUpdate(nextProps, nextState) {
        if (this.props.onChange) this.props.onChange(this._setDate(nextState));
    }

    _validate = (state) => {
        let valid;
        const { day, month, year } = state;

        this.errors.year = isNaN(year);

        if (this.props.allowPartial) {
            valid = !isNaN(year) && moment(state).isValid();
            this.errors.month = year > 0 && month < 0;
            this.errors.day = day && year > 0 && month > -1 && !valid;
        } else {
            valid = moment(state).isValid() && !isNaN(day) && day > 0 && !isNaN(year) && year > 0 && month !== null;
            this.errors.month = month < 0;
            this.errors.day = isNaN(day) || ((month !== null || month > -1) && year > 0 && !valid);
        }

        return valid;
    };

    _setDate = (date) => {
        if (this._validate(date)) {
            if (this.props.allowPartial) {
                date.month = date.month < 0 ? 0 : date.month;
            }
            return this._formattedDate(date, this.props.dateFormat);
        }
        return '';
    };

    _formattedDate = (date, dateFormat) => {
        return moment(date).format(dateFormat);
    };

    render() {
        const { locale } = this.props;
        return (
            <div className="column">
                <div className="columns">
                    <div className="column">
                        <TextField
                            name="day"
                            type="text"
                            maxLength="2"
                            style={{ marginTop: '12px' }}
                            fullWidth
                            floatingLabelText={ locale.dayLabel }
                            floatingLabelFixed
                            errorText={ this.errors.day ? locale.validateMessage.day : '' }
                            onKeyPress={ (e) => (e.charCode < 48 || e.charCode > 57 ? e.preventDefault() : undefined) }
                            onChange={ (e, v) => (this.setState({ day: parseInt(v, 10)})) }
                            onBlur={ !this.props.allowPartial ? (e) => (this.setState({ day: parseInt(e.target.value, 10)})) : undefined }
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
                            errorText={ this.errors.month ? locale.validateMessage.month : '' }
                            onChange={ (e, k, v) => (this.setState({ month: v})) }>
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
                            type="text"
                            fullWidth
                            style={{ marginTop: '12px' }}
                            maxLength="4"
                            floatingLabelText={ locale.yearLabel }
                            floatingLabelFixed
                            errorText={ this.errors.year ? locale.validateMessage.year : '' }
                            onKeyPress={ (e) => (e.charCode < 48 || e.charCode > 57 ? e.preventDefault() : undefined) }
                            onChange={ (e, v) => (this.setState({ year: parseInt(v, 10)})) }
                            onBlur={ (e) => (this.setState({ year: parseInt(e.target.value, 10)})) }
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default PartialDateForm;
