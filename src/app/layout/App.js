import React, { Fragment } from "react";
//import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
//import "primereact/resources/themes/fluent-light/theme.css";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import { Route, Switch, withRouter } from "react-router-dom";
import Footer from "./Footer/Footer";
import GenomeSearch from "../../scenes/Genome/GenomeSearch/GenomeSearch";
import GenomePromote from "../../scenes/Genome/GenomePromote/GenomePromote";
import GenomeView from "../../scenes/Genome/GenomeView/GenomeView";
import Home from "../../scenes/Home/Home";
import cssClass from "./App.module.css";
import Landing from "../../scenes/Landing/Landing";
import NotFound from "./NotFound/NotFound";
import { ToastContainer } from "react-toastify";

const App = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer />
      <Route exact path="/" component={Landing} />

      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <TitleBar />
            <MenuBar />
            <div className={cssClass.Scene}>
              <br />
              <Switch>
                <Route exact path="/home" component={Home} />

                <Route exact path="/genomes" component={GenomeSearch} />
                <Route path="/genomes/:id/promote" component={GenomePromote} />
                <Route path="/genomes/:id" component={GenomeView} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </Fragment>
        )}
      />

      <Footer />
    </Fragment>
  );
};

export default withRouter(App);
