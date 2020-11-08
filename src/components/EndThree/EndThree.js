import React from 'react';
import { useHistory, useLocation } from "react-router";
import './EndThree.css';


const EndThree = () => {
    const history = useHistory();
    const location = useLocation();

    return(
        <div>
            <h1 style={{textAlign: "center", fontSize: 60, marginTop: "10%"}}>End of Part 3</h1>
            <button className={'end-two-next'} onClick={() => {history.push({pathname: "/EndOfExperiment", 
                data: {
                    id: location.data.id, 
                    hoursAgo: location.data.hoursAgo, 
                    hungerLevel: location.data.hungerLevel, 
                    secondHungerLevel: location.data.secondHungerLevel, 
                    bidPrices: location.data.bidPrices, 
                    hungerLevelGuess: location.data.hungerLevelGuess,
                    bidPricesGuess: location.data.bidPricesGuess,
                    randomBidPrice: location.data.randomBidPrice,
                    randomHungerLevel: location.data.randomHungerLevel,
                    updatedBidGuess: location.data.updatedBidGuess
                }
            })}}>Next</button>
        </div>
    )
}

export default EndThree;