import { act } from "react-test-renderer";

export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = Object.assign({}, state, {
            relatedUsers: action.relatedUsers,
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.map((user) => {
                if (action.id == user.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "REJECT_REQUEST") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.filter(
                (user) => action.id != user.id
            ),
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.filter(
                (user) => action.id != user.id
            ),
        };
    }

    ////////////////////////////// PUBLIC CHAT ////////////////////////

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs,
        };
    }

    if (action.type == "ADD_CHAT_MSG") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg],
        };
    }

    //////////////////////////// FRIENDS OF FRIENDS //////////////////////////

    if (action.type == "RECEIVE_FRIENDS_OF_FRIEND") {
        state = Object.assign({}, state, {
            friendsOfFriend: action.friendsOfFriend,
        });
    }

    ////////////////////////// USERS ONLINE ////////////////////////////

    if (action.type == "DISPLAY_ALL_ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.users
        };
    }

    if (action.type == "ADD_NEW_ONLINE_USER") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, ...action.user]
        };
    }

    if (action.type == "REMOVE_USER_FROM_ONLINE") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(user => user.id != action.id)
        };
    }
        
    console.log("state.onlineUsers: ", state.onlineUsers);

    return state;
}