import React from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    handleInputChange(e) {
        this.setState({
            // files put into iput field with the type file are available not
            // in val property but in files property!!!!
            file: e.target.files[0],
        });

        document.querySelector('.upload-btn').innerHTML = '⬆ an image selected';
    }

    handleClick(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", this.state.file);

        axios.post('/upload-profile-picture', formData)
            .then(({ data }) => {
                if (data.error) {
                    this.setState(data);
                } else {
                    this.setState(data, () => this.props.setProfilePic(this.state.img_url));
                }
            })
            .catch(err => {
                console.log('err in POST /upload-profile-picture', err);
                this.setState({ error: true });
            });
    }

    closeMenu(e) {
        e.preventDefault();
        this.props.closeUploader(); 
    }

    async logout(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post('/logout');
            location.replace('/welcome');

        } catch(err) {
            console.log('err in axios post /logout');
        }
    }

    render() {
        return (
            <div className="uploader-component-container">
                <div
                    className="uploader-overlay"
                    onClick={(e) => this.closeMenu(e)}
                ></div>
                <div className="uploader-container">
                    <h3
                        className="close-uploader"
                        onClick={(e) => this.closeMenu(e)}
                    >
                        x
                    </h3>
                    <h1>menu</h1>
                    <h3>set new profile picture</h3>
                    {this.state.error ? (
                        <p className="error-field">
                            something went wrong. please, try again.
                        </p>
                    ) : (
                        <p className="error-field"></p>
                    )}

                    <div className="img-upload-container">
                        <input
                            id="profile-pic-input"
                            onChange={(e) => this.handleInputChange(e)}
                            type="file"
                            accept="image/*"
                            name="file"
                        />
                        <label
                            htmlFor="profile-pic-input"
                            className="upload-btn"
                        >
                            ⬆ choose an image
                        </label>
                        <button onClick={(e) => this.handleClick(e)}>
                            submit
                        </button>
                    </div>

                    {/* <div className="menu-link" onClick={(e) => this.closeMenu(e, '/')}>my profile</div>
                    <div className="menu-link" onClick={(e) => this.closeMenu(e, '/friends')}>friends</div>
                    <div className="menu-link" onClick={(e) => this.closeMenu(e, '/users')}>find people</div> */}

                    <div
                        className="menu-link-container"
                        onClick={(e) => this.closeMenu(e)}
                    >
                        <Link to="/" className="menu-link">
                            my profile
                        </Link>
                    </div>

                    <div
                        className="menu-link-container"
                        onClick={(e) => this.closeMenu(e)}
                    >
                        <Link to="/friends" className="menu-link">
                            friends
                        </Link>
                    </div>

                    <div
                        className="menu-link-container"
                        onClick={(e) => this.closeMenu(e)}
                    >
                        <Link to="/users" className="menu-link">
                            find peolpe
                            <img className="lens-img" src="/img/lens1.png" />
                        </Link>
                    </div>

                    <div
                        className="menu-link-container"
                        onClick={(e) => this.closeMenu(e)}
                    >
                        <Link to="/chat" className="menu-link">
                            community chat
                        </Link>
                    </div>

                    <div className="menu-link-container">
                        <div
                            className="menu-link"
                            onClick={(e) => this.logout(e)}
                        >
                            log out
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}