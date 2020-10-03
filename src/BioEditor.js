import React from 'react';
import axios from './axios';

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIsVisible: true,
            textareaIsVisible: false,
            error: false,
        }; 
    }

    showTextarea(e) {
        e.preventDefault();
        this.setState({ 
            textareaIsVisible: true,
            buttonIsVisible: false
        })
    }

    handleInputChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    saveText(e) {
        e.preventDefault();
        const newBio = {
            bio: this.state.bio
        }
        axios.post('/update-bio', newBio)
            .then(({ data }) => {
                if (data.error) {
                    this.setState(data);
                } else {
                    this.setState( {
                        data,
                        textareaIsVisible: false,
                        buttonIsVisible: true
                    }, () => this.props.setBio(this.state.bio));
                }
            })
            .catch(err => {
                console.log('err in POST /update-bio: ', err);
                this.setState({ error: true });
            })
    }

    render() {

        if (!this.props.bio) {
           return (
               <div className="bio-container">
                   {this.state.error && (
                       <p className="error">something went wrong. please, try again</p>
                   )}

                   {this.state.buttonIsVisible && (
                       <p className="add-bio-btn" onClick={(e) => this.showTextarea(e)}>add bio</p>
                   )}
                   {this.state.textareaIsVisible && (
                       <div className="bio-editor">
                           <label htmlFor="bio-field">add your bio</label>
                           <textarea
                               onChange={(e) => this.handleInputChange(e)}
                               id="bio-field"
                               name="bio"
                           ></textarea>
                           <button className="save-bio-btn" onClick={(e) => this.saveText(e)}>
                               save
                           </button>
                       </div>
                   )}
               </div>
           );

        } 
        else {
            return (
                <div className="bio-container">
                    {this.state.error && (
                       <p className="error">something went wrong. please, try again</p>
                    )}

                    {this.state.buttonIsVisible && (
                        <>
                        <p className="bio">{this.props.bio}</p>
                        <p className="edit-bio-btn" onClick={(e) => this.showTextarea(e)}>edit bio</p>
                        </>
                    )}
                    
                    {this.state.textareaIsVisible && (
                            <div className="bio-editor">
                                <label htmlFor="bio-field">bio</label>
                                <textarea
                                    onChange={(e) => this.handleInputChange(e)}
                                    id="bio-field"
                                    name="bio"
                                >{this.props.bio}</textarea>
                                <button className="save-bio-btn" onClick={(e) => this.saveText(e)}>
                                    save changes
                                </button>
                            </div>
                    )}
                </div>
            );
        }
    }

}