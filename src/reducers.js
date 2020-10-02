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

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            relatedUsers: state.relatedUsers.filter(user => action.id != user.id)
        };
    }

    // console.log('state.relatedUsers: ', state.relatedUsers);

    return state;
}