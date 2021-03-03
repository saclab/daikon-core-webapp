import React, { Fragment, useContext, useEffect } from "react";
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
import NotFound from "./NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import Loading from "./Loading/Loading";
import { observer } from "mobx-react-lite";
import Login from "../../scenes/Login/Login";

const App = ({ username, bearerToken }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, setToken, appLoaded } = rootStore.commonStore;
  const { user, getUser, fetching, userNotFound } = rootStore.userStore;

  useEffect(() => {
    if (bearerToken) {

      if (!userNotFound && !user) {
        getUser(bearerToken).finally(() => setAppLoaded());
      } else {
        setAppLoaded();
      }
    }
  }, [getUser, setAppLoaded, bearerToken, appLoaded, setToken, user, fetching, userNotFound]);

  if (!appLoaded) {
    return <Loading />;
  }

  if (fetching) {
    return <Loading />;
  }

  if (userNotFound) {
    return <Login />;
  }

  return (
    <Fragment>
      <ToastContainer />
      <Fragment>
        <TitleBar />
        <MenuBar />
        <div className={cssClass.Scene}>
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/genomes" component={GenomeSearch} />
            <Route path="/genomes/:id/promote" component={GenomePromote} />
            <Route path="/genomes/:id" component={GenomeView} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Fragment>
      <Footer />
    </Fragment>
  );
};

export default withRouter(observer(App));
