import React, { Fragment } from "react";
//import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
//import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import Scene from "./Scene/Scene";

import { withRouter } from "react-router-dom";
import Footer from "./Footer/Footer";

const App = ({ location }) => {
  return (
    <Fragment>
      <TitleBar />
      <MenuBar />
      <Scene />
      <Footer />
    </Fragment>
  );
};

export default withRouter(App);
