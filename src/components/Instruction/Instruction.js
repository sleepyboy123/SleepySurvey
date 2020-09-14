import React from 'react';
import { useHistory, useLocation } from "react-router";
import './Instruction.css';

import instructions from '../../pictures/Instruction.PNG'

const Instruction = () => {
    const history = useHistory();
    const location = useLocation();

    return(
        <div>
            <h1 style={{textAlign: "center"}}>Instructions</h1>
            <br></br>
            <div style={{textAlign: "center"}}>
            <img alt="instructions"  src={instructions} />
            </div>
            <button className={'instruction-next'} onClick={() => {history.push({pathname: "/start", id: location.id})}}>Next</button>
        </div>
    )
}

export default Instruction;