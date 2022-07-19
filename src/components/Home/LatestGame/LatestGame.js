import React from 'react'
import { Link } from 'react-router-dom'

const LatestGame = ({
    game
}) => {//v malkiq component 6te priemem props, prez koito da polu4im info ili napravo game
  return (
    <div className="game">
    <div className="image-wrap">
        <img src={game.imageUrl} alt="img"/>
    </div>
    <h3>{game.title}</h3>
    <div className="rating">
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
    </div>
    <div className="data-buttons">
        <Link to="#" className="btn details-btn">
            Details
        </Link>
    </div>
</div>
  )
}

export default LatestGame