import React from 'react';
import ReactDOM from 'react-dom/client';
import MainGame from './MainGame';
import './index.css';
import NavBar from './NavBar.js'

const root = document.getElementById('react-app');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
    <React.StrictMode>
        <NavBar/>
        <MainGame/>
    </React.StrictMode>
);