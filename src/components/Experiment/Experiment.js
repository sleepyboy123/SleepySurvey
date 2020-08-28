import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router";
import './Experiment.css';

let yesArray = [null, null, null, null, null, null, null, null, null, null, null]

var bidPrices = {}

const Experiment = () => {
    const time_limit = 5
    const location = useLocation();
    const history = useHistory();
    const [timeLeft, setTimeLeft] = useState(time_limit)
    const [counter, setCounter] = useState(0)
    const [firstChoice, setFirstChoice] = useState()
    const [secondChoice, setSecondChoice] = useState()

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

    function choosingNoOne(e) {
        // This code runs if you are checking the button
        if (yesArray[e] !== 0 || yesArray[e] === null) {
            // Loop through all values after chosen one
            for (var i = e; i <= 10; i++) {
                // Set the value in the yes array to 0
                yesArray[i] = 0
            }
        } else {
            // This code runs if you are unchecking the button
            // Uncheck both yes and no
            yesArray[e] = null
        }
    }

    function choosingYesOne(e) {
        // Check if previous no is checked. If it is checked, you can't select Yes
        if (yesArray[e - 1] !== 0) {
            // Value is not in the yes array so we need to add it in
            if (yesArray[e] === 0 || yesArray[e] === null) {
                yesArray[e] = e
            } else {
                // Value is in the yes array, this means that we are unchecking it and need to remove it
                yesArray[e] = null
            }
        }
    }

    function moveToSecondLevel() {
        var tempArray = yesArray.slice(1, 11)
        var sum = 0
        var max = 0
        for (var i = 0; i < tempArray.length; i++) {
            sum += tempArray[i]
        }
        if (tempArray.includes(null)){
            alert("Please select all the options")
        } else if (sum === 0) {
            alert("Please choose at least one yes")
        } else {
            for (var a = 0; a < tempArray.length; a++) {
                if (tempArray[a] > max) {
                    max = tempArray[a]
                }
            }
            setFirstChoice(max)
            yesArray = [null, null, null, null, null, null, null, null, null, null, null]
        }
    }

    function choosingNoTwo(i) {
        // This code runs if you are checking the button
        if (yesArray[i] !== 0 || yesArray[i] === null) {
            // Loop through all values after chosen one
            for (var a = i; a <= 10; a++) {
                // Set the value in the yes array to 0
                yesArray[a] = 0
            }
        } else {
            // This code runs if you are unchecking the button
            // Uncheck both yes and no
            yesArray[i] = null
        }
    }

    // i is the index, v is the value
    function choosingYesTwo(i, v) {
        // Check if previous no is checked. If it is checked, you can't select Yes
        if (yesArray[i - 1] !== 0) {
            // Value is not in the yes array so we need to add it in
            if (yesArray[i] === 0 || yesArray[i] === null) {
                yesArray[i] = v
            } else {
                // Value is in the yes array, this means that we are unchecking it and need to remove it
                yesArray[i] = null
            }
        }
    }

    function moveToThirdLevel() {
        var tempArray = yesArray.slice(1, 6)
        var sum = 0
        var max = 0
        for (var i = 0; i < tempArray.length; i++) {
            sum += tempArray[i]
        }
        if (tempArray.includes(null)){
            alert("Please select all the options")
        } else if (sum === 0) {
            alert("Please choose at least one yes")
        } else {
            for (var a = 0; a < tempArray.length; a++) {
                if (tempArray[a] > max) {
                    max = tempArray[a]
                }
            }
            // Add first and second choice together, convert to float and setSecondChoice
            setSecondChoice(parseFloat((firstChoice + max).toFixed(1)))
            yesArray = [null, null, null, null, null, null, null, null, null, null, null]
        }
    }

    function choosingNoThree(i) {
        // This code runs if you are checking the button
        if (yesArray[i] !== 0 || yesArray[i] === null) {
            // Loop through all values after chosen one
            for (var a = i; a <= 10; a++) {
                // Set the value in the yes array to 0
                yesArray[a] = 0
            }
        } else {
            // This code runs if you are unchecking the button
            // Uncheck both yes and no
            yesArray[i] = null
        }
    }

    function choosingYesThree(i, v) {
        // Check if previous no is checked. If it is checked, you can't select Yes
        if (yesArray[i - 1] !== 0) {
            // Value is not in the yes array so we need to add it in
            if (yesArray[i] === 0 || yesArray[i] === null) {
                yesArray[i] = v
            } else {
                // Value is in the yes array, this means that we are unchecking it and need to remove it
                yesArray[i] = null
            }
        }
    }

    function addToJson() {
        var tempArray = yesArray.slice(1, 5)
        var sum = 0
        var max = 0
        for (var i = 0; i < tempArray.length; i++) {
            sum += tempArray[i]
        }
        if (tempArray.includes(null)){
            alert("Please select all the options")
        } else if (sum === 0) {
            alert("Please choose at least one yes")
        } else {
            for (var a = 0; a < tempArray.length; a++) {
                if (tempArray[a] > max) {
                    max = tempArray[a]
                }
            }
            
            // Add first and second choice together, convert to float and add to JSON
            bidPrices[(images[counter].split('/')[3]).split('.')[0]] = parseFloat((secondChoice + max).toFixed(2))
            yesArray = [null, null, null, null, null, null, null, null, null, null, null]
            setFirstChoice(null)
            setSecondChoice(null)
        }
        if ((counter + 1) < images.length) {
            setTimeLeft(time_limit)
            setCounter(counter + 1)
        } else {
            var jsonBid =   JSON.stringify(bidPrices)
            console.log(jsonBid)
            history.push({pathname: '/end', data: {id: location.data.id, hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel, bidPrices: jsonBid}})
        }
    }
    
    return(
        <div style={{fontSize: 20}}>
            {
                timeLeft > 0 ? 
                <div style={{textAlign: "center"}}>
                    The image below will be shown for 60 seconds. After which, you will automatically process to answer the questions.
                    <br></br>
                    <img style={{height: 500, width: 500}} src={images[counter]}/>
                    <br></br>
                    {timeLeft} seconds 
                </div> : 
                <div>
                    {
                        !firstChoice ? 
                        <div style={{textAlign: "center"}}>
                            How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                            <br></br>
                            <div style={{marginLeft: "25%"}}>
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
                                    <input type="radio" onClick={() => choosingYesOne(1)} checked={yesArray[1] > 0 } name="yes_no_11"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(1)} checked={yesArray[1] === 0} name="yes_no_11"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $2
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(2)} checked={yesArray[2] > 0} name="yes_no_12"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(2)} checked={yesArray[2] === 0} name="yes_no_12"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $3
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(3)} checked={yesArray[3] > 0} name="yes_no_13"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(3)} checked={yesArray[3] === 0} name="yes_no_13"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $4
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(4)} checked={yesArray[4] > 0} name="yes_no_14"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(4)} checked={yesArray[4] === 0} name="yes_no_14"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $5
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(5)} checked={yesArray[5] > 0} name="yes_no_15"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(5)} checked={yesArray[5] === 0} name="yes_no_15"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $6
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(6)} checked={yesArray[6] > 0} name="yes_no_16"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(6)} checked={yesArray[6] === 0} name="yes_no_16"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $7
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(7)} checked={yesArray[7] > 0} name="yes_no_17"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(7)} checked={yesArray[7] === 0} name="yes_no_17"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $8
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(8)} checked={yesArray[8] > 0} name="yes_no_18"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(8)} checked={yesArray[8] === 0} name="yes_no_18"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $9
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(9)} checked={yesArray[9] > 0} name="yes_no_19"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(9)} checked={yesArray[9] === 0} name="yes_no_19"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $10
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingYesOne(10)} checked={yesArray[10] > 0} name="yes_no_110"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNoOne(10)} checked={yesArray[10] === 0} name="yes_no_110"></input>
                                </div>
                            </div>
                            </div>
                            <button onClick={() => moveToSecondLevel()}>Next</button>
                            {/* Get the highest number from array and pass that on to next value */}
                        </div> :
                        <div>
                            {
                                !secondChoice ? 
                                <div style={{textAlign: "center"}}>
                                    How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                                    <br></br>
                                    <div style={{marginLeft: "25%"}}> 
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
                                            ${firstChoice}.00
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesTwo(1, 0.01)} checked={yesArray[1] > 0} name="yes_no_21"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoTwo(1)} checked={yesArray[1] === 0} name="yes_no_21"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            ${firstChoice}.20
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesTwo(2, 0.2)} checked={yesArray[2] > 0} name="yes_no_22"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoTwo(2)} checked={yesArray[2] === 0} name="yes_no_22"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            ${firstChoice}.40
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesTwo(3, 0.4)} checked={yesArray[3] > 0} name="yes_no_23"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoTwo(3)} checked={yesArray[3] === 0} name="yes_no_23"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            ${firstChoice}.60
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesTwo(4, 0.6)} checked={yesArray[4] > 0} name="yes_no_24"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoTwo(4)} checked={yesArray[4] === 0} name="yes_no_24"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            ${firstChoice}.80
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesTwo(5, 0.8)} checked={yesArray[5] > 0} name="yes_no_25"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoTwo(5)} checked={yesArray[5] === 0} name="yes_no_25"></input>
                                        </div>
                                    </div>
                                    </div>
                                    <button onClick={() => moveToThirdLevel()}>Next</button>
                                </div> :
                                <div style={{textAlign: "center"}}>
                                    How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                                    <br></br>
                                    <div style={{marginLeft: "25%"}}>
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
                                        {
                                            secondChoice % 1 === 0 ?
                                            <div className="col">
                                                ${secondChoice}.00
                                            </div> :
                                            <div className="col">
                                                ${secondChoice}0
                                            </div>
                                        }
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesThree(1, 0.001)} checked={yesArray[1] > 0} name="yes_no_31"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoThree(1)} checked={yesArray[1] === 0} name="yes_no_31"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            secondChoice % 1 === 0 ?
                                            <div className="col">
                                                ${secondChoice}.05
                                            </div> :
                                            <div className="col">
                                                ${secondChoice}0
                                            </div>
                                        }
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesThree(2, 0.05)} checked={yesArray[2] > 0} name="yes_no_32"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoThree(2)} checked={yesArray[2] === 0} name="yes_no_32"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            ${(secondChoice + 0.1).toFixed(1)}0
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesThree(3, 0.10)} checked={yesArray[3] > 0} name="yes_no_33"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoThree(3)} checked={yesArray[3] === 0} name="yes_no_33"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            ${(secondChoice + 0.1).toFixed(1)}5
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingYesTwo(4, 0.15)} checked={yesArray[4] > 0} name="yes_no_34"></input>
                                        </div>
                                        <div className="col">
                                            <input type="radio" onClick={() => choosingNoTwo(4)} checked={yesArray[4] === 0} name="yes_no_34"></input>
                                        </div>
                                    </div>
                                    </div>
                                    <button onClick={() => addToJson()}>Next</button>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Experiment;