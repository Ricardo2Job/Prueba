import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de importar axios
import './StyleAdminInicio.css';
import logo from '../imagenes/logo.png';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const AdminInicio = () => {
  const [books, setBooks] = useState([]);  // Para almacenar los libros
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('nombre_libro');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch libros from the backend
  useEffect(() => {
    axios.get('http://localhost:5002/books')  // Asegúrate de que esta URL sea la correcta
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los libros:", error);
      });
  }, []); // Esta dependencia vacía hace que se ejecute solo una vez al montar el componente.

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.nombre_libro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = filteredBooks.sort((a, b) => {
    let comparison = 0;
    if (sortCriteria === 'nombre_libro') {
      comparison = a.nombre_libro.localeCompare(b.nombre_libro);
    } else if (sortCriteria === 'fecha_agregacion') {
      comparison = new Date(a.fecha_agregacion) - new Date(b.fecha_agregacion);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="admin-inicio">
      <nav className="menu">
        <div className="dashboard">
          <img src={logo} alt="Logo de la página" className="logo" />
          <h1 style={{ color: 'white' }}>Dashboard</h1>
        </div>
        <ul>
          <li>Inicio</li>
          <li>Reserva de Libro</li>
          <li>Mi pagina</li>
          <li>Administracion</li>
          <li>Pagos</li>
          <li>Agregar Libros</li>
          <li>Pausar actividad</li>
        </ul>
      </nav>
      <main className="contenido">
        <h2>Lista de Libros</h2>
        <div className="buscador-container">
          <input
            type="text"
            placeholder="Buscar..."
            className="buscador"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="buscador-icon" />
        </div>
        
        <div className="filtros">
          <label>Ordenar por:</label>
          <select onChange={e => setSortCriteria(e.target.value)}>
            <option value="nombre_libro">Título</option>
            <option value="fecha_agregacion">Fecha de Agregación</option>
          </select>
          <select onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <table className="tabla-libros">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Fecha de Agregación</th>
              <th>Cantidad Disponible</th>
              <th>Reservas Históricas</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.nombre_libro}</td>
                <td>{book.autor}</td>
                <td>{new Date(book.fecha_agregacion).toLocaleDateString()}</td>
                <td>{book.cantidad_total - book.cantidad_reservada}</td>
                <td>{book.reservas_historicas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminInicio;
