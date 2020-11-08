import React from 'react';
import { useHistory, useLocation } from "react-router";
import './EndTwo.css';


const EndTwo = () => {
    const history = useHistory();
    const location = useLocation();

    return(
        <div>
            <h1 style={{textAlign: "center", fontSize: 60, marginTop: "10%"}}>End of Part 2</h1>
            <button className={'end-two-next'} onClick={() => {history.push({pathname: "/StartThree", 
            data: {
                id: location.data.id, 
                hoursAgo: location.data.hoursAgo, 
                hungerLevel: location.data.hungerLevel, 
                secondHungerLevel: location.data.secondHungerLevel, 
                bidPrices: location.data.bidPrices, 
                hungerLevelGuess: location.data.hungerLevelGuess,
                bidPricesGuess: location.data.bidPricesGuess
            }
            })}}>Next</button>
        </div>
    )
}

export default EndTwo;