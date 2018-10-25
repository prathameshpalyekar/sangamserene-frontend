/*jshint node:true */

import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import AwImageHolder from '../ui/AwImageHolder'

// var AwImageHolder = require('../ui/AwImageHolder');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var UploadField = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    onChange: function (path) {
        this.setValue(path);
        this.props.onUpload && this.props.onUpload(path);
    },

    removeImage: function () {
        this.setValue(null);
        this.props.onRemove && this.props.onRemove();
    },

    render: function() {
        return (
            <div>
                <AwImageHolder
                    {...this.props}
                    onUpload={this.onChange}
                    onRemove={this.removeImage}
                    imageUrl={this.getValue() || ''}
                />
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </div>
        );
    }
});

module.exports = UploadField;
