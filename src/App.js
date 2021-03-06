import React from "react";
import axios from "./axios";
import Uploader from "./Uploader";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Chat from "./Chat"
import { BrowserRouter, Route, Link } from 'react-router-dom';


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
            <BrowserRouter>
                <>
                    {/* header is an unchanged element throughout the app (logged in) */}
                    <header className="app-header">
                        <div className="header-content">
                            <Link className="logo-title-container" to="/">
                                <img id="logo" src="/img/bicycle.png" />
                                <h3>berlin urban bike club</h3>
                            </Link>

                            <div className="app-header-nav">
                                <Link className="chat-link" to="/chat">
                                    <img
                                        className="chat-img"
                                        src="/img/chat.png"
                                    />
                                </Link>
                                <Link className="friends-link" to="/friends">
                                    <div className="friends-img-container">
                                        <img
                                            className="friends-img"
                                            src="/img/friends.png"
                                        />
                                    </div>
                                </Link>
                                <Link className="search-users-link" to="/users">
                                    <img
                                        className="lens-img"
                                        src="/img/lens1.png"
                                    />
                                </Link>

                                <div className="profile-pic-container">
                                    <ProfilePic
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.img_url}
                                        clickHandler={() =>
                                            this.setState({
                                                uploaderIsVisible: true,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="app-container">
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
                        <Route path="/users" render={() => <FindPeople />} />
                        <Route
                            path="/friends"
                            render={(props) => (
                                <Friends
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/chat"
                            render={(props) => (
                                <Chat
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setProfilePic={(newPic) => {
                                this.setState({
                                    img_url: newPic,
                                    uploaderIsVisible: false,
                                });
                            }}
                            closeUploader={() => {
                                this.setState({
                                    uploaderIsVisible: false,
                                });
                            }}
                        />
                    )}
                </>
            </BrowserRouter>
        );
    }
}