import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/store/store';
import {Provider} from "react-redux";
import MainGame from './MainGame';
import NavBar from './NavBar.js'

const root = document.getElementById('react-app');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
    <React.StrictMode>
        <Provider store={store}>
            <NavBar />
            <MainGame />
        </Provider>
    </React.StrictMode>
);