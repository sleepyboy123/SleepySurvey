import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import './Experiment.css';

const Experiment = () => {
    const time_limit = 5
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(time_limit)
    const [counter, setCounter] = useState(0)
    const [firstChoice, setFirstChoice] = useState()
    const [yesResults1, setYesResults1] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
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

    function choosingNoOne(e, f) {
        var temp = e
        let newState = firstNo
        let yesState = firstYes
        // This code runs if the button was unchecked
        if (newState[e] === false) {
            // Loop through all values
            for (var i = 0; i <= 10 + 1; i++) {
                // Remove all bigger yes values from the array when a no is chosen
                if (yesResults1.includes(temp)) {
                    var index = yesResults1.indexOf(temp)
                    yesResults1.splice(index, 1)
                }
                temp += 1
            }
            // Remove no value from array when unchecking
            var noindex = yesResults1.indexOf(i)
            yesResults1.splice(noindex, 1)
            // Check selected no and all subsequent no's. Uncheck all corresponding yes
            for (var i = e; i < 11; i++) {
                newState[i] = true
                yesState[i] = false
            }
            let tempi = f
            let tempArray = yesResults1
            for (var a = e; a <= 10; a++) {
                // Check if no value is not in array
                if (!yesResults1.includes(tempi)) {
                    // Add all no values to yesResults1
                    tempArray.push(tempi)
                    tempi += 10
                }
            }
            setYesResults1(tempArray)
        } else {
            // This code runs if the button was checked
            // Uncheck both yes and no
            newState[e] = false
            yesState[e] = false
            var indexf = yesResults1.indexOf(f)
            yesResults1.splice(indexf, 1)
        }
        setFirstNo(newState)
        setFirstYes(yesState)
    }

    function choosingYesOne(e, i) {
        // Check if previous no is checked. If it is checked, you can't select Yes
        if (firstNo[e - 1] === false) {
            // Value is not in the yes array so we need to add it in
            if (!yesResults1.includes(e)) {
                setYesResults1(yesResults1.concat(e))
            } else {
                // Value is in the yes array, this means that we are unchecking the yes and need to remove it
                var index = yesResults1.indexOf(e)
                yesResults1.splice(index, 1)
            } 
            var yesState = firstYes
            var newState = firstNo
            // This code runs if the yes button was checked
            if (yesState[e] == true) {
                // Uncheck the yes button
                yesState[e] = false
            } else {
                // This code runs if the yes button was unchecked
                // Uncheck the no button
                newState[e] = false
                // Check the yes button
                yesState[e] = true
            }
            setFirstYes(yesState)
            setFirstNo(newState)
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
                                    <input type="radio" onClick={() => {choosingYesOne(1, 0.1)}} checked={firstYes[1]} name="yes_no_1"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(1, 0.1)} checked={firstNo[1]} name="yes_no_1"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $2
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => {choosingYesOne(2, 0.2)}} checked={firstYes[2]} name="yes_no_2"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(2, 0.2)} checked={firstNo[2]} name="yes_no_2"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $3
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(3, 31)} checked={firstYes[3]} name="yes_no_3"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(3, 31)} checked={firstNo[3]} name="yes_no_3"></input>
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
            <button onClick={() => console.log(yesResults1, firstYes, firstNo)}>hello</button>
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