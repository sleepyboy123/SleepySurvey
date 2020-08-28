import React from 'react';
import { useHistory, useLocation } from "react-router";
import './Wait.css';

import wait from '../../pictures/Wait.PNG'

const Wait = () => {
    const history = useHistory();
    const location = useLocation();
    return(
        <div>
           <h1 style={{textAlign: "center"}}>Start of Experiment</h1>
           <div style={{textAlign: "center"}}>
           <img src={wait}></img>
           </div>
           <button style={{display: "grid", margin: "auto", fontSize: 20}} onClick={() => {history.push({pathname: "/experiment", data: {id: location.data.id, hoursAgo: location.data.hoursAgo, hungerLevel: location.data.hungerLevel}})}}>Next</button>
           
        </div>
    )
}

export default Wait;