import React, { useState } from 'react';
import { useLocation, useHistory } from "react-router";
import './ExperimentTwo.css';

var bidPrices = {}

const Experiment = () => {
    const location = useLocation();
    const history = useHistory();
    const [ready, setReady] = useState(0)
    const [counter, setCounter] = useState(0)
    const [firstChoice, setFirstChoice] = useState(null)
    const [yesArray, setYesArray] = useState([null, null, null, null, null, null, null, null, null, null, null])

    function importAll(r) {
        return r.keys().map(r);
    }
    // Import all images from folder
    const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/))

    function choosingItemOne(e) {
        // Check if previous money is checked. If it is checked, you can't select Yes
        if (!(yesArray[e - 1] > 0)) {
            // Value is not in the yes array so we need to add it in
            if (yesArray[e] === null || yesArray[e] > 0) {
                let front = yesArray.slice(0, e);
                front.push(0);
                let back = yesArray.slice(e + 1, 11);
                let temp = front.concat(back);
                setYesArray(temp);
            } else {
                // Value is in the yes array, this means that we are unchecking it and need to remove it
                let front = yesArray.slice(0, e);
                front.push(null);
                let back = yesArray.slice(e + 1, 11);
                let temp = front.concat(back);
                setYesArray(temp);
            }
        }
    }

    function choosingMoneyOne(e) {
        // This code runs if you are checking the button
        if (yesArray[e] === 0 || yesArray[e] === null) {
            let temp = yesArray.slice(0, e);
            for (var i = e; i <= 10; i++) {
                // Set the value in the yes array to money
                temp.push(i);
            }
            setYesArray(temp);
        } else {
            // This code runs if you are unchecking the button
            // Uncheck all
            let front = yesArray.slice(0, e);
            front.push(null);
            let back = yesArray.slice(e + 1, 11);
            let temp = front.concat(back);
            setYesArray(temp);
        }
    }

    function nextLevel() {
        let noNull = yesArray.slice(1, 11);
        if (noNull.includes(null)) {
            alert("Please select all the options")
        } else {
            let front = [0];
            let temp = front.concat(noNull);
            temp.push(11);
            let highest = 0;
            for (var a = 0; a <= 12; a++) {
                if (temp[a + 1] !== 0) {
                    highest = temp[a + 1] - 1
                    break;
                }
            }
            setFirstChoice(highest);
            setYesArray([null, null, null, null, null, null, null, null, null, null, null]);
        }
    }

    function choosingItemTwo(e) {
        // Check if previous money is checked. If it is checked, you can't select Yes
        if (!(yesArray[e - 1] > 0)) {
            // Value is not in the yes array so we need to add it in
            if (yesArray[e] === null || yesArray[e] > 0) {
                let front = yesArray.slice(0, e);
                front.push(0);
                let back = yesArray.slice(e + 1, 11);
                let temp = front.concat(back);
                setYesArray(temp);
            } else {
                // Value is in the yes array, this means that we are unchecking it and need to remove it
                let front = yesArray.slice(0, e);
                front.push(null);
                let back = yesArray.slice(e + 1, 11);
                let temp = front.concat(back);
                setYesArray(temp);
            }
        }
    }

    function choosingMoneyTwo(e, p) {
        // This code runs if you are checking the button
        if (yesArray[e] === 0 || yesArray[e] === null) {
            let temp = yesArray.slice(0, e);

            // Value of money no longer correspondes with the array

            for (var i = p; i <= 1; i+=0.1) {
                // Set the value in the yes array to money
                let money = firstChoice + (Math.round(i * 10) / 10)     
                temp.push(money);
            }
            setYesArray(temp);
        } else {
            // This code runs if you are unchecking the button
            // Uncheck all
            let front = yesArray.slice(0, e);
            front.push(null);
            let back = yesArray.slice(e + 1, 11);
            let temp = front.concat(back);
            setYesArray(temp);
        }
    }

    function addToJson() {
        let noNull = yesArray.slice(1, 11);
        if (noNull.includes(null) && noNull[8] !== 0) {
            alert("Please select all the options")
            return
        } else if (yesArray[9] === 0 && yesArray[1] === 0) {
            let highest = firstChoice + 1
            console.log(highest);
            bidPrices[(images[counter].split('/')[3]).split('.')[0]] = highest
            setYesArray([null, null, null, null, null, null, null, null, null, null, null]);
            setFirstChoice(null)
        } else {
            let front = [0];
            let temp = front.concat(noNull);
            let highest = 0;
            for (var a = 0; a <= 11; a++) {
                if (temp[a + 1] !== 0 || temp[a + 1] === null) {
                    highest = temp[a + 1] - 0.1
                    break;
                }
            }
            let rounded_highest = (Math.round(highest * 10) / 10)
            console.log(rounded_highest);
            bidPrices[(images[counter].split('/')[3]).split('.')[0]] = rounded_highest
        }
        setYesArray([null, null, null, null, null, null, null, null, null, null, null]);
        setFirstChoice(null)
        if ((counter + 1) < images.length) {
            setCounter(counter + 1)
            setReady(0)
        } else {
            var jsonBid =   JSON.stringify(bidPrices)
            console.log(jsonBid)
            history.push({pathname: '/EndTwo', 
                data: {
                    id: location.data.id, 
                    hoursAgo: location.data.hoursAgo, 
                    hungerLevel: location.data.hungerLevel, 
                    secondHungerLevel: location.data.secondHungerLevel, 
                    bidPrices: location.data.bidPrices, 
                    hungerLevelGuess: location.data.hungerLevelGuess,
                    bidPricesGuess: jsonBid
                }
            })
        }
    }

    return(
        <div style={{fontSize: 20}}>
            {
                ready === 0 ? 
                <div style={{textAlign: "center"}}>
                    The image below is a {(images[counter].split('/')[3]).split('.')[0]}. The experimenters will be passing around this item for you to see.
                    Please proceed when you are ready with your decision
                    <br></br>
                    <img style={{height: 500, width: 500}} alt="bidImage" src={images[counter]}/>
                    <br></br>
                    <button onClick={() => setReady(1)}>Ready</button>
                </div> : 
                <div>
                    {
                        firstChoice === null ?
                        <div style={{textAlign: "center"}}>
                            For each of the rows, which options do you think the randomly assigned participant chose? ({(images[counter].split('/')[3]).split('.')[0]})
                            <br></br>
                            <div style={{marginLeft: "30%"}}>
                                <div className="row">
                                    <div className="col">
                                        Option A (Take the item)
                                    </div>
                                    <div className="col">
                                        Option B (Take the money)
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" checked={true} name="yes_no_9"></input>
                                    </div>
                                    <div className="col">
                                        <label>$0</label><input type="radio" checked={false} name="yes_no_9"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onChange={() => choosingItemOne(1)} checked={yesArray[1] === 0} name="yes_no_12"></input>
                                    </div>
                                    <div className="col">
                                        <label>$1</label><input type="radio" onClick={() => choosingMoneyOne(1)} checked={yesArray[1]} name="yes_no_12"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(2)} checked={yesArray[2] === 0} name="yes_no_13"></input>
                                    </div>
                                    <div className="col">
                                        <label>$2</label><input type="radio" onClick={() => choosingMoneyOne(2)} checked={yesArray[2]} name="yes_no_13"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(3)} checked={yesArray[3] === 0} name="yes_no_14"></input>
                                    </div>
                                    <div className="col">
                                        <label>$3</label><input type="radio" onClick={() => choosingMoneyOne(3)} checked={yesArray[3]} name="yes_no_14"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(4)} checked={yesArray[4] === 0} name="yes_no_15"></input>
                                    </div>
                                    <div className="col">
                                        <label>$4</label><input type="radio" onClick={() => choosingMoneyOne(4)} checked={yesArray[4]} name="yes_no_15"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(5)} checked={yesArray[5] === 0} name="yes_no_16"></input>
                                    </div>
                                    <div className="col">
                                        <label>$5</label><input type="radio" onClick={() => choosingMoneyOne(5)} checked={yesArray[5]} name="yes_no_16"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(6)} checked={yesArray[6] === 0} name="yes_no_17"></input>
                                    </div>
                                    <div className="col">
                                        <label>$6</label><input type="radio" onClick={() => choosingMoneyOne(6)} checked={yesArray[6]} name="yes_no_17"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(7)} checked={yesArray[7] === 0} name="yes_no_18"></input>
                                    </div>
                                    <div className="col">
                                        <label>$7</label><input type="radio" onClick={() => choosingMoneyOne(7)} checked={yesArray[7]} name="yes_no_18"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(8)} checked={yesArray[8] === 0} name="yes_no_19"></input>
                                    </div>
                                    <div className="col">
                                        <label>$8</label><input type="radio" onClick={() => choosingMoneyOne(8)} checked={yesArray[8]} name="yes_no_19"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(9)} checked={yesArray[9] === 0} name="yes_no_110"></input>
                                    </div>
                                    <div className="col">
                                        <label>$9</label><input type="radio" onClick={() => choosingMoneyOne(9)} checked={yesArray[9]} name="yes_no_110"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(10)} checked={yesArray[10] === 0} name="yes_no_111"></input>
                                    </div>
                                    <div className="col">
                                        <label>$10</label><input type="radio" onClick={() => choosingMoneyOne(10)} checked={yesArray[10]} name="yes_no_111"></input>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <button style={{fontSize: 20}} onClick={() => nextLevel()}>Next</button>
                        </div> 
                        :
                        <div style={{textAlign: "center"}}>
                        For each of the rows, which options do you think the randomly assigned participant chose? ({(images[counter].split('/')[3]).split('.')[0]})
                        <br></br>
                        <div style={{marginLeft: "30%"}}>
                            <div className="row">
                                <div className="col">
                                    Option A (Take the item)
                                </div>
                                <div className="col">
                                    Option B (Take the money)
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onChange={() => choosingItemTwo(1)} checked={yesArray[1] === 0} name="yes_no_21"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.10</label><input type="radio" onClick={() => choosingMoneyTwo(1, 0.10)} checked={yesArray[1]} name="yes_no_21"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemTwo(2)} checked={yesArray[2] === 0} name="yes_no_22"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.20</label><input type="radio" onClick={() => choosingMoneyTwo(2, 0.20)} checked={yesArray[2]} name="yes_no_22"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemTwo(3)} checked={yesArray[3] === 0} name="yes_no_23"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.30</label><input type="radio" onClick={() => choosingMoneyTwo(3, 0.30)} checked={yesArray[3]} name="yes_no_23"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemTwo(4)} checked={yesArray[4] === 0} name="yes_no_24"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.40</label><input type="radio" onClick={() => choosingMoneyTwo(4, 0.40)} checked={yesArray[4]} name="yes_no_24"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemTwo(5)} checked={yesArray[5] === 0} name="yes_no_25"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.50</label><input type="radio" onClick={() => choosingMoneyTwo(5, 0.50)} checked={yesArray[5]} name="yes_no_25"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemTwo(6)} checked={yesArray[6] === 0} name="yes_no_26"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.60</label><input type="radio" onClick={() => choosingMoneyTwo(6, 0.60)} checked={yesArray[6]} name="yes_no_26"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemTwo(7)} checked={yesArray[7] === 0} name="yes_no_27"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.70</label><input type="radio" onClick={() => choosingMoneyTwo(7, 0.70)} checked={yesArray[7]} name="yes_no_27"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(8)} checked={yesArray[8] === 0} name="yes_no_28"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.80</label><input type="radio" onClick={() => choosingMoneyOne(8, 0.80)} checked={yesArray[8]} name="yes_no_28"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>{(images[counter].split('/')[3]).split('.')[0]}</label><input type="radio" onClick={() => choosingItemOne(9)} checked={yesArray[9] === 0} name="yes_no_29"></input>
                                </div>
                                <div className="col">
                                    <label>${firstChoice}.90</label><input type="radio" onClick={() => choosingMoneyOne(9, 0.90)} checked={yesArray[9]} name="yes_no_29"></input>
                                </div>
                            </div>
                        </div>
                        <button style={{fontSize: 20}} onClick={() => addToJson()}>Next</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Experiment;