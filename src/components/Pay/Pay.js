import React from 'react';
import { useHistory, useLocation } from "react-router";
import './Pay.css';

const Wait = () => {
    const location = useLocation();
    return(
        <div>
            {location.data}
            Payout...
           
        </div>
    )
}

export default Wait;