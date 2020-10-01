import React from "react";
import axios from "./axios";
import FriendButton from "./FriendButton";

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
    }

    render() {
        const { first, last, bio, img_url } = this.state;

        if (!first) {
            return 'Loading...';
        }

        return (
            <>
                <div className="large-profile-pic-container">
                   <img className="profile-pic" src={(img_url)} alt={`${first} ${last}`} /> 
                </div>
                
                <h1>
                    {first} {last}
                </h1>
                <p>{bio}</p>
                <FriendButton currProfileId={this.state.id} />
            </>
        );

    }
}