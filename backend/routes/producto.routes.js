const express = require('express');
const router = express.Router();

const {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
} = require('../controllers/producto.controller');

router.get('/productos', obtenerProductos);
router.post('/productos', crearProducto);
router.delete('/items/:id', eliminarProducto);

module.exports = router;