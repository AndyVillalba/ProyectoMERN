const productoModelo = require('../models/producto-model');
const ordenModelo = require('../models/ordenCompra-model');

const mostrarCarrito = async (req, res) => {
  try {
    const resultado_get_all = await ordenModelo.find();

    if (!resultado_get_all || resultado_get_all.length === 0) {
      return res.status(404).json({ mensaje: 'No hay productos en el carrito' });
    }
    // const nombreProducto = resultado_producto_nombre[0].producto.nombre;
    
    res.json(resultado_get_all[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

const agregarProductoOrden =  async (req, res) => {
  const productoId = req.body.productoId; 
  const cantidadProducto = req.body.cantidadProducto;
 

  try {
    const productoExiste = await productoModelo.findById(productoId);
    
    const precio_producto = productoExiste.precio;

    let orden = await ordenModelo.findOne({});

    if (!orden) {
      orden = new ordenModelo({ productos: [] });
    }
    const productoIsAdded = orden.productos.find(producto => producto.id === productoExiste.id)
    if (productoIsAdded) {
      productoIsAdded.cantidad += cantidadProducto;
      productoIsAdded.subTotal = productoIsAdded.cantidad*precio_producto;
      const newArray = orden.productos.map(producto => {
        if (producto._id === productoIsAdded._id) {
          return productoIsAdded; 
        }
        return producto; 
      });
      orden.productos = newArray;
    } else {
      orden.productos.push({ id: productoExiste._id, nombre: productoExiste.nombre ,precio: precio_producto, cantidad: cantidadProducto, subTotal: cantidadProducto*precio_producto });
    }
    let total = 0;
      for( let i = 0; i < orden.productos.length; i++) {
        total += orden.productos[i].subTotal
      }
    orden.total = total
    await orden.save();

    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}

const eliminarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    let orden = await ordenModelo.findOne({});

    const productoExiste = await productoModelo.findById(id);

    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }

    const productoCarrito = orden.productos.filter(producto => producto.id !== id);
    console.log("CARRITO:",productoCarrito);
    if (!productoExiste) {
      return res.status(404).json({ message: 'Producto no encontrado en la orden' });
    }

    orden.productos = productoCarrito;

    let total = 0;
      for( let i = 0; i < orden.productos.length; i++) {
        total += orden.productos[i].subTotal
      }
    orden.total = total

    await orden.save();

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
}

const eliminarOrden = async (req, res) => {
  try {
    const orden = await ordenModelo.findOne({});
    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }

    orden.productos = [];
    orden.total = 0;

    await orden.save();

    res.json({ message: 'Orden de compra eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el carrito de compra' });
  }
}

const modificarCarrito = async (req, res) => {
  try {
    const id = req.params.id;
    const nuevaCantidad = req.params.nuevaCantidad;
    const orden = await ordenModelo.findOne({});
    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }
    console.log("ORDEN: ",orden);
    const productoIsAdded = orden.productos.find(producto => producto.id === id)
    console.log("CANTIDAD: ",nuevaCantidad);
    if (productoIsAdded) {
      productoIsAdded.cantidad = nuevaCantidad;
      productoIsAdded.subTotal = productoIsAdded.cantidad*productoIsAdded.precio;
      const newArray = orden.productos.map(producto => {
        if (producto._id === productoIsAdded._id) {
          return productoIsAdded; 
        }
        return producto; 
      });
      orden.productos = newArray;

      let total = 0;
      for( let i = 0; i < orden.productos.length; i++) {
        total += orden.productos[i].subTotal
      }
    orden.total = total
    await orden.save();

    return res.json({ message: 'Cantidad Modificada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al Modificar la Cantidad' });
  }
}



exports.mostrarCarrito = mostrarCarrito;
exports.agregarProductoOrden = agregarProductoOrden;
exports.eliminarProducto = eliminarProducto;
exports.eliminarOrden = eliminarOrden;
exports.modificarCarrito = modificarCarrito;





