import React from "react";
import ReactDOM from "react-dom";
import './assets/_overrides.scss';
import 'primeflex/primeflex.css';
import App from "./app/layout/App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Router } from "react-router-dom";
import history from "./history";

import reportWebVitals from "./reportWebVitals";
import * as AuthenticationContext from "adal-vanilla/lib/adal";
import adalConfiguration from "./secrets/adal-config.json"

// store the ADAL config:
if (adalConfiguration.clientId == null || adalConfiguration.tenant == null) {
  throw new Error ("ADAL Configuration could not be found. Are you sure they are set?");
}

window.adalConfig = {
  clientId: adalConfiguration.clientId,
  tenant: adalConfiguration.tenant,
  cacheLocation: "localStorage",
  popUp: false,
};

export const authContext = new AuthenticationContext(window.adalConfig);

if (authContext.isCallback(window.location.hash)) {
  // this handles the redirect back from the AAD sign-in page.
  // it extracts the hash and processes the AAD token (or error) received.
  authContext.handleWindowCallback();
}

function startApplication(username, token) {
  // render the main application
  ReactDOM.render(
    <Router history={history}>
      <App username={username} bearerToken={token} />
    </Router>,
    document.getElementById("root")
  );
}

var user = authContext.getCachedUser();

if (user) {
  console.log(user);
  let clientId = window.adalConfig.clientId;

  authContext.acquireToken(clientId, function (errorDesc, token, error) {
    if (error) {
      console.log("Error");
      console.log(error);
      // acquire token failure
      // In this case the callback passed in the Authentication request constructor will be called.
      authContext.acquireTokenRedirect(clientId, null, null);
    } else {
      //acquired token successfully
      // console.log(user.userName);
       console.log(token);
      startApplication(user.userName, token);
    }
  });
} else {
  // Initiate login
  authContext.login();
}

reportWebVitals();
