import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Contact from './routes/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/contato/:id" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
