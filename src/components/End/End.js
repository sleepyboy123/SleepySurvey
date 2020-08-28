import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router";

import firebase from '../Firestore';

import './End.css';

import wait2 from '../../pictures/WaitTwo.PNG'

const End = () => {
    const history = useHistory();
    const location = useLocation();
    const [endHungerLevel, setEndHungerLevel] = useState();
    const [state, setState] = useState(false)

    

    function sendToFireBase() {
        var data = { id: location.data.id, hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel, bidPrices: location.data.bidPrices, endHungerLevel: endHungerLevel }
        console.log(data)
        // Link to firebase
        const db = firebase.firestore()
        db.collection("bidPrices").add({
            id: location.data.id,
            hoursAgo: location.data.hoursAgo,
            startHungerLevel: location.data.hungerLevel,
            bidPrices: location.data.bidPrices,
            endHungerLevel: endHungerLevel
        })
        
        history.push({pathname: "/pay"})
    }

    return(
            <div>
                { state ?
                    <div style={{textAlign: "center"}}>
                        Rate on a scale of 1 - 10, As of now, describe your level of satiety (Fullness)?
                        <input style={{marginLeft: 10}} type="number" value={endHungerLevel} min="1" max="10" onChange={e => setEndHungerLevel(e.target.value)}/>
                        { endHungerLevel ? <button onClick={() => {sendToFireBase()}}>Next</button> : null }
                    </div> :
                    <div>
                        <h1 style={{textAlign: "center"}}>End of Experiment</h1>
                        <div style={{textAlign: "center"}}>
                        <img src={wait2}></img>
                        </div>
                        <button style={{display: "grid", margin: "auto", fontSize: 20}} onClick={() => setState(true)}>Next</button>
                    </div>
                }
            </div>


            
    )
}

export default End;