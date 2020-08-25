import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import './Experiment.css';

const Experiment = () => {
    const time_limit = 5
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(time_limit)
    const [counter, setCounter] = useState(0)
    const [firstChoice, setFirstChoice] = useState()
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

    var data = {
        hoursAgo: location.data.hoursAgo,
        hungerLevel: location.data.hungerLevel
    }
    
    return(
        <div>
            {
                timeLeft > 0 ? 
                <div> 
                    {timeLeft} <img src={images[counter]}/>
                </div> : 
                <div>
                    {
                        !firstChoice ? 
                        <div>
                            How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                            <br></br>
                            1 2 3 4 5 6 7 8 9 10
                            {/* Set firstChoice */}
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