import React, { Component } from 'react';
import AppointmentApp from './components/AppointmentApp.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppointmentApp/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
