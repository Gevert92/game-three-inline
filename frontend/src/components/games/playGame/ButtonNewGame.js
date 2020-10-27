//Importaciones npm
import React, {Fragment} from 'react';

const ButtonNewGame = ({newGame}) => {
    return ( 
        <Fragment>
            <div id="btn-new-game">
                <button 
                    className="btn btn-success btn-x-play" 
                    id="btn-history"
                    onClick={ () => newGame('X') }
                >
                    Iniciar juego con "X"
                </button>

                <button 
                    className="btn btn-success" 
                    id="btn-history"
                    onClick={ () => newGame('O') }
                >
                    Iniciar juego con "O"
                </button>
            </div>
        </Fragment>
    );
}
 
export default ButtonNewGame;