import Country from './components/countryWise';
import './App.css';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import India from './components/IndiaCases';
import Vaccine from './components/vaccine';
function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path = '/' component = {Country}></Route>
      <Route exact path = '/India' component = {India}></Route>
      <Route exact path = '/vaccine' component = {Vaccine}></Route>
    </div>
    </Router>
  );
}

export default App;
