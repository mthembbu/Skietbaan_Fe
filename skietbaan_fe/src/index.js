import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/**
 * The Provider is the Applications new ROOT-COMPONENT, that houses all of the
 * JS objects from the rootReducer through the store from the './store file'
 */
ReactDOM.render(
  
    <App />
 ,
  document.getElementById("root")
);
serviceWorker.register();
