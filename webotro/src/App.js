// src/App.js
import React, { useState } from 'react';
import './App.css';
import Dashboard from './vista/Dashboard';
import AdminInicio from './vista/AdminInicio';
import Footer from './vista/Footer';
import Libros from './vista/Libros';

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

      <Footer />
    </div>
  );
}

export default App;
