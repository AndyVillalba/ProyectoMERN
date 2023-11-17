const categoriaModelo = require('../models/categoria-model');

const getAllCategorias = async (req, res) => {
    try {
        const resultado_get_all = await categoriaModelo.find();
    
        if (!resultado_get_all || resultado_get_all.length === 0) {
          return res.status(404).json({ mensaje: 'No hay categorias registradas' });
        }
    
        res.json(resultado_get_all);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }
}

const getCategoria_id = async (req, res) => {
    try {
        const categoriaId = req.params.id;
    
        if (!categoriaId) {
          return res.status(400).json({ mensaje: 'Categoria no válida' });
        }
    
        const resultado_categoria_id = await categoriaModelo.findById(categoriaId);
    
        if (!resultado_categoria_id) {
          return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
    
        res.json(resultado_categoria_id);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }
};

const crearCategoria = async (req,res) => {
  //VALIDAR QUE NO EXISTA EL PRODUCTO
    try {
        const { tipo, categoria } = req.body;
    
        if (!tipo || !categoria) {
          return res.status(400).json({ mensaje: 'Datos inválidos' });
        }
    
        const nuevaCategoria = new categoriaModelo({ tipo, categoria });
    
        await nuevaCategoria.save();
    
        res.json({ status: 'Categoría Registrada' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }
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
    try {
        const categoriaId = req.params.id;
    
        if (!categoriaId) {
          return res.status(400).json({ mensaje: 'Categoria inválido' });
        }
    
        const categoria = await categoriaModelo.findById(categoriaId);
    
        if (!categoria) {
          return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        await categoriaModelo.findByIdAndDelete(categoriaId);
    
        res.json({ status: 'Categoría Eliminada' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }
}


exports.getAllCategorias = getAllCategorias;
exports.getCategoria_id = getCategoria_id;
exports.crearCategoria = crearCategoria;
exports.modificarCategoria = modificarCategoria;
exports.eliminarCategoria = eliminarCategoria;