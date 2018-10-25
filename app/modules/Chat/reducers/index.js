import Immutable from 'immutable';

import {
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    MESSAGE_RECEIVED,
    MESSAGE_COUNT_RECEIVED,
    NEW_CONVERSATION,
    NEW_BROADCAST_CONVERSATION,
    MARK_CONVERSATION_READ,
    SET_CURRENT_CONVERSATION_ID
} from '../actions/actionTypes.js';

const chat = (state = Immutable.fromJS({
    conversations: {},
    currentConversationId: null,
    newConversation: null,
    messageCount: {}
}), action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS_REQUEST:
            return state.set('fetching', true).set('fetchError', false);
        case FETCH_CONVERSATIONS_SUCCESS:
            const currentConversationId = action.conversations.currentConversationId || state.get('currentConversationId');
            return state.set('conversations', Immutable.fromJS(action.conversations.list || state.get('conversations')))
                .set('currentConversationId', currentConversationId)
                .set('newConversation', currentConversationId ? null : state.get('newConversation'))
                .set('fetching', false)
                .set('fetchError', false);
        case FETCH_CONVERSATIONS_FAILURE:
            return state.set('fetching', false).set('fetchError', action.message);
        case MESSAGE_RECEIVED:
            return handleMessageReceived(state, action);
        case MESSAGE_COUNT_RECEIVED:
            return state.set('messageCount', Immutable.fromJS(action.data));
        case NEW_CONVERSATION:
            return handleNewConversation(state, action);
        case NEW_BROADCAST_CONVERSATION:
            return handleNewBroadcastConversation(state, action);
        case MARK_CONVERSATION_READ:
            return markConversationRad(state, action);
        case SET_CURRENT_CONVERSATION_ID:
            return state.set('currentConversationId', action.conversationId)
        default:
            return state
    }
}

function markConversationRad(state, action) {
    let conversations = state.get('conversations');
    const conversationIndex = conversations.findIndex(c => c.get('id') == action.conversationId);
    if (conversationIndex) {
        const messages = conversations.getIn([conversationIndex, 'messages']).map(m => {
            return m.set('read', true);
        });
        return state.setIn(['conversations', conversationIndex, 'messages'], messages);
    }

    return state;
}

function handleNewBroadcastConversation (state, action) {
    const targetUserIds = (action.users || []).map(u => u.id).sort();
    const currentConversation = state.get('conversations').find(c => {
        if (c.get('broadcast') && c.get('jobId') === action.job.id) {
            const knownConversationsUserIds = c.get('userIds') || [];
            if (targetUserIds.length !== knownConversationsUserIds.size) {
                return false;
            }
            return _.isEqual(targetUserIds, knownConversationsUserIds.toJS().sort());
        }
        return false;
    });

    if (currentConversation) {
        return state.set('currentConversationId', currentConversation.get('id'))
    } else {
        return state.set('currentConversationId', null).set('newConversation', Immutable.fromJS({ broadcast: true, job: action.job, users: action.users }));
    }
}

function handleNewConversation (state, action) {
    if (!action.user.id) {
        return state.set('currentConversationId', null);
    }
    const conversations = state.get('conversations');
    const currentConversation = (conversations).find(c => {
        return (c.get('userOneId') === action.user.id || c.get('userTwoId') === action.user.id);
    });

    if (currentConversation) {
        return state.set('currentConversationId', currentConversation.get('id'))
    } else {
        return state.set('currentConversationId', null)
            .set('newConversation', Immutable.fromJS({
                users: [action.user]
            }))
    }
}

function handleMessageReceived (state, action) {
    const { message } = action.data;
    const conversations = state.get('conversations').toJS();
    const idField = message.broadcastGroupId ? 'broadcastGroupId' : 'conversationId';
    const conversationIndex = conversations.findIndex(c => c.id == message[idField]);

    let updatedConversations;
    let currentConversationId = state.get('currentConversationId');

    if (conversationIndex >= 0) {
        const conversation = conversations[conversationIndex];
        const messages = conversation.messages || [];
        if (!messages.find(m => m.id === action.data.message.id)) {
            const newMessages = [...messages, action.data.message];
            const updatedConversation = {
                ...action.data.conversation,
                messages: newMessages
            };

            updatedConversations = [
                ...conversations.slice(0, conversationIndex),
                updatedConversation,
                ...conversations.slice(conversationIndex+1)
            ];
        } else {
            updatedConversations = conversations;
        }
    } else {
        const newConversation = action.data.conversation;
        if (!currentConversationId) {
            currentConversationId = newConversation.id;
        }
        updatedConversations = [
            ...conversations,
            newConversation
        ];
    }

    return state.set('conversations', Immutable.fromJS(updatedConversations))
        .set('currentConversationId', currentConversationId)
        .set('newConversation', null);
}

export default chat;
