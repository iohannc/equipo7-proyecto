// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const passport = require('passport');

// Configuración de base de datos
const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
	);
mongoose.set("debug", true)

require('./models/Usuario')
require('./models/Historia')
require('./config/passport') // Necesario para que funcione el inicio de sesión.
app.use(passport.initialize());
app.use(passport.session());

//Configurando las rutas
app.use('/v1', require('./routes'));

// Inicializando el servidor
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});

