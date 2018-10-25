import axiosMainApi from 'components/axiosMainApi';
import socket from 'components/Socket';

import {
    NOTIFICATIONS_REQUEST,
    NOTIFICATIONS_SUCCESS,
    NOTIFICATIONS_FAILURE,
    NOTIFICATIONS_COUNT_RECEIVED,
    NOTIFICATIONS_DELETE_REQUEST,
    NOTIFICATIONS_DELETE_SUCCESS,
    NOTIFICATIONS_DELETE_FAILURE,
    NEW_NOTIFICATION,
} from './actionTypes.js';

function requestNotifications() {
    return {
        type: NOTIFICATIONS_REQUEST,
    }
}

function receiveNotifications(notifications) {
    return {
        type: NOTIFICATIONS_SUCCESS,
        notifications,
    }
}

function notificationsError(message) {
    return {
        type: NOTIFICATIONS_FAILURE,
        message,
    }
}

function resetRead() {
    return {
        type: NOTIFICATIONS_DELETE_SUCCESS,
    }
}

function notificationsCountReceived(data) {
    return {
        type: NOTIFICATIONS_COUNT_RECEIVED,
        data
    }
}

function requestNotificationsDelete() {
    return {
        type: NOTIFICATIONS_DELETE_REQUEST,
    }
}

function errorNotificationsDelete(message) {
    return {
        type: NOTIFICATIONS_DELETE_FAILURE,
        message,
    }
}

function notificationReceived(notification) {
    return {
        type: NEW_NOTIFICATION,
        notification
    }
}

export function fetchNotifications() {
    return (dispatch) => {
        dispatch(requestNotifications());
        return axiosMainApi({
            url: `notification`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveNotifications(response.data));
            } else {
                dispatch(notificationsError('Failed to get notifications'));
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(notificationsError(response && response.message));
        });
    }
}

export function deleteAllNotifications() {
    return (dispatch) => {
        dispatch(requestNotificationsDelete());
        return axiosMainApi({
            url: `notification`,
            method: 'delete'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveNotifications([]));
                dispatch(resetRead());
            } else {
                dispatch(errorNotificationsDelete('Failed to delete all notificaitons'));
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(errorNotificationsDelete(response && response.message));
        });
    }
}

export function markAllAsRead() {
    return (dispatch) => {
        return axiosMainApi({
            url: `notification/readall`,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(resetRead());
            } else {
                // Error
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            // Error
        });
    }
}

export function markAsRead(notification) {
    return (dispatch) => {
        if (notification.get('read')) {
            return;
        }
        return axiosMainApi({
            url: `notification`,
            method: 'post',
            data: {
                notificationId: notification.get('id'),
                actionType: notification.get('actionType'),
            },
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                //dispatch(updateMarkAsRead());
            } else {
                // Error
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            // Error
        });
    }
}

export function subscribeNotification() {
    return (dispatch) => {
        socket.subscribe('/notification', (data) => {
            dispatch(notificationReceived(data));
        }, (err) => {
            if (err) {
                console.log('Notification subsription error');
                return false;
            }
        });
    }
}

export function unSubscribeNotification() {
    return (dispatch) => {
        socket.unsubscribe('/notification', null, (err) => {
            if (err) {
                console.log('Notification unsubscription failed');
            }
        });
    }
}

export function subscribeNotificationsCount(loggedUserId) {
    return (dispatch) => {
        socket.subscribe('/notifications-unread-count', (data) => {
            dispatch(notificationsCountReceived(data));
        }, (err) => {
            if (err) {
                console.log('Notificatioins count subsription error');
                return false;
            }
        });
    }
}
