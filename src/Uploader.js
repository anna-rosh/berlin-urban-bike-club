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

    render() {
        return (
            <div className="uploader-overlay">
                <div className="uploader-container">
                    <h3 className="close-uploader" onClick={(e) => this.closeMenu(e)}>x</h3>
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

                    <Link to="/" className="menu-link">my profile</Link>
                    <Link to="/friends" className="menu-link">friends</Link>
                    <Link to="/users" className="menu-link">find people</Link>
                </div>
            </div>
        );
    }

}