import { Routes, Route, useNavigate } from 'react-router-dom'
import uniqid from 'uniqid';
import { useEffect, useState, lazy, Suspense } from 'react';
import * as gameService from './services/gameService';
import Details from './components/Details/Details';
import Catalog from './components/Catalog/Catalog';
import CreateGame from './components/CreateGame/CreateGame';
import EditGame from './components/EditGame/EditGame';
// import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';



const Register = lazy(() => import('./components/Register/Register'))




function App() {
  const [games, setGames] = useState([]);//prazen masiv, za6toto neiskame pri purvoto renderirane da gurmi i zatova trqbva da e ili prazen masiv, v slu4ai 4e nqmame igri
  const navigate = useNavigate();
  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id == gameId);//vzimam igrata ot stata s igri, na koqto iskam da dobavq komentar
      const comments = game.comments || [];//vzimam si ve4e su6testvuva6ti masiv s komentari na tazi igra ili inizializiram nov
      comments.push(comment);//dobavqm noviq komentar

      return [
        ...state.filter(x => x._id !== gameId),//tuk iskam da vurna 4isto nov state, v koito si vzimam edinstveno igrata koqto me interesuva
        { ...game, comments }// spretvam igrata i podmenqm stariq masiv s komentari s noviq
      ]
    })
  }



  const addGameHandler = (gameData) => {
    setGames(state => [
      ...state,
      {
        ...gameData,
        _id: uniqid()
      }

    ])
    navigate('/catalog');
  }

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
          <Route path="/" element={<Home games={games} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={
            <Suspense fallback={<span>Loading...</span>}>
              <Register />
            </Suspense>}
          />
          <Route path="/create" element={<CreateGame addGameHandler={addGameHandler} />} />
          <Route path="/edit" element={<EditGame />} />
          <Route path="/catalog" element={<Catalog games={games} />} />
          <Route path="/catalog/:gameId" element={<Details games={games} addComment={addComment} />} />
        </Routes>
      </main>

    </div>

  );
}

export default App;
