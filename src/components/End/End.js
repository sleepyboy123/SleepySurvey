import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import { random } from '../../random';

import firebase from '../Firestore';

import './End.css';

import end from '../../pictures/End.PNG'

const End = () => {
    const location = useLocation();

    const [state, setState] = useState(false);
    const [payout, setPayout] = useState();
    const [choice, setChoice] = useState();
    const [item, setItem] = useState();
    const [price, setPrice] = useState();

    const auth = firebase.auth();

    const chosenEntries = Object.entries(random)
    const temp = JSON.parse(location.data.bidPrices)
    const bidEntries = Object.entries(temp)

    // Similar to component did mount
    useEffect(() => {
        auth.signInWithEmailAndPassword('sleepysurvey123@gmail.com', 'Asdasd123%').then(cred => {

        })
    })

    function sendToFireBase() {
        // Link to firebase
        const db = firebase.firestore()
        db.collection("bidPrices").add({
            id: location.data.id,
            hoursAgo: location.data.hoursAgo,
            hungerLevel: location.data.hungerLevel,
            secondHungerLevel: location.data.secondHungerLevel,
            bidPrices: location.data.bidPrices,
        })
    }

    function calculatePay() {
        sendToFireBase()
        for (const [key1, value1] of bidEntries) {
            for (const [key2, value2] of chosenEntries) {
                if (key1 === key2) {
                    setItem(key1)
                    setPrice(value2)
                    if (value1 >= value2) {
                        // Take Item
                        setPayout(key1)
                        setChoice('Take the item')
                    } else {
                        // Get Money
                        setPayout(value2)
                        setChoice('Take the money')
                    }
                }
            }
        }
        setState(true)
    }

    return (
        <div>
            { state === false ? 
            <div>
                <h1 style={{textAlign: "center"}}>End of Experiment</h1>
                <div style={{textAlign: "center"}}>
                <img alt="end" src={end}></img>
                </div>
                <button style={{display: "grid", margin: "auto", fontSize: 20}} onClick={() => calculatePay()}>Next</button>
            </div> 
            :
            <div style={{fontSize: 20}}>
                <h1 style={{textAlign: "center"}}>Payout</h1>
                <br></br>  
                <div style={{fontSize: 25, textAlign: "center"}}>
                    {location.data.id}
                    <br></br>
                    The randomly selected item: {item}
                    <br></br>
                    The randomly selected price: {price}
                    <br></br>
                    Your chosen answer at the randomly selected price: {choice}
                    <br></br>
                    Your payout: {payout}
                </div>
            </div>
            }
        </div>
    )
}

export default End;