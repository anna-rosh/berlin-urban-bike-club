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

        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg]
        };
    }

    if (action.type == "DELETE_PROFILE_BY_ID") {
        console.log('action.id', action.id);
        
        if (state.relatedUsers) {
            state = {
                ...state,
                relatedUsers: state.relatedUsers.filter(user => action.id != user.id)
            };
        }

        if (state.chatMessages) {
            console.log(state.chatMessages.filter(message => message.user_id == action.id));
            state = {
                ...state,
                chatMessages: state.chatMessages.filter(message => message.user_id != action.id)
            };
        }

    }

    if (action.type == "RECEIVE_FRIENDS_OF_FRIEND") {
        state = Object.assign({}, state, {
            friendsOfFriend: action.friendsOfFriend,
        });
    }
        
    // console.log('state.chatMessages: ', state.chatMessages);

    return state;

}