import React, { Component } from 'react';

import ConversationListItemContainer from '../containers/ConversationListItemContainer.jsx';

import JobFormatHelpers from '../../Jobs/helpers/jobFormatHelpers.js';
import ServiceIcons from '../../Service/constants/service_icons.js';

import '../less/ConverstationsList.less';

class ConversationList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if ( (!this.props.loggedUser) && nextProps.loggedUser ) {
            this.props.fetchConversations();
            this.props.subscribeChat(nextProps.loggedUser.get('id'));
        }
    }

    componentDidMount(nextProps) {
        if (this.props.loggedUser) {
            this.props.fetchConversations();
            this.props.subscribeChat(this.props.loggedUser.get('id'));
        }
    }

    componentWillUnmount() {
        this.props.unSubscribeChat();
    }

    getUserNames(conversation) {
        const users = conversation.get('users');
        return (users || []).map((user) => {
            return user.get('firstName') + ' ' + user.get('lastName')[0];
        })
    }

    getLastMessage(conversation) {
        let lastMessage = {};
        const conversationId = conversation.get('id');

        if (conversation.get('broadcast')) {
            const job = conversation.get('job');
            const service = job.getIn(['service', 'systemName']);
            lastMessage = {
                conversationId,
                from: JobFormatHelpers.getJobNameAndDate(job.toJS()),
                photo: ServiceIcons.getServiceImage(service, 'filled'),
                broadcast: true
            }
        } else {
            if (conversation.get('users')) {
                const otherUser = conversation.get('users').find(user => user.get('id') != this.props.loggedUser.get('id'));
                lastMessage = {
                    conversationId,
                    from: `${otherUser.get('firstName')} ${otherUser.get('lastName')}`,
                    photo: otherUser.get('profilePic')
                }
            }
        }

        if (conversation.get('messages').size == 0) {
            return lastMessage;
        } else {
            const lastMessageIndex = conversation.get('messages').size - 1;

            return {
                ...lastMessage,
                content: conversation.get('broadcast') ? this.getUserNames(conversation).join(', ') : conversation.getIn(['messages', lastMessageIndex, 'content']),
                createdAt: conversation.getIn(['messages', lastMessageIndex, 'createdAt']),
                read: conversation.getIn(['messages', lastMessageIndex, 'read']),
                userId : conversation.getIn(['messages', lastMessageIndex, 'userId'])
            }
        }
    }

    render() {
        const { loggedUser, location, conversations } = this.props;

        let messages = [];
        if (conversations.size) {
            messages = conversations.map(conversation => this.getLastMessage(conversation)).sort(function(a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            });
        }

        return (
            <div>
                <div className="conversation-list-head text-center">Konversationer</div>
                {
                    conversations && conversations.size
                    ?
                    <div className="conversation-list">
                        {
                            messages.map((message, index) => {
                                const messageConversationId = message.conversationId;
                                return (
                                    <ConversationListItemContainer
                                        conversation={conversations.find(c => c.get('id') === messageConversationId)}
                                        message={message}
                                        key={index}
                                        loggedUser={loggedUser}
                                        isActive={location.pathname.match(`^/dashboard/chat/${messageConversationId}`)}
                                    />
   )
                            })
                        }
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default ConversationList;
