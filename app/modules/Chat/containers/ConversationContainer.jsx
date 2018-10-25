import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { replace } from 'react-router-redux';

import Conversation from '../components/Conversation.jsx';

import {
    markMessagesAsRead,
    fetchConversations,
    setCurrentConversationId
} from  '../actions/chat.js';
import { fetchCandidatesListForChat } from '../../Candidates/actions/list.js';

const mapStateToProps = (state, props) => {
    const { params } = props.match;
    const loggedUser = state.getIn(['auth', 'user']);
    const chatState = state.get('chat');
    const currentConversationId = chatState.get('currentConversationId') || (params.id || null);
    const currentConversation = chatState.get('conversations').find(
        c => c.get('id') === currentConversationId
    );
    const candidatesState = state.get('candidates');
    const candidates = candidatesState.getIn(['byCandidateType', 'hired']);
    return {
        loggedUser,
        conversation: currentConversation,
        conversations: chatState.get('conversations'),
        newConversation: chatState.get('newConversation'),
        isFetching: chatState.get('fetching'),
        disableMessageSendButton: false,
        candidates: candidates ? candidates.get('candidates') : null
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        markMessagesAsRead (conversationId) {
            dispatch(markMessagesAsRead(conversationId))
        },
        replaceUrl (url) {
            dispatch(replace(url));
        },
        fetchConversations () {
            dispatch(fetchConversations());
        },
        fetchCandidatesListForChat (job, type) {
            dispatch(fetchCandidatesListForChat(job, type));
        },
        setCurrentConversationId (currentConversationId) {
            dispatch(setCurrentConversationId(currentConversationId))
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversation));
