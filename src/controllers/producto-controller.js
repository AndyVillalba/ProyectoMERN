const productoModelo = require('../models/producto-model');
const categoriaModelo = require('../models/categoria-model');

const getAllProducto = async (req, res) => {
    const resultado_get_all = await productoModelo.find();
    res.json(resultado_get_all);
}

const getProducto_id = async (req, res) => {
    const resultado_get_id = await productoModelo.findById(req.params.id);
    res.json(resultado_get_id);
};

const getProducto_categoria = async (req,res) => {
    const id = req.params.id;
    const resultado_producto_categoria = await productoModelo.find({categoria: id})
    .populate('categoria');

    res.json(resultado_producto_categoria);
}

const crearProducto = async (req,res) => {
    const id_categoria = await categoriaModelo.findById(req.params.id);
    
    const {nombre,descripcion,precio,categoria=id_categoria} = req.body;

    
    
    const nuevoProducto = new productoModelo({nombre,descripcion,precio,categoria});
    await nuevoProducto.save();
    res.json({status: "Producto Registrado"});
 }

 const modificarProducto = async (req,res) => {
    const { nombre,descripcion,precio } = req.body;
    const upProducto = {
        nombre,
        descripcion,
        precio
    };
    await productoModelo.findByIdAndUpdate(req.params.id,upProducto);
    res.json({ status: "Producto Actualizado" });
}

 const eliminarProducto = async (req, res) => {
    await productoModelo.findByIdAndDelete(req.params.id);
    res.json({ status: "Producto Eliminado" });
}


exports.getAllProducto = getAllProducto;
exports.getProducto_id = getProducto_id;
exports.getProducto_categoria = getProducto_categoria;
exports.crearProducto = crearProducto;
exports.modificarProducto = modificarProducto;
exports.eliminarProducto = eliminarProducto;