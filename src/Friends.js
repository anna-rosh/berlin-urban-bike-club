import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from './actions';

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

    // console.log('wannabes: ', wannabes);
    // console.log('friends: ', friends);

    useEffect(() => {
        console.log('Friends component mounted!');
        dispatch(receiveFriendsWannabes());
    }, []);


    return (
        <>
            {wannabes && (<div className="wannabes-container">
                <h1>friend requests</h1>
                {wannabes.map((wannabe) => {
                    return (
                        <div className="wannabe-container" key={wannabe.id}>
                            <div className="friends-profile-pic-container">
                                <img
                                    className="profile-pic"
                                    src={wannabe.img_url}
                                />
                            </div>
                            <div className="friend-text-container">
                                <h2>{wannabe.first} {wannabe.last}</h2>
                                <p onClick={(() => dispatch(acceptFriendRequest(wannabe.id)))}>accept friend request</p>
                            </div>
                            
                        </div>
                    );
                })}
            </div>)}
            {friends && (
                <div className="friends-container">
                    <h1>friends</h1>
                    {friends.map((friend) => {
                            return (
                                <div className="friend-container" key={friend.id}>
                                    <div className="friends-profile-pic-container">
                                        <img
                                            className="profile-pic"
                                            src={friend.img_url}
                                        />
                                    </div>
                                    <div className="friend-text-container">
                                        <h2>{friend.first} {friend.last}</h2>
                                        <p onClick={(() => dispatch(unfriend(friend.id)))}>end friendship</p>
                                    </div>
                                    
                                </div>
                            )
                    })}
                </div>
            )}
            
            
        </>
    );
}