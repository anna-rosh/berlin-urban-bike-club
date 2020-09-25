import React from 'react';
import axios from './axios';

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIsVisible: true,
            textareaIsVisible: false,
        }; 
    }

    addBio(e) {
        e.preventDefault();
        this.setState({ 
            textareaIsVisible: true,
            buttonIsVisible: false
        })
    }

    render() {

        if (!this.props.bio) {
           return(
                <>
                    {this.state.buttonIsVisible && (
                        <p onClick={(e) => this.addBio(e)}>add bio</p>
                    )}
                    {this.state.textareaIsVisible && (
                        <div>
                            <label htmlFor="bio-field">bio</label>
                            <textarea id="bio-field" name="bio"></textarea>
                            <button>save</button>
                        </div>  
                    )}
                </> 
            );

        } 
        // else {
        //     return (
        //         <>
        //             {this.buttonIsVisible && (
        //                 <p onClick={(e) => addBio(e)}></p>
        //             )}
        //             {this.textareaIsVisible && (
        //                 <div>
        //                     <label for="bio-field"></label>
        //                     <textarea id="bio-field" name="bio"></textarea>
        //                 </div>
        //             )}
        //         </>
        //     );
        }

}