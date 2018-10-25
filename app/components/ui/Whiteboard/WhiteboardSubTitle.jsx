import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardSubTitle extends Component {

    render() {
        const subTitleClassNames = cx('whiteboard-sub-title', this.props.className);

        return (
            <h2 className={subTitleClassNames}>{this.props.children}</h2>
        );
    }
}
