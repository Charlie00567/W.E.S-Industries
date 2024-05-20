import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />} />
        {/* Agrega aquí otras rutas si es necesario */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);