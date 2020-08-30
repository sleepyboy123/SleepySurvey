import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router";
import './Instruction.css';

import instructions from '../../pictures/Instruction.PNG'

const Instruction = () => {
    const history = useHistory();
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(5)
    // Effect to change page
    useEffect(() => {
        const timer =  setTimeout(() => {
            history.push({pathname: "/start", id: location.id});
        }, 5000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Effect to display countdown
    useEffect(() => {
        const countdown = setInterval (() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => {
            clearInterval(countdown)
        }
    }, [timeLeft])

    return(
        <div>
            <h1 className={'heading'}>Instructions</h1>
            <br></br>
            <div className={'container'}>
                <img alt="instructions" src={instructions} />
                <div className={'time'}>Time Remaining: {timeLeft}</div>
            </div>
        </div>
    )
}

export default Instruction;