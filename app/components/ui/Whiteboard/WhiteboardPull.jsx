import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardPull extends Component {

    render() {
        const sectionClassNames = cx('whiteboard-pull', this.props.className, {
            '-top': this.props.top,
            '-sep-top': this.props.separatorTop,
            '-sep-bottom': this.props.separatorBottom,
            '-restore-horizontal-space': this.props.restoreHorizontalSpace
        });

        return (
            <div className={sectionClassNames}>
                {this.props.children}
            </div>
        );
    }
}
