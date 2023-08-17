import React from 'react';
import ReactDOM from 'react-dom/client';
import MainGame from './MainGame'; // Import your Game component
import './index.css'; // Include your styles if needed

const root = document.getElementById('react-app');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
    <React.StrictMode>
      <MainGame /> {/* Render your Game component */}
    </React.StrictMode>
);
