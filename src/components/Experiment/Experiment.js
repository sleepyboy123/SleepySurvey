import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import './Experiment.css';

const Experiment = () => {
    const time_limit = 5
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(time_limit)
    const [counter, setCounter] = useState(0)
    const [firstChoice, setFirstChoice] = useState()
    const [yesResults1, setYesResults1] = useState([])
    const [secondChoice, setSecondChoice] = useState()
    const [thirdChoice, setThirdChoice] = useState()

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

    // var data = {
    //     id: location.data.id,
    //     hoursAgo: location.data.hoursAgo,
    //     hungerLevel: location.data.hungerLevel
    // }

    function choosingNo(e) {
        if (yesResults1.includes(e)) {
            var index = yesResults1.indexOf(e)
            yesResults1.splice(index, 1)
        }
        // Set all subsequent sections to no
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
                                    <input type="radio" onClick={() => {setYesResults1(yesResults1.concat(1))}} name="yes_no_1"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" onClick={() => choosingNo(1)} name="yes_no_1"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    $2
                                </div>
                                <div className="col">
                                    <input type="radio" value={2} name="yes_no_2"></input>
                                </div>
                                <div className="col">
                                    <input type="radio" value={2} name="yes_no_2"></input>
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