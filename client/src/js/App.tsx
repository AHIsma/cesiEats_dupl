import { Component } from 'react';
import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './components/views/homepage/homepage';

export default class App extends Component { 
  render() {
    return (
      <div>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/"  element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};