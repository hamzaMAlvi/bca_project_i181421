import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { Header } from "./appUtils.js";

ReactDOM.render(<Header />, document.getElementById("header"));
ReactDOM.render(<Login />, document.getElementById("root"));
