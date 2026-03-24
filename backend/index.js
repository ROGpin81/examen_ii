require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/connection');
const productoRoutes = require('./routes/producto.routes');

const app = express();
app.use(cors());

app.use(express.json());

// Prueba de conexión a la base de datos
app.get('/', (req, res) => {
  res.send('Hola desde el backend de examen_ii!');
});

// Rutas
app.use(productoRoutes);

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});