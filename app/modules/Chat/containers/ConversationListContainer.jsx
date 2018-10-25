import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ConversationList from '../components/ConversationList.jsx';

import { fetchConversations, subscribeChat, unSubscribeChat } from  '../actions/chat.js';

const mapStateToProps = (state, props) => {
    const chatState = state.get('chat');

    return {
        conversations: chatState.get('conversations'),
        loggedUser: state.getIn(['auth', 'user']),
    };
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchConversations () {
            dispatch(fetchConversations());
        },
        subscribeChat (loggedUserId) {
            dispatch(subscribeChat(loggedUserId));
        },
        unSubscribeChat () {
            dispatch(unSubscribeChat());
        }

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationList));
