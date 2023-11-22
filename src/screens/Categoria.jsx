import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Typography, Button, Box, Paper } from '@mui/material';
import { consultarCategoria, crearCategoria, eliminarCategoria , modificarCategoria } from '../services/conector';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CategoriaFormulario = () => {
    const [categoriaDatos, setCategoriaDatos] = useState({
        tipo: '',
        categoria: '',
    });

    const [lista, setLista] = useState([]);
    const [editar, setEditar] = useState(false);
    const [idCategoria, setCategoriaId] = useState(null);

    useEffect(() => {
        consultarApiCat()
    }, []);

    const consultarApiCat = async () => {
        const newLista = await consultarCategoria();
        setLista(newLista)
    }

    const actualizarCategoria = async (categoriaDatos, idCategoria) => {
        await modificarCategoria(categoriaDatos, idCategoria);
        await consultarApiCat();
        alert('Categoria Actualizada');
        setCategoriaDatos({
            tipo: '',
            categoria: '',
        });
        setEditar(false);
    };

    const handleChange = (e) => {
        setCategoriaDatos({ ...categoriaDatos, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editar){
            await actualizarCategoria(categoriaDatos,idCategoria);
        }else{
            if (!categoriaDatos.tipo || !categoriaDatos.categoria) {
                console.error('Todos los campos son requeridos');
                return;
            }
    
            try {
                await crearCategoria(categoriaDatos).then(() => consultarApiCat())
                alert("Categoria Registrada");
                setCategoriaDatos({
                    tipo: '',
                    categoria: '',
                });
            } catch (error) {
                alert("No se pudo registrar la categoria");
            }
        }

        
    };

    const handleEliminarCategoria = async (id) => {
        await eliminarCategoria(id).then(() => consultarApiCat())
    }

    const handleClick = () => {
        window.location.href = '/producto';
    };

    const handleEditarCategoria = (categoria) => {
        setCategoriaDatos({
            tipo: categoria.tipo,
            categoria: categoria.categoria,
        });
        setEditar(true);
        setCategoriaId(categoria.id);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 212 },
        {
            field: 'tipo',
            headerName: 'Tipo',
            width: 150
        },
        {
            field: 'categoria',
            headerName: 'Categoria',
            type: 'text',
            width: 110,
        },
        {
            headerName: 'Acciones',
            width: 300,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditarCategoria(params.row)}
                        endIcon={<EditIcon />}
                    >
                        Modificar
                    </Button>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={() => handleEliminarCategoria(params.row.id)
                        }
                        endIcon={<DeleteIcon />}
                    >
                        Eliminar
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
                CATEGORIA
            </Typography>
            <form
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Tipo"
                    variant="outlined"
                    name="tipo"
                    value={categoriaDatos.tipo}
                    onChange={handleChange}
                    sx={{ marginRight: "2%", marginLeft: "10%", marginTop: "2%" }}
                />
                <TextField
                    label="Nombre de la Categoria"
                    variant="outlined"
                    name="categoria"
                    value={categoriaDatos.categoria}
                    onChange={handleChange}
                    sx={{ marginRight: "2%", marginTop: "2%" }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: "2%", marginLeft: "2%", marginTop: "2.5%" }}
                >
                    Guardar
                </Button>
            </form>
            <Box>

                <Paper elevation={5} sx={{ marginX: "10%", marginTop: 5, alignSelf: "center" }}>
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
                sx={{ marginTop: "5%", marginX: "50%" }}
            >
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Atrás
                </Button>
            </Box>
        </div>

    );
};

export default CategoriaFormulario;