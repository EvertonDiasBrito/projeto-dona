import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Relatorios from './components/pages/Relatorios'
import Servicos from './components/pages/Servicos'
import Clientes from './components/pages/Clientes'
import Cliente from './components/pages/Cliente'
import NovoCliente from './components/pages/NovoCliente'

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
          <Route path="/novocliente" element={<NovoCliente />} />
          <Route path="/clientes/:id" element={<Cliente />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App
