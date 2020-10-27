'use strict'
/* Configuraciones de Express */

//Importaciones npm
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Importaciones propias
const config = require('./config');

//Variables globales
const app = express();

//Carga de rutas
const gameRoutes = require('./routes/gameRoutes');

//Middlewares
app.use( bodyParser.urlencoded({extended:false}) );
app.use( bodyParser.json() );

//Habilitar CORS
const corsOptions = {
    origin: ( origin, callback ) => {
        const whiteList = config.whiteList;

        if( whiteList.includes(origin) || !origin ){
            callback( null, true );
        }else{
            callback( new Error('No permitido por CORS') );
        }
    }
};
app.use( cors(corsOptions) );

//Rutas
app.use('/api', gameRoutes);

//Exportaciones
module.exports = app;