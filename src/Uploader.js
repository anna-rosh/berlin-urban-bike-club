import React from "react";
import axios from "./axios";

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

    render() {
        return (
            <div>
                <p>choose an image to set your new profile picture</p>
                {this.state.error && (
                    <p className="error">
                        no image chosen
                    </p>
                )}

                <input
                    onChange={(e) => this.handleInputChange(e)}
                    type="file"
                    accept="image/*"
                    name="file"
                />

                <button onClick={(e) => this.handleClick(e)}>submit</button>
            </div>
        );
    }

}