//Importaciones npm
import React, {Fragment, useEffect, useState} from 'react';

//Importaciones de componentes
import ButtonNewGame from './ButtonNewGame';

//Importaciones propias
import clientAxios from '../../../config/axios';
import Message from './Message';
import Game from './Game';
import './playGame.css';

const PlayGame = ( {idGame, saveIdGame, marcaStartGame, saveMarcaStartGame} ) => {
    //Variables states
    const [game, saveGame] = useState(false);
    const [buttonFinishGame, saveButtonFinishGame] = useState(false);
    const [winnerLine, saveWinnerLine] = useState([]);

    //Petición de traer data de una partida existente o de crear una nueva
    useEffect( () =>{
        if( idGame ){    
            clientAxios.get(`/api/game/${idGame}`)
                .then((response) => {
                    saveWinnerLine([]);
                    saveGame(response.data);
                })
                .catch((error) => {
                    console.log(`>>>ERROR: ${error}`);
                });

        }else if(marcaStartGame){
            newGame(marcaStartGame);
        }
    }, []);

    //Función para crear nuevo juego
    const newGame = (brandTurn) => {
        saveWinnerLine([]);
        clientAxios.post(`/api/create`,
                {
                    brandTurn: brandTurn
                }
            )
            .then((response) => {
                saveGame(response.data);
            })
            .catch((error) => {
                console.log(`>>>ERROR: ${error}`);
            });
    }

    let componentGame;
    if( game.code===1 ){
        componentGame = <Game 
                            game={game.data}
                            saveGame={saveGame}
                            saveButtonFinishGame={saveButtonFinishGame}
                            winnerLine={winnerLine}
                            saveWinnerLine={saveWinnerLine}
                        />
    }else{
        componentGame = <Message 
                            message={game.message}
                        />

    }

    return ( 
        <Fragment>
            {/* Boton de retroceder */}
            <div className="col-sm-1 mt-4">
                <button 
                    className="btn btn-info" 
                    id="btn-back"
                    onClick={ () => { saveIdGame(false); saveMarcaStartGame(false) } }
                >
                    Atras
                </button>
            </div>

            {/* Espacio del juego */}
            { componentGame }            

            {/* Modal cuando termina una partida */}
            { 
                buttonFinishGame ? 
                    <ButtonNewGame 
                        newGame={newGame}
                    /> 
                : '' 
            }
        </Fragment>
    );
}
 
export default PlayGame;