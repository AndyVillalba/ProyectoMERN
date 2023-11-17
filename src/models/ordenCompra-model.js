const mongoose = require('mongoose');
const {Schema} = mongoose;

const ordenCompraSchema = new Schema({
    productos: [
        {
          id: { type:String,require:true},
          nombre: { type:String,require:true},
          precio: { type:Number,require:true},
          cantidad: { type:Number,require:true},
          subTotal: {type:Number,require:true}
        },
      ],
      total: { type:Number,require:false},
});

module.exports = mongoose.model('Carrito', ordenCompraSchema);