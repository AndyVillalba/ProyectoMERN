const express = require('express');
const body = require('body-parser');

const {mongoose} = require('./database');

//Inicializacion
const app = express();

//Configuraciones
app.set('port',process.env.PORT || 3000);


//Middlewares
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

//Routes
app.use(require('./routes/index-routes'));
app.use('/producto',require('./routes/producto-routes'));
app.use('/categoria',require('./routes/categoria-routes'));
app.use('/carrito',require('./routes/ordenCompra-routes'));


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});

module.exports = app;