import React, { Component } from 'react'
import cx from 'classnames'

import "./Loader.less"

export default class Loader extends Component {

    render() {
        const { standalone } = this.props;

        const classNames = cx('sk-folding-cube', {
            '-mini': this.props.size === 'mini',
            '-no-margins': standalone,
        })

        return (
            <div className={classNames}>
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        );
    }
}
