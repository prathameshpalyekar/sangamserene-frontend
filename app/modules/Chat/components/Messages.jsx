import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';
import profilePlaceholder from '../../Candidates/images/placeholder_profile_dark.png';

class Messages extends Component {

    getUsername(user) {
        return `${user.get('firstName')} ${user.get('lastName')}`;
    }

    getProfilePicture(user) {
        if (user.get('profilePic')) {
            return `${user.get('profilePic')}`;
        }
        return profilePlaceholder;
    }

    render() {
        const { messages, loggedUser, candidates, conversation } = this.props;
        const loggedUserId = loggedUser.get('id');
        let previousDate = '', previousPicture = '', oldPictureState = '', oldUser = '';

        return (
            <div id="messages" className="messages">
                {
                    messages.map((message, index) => {
                        const fromAdmin = message.get('fromAdmin');
                        const userId = message.get('userId');
                        const createdAt = message.get('createdAt');

                        let photo = profilePlaceholder;
                        let name = '';

                        if (conversation.get('broadcast')) {
                            photo = this.getProfilePicture(loggedUser);
                            name = this.getUsername(loggedUser);
                        } else if (fromAdmin && conversation.get('adminProfilePic')) {
                            photo = conversation.get('adminProfilePic');
                            name = 'Från team Instajobs';
                        } else {
                            if (userId === loggedUserId) {
                                const me = conversation.get('users').find(user => user.get('id') === loggedUserId);
                                photo = this.getProfilePicture(me);
                                name = this.getUsername(me);
                            } else {
                                const otherUser = conversation.get('users').find(user => user.get('id') !== loggedUserId);
                                photo = this.getProfilePicture(otherUser);
                                name = this.getUsername(otherUser);
                            }
                        }

                        const messageClass = userId === loggedUserId && !fromAdmin ? 'right' : 'left';
                        const currentDate = moment(createdAt).format("DD MMM YYYY");
                        const showDate = previousDate !== currentDate;
                        previousDate = currentDate;

                        const currentPictureState = messageClass;
                        const showPictureAndName = oldPictureState !== currentPictureState || showDate || userId !== oldUser;
                        oldPictureState = currentPictureState;
                        oldUser = userId;

                        return (
                            <div className="message-wrapper center-content-section" key={index}>
                                {
                                    showDate
                                    ?
                                    <div className="message-date text-center">
                                        {currentDate}
                                    </div>
                                    :
                                    null
                                }
                                <div className={`message-text ${messageClass}`}>
                                    <div className="user-picture-wrap">
                                        {
                                            showPictureAndName && currentPictureState === 'left'
                                            ?
                                            <img src={photo || profilePlaceholder} className="candidate-pic img-circle" />
                                            :
                                            null
                                        }
                                    </div>
                                    {
                                        fromAdmin || showPictureAndName && currentPictureState !== 'right'
                                        ?
                                        <span className="-username">{name}</span>
                                        :
                                        null
                                    }
                                    {message.get('content')}
                                    <div className="user-picture-wrap">
                                        {
                                            showPictureAndName && currentPictureState === 'right'
                                            ?
                                                <img src={photo || profilePlaceholder} className="candidate-pic img-circle" />
                                            :
                                            null
                                        }
                                    </div>
                                    <span className="message-time">{moment(createdAt).format("HH:mm:ss")}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Messages;
