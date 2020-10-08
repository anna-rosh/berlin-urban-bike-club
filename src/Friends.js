import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, rejectRequest, unfriend } from './actions';

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state => state.relatedUsers && state.relatedUsers.filter(
            user => user.accepted
        )
    );

    const wannabes = useSelector(
        state => state.relatedUsers && state.relatedUsers.filter(
            user => !user.accepted
        )
    );

    useEffect(() => {
        console.log('Friends component mounted!');
        dispatch(receiveFriendsWannabes());
    }, []);


    return (
        <div className="wannabes-friends-container">
            {wannabes && (<div className="wannabes-container">
                <h1>friend requests</h1>
                {wannabes.length == 0 && <p>no friend requests</p>}
                {wannabes.map((wannabe) => {
                    return (
                        <div  className="wannabe-container" key={wannabe.id}>
                            <Link to={`/user/${wannabe.id}`} className="friends-profile-pic-container">
                                <img
                                    className="profile-pic"
                                    src={wannabe.img_url}
                                />
                            </Link>
                            <div className="wannabe-text-container">
                                <Link className="friend-link" to={`/user/${wannabe.id}`}><h2>{wannabe.first} {wannabe.last}</h2></Link>
                                <div className="request-links-container">
                                    <p onClick={(() => dispatch(acceptFriendRequest(wannabe.id)))}>accept friend request</p>
                                    <p onClick={(() => dispatch(rejectRequest(wannabe.id)))}>reject request</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>)}
            {friends && (
                <div className="friends-container">
                    <h1>friends</h1>
                    {friends.length == 0 && <p>no friends yet</p>}
                    {friends.map((friend) => {
                        return (
                            <div className="friend-container" key={friend.id}>
                                <Link to={`/user/${friend.id}`} className="friends-profile-pic-container">
                                    <img
                                        className="profile-pic"
                                        src={friend.img_url}
                                    />
                                </Link>
                                <div className="friend-text-container">
                                    <Link className="friend-link" to={`/user/${friend.id}`}><h2>{friend.first} {friend.last}</h2></Link>
                                    <div className="request-links-container">
                                        <p onClick={(() => dispatch(unfriend(friend.id)))}>end friendship</p>
                                    </div>
                                </div>
                                    
                            </div>
                        )
                    })}
                </div>
            )}
            
            
        </div>
    );
}