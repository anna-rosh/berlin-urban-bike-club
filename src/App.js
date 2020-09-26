import React from "react";
import axios from "./axios";
import Uploader from "./Uploader";
import Profile from "./Profile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }

    componentDidMount() {
        axios.get('/user')
            .then(({ data }) => {
                this.setState({
                    ...data,
                    img_url: data.img_url || '/img/default-pic.png'
                });
            });
    }

    render() {
        if (!this.state.id) {
            return 'Loading...';
        }

        return (
            <div>
                <img id="logo" src="/img/bicycle.png" alt="logo" />

                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.img_url}
                    bio={this.state.bio}
                    setBio={(newBio) => 
                        this.setState({ bio: newBio })
                    }
                    clickHandler={() =>
                        this.setState({ uploaderIsVisible: true })
                    }
                />

                {this.state.uploaderIsVisible && <Uploader
                    setProfilePic={(newPic) => {
                        this.setState({
                            img_url: newPic,
                            uploaderIsVisible: false
                        });
                    }}
                />}
            </div>
        );
    }
}