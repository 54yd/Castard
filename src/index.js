import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "firebase";

// Constructors
// ------------------------------
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
});

// Render
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
