import React, { useState } from 'react';
import './StyleAdminInicio.css';
import logo from '../imagenes/logo.png';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const AdminInicio = () => {
  const [users, setUsers] = useState([]);  // Se eliminan los datos de ejemplo

  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('nombre');
  const [sortOrder, setSortOrder] = useState('asc');

  const [newUser, setNewUser] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    libro: '',
    fechaReserva: '',
    fechaDevolucion: '',
    estado: 'Entregado',
    deuda: 'No hay deuda'
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleUserRegister = (e) => {
    e.preventDefault();
    setUsers([...users, newUser]);
    setNewUser({
      rut: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      libro: '',
      fechaReserva: '',
      fechaDevolucion: '',
      estado: 'Entregado',
      deuda: 'No hay deuda'
    }); // Resetear el formulario
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({
      rut: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      libro: '',
      fechaReserva: '',
      fechaDevolucion: '',
      estado: 'Entregado',
      deuda: 'No hay deuda'
    }); // Resetear el formulario
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rut.includes(searchTerm)
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    let comparison = 0;
    if (sortCriteria === 'nombre') {
      comparison = a.nombre.localeCompare(b.nombre);
    } else if (sortCriteria === 'fecha') {
      comparison = new Date(a.fechaReserva) - new Date(b.fechaReserva);
    } else if (sortCriteria === 'deuda') {
      comparison = a.deuda === 'No hay deuda' ? -1 : 1;
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
        <h2>Lista de Usuarios</h2>
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
            <option value="nombre">Nombre</option>
            <option value="fecha">Fecha de Reserva</option>
            <option value="deuda">Deuda</option>
          </select>
          <select onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Libros Atrasados</th>
              <th>Fecha de Reserva</th>
              <th>Fecha de Devolución</th>
              <th>Estado</th>
              <th>Deuda</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.rut}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.direccion}</td>
                <td>{user.telefono}</td>
                <td>{user.libro}</td>
                <td>{user.fechaReserva}</td>
                <td>{user.fechaDevolucion}</td>
                <td>{user.estado}</td>
                <td>{user.deuda}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="agregar-usuario">
          <h2>Agregar Usuario</h2>
          <input 
            type="text" 
            placeholder="RUT" 
            value={newUser.rut} 
            onChange={e => setNewUser({ ...newUser, rut: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Nombre" 
            value={newUser.nombre} 
            onChange={e => setNewUser({ ...newUser, nombre: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Apellido" 
            value={newUser.apellido} 
            onChange={e => setNewUser({ ...newUser, apellido: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Dirección" 
            value={newUser.direccion} 
            onChange={e => setNewUser({ ...newUser, direccion: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Teléfono" 
            value={newUser.telefono} 
            onChange={e => setNewUser({ ...newUser, telefono: e.target.value })} 
          />
          <input type="file" accept="image/*" className="input-file" />
          <button onClick={handleAddUser}>Agregar Usuario</button>
        </div>
      </main>
      <footer className="footer">
        <p>Biblioteca de la JerryClase que no se que poner</p>
      </footer>
    </div>
  );
};

export default AdminInicio;
