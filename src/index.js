import React from 'react';
import ReactDOM from 'react-dom/client';
import MainGame from './MainGame';
import './index.css';

const root = document.getElementById('react-app');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
    <React.StrictMode>
        <MainGame />
    </React.StrictMode>
);