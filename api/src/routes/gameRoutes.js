'use strict'

//Importaciones npm
const express = require('express');

//Importaciones propias
const gameController = require('../controllers/gameController');

//Variables globales
const api = express.Router();

api.get('/games', gameController.getGames);
api.get('/game/:id', gameController.getGameById);
api.post('/create', gameController.createGame);
api.put('/registerMove/:id', gameController.registerMove);

module.exports = api;