import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Alert from 'react-s-alert';

import AwModal from 'components/ui/AwModal';

import DeleteIcon from '../images/delete.svg';
import ReadIcon from '../images/read.svg';

class NotificationsHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showConfirmBox: false,
            confirmDialog: {
                onConfirm: null,
                confirmMessage: '',
                confirmTitle: '',
                yesText: 'Ja',
                noText: 'Stäng'
            }
        }

        this.deleteAllNotifications = this.deleteAllNotifications.bind(this);
        this.markAllAsRead = this.markAllAsRead.bind(this);

        this.closeConfirmBox = this.closeConfirmBox.bind(this);
        this.confirmDeleteAll = this.confirmDeleteAll.bind(this);
        this.confirmMarkAllAsRead = this.confirmMarkAllAsRead.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ( !this.props.deleteErrorMessage && nextProps.deleteErrorMessage) {
            Alert.error(nextProps.deleteErrorMessage);
        }
    }

    confirmDeleteAll() {
        this.setState({
            confirmDialog: {
                onConfirm: this.deleteAllNotifications,
                confirmTitle: '',
                confirmMessage: 'Är du säker på att du vill radera alla aviseringar?',
                yesText: 'Ja',
                noText: 'Avbryt'
            },
            showConfirmBox: true
        });
    }

    confirmMarkAllAsRead() {
        this.setState({
            confirmDialog: {
                onConfirm: this.markAllAsRead,
                confirmTitle: '',
                confirmMessage: 'Markera alla som läst - Är du säker?',
                yesText: 'Ja',
                noText: 'Avbryt'
            },
            showConfirmBox: true
        });
    }

    closeConfirmBox() {
        this.setState({showConfirmBox: false});
    }

    deleteAllNotifications() {
        this.props.deleteAllNotifications();
        this.setState({showConfirmBox: false});
    }

    markAllAsRead() {
        this.props.markAllAsRead();
        this.setState({showConfirmBox: false});
    }

    renderConfirmBox() {
        const { showConfirmBox, confirmTitle, confirmDialog } = this.state;

        if (!showConfirmBox) {
            return null;
        }

        return (
            <AwModal.Modal
                isOpen={true}
                onRequestClose={this.closeConfirmBox}
                ariaHideApp={false}
                className="attention-modal">
                <AwModal.Body>
                    <div className="text-center">
                        {
                            confirmDialog.confirmTitle ?
                            <h3>{confirmDialog.confirmTitle}</h3>
                            :
                            null
                        }
                        <p>{confirmDialog.confirmMessage}</p>
                        <button type="button" className="btn btn-default btn-filled" onClick={this.closeConfirmBox}>{confirmDialog.noText}</button>
                        <button type="button" className="btn btn-success btn-filled" onClick={confirmDialog.onConfirm}>{confirmDialog.yesText}</button>
                    </div>
                </AwModal.Body>
            </AwModal.Modal>
        );
    }


    render() {
        const { hideOptions } = this.props;

        return (
            <div>
                {this.renderConfirmBox()}
                <div className="notifications-head">
                    <div className="row">
                        <div className="col-xs-4">
                            {
                                !hideOptions
                                ?
                                <a className="-clickable -mark-read-btn" onClick={this.confirmMarkAllAsRead}><ReactSVG path={ReadIcon} />Markera alla som läst</a>
                                :
                                null
                            }
                        </div>
                        <div className="col-xs-4">
                            <h1 className="whiteboard-title">Aviseringar</h1>
                        </div>
                        <div className="col-xs-4 text-right">
                            {
                                !hideOptions
                                ?
                                <a className="-clickable -delete-btn" onClick={this.confirmDeleteAll}><ReactSVG path={DeleteIcon} />Radera alla</a>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotificationsHeader;
