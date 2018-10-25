import React, { Component } from 'react';


import './CookieDisclaimer.less';

export default class CookieDisclaimer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            show: localStorage.getItem('cookie-disclaimer') !== 'shown'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            show: false
        });
    }

    componentDidMount() {
        localStorage.setItem('cookie-disclaimer', 'shown');
    }

    render () {
        if (!this.state.show) {
            return null;
        }
        return (
            <div className="cookie-disclaimer">
                <p className="-content">
                    På app.instajobs.com använder vi cookies för att webbplatsen ska fungera på ett bra sätt för dig.
                    <br/>
                    Genom att fortsätta surfa godkänner du att vi använder cookies.
                    <br/>
                    <a className="-link" href="http://www.instajobs.com/about/cookie-policy" target="_blank">Läs mer här.</a>
                    <br/>
                    <a className="-button" onClick={this.handleClick}>OK</a>
                </p>
            </div>
        );
    }
}

