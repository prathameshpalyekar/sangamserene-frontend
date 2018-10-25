import React, { Component } from 'react';
import cx from 'classnames'

import './AwImageCaption.less';

export default class AwImageCaption extends Component {

    renderImage () {
        const { image, title, imageSize } = this.props;

        if (!image) {
            return null;
        }

        const style = {
            backgroundImage: `url(${image})`
        };

        return (
            <div className="aw-imagecaption-image" style={style}>
            </div>
        );
    }

    renderTitle() {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return (
            <div className="aw-imagecaption-title">{title}</div>
        );
    }


    renderSubTitle() {
        const { subTitle } = this.props;

        if (!subTitle) {
            return null;
        }

        return (
            <div className="aw-imagecaption-subtitle">{subTitle}</div>
        );
    }

    render() {
        return (
            <div className="aw-imagecaption">
                {this.renderImage()}
                {this.renderTitle()}
                {this.renderSubTitle()}
                {this.props.children}
            </div>
        );
    }
}
