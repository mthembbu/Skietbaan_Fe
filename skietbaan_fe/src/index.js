import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core';

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
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
 ,
  document.getElementById("root")
);
serviceWorker.register();
