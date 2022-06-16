import React, { Component } from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Homepage from './components/homepage/homepage';

export default class App extends Component { 
  render() {
    return (
      <div>
        <BrowserRouter basename="/">
          <Routes>
            <Route exact path="/"  element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};