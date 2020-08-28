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
            <h1 className={'heading'}>Start</h1>
            <div className={'start_container'}>
                How many hours ago did you have your last meal?
                <input className={'input'} type="number" value={hoursAgo} min="1" max="24" onChange={e => setHoursAgo(e.target.value)}/>
                <br></br>
                Rate hunger on a scale of 1 - 10...
                <input className={'input'} type="number" value={hungerLevel} min="1" max="10" onChange={e => setHungerLevel(e.target.value)}/>
                <br></br>
                { hoursAgo && hungerLevel ? <button className={'next'} onClick={() => {history.push({pathname: "/wait", data: {id: location.id, hoursAgo: hoursAgo, hungerLevel: hungerLevel}})}}>Next</button> : null }
            </div>
        </div>
    )
}

export default Start;