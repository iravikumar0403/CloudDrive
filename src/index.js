import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './assets/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css';

reactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>, 
    document.getElementById("root")
);