import React, { Component } from 'react';
import cx from 'classnames'

export default class WhiteboardHeader extends Component {

    goBack() {
        history.go(-1);
        return false;
    }

    renderBackButton() {
        const { showBackButton } = this.props;

        if (!showBackButton) {
            return null;
        }

        return (
            <button className="btn btn-default pull-left whiteboard-header-back" onClick={this.goBack}>
                <span className="icon-long-arrow-left" /> Tillbaka
            </button>
        );
    }

    render() {
        const headerClassNames = cx('whiteboard-header clearfix', this.props.className);

        return (
            <header className={headerClassNames}>
                {this.renderBackButton()}
                {this.props.children}
            </header>
        );
    }
}
