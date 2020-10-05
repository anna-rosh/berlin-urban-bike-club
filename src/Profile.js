import React from "react";
import ProfilePic from './ProfilePic';
import BioEditor from "./BioEditor";

export default function({first, last, imageUrl, clickHandler, bio, setBio}) {
    return (
        <div className="profile-container">
            <div className="profile-pic-section">
                <div className="large-profile-pic-container logged-in-user-profile-pic-container">
                    <ProfilePic
                        first={first}
                        last={last}
                        imageUrl={imageUrl}
                        clickHandler={clickHandler}
                    />
                </div> 
            </div>
            
            <div className="profile-text-container">
                <h1>{first} {last}</h1>

                <BioEditor
                    bio={bio}
                    setBio={setBio}
                /> 
            </div>
        </div>
    );
}