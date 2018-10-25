// THIS is not working perfectly
import React from 'react';
import Formsy from 'formsy-react';
import DatePicker from  'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

const format = 'YYYY/MM/DD';

var DateTimePicker = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        addonBefore: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ]),
        addonAfter: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ]),
        buttonBefore: React.PropTypes.node,
        buttonAfter: React.PropTypes.node
    },

    getDefaultProps () {
        return {
            type: 'text',
            addonBefore: null,
            addonAfter: null,
            buttonBefore: null,
            buttonAfter: null
        };
    },

    changeValue (value) {
        console.log(value);
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement () {
        var className = 'form-control';
        if (['range'].indexOf(this.props.type) !== -1) {
            className = null;
        }

        let value = this.getValue();
        // if (value && value._isAMomentObject) {
        //     value = value.toDate();
        // }
        console.log(value);

        return (
            <DatePicker
                ref="element"
                className={className}
                {...this.props}
                id={this.getId()}
                label={null}
                selected: {this.getValue()}
                dateFormat={format}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    },


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
        if (this.showErrors()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
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
    },

    renderInputGroup(element) {
        return (
            <div className="input-group">
                {this.renderAddon(this.props.addonBefore)}
                {this.renderButton(this.props.buttonBefore)}
                {element}
                {this.renderAddon(this.props.addonAfter)}
                {this.renderButton(this.props.buttonAfter)}
            </div>
        );
    },

    renderAddon (addon) {
        if (!addon) {
            return false;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    },

    renderButton (button) {
        if (!button) {
            return false;
        }
        return (
            <span className="input-group-btn">{button}</span>
        );
    }

});
//
module.exports = DateTimePicker;
