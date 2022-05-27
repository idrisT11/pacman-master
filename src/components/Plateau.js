
import React from 'react';
import Tile from './Tile';
import Pacman from './Pacman';

import '../style/plateau.css';
import Fantome from './Fantome';


export default class Plateau extends React.Component{

    constructor(props){
        super(props);

        this.interval = null;
        this.pacman_pos = {
            x:0, y:0,
        }

        this.state = {
            frame: 0,
            gameover: false,
            score: 0,
            mapLayout: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 0],
                [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            
                [1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
            
            
                [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
                [0, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
                [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
        }

    }
    

    componentDidMount(){
        this.interval = setInterval(()=>{
            let frame = this.state.frame;
            this.setState({frame: frame+1})
        }, 20);
    }

    handleMangeBonbon(pos){

        let newLayout = [...this.state.mapLayout.map((line)=>[...line])]; //petit trick pour copier le tableau
            newLayout[pos.y][pos.x] = 2;
            
        this.setState({
            mapLayout: newLayout,
            score: this.state.score + 1,
        });  

        this.props.handleScore(this.state.score);
                
    }

    handleUpdatePacmanPos(pos){
        this.pacman_pos = {...pos}; 
    }

    handleTryEatPacman(fantome_pos){
        if (fantome_pos.x == this.pacman_pos.x && fantome_pos.y == this.pacman_pos.y) {
            clearInterval(this.interval);
            this.setState({
                gameover: true,
            });
            this.props.handleGameover(true);

        }
    }

    render(){
        return(
            <div id='plateau'>


                <Pacman 
                    frame={this.state.frame} 
                    plateau={this.state.mapLayout} 
                    handleMangeBonbon={this.handleMangeBonbon.bind(this)}
                    handleUpdatePacmanPos={this.handleUpdatePacmanPos.bind(this)}
                />

                <Fantome frame={this.state.frame} plateau={this.state.mapLayout} fantome="0" handleTryEatPacman={this.handleTryEatPacman.bind(this)}/>
                <Fantome frame={this.state.frame} plateau={this.state.mapLayout} fantome="1" handleTryEatPacman={this.handleTryEatPacman.bind(this)}/>
                <Fantome frame={this.state.frame} plateau={this.state.mapLayout} fantome="2" handleTryEatPacman={this.handleTryEatPacman.bind(this)}/>
                <Fantome frame={this.state.frame} plateau={this.state.mapLayout} fantome="3" handleTryEatPacman={this.handleTryEatPacman.bind(this)}/>
            {
                this.state.mapLayout.map((line, line_idx)=>(
                        
                    line.map((val, idx)=>(
                        <Tile key={line_idx+""+idx} val={val}/>

                    ))
                ))
            }
            </div>
        )
    }


};
