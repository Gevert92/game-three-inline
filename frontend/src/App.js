import React, {useState} from 'react';

//Importaciones de componentes
import Header from './components/header/Header';
import ListGames from './components/games/history/ListGames';
import PlayGame from './components/games/playGame/PlayGame';

function App() {
  //constante para detectar el boton reanudar
  const [idGame, saveIdGame] = useState(false);
  const [marcaStartGame, saveMarcaStartGame] = useState(false);

  //Verificar si se debe mostrar la vista del historial o del juego
  let componentContainerGame;
  if( idGame || marcaStartGame ){
    componentContainerGame =  <PlayGame 
                                idGame={idGame}
                                saveIdGame={saveIdGame}
                                marcaStartGame={marcaStartGame}
                                saveMarcaStartGame={saveMarcaStartGame}
                              />
  }else{
    componentContainerGame =  <ListGames 
                                saveIdGame={saveIdGame}
                                saveMarcaStartGame={saveMarcaStartGame}
                              />
  }

  return (
    <div className="container">
      <div className="row mt-4 pb-4" id="header">
        <Header />
      </div>
      
      <div className="row mt-5" id="container-game">
        { componentContainerGame }
      </div>
    </div>
  );
}

export default App;
