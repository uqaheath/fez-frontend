import React from 'react';
import PartialDate from './components/PartialDate';

export default function PartialDateField(fieldProps) {
    return(<PartialDate onChange={ fieldProps.input.onChange } {...fieldProps} />);
}
