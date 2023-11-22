import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Paper, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  agregarProductoCarrito,
  consultarProductosRegistrados,
  crearProducto,
  eliminarProductoRegistrado,
  consultarCategoria,
  modificarProducto
} from '../services/conector';

const ProductoFormulario = () => {
  const [productoDatos, setProductoDatos] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });

  const [lista, setLista] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editar, setEditar] = useState(false);
  const [idProducto, setProductoId] = useState(null);

  useEffect(() => {
    consultarApiProd();
    consultarApiCat();
  }, []);

  const consultarApiCat = async () => {
    const newLista = await consultarCategoria();
    setItems(newLista);
  };

  const consultarApiProd = async () => {
    const newLista = await consultarProductosRegistrados();
    setLista(newLista);
  };

  const handleChange = (e) => {
    setProductoDatos({ ...productoDatos, [e.target.name]: e.target.value });
  };

  const actualizarProducto = async (productoDatos, idProducto) => {
    await modificarProducto(productoDatos, idProducto);
    await consultarApiProd();
    alert('Producto Actualizado');
    setProductoDatos({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
    });
    setEditar(false);
    setSelectedItem(null);
};

const handleEditarProducto = (producto) => {
    setProductoDatos({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
    });
    setEditar(true);
    setProductoId(producto.id);
    setSelectedItem({ categoria: producto.categoria }); 
};

const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (editar) {
      await actualizarProducto(productoDatos, idProducto);
    } else {
      try {
        const categoriaSeleccionada = selectedItem ? selectedItem.categoria : '';
  
        await crearProducto({ ...productoDatos, categoria: categoriaSeleccionada });
        await consultarApiProd();
        alert('Producto Registrado');
  
        setProductoDatos({
          nombre: '',
          descripcion: '',
          precio: '',
          categoria: '',
        });
  
        setSelectedItem(null);
      } catch (error) {
        alert('Complete todos los datos del producto');
      }
    }
  };
  const handleEliminarProducto = async (id) => {
    await eliminarProductoRegistrado(id);
    await consultarApiProd();
  };

  const handleAgregarCarrito = async (id) => {
    const cantidadProducto = 1;

    try {
      await agregarProductoCarrito(id, cantidadProducto);
      await consultarApiProd();
      alert('Producto agregado al carrito');
    } catch (error) {
      alert('No se pudo agregar producto al carrito');
    }
  };

  const handleClick = () => {
    window.location.href = '/';
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'nombre', headerName: 'Producto', width: 160 },
    { field: 'descripcion', headerName: 'Descripcion', type: 'text', width: 200 },
    { field: 'precio', headerName: 'Precio ($)', width: 100 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    {
      headerName: 'Acciones',
      width: 500,
      renderCell: (params) => (
        <div>
             <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditarProducto(params.row)}
                endIcon={<EditIcon />}
            >
                Modificar
            </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleEliminarProducto(params.row.id)}
            endIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAgregarCarrito(params.row.id)}
            endIcon={<ShoppingCartIcon />}
          >
            Agregar al carrito
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: 'center', fontSize: 35, marginBottom: "2%" }}>
        PRODUCTO
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              label="* Nombre"
              variant="outlined"
              name="nombre"
              value={productoDatos.nombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label=" * Descripción"
              variant="outlined"
              name="descripcion"
              value={productoDatos.descripcion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="* Precio"
              variant="outlined"
              name="precio"
              value={productoDatos.precio}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              options={items}
              getOptionLabel={(option) => option.categoria}
              value={selectedItem}
              onChange={(_, newValue) => setSelectedItem(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar Categoría" variant="outlined" />
              )}
              sx={{ width: '205px'}}
            />
          </Grid>
          <Grid item xs={1}>
             <Button 
             component={Link} 
             to="/categoria" 
             variant="contained" 
             color="primary" 
             sx={{height:"8vh",display: 'flex',alignItems: 'center'}} 
             >
            <AddCircleOutlineIcon sx={{ marginRight: '4px' }} />
            </Button>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{  marginX: '42%', marginTop: '2.5%' }}
        >
          Guardar Producto
        </Button>
      </form>
      <Box>
        <Paper elevation={5} sx={{ marginTop: 5, alignSelf: 'center' }}>
          <DataGrid
            rows={lista ? lista.map((item) => ({ ...item, id: item._id })) : []}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            sx={{ alignSelf: 'center' }}
          />
        </Paper>
      </Box>
      <Box sx={{ marginTop: '5%', display: 'flex', justifyContent: 'center', flexDirection: 'row', marginX: '25%' }}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Ir al carrito
        </Button>

       
      </Box>
    </div>
  );
};

export default ProductoFormulario;