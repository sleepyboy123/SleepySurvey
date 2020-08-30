import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import PartID from './components/PartID/PartID';
import Instruction from './components/Instruction/Instruction';
import Start from './components/Start/Start';
import Wait from './components/Wait/Wait';
import Experiment from './components/Experiment/Experiment';
import End from './components/End/End';
import Pay from './components/Pay/Pay';

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={PartID} />
      <Route path="/Instruction" exact component={Instruction} />
      <Route path="/Start" exact component={Start} />
      <Route path="/Wait" exact component={Wait} />
      <Route path="/Experiment" exact component={Experiment} />
      <Route path="/End" exact component={End} />
      <Route path="/Pay" exact component={Pay} />
    </Router>
  );
}

export default App;
