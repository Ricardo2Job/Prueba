// src/App.js
import React, { useState } from 'react';
import './App.css';
import Dashboard from './vista/Dashboard';
import AdminInicio from './vista/AdminInicio';
import Libros from './vista/Libros';
import Prestamo from './vista/Prestamo';
import Footer from './vista/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('admin'); // Página inicial: AdminInicio

  // Función para cambiar de página
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'admin' && (
        <>
          <Dashboard navigateTo={navigateTo} />
          <div className="admin-content">
            <AdminInicio />
          </div>
        </>
      )}

      {currentPage === 'libros' && (
        <div className="libros-content">
          <Libros navigateTo={navigateTo} />
        </div>
      )}

      {currentPage === 'prestamo' && (
        <div className="prestamo-content">
          <Prestamo />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
