import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router";
import firebase from '../Firestore';
import { randomPriceOne, randomItemTwo, randomItemThree, K, KTwo, KThree } from '../../random';

import './EndOfExperiment.css';

const EndOfExperiment = () => {
    const history = useHistory();
    const location = useLocation();
    const [payout, setPayout] = useState();
    const [choice, setChoice] = useState();
    const [item, setItem] = useState();
    const [price, setPrice] = useState();
    const [P2R1Square, setP2R1Square] = useState();
    const [P2R1Pay, setP2R1Pay] = useState();

    const [guessPriceTwo, setGuessPriceTwo] = useState();
    const [actualPriceTwo, setActualPriceTwo] = useState();
    const [P2R2Square, setP2R2Square] = useState();
    const [P2R2Pay, setP2R2Pay] = useState();

    const [updatePriceThree, setUpdatePriceThree] = useState();
    const [actualPriceThree, setActualPriceThree] = useState();
    const [P3Square, setP3Square] = useState();
    const [P3Pay, setP3Pay] = useState();

    const auth = firebase.auth();

    const chosenEntries = Object.entries(randomPriceOne)
    const temp = JSON.parse(location.data.bidPrices)
    const bidEntries = Object.entries(temp)

    const tempTwo = JSON.parse(location.data.bidPricesGuess)
    const userGuessTwo = Object.entries(tempTwo)
    const temp_Two = JSON.parse(location.data.randomBidPrice)
    const actualTwo = Object.entries(temp_Two)

    const temp_Three = JSON.parse(location.data.updatedBidGuess)
    const updatedThree = Object.entries(temp_Three)



    // Similar to component did mount
    useEffect(() => {
        auth.signInWithEmailAndPassword('sleepysurvey123@gmail.com', 'Asdasd123%').then(cred => {

        })
        calculatePay()
    }, [])

    function sendToFireBase() {
        // Link to firebase
        const db = firebase.firestore()
        db.collection("bidPrices2").add({
            id: location.data.id, 
            hoursAgo: location.data.hoursAgo, 
            hungerLevel: location.data.hungerLevel, 
            secondHungerLevel: location.data.secondHungerLevel, 
            bidPrices: location.data.bidPrices, 
            hungerLevelGuess: location.data.hungerLevelGuess,
            bidPricesGuess: location.data.bidPricesGuess,
            randomBidPrice: location.data.randomBidPrice,
            randomHungerLevel: location.data.randomHungerLevel,
            updatedBidGuess: location.data.updatedBidGuess
        })
    }

    function nextPage() {
        let totalPay
        if (typeof payout === 'string') {
            totalPay = P2R1Pay + P2R2Pay + P3Pay
            history.push({pathname: "/Payout", data: {totalPay: totalPay, id: location.data.id, item: payout}})
        } else {
            totalPay = payout + P2R1Pay + P2R2Pay + P3Pay
            history.push({pathname: "/Payout", data: {totalPay: totalPay, id: location.data.id, item: ''}})
        }
    }

    function calculatePay() {
        sendToFireBase()
        // Part 1 Payment
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
        // Part 2 Round 1 Payment
        setP2R1Square((parseInt(location.data.hungerLevelGuess) - parseInt(location.data.randomHungerLevel)) ** 2)
        if (((parseInt(location.data.hungerLevelGuess) - parseInt(location.data.randomHungerLevel)) ** 2) <= K) {
            setP2R1Pay(5.00)
        } else {
            setP2R1Pay(0)
        }
        let guess_Two
        let temp_Two
        let update_Three
        let temp_Three
        // Part 2 Round 2 Payment
        for (const [key1, value1] of userGuessTwo) {
            for (const [key2, value2] of actualTwo) {
                if (key1 === randomItemTwo && key2 === key1) {
                    guess_Two = value1
                    setGuessPriceTwo(value1)
                    temp_Two = value2
                    setActualPriceTwo(value2)
                }
            }
        }
        let temporary = Math.round(((guess_Two - temp_Two) ** 2) * 10) / 10
        setP2R2Square(temporary)
        if (temporary <= KTwo) {
            setP2R2Pay(5.00)
        } else {
            setP2R2Pay(0)
        }
        // Part 3 Payment
        for (const [key1, value1] of updatedThree) {
            for (const [key2, value2] of actualTwo) {
                if (key1 === randomItemThree && key2 === key1) {
                    update_Three = value1
                    setUpdatePriceThree(value1)
                    temp_Three = value2
                    setActualPriceThree(value2)
                }
            }
        }
        let temporary_three = Math.round(((update_Three - temp_Three) ** 2) * 10) / 10
        setP3Square(temporary_three)
        if (temporary_three <= KThree) {
            setP3Pay(5.00)
        } else {
            setP3Pay(0)
        }
    }

    return(
        <div>
            <h1 style={{textAlign: "center", fontSize: 60}}>End of Experiment</h1>
            <ul>
                <li>Congratulations on completing the experiment!</li>
                <li>The following is the breakdown of your payout for the 3 different parts of this experiment</li>
                <li>Your total payout will be shown on the next page. Please proceed to the next page once you have finished going through the breakdown of your payout.</li>
            </ul>
            <div class="flex-container">
                <div>
                    <strong><u>Part 1</u></strong>
                    <br></br>
                    Randomised Item: {item}
                    <br></br>
                    Randomised Row: {price}
                    <br></br>
                    Your chosen option at the randomised row: {choice}
                    <br></br>
                    Your payout: {payout}
                </div>
                <div>
                    <strong><u>Part 2</u></strong>
                    <br></br>
                    <u>Round 1</u>
                    <br></br>
                    Your estimate of the randomly assigned participant's satiety level (M): {location.data.hungerLevelGuess}
                    <br></br>
                    The actual satiety level of the randomly assigned participant (T): {location.data.randomHungerLevel}
                    <br></br>
                    Squared Difference (T - M) ^ 2: {P2R1Square}
                    <br></br>
                    Randomised Value between 1 to 81 (K): {K}
                    <br></br>
                    Your Payout: {P2R1Pay}
                    <br></br>
                    <u>Round 2</u>
                    <br></br>
                    Randomised Item: {randomItemTwo}
                    <br></br>
                    Your estimated final switching row of the random participant assigned for the randomised item (M): {guessPriceTwo}
                    <br></br>
                    Actual switching row of the random participant assigned the randomised item (T): {actualPriceTwo}
                    <br></br>
                    Squared Difference (T - M) ^ 2: {P2R2Square}
                    <br></br>
                    Randomised value between 0 to 98 (K): {KTwo}
                    <br></br>
                    Your payout: {P2R2Pay}
                </div>
                <div>
                    <strong><u>Part 3</u></strong>
                    <br></br>
                    Randomised Item: {randomItemThree}
                    <br></br>
                    Your estimated final switching row of the random participant assigned for the randomised item (M): {updatePriceThree}
                    <br></br>
                    Actual switching row of the random participant assigned the randomised item (T): {actualPriceThree}
                    <br></br>
                    Squared Difference (T - M) ^ 2: {P3Square}
                    <br></br>
                    Randomised value between 0 to 98 (K): {KThree}
                    <br></br>
                    Your payout: {P3Pay}
                </div>  
            </div>
            {/* Need to run 2 functions when history.push */}
            <button className={'end-two-next'} onClick={nextPage}>Next</button>
        </div>
    )
}

export default EndOfExperiment;