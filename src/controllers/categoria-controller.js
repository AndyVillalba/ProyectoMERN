const categoriaModelo = require('../models/categoria-model');

const getAllCategorias = async (req, res) => {
    const resultado_get_all = await categoriaModelo.find();
    res.json(resultado_get_all);
}

const getCategoria_id = async (req, res) => {
   const resultado_categoria_id = await categoriaModelo.findById(req.params.id);
   res.json(resultado_categoria_id)
};

const crearCategoria = async (req,res) => {
   const {tipo,categoria} = req.body;
   const nuevaCategoria = new categoriaModelo({tipo,categoria});
   await nuevaCategoria.save();
   res.json({status: "Categoria Registrada"});
}

const modificarCategoria = async (req,res) => {
    const { tipo,categoria } = req.body;
    const upCategoria = {
        tipo,
        categoria
    };
    await categoriaModelo.findByIdAndUpdate(req.params.id,upCategoria);
    res.json({ status: "Categoria Actualizada" });
}

const eliminarCategoria = async (req, res) => {
    await categoriaModelo.findByIdAndDelete(req.params.id);
    res.json({ status: "Categoria Eliminada" });
}


exports.getAllCategorias = getAllCategorias;
exports.getCategoria_id = getCategoria_id;
exports.crearCategoria = crearCategoria;
exports.modificarCategoria = modificarCategoria;
exports.eliminarCategoria = eliminarCategoria;