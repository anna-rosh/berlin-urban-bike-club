import axios from './axios';
import React from 'react';
import { Link } from "react-router-dom";

export default class Login extends React.Component {
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

        axios.post('/login', this.state)
            .then((resp) => {

                if (resp.data.error) {
                    this.setState({
                        error: true
                    });
                } else {
                    location.replace('/');
                }
            })
    }

    render() {
        return (
            <>
                <h3>log in</h3>
                
                {this.state.error && (
                    <p className="error">
                        something went wrong. please, try again.
                    </p>
                )}

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

                <button onClick={(e) => this.handleClick(e)}>log in</button>

                <Link to="/login">to the registration page</Link>
            </>
        );
    }
}
