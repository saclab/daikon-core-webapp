# Daikon
DAIKON is an open-source web application designed to manage and visualize targets, screens, pre-projects, and projects within the drug discovery pipeline. It is an interface developed to facilitate collaboration among scientists at member organizations, and enables project, program, and portfolio managers to enter gene targets into the discovery pipeline and track the progress of screening efforts, hit sets and projects directed at those targets as they progress towards clinical candidate selection. It includes public and private data sharing capabilities, ensuring security and accessibility required for international multiparty collaboration.  It is a one stop solution that enables “start to finish” tracking of the discovery pipeline. It standardizes many aspects of the drug discovery pipeline, one of them being target selection criteria using predefined questionnaires and assigning them a bucket score.


## Configuration
Configuration must be placed in
src/config.js
Example

```
export const appConfig = {
  REACT_APP_MSAL_CLIENT_ID: "",
  REACT_APP_WEB_API_BASE_URI: "",
  REACT_APP_MSAL_CLIENT_SCOPE: "",
  REACT_APP_MSAL_TENANT_AUTHORITY_URI: "",
  REACT_APP_MSAL_CACHE_LOCATION: "",
  REACT_APP_MSAL_AUTH_STATE_IN_COOKIE: "",
  REACT_APP_MSAL_LOGIN_REDIRECT_URI: "",
};
```