import React from 'react';
import ReactDOM  from 'react-dom';
import Player from './components/Player.jsx';


class BlackJack extends React.Component {
  constructor() {
    super();
    this.players =  [];

    this.state = {
      playGame:       false,
      winLoseMessage: ''
    }

  }

  playGameClickHandler() {
    console.log('clicking  lets play');
  
    for(var i = 0; i < 2; i++) {
      this.players[i] =  this.createPlayer(`Player ${i}`);
    }

    this.setState({ 
      playGame:       true,
      winLoseMessage: ''
    });
  }

  createPlayer(playerName) {
    return {
      name:         playerName,
      score:        0,
      stillPlaying: true
    }
  }

  setPlayerScore(id, score) {
    console.log('setting  player score ', id,score, this.players);
    this.players[id].score = score;

    if (score > 21) {
      this.displayWinLoseMessage(`${this.players[id].name}, you have BUSTED! You lose, sorry : (`);
    } else if (score === 21) {
      this.displayWinLoseMessage(`${this.players[id].name}, WINNER! You got Blackjack 21!`); 
    }
  }

  playerFinishedPlaying(id) {
    this.players[id].stillPlaying =  false;
  }


  displayWinLoseMessage(message) {
    console.log('displaying message!!', message);
    this.setState({
      winLoseMessage: message,
      playGame:       false
    })
  }

  render() {
    console.log('rendering GAME w/players: ', this.players);
    return (
      <div>
        <button className="ui primary button" role="button" onClick={this.playGameClickHandler.bind(this)}>Let's Play</button>
        <div id='message'>
          <h2>{this.state.winLoseMessage}</h2>
        </div>
        { 
          
          <div className="ui vertical segments">
           {this.players.map( (player, index) => {
            
               return <Player key={index} 
                              playerId={index}
                              name={player.name} 
                              displayMessage={this.displayWinLoseMessage.bind(this)} 
                              playGame={this.state.playGame} 
                              setScore={this.setPlayerScore.bind(this)} />
            })
           } 
          </div>
        }

           
      </div>
    )
  }
}

ReactDOM.render( <BlackJack />, document.getElementById('blackjack'));
