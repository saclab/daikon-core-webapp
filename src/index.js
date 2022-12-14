import React from "react";
import {createRoot} from 'react-dom/client';
import "./assets/_overrides.scss";
import "primeflex/primeflex.css";
import App from "./app/layout/App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import history from "./history";
import reportWebVitals from "./reportWebVitals";
import AuthFailure from "./app/layout/Errors/AuthFailure/AuthFailure";
import agent from "./app/api/agent";
import ConfigurationMissing from "./app/common/ConfigurationMissing/ConfigurationMissing";

console.log("Starting app pre checks");
const root = createRoot(document.getElementById("root"));


if (!agent.AppPrecheck()) {
  console.log("prechecks failed.");
  root.render(<ConfigurationMissing />);
  
} else {
  console.log("Okay, starting app");
  agent.AuthServiceInstance.HandlePageLoadEvent()
    .then(() => {
      // auth flow was successful.
      // start the application now.
      root.render(
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      );
    })
    .catch((error) => {
      // auth flow has failed.
      // display an error instead of starting the main application.
      root.render(
        <AuthFailure errorMessage={error.stack} />
      );
    });
}

reportWebVitals();
