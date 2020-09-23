import React from 'react';
import axios from './axios';

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            currentlyDisplayed: 1
        };
    }

    handleInputChange() {
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

    render() {
        return (
            <div>
                <h3>reset password</h3>
                {/* FIRST DISPLAY *******  FIRST DISPLAY  ******** FIRST DISPLAY */}
                {this.state.currentlyDisplayed == 1 && (
                    <>
                        <label htmlFor="email-reset-password">
                            please enter your email address:{" "}
                        </label>
                        <input
                            onChange={(e) => this.handleInputChange(e)}
                            name="email" id="email-reset-password"
                            placeholder="email address"/>

                        <button onClick={(e) => this.handleClick(e)}>reset password</button>
                    </>
                )}
            </div>
        );
        
    }
}