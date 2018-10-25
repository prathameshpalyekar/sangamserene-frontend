import React, { Component, PropTypes } from 'react';
import cx from 'classnames'


import AwModal from 'components/ui/AwModal';

import ConfirmBox from './ConfirmBox.jsx'
import "./ConfirmBox.less"

class ConfirmBoxOpener extends Component {

    state = {
        isOpen: false
    }

    constructor(props) {
        super(props)

        this.openConfirmBox = this.openConfirmBox.bind(this);
        this.closeConfirmBox = this.closeConfirmBox.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    openConfirmBox() {
        this.setState({
            isOpen: true
        });
    }

    closeConfirmBox() {
        this.setState({
            isOpen: false
        });
    }

    onConfirm() {
        const { onConfirm } = this.props;

        this.closeConfirmBox();
        onConfirm && onConfirm();
    }

    render() {
        return (
            <span>
                <button type="button" className={this.props.btnClassName} onClick={this.openConfirmBox}>{this.props.children}</button>
                <ConfirmBox {...this.props} isOpen={this.state.isOpen} onRequestClose={this.closeConfirmBox} onConfirm={this.onConfirm}/>
            </span>
        );
    }
}

export default ConfirmBoxOpener;
