import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Profil from './profileSite';
import reportWebVitals from './reportWebVitals';
import MainSite from './mainSite'
import ClassMap from './klassekart';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/profile/:elevNavn" element={<Profil />}/>
      <Route path="/classList" element={<MainSite />}/>
      <Route path="/classMap" element={<ClassMap />}/>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
