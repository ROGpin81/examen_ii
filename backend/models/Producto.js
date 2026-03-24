const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Producto = sequelize.define(
  'Producto',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('Disponible', 'No disponible'),
      allowNull: false,
      defaultValue: 'Disponible',
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url_fotografia: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'productos',
    timestamps: false,
  }
);

module.exports = Producto;