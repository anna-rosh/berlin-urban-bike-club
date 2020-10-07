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

export function chatMessages(msgs) {
    return {
        type: "CHAT_MESSAGES",
        msgs
    };
}

export function addChatMsg(msg) {
    return {
        type: "ADD_CHAT_MSG",
        msg
    };
}

export function deleteProfileById(id) {
    return {
        type: "DELETE_PROFILE_BY_ID",
        id
    };
}

export async function receiveFriendsOfFriend(profileId) {
    const { data } = await axios.get('/friends-of-friend/' + profileId);
    console.log("data in receiveFriendsOfFriend", data);
    
    return {
        type: "RECEIVE_FRIENDS_OF_FRIEND",
        friendsOfFriend: data
    };
}