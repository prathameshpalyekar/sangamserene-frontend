import React, { Component } from 'react';
import cx from 'classnames';

export default class Row extends Component {

    render () {
        const { fieldMeta = {} } = this.props;

        const className = cx('form-group', this.props.className, {
            'has-error': fieldMeta.touched && fieldMeta.invalid && (!fieldMeta.pristine || fieldMeta.submitFailed)
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}

