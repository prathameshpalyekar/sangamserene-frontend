import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

export default class Body extends Component {
    render() {
        let classNames = cx('aw-modal-body', this.props.className);

        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}

