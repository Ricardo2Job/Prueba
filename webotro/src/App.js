// src/App.js

import React from 'react';
import AdminInicio from './vista/AdminInicio';
import BooksList from './vista/BooksList';  // Importa el componente

function App() {
  return (
    <div className="App">
      <h1>Mi Aplicación de Libros</h1>
      <BooksList />    {/* Usamos el componente BooksList */}
    </div>
  );
}

export default App;
