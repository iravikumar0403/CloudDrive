import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import Popper from 'popper.js'
import $ from 'jquery';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider';
import './assets/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

reactDom.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>, 
    document.getElementById("root")
);