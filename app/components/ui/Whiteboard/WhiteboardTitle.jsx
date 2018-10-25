import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardTitle extends Component {

    render() {
        const titleClassNames = cx('whiteboard-title', this.props.className);

        return (
            <h1 className={titleClassNames}>{this.props.children}</h1>
        );
    }
}
