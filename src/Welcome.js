import React from 'react';
import Registration from './Registration';
import Login from './Login';
import { HashRouter, Route } from "react-router-dom";
import ResetPassword from './ResetPassword';

export default function Welcome() {
    return (
        <div className="welcome-pages-container">
            <div className="welcome">
                <div className="welcome-container">
                   <h1 id="welcome-title">welcome to</h1>
                    <img id="logo-large" src="/img/bicycle.png" />
                    <div className="network-title-container">
                        <h1 id="bubc-title">berlin urban bike club</h1>
                        <h2>social network for berliners on bike</h2>
                    </div>  
                </div>
            </div>
            <HashRouter>
                <>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </>
            </HashRouter>
        </div>
    );
}