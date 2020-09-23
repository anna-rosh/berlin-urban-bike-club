import React from 'react';
import Registration from './Registration';
import Login from './Login';
import { HashRouter, Route } from "react-router-dom";
import ResetPassword from './ResetPassword';

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to my social network</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}