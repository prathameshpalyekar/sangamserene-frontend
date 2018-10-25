import axiosMainApi from 'components/axiosMainApi';
import socket from 'components/Socket';

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
} from './actionTypes.js';

function requestConverstation() {
    return {
        type: FETCH_CONVERSATIONS_REQUEST
    }
}

function receiveConversations(conversations) {
    return {
        type: FETCH_CONVERSATIONS_SUCCESS,
        conversations
    }
}

function conversationsError(message) {
    return {
        type: FETCH_CONVERSATIONS_FAILURE,
        message
    }
}

function markAsRead(conversationId) {
    return {
        type: MARK_CONVERSATION_READ,
        conversationId
    }
}

function messageReceived(data) {
    return {
        type: MESSAGE_RECEIVED,
        data
    }
}

function messagesCountReceived(data) {
    return {
        type: MESSAGE_COUNT_RECEIVED,
        data
    }
}

export function newConversation(user) {
    return {
        type: NEW_CONVERSATION,
        user
    }
}

export function newBroadcastConversation(job, users) {
    return {
        type: NEW_BROADCAST_CONVERSATION,
        users,
        job
    }
}

export function setCurrentConversationId(conversationId) {
    return {
        type: SET_CURRENT_CONVERSATION_ID,
        conversationId
    }
}

export function fetchConversations() {
    return (dispatch) => {

        dispatch(requestConverstation());

        return axiosMainApi({
            url: `messages`,
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveConversations({
                    list: response.data
                }));
            } else {
                dispatch(conversationsError('Failed to load converstations'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(conversationsError(response && response.message ? response.message : 'Failed to load conversations'));
            } else {
                dispatch(conversationsError('No response received'));
            }
        });
    }
}

export function sendMessage(message) {
    return (dispatch) => {
        const data = {
            conversationId: message.conversationId,
            userId: message.userId,
            content: message.content
        };
        return axiosMainApi({
            url: `messages`,
            method: 'post',
            data: data
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                //dispatch(success());
            } else {
                //dispatch(error());
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                //dispatch(success(response && response.message ? response.message : 'Failed to send message'));
            } else {
                //dispatch(error('No response received'));
            }
        });
    }
}

export function sendMessageToBroadcastGroup(message) {
    return (dispatch) => {
        const data = {
            content: message.content
        };
        return axiosMainApi({
            url: `messages/broadcast/${message.broadcastGroupId}`,
            method: 'post',
            data: data
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                //dispatch(success());
            } else {
                //dispatch(error('Failed'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                //dispatch(error(response && response.message ? response.message : 'Failed to send broadcast message'));
            } else {
                //dispatch(error('No response received'));
            }
        });
    }
}

export function startNewConversation(message) {
    return (dispatch) => {

        const data = {
            userId: message.userId,
            toId: message.toId,
            content: message.content
        };
        return axiosMainApi({
            url: `messages/conversation`,
            method: 'post',
            data: data
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                const currentConversation = response.data.find(c => {
                    return (c.userOneId === message.toId || c.userTwoId === message.toId);
                });
                const currentConversationId = (currentConversation||{}).id;
                dispatch(receiveConversations({
                    currentConversationId: currentConversationId,
                    list: response.data
                }));
            } else {
                //dispatch(error('Failed'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                //dispatch(error(response && response.message ? response.message : 'Failed to start new conversation'));
            } else {
                //dispatch(error('No response received'));
            }
        });
    }
}

export function startNewBrodcastGroup(message) {
    return (dispatch) => {

        const data = {
            jobId: message.jobId,
            toUserIds: message.toUserIds,
            content: message.content
        };
        return axiosMainApi({
            url: `messages/broadcast/new`,
            method: 'post',
            data: data
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                const broadcastId = response.data.id
                dispatch(receiveConversations({
                    currentConversationId: broadcastId
                }));
            } else {
                //dispatch(error('Failed'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                //dispatch(error(response && response.message ? response.message : 'Failed'));
            } else {
                //dispatch(error('No response received'));
            }
        });
    }
}

export function markMessagesAsRead(conversationId) {
    return (dispatch) => {
        const data = {
            conversationId: conversationId
        };
        return axiosMainApi({
            url: `messages/read`,
            method: 'post',
            data: data
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                if (response.data.read) {
                    dispatch(markAsRead(conversationId));
                }
            }
            return response;
        }).catch(xhrResponse => {
            // Error
        });
    }
}

export function subscribeChat(loggedUserId) {
    return (dispatch) => {
        socket.subscribe('/chat', (data) => {
            dispatch(messageReceived(Object.assign(data, {loggedUserId})));
        }, (err) => {
            if (err) {
                console.log('Chat subsription error');
                return false;
            }
        });
    }
}

export function unSubscribeChat() {
    return (dispatch) => {
        socket.unsubscribe('/chat', null, (err) => {
            if (err) {
                console.log('Chat unsubscription failed');
            }
        });
    }
}

export function subscribeMessagesCount(loggedUserId) {
    return (dispatch) => {
        socket.subscribe('/chat-unread-count', (data) => {
            dispatch(messagesCountReceived(data));
        }, (err) => {
            if (err) {
                console.log('Chat count subsription error');
                return false;
            }
        });
    }
}
