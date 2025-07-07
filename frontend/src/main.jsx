import React from 'react';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);