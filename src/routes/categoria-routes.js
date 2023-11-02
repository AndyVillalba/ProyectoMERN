const express = require('express');
const categoria = express.Router();


const categoriaControlador = require('../controllers/categoria-controller');

categoria.get('/',categoriaControlador.getAllCategorias);
categoria.get('/:id',categoriaControlador.getCategoria_id);
categoria.post('/crear',categoriaControlador.crearCategoria);
categoria.put('/:id',categoriaControlador.modificarCategoria);
categoria.delete('/:id',categoriaControlador.eliminarCategoria);


module.exports = categoria;