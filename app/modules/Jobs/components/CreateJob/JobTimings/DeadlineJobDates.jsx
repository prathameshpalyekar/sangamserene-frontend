import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field } from 'redux-form/immutable'

import Label from 'components/ReduxForm/Label.jsx';
import Whiteboard from 'components/ui/Whiteboard';

import DeadlineJobDateField from './DeadlineJobDateField.jsx';

class DeadlineJobDates extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps (newProps) {
        const { fields } = newProps;

        if (fields.length > 1) {
            Array(fields.length - 1).fill().map(() => fields.pop());
        } else if (!fields.length){
            fields.push({});
        }
    }

    render () {
        const { fields } = this.props;

        return (
            <div>
                {(fields || []).map((date, index) => {
                    return <Field name={`dates[${index}]`} component={DeadlineJobDateField} key={index} index={index}/>
                })}
            </div>
        );
    }
}

export default DeadlineJobDates;
