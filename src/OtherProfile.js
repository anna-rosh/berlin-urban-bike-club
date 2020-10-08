import React from "react";
import axios from "./axios";
import FriendButton from "./FriendButton";
import FriendsOfFriend from "./FriendsOfFriend";

export default class OtherProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                // console.log('data in from the get req: ', data);
                if (data.currUserId === data.id || data.error) {
                    this.props.history.push("/");
                } else {
                    this.setState(data); 
                }
            })
            .catch(err => console.log('err in GET /api/user/id', err));

        axios
            .get(`/friendship-status/${this.props.match.params.id}`)
            .then(({ data }) => {
                // console.log("data in friendship-status: ", data);
                if (data.accepted) {
                    this.setState({ friends: true });
                }
            })
            .catch((err) => console.log("err in GET /friendship-status/id: ", err));
    }

    render() {
        const { first, last, bio, img_url, id } = this.state;

        if (!first) {
            return 'Loading...';
        }

        return (
            <div className="profile-container">
                <div className="profile-pic-section">
                    <div className="large-profile-pic-container">
                        <img className="profile-pic" src={(img_url)} alt={`${first} ${last}`} /> 
                    </div>
                </div>
                
                <div className="profile-text-container other-profile-text-container">
                    <div>
                        <h1>{first} {last}</h1>
                        <p>{bio}</p>
                    </div>
                    <FriendButton currProfileId={this.state.id} />
                </div>
                

                {this.state.friends && <FriendsOfFriend profileId={id} first={first} last={last} />}
            </div>
        );

    }
}