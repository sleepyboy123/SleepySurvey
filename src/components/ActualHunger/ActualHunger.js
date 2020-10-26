import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import firebase from '../Firestore';

import './ActualHunger.css';

const ActualHunger = () => {
    const history = useHistory();
    const location = useLocation();

    const [randomHungerLevel, setRandomHungerLevel] = useState('');
    const [randomBidPrice, setRandomBidPrice] = useState('');

    const auth = firebase.auth();


    // Similar to component did mount
    useEffect(() => {
        auth.signInWithEmailAndPassword('sleepysurvey123@gmail.com', 'Asdasd123%').then(cred => {

        })
        // let randomNumber = (Math.floor(Math.random() * 20) + 1).toString()
        let randomNumber = (Math.floor(Math.random() * 5) + 1).toString()
        let randomId
        if (randomNumber.length === 1) {
            randomId = '100' + randomNumber
        } else {
            randomId = '10' + randomNumber
        }
        console.log(randomId)
        const db = firebase.firestore();
        // var dataRef = db.collection("bidPrices");
        var dataRef = db.collection("test");
        var query = dataRef.where("id", "==", randomId);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data())
                setRandomBidPrice(doc.data()["bidPrices"]) 
                setRandomHungerLevel(doc.data()["secondHungerLevel"])
            })
        }).catch(function(error) {
            console.log("Error getting document: ", error)
        })  
    })

    return (
        <div>
            <h2 style={{textAlign: "center"}}><u>Part 3</u></h2>
            <h3 style={{textAlign: "center"}}>
                The actual level of (Fullness) the randomly assigned participant had chosen in Q3 of the "satiety-level questionnaire" is:
            </h3>
            <h3 style={{textAlign: "center"}}>
                (1 being the least satiated (i.e. most hungry) and 10 being the most satiated (i.e. least hungry))
            </h3>
            <h3 style={{textAlign: "center"}}>
                { randomHungerLevel === '' ? <div>Loading...</div> : <div>{randomHungerLevel}</div>}
            </h3>
            <br></br>
            <h3 style={{textAlign: "center"}}>
                Based on the actual satiety level provided to you, for each of the rows, guess the options that he/she has chosen for each of the item again
            </h3>
            <h3 style={{textAlign: "center"}}>
                Note: if you are unsure or have any questions, please do not proceed. Please seek clarifications from the assistants immediately.
            </h3>
            
            <br></br>
            <div className={'next_guess'}>
                <button onClick={() => {history.push({pathname: "/ExperimentThree",
                data: {
                    id: location.data.id, 
                    hoursAgo: location.data.hoursAgo, 
                    hungerLevel: location.data.hungerLevel, 
                    secondHungerLevel: location.data.secondHungerLevel, 
                    bidPrices: location.data.bidPrices, 
                    hungerLevelGuess: location.data.hungerLevelGuess,
                    bidPricesGuess: location.data.bidPricesGuess,
                    randomBidPrice: randomBidPrice,
                    randomHungerLevel: randomHungerLevel
                }
                })}}>Next</button>
            </div>
        </div>
    )
}

export default ActualHunger;