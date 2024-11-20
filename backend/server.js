const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;  // Puerto del backend

// Usar CORS para permitir solicitudes desde el frontend en otro puerto (3000)
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB usando Mongoose
mongoose.connect('mongodb+srv://dweb:1234@desarrolloweb.k2vh2.mongodb.net/biblioteca_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.error('Error al conectar a la base de datos:', err));

// Definir el esquema de libro
const bookSchema = new mongoose.Schema({
  nombre_libro: String,
  autor: String,
  cantidad_total: Number,
  cantidad_reservada: Number,
  fecha_agregacion: Date,
  ultima_actualizacion: Date,
  reservas_historicas: Number,
  reservas_mensuales: Number,
});

// Crear un modelo de libro
const Book = mongoose.model('Book', bookSchema);

// Ruta para obtener todos los libros
app.get('/books', (req, res) => {
  Book.find()  // Buscar todos los libros en la base de datos
    .then((books) => res.json(books))  // Enviar los libros como respuesta en formato JSON
    .catch((err) => {
      console.error('Error al obtener los libros:', err);
      res.status(500).send('Error al obtener los libros');
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
