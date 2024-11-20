// src/vista/Dashboard.js
import React from 'react';
import './StyleDashboard.css';

const Dashboard = ({ navigateTo }) => {
  return (
    <div className="dashboard">
      <img src={require('../imagenes/logo.png')} alt="Logo Biblioteca" style={{ width: '100px', marginBottom: '20px' }} />
      <ul>
        <li onClick={() => navigateTo('admin')}>Inicio</li>
        <li onClick={() => navigateTo('libros')}>Editar libros</li>
        <li>Prestamos</li>
        <li>Historial</li>
        <li>Usuarios</li>
        <li>Página web</li>
      </ul>
    </div>
  );
};

export default Dashboard;
