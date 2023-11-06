const productoModelo = require('../models/producto-model');
const categoriaModelo = require('../models/categoria-model');

const getAllProducto = async (req, res) => {
  try {
    const resultado_get_all = await productoModelo.find();

    if (!resultado_get_all || resultado_get_all.length === 0) {
      return res.status(404).json({ mensaje: 'No hay productos registrados' });
    }

    res.json(resultado_get_all);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

const getProducto_id = async (req, res) => {
  try {
    const productoId = req.params.id;

    if (!productoId) {
      return res.status(400).json({ mensaje: 'Producto inválido' });
    }

    const resultado_get_id = await productoModelo.findById(productoId);

    if (!resultado_get_id) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(resultado_get_id);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const getProducto_categoria = async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: 'Categoria inválido' });
      }

      const resultado_producto_categoria = await productoModelo
        .find({ categoria: id })
        .populate('categoria');
  
      if (resultado_producto_categoria.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos para esta categoría.' });
      }
  
      const nombreCategoria = resultado_producto_categoria[0].categoria.categoria;
  
      res.json({ categoria: nombreCategoria, productos: resultado_producto_categoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error, no se pudo encontrar los productos para dicha categoria' });
    }
  };

const crearProducto = async (req,res) => {
  try{  
  const id_categoria = await categoriaModelo.findById(req.params.id);

    if (!id_categoria) {
      return res.status(404).json({ mensaje: 'Categoria no encontrada' });
    }
    
    const {nombre,descripcion,precio,categoria=id_categoria} = req.body;
    
    const nuevoProducto = new productoModelo({nombre,descripcion,precio,categoria});
    await nuevoProducto.save();
    res.json({status: "Producto Registrado"});
  }catch (error){
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
 
  }
 }

 const modificarProducto = async (req,res) => {
  try{
    const { nombre,descripcion,precio } = req.body;
    const upProducto = {
        nombre,
        descripcion,
        precio
    };
    await productoModelo.findByIdAndUpdate(req.params.id,upProducto);
    res.json({ status: "Producto Actualizado" });
  } catch (error){
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
 
  }
}

 const eliminarProducto = async (req, res) => {
  try {
    const producto = await productoModelo.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await productoModelo.findByIdAndDelete(req.params.id);

    res.json({ status: 'Producto Eliminado' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}


exports.getAllProducto = getAllProducto;
exports.getProducto_id = getProducto_id;
exports.getProducto_categoria = getProducto_categoria;
exports.crearProducto = crearProducto;
exports.modificarProducto = modificarProducto;
exports.eliminarProducto = eliminarProducto;