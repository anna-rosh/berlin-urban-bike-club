import React from 'react';
import axios from './axios';
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            currentlyDisplayed: 1
        };
    }

    handleInputChange(e) {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();

        axios.post('/password/reset/start', this.state)
            .then((resp) => {
                if (resp.data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        currentlyDisplayed: 2,
                    });
                    
                }
            })
            .catch(err => console.log('err in POST request in ResetPW: ', err));
    }

    handleClickOnReset(e) {
        e.preventDefault();

        let data = {
            code: this.state.code,
            password: this.state.password,
            email: this.state.email
        };

        axios.post('/password/reset/verify', data)
            .then((resp) => {
                if(resp.data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        currentlyDisplayed: 3,
                    });
                }
            })
            .catch(err => console.log('err in post request in ResetPW: ', err));
    }

    render() {
        return (
            <div>
                <h3>reset password</h3>
                {/* FIRST DISPLAY *******  FIRST DISPLAY  ******** FIRST DISPLAY */}
                {this.state.currentlyDisplayed == 1 && (
                    <>
                        {this.state.error && (
                            <p className="error">
                                please, use a valid email address
                            </p>
                        )}
                        <label htmlFor="email-reset-password">
                            enter your email address:
                        </label>
                        <input
                            onChange={(e) => this.handleInputChange(e)}
                            name="email"
                            id="email-reset-password"
                            placeholder="email address"
                        />

                        <button onClick={(e) => this.handleClick(e)}>
                            get a code
                        </button>
                    </>
                )}

                {/* SECOND DISPLAY ********** SECOND DISPLAY *********** SECOND DISPLAY */}
                {this.state.currentlyDisplayed == 2 && (
                    <>
                        {this.state.error && (
                            <p className="error">
                                something went wrong. please, try again.
                            </p>
                        )}

                        <label htmlFor="reset-code">
                            enter the code you received:
                        </label>
                        <input
                            onChange={(e) => this.handleInputChange(e)}
                            name="code"
                            id="reset-code"
                            placeholder="code"
                        />

                        <label htmlFor="new-password">
                            enter your new password:
                        </label>
                        <input
                            onChange={(e) => this.handleInputChange(e)}
                            name="password"
                            id="new-password"
                            placeholder="new-password"
                        />

                        <button onClick={(e) => this.handleClickOnReset(e)}>
                            reset password
                        </button>
                    </>
                )}

                {this.state.currentlyDisplayed == 3 && (
                    <>
                        <h1>your password was successfully reset!</h1>
                        <Link to="/login">click here to log in with the new password</Link>
                    </>
                )}
            </div>
        );
        
    }
}