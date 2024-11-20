import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StylePrestamos.css'; // Puedes modificar el estilo según lo necesites

const Prestamos = () => {
    const [reservas, setReservas] = useState([]);
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        libro_reservado: '',
        fecha_reserva: '',
    });

    // Obtener reservas del servidor
    useEffect(() => {
        axios
            .get('http://localhost:5000/reservas') // Asegúrate de que la URL sea correcta
            .then((response) => setReservas(response.data))
            .catch((error) => console.error('Error al obtener reservas:', error));
    }, []);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Agregar reserva
    const handleAddReserva = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/reservas', formData) // Asegúrate de que la URL sea correcta
            .then((response) => {
                setReservas([...reservas, response.data]);
                setFormData({ nombre_usuario: '', libro_reservado: '', fecha_reserva: '' });
            })
            .catch((error) => console.error('Error al agregar reserva:', error));
    };

    // Eliminar reserva
    const handleEliminar = (id) => {
        axios
            .delete(`http://localhost:5000/reservas/${id}`) // Asegúrate de que la URL sea correcta
            .then(() => {
                setReservas(reservas.filter((reserva) => reserva._id !== id));
                alert('Reserva eliminada correctamente');
            })
            .catch((error) => console.error('Error al eliminar reserva:', error));
    };

    return (
        <div className="prestamos-container">
            <h1>Gestión de Reservas (Préstamos)</h1>

            {/* Tabla de reservas */}
            <table className="tabla-reservas">
                <thead>
                    <tr>
                        <th>ID Reserva</th>
                        <th>Nombre del Usuario</th>
                        <th>Libro Reservado</th>
                        <th>Fecha de Reserva</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva._id}>
                            <td>{reserva._id}</td>
                            <td>{reserva.nombre_usuario}</td>
                            <td>{reserva.libro_reservado}</td>
                            <td>{reserva.fecha_reserva}</td>
                            <td>
                                <button onClick={() => handleEliminar(reserva._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para agregar una nueva reserva */}
            <form onSubmit={handleAddReserva} className="form-reserva">
                <h2>Agregar Reserva</h2>
                <div>
                    <label>Nombre del Usuario:</label>
                    <input
                        type="text"
                        name="nombre_usuario"
                        value={formData.nombre_usuario}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Libro Reservado:</label>
                    <input
                        type="text"
                        name="libro_reservado"
                        value={formData.libro_reservado}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Reserva:</label>
                    <input
                        type="date"
                        name="fecha_reserva"
                        value={formData.fecha_reserva}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default Prestamos;
