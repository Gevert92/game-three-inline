//Importaciones npm
import React, {Fragment} from 'react';
import {Modal, ModalBody, ModalFooter} from 'reactstrap'

const ModalStartGame = ( {modalStartGame, saveModalStartGame, saveMarcaStartGame} ) => {
    return ( 
        <Fragment>
            <Modal isOpen={ modalStartGame }>
                <ModalBody>
                    <div id="modalHeader">
                        ¿Elija la marca que iniciará el juego?
                    </div>

                    <div id="modalBody">
                        <button 
                            className="btn btn-info btn-x" 
                            id="btn-history"
                            onClick={ () => saveMarcaStartGame('X') }
                        >
                            X
                        </button>

                        <button 
                            className="btn btn-info" 
                            id="btn-history"
                            onClick={ () => saveMarcaStartGame('O') }
                        >
                            O
                        </button>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button 
                        className="btn btn-warning" 
                        id="btn-history"
                        onClick={ () => saveModalStartGame(false) }
                    >
                        Cerrar
                    </button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}
 
export default ModalStartGame;