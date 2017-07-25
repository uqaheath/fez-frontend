/**
 * Created by uqvasai on 21/07/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PartialDateForm from './PartialDateForm';

const moment = require('moment');

export default class PartialDate extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        dateFormat: PropTypes.string,
        allowPartial: PropTypes.bool
    };

    static defaultProps = {
        dateFormat: 'YYYY-MM-DD',
        allowPartial: false
    };

    constructor(props) {
        super(props);

        this.state = { date: '' };
    }

    componentWillUpdate(nextProps, nextState) {
        // notify parent component when local state has been updated, eg contributors added/removed/reordered
        if (this.props.onChange) this.props.onChange(nextState.date);
    }

    _setDate = (date) => {
        const { dateFormat } = this.props;

        if (this.props.allowPartial || date.year !== null) {
            this.setState({ date: this._formattedDate(date, dateFormat) });
        }
    };

    _formattedDate = (date, dateFormat) => {
        return moment(date).format(dateFormat);
    };

    reset = () => {
        this.setState({ date: '' });
    };

    render() {
        return (
            <PartialDateForm onDateSelected={ this._setDate } allowPartial={ this.props.allowPartial } resetDate={ this.reset } />
        );
    }
}
