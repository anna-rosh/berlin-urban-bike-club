import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector } from "react-redux";


export default function Chat() {
    const elemRef = useRef();    
    const chatMessages = useSelector((state) => state && state.chatMessages);

    useEffect(() => {
        if (elemRef.current) {
            elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
        
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit('new message typed', e.target.value);
            e.target.value = "";
        }
    };


    if (!chatMessages) {
        return "Loading...";
    }

    return (
        <div className="chat-container">
            <h1>community chat</h1>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessages.map(message => {
                    return (
                        <div className="message-container" key={message.id}>
                            <div className="chat-profile-pic-container">
                                <img className="chat-profile-pic" src={message.img_url} /> 
                            </div>
                            <div className="user-message">
                                <p><span>{message.first} {message.last}:</span> {message.message}</p>
                                <p className="date">{message.created_at}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="chat-message-form">
                <label htmlFor="chat-message-textarea">your message:</label>
                <textarea id="chat-message-textarea" onKeyDown={keyCheck}></textarea>
            </div>  
        </div>
    );
}