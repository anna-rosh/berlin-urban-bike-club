import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    return (
        <div className="users-online-container">
            <h3>users online:</h3>
            {onlineUsers && onlineUsers.map(user => {
                return (
                    <Link className="online-user-container" key={user.id} to={`/user/${user.id}`}>
                        <div className="online-user-profile-pic-container">
                            <img className="profile-pic" src={user.img_url} />
                        </div>
                        <p>{user.first} {user.last}</p>
                    </Link>
                );
            })}
        </div>
    );
}