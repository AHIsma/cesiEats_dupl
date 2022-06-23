import React, { Component } from "react";
import "./App.scss";
import Main from "./js/views/main";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component { 
  render() {
    return (
      <BrowserRouter basename="/">
				<div>
					<Main />
				</div>
			</BrowserRouter>
    );
  }
};