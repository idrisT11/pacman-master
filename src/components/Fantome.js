
import React from 'react';
import Tile from './Tile';

import '../style/fantom.css';

const   RIGHT = 0,
        DOWN = 1,
        LEFT = 2,
        UP = 3;


export default class Fantome extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            direction: UP,
            next_direction: -1,
            arret: false,
            pos: {
                x: Math.floor(600*9/19)+1,
                y: Math.floor(650*10/21)+1
            }
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.frame !== this.props.frame) {
            this.moveFantome();
        }
    }



    moveFantome(){
        const quantity = 1;

        let pos = this.state.pos;
        let new_pos = Object.create(pos);

        let grid_pos = this.pos_2_grid();

        
        if (this.state.arret || this.isNewDirectionAvailable()) {


            let next_direction = this.state.next_direction;

            if (this.state.next_direction == -1) {
                var val;
                do{
                    val = getRandomInt(4);
                }while( Math.abs(this.state.direction - val) == 2 || !this.caseLibre(val));

                next_direction = val;
            }

            if (this.isNewDirectionAvailable() && next_direction != this.state.direction) {
                if (next_direction == UP || next_direction == DOWN) {
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

            if (next_direction != this.state.direction || this.state.arret || this.state.next_direction==-1) {
                        
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
        else{
            if (this.isImpasse()) {
                this.setState({next_direction: (this.state.direction+2)%4, arret: false});
            }
            else{
                this.setState({next_direction: -1});
            }
        }
        
        if (this.isImpasse()) {
            this.setState({next_direction: UP, arret: false, direction: (this.state.direction+2)%4});
        }
        

        
        switch (this.state.direction) {

            case RIGHT:
                if (pos.x >= 600) {
                    new_pos.x = 2;
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
                    new_pos.x = 600-30;
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
        this.props.handleTryEatPacman(new_pos_grid);
        
        this.setState({
            pos:new_pos
        })
    }


    caseLibre(direction){
        let grid_pos = this.pos_2_grid(),
            p = this.props.plateau;

        switch(direction){
            case RIGHT:
                return (p[grid_pos.y][grid_pos.x+1] != 0);
            case LEFT:
                return (p[grid_pos.y][grid_pos.x-1] != 0);
            case UP:
                return (p[grid_pos.y-1][grid_pos.x] != 0);
            case DOWN:
                return (p[grid_pos.y+1][grid_pos.x] != 0);

            default:
                return false;
        }

        
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

    isImpasse(){
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

        
        return cpt == 1;     
    }

    getPosDir(position, direction){
        let scaleValue = (direction==LEFT) ? -1 : 1;
        return {
            top: position.y + "px",
            left: position.x + "px",
            transform: "scaleX("+ scaleValue +")",
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
                className='fantome-layer' 
            >
                <div 
                    className='fantome'
                    id={"fantome"+this.props.fantome}
                    style={this.getPosDir(this.state.pos, this.state.direction)}
                >

                </div>
            </div>
        )
    }


};


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }