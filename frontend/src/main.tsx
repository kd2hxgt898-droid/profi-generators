import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';
import './i18n';
import { App } from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
