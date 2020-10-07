import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {

        (async() => {
            try {
                const { data } = await axios.get('/initial-friendship-status/' + props.currProfileId);
                setButtonText(data.buttonText);
            } catch (err) {
                console.log('err in axios get /initial-friendship-status/..', err);
            }
            
        })();

    }, [buttonText]);

    const handleClick = async () => {
        if (buttonText == 'send friend request') {
            try {
                const { data } = await axios.post('/send-friend-request/' + props.currProfileId);
                console.log('data in post - send fr. req.: ', data);
                setButtonText(data.buttonText);

            } catch (err) {
                console.log('err in POST send fr. request: ', err);
            }
            
        } else if (buttonText == 'cancel friend request' || buttonText == 'end friendship') {
            try {
                const { data } = await axios.post('/end-friendship/' + props.currProfileId);
                console.log('data in post - end friendship: ', data);
                setButtonText(data.buttonText);

            } catch (err) {
                console.log('err in POST end friendship: ', err);
            }

        } else {
            try {
                const { data } = await axios.post('/accept-friend-request/' + props.currProfileId);
                console.log('data in accept friend request: ', data);
                setButtonText(data.buttonText);

            } catch (err) {
                console.log('err in POST accept friend request: ', err);
            }
        }

    }; // closes handleClick

    return(
        <button onClick={handleClick} className="friend-btn">{buttonText}</button>
    );
}