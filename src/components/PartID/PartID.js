import React, { useState, useEffect } from 'react';
import { useHistory} from "react-router";
import firebase from '../Firestore';
import './PartID.css';


const PartID = () => {
    const history = useHistory();
    const [partID, setPartID] = useState('');

    const auth = firebase.auth();

    // Similar to component did mount
    useEffect(() => {
        auth.signInWithEmailAndPassword('sleepysurvey123@gmail.com', 'Asdasd123%').then(cred => {

        })
    })

    function EarlyException(message) {
        this.message = message;
        this.name = "UserException";
    }

    function checkID() {
        if (window.confirm("Please confirm that your id is " + partID)) {
            const db = firebase.firestore();
            db.collection("bidPrices").get().then(function(querySnapshot) {
                try {
                    querySnapshot.forEach(function(doc) {
                        if(doc.data()['id'] === partID) {
                            alert("This id is already taken");
                            throw new EarlyException("Early Exit");
                        }
                    })
                } catch (exception) {
                    if (exception instanceof EarlyException) {
                        throw exception
                    }
                }
                history.push({pathname: "/instruction", id: partID})
            }) 
        } else {
            alert('Please enter the right id')
        }
    }

    return(
        <div style={{textAlign: "center", marginTop: "10%", fontSize: 30}}>
            Please enter your Participation ID
            <input className={'input'} type="text" value={partID} onChange={e => setPartID(e.target.value)}/>
            { partID.length === 4 ? <button onClick={checkID}>Next</button> : null } 
        </div>
    )
}

export default PartID;