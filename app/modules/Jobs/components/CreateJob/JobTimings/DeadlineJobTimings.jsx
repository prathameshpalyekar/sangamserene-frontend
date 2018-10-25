import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field, FieldArray } from 'redux-form/immutable'

import { Input } from 'components/ReduxForm/Fields';
import Label from 'components/ReduxForm/Label.jsx';
import Whiteboard from 'components/ui/Whiteboard';

import DeadlineJobDates from './DeadlineJobDates.jsx';

class DeadlineJobTimings extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="create-job-section">
                <div className="well well-sm well-note text-center">
                    <p>Jobb med deadline innebär att jobbet ska ske under en viss tidsperiod, till en viss deadline. Instajobbaren  planerar sin tid på egen hand och tidrapporterar löpande.</p>
                </div>
                <Whiteboard.SubTitle>Tidsperiod</Whiteboard.SubTitle>
                <FieldArray name="dates" component={DeadlineJobDates} />
                <Field name="numberOfHours" component={Input} type="number" label="Hur många timmar uppskattar du att jobbet tar att utföra?" placeholder="Skriv in antal timmar" step={1} min={1} parse={(value) => value ? parseInt(value, 10) : value}/>
            </div>
        );
    }
}

export default DeadlineJobTimings;
