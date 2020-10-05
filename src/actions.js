import axios from './axios';

export async function receiveFriendsWannabes() {
    const { data } = await axios.get('/wannabes-friends');
    // console.log('data in get friends and wannabes: ', data);
    return {
        type: 'RECEIVE_FRIENDS_WANNABES',
        relatedUsers: data
    };
}

export async function acceptFriendRequest(id) {
    await axios.post("/accept-friend-request/" + id);

    return {
        type: 'ACCEPT_FRIEND_REQUEST',
        id
    };
}

export async function rejectRequest(id) {
    await axios.post("/end-friendship/" + id);

    return {
        type: "REJECT_REQUEST",
        id
    };
}

export async function unfriend(id) {
    await axios.post("/end-friendship/" + id);

    return {
        type: "UNFRIEND",
        id
    };
}