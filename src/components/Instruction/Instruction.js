import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router";
import './Instruction.css';

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