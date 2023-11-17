const express = require('express');
const producto = express.Router();


const productoControlador = require('../controllers/producto-controller');

producto.get('/',productoControlador.getAllProducto);
producto.get('/:id',productoControlador.getProducto_id);
producto.get('/categoria/:id',productoControlador.getProducto_categoria);
producto.post('/',productoControlador.crearProducto);
producto.put('/:id',productoControlador.modificarProducto);
producto.delete('/:id',productoControlador.eliminarProducto);


module.exports = producto;