
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BASE_URL } from "./actions/types.js";

const theme = createMuiTheme({
	palette: {
	  primary: {
      main:"#D22629"
    }
	},
  });

/**
 * The Provider is the Applications new ROOT-COMPONENT, that houses all of the
 * JS objects from the rootReducer through the store from the './store file'
 */

fetch(BASE_URL + "/api/versionnumber", {
  method: "GET",
  headers: {
      "content-type": "application/json"
  }
})
.then(response => response.json())
.then(response => {
  if(typeof response !== "string"){
    var version = window.localStorage.getItem("version");
    if(version === null){
      window.localStorage.setItem("version", response);
    }else{
      if(version === response.toString()) return;
      window.localStorage.removeItem("persist:skietbaan");
      window.localStorage.setItem("version", response);
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
 ,
  document.getElementById("root")
);

serviceWorker.register();