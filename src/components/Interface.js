
import React from 'react';

import '../style/interface.css';

export default class Interface extends React.Component{

    constructor(props){
        super(props);

    }


    render(){
        return(
            <div id='interface'>
                <div id='overlay' style={{display: this.props.gameover?'flex': 'none'}}>
                    <div>
                        GAMEOVER !
                    </div>
                </div>
                <h1>Pacman-Master</h1>
                <div id='score'>
                    Votre score: {this.props.score}
                </div>
            </div>
        )
    }


};
