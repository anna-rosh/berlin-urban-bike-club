import React from "react";

export default function({imageUrl, first, last, clickHandler}) {
    return (
        <div>
            {first && (<p>hello, {first}</p>)}
            <img id="profile-pic" src={imageUrl} alt={`${first} ${last}`} onClick={clickHandler} />
        </div>
    );
}