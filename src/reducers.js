export default function(state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        state = Object.assign({}, state, {
            relatedUsers: action.relatedUsers
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.map(user => {
                if (action.id == user.id) {
                    
                    return {
                        ...user, 
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "REJECT_REQUEST") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.filter(user => action.id != user.id)
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.filter(user => action.id != user.id)
        };
    }

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs
        };
    }

    if (action.type == "ADD_CHAT_MSG") {

        console.log('action.msg', action.msg);
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg]
        };
    }

    // console.log('state.chatMessages: ', state.chatMessages);

    return state;
}