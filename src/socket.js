import * as io from 'socket.io-client';
import { chatMessages, addChatMsg, addNewOnlineUser, displayAllOnlineUsers, removeUserFromOnline } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on('chatMessages', msgs => store.dispatch(chatMessages(msgs)));
        socket.on('addChatMsg', msg => store.dispatch(addChatMsg(msg)));

        socket.on('userJoined', userInfo => store.dispatch(addNewOnlineUser(userInfo)));
        socket.on('allUsersOnline', users => store.dispatch(displayAllOnlineUsers(users)));
        socket.on('userLeft', userId => store.dispatch(removeUserFromOnline(userId)));
    }
};