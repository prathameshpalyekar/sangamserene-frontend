import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form/immutable';

import Label from '../Label.jsx';

class BaseField extends Component {

    renderLabel () {
        const { label, required, fakeLabel, layout, htmlFor } = this.props;

        return (
            <Label label={label} required={required} layout={layout} htmlFor={htmlFor} fakeLabel={fakeLabel}/>
        );
    }

    renderRow () {
        return (
            <div className="form-group">
                {this.renderLabel()}
                <div>
                    <Field {...this.props}/>
                </div>
            </div>
        );
    }
}

