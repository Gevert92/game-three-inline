//Importaciones npm
import React, { useEffect, useState, Fragment } from 'react';

//Importaciones de componentes
import HistoryMessage from './HistoryMessage';
import HistoryGames from './HistoryGames';
import ModalStartGame from './ModalStartGame';

//Importaciones propias
import clientAxios from '../../../config/axios'
import './history.css';

const  ListGames = ( {saveIdGame, saveMarcaStartGame} ) => {
    //Variables states
    const [ games, saveGames ] = useState([]);
    const [modalStartGame, saveModalStartGame] = useState(false);

    //Traer el listado de partidas
    useEffect( () =>{
        clientAxios.get('/api/games')
            .then((response) => {
                saveGames(response.data.data);
            })
            .catch((error) => {
                console.log(`>>>ERROR: ${error}`);
            });
    }, []);
    
    //Verificar que componente debe mostrar en el body de la tabla
    let componentTable;
    if(games.length===0){
        componentTable = <HistoryMessage />;
    }else{
        componentTable = <HistoryGames
                            games={games}
                            saveIdGame={saveIdGame}
                        />;
    }

    return (
        <Fragment>
            {/* Boton de iniciar nueva partida */}
            <div className="col-md-12 mt-3 text-center">
                <button 
                    className="btn btn-info" 
                    id="btn-history"
                    onClick={ () => saveModalStartGame(true) }
                >
                    Iniciar Nuevo Juego
                </button>
            </div>
            
            {/* Historial de las partidas */}
            <div className="col-md-12 mt-5 text-center">
                <h2>HISTORIAL DE PARTIDAS</h2>
            </div>
            <div className="col-md-12 text-center table-responsive">
                <table className="table" id="table-history">
                    <thead className="thead-dark">
                        <tr>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Finalización</th>
                            <th>Estado de la partida</th>
                            <th>Ganador de la partida</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        { componentTable }
                    </tbody>
                </table>
            </div>

            {/* Modal al iniciar nuevo juego */}
            <ModalStartGame
                modalStartGame={modalStartGame}
                saveModalStartGame={saveModalStartGame}
                saveMarcaStartGame={saveMarcaStartGame}
            />
        </Fragment>
    );
} 
export default ListGames;