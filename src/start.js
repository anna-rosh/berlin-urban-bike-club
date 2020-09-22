import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';

let component;
if (location.pathname === '/welcome') {
    component = <Welcome />;
} else {
    component = <p>my logo</p>;
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
