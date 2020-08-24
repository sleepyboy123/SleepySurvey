import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Instruction from './components/Instruction/Instruction';
import Start from './components/Start/Start';
import Wait from './components/Wait/Wait';
import Experiment from './components/Experiment/Experiment';

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Instruction} />
      <Route path="/start" exact component={Start} />
      <Route path="/Wait" exact component={Wait} />
      <Route path="/Experiment" exact component={Experiment} />
    </Router>
  );
}

export default App;
