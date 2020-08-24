import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import './Experiment.css';

const Experiment = () => {
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(5)
    const [counter, setCounter] = useState(0)
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
    
    return(
        <div>
            {
                timeLeft > 0 ? 
                <div> 
                    {timeLeft} {location.data.hoursAgo} <img src={images[counter]}/>
                </div> : 
                <div>
                    How much do you think the person from the other group is willing to pay for this item? {(images[counter].split('/')[3]).split('.')[0]}
                </div>
            }
            <button onClick={() => {
                if ((counter + 1) < images.length) {
                    setCounter(counter + 1)
                }
            }}> Next </button>
        </div>
    )
}

export default Experiment;