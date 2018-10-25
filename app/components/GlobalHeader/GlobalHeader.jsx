import React, { Component } from 'react';

import Logo from './logo.jsx';

import './GlobalHeader.less';

export default class Header extends Component {
    render () {
        const { columnOne, columnTwo, columnThree } = this.props;
        return (
            <div className="site-header">
                <div className="container user-header">
                    <div className="row">
                        <div className="custom-col-small">
                            {columnOne ? columnOne : null}
                        </div>
                        <div className="custom-col-wide text-right">
                            <Logo />
                            {columnTwo ? columnTwo : null}
                        </div>
                        <div className="custom-col-small text-right">
                            {columnThree ? columnThree : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
