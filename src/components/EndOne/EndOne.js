import React from 'react';
import { useHistory, useLocation } from "react-router";
import './EndOne.css';


const EndOne = () => {
    const history = useHistory();
    const location = useLocation();

    return(
        <div>
            <h1 style={{textAlign: "center", fontSize: 60}}>End of Part 1</h1>
            <button className={'end-next'} onClick={() => {history.push({pathname: "/StartTwo", data: {id: location.data.id, hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel, secondHungerLevel: location.data.secondHungerLevel, bidPrices: location.data.bidPrices}})}}>Next</button>
        </div>
    )
}

export default EndOne;