import React from 'react';
import './Die.css';

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "transparent"
    }
    return (
        <div className='die-face' style={styles} onClick={props.holdDice}>
            <h2 className="die-name">{props.value}</h2>
        </div>
    );
};

export default Die;