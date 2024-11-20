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

// Definir el esquema para las reservas
const reservaSchema = new mongoose.Schema({
    nombre_usuario: String,
    libro_reservado: String,
    fecha_reserva: Date,
    estado: { type: String, default: 'Activa' }, // Estado de la reserva (por defecto activa)
    fecha_limite: Date, // Fecha límite para devolver el libro (si es necesario)
});

// Crear el modelo de Reserva
const Reserva = mongoose.model('Reserva', reservaSchema);

// Ruta para obtener todas las reservas
app.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find(); // Obtener todas las reservas
        res.json(reservas);
    } catch (err) {
        res.status(500).send('Error al obtener las reservas: ' + err.message);
    }
});

// Ruta para insertar una nueva reserva
app.post('/reservas', async (req, res) => {
    try {
        const { nombre_usuario, libro_reservado, fecha_reserva, fecha_limite } = req.body;

        // Crear una nueva reserva
        const nuevaReserva = new Reserva({
            nombre_usuario,
            libro_reservado,
            fecha_reserva,
            fecha_limite,
        });

        // Guardar la reserva en la base de datos
        await nuevaReserva.save();

        // Responder con la reserva creada
        res.status(201).json(nuevaReserva);
    } catch (err) {
        res.status(500).send('Error al insertar la reserva: ' + err.message);
    }
});

// Ruta para eliminar una reserva por ID
app.delete('/reservas/:id', async (req, res) => {
    try {
        const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
        if (!reservaEliminada) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
});

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
