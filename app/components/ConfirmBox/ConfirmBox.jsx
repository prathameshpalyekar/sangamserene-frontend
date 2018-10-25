import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

import AwModal from 'components/ui/AwModal';

import "./ConfirmBox.less"

class ConfirmBox extends Component {

    render() {
        const { isOpen, onRequestClose, onConfirm } = this.props;

        const cancelButtonClassNames = cx('btn btn-block', this.props.cancelButtonClassNames, {
            'btn-primary': this.props.reverseButtonUI,
            'btn-danger': !this.props.reverseButtonUI,
        });

        const confirmButtonClassNames = cx('btn btn-block', this.props.confirmButtonClassNames, {
            'btn-primary': !this.props.reverseButtonUI,
            'btn-danger': this.props.reverseButtonUI,
        });

        return (
            <AwModal.Modal
                isOpen={isOpen}
                noCloseBtn={true}
                className="confirmbox"
                onRequestClose={this.props.onRequestClose}>
                <AwModal.Body>
                    <p>{this.props.message}</p>
                </AwModal.Body>
                <AwModal.Footer>
                    <div className="row row-mini">
                        <div className="col-md-6">
                            <button type="button" className={cancelButtonClassNames} onClick={onRequestClose}>{this.props.cancelButtonText || 'No'}</button>
                        </div>
                        <div className="col-md-6">
                            <button type="button" className={confirmButtonClassNames} onClick={onConfirm}>{this.props.confirmButtonText || 'Yes'}</button>
                        </div>
                    </div>
                </AwModal.Footer>
            </AwModal.Modal>
        )
    }
}

ConfirmBox.propTypes = {
    message: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    onConfirm: PropTypes.func,
};

export default  ConfirmBox;
