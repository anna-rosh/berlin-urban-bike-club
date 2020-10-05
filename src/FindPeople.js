import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from './axios';
import FriendButton from './FriendButton';

export default function FindPeople() {
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort;
        (async () => {
            try {
                const { data } = await axios.get(searchInput ? `/find-users/${searchInput}` : '/find-users');
                if (!abort) {
                    setUsers(data); 
                }

            } catch (err) {
                console.log('err in axios /find-users/input: ', err);
            }

            return () => {
                abort = true;
            };

        })();
        
    }, [searchInput]);


    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className="search-container">
            <div className="search-people-form">
                <label htmlFor="user-search">find friends:</label>
                <input
                    onChange={handleChange}
                    id="user-search"
                    type="text"
                    name="searchInput"
                /> 
            </div>
            

            {users.length == 0 ? (
                <p className="error-field">
                    no users found
                </p>
            ) : (
                <p className="error-field"></p>
            )}

            <div className="search-user-results-container">
                {users.map((user) => {
                    return (
                        <div className="search-user-result" key={user.id}>
                            <Link className="search-user-link" to={`/user/${user.id}`}>
                                <div className="search-user-profile-pic-container">
                                    <img
                                        className="profile-pic"
                                        src={user.img_url}
                                    />
                                </div>

                                <h2>
                                    {user.first} {user.last}
                                </h2>   
                            </Link>
                            <FriendButton currProfileId={user.id} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}