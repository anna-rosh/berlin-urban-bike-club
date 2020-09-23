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
            <div>
                <h3>Register here:</h3>

                {this.state.error && (
                    <p className="error">
                        something went wrong. please, try again.
                    </p>
                )}

                <label htmlFor="first">first name: </label>
                {/* if i am using the event obj i need to pass it to the function while calling it */}
                <input
                    onChange={(e) => this.handleInputChange(e)}
                    name="first"
                    placeholder="first name"
                />

                <label htmlFor="last">last name: </label>
                <input
                    onChange={(e) => this.handleInputChange(e)}
                    name="last"
                    placeholder="last name"
                />

                <label htmlFor="email">email address: </label>
                <input
                    onChange={(e) => this.handleInputChange(e)}
                    name="email"
                    placeholder="email address"
                />

                <label htmlFor="password">password: </label>
                <input
                    onChange={(e) => this.handleInputChange(e)}
                    name="password"
                    placeholder="password"
                />

                <button onClick={(e) => this.handleClick(e)}>register</button>

                <Link to="/login">click here to log in</Link>
            </div>
        );
    }
}