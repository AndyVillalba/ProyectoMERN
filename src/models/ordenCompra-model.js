const mongoose = require('mongoose');
const {Schema} = mongoose;

const ordenCompraSchema = new Schema({
    numeroOrden: { type: String, required: true },
    precioTotal: { type: Number, required: true },
});

module.exports = mongoose.model('Carrito', ordenCompraSchema);