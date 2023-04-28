import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RegisterPage from 'pages/register-page';
import HomePage from './pages/home-page';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
