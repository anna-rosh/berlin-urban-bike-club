import React from "react";
import axios from "./axios";
import Uploader from "./Uploader";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic"
import OtherProfile from "./OtherProfile"
import { BrowserRouter, Route } from 'react-router-dom'; 

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
            <>
                {/* header is an unchanged element throughout the app (logged in) */}
                <header className="app-header">
                    <img id="logo" src="/img/bicycle.png" alt="logo" />
                    <p>berlin urban bike club</p>
                    <div className="profile-pic-container">
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.img_url}
                            clickHandler={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                </header>

                <BrowserRouter>
                    <div className="app-profile-container">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.img_url}
                                    bio={this.state.bio}
                                    setBio={(newBio) =>
                                        this.setState({ bio: newBio })
                                    }
                                    clickHandler={() =>
                                        this.setState({
                                            uploaderIsVisible: true,
                                        })
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>

                {/* <div className="app-profile-container">
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.img_url}
                        bio={this.state.bio}
                        setBio={(newBio) => this.setState({ bio: newBio })}
                        clickHandler={() =>
                            this.setState({ uploaderIsVisible: true })
                        }
                    />
                </div> */}

                {this.state.uploaderIsVisible && (
                    <Uploader
                        setProfilePic={(newPic) => {
                            this.setState({
                                img_url: newPic,
                                uploaderIsVisible: false,
                            });
                        }}
                    />
                )}
            </>
        );
    }
}