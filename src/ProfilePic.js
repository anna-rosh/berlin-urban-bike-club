import React from "react";

export default function({imageUrl, first, last, clickHandler}) {
    return (
        <div>
            <img className="profile-pic" src={imageUrl} alt={`${first} ${last}`} onClick={clickHandler} />
        </div>
    );
}