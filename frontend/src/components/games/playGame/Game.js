//Importacion npm
import React, {Fragment, useState} from 'react';

//Importaciones propias
import clientAxios from '../../../config/axios';

const Game = ( {game, saveGame, saveButtonFinishGame} ) => {
    const [messageFinishGame, saveMessageFinishGame] = useState(`TURNO DE "${game.brand_turn}"`);

    const play = (e) => {
        e.preventDefault();
        clientAxios.put(`/api/registerMove/${game._id}`,
                {
                    position: e.target.id,
                    brand: game.brand_turn
                }
            )
            .then((response) => {
                const dataGame = response.data;
                console.log('response: ', dataGame);
                saveGame(dataGame);
                verifyGame(dataGame);
            })
            .catch((error) => {
                console.log(`>>>ERROR: ${error}`);
            });
    };

    const verifyGame = (dataGame) => {
        //Verificamos si la partida la gano una marca o si quedo empatada, en tal caso se muestra el modal
        if( dataGame.brand_winner!==null ){ //La gano una marca?
            saveMessageFinishGame(`Victoria de "${dataGame.brand_winner}"`);
            saveButtonFinishGame(true);

        }else if(dataGame.tie){ //Quedo empatada?
            saveMessageFinishGame('Empate');
            saveButtonFinishGame(true);
        }
    };

    return ( 
        <Fragment>
            {/* Titulo de quien le toca el turno */}
            <div className="col-sm-4 offset-sm-3 text-center mt-4">
                <h2 className="tittle-game-play">{ messageFinishGame }</h2>
            </div>

            {/* Salto de línea */}
            <div className="w-100"></div>

            {/* Tabla del juego */}
            <div className="col-12 mt-5 mb-5">
                <table>
                    <tbody>
                        <tr>
                            <td id="A1" onClick={play} >{ game.plays.A1==='' ? '-' : game.plays.A1 }</td>
                            <td id="A2" onClick={play} >{ game.plays.A2==='' ? '-' : game.plays.A2 }</td>
                            <td id="A3" onClick={play} >{ game.plays.A3==='' ? '-' : game.plays.A3 }</td>
                        </tr>
                        <tr>
                            <td id="B1" onClick={play} >{ game.plays.B1==='' ? '-' : game.plays.B1 }</td>
                            <td id="B2" onClick={play} >{ game.plays.B2==='' ? '-' : game.plays.B2 }</td>
                            <td id="B3" onClick={play} >{ game.plays.B3==='' ? '-' : game.plays.B3 }</td>
                        </tr>
                        <tr>
                            <td id="C1" onClick={play} >{ game.plays.C1==='' ? '-' : game.plays.C1 }</td>
                            <td id="C2" onClick={play} >{ game.plays.C2==='' ? '-' : game.plays.C2 }</td>
                            <td id="C3" onClick={play} >{ game.plays.C3==='' ? '-' : game.plays.C3 }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
 
export default Game;