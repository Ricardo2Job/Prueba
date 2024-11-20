const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/biblioteca_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Ruta inicial
app.get('/', (req, res) => res.send('API is running...'));

// Esquema y modelo de libros
const LibroSchema = new mongoose.Schema({
  nombre_libro: String,
  autor: String,
  cantidad_total: Number,
  cantidad_reservada: Number,
  fecha_agregacion: Date,
  ultima_actualizacion: Date,
  reservas_historicas: Number,
  reservas_mensuales: Number
});

// Crear el modelo para la colección 'libros'
const Libro = mongoose.model('Libro', LibroSchema, 'libros');

// Ruta para obtener todos los libros
app.get('/books', async (req, res) => {
  try {
    const libros = await Libro.find();  // Obtener todos los libros
    res.json(libros);
  } catch (err) {
    res.status(500).send(err.message);  // Manejar errores
  }
});

// Ruta para agregar un nuevo libro
app.post('/books', async (req, res) => {
  const { nombre_libro, autor, cantidad_total, cantidad_reservada, fecha_agregacion, ultima_actualizacion, reservas_historicas, reservas_mensuales } = req.body;
  try {
    const newBook = new Libro({
      nombre_libro,
      autor,
      cantidad_total,
      cantidad_reservada,
      fecha_agregacion,
      ultima_actualizacion,
      reservas_historicas,
      reservas_mensuales
    });
    await newBook.save();  // Guardar el nuevo libro
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).send(err.message);  // Manejar errores
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
