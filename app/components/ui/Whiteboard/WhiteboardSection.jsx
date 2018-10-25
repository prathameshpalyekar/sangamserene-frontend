import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardSection extends Component {

    render() {
        const sectionClassNames = cx('whiteboard-section', this.props.className);

        return (
            <div className={sectionClassNames}>
                {this.props.children}
            </div>
        );
    }
}
