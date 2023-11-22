const API_URL = "http://localhost:3000"

//CARRITO
export const consultarProductos = async () => {
  let products
  await fetch(`${API_URL}/carrito/`)
    .then(response => response.json())
    .then(data => products = data);
  return products;
}

export const vaciarCarrito = async () => {
  await fetch(`${API_URL}/carrito/eliminarCarrito`,{
    method: 'DELETE'})
}

export const modificarCantidad = async (id,nuevaCantidad) => {
  return await fetch(`${API_URL}/carrito/modificarCantidad/${id}/${nuevaCantidad}`, {
    method: 'PATCH'})
}

export const eliminarProducto = async (id) => {
  return await fetch(`${API_URL}/carrito/eliminarProducto/${id}`, {
    method: 'POST'})
}
 //PRODUCTO
export const crearProducto = async (productoDatos) => {
  const response = await fetch(`${API_URL}/producto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoDatos),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
}

export const modificarProducto = async (datosProducto, idProducto) => {
    const respuesta = await fetch(`${API_URL}/producto/${idProducto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosProducto),
    });

    if (!respuesta.ok) {
      throw new Error(`Error al actualizar producto: ${respuesta.statusText}`);
    }

    const datosRespuesta = await respuesta.json();
    return datosRespuesta;
};



export const consultarProductosRegistrados = async () => {
  let p
  await fetch(`${API_URL}/producto`)
    .then(response => response.json())
    .then(data => p = data);
  return p;
}

export const eliminarProductoRegistrado = async (id) => {
  return await fetch(`${API_URL}/producto/${id}`, {
    method: 'DELETE'})
}

export const agregarProductoCarrito = async (productoId,cantidadProducto) => {
  const response = await fetch(`${API_URL}/carrito/agregarProducto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productoId: productoId,
          cantidadProducto: cantidadProducto,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
}

//CATEGORIA

export const consultarCategoria = async () => {
  let categoria
  await fetch(`${API_URL}/categoria/`)
    .then(response => response.json())
    .then(data => categoria = data);
  return categoria;
}

export const crearCategoria = async (categoriaDatos) => {
  const response = await fetch(`${API_URL}/categoria/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoriaDatos),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la categoria');
      }
}

export const eliminarCategoria = async (id) => {
  return await fetch(`${API_URL}/categoria/${id}`, {
    method: 'DELETE'})
}

export const modificarCategoria = async (datosProducto, idProducto) => {
  const respuesta = await fetch(`${API_URL}/categoria/${idProducto}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosProducto),
  });

  if (!respuesta.ok) {
    throw new Error(`Error al actualizar producto: ${respuesta.statusText}`);
  }

  const datosRespuesta = await respuesta.json();
  return datosRespuesta;
};
