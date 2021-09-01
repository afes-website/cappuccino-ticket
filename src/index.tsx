import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "assets/main.scss";
import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
