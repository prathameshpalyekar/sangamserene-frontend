import { connect } from 'react-redux';

import MessageForm from '../components/MessageForm.jsx';

import {
    sendMessage,
    sendMessageToBroadcastGroup,
    startNewConversation,
    startNewBrodcastGroup
} from  '../actions/chat.js';

const mapStateToProps = (state, ownProps) => {
    return {
        conversation: ownProps.conversation,
        loggedUser: ownProps.loggedUser,
        newConversation: ownProps.newConversation,
        disabled: ownProps.disabled
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendMessage (message) {
            const params = {
                userId: ownProps.loggedUser.get('id'),
                conversationId: ownProps.conversation.get('id'),
                content: message
            }
            dispatch(sendMessage(params));
        },
        sendMessageToBroadcastGroup (message) {
            const params = {
                broadcastGroupId: ownProps.conversation.get('id'),
                content: message
            }
            dispatch(sendMessageToBroadcastGroup(params));
        },
        startNewConversation (message) {
            const { newConversation } = ownProps;
            const params = {
                userId: ownProps.loggedUser.get('id'),
                toId: newConversation.getIn(['users', 0]).get('id'),
                content: message
            };
            dispatch(startNewConversation(params));
        },
        startNewBrodcastGroup (message) {
            const { newConversation } = ownProps;
            const params = {
                    jobId: newConversation.getIn(['job', 'id']),
                    toUserIds: (newConversation.get('users')||[]).map(u => u.get('id')),
                    content: message
            }
            dispatch(startNewBrodcastGroup(params));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
