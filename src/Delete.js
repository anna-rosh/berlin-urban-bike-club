import React from 'react';
import { useDispatch } from 'react-redux';
import axios from './axios';
import { deleteProfileById } from './actions';

export default function Delete() {
    const dispatch = useDispatch();
    
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/delete-profile');
            console.log('data of the deleted profile: ', data);
            
            dispatch(deleteProfileById(data.userId));
            location.replace("/welcome");

        } catch (err) {
            console.log('err in handleClick in delete component: ', err);
        }

        
    };


    return (
        <p onClick={handleClick}>delete my profile</p>
    );
}