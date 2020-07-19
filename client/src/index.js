import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chatroom from "./components/Chatroom.jsx";
import * as serviceWorker from "./serviceWorker";
window.vW = window.innerWidth / 100;
window.vH = window.innerHeight / 100;
window.isMobile = window.innerWidth < 1200;
window.domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://chatty-app-test.herokuapp.com";

ReactDOM.render(
  <React.Fragment>
    <Chatroom width={40 * window.vW} height={80 * window.vH}></Chatroom>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
