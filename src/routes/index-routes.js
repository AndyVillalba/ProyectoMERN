const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('BIENVENIDO A BACK-TIENDA 🛒');
});

module.exports = router;