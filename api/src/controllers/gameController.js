'use strict'

//Importaciones propias
const gameModel = require('../models/gameModel');

//Variables globales
/*
* Objeto que indica los campos obligatorios que debe recibir cada metodo.
*/
const requiredDataPetition = {
};

/*
* Obtener todas las partidas.
*/
async function getGames(req, res){
    console.log('Dentro del metodo getGames');
    res.status(200).send('getGames');
}

/*
* Obtener una partida por id.
*/
async function getGameById(req, res){
    console.log('Dentro del metodo getGameById');
    res.status(200).send('getGameById');
}

/*
* Crear una partida.
* params:
*   - marcaTurn: La marca (X o O) que empezará jugando.
*/
async function createGame(req, res){
    console.log('Dentro del metodo getGameById');
    res.status(200).send('createGame');
}

/*
* Registrar un movimiento dentro de una partida.
* params:
*   - id: Id de la partida.
*   - position: Posición donde se realizo la jugada.
*   - marca: La marca que realizo la jugada.
*/
async function registerMove(req, res){
    console.log('Dentro del metodo getGameById');
    res.status(200).send('registerMove');
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    registerMove
}