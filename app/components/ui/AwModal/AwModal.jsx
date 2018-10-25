import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames'

import Body from './Body.jsx';
import Footer from './Footer.jsx';
import Band from './Band.jsx';

import './AwModal.less';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }
};

class Modal extends Component {

    constructor(props) {
        super(props)
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        const { router } = this.context || {};

        if (router && this.props.closeUrl) {
            router.push(this.props.closeUrl);
        } else if (this.props.onRequestClose) {
            this.props.onRequestClose();
        } else {
            this.setState({
                isClose: true
            });
        }
    }

    renderCloseButton() {
        if (this.props.noCloseBtn) {
            return '';
        }

        return (
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
            </button>
        )
    }

    renderHeader() {
        if (!this.props.headerTitle) {
            return this.renderCloseButton();
        }
        return (
            <div className="modal-header">
                {this.renderCloseButton()}
                <h4 className="modal-title">{this.props.headerTitle}</h4>
            </div>
        );
    }

    render () {
        let { isOpen }  = this.props;

        if (this.state) {
            isOpen = this.state.isClose ? false : isOpen;
        }

        let classNames = cx('modal-dialog', this.props.className);
        return (
            <ReactModal
                isOpen={isOpen}
                {...this.props}
                onRequestClose={this.closeModal}
                style={this.props.overlay ? this.props.overlay : customStyles}
                className={classNames}
                >
                <div className="modal-content">
                    {this.renderHeader()}
                    {this.props.children}
                </div>
            </ReactModal>
        );
    }
};

// Modal.contextTypes = {
//     router: PropTypes.object
// };
//
Modal.displayName = 'AwModal';

export default {
    Modal,
    Body,
    Footer,
    Band,
}
