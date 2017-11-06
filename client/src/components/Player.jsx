import React from 'react';
import Card from './Card.jsx';


class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {
      playerId:           props.playerId,
      cards:              [],
      playerDonePlaying:  false,
      score:              0
    }


    this.faceCards = {
      "11": "J",
      "12": "Q",
      "13": "K",
      "1":  "A"
    }

  }

  cardRandomizer() {
    return {
      number: Math.floor(Math.random() * 13) + 1,
      suit: Math.floor(Math.random() * 4) + 1,
      color: Math.floor(Math.random() * 2)
    }
   
  }

  createNewCard() {
    var randomCardData,cardNumber,cardColor = null;

    randomCardData =  this.cardRandomizer();
    cardNumber =  randomCardData.number > 10  ? this.faceCards[randomCardData.number] : randomCardData.number;
    cardColor =  randomCardData.color ? 'black' : 'red';

    return {
      number: cardNumber,
      suit:   randomCardData.suit,
      style:  `${cardColor} shadow rounded cards`,
      score:  randomCardData.number <= 10 ? randomCardData.number : 10
    };
  }

  addCard() {
    console.log('adding a card');
    var newCard = this.createNewCard();
    var newCards =  [...this.state.cards, newCard];
    var newScore  = this.state.score + newCard.score;

    this.setState({
      cards:              newCards,
      score:              newScore
    })

    this.props.setScore(this.state.playerId, newScore);

  }

  dealNewCards() {
    console.log('Dealing new cards for ');
    var newCards =  [];
    var newScore = 0;

    for (var i=0; i < 2;  i++) {
      newCards[i] = this.createNewCard(); 
      newScore += newCards[i].score;
    }

    console.log('current score after mounting: ', newScore);
    
    this.setState({
      cards:              newCards,
      score:              newScore,
      playerDonePlaying:  false
    })

    this.props.setScore(this.state.playerId, newScore);
  }

  componentWillMount() {
    console.log('player  COMPONENT will  mount');
    this.dealNewCards();

  }

  componentWillReceiveProps(nextProps) {
    console.log('PLAYER component will receive props: ', nextProps);
    if (nextProps.playGame){
      this.dealNewCards();
    }
    
  }

  handleStayButtonClick() {
    console.log('clicked handleStayButton');
    this.setState({
      playerDonePlaying: true
    });
  }

 

  render() {
    console.log('rendering a PLAYER w/card data', this.state.cards, this.state.score, this.props.playGame);
    const { cards } =  this.state;
    return (
      <div className="ui segment">
          <div >
            <h2>{this.props.name}'s Cards </h2>
            { cards.map( (card, index) => {
              return <Card cardData={card} key={index} />
            })
            }
          </div>
          <div className="button">
            <button disabled={!this.props.playGame || this.state.playerDonePlaying} className="ui seconday button" role="button" onClick={this.addCard.bind(this)}>Hit</button>
            <button disabled={!this.props.playGame || this.state.playerDonePlaying} className="ui seconday button" role="button" onClick={this.handleStayButtonClick.bind(this)} >Stay</button>
          </div>
          
        </div>
    )
  }
}

export default Player;