import "primeflex/primeflex.css";
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import agent from "./app/api/agent";
import ConfigurationMissing from "./app/common/ConfigurationMissing/ConfigurationMissing";
import App from "./app/layout/App";
import AuthFailure from "./app/layout/Errors/AuthFailure/AuthFailure";
import "./assets/_overrides.scss";
import history from "./history";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

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
