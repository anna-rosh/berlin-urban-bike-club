import React from "react";

export default function({imageUrl, first, last, clickHandler}) {
    return (
        <img src={imageUrl} alt={`${first} ${last}`} onClick={clickHandler} />
    )
}