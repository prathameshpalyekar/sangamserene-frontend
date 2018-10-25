import React, { Component } from 'react';

import Loader from 'components/Loader';

import Messages from './Messages.jsx';
import MessageFormContainer from '../containers/MessageFormContainer.jsx';

import '../less/Conversation.less';

const MAX_CHAR_COUNT = 100;

class Conversation extends Component {

    constructor(props) {
        super(props);

        this.timer = null;

        this.delayedMarkMessagesAsRead = this.delayedMarkMessagesAsRead.bind(this);
    }

    delayedMarkMessagesAsRead(conversationId) {
        const { markMessagesAsRead } = this.props;

        this.timer = setTimeout(function() {
            markMessagesAsRead(conversationId);
        }, 2000);
    }

    componentWillMount() {
        const { location: { state }, conversations } = this.props;

        if (state && Object.keys(state).length) {
            this.props.fetchCandidatesListForChat(state.job, state.type);
        }
    }

    componentDidUpdate() {
        const { conversation, match: { params} } = this.props;
        if (conversation && (params.id === undefined)) {
            this.props.replaceUrl(`/dashboard/chat/${conversation.get('id')}`);
        }
        if (conversation) {
            this.delayedMarkMessagesAsRead(conversation.get('id'));
            this.props.setCurrentConversationId(conversation.get('id'));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { location: { state }, conversations, conversation } = this.props;
        const newConversations = nextProps.conversations;
        const newConversation = nextProps.conversation;
        if (state && Object.keys(state).length && !conversations.size && newConversations.size) {
            this.props.fetchCandidatesListForChat(state.job, state.type);
        }

        if (conversation && newConversation && conversation.get('id') !== newConversation.get('id')) {
            clearTimeout(this.timer);
        }
    }

    scrollToBottom() {
        const messages = document.getElementById('messages');
        messages.scrollTop = messages.scrollHeight;
    }

    getUserNames() {
        const conversation = this.props.conversation || this.props.newConversation;
        const users = conversation.get('users');

        const names = (users || []).map((user) => {
            return user.get('firstName') + ' ' + user.get('lastName')[0];
        });
        const namesCsv = names.join(', ')

        if (namesCsv.length > MAX_CHAR_COUNT) {
            return namesCsv.substr(0, MAX_CHAR_COUNT) + ' ...';
        }
        return namesCsv;
    }

    getOtherUser(users, loggedUserId) {
        const otherUser = (users.find(user => user.get('id') != loggedUserId));

        return `${otherUser.get('firstName')} ${otherUser.get('lastName')}`;
    }

    render() {
        const { loggedUser, conversation, newConversation, disableMessageSendButton, candidates, match: { params}, isFetching } = this.props;
        const messages = conversation ? conversation.get('messages') : [];
        const loggedUserId = loggedUser.get('id');

        if (isFetching) {
            return (
                <Loader />
            );
        }

        if (! (conversation || newConversation)) {
            return (
                <div className="text-center center-content-section conversation-wrap">
                    <h1 className="whiteboard-title">CHAT</h1>
                    <p>
                        Du kan chatta med matchande, ansökande och anlitade konsulter. För att starta en chat går du in på instajobbarens profil och trycker på chatikonen. Alla konversationer samlas här.
                    </p>
                </div>
            );
        }

        return (
            <div className="conversation-wrap">
                <div className="conversation-head text-center">
                {
                    (conversation || newConversation).get('broadcast')
                    ?
                    <span>
                        {this.getUserNames()}
                    </span>
                    :
                    null
                }
                {
                    conversation && ((conversation).get('fromAdmin') === false && (conversation).get('broadcast') === undefined)
                    ?
                    <span>
                        {this.getOtherUser(conversation.get('users'), loggedUserId)}
                    </span>
                    :
                    null
                }
                {
                    newConversation && newConversation.get('broadcast') === undefined
                    ?
                    <span>
                        {this.getOtherUser(newConversation.get('users'), loggedUserId)}
                    </span>
                    :
                    null
                }
                </div>
                {
                    conversation
                    ?
                    <Messages
                        messages={messages}
                        conversation={conversation}
                        loggedUser={loggedUser}
                        candidates={candidates ? candidates.get('data').toJS() : null}
                        ref={() => this.scrollToBottom()}
                    />
                    :
                    <div id="messages" className="messages"></div>
                }
                <MessageFormContainer
                    loggedUser={loggedUser}
                    conversation={conversation}
                    newConversation={newConversation}
                    disabled={disableMessageSendButton}
                />
            </div>
        );
    }
}

export default Conversation;
