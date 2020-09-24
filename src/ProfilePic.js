import React from "react";

export default function({imageUrl, first, last, clickHandler}) {
    return (
        <img id="profile-pic" src={imageUrl} alt={`${first} ${last}`} onClick={clickHandler} />
    );
}