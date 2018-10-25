/*jshint node:true */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

import Row from './row.js';
import Icon from './icon.js';
import BaseFormsyComponent from './mixins/component.js';

class RadioButtonGroup extends BaseFormsyComponent {
    constructor (props) {
        super(props);

        this.changeRadio = this.changeRadio.bind(this);
    }

    changeRadio (value) {
        this.props.setValue(value);
        this.props.onChange && this.props.onChange(this.props.name, value);
    }

    renderElement () {
        const controls = this.props.options.map((radio, key) => {
            let checked = (this.props.getValue() === radio.value);
            let disabled = this.props.isFormDisabled() || radio.disabled || this.props.disabled;
            const btnClassName = `btn btn-filled ${checked ? 'btn-primary' : 'btn-muted'}`;

            if (this.props.type === 'inline') {
                return (
                    <div className="btn-group" role="group" key={key}>
                        <button className={btnClassName} onClick={disabled ? undefined : () => this.changeRadio(radio.value)} role="button">{radio.label}</button>
                    </div>
                );
            }

            return (
                <button className={btnClassName} onClick={disabled ? undefined : () => this.changeRadio(radio.value)} role="button">{radio.label}</button>
            );
        });

        if (this.props.type === 'inline') {
            return (
                <div className="btn-group btn-group-justified" role="group">
                    {controls}
                </div>
            );
        }

        return (
            <div className="btn-group-vertical" role="group">
                {controls}
            </div>
        );
    }

    render () {

        if (this.getLayout() === 'elementOnly') {
            return (
                <div>{this.renderElement()}</div>
            );
        }

        return (
            <Row {...this.getRowProperties()}>
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
}

RadioButtonGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['inline', 'stacked']),
    options: PropTypes.array.isRequired
};

RadioButtonGroup.defaultProps = {
    type: 'stacked',
    label: '',
    help: null
};

export default withFormsy(RadioButtonGroup);
