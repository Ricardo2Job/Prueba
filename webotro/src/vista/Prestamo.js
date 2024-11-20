// src/vista/Prestamo.js
import React, { useState, useEffect } from 'react';
import './StylePrestamo.css';

const Prestamo = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    id_usuario: '',
    id_libro: '',
    fecha_reserva: '',
    fecha_limite: '',
  });

  useEffect(() => {
    // Cargar prestamos, libros y usuarios
    fetch('/prestamos')
      .then(res => res.json())
      .then(data => setPrestamos(data))
      .catch(err => console.error('Error al cargar los préstamos:', err));

    fetch('/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al cargar usuarios:', err));

    fetch('/libros')
      .then(res => res.json())
      .then(data => setLibros(data))
      .catch(err => console.error('Error al cargar libros:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar un nuevo préstamo
    fetch('/prestamos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPrestamo),
    })
      .then(res => res.json())
      .then(data => {
        setPrestamos([...prestamos, data]);
        setNuevoPrestamo({ id_usuario: '', id_libro: '', fecha_reserva: '', fecha_limite: '' });
      })
      .catch(err => console.error('Error al agregar préstamo:', err));
  };

  const handleEliminar = (id) => {
    // Eliminar préstamo
    fetch(`/prestamos/${id}`, { method: 'DELETE' })
      .then(() => setPrestamos(prestamos.filter(prestamo => prestamo._id !== id)))
      .catch(err => console.error('Error al eliminar préstamo:', err));
  };

  return (
    <div className="prestamo-container">
      <h2>Gestión de Préstamos</h2>
      
      <div className="prestamo-table">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Libro</th>
              <th>Fecha Reserva</th>
              <th>Fecha Límite</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map(prestamo => {
              const usuario = usuarios.find(u => u._id === prestamo.id_usuario);
              const libro = libros.find(l => l._id === prestamo.id_libro);
              return (
                <tr key={prestamo._id}>
                  <td>{usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Cargando...'}</td>
                  <td>{libro ? libro.nombre_libro : 'Cargando...'}</td>
                  <td>{new Date(prestamo.fecha_reserva).toLocaleDateString()}</td>
                  <td>{new Date(prestamo.fecha_limite).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEliminar(prestamo._id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3>Agregar Nuevo Préstamo</h3>
      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <select 
          value={nuevoPrestamo.id_usuario} 
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, id_usuario: e.target.value })}
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario._id} value={usuario._id}>
              {usuario.nombre} {usuario.apellido}
            </option>
          ))}
        </select>

        <label>Libro:</label>
        <select 
          value={nuevoPrestamo.id_libro} 
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, id_libro: e.target.value })}
        >
          <option value="">Seleccionar libro</option>
          {libros.map(libro => (
            <option key={libro._id} value={libro._id}>
              {libro.nombre_libro}
            </option>
          ))}
        </select>

        <label>Fecha Reserva:</label>
        <input 
          type="date" 
          value={nuevoPrestamo.fecha_reserva} 
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, fecha_reserva: e.target.value })} 
        />

        <label>Fecha Límite:</label>
        <input 
          type="date" 
          value={nuevoPrestamo.fecha_limite} 
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, fecha_limite: e.target.value })} 
        />

        <button type="submit">Agregar Préstamo</button>
      </form>
    </div>
  );
};

export default Prestamo;
