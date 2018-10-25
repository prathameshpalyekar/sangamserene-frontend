import Select from 'react-select'

import 'react-select/dist/react-select.css';
import './react-select.less'

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var ReactSelect = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function(obj) {
        this.setValue(obj);
        this.props.onChange(this.props.name, obj);
    },

    render: function() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

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
    },

    renderElement: function() {
        return (
            <Select
                ref="element"
                {...this.props}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    }
});

module.exports = ReactSelect;
