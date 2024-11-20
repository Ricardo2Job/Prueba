import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Asegúrate de tener axios instalado
import './StyleAdminInicio.css';  // O el archivo de estilos que estés usando

const BooksList = () => {
  const [books, setBooks] = useState([]);  // Para almacenar los libros
  const [loading, setLoading] = useState(true);  // Para gestionar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores

  useEffect(() => {
    // Obtener libros desde la API
    axios.get('http://localhost:3000/books')  // Aquí debe ser el puerto 5002
      .then(response => {
        setBooks(response.data);  // Actualiza el estado con los libros obtenidos
        setLoading(false);  // Desactivar el estado de carga
      })
      .catch(err => {
        console.error("Error al obtener los libros:", err);
        setError("No se pudieron cargar los libros.");  // Muestra un error en caso de falla
        setLoading(false);  // También desactiva el estado de carga si ocurre un error
      });
  }, []);  // El array vacío asegura que solo se ejecute una vez al cargar el componente
  

  if (loading) {
    return <p>Cargando libros...</p>;  // Mensaje de carga
  }

  if (error) {
    return <p>{error}</p>;  // Muestra un mensaje de error si no se pueden cargar los libros
  }

  return (
    <div>
      <h2>Lista de Libros</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Libro</th>
            <th>Autor</th>
            <th>Fecha de Agregación</th>
            <th>Cantidad Total</th>
            <th>Cantidad Reservada</th>
            <th>Reservas Históricas</th>
            <th>Reservas Mensuales</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td>{book.nombre_libro}</td>
                <td>{book.autor}</td>
                <td>{new Date(book.fecha_agregacion).toLocaleDateString()}</td>
                <td>{book.cantidad_total}</td>
                <td>{book.cantidad_reservada}</td>
                <td>{book.reservas_historicas}</td>
                <td>{book.reservas_mensuales}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay libros disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
