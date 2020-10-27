//Importacion npm
import React, {Fragment, useState} from 'react';

//Importaciones propias
import clientAxios from '../../../config/axios';

const Game = ( {game, saveGame, saveButtonFinishGame, winnerLine, saveWinnerLine} ) => {
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
                saveGame(dataGame);
                verifyGame(dataGame);
            })
            .catch((error) => {
                console.log(`>>>ERROR: ${error}`);
            });
    };

    const verifyGame = (dataGame) => {
        //Verificamos si la partida la gano una marca o si quedo empatada, en tal caso se muestra el modal
        if( dataGame.code===1 && dataGame.data.brand_winner!==null ){ //La gano una marca?
            saveMessageFinishGame(`Victoria de "${dataGame.data.brand_winner}"`);
            saveWinnerLine(dataGame.winnerLines);
            saveButtonFinishGame(true);

        }else if( dataGame.code===1 && dataGame.data.tie){ //Quedo empatada?
            saveMessageFinishGame('Empate');
            saveButtonFinishGame(true);

        }else if(dataGame.code===1){
            saveMessageFinishGame(`TURNO DE "${dataGame.data.brand_turn}"`);

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
                            <td className={ winnerLine.includes("A1") ? 'fijo' : '' } id="A1" onClick={play} >{ game.plays.A1==='' ? '-' : game.plays.A1 }</td>
                            <td className={ winnerLine.includes("A2") ? 'fijo' : '' } id="A2" onClick={play} >{ game.plays.A2==='' ? '-' : game.plays.A2 }</td>
                            <td className={ winnerLine.includes("A3") ? 'fijo' : '' } id="A3" onClick={play} >{ game.plays.A3==='' ? '-' : game.plays.A3 }</td>
                        </tr>
                        <tr>
                            <td className={ winnerLine.includes("B1") ? 'fijo' : '' } id="B1" onClick={play} >{ game.plays.B1==='' ? '-' : game.plays.B1 }</td>
                            <td className={ winnerLine.includes("B2") ? 'fijo' : '' } id="B2" onClick={play} >{ game.plays.B2==='' ? '-' : game.plays.B2 }</td>
                            <td className={ winnerLine.includes("B3") ? 'fijo' : '' } id="B3" onClick={play} >{ game.plays.B3==='' ? '-' : game.plays.B3 }</td>
                        </tr>
                        <tr>
                            <td className={ winnerLine.includes("C1") ? 'fijo' : '' } id="C1" onClick={play} >{ game.plays.C1==='' ? '-' : game.plays.C1 }</td>
                            <td className={ winnerLine.includes("C2") ? 'fijo' : '' } id="C2" onClick={play} >{ game.plays.C2==='' ? '-' : game.plays.C2 }</td>
                            <td className={ winnerLine.includes("C3") ? 'fijo' : '' } id="C3" onClick={play} >{ game.plays.C3==='' ? '-' : game.plays.C3 }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
 
export default Game;