const productoModelo = require('../models/producto-model');
const ordenModelo = require('../models/ordenCompra-model');

const mostrarCarrito = async (req, res) => {
    const resultado_get_all = await ordenModelo.find();
    res.json(resultado_get_all);
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

    const productoCarrito = orden.productos.find((p) => p.producto.equals(productoExiste._id));

    if (productoCarrito) {
      productoCarrito.cantidad += cantidadProducto;
      productoCarrito.precioTotal += cantidadProducto*precio_producto;
    
    } else {
      orden.productos.push({ producto: productoExiste._id, cantidad: cantidadProducto, precioTotal: cantidadProducto*precio_producto });
    }
    
    await orden.save();

    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}

const eliminarProducto = async (req, res) => {
  const id = req.params.id;
  const cantidadAEliminar = 1;

  try {
    let orden = await ordenModelo.findOne({});

    const productoExiste = await productoModelo.findById(id);

    const precio_producto = productoExiste.precio;

    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }

    const productoCarrito = orden.productos.find((p) => p.producto.equals(id));

    if (!productoCarrito) {
      return res.status(404).json({ message: 'Producto no encontrado en la orden' });
    }

    if (productoCarrito.cantidad > cantidadAEliminar) {
      productoCarrito.cantidad -= cantidadAEliminar;
      productoCarrito.precioTotal -= cantidadAEliminar * precio_producto;
    } else {
      orden.productos = orden.productos.filter((p) => !p.producto.equals(id));
      orden.precioTotal -= productoCarrito.precioTotal;
    }

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
      return res.status(404).json({ message: 'Carrito de compra no encontrado' });
    }

    orden.productos = [];
    orden.precioTotal = 0;

    await orden.save();

    res.json({ message: 'Carrito de compra eliminado completamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al eliminar el carrito de compra' });
  }
}



exports.mostrarCarrito = mostrarCarrito;
exports.agregarProductoOrden = agregarProductoOrden;
exports.eliminarProducto = eliminarProducto;
exports.eliminarOrden = eliminarOrden;



