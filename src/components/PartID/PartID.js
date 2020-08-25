import React, { useState } from 'react';
import { useHistory} from "react-router";
import './PartID.css';

const PartID = () => {
    const history = useHistory();
    const [partID, setPartID] = useState('');
    return(
        <div>
        Please enter your Participation ID
        <input type="text" value={partID} onChange={e => setPartID(e.target.value)}/>
        { partID.length > 3 ? <button onClick={() => {history.push({pathname: "/instruction", id: partID})}}>Next</button> : null }
           
        </div>
    )
}

export default PartID;