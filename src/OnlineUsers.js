import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    return (
        <div className="users-online-container">
            <h3>users online:</h3>
            {onlineUsers && onlineUsers.map(user => {
                return (
                    <div className="online-user-container" key={user.id}>
                        <p>{user.first} {user.last}</p>
                    </div>
                );
            })}
        </div>
    );
}