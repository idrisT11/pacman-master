import './App.css';

import Plateau  from "./components/Plateau";
import Interface  from "./components/Interface";
import React from 'react';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      score: 0,
      gameover: false,
    }
  }

  handleScore(score){
    this.setState({score:score})
  }

  handleGameover(gameover){
    this.setState({gameover:gameover})
  }

  render(){
    return (
      <div className="App">
        <Plateau handleGameover={this.handleGameover.bind(this)} handleScore={this.handleScore.bind(this)}/>
        <Interface score={this.state.score} gameover={this.state.gameover} />
      </div>
    );
  }

}

export default App;
