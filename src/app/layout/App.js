import React, { Fragment, useContext, useEffect, useState } from "react";
//import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
//import "primereact/resources/themes/fluent-light/theme.css";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../../assets/_overrides.scss";
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
import NetworkError from "./Errors/NetworkError/NetworkError";
import UserList from "../../scenes/Admin/UserManagement/UserList/UserList";
import Admin_Authorize from "../../scenes/Admin/UserManagement/Authorize/Admin_Authorize";
import agent from "../api/agent";
import NoAccess from "../../scenes/NoAccess/NoAccess";


const App = () => {
  const authServiceInstance = agent.AuthServiceInstance;

  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, appLoaded } = rootStore.commonStore;
  const { user, getUser, fetching, userNotFound } = rootStore.userStore;
  const [networkErr, setNetworkErr] = useState(false);

  useEffect(() => {

    if (!networkErr && !user && !userNotFound) {
      getUser()
        .catch((e) => {
          console.log("++++++++CAUGHT NETWORK ERROR");
          setNetworkErr(true);
        })
        .finally(() => setAppLoaded());
    }


  }, [
    getUser,
    setAppLoaded,
    networkErr,
    user,
    userNotFound
  ]);

  if (networkErr) {
    return <NetworkError />;
  }

  if (!appLoaded) {
    return <Loading />;
  }

  if (fetching) {
    return <Loading />;
  }

  if (userNotFound) {
    return <NoAccess />
  }

  let signedInRender = (
    <Fragment>
      <ToastContainer />
      <Fragment>
        <TitleBar />
        <MenuBar />
        <div className={cssClass.Scene}>
          <br />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/admin/user-management/new"
              component={Admin_Authorize}
            />
            <Route exact path="/admin/user-management" component={UserList} />

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

  let notSignedInRender = <Login 
  loginButtonClicked={() => authServiceInstance.SignIn()}
  />;

  if(!user) {
    return notSignedInRender;
  }

  if (user) {
    console.log("Will render signedinUser");
    console.log(user);
  
    return signedInRender;
  }  



  
};

export default withRouter(observer(App));
