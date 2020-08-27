import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import './Experiment.css';

let yesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const Experiment = () => {
    const time_limit = 5
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(time_limit)
    const [counter, setCounter] = useState(0)
    const [firstChoice, setFirstChoice] = useState()
    const [yesResults1, setYesResults1] = useState()
    const [secondChoice, setSecondChoice] = useState()
    const [thirdChoice, setThirdChoice] = useState()

    const [firstNo, setFirstNo] = useState([false, false, false, false, false, false, false, false, false, false, false])

    const [firstYes, setFirstYes] = useState([false, false, false, false, false, false, false, false, false, false, false])

    // Effect to display countdown
    useEffect(() => {
        const countdown = setInterval (() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => {
            clearInterval(countdown)
        }
    }, [timeLeft])
    
    function importAll(r) {
        return r.keys().map(r);
    }
    // Import all images from folder
    const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/))

    var data = {
        // id: location.data.id,
        // hoursAgo: location.data.hoursAgo,
        // hungerLevel: location.data.hungerLevel
    }

    function choosingNoOne(e) {
        let noState = firstNo
        let yesState = firstYes
        // This code runs if you are checking the button
        if (noState[e] === false) {
            // Loop through all values after chosen one
            for (var i = e; i <= 10; i++) {
                // If it was in the yes array, remove it
                yesArray[i] = 0
            }
            // Check selected no and all subsequent no's. Uncheck all corresponding yes
            for (var i = e; i <= 10; i++) {
                noState[i] = true
                yesState[i] = false
            }
        } else {
            // This code runs if you are unchecking the button
            // Uncheck both yes and no
            noState[e] = false
            yesState[e] = false
            yesArray[e] = 0
        }
        setFirstNo(noState)
        setFirstYes(yesState)
    }

    function choosingYesOne(e) {
        // Check if previous no is checked. If it is checked, you can't select Yes
        if (firstNo[e - 1] === false) {
            // Value is not in the yes array so we need to add it in
            if (yesArray[e] === 0) {
                yesArray[e] = e
            } else {
                // Value is in the yes array, this means that we are unchecking it and need to remove it
                yesArray[e] = 0
            }
            var yesState = firstYes
            var noState = firstNo
            // This code runs if the yes button was checked
            if (yesState[e] === true) {
                // Uncheck the yes button
                yesState[e] = false
            } else {
                // This code runs if the yes button was unchecked
                // Uncheck the no button
                noState[e] = false
                // Check the yes button
                yesState[e] = true
            }
            setFirstYes(yesState)
            setFirstNo(noState)
        }
    }
    
    return(
        <div>
            {
                timeLeft > 0 ? 
                <div>
                    The image below will be shown for 60 seconds. After which, you will automatically process to answer the questions. 
                    <br></br>
                    <img style={{height: 500, width: 500}} src={images[counter]}/>
                    <br></br>
                    {timeLeft} 
                </div> : 
                <div>
                    {
                        !firstChoice ? 
                        <div>
                            How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                            <br></br>
                            <div className="row">
                                <div className="col">
                                    Price
                                </div>
                                <div className="col">
                                    Yes
                                </div>
                                <div className="col">
                                    No
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $1
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => {choosingYesOne(1)}} checked={firstYes[1]} name="yes_no_1"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(1)} checked={firstNo[1]} name="yes_no_1"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $2
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => {choosingYesOne(2)}} checked={firstYes[2]} name="yes_no_2"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(2)} checked={firstNo[2]} name="yes_no_2"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $3
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(3)} checked={firstYes[3]} name="yes_no_3"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(3)} checked={firstNo[3]} name="yes_no_3"></input>
                                </div>
                            </div>
                            {/* Get the highest number from array and pass that on to next value */}
                        </div> :
                        <div>
                            {
                                !secondChoice ? 
                                <div>
                                    How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                                    <br></br>
                                    0.2 0.4 0.6 0.8 1
                                    {/* Set secondChoice */}
                                </div> :
                                <div>
                                    How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                                    <br></br>
                                    0.00 0.05 0.10 0.15 0.20
                                    {/* Set thirdChoice, add to Json */}
                                </div>
                            }
                        </div>
                    }
                </div>
            }
            {/* Needs fixing */}
            <button onClick={() => console.log(yesArray, firstYes, firstNo)}>hello</button>
            {(counter + 1) < images.length ? <button onClick={() => {
                if ((counter + 1) < images.length) {
                    setTimeLeft(time_limit)
                    setCounter(counter + 1)
                }
            }}> Next </button> : <button>Submit</button>}
            
            
            
        </div>
    )
}

export default Experiment;