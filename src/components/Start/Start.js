import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import './Start.css';

const Start = () => {
    const history = useHistory();
    const location = useLocation();
    const [hoursAgo, setHoursAgo] = useState();
    const [hungerLevel, setHungerLevel] = useState();
    const [secondHungerLevel, setSecondHungerLevel] = useState();
    const [next, setNext] = useState(false)

    function nextPage() {
        if (hoursAgo && hungerLevel) {
            setNext(true)
        } else {
            alert('please answer all the questions')
        }
    }

    return(
        <div style={{marginTop: "10%"}}>
            <h1 className={'heading'}>Satiety Level Questionnaire</h1>
            <div className={'start_container'}>
                {
                    next === false ? 
                    <div>
                        How many hours ago did you have your last meal before coming to the experiment?
                        <input className={'input'} type="number" value={hoursAgo} min="1" max="24" onChange={e => setHoursAgo(e.target.value)}/>
                        <br></br>
                        <br></br>
                        On a scale of 1-10, rate your level of satiety (Fullness) when you first entered the lab?
                        <br></br>
                        1 being the least satiated (i.e most hungry) and 10 being the most satiated (i.e least hungry)
                        <input className={'input'} type="number" value={hungerLevel} min="1" max="10" onChange={e => setHungerLevel(e.target.value)}/>
                        <br></br>
                        
                        <h3 style={{textAlign: "center"}}><strong>DO NOT PRESS NEXT UNTIL YOU ARE TOLD TO DO SO</strong></h3>
                        <div style={{textAlign: "center"}}>
                        <button onClick={() => {nextPage()}}>next</button>
                        </div>
                    </div>
                    :
                    <div>
                        On a scale from 1 - 10, rate your current level of satiety (Fullness)?
                        <br></br>
                        1 being the least satiated (i.e most hungry) and 10 being the most satiated (i.e least hungry)
                        <input className={'input'} type="number" value={secondHungerLevel} min="1" max="10" onChange={e => setSecondHungerLevel(e.target.value)}/>
                    </div>
                }
                <br></br>
                <div style={{textAlign: "center"}}>
                    { secondHungerLevel && hoursAgo && hungerLevel ? <button className={'next'} onClick={() => {history.push({pathname: "/experiment", data: {id: location.id, hoursAgo: hoursAgo, hungerLevel: hungerLevel, secondHungerLevel: secondHungerLevel}})}}>Next</button> : null }
                </div>
            </div>
        </div>
    )
}

export default Start;