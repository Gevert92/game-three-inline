'use strict'
//Importaciones npm
const moment = require('moment');

//Importaciones propias
const gameModel = require('../models/gameModel');
const generalController = require('./generalController');

//Variables globales
/*
* Objeto que indica los campos obligatorios que debe recibir cada metodo.
*/
const requiredDataPetition = {
    getGameById: ['id'],
    createGame: ['brandTurn'],
    registerMove: ['id', 'position', 'brand']
};

/*
* Obtener todas las partidas.
*/
async function getGames(req, res){
    //Declaración de data de respuesta
    let status = 200;
    let response = {
        code: 1,
        tag: 'SUCCESS',
        message: '',
        data: false
    }

    //Extración de la data
    try {
        const findResponse = await gameModel.find({});
        
        //Valores de respuesta
        response.message = 'Se han obtenido las partidas de forma exitosa';
        response.data = findResponse;
    } catch (error) {
        console.log(">>>ERROR: Fallo en metodo getGames => ", error);

        status = 500;
        response = {
            code: 0,
            tag: 'ERROR',
            message: 'Ha ocurrido un error inesperado',
            data: false
        }
    }

    res.status(status).send(response);
}

/*
* Obtener una partida por id.
*/
async function getGameById(req, res){
    //Extración de data
    const data = req.params;

    //Declaración de data de respuesta
    let status = 200;
    let response = {
        code: 1,
        tag: 'SUCCESS',
        message: '',
        data: data
    }

    //Se verifica si llega la data necesaria
    const dataVerified = generalController.verifyDataPetition( requiredDataPetition['getGameById'], data );
    if( dataVerified.code==0 ){
        res.status(status).send(dataVerified);
        return false;
    }

    //Extración de la data
    try {
        const findResponse = await gameModel.findById(data.id);
        //Verificamos que la partids exista
        if( findResponse==null ){
            response = {
                code: 0,
                tag: 'GAME_NOT_EXIST',
                message: 'La partida no existe',
                data: false
            }
            res.status(status).send(response);
            return false;
        }
        
        //Valores de respuesta
        response.message = 'Se han obtenido la partida de forma exitosa';
        response.data = findResponse;
    } catch (error) {
        console.log(">>>ERROR: Fallo en metodo getGameById => ", error);

        status = 500;
        response = {
            code: 0,
            tag: 'ERROR',
            message: 'Ha ocurrido un error inesperado',
            data: false
        }
    }

    res.status(status).send(response);
}

/*
* Crear una partida.
* params:
*   - marcaTurn: La marca (X o O) que empezará jugando.
*/
async function createGame(req, res){
    console.log('createGame');
    //Extración de data
    const data = req.body;

    //Instanciar
    const game = new gameModel();
    const now = moment();

    //Declaración de data
    let status = 201;
    let response = {
        code: 1,
        tag: 'SUCCESS',
        message: '',
        data: data
    }

    //Se verifica si llega la data necesaria
    const dataVerified = generalController.verifyDataPetition( requiredDataPetition['createGame'], data );
    if( dataVerified.code==0 ){
        status = 200;
        res.status(status).send(dataVerified);
        return false;
    }

    try{
        //Seteo de los valores a guardar
        game.brand_turn = data.brandTurn.toUpperCase();
        game.start_time = now.format('Y-M-D h:m:s');
        const saveResponse = await game.save();

        //Valores de respuesta
        response.message = 'Partida creada exitosamente';
        response.data = saveResponse;

    }catch(error){
        console.log(">>>ERROR: Fallo en metodo createGame => ", error);

        //Valores de respuesta
        status = 500;
        response = {
            code: 0,
            tag: 'ERROR',
            message: 'Ha ocurrido un error inesperado',
            data: false
        }
    }

    res.status(status).send(response);
}

