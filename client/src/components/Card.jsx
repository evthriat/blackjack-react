import React from 'react';
import Hearts from './Hearts.jsx';
import Diamonds from './Diamonds.jsx';
import Spades from './Spades.jsx';
import Clubs from './Clubs.jsx';

const Card = (props) => {
  console.log('rendering CARD');

  const cardSuits = {
      "1":   <Hearts />,
      "2":   <Clubs />,
      "3":   <Spades />,
      "4":   <Diamonds />
    };
  
  const {number, style} =  props.cardData;
  const suit = cardSuits[props.cardData.suit];

  return (
    <div className={style} >
      <div className="top"><span>{number}</span>{suit}</div>
        <h1>{suit}</h1>
      <div className="bottom">{suit}<span>{number}</span></div>
    </div>
  );
}


export default Card;