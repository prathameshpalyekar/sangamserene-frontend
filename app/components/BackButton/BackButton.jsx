import React, { Component } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router'

import "./BackButton.less"

class BackButton extends Component {

    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    goBack () {
        const { history } = this.props;

        history.goBack();

        return false;
    }

    render() {
        return (
            <div className="back-button">
                <a className="-clickable" onClick={this.goBack}><span className="icon-long-arrow-left"></span>Tillbaka</a>
            </div>
        );
    }
}

export default withRouter(BackButton);
