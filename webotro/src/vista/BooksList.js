// src/BooksList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);  // Estado para almacenar los libros

  useEffect(() => {
    // Realizamos la solicitud para obtener los libros
    axios.get('http://localhost:5002/books')
      .then(response => {
        setBooks(response.data);  // Guardamos los libros en el estado
      })
      .catch(error => {
        console.error('Error al obtener los libros:', error);
      });
  }, []);  // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      <h2>Lista de Libros</h2>
      {books.length === 0 ? (
        <p>No hay libros disponibles.</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <h3>{book.titulo}</h3>
              <p>Autor: {book.autor}</p>
              <p>Fecha de Publicación: {new Date(book.fechaPublicacion).toLocaleDateString()}</p>
              <p>Cantidad Disponible: {book.cantidadDisponible}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BooksList;
