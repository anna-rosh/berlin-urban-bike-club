import React from "react";
import ProfilePic from './ProfilePic';
import BioEditor from "./BioEditor";

export default function({first, last, imageUrl, clickHandler, bio, setBio}) {
    return (
        <>
            <ProfilePic
                first={first}
                last={last}
                imageUrl={imageUrl}
                clickHandler={clickHandler}
            />

            <img
                id="large-profile-pic"
                src={imageUrl}
                alt={`${first} ${last}`}
            />

            <h1>{first} {last}</h1>

            <BioEditor
                bio={bio}
                setBio={setBio}
            />
        </>
    );
}