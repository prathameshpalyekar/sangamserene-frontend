import React, { Component } from 'react';

import './GlobalFooter.less';

export default class Footer extends Component {
    render () {
        const { user } = this.props;

        return (
        <div className="site-footer">
            <ul className="site-navigation site-footer-navigation">
                { user ? <li><a onClick={this.props.logout} className="site-nav-link -clickable">Logga ut</a></li> : null }
                <li><a target="_blank" href="https://www.instajobs.com/om-oss" className="site-nav-link">Om Instajobs</a></li>
                <li><a target="_blank" href="https://intercom.help/instajobs/for-foretag-och-kunder" className="site-nav-link">Frågor och svar</a></li>
                <li><a target="_blank" href="https://www.instajobs.com/om-oss" className="site-nav-link">Kontakta oss</a></li>
                <li><span className="copyright-text">@ 2018 instajobs</span></li>
            </ul>
        </div>
        );
    }
};