/*
* Registrar un movimiento dentro de una partida.
* params:
*   - id: Id de la partida.
*   - position: Posición donde se realizo la jugada.
*   - marca: La marca que realizo la jugada.
*/
async function registerMove(req, res){
    //Extración de data
    const data = req.body;
    const params = req.params;

    //Instanciar
    const now = moment();

    //Declaración de data
    let status = 200;
    let response = {
        code: 1,
        tag: 'SUCCESS',
        message: '',
        data: data,
        data: params
    }

    //Unimos los dos datos para poder verificarlos
    let dataVerify = JSON.parse(JSON.stringify(data));
    dataVerify = Object.assign(dataVerify, params);

    //Se verifica si llega la data necesaria
    const petitionResponse = generalController.verifyDataPetition( requiredDataPetition['registerMove'], dataVerify );
    if( petitionResponse.code==0 ){
        res.status(status).send(petitionResponse);
        return false;
    }

    try{
        const position = data.position;
        const brand = data.brand.toUpperCase();

        //Obtener la partida y verificar que exista
        const dataGame = await gameModel.findById(params.id);
        if( dataGame==undefined || dataGame==null || dataGame=='' ){            
            status = 200;
            response = {
                code: 2,
                tag: 'GAME_NOT_EXIST',
                message: 'El juego no existe',
                data: dataGame
            }
            res.status(status).send(response);
            return false;
        }

        //Validar que las condiciones del juego se den para realizar el movimiento
        const conditionsResponse = verifyConditionsGame( dataGame, data );
        if( conditionsResponse.code!=1 ){
            res.status(status).send(conditionsResponse);
            return false;
        }

        //Todo ok, se procede a realizar el movimiento
        let plays = dataGame.plays;
        let brandTurn = dataGame.brand_turn;
        let dataUpdate = {};

        //Actualizar jugada
        plays[position] = brand;
        dataUpdate.plays = plays;

        //Actualizar a quien le quedo el turno
        if( brandTurn=='X' ){
            dataUpdate.brand_turn = 'O';
        }else{
            dataUpdate.brand_turn = 'X';
        }

        //Determinar si existe un ganador o un empate
        const winnerResponse = verifyWinnerOrTie(plays);
        if( winnerResponse.winner ){
            dataUpdate.brand_winner = winnerResponse.brand;
            dataUpdate.end_time = now.format('Y-M-D h:m:s');

        }else if(winnerResponse.tie){
            dataUpdate.tie = true;
            dataUpdate.end_time = now.format('Y-M-D h:m:s');
        }

        //Actualizar partida
        dataUpdate.updated_at = now.format('Y-M-D h:m:s');
        const saveResponse = await gameModel.findOneAndUpdate({_id: params.id}, dataUpdate, {new: true});
        
        //Valores de respuesta
        response.message = 'Se ha registrado el movimiento de forma exitosa';
        response.data = saveResponse;


    }catch(error){
        console.log(">>>ERROR: Fallo en metodo registerMove => ", error);

        //Valores de respuesta
        status = 500;
        response = {
            code: 0,
            tag: 'ERROR',
            message: 'Ha ocurrido un error inesperado',
            data: false
        }
    }

    res.status(status).send(response);
}

//Zona de funciones privadas
/*
* Detecta si existe una combinación ganadora y de quien es.
*/
function verifyWinnerOrTie(data){
    const plays = data;

    //Posibles líneas para ganar la partida
    const lineWinner = [
        ['A1','A2','A3'],
        ['B1','B2','B3'],
        ['C1','C2','C3'],
        ['A1','B1','C1'],
        ['A2','B2','C2'],
        ['A3','B3','C3'],
        ['A1','B2','C3'],
        ['C1','B2','A3']
    ];

    //Data de respuesta
    let response = {
        winner: false,
        tie: false,
        brand: '',
        lines: []
    };

    //Verificar ganador
    let position1 = '';
    let position2 = '';
    let position3 = '';
    for (let i = 0; i < lineWinner.length; i++) {
        position1 = lineWinner[i][0];
        position2 = lineWinner[i][1];
        position3 = lineWinner[i][2];

        if( 
            plays[position1]!='' && plays[position2]!='' && plays[position3]!='' &&
            plays[position1]===plays[position2] && plays[position2]===plays[position3]
        ){
            response = {
                winner: true,
                brand: plays[position2],
                lines: lineWinner[i]
            };
            break;
        }        
    }

    //En caso de que no exista ganador, verificamos si termino el juego para declarar el empate.
    if( !response.winner ){
        let positionEmpty = false;
        
        for( let [keyPlay, valuePlay] of Object.entries(plays) ){
            if( valuePlay=='' ){
                positionEmpty = true;
                break;
            }
        }

        if( !positionEmpty ){
            response = {
                tie: true
            };
        }
    }

    return response;
}

function verifyConditionsGame( dataGame, dataInput ){
    //Data actual de la partida
    const plays = dataGame.plays;
    const brandTurn = dataGame.brand_turn;
    const endTime = dataGame.end_time;

    //Data entrante para el movimiento
    const positionInput = dataInput.position;
    const brandInput = dataInput.brand.toUpperCase();

    //Data de respuesta
    let response = {
        code: 1
    };

    //Verificaciones
    if( endTime!=null ){ //Verificar que la partida no este finalizada
        if( dataGame.tie ){
            //Partida finalizada en empate
            response = {
                code: 3,
                tag: 'TIE_EXIST',
                message: 'Esta partida quedo en empate',
                data: dataGame
            };

        }else{
            //Partida finalizada con ganador
            response = {
                code: 4,
                tag: 'WINNER_EXIST',
                message: `Esta partida la ganó la marca '${dataGame.brand_winner}'`,
                data: dataGame
            };
        }

    }else if( plays[positionInput]!="" || plays[positionInput]==undefined ){ //Verificamos que la posición a jugar este vacia, es decir que no se jugara antes
        response = {
            code: 5,
            tag: 'POSITION_NOT_EMPTY',
            message: 'Esta posición ya esta jugada',
            data: dataGame
        };

    }else if( brandTurn!=brandInput ){ //Verificar que la marca entrante sea a la que le toca jugar.
        response = {
            code: 6,
            tag: 'BRAND_NOT_PLAY',
            message: `No le toca el turno a la marca '${brandInput}'`,
            data: dataGame
        };
    }

    return response;
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    registerMove
}