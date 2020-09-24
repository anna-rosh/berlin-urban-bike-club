import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/user')
            .then();
    }
    render() {
        if (!this.state.id) {
            return null;
        }

        return(
            <div>
                <p>LOGO</p>

                <ProfilePic 
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.image}
                    clickHandler={() => this.setState({uploaderIsVisible: true})}
                />

                {this.state.uploaderIsVisible && <Uploader />}
            </div>
        );
    }
}