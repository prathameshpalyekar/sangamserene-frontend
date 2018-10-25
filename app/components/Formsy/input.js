/*jshint node:true */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

import Row from './row.js';
import Icon from './icon.js';
import BaseFormsyComponent from './mixins/component.js';
import cx from 'classnames';

class Input extends BaseFormsyComponent {

    constructor (props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue (event) {
        var value = event.currentTarget.value;
        this.props.setValue(value);
        this.props.onChange && this.props.onChange(this.props.name, value);
    }

    componentDidUpdate() {
        if (this.showErrors()) {
           this.props.onError && this.props.onError(true)
        } else {
           this.props.onError && this.props.onError(false)
        }
    }

    render () {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
            element = this.renderInputGroup(element);
        }

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        var warningIcon = null;
        // if (this.showErrors()) {
        //     warningIcon = (
        //         <Icon symbol="remove" className="form-control-feedback" />
        //     );
        // }

        if (this.getLayout() === 'elementAndError') {
            const wrapperClass = cx('aw-input-wrapper', {'has-error' : this.showErrors()});
            return (
                <div className={wrapperClass}>
                    {element}
                    {
                        this.props.getValue() ?
                        <span className="placeholder-text">{this.props.placeholder}</span>
                        :
                        null
                    }
                </div>
            )
        }

        return (
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {element}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }

    renderElement () {
        const classNames = cx('form-control', {
            // 'has-error': this.showErrors()
        })
        const { type, min, defaultValue } = this.props;
        // var className = 'form-control';
        // if (['range'].indexOf(this.props.type) !== -1) {
        //     className = null;
        // }
        return (
            <input
                ref="element"
                className={classNames}
                placeholder={this.props.placeholder}
                type={this.props.type}
                id={this.getId()}
                label={null}
                min={type === 'number' ? min : null}
                value={this.props.getValue() || defaultValue || ''}
                onChange={this.changeValue}
                autoComplete={this.props.autoComplete || 'on'}
                disabled={this.props.isFormDisabled() || this.props.disabled}
            />
        );
    }

    renderInputGroup (element) {
        return (
            <div className="input-group">
                {this.renderAddon(this.props.addonBefore)}
                {this.renderButton(this.props.buttonBefore)}
                {element}
                {this.renderAddon(this.props.addonAfter)}
                {this.renderButton(this.props.buttonAfter)}
            </div>
        );
    }

    renderAddon (addon) {
        if (!addon) {
            return false;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    }

    renderButton (button) {
        if (!button) {
            return false;
        }
        return (
            <span className="input-group-btn">{button}</span>
        );
    }
};

Input.propTypes = {
    type: PropTypes.oneOf([
        'color',
        'date',
        'datetime',
        'datetime-local',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'range',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week'
    ]),
    addonBefore: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    addonAfter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    buttonBefore: PropTypes.node,
    buttonAfter: PropTypes.node,
};

Input.defaultProps = {
    type: 'text',
    addonBefore: null,
    addonAfter: null,
    buttonBefore: null,
    buttonAfter: null
};

export default withFormsy(Input);
