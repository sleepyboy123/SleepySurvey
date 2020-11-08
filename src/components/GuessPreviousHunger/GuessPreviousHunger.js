import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import './GuessPreviousHunger.css';

const GuessPreviousHunger = () => {
    const history = useHistory();
    const location = useLocation();
    const [hungerLevelGuess, setHungerLevelGuess] = useState(null);

    function nextPage() {
        if (window.confirm("Please confirm that your choice is " + hungerLevelGuess)) {
            history.push({pathname: "/ExperimentTwo", 
                data: {
                    id: location.data.id, 
                    hoursAgo: location.data.hoursAgo, 
                    hungerLevel: location.data.hungerLevel, 
                    secondHungerLevel: location.data.secondHungerLevel, 
                    bidPrices: location.data.bidPrices, 
                    hungerLevelGuess: hungerLevelGuess
                }
            })
        } else {
            console.log(location.data)
            alert('Please choose again')
        }
    }

    return (
        <div style={{textAlign: "center", marginTop: "5%", width: "60%", marginLeft: "auto", marginRight: "auto"}}>
            <h2 style={{textAlign: "center"}}>A participant from the previous session has been randoml;y selected and assigned to you. 
            He/she has completed the same exact procedures as you did thus far in the experiment</h2>
            <br></br>
            <h3 style={{textAlign: "center"}}>Round 1: Guess the answer of the randomly selected participant for Q3 of the "satiety-level questionnaire" i.e. his or her level of satiety</h3>
            <h3 style={{textAlign: "center"}}>Q3: On a scale of 1-10 rate your current level of satiety (Fullness)?</h3>
            <h3 style={{textAlign: "center"}}>(1 being the least satiated (i.e. most hungry) and 10 being the most satiated (i.e. least hungry))</h3>
            <div className={'input_guess'} >
            <input type="number" value={hungerLevelGuess} min="1" max="10" onChange={e => setHungerLevelGuess(e.target.value)}/>
            </div>
            <br></br>
            <div className={'next_guess'}>
            {hungerLevelGuess === null ? null : <button onClick={nextPage}>Next</button>}
            </div>
        </div>
    )
}

export default GuessPreviousHunger;