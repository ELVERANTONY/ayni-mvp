import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

window.onerror = function (msg, source, line, col, error) {
  console.error('[AYNI Global]', msg, error);
};

window.addEventListener('unhandledrejection', function (e) {
  console.error('[AYNI Unhandled]', e.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
