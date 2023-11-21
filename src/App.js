import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Carrito from './screens/Carrito';
import Producto from './screens/Producto';
import Categoria from './screens/Categoria';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Carrito />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/categoria" element={<Categoria />} />
      </Routes>
    </Router>
  );
};

export default App;