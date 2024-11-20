const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the Libro model (corresponds to the "libros" collection in MongoDB)
const libroSchema = new mongoose.Schema({
    nombre_libro: String,
    autor: String,
    cantidad_total: Number,
    cantidad_reservada: Number,
    fecha_agregacion: Date,
    ultima_actualizacion: Date,
    reservas_historicas: Number,
    reservas_mensuales: Number,
});

const Libro = mongoose.model('Libro', libroSchema);

// Ruta para obtener todos los libros
app.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.find(); // Fetch all books
        res.json(libros);
    } catch (err) {
        res.status(500).send('Error al obtener los libros: ' + err.message);
    }
});

// Ruta para insertar un nuevo libro
app.post('/libros', async (req, res) => {
    try {
        const { nombre_libro, autor, cantidad_total, cantidad_reservada, reservas_historicas, reservas_mensuales } = req.body;

        // Crea un nuevo libro
        const nuevoLibro = new Libro({
            nombre_libro,
            autor,
            cantidad_total,
            cantidad_reservada,
            reservas_historicas,
            reservas_mensuales,
            fecha_agregacion: new Date(),
            ultima_actualizacion: new Date(),
        });

        // Guarda el libro en la base de datos
        await nuevoLibro.save();

        // Responde con el libro insertado
        res.status(201).json(nuevoLibro);
    } catch (err) {
        res.status(500).send('Error al insertar el libro: ' + err.message);
    }
});

// Ruta para eliminar un libro por ID
app.delete('/libros/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        console.log('El ID recibido para eliminar:', _id); // Debug
        const libroEliminado = await Libro.findByIdAndDelete(_id);

        if (!libroEliminado) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.status(200).json({ message: 'Libro eliminado exitosamente', libro: libroEliminado });
    } catch (err) {
        res.status(500).send('Error al eliminar el libro: ' + err.message);
    }
});
// server.js
// Añadimos el esquema de préstamos
const prestamoSchema = new mongoose.Schema({
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    id_libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
    fecha_reserva: Date,
    fecha_limite: Date,
  });
  
  const Prestamo = mongoose.model('Prestamo', prestamoSchema);
  
  // Ruta para obtener todos los préstamos
  app.get('/prestamos', async (req, res) => {
    try {
      const prestamos = await Prestamo.find().populate('id_usuario id_libro');
      res.json(prestamos);
    } catch (err) {
      res.status(500).send('Error al obtener los préstamos: ' + err.message);
    }
  });
  
  // Ruta para insertar un nuevo préstamo
  app.post('/prestamos', async (req, res) => {
    try {
      const prestamo = new Prestamo(req.body);
      await prestamo.save();
      res.status(201).json(prestamo);
    } catch (err) {
      res.status(500).send('Error al agregar el préstamo: ' + err.message);
    }
  });
  
  // Ruta para eliminar un préstamo
  app.delete('/prestamos/:id', async (req, res) => {
    try {
      await Prestamo.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send('Error al eliminar el préstamo: ' + err.message);
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
