import React from 'react';
import { useHistory, useLocation } from "react-router";
import './Pay.css';

const Wait = () => {
    const location = useLocation();
    return(
        <div>
           Payout...
           
        </div>
    )
}

export default Wait;