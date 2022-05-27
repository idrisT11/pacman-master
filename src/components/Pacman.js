
import React from 'react';
import Tile from './Tile';

import '../style/pacman.css';

const   RIGHT = 0,
        DOWN = 1,
        LEFT = 2,
        UP = 3;


export default class Pacman extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            direction: RIGHT,
            next_direction: RIGHT,
            arret: false,
            pos: {
                x: Math.floor(600*2/19)+1,
                y: Math.floor(650*1/21)+1
            }
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.frame !== this.props.frame) {

        this.layer.focus();

        //setInterval(()=>{
            this.movePacman();
        //}, 20);
        }
    }

    changeDirectionPacman(e){
        
        if (e.key == "ArrowLeft") {

            if (this.state.direction != RIGHT) {
                this.setState({next_direction: LEFT});
            }

        }   

        else if (e.key == "ArrowRight") {
            if (this.state.direction != LEFT) {
                this.setState({next_direction: RIGHT});
            }
        }  

        else if (e.key == "ArrowUp") {
            if (this.state.direction != DOWN) {
                this.setState({next_direction: UP});
            }

        }  

        else if (e.key == "ArrowDown") {
            if (this.state.direction != UP) {
                this.setState({next_direction: DOWN});
            }
        }  
    }

    movePacman(){
        const quantity = 1;

        let pos = this.state.pos;
        let new_pos = Object.create(pos);

        let grid_pos = this.pos_2_grid();

        if (this.state.arret || this.isNewDirectionAvailable()) {
            let next_direction = this.state.next_direction;

            if (this.isNewDirectionAvailable() && next_direction != this.state.direction) {
                if (this.state.next_direction == UP || this.state.next_direction == DOWN) {
                    new_pos = {
                        x:Math.floor(600*grid_pos.x/19)+2,
                        y:Math.floor(650*grid_pos.y/21)+1,   
                    }                 
                }
                else
                new_pos = {
                    x:Math.floor(600*grid_pos.x/19)+1,
                    y:Math.floor(650*grid_pos.y/21)+2,   
                }
            }

            if (next_direction != this.state.direction || this.state.arret) {
            
                this.setState({
                    direction: next_direction,
                    next_direction:next_direction,
                    arret: false,
                    pos: {
                        x:Math.floor(600*grid_pos.x/19)+1,
                        y:Math.floor(650*grid_pos.y/21)+1,
                    }
                });
            }
        }


        switch (this.state.direction) {

            case RIGHT:
                if (pos.x >= 600) {
                    new_pos.x = 0;
                    break;
                }
                if (this.props.plateau[grid_pos.y][grid_pos.x+1] == 0 ) {
                    this.setState({arret:true});
                    return;
                }
                new_pos.x += quantity;
                break;

            case DOWN:
                if (this.props.plateau[grid_pos.y+1][grid_pos.x] == 0 ) {
                    this.setState({arret:true});
                    return;
                }
                new_pos.y += quantity;
                break;
            
            case LEFT:
                if (pos.x <= 0) {
                    new_pos.x = 600-12;
                    break;
                }
                if (this.props.plateau[grid_pos.y][grid_pos.x-1] == 0) {
                    this.setState({arret:true});
                    return;
                }
                new_pos.x -= quantity;
            
                break;      
                
            case UP:
                if (this.props.plateau[grid_pos.y-1][grid_pos.x] == 0 ) {
                    this.setState({arret:true});
                    return;
                }
                new_pos.y -= quantity;
                break;
        
            default:
                break;
        }

        let new_pos_grid = this.pos_2_grid(new_pos);
        if (this.props.plateau[new_pos_grid.y][new_pos_grid.x] == 1) {
            this.props.handleMangeBonbon(new_pos_grid);
        }
        
        this.props.handleUpdatePacmanPos(new_pos_grid);

        this.setState({
            pos:new_pos
        })
    }

    isNewDirectionAvailable(){
        let grid_pos = this.pos_2_grid(),
            p = this.props.plateau;
        
        let cpt = 0;


        if ( p[grid_pos.y][grid_pos.x+1] != 0 ) 
            cpt ++;

        if ( p[grid_pos.y][grid_pos.x-1] != 0 ) 
            cpt ++;

        if ( p[grid_pos.y+1][grid_pos.x] != 0 ) 
            cpt ++;

        if ( p[grid_pos.y-1][grid_pos.x] != 0 ) 
            cpt ++;

        

        return cpt >= 3;

    }

    getPosDir(position, direction){
        return {
            top: position.y + "px",
            left: position.x + "px",
            transform: "rotate("+direction*90+"deg)",
        }
    }

    pos_2_grid(pos=null){
        var translate = {
            x:0,
            y:0,
        }

        if (pos == null) 
            pos = this.state.pos;

        if (this.state.direction == UP) 
            translate.y = 22;


        if (this.state.direction == LEFT) 
            translate.x = 22;

        
        return {
            x: Math.floor(19*(pos.x+translate.x)/600),
            y: Math.floor(21*(pos.y+translate.y)/650)
        }
    }

    render(){

        return(
            <div 
                id='pacman-layer' 
                ref={(layer)=>this.layer = layer}
                onKeyDown={(e)=>this.changeDirectionPacman(e)}
                tabIndex="0"
            >
                <div 
                    id='pacman'
                    style={this.getPosDir(this.state.pos, this.state.direction)}
                >

                </div>
            </div>
        )
    }


};
