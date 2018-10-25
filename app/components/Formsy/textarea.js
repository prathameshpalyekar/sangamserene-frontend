/*jshint node:true */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

import Row from './row.js';
import BaseFormsyComponent from './mixins/component.js';
import cx from 'classnames';

class Textarea extends BaseFormsyComponent {

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
       this.props.onError && this.props.onError(this.showErrors());
    }

    render () {
        return (
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }

    renderElement () {
        return (
            <textarea
                ref="element"
                className="form-control"
                placeholder={this.props.placeholder}
                id={this.getId()}
                value={this.props.getValue() || ''}
                onChange={this.changeValue}
                disabled={this.props.isFormDisabled() || this.props.disabled}
            ></textarea>
   );
    }
};

Textarea.propTypes = {
    type: PropTypes.oneOf([
        'textarea',
    ]),
};

export default withFormsy(Textarea);
