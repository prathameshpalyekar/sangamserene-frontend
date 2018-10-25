/*jshint node:true */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

import Row from './row.js';
import Icon from './icon.js';
import BaseFormsyComponent from './mixins/component.js';
import cx from 'classnames';

class Checkbox extends BaseFormsyComponent {

    constructor (props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue (event) {
        var target = event.currentTarget;
        this.props.setValue(target.checked);
        this.props.onChange && this.props.onChange(this.props.name, target.checked);
    }

    renderElement () {
        const classNames = cx('checkbox', {
            'has-error': this.showErrors()
        })
        return (
            <div className={classNames}>
                <label className={this.props.labelClassName}>
                    <input
                        // className={classNames}
                        ref="element"
                        id={this.getId()}
                        type="checkbox"
                        checked={this.props.getValue() === true}
                        onChange={this.changeValue}
                        disabled={this.props.isFormDisabled() || this.props.disabled}
                    /> {this.props.children || this.props.label}
                </label>
            </div>
        );
    }

    render () {

        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        return (
            <Row
                {...this.getRowProperties()}
                label={this.props.rowLabel}
                htmlFor={this.getId()}
                layout="elementOnly"
            >
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
};

Checkbox.defaultProps = {
    label: '',
    rowLabel: '',
    value: false
};


export default withFormsy(Checkbox);
