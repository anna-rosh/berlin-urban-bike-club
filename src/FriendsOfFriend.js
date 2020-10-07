import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveFriendsOfFriend } from './actions';

export default function FriendsOfFriend(props) {
    const dispatch = useDispatch();
    const friendsOfFriend = useSelector((state) => state && state.friendsOfFriend);

    useEffect(() => {
        console.log('FriendsOfFriend component mouted!');
        dispatch(receiveFriendsOfFriend(props.profileId));
    }, []);

    if (!friendsOfFriend) {
        return 'Loading';
    }

    return (
        <div className="friends-of-friend-component-container">
            <h1>FRIENDS OF FRIEND</h1>
            {friendsOfFriend.map((friend) => {
                return (
                    <div className="friends-of-friend-container" key={friend.id}>
                        <p>{friend.first} {friend.last}</p>
                    </div>
                );
            })}
        </div>
    ); // closes return statement
} // closes the hook