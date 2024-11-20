import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Libros = () => {
    const [libros, setLibros] = useState([]);
    const [formData, setFormData] = useState({
        nombre_libro: '',
        autor: '',
        cantidad_total: 0,
        cantidad_reservada: 0,
        reservas_historicas: 0,
        reservas_mensuales: 0,
    });

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

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene que la página se recargue al enviar el formulario

        axios.post('http://localhost:5000/libros', formData) // URL del servidor Express
            .then(response => {
                setLibros([...libros, response.data]); // Añadimos el nuevo libro a la lista
                setFormData({
                    nombre_libro: '',
                    autor: '',
                    cantidad_total: 0,
                    cantidad_reservada: 0,
                    reservas_historicas: 0,
                    reservas_mensuales: 0,
                }); // Limpiamos el formulario
            })
            .catch(error => {
                console.error('Error al insertar el libro:', error);
            });
    };

    return (
        <div>
            <h1>Tabla de Libros</h1>

            {/* Formulario para insertar libros */}
            <form onSubmit={handleSubmit}>
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
                    <label>Cantidad total:</label>
                    <input
                        type="number"
                        name="cantidad_total"
                        value={formData.cantidad_total}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Cantidad reservada:</label>
                    <input
                        type="number"
                        name="cantidad_reservada"
                        value={formData.cantidad_reservada}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Reservas históricas:</label>
                    <input
                        type="number"
                        name="reservas_historicas"
                        value={formData.reservas_historicas}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Reservas mensuales:</label>
                    <input
                        type="number"
                        name="reservas_mensuales"
                        value={formData.reservas_mensuales}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Insertar Libro</button>
            </form>

            <table border="1" style={{ width: '100%', marginTop: '20px' }}>
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
        </div>
    );
};

export default Libros;
