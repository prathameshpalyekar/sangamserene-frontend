import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

export default class Band extends Component {
    render() {
        let classNames = cx('aw-modal-band', this.props.className);

        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}

