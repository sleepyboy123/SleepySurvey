import firebase from 'firebase';
import { myConfig } from '../config';

// Initialize Firebase
firebase.initializeApp(myConfig);
firebase.analytics();

export default firebase;
