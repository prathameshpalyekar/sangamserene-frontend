import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Field } from 'redux-form/immutable'

import Whiteboard from 'components/ui/Whiteboard';

import NormalJobDateTimeField from './NormalJobDateTimeField.jsx';

import './TimerBox.less';

class NormalJobTimings extends Component {
    constructor(props) {
        super(props);

        this.addJobDate = this.addJobDate.bind(this);
        this.removeJobDate = this.removeJobDate.bind(this);
    }

    componentWillMount () {
        const { fields } = this.props;

        if (fields.length === 0) {
            fields.push({});
        }
    }

    addJobDate() {
        const { fields } = this.props;
        fields.push({});
    }

    removeJobDate (index) {
        const { fields } = this.props;
        fields.remove(index);
    }

    renderDateTimeFields () {
        const { fields } = this.props;

        return (
            <div>
                {(fields || []).map((date, index) => {
                    return <Field name={`dates[${index}]`} component={NormalJobDateTimeField} key={index} index={index} totalDates={fields.length} onRemove={this.removeJobDate} />
                })}
            </div>
        );
    }

    render () {
        const { fields  } = this.props;

        return (
            <div>
                <div className="create-job-section">
                    <div className="well well-sm well-note text-center">
                        <p>Jobb med pass innebär att jobbet består av ett eller fler (max fem) arbetspass.</p>
                    </div>
                </div>
                {this.renderDateTimeFields()}
                {
                    !fields || fields.length < 5 ?
                        <Whiteboard.Stubs separatorTop={true}>
                            <div className="text-center">
                                <a onClick={this.addJobDate} className="btn btn-filled btn-primary -btn">Lägg till ett pass</a>
                            </div>
                        </Whiteboard.Stubs>
                        :
                        null
                }
            </div>
        );
    }
}



export default NormalJobTimings;
