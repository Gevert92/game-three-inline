import React, {Fragment} from 'react';

const HistoryGames = ( {games, saveIdGame} ) => {    
    return (
        <Fragment>
            { 
                games.map( (game, index) => (
                    <tr key={index}>
                        <th>{game.start_time}</th>
                        <th>{game.end_time}</th>
                        <th>
                            { 
                                game.end_time===null ? 
                                    'Iniciado' 
                                : 
                                    game.tie ? 
                                        'Empatado' 
                                    : 
                                        'Ganado' 
                            }                                            
                        </th>
                        <th>{ game.brand_winner!==null ? game.brand_winner : '-' }</th>
                        <th>
                            { 
                                game.end_time===null ? 
                                    <button 
                                        className="btn btn-info btn-history"
                                        onClick={ () => saveIdGame(game._id) }
                                    >
                                        Reanudar
                                    </button> 
                                : '-' 
                            }
                        </th>
                    </tr>
                ))
            }
        </Fragment>
    );
}
 
export default HistoryGames;