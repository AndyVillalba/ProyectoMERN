const mongoose = require('mongoose');
const {Schema} = mongoose;

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {type: Schema.Types.ObjectId, ref: "Categorias"}
});

module.exports = mongoose.model('Producto', productoSchema);