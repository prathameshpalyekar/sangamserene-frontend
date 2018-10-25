/*jshint node:true */

import React, { Component, PropTypes } from 'react'
import Formsy from 'formsy-react'
import ColorPicker from 'components/ColorPicker'

var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var ColorPickerField = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    getInitialState: function() {
        return {
            displayColorPicker: false
        };
    },

    colorPickerClick: function () {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    },

    colorPickerClose: function () {
        this.setState({ displayColorPicker: false })
    },

    colorPickerChange: function(color) {
        this.setValue(color.hex);
        this.props.onChange && this.props.onChange(this.props.name, color.hex);
    },

    removeColor: function () {
        this.setValue('#ffffff');
        this.props.onChange && this.props.onChange(this.props.name, '#ffffff');
    },

    renderColorPicker: function() {
        if (!this.state.displayColorPicker) {
            return null;
        }

        return (<ColorPicker onClick={this.colorPickerClose} onChangeComplete={this.colorPickerChange} />);
    },

    render: function() {
        const { label } = this.props;

        let crossButton = null;

        let value = this.getValue();

        let circleStyle = {
            backgroundColor: value || '#ffffff'
        };
        if (value && value !== '#ffffff') {
            crossButton = <span className="aw-image-holder-remove-btn icon-cross" onClick={this.removeColor}></span>
        }

        return (
            <div className="aw-image-holder">
                <div className="aw-image-holder-img center-block img-circle" style={circleStyle} />
                <div className="aw-image-holder-title">{label}</div>
                <div className="aw-image-holder-filename">{value || '#ffffff'} {crossButton}</div>
                <div className="aw-image-holder-btn">
                    <button type="button" className="btn btn-default btn-sm" onClick={this.colorPickerClick}>{ this.state.displayColorPicker ? 'Close' : 'Choose' }</button>
                </div>
                {this.renderColorPicker()}
            </div>
        );
    }
});

module.exports = ColorPickerField;
