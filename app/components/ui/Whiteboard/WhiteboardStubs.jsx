import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardStubs extends Component {

    render() {
        const sectionClassNames = cx('whiteboard-stubs', this.props.className, {
            '-no-top-padding': this.props.noTopPadding,
            '-sep-top': this.props.separatorTop,
            '-sep-bottom': this.props.separatorBottom,
            '-sizing-compact': this.props.sizing === 'compact',
            // '-restore-horizontal-space': this.props.restoreHorizontalSpace
        });

        return (
            <div className={sectionClassNames}>
                {this.props.children}
            </div>
        );
    }
}
