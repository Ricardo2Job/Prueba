import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import './StyleLibros.css';

const Libros = ({ navigateTo }) => {
  const [libros, setLibros] = useState([]);
  const [formData, setFormData] = useState({
    nombre_libro: '',
    autor: '',
    cantidad_total: 0,
  });

  // Obtener libros del servidor
  useEffect(() => {
    axios
      .get('http://localhost:5000/libros')
      .then((response) => setLibros(response.data))
      .catch((error) => console.error('Error al obtener libros:', error));
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Agregar libro
  const handleAddBook = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/libros', formData)
      .then((response) => {
        setLibros([...libros, response.data]);
        setFormData({ nombre_libro: '', autor: '', cantidad_total: 0 });
      })
      .catch((error) => console.error('Error al agregar libro:', error));
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/libros/${id}`);
      alert('Libro eliminado exitosamente');
      // Filtra el libro eliminado del estado local
      setLibros(libros.filter((libro) => libro._id !== id));
    } catch (error) {
      console.error('Error al eliminar el libro:', error.message);
    }
  };
  


  return (
    <div className="libros-container">
      <Dashboard navigateTo={navigateTo} />
      <div className="libros-content">
        <h1>Gestión de Libros</h1>

        {/* Tabla de libros */}
        <table className="tabla-libros">
          <thead>
            <tr>
              <th>Nombre del Libro</th>
              <th>Autor</th>
              <th>Cantidad Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro._id}>
                <td>{libro.nombre_libro}</td>
                <td>{libro.autor}</td>
                <td>{libro.cantidad_total}</td>
                <td>
                  <button onClick={() => handleEliminar(libro._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario para agregar libros */}
        <form onSubmit={handleAddBook} className="form-libro">
          <h2>Agregar Libro</h2>
          <div>
            <label>Nombre del libro:</label>
            <input
              type="text"
              name="nombre_libro"
              value={formData.nombre_libro}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Autor:</label>
            <input
              type="text"
              name="autor"
              value={formData.autor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Cantidad Total:</label>
            <input
              type="number"
              name="cantidad_total"
              value={formData.cantidad_total}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default Libros;
