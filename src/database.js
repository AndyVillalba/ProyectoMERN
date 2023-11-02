const mongoose = require('mongoose');
const URI = "mongodb+srv://andy:N99bQPzydjWHR-t@cluster0.tayukkr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI)
.then(db => console.log('Conectado a la BD'))
.catch(err => console.log(err));

module.exports = mongoose;