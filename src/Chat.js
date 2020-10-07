import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


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

    // if there are no messages, give the logged in user a possibility to write the first message!
    if (!chatMessages) {
        return (
            <div className="chat-container">
                <h1>community chat</h1>
                <div className="chat-messages-container" ref={elemRef}></div>

                <div className="chat-message-form">
                    <label htmlFor="chat-message-textarea">your message:</label>
                    <textarea id="chat-message-textarea" onKeyDown={keyCheck}></textarea>
                </div>  
            </div>
        );
    }

    return (
        <div className="chat-container">
            <h1>community chat</h1>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessages.map(message => {
                    return (
                        <div className="message-container" key={message.id}>
                            <Link className="chat-profile-pic-container" to={`/user/${message.user_id}`}>
                                <img className="chat-profile-pic" src={message.img_url} /> 
                            </Link>
                            <div className="user-message">
                                <p><Link className="chat-user-link" to={`/user/${message.user_id}`}>{message.first} {message.last}:</Link> {message.message}</p>
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
    ); // closes return statement

} // closes the hook