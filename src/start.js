import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import Welcome from './Welcome';
import reducer from "./reducers";
import App from './App';
import { init } from './socket';

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let component;
// check if the user is logged in:
if (location.pathname === '/welcome') {
    component = <Welcome />;
} else {
    init(store);
    component = <Provider store={store}>
        <App />
    </Provider>;
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
