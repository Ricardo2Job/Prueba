// src/vista/Prestamo.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StylePrestamo.css';  // Archivo CSS para los estilos de la tabla
import Footer from './Footer';

const Prestamo = () => {
    const [prestamos, setPrestamos] = useState([]);

    // Fetch prestamos from the backend API
    useEffect(() => {
        axios.get('http://localhost:5000/prestamos') // Suponiendo que esta es la ruta que devuelve los datos de los prestamos
            .then(response => {
                setPrestamos(response.data); // Almacena los datos de los prestamos en el estado
            })
            .catch(error => {
                console.error('Error al obtener los préstamos:', error);
            });
    }, []);

    return (
        <div className="prestamo-container">
            <h1>Dashboard de Préstamos</h1>

            <table className="tabla-prestamos">
                <thead>
                    <tr>
                        <th>ID Préstamo</th>
                        <th>ID Usuario</th>
                        <th>ID Libro</th>
                        <th>Fecha de Reserva</th>
                        <th>Fecha Límite</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.map((prestamo) => (
                        <tr key={prestamo._id}>
                            <td>{prestamo._id}</td>
                            <td>{prestamo.id_usuario}</td>
                            <td>{prestamo.id_libro}</td>
                            <td>{new Date(prestamo.fecha_reserva).toLocaleDateString()}</td>
                            <td>{new Date(prestamo.fecha_limite).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Footer /> {/* Aquí se agrega el Footer */}
        </div>
    );
};

export default Prestamo;
