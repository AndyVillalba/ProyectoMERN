import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { consultarProductos, eliminarProducto, modificarCantidad, vaciarCarrito } from '../services/conector';
import { DataGrid } from '@mui/x-data-grid';

const Carrito = () => {
  // HOOOKS
  const [lista, setLista] = useState([]);

  useEffect(() => {
    consultarApi()
  }, [])

  // FUNCTIONS
  const consultarApi = async () => {
    console.log("CONSULTA");
    const newLista = await consultarProductos()
    setLista(newLista)
  }

  const handleVaciarCarrito = async () => {
    await vaciarCarrito().then(consultarProductos()).then(setLista([]))
  }

  const handleModificarCantidad = async (id, nuevaCantidad) => {
    await modificarCantidad(id, nuevaCantidad).then(() => consultarApi())
  }

  const handleEliminarProducto = async (id) => {
    await eliminarProducto(id).then(() => consultarApi())
  }
  // VARIABLES
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
      field: 'nombre',
      headerName: 'Producto',
      width: 150,
      editable: true,
    },
    {
      field: 'precio',
      headerName: 'Precio',
      width: 150,
      editable: true,
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      type: 'number',
      width: 110,
      editable: true,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={params.row.cantidad}
          onChange={(e) => handleModificarCantidad(params.row.id, e.target.value)}
      />
      ),
    },
    {
      field: 'subTotal',
      headerName: 'Sub Total',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      headerName: 'Borrar',
      width: 120,
      renderCell: (params) => (
        <Button variant="contained" color='error' onClick={() => handleEliminarProducto(params.row.id)}>
          Eliminar
        </Button>
      ),
    },
  ];
  //RENDER
    return (
      <Box>
        <Box sx={{marginTop: "5%", display: "flex", justifyContent: "space-between", flexDirection: "row", marginX: "25%"}}>
          <Box></Box>
          <Typography sx={{textAlign: "center", fontSize: 35}}>Carrito de compras</Typography>
          <Button 
            variant='contained' 
            color='error'
            onClick={() => handleVaciarCarrito()}
          >
            Vaciar Carrito
          </Button>
        </Box>
        <Paper elevation={5} sx={{ marginX: "25%", marginTop: 5, alignSelf: "center"}}>
          <DataGrid
            rows={lista.productos ? lista.productos : []}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            sx={{alignSelf: "center"}}
          />
          <Typography sx={{textAlign: "end", marginRight: "5%", fontWeight: "bold"}}>Total ${lista.total ? lista.total : "0"}</Typography>
        </Paper>

      </Box>
    )
}

export default Carrito;