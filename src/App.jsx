import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Relatorios from './components/pages/Relatorios'
import Servicos from './components/pages/Servicos'
import Clientes from './components/pages/Clientes'

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/servicos" element={<Servicos />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App
