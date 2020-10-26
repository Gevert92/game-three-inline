"use strict"
/*
    Inicio del servicio:
        1. Inicia el servidor para la escucha
        2. Incia la conexión con MongoDb
        3. Todas las configuraciones se traen del .env
        4. Se aprueba el cors para el frontend
*/

//Importaciones npm
const mongoose = require('mongoose');

//Importaciones propias
const config = require('./config');
const app = require('./app');

//Data de conexión a la base de datos mongoDB
const hostMongoBD = config.db.mongodb.host;
const portMongoBD = config.db.mongodb.port;
const dataBaseMongoBD = config.db.mongodb.database;

async function startApp(){
    mongoose.connect( `mongodb://${hostMongoBD}:${portMongoBD}/${dataBaseMongoBD}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('>>>SUCCESS: Conexión a Database MongoDB EXITOSA');
        
        //Iniciar servicio
        const listenerPort = config.service.port;
        const baseUrl = config.domain.baseUrl;
        app.listen(listenerPort, () => {
            console.log(`>>>SUCCESS: Se ha iniciado el servicio con EXITO en ${baseUrl}`);
        });
    })
    .catch((error) => {
        console.log(">>>ERROR: Conexión a Database MongoDB FALLIDA => ", error);
    });
}

startApp();
