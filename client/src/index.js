import React from 'react';
import ReactDOM from 'react-dom';
import "./scss/main.scss";
import App from './App';
import AuthProvider from "./components/contextProviders/authContext";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
