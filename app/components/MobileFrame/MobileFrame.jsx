import React, { Component } from 'react';
import cx from 'classnames';
import ReactSVG from 'react-svg';

import './MobileFrame.less';
import MobileFrameSvg from './mobile-frame.svg';

export default class MobileFrame extends Component {

    render () {
        const { centerContent } = this.props;

        const contentClassNames = cx('mobile-frame-content', {
            '-center-content': centerContent,
        });

        const styles = {
            backgroundImage: `url(${MobileFrameSvg})`,
        };

        return (
            <div className="mobile-frame" style={styles}>
                <div className={contentClassNames}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

