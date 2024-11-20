// src/vista/AdminInicio.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StyleAdminInicio.css';
import Footer from './Footer';

const AdminInicio = () => {
    const [libros, setLibros] = useState([]);

    // Fetch books from the backend API
    useEffect(() => {
        axios.get('http://localhost:5000/libros') // URL del servidor Express
            .then(response => {
                setLibros(response.data); // Almacena los datos de libros en el estado
            })
            .catch(error => {
                console.error('Error al obtener los libros:', error);
            });
    }, []);

    return (
        <div className="admin-container">
            <h1>Gestión de Libros</h1>

            <table className="tabla-libros">
                <thead>
                    <tr>
                        <th>Nombre del Libro</th>
                        <th>Autor</th>
                        <th>Cantidad Total</th>
                        <th>Cantidad Reservada</th>
                        <th>Reservas Históricas</th>
                        <th>Reservas Mensuales</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro._id}>
                            <td>{libro.nombre_libro}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.cantidad_total}</td>
                            <td>{libro.cantidad_reservada}</td>
                            <td>{libro.reservas_historicas}</td>
                            <td>{libro.reservas_mensuales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Footer /> {/* Aquí se agrega el Footer */}
        </div>
    );
};

export default AdminInicio;
