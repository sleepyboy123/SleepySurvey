import React from 'react';
import { useLocation } from "react-router";
import './Payout.css';

const Payout = () => {
    const location = useLocation();
    console.log(location.data)

    return(
        <div style={{fontSize: 20}}>
            <h1 style={{textAlign: "center"}}>Payout</h1>
            <br></br>  
            <div style={{fontSize: 25, textAlign: "center"}}>
                ID Number: {location.data.id}
                <br></br>
                <h2>Your total payout is ${location.data.totalPay}</h2>
                {
                    location.data.item === '' ? null : <h2>And a {location.data.item}</h2>
                }
                <div>
                Please kindly stay put at your position and raise your hand once you have reached this page.
                <br></br>
                The experimenters will approach you to distribute your payout. You may leave once you have received your payout.
                </div>
                <h1>
                    Thank you and have a nice day
                </h1>
            </div>
        </div>
    )
}

export default Payout;