const API_URL = "http://localhost:3000"

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