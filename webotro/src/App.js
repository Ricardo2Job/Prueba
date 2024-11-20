// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Importa los componentes de React Router
import AdminInicio from './vista/AdminInicio';
import BooksList from './vista/BooksList';  // Importa el componente BooksList

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Mi Aplicación de Libros</h1>

        {/* Añadir enlaces de navegación */}
        <nav>
          <ul>
            <li>
              <Link to="/">Lista de Libros</Link>  {/* Enlace para BooksList */}
            </li>
            <li>
              <Link to="/admin">Administración</Link>  {/* Enlace para AdminInicio */}
            </li>
          </ul>
        </nav>

        {/* Define las rutas para cada componente */}
        <Routes>
          <Route path="/" element={<BooksList />} />  {/* Ruta para BooksList */}
          <Route path="/admin" element={<AdminInicio />} />  {/* Ruta para AdminInicio */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
