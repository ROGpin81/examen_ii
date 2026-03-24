require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/connection');

const app = express();
app.use(cors());

app.use(express.json());

// Prueba de conexión a la base de datos
app.get('/', (req, res) => {
  res.send('Hola desde el backend de examen_ii!');
});

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});