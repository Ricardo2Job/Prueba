// src/vista/Libros.js
import React from 'react';
import Dashboard from './Dashboard';

const Libros = ({ navigateTo }) => {
  return (
    <div className="libros-container">
      <Dashboard navigateTo={navigateTo} />
      <div className="libros-content">
        <h1>¡Hola Mundo!</h1>
        <p>Esta es la página de edición de libros.</p>
      </div>
    </div>
  );
};

export default Libros;
