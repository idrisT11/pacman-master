
import React from 'react';

import '../style/tile.css';

export default class Tile extends React.Component{

    constructor(props){
        super(props);

    }


    render(){
        return(
            <div>
                {
                this.props.val == 0 && 
                <div className='mur'>
                </div>
                }

                {
                this.props.val == 1 && 
                <div className='ball'>
                    <div className='ball-ball'>
                    </div>
                </div>
                }

                {
                this.props.val == 2 && 
                <div className='vide'>
                </div>
                }
            </div>
        )
    }


};
