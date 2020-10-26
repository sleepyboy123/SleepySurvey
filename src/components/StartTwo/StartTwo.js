import React from 'react';
import { useHistory, useLocation } from "react-router";
import './StartTwo.css';

import Start2 from '../../pictures/Start2.png'

const StartTwo = () => {
    const history = useHistory();
    const location = useLocation();

    return(
        <div>
            <h1 className={'heading'}>Start of Experiment</h1>
            <h2 className={'heading'}><u>Part 2</u></h2>
            <div className={'start_two_container'}>
            <img alt="Start2"  src={Start2} />
            </div>
            <button className={'instruction-next'} onClick={() => {history.push({pathname: "/GuessPreviousHunger", 
                data: {id: location.data.id, hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel, secondHungerLevel: location.data.secondHungerLevel, bidPrices: location.data.bidPrices}
            })}}>Next</button>
        </div>
    )
}

export default StartTwo;