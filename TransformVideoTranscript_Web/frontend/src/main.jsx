import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Demo from './Demo.jsx'
import ParticleBackground from './ParticleBackground.jsx';
import Navbar from './Navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParticleBackground />    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>

)
