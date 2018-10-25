import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BaseField from './BaseField.jsx';
import Row from './Row.jsx';
import Label from '../Label.jsx';

class RadioButtonGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { btnLayout, label, options, input: { value, onChange } } = this.props;

        const controls = options.map((radio, key) => {
            const disabled = radio.disabled;
            const btnClassName = `btn btn-filled ${value === radio.value ? 'btn-primary' : 'btn-muted'}`;

            if (btnLayout === 'inline') {
                return (
                    <div className="btn-group" role="group" key={key}>
                        <button type="button" className={btnClassName} onClick={disabled ? undefined : () => onChange(radio.value)} role="button">{radio.label}</button>
                    </div>
                );
            }

            return (
                <button type="button" className={btnClassName} onClick={disabled ? undefined : () => this.changeRadio(radio.value)} role="button" key={key}>{radio.label}</button>
            );
        });

        if (btnLayout === 'inline') {
            return (
                <Row>
                    { label ? <Label {...this.props}>{label}</Label> : null }
                    <div className="btn-group btn-group-justified" role="group">
                        {controls}
                    </div>
                </Row>
            );
        }

        return (
            <Row>
                <Label {...this.props} />
                <div className="btn-group-vertical" role="group">
                    {controls}
                </div>
            </Row>
        );
    }
}

export default RadioButtonGroup;
