import React from "react";
import ReactDOM from "react-dom";
import Router from "./router/Router";
import { ContextProvider } from "./context/store";
import reportWebVitals from "./reportWebVitals";
import "./utils/styles/global.scss";

ReactDOM.render(
  <ContextProvider>
    <Router />
  </ContextProvider>,
  document.getElementById("root")
);

reportWebVitals();
