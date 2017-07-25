/**
 * Created by uqvasai on 21/07/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PartialDateForm from './PartialDateForm';

require('datejs');

export default class PartialDate extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        dateFormat: PropTypes.string,
        allowPartial: PropTypes.bool
    };

    static defaultProps = {
        dateFormat: 'yyyy-MM-dd',
        allowPartial: false
    };

    constructor(props) {
        console.log(props);
        super(props);
        this.errors = {};
    }

    state = {
        day: null,
        month: null,
        year: null,
        formattedDate: ''
    };

    componentWillUpdate(nextProps, nextState) {
        console.log(this.validateDate(nextState));
        if (this.validateDate(nextState)) {
            nextState.formattedDate = Date.today().set(nextState).toString(this.props.dateFormat);
        }
        if (this.props.onChange) this.props.onChange(nextState);
    }

    validateDate(state) {
        if (this.props.allowPartial) {
            this.errors.year = (isNaN(state.year) || state.year > (new Date()).getFullYear()) ? true : undefined;
            return !(this.errors.year);
        } else {
            this.errors.day = isNaN(state.day) ? true : undefined;
            this.errors.year = isNaN(state.year) ? true : undefined;
            this.errors.month = state.month === -1 ? true : undefined;
            return !(this.errors.day || this.errors.year || this.errors.month);
        }
    }

    constructDate = (date) => {
        this.setState({
            ...this.state,
            ...date
        });
    };

    render() {
        return (
            <PartialDateForm onDateSelected={ this.constructDate } errors={ this.errors } />
        );
    }
}
