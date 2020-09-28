import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // otherUsers: []
        };
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

        // axios.get('/all-users')
        //     .then(({ data }) => {
        //         for (let i = 0; i < data.length; i++) {
        //             this.state.otherUsers.push(data[i]);
        //         }

        //         console.log("this.state.otherUsers: ", this.state.otherUsers);

        //     })
        //     .catch(err => console.log('err in GET /all-users: ', err));
    }

    render() {
        const { first, last, bio, img_url, currUserId, id, otherUsers } = this.state;

        if (!first) {
            return 'Loading...';
        }

        return (
            <>
                <h1>
                    {first} {last}
                </h1>
                <p>{bio}</p>
                <img
                    src={(img_url)}
                    alt={`${first} ${last}`}
                />
            </>
        );

    }
}