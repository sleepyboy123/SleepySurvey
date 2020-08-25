import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import './Start.css';

const Start = () => {
    const history = useHistory();
    const location = useLocation();
    const [hoursAgo, setHoursAgo] = useState();
    const [hungerLevel, setHungerLevel] = useState();
    return(
        <div>
            Start<br></br>
            How many hours ago did you have your last meal?
            <input type="number" value={hoursAgo} min="1" max="24" onChange={e => setHoursAgo(e.target.value)}/>
            <br></br>
            Rate hunger on a scale of 1 - 10...
            <input type="number" value={hungerLevel} min="1" max="10" onChange={e => setHungerLevel(e.target.value)}/>
            { hoursAgo && hungerLevel ? <button onClick={() => {history.push({pathname: "/wait", data: {id: location.id, hoursAgo: hoursAgo, hungerLevel: hungerLevel}})}}>Next</button> : null }
        </div>
    )
}

export default Start;