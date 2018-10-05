import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css'; 

// import Header from './components/Header';


import NavBar from './components/NavBar';

import ScreenHolder from './components/ScreenHolder';

// var settings = require('./config/settings');

class App extends Component {
  
  // to set up the initial state and share between components, need a constructor
  constructor() {
    super();

    this.state = {
      fishes: {},
      myOtherStateObject: {},
      myOptions: {}, // should our API server info go here ?
      columnsToDisplay: []
    };
  }

  componentDidMount() {
    console.log("wtf");
  }


  render() {
    return (
      <div className="App">
              <NavBar/>
              <ScreenHolder/>
        
              
      </div>
    );
  }
}

export default App;