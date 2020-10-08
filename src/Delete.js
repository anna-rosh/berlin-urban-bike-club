import { async } from 'crypto-random-string';
import React, { useState } from 'react';
import axios from './axios';


export default function Delete() {
    const [showAreYouSure, setShowAreYouSure] = useState(false);


    const handleClickOnDelete = (e) => {
        e.preventDefault();
        setShowAreYouSure(true);
    };

    const handleClickOnNo = (e) => {
        e.preventDefault();
        setShowAreYouSure(false);
    }

    const handleClickOnYes = async (e) => {
        e.preventDefault();
        console.log('yes was clicked!');

        try {
            await axios.post('/delete-profile');
            location.replace('/welcome');

        } catch(err) {
            console.log('err in axios POST /delete-profile', err);
        }
    } 


    return (
        <>
            <p onClick={handleClickOnDelete} className="delete-profile-btn" >delete my profile</p>
            {showAreYouSure && (
                <>
                 <div className="are-you-sure-overlay" onClick={handleClickOnNo}></div>
                 <div className="are-you-sure-container">
                     <h2>you are trying to delete your profile. are you sure?</h2>
                     <div className="ays-btn-container">
                        <div className="ays-btn" onClick={handleClickOnNo}>no</div>
                        <div className="ays-btn" onClick={handleClickOnYes}>yes</div>
                     </div>
                     
                 </div>
                </>
            )}
        </>
    );
}