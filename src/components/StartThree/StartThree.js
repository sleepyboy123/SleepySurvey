import React from 'react';
import { useHistory, useLocation } from "react-router";
import './StartThree.css';

import Start3 from '../../pictures/Start3.PNG';

const StartThree = () => {
    const history = useHistory();
    const location = useLocation();
    console.log(location.data)

    return(
        <div>
            <h1 className={'heading'}>Start of Experiment</h1>
            <h2 className={'heading'}><u>Part 3: Instructions</u></h2>
            <div className={'start_two_container'}>
            <img alt="Start2"  src={Start3} />
            </div>
            <button className={'instruction-next'} onClick={() => {history.push({pathname: "/ActualHunger", 
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

export default StartThree;