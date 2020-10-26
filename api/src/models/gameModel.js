'use strict'

//Importaciones npm
const mongoose = require('mongoose');
const moment = require('moment');

//Variables globales//Instanciar
const now = moment();
const schema = mongoose.Schema;

/* Esquema del modelo game
*  Campos:
*   - brand_winner: Identifica quien gano la partida, los valores son "X" o "O".
*   - tie: Indica si la partida termino en un empate.
*   - brand_turn: Identifica quien quedo en el turno para la proxima jugada, los valores son "X" o "O".
*   - plays: Identifica las jugadas que se llevan y quien las realizo, cada uno representa una posición.
*   - start_time: Identifica el tiempo en el que se inicio el juego.
*   - end_time: Identifica el tiempo en el que finalizo la partida, si esta vacio o null, es porque esta iniciada.
*   - updated_at: Marca de tiempo para detectar la última actualización del registro.
*/
const GameSchema = schema({
    brand_winner: { 
        type: String,
        trim: true,
        default: null
    },
    tie: { 
        type: Boolean,
        default: false
    },
    brand_turn: { 
        type: String,
        trim: true,
        required: true
    },
    plays: { 
        type: Object,
        default: {
            A1: '',
            A2: '',
            A3: '',
            B1: '',
            B2: '',
            B3: '',
            C1: '',
            C2: '',
            C3: ''
        }
    },
    start_time: { 
        type: String,
        default: now.format('Y-M-D h:m:s')
    },
    end_time: { 
        type: String,
        default: null
    },
    updated_at: { 
        type: String,
        default: now.format('Y-M-D h:m:s')
    }
});

module.exports = mongoose.model('Game', GameSchema);