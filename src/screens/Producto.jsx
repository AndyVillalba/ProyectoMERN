import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Paper } from '@mui/material';
import { agregarProductoCarrito, consultarProductosRegistrados, crearProducto, eliminarProductoRegistrado } from '../services/conector';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductoFormulario = () => {
    const [productoDatos, setProductoDatos] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
    });

    const [lista, setLista] = useState([]);

    useEffect(() => {
        consultarApiProd()
    }, []);

    const consultarApiProd = async () => {
        const newLista = await consultarProductosRegistrados();
        setLista(newLista)
    }


    const handleChange = (e) => {
        setProductoDatos({ ...productoDatos, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productoDatos.nombre || !productoDatos.descripcion || !productoDatos.precio) {
            console.error('Todos los campos son requeridos');
            return;
        }

        try {
            await crearProducto(productoDatos).then(() => consultarApiProd())
            alert("Producto Registrado");
            setProductoDatos({
                nombre: '',
                descripcion: '',
                precio: '',
            });
        } catch (error) {
            alert("No se pudo registrar el producto");
        }
    };

    const handleEliminarProducto = async (id) => {
        await eliminarProductoRegistrado(id).then(() => consultarApiProd())
    }

    const handleAgregarCarrito = async (id) => {
        const cantidadProducto = 1;

        try {
            await agregarProductoCarrito(id, cantidadProducto).then(() => consultarApiProd())
            alert("Producto agregado al carrito");
        } catch (error) {
            alert("No se pudo agregar producto al carrito");
        }
    }


    const handleClick = () => {
        window.location.href = '/';
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'nombre',
            headerName: 'Producto',
            width: 150
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            type: 'text',
            width: 110,
        },
        {
            field: 'precio',
            headerName: 'Precio',
            width: 150,
        },
        {
            headerName: 'Acciones',
            width: 350,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={() => handleEliminarProducto(params.row.id)
                        }
                        endIcon={<DeleteIcon/>}
                        >
                        Eliminar
                    </Button>
                    <Button 
                    variant="contained" 
                    color='success' 
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
            <Typography
                variant="h4"
                sx={{ textAlign: "center", fontSize: 35 }}>
                PRODUCTO
            </Typography>
            <form
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Nombre"
                    variant="outlined"
                    name="nombre"
                    value={productoDatos.nombre}
                    onChange={handleChange}
                    sx={{ marginRight: "2%", marginLeft: "10%", marginTop: "2%" }}
                />
                <TextField
                    label="Descripción"
                    variant="outlined"
                    name="descripcion"
                    value={productoDatos.descripcion}
                    onChange={handleChange}
                    sx={{ marginRight: "2%", marginTop: "2%" }}
                />
                <TextField
                    label="Precio"
                    variant="outlined"
                    name="precio"
                    value={productoDatos.precio}
                    onChange={handleChange}
                    sx={{ marginRight: "2%", marginTop: "2%" }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: "2%", marginLeft: "2%", marginTop: "2.5%" }}
                >
                    Crear Producto
                </Button>
            </form>
            <Box>

                <Paper elevation={5} sx={{ marginX: "12%", marginTop: 5, alignSelf: "center" }}>
                    <DataGrid
                        rows={lista ? lista.map((item) => ({ ...item, id: item._id })) : []}
                        columns={columns}
                        disableRowSelectionOnClick
                        hideFooter
                        sx={{ alignSelf: "center" }}
                    />
                </Paper>
            </Box>
            <Box
            sx={{marginTop: "5%", display: "flex", justifyContent: "space-between", flexDirection: "row", marginX: "25%"}}
            >
            <Button variant="contained" color="primary" onClick={handleClick}>
                Ir al carrito
            </Button>

            <Button
              component={Link} 
              to="/categoria" 
              variant="contained" 
              color="primary"
            >
                Crear Categoria
            </Button>
            </Box>
        </div>

    );
};

export default ProductoFormulario;
