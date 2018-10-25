import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardSectionTitle extends Component {

    render() {
        const titleClassNames = cx('whiteboard-section-title', this.props.className);

        return (
            <h2 className={titleClassNames}>{this.props.children}</h2>
        );
    }
}
