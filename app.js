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

// mongoose.connect(
// 	process.env.MONGODB_URI,
//     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
// 	);
mongoose.connect(
	"mongodb+srv://hugo:hugo@cluster0.fncuh.mongodb.net/biblioteca_de_terror",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
	);
    
mongoose.set("debug", true)

require('./models/Usuario')
require('./models/Historia')
app.use(passport.initialize());
app.use(passport.session());
// Add the line below, which you're missing:
require('./config/passport')
//Configurando las rutas
app.use('/v1', require('./routes'));
// Inicializando el servidor

// app.listen(process.env.PORT, () => {
//     console.log(`Server is listening on ${process.env.PORT}`);
// });
app.listen(4001, () => {
    console.log(`Server is listening on 4001`);
});
