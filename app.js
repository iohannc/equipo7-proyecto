// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuración de base de datos
const mongoose = require('mongoose');

mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fncuh.mongodb.net/biblioteca_de_terror?retryWrites=true&w=majority`
	);

mongoose.set("debug", true)

require('./models/Usuario')
require('./models/Historia')

//Configurando las rutas
app.use('/v1', require('./routes'));

// Inicializando el servidor
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
