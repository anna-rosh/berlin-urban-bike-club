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
            <div className="login-side">
                <div className="login-container">
                    <h1>log in</h1>

                    {this.state.error ? (
                        <p className="error-field">
                            something went wrong. please, try again.
                        </p>
                    ) : (
                        <p className="error-field"></p>
                    )}

                    <div className="login-form">
                        <label htmlFor="email-login">email address: </label>
                        <input
                            onChange={(e) => this.handleInputChange(e)}
                            name="email"
                            id="email-login"
                        />

                        <label htmlFor="password-login">password: </label>
                        <input
                            onChange={(e) => this.handleInputChange(e)}
                            name="password"
                            id="password-login"
                            type="password"
                        />

                        <button onClick={(e) => this.handleClick(e)}>
                            log in
                        </button>
                    </div>

                    <div className="link-container">
                        <Link className="link password-link" to="/password/reset/start">
                            reset password
                        </Link>
                        <Link className="link" to="/">⬅ to the registration page</Link>
                    </div>

                </div>
            </div>
        );
    }
}
