const mongoose = require('mongoose');
const {Schema} = mongoose;

const categoriaSchema = new Schema({
    tipo: {type: Number, required:true},
    categoria: { type: String, required: true }
});

module.exports = mongoose.model('Categorias', categoriaSchema);