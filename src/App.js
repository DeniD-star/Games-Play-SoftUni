import { Routes, Route, Link } from 'react-router-dom'
import Catalog from './components/Catalog/Catalog';
import CreateGame from './components/CreateGame/CreateGame';
import EditGame from './components/EditGame/EditGame';
// import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import { useEffect, useState } from 'react';
import * as gameService from './services/gameService';
import Details from './components/Details/Details';

function App() {
  const [games, setGames] = useState([]);//prazen masiv, za6toto neiskame pri purvoto renderirane da gurmi i zatova trqbva da e ili prazen masiv, v slu4ai 4e nqmame igri

    useEffect(() => {
        //a tuk az expectvam igrite koito da gi setna na setGames(otgovornost na componenta)
        gameService.getAll()
            .then(result => {
                setGames(result)
            })
    }, [])

  return (
    <div id="box">
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home games={games}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/edit" element={<EditGame />} />
          <Route path="/catalog" element={<Catalog games={games}/>} />
          <Route path="/catalog/:gameId" element={<Details games={games}/>} />
        </Routes>
      </main>

    </div>

  );
}

export default App;
