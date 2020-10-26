'use strict'
/* Configuraciones de Express */

//Importaciones npm
const express = require('express');
const bodyParser = require('body-parser');

//Variables globales
const app = express();

//Carga de rutas
const gameRoutes = require('./routes/gameRoutes');

//Middlewares
app.use( bodyParser.urlencoded({extended:false}) );
app.use( bodyParser.json() );

//Rutas
app.use('/api', gameRoutes);

//Exportaciones
module.exports = app;