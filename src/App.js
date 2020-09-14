import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import PartID from './components/PartID/PartID';
import Instruction from './components/Instruction/Instruction';
import Start from './components/Start/Start';
import Experiment from './components/Experiment/Experiment';
import End from './components/End/End';

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={PartID} />
      <Route path="/Instruction" exact component={Instruction} />
      <Route path="/Start" exact component={Start} />
      <Route path="/Experiment" exact component={Experiment} />
      <Route path="/End" exact component={End} />
    </Router>
  );
}

export default App;
