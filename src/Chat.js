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
        <div>
            <h1>Chat Title</h1>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessages.map(message => {
                    return (
                        <div className="message-container" key={message.id}>
                            <div className="chat-user-container">
                                <div className="chat-profile-pic-container">
                                    <img className="chat-profile-pic" src={message.img_url} /> 
                                </div>
                                <p>{message.first} {message.last}:  </p>
                            </div>
                            <p>{message.message}</p>
                        </div>
                    );
                })}
            </div>
            <textarea placeholder="add your message here" onKeyDown={keyCheck}></textarea>
        </div>
    );
}