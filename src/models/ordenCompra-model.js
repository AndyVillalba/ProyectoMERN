const mongoose = require('mongoose');
const {Schema} = mongoose;

const ordenCompraSchema = new Schema({
    productos: [
        {
          producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
          },
          cantidad: { type:Number,require:true},
          precioTotal: {type:Number,require:true}
        },
      ],
});

module.exports = mongoose.model('Carrito', ordenCompraSchema);