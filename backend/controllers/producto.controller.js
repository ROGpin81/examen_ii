const Producto = require('../models/Producto');

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      order: [['id', 'ASC']],
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      message: 'Error al obtener la lista de productos',
      error: error.message,
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, estado, categoria, url_fotografia } = req.body;

    if (!nombre || !descripcion || !precio || !estado || !categoria) {
      return res.status(400).json({
        message: 'Los campos nombre, descripcion, precio, estado y categoria son obligatorios',
      });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      estado,
      categoria,
      url_fotografia,
    });

    res.status(201).json({
      message: 'Producto creado correctamente',
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      message: 'Error al crear el producto',
      error: error.message,
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }

    await producto.destroy();

    res.status(200).json({
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      message: 'Error al eliminar el producto',
      error: error.message,
    });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
};