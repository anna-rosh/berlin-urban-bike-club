import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <h2>friends of {props.first}</h2>
            {friendsOfFriend.map((friend) => {
                return (
                    <Link className="friends-of-friend-container" key={friend.id} to={`/user/${friend.id}`}>
                        <div className="friend-of-friend-profile-pic-container">
                            <img className="profile-pic" src={friend.img_url} />
                        </div>
                        <p>{friend.first} {friend.last}</p>
                    </Link>
                );
            })}
        </div>
    ); // closes return statement
} // closes the hook