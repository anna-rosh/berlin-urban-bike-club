import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";

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
        // if (!this.state.id) {
        //     return 'Loading...';
        // }

        return (
            <div>
                <img id="logo" src="/img/cat-4475583_640.png" alt="logo" />
                {this.state.first && (<p>hello, {this.state.first}</p>)}

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.img_url}
                    clickHandler={() =>
                        this.setState({ uploaderIsVisible: true })
                    }
                />

                {/* {this.state.uploaderIsVisible && <Uploader />} */}
            </div>
        );
    }
}