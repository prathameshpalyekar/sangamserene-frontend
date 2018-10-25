import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';
import ReactSVG from 'react-svg';
import profilePlaceholder from '../../Candidates/images/placeholder_profile_dark.png';

class ConversationListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { message, loggedUser, isActive } = this.props;
        const classNames = cx('', {
            'converstation-list-item': true,
            'active': isActive
        });

        return (
            <div className={classNames} onClick={this.props.openConversation}>
                { !message.broadcast && !message.read && message.userId !== loggedUser.get('id') ? <span className="-unread"></span> : null }
                <div className="row converstation-list-item-row">
                    <div className="col-md-4 -col">
                    {
                        message.broadcast
                        ?
                        <ReactSVG path={message.photo} />
                        :
                        <img src={message.photo || profilePlaceholder} className="candidate-pic img-circle" />
                    }
                    </div>
                    <div className="col-md-6 -col">
                        <p className="from">{message.from}</p>
                        <p className="text">{message.content}</p>
                        <p className="time">{moment(message.createdAt).format("DD MMM YYYY HH:mm:ss")}</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default ConversationListItem;
