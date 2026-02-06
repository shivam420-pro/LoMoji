import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@styles/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ToastProvider from './components/common/ToastContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="602363001338-rfgg59j2gcsjjav9c78javj7lafhlo33.apps.googleusercontent.com">
      <ToastProvider>
        <App />
      </ToastProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
