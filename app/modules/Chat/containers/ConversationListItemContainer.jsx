import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import ConversationListItem from '../components/ConversationsListItem.jsx';
import { setCurrentConversationId  } from  '../actions/chat.js';

const mapStateToProps = (state, ownProps) => {
    return {
        conversation: ownProps.conversation,
        message: ownProps.message,
        loggedUser: ownProps.loggedUser,
        isActive: ownProps.isActive,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openConversation () {
            const id = ownProps.conversation.get('id');
            const path = `/dashboard/chat/${id}`;
            dispatch(setCurrentConversationId(id));
            dispatch(replace(path));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationListItem);
