const express = require('express');
const carrito = express.Router();

const carritoControlador = require('../controllers/ordenCompra-controller');

carrito.get('/',carritoControlador.mostrarCarrito);
carrito.post('/agregarProducto',carritoControlador.agregarProductoOrden);
carrito.post('/eliminarProducto/:id',carritoControlador.eliminarProducto);
carrito.delete('/eliminarCarrito',carritoControlador.eliminarOrden);
carrito.patch('/modificarCantidad/:id/:nuevaCantidad',carritoControlador.modificarCarrito);



module.exports = carrito;