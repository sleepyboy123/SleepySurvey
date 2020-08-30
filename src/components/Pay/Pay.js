import React, {useState} from 'react';
import { useLocation } from "react-router";
import { random } from '../../random';
import './Pay.css';

import paypic from '../../pictures/Pay.PNG';

var globalsum = 0

const Pay = () => {
    const location = useLocation();
    const data = location.data
    const parsedData = JSON.parse(data)

    const [pay, setPay] = useState(false)

    const chosenEntries = Object.entries(random)
    const bidEntries = Object.entries(parsedData)

    function calculatePay() {
        for (const [key1, value1] of chosenEntries) {
            for (const [key2, value2] of bidEntries) {
                if (key1 === key2 && value1 <= value2) {
                    globalsum += value1
                }
            }
        }
        setPay(true)
    }

    return (
        <div style={{fontSize: 2}}>
            <h1 style={{textAlign: "center"}}>Pay-out</h1>  
            <br></br>
            <div style={{fontSize :25, textAlign: "center"}}>
            Participation ID: {location.id}
            <br></br>
            {
                pay === false ? <button style={{fontSize: 20}} onClick={() => {calculatePay()}}>Show Pay</button> : <div>Your payout is ${20 - globalsum}</div>
            }
            <br></br>
            <img alt="pay" src={paypic}></img>
            </div>
        </div>
    )
}

export default Pay;