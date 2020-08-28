import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import './End.css';

const End = () => {
    const history = useHistory();
    const location = useLocation();
    const [endHungerLevel, setEndHungerLevel] = useState();

    function sendToFireBase() {
        var data = { id: location.data.id, hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel, bidPrices: location.data.bidPrices, endHungerLevel: endHungerLevel }
        console.log(data)
        // Link to firebase
        history.push({pathname: "/pay"})
    }

    return(
        <div>
            Rate on a scale of 1 - 10, As of now, describe your level of satiety (Fullness)?
            <input type="number" value={endHungerLevel} min="1" max="10" onChange={e => setEndHungerLevel(e.target.value)}/>
            { endHungerLevel ? <button onClick={() => {sendToFireBase()}}>Next</button> : null }
        </div>
    )
}

export default End;