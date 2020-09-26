import axios from './axios';
import React from 'react';
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false
        };
    }

    handleInputChange(e) {
        // attribute name is accessible: e.target.name
        let name = e.target.name;
        // e.target.value => the way to access the input value the user is giving
        this.setState({
            [name]: e.target.value,
        });

    }

    handleClick(e) {
        e.preventDefault();

        axios.post('/register', this.state)
            .then((resp) => {

                if (resp.data.error) {
                    this.setState({
                        error: true
                    });
                } else {
                    location.replace('/');  
                }

            })
            .catch(err => {
                console.log('err in POST request in registration: ', err);
            });

    }

    render() {
        return (
            <div className="registration-side">
                <div className="registration-form">
                    <h1>register now: </h1>

                    {this.state.error
                        ? <p className="error-field">
                        something went wrong. please, try again.
                        </p> 
                        : <p className="error-field"></p>
                    }

                    <label htmlFor="first-reg">first name: </label>
                    
                    <input
                        onChange={(e) => this.handleInputChange(e)}
                        name="first"
                        id="first-reg"
                    />

                    <label htmlFor="last-reg">last name: </label>
                    <input
                        onChange={(e) => this.handleInputChange(e)}
                        name="last"
                        id="last-reg"
                    />

                    <label htmlFor="email-reg">email address: </label>
                    <input
                        onChange={(e) => this.handleInputChange(e)}
                        name="email"
                        id="email-reg"
                    />

                    <label htmlFor="password-reg">password: </label>
                    <input
                        onChange={(e) => this.handleInputChange(e)}
                        name="password"
                        id="password-reg"
                    />

                    <button onClick={(e) => this.handleClick(e)}>register</button>

                    <Link to="/login">click here to log in</Link> 
                </div>
                
            </div>
        );
    }
}