import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import PartID from './components/PartID/PartID';
import Instruction from './components/Instruction/Instruction';
import Start from './components/Start/Start';
import Experiment from './components/Experiment/Experiment';
import EndOne from './components/EndOne/EndOne';
import StartTwo from './components/StartTwo/StartTwo';
import GuessPreviousHunger from './components/GuessPreviousHunger/GuessPreviousHunger';
import ExperimentTwo from './components/ExperimentTwo/ExperimentTwo';
import EndTwo from './components/EndTwo/EndTwo';
import StartThree from './components/StartThree/StartThree';
import ActualHunger from './components/ActualHunger/ActualHunger';
import ExperimentThree from './components/ExperimentThree/ExperimentThree';
import EndThree from './components/EndThree/EndThree';
import EndOfExperiment from './components/EndOfExperiment/EndOfExperiment';
import Payout from './components/Payout/Payout';

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={PartID} />
      <Route path="/Instruction" exact component={Instruction} />
      <Route path="/Start" exact component={Start} />
      <Route path="/Experiment" exact component={Experiment} />
      <Route path="/EndOne" exact component={EndOne} />
      <Route path="/StartTwo" exact component={StartTwo} />
      <Route path="/GuessPreviousHunger" exact component={GuessPreviousHunger} />
      <Route path="/ExperimentTwo" exact component={ExperimentTwo} />
      <Route path="/EndTwo" exact component={EndTwo} />
      <Route path="/StartThree" exact component={StartThree} />
      <Route path="/ActualHunger" exact component={ActualHunger} />
      <Route path="/ExperimentThree" exact component={ExperimentThree} />
      <Route path="/EndThree" exact component={EndThree} />
      <Route path="/EndOfExperiment" exact component={EndOfExperiment} />
      <Route path="/Payout" exact component={Payout} />
    </Router>
  );
}

export default App;
