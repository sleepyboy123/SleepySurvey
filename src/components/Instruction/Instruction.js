import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import './Instruction.css';

const Instruction = () => {
    const history = useHistory();
    const [timeLeft, setTimeLeft] = useState(5)
    // Effect to change page
    useEffect(() => {
        const timer =  setTimeout(() => {
            history.push("/start");
        }, 5000);
        return () => clearTimeout(timer);
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
            Instructions
            {timeLeft}
        </div>
    )
}

export default Instruction;