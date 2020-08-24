import React from 'react';
import { useHistory, useLocation } from "react-router";
import './Wait.css';

const Wait = () => {
    const history = useHistory();
    const location = useLocation();
    return(
        <div>
           Wait to Go
           <button onClick={() => {history.push({pathname: "/experiment", data: {hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel}})}}>Next</button>
        </div>
    )
}

export default Wait;