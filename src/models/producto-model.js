const mongoose = require('mongoose');
const {Schema} = mongoose;

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {type: String, required: false}
});

module.exports = mongoose.model('Producto', productoSchema);