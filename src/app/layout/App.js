import React, { Fragment, useContext, useEffect, useState } from "react";
//import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
//import "primereact/resources/themes/fluent-light/theme.css";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../../assets/_overrides.scss";
import "remixicon/fonts/remixicon.css";
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import { Route, Switch, withRouter } from "react-router-dom";
import Footer from "./Footer/Footer";
import GenomePromote from "../../scenes/Gene/GenomePromote/GenomePromote";
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
import GeneSearch from "../../scenes/Gene/GeneSearch/GeneSearch";
import GeneView from "../../scenes/Gene/GeneView/GeneView";
import LiteMolView from "../common/LiteMolView/LiteMolView";
import TargetDash from "../../scenes/Target/TargetDash/TargetDash";
import TargetView from "../../scenes/Target/TargetView/TargetView";
import ScreenDash from "../../scenes/Screen/ScreenDash/ScreenDash";
import ScreenView from "../../scenes/Screen/ScreenView/ScreenView";
import HitsView from "../../scenes/Screen/HitsView/HitsView";
import TestMolView from "../test/TestMolView/TestMolView";
import PortfolioDash from "../../scenes/Portfolio/PortfolioDash/PortfolioDash";
import PortfolioView from "../../scenes/Portfolio/PortfolioView/PortfolioView";

const App = () => {
  const authServiceInstance = agent.AuthServiceInstance;

  const rootStore = useContext(RootStoreContext);
  const { user, getUser, fetching, userNotFound } = rootStore.userStore;
  const [networkErr, setNetworkErr] = useState(false);

  useEffect(() => {
    if (authServiceInstance.account && !networkErr && !user && !userNotFound) {
      console.log("UseEffect getUser()");
      getUser().catch((e) => {
        console.log("++++++++CAUGHT NETWORK ERROR");
        setNetworkErr(true);
      });
    }
  }, [getUser, networkErr, user, userNotFound, authServiceInstance.account]);

  if (networkErr) {
    return <NetworkError />;
  }

  if (fetching) {
    return <Loading />;
  }

  if (userNotFound) {
    return <NoAccess />;
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

            <Route exact path="/gene" component={GeneSearch} />
            <Route path="/gene/:id/promote" component={GenomePromote} />
            <Route path="/gene/:id" component={GeneView} />

            <Route exact path="/target" component={TargetDash} />
            <Route path="/target/:id" component={TargetView} />

            <Route exact path="/screen" component={ScreenDash} />
            <Route path="/screen/:screenId/hits/:hitsId" component={HitsView} />
            <Route path="/screen/:id" component={ScreenView} />

            <Route exact path="/portfolio" component={PortfolioDash} />
            <Route path="/portfolio/:id" component={PortfolioView} />

            <Route path="/test/molview" component={TestMolView} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Fragment>
      <Footer />
    </Fragment>
  );

  let notSignedInRender = (
    <Fragment>
      <Login loginButtonClicked={() => authServiceInstance.SignIn()} />
    </Fragment>
  );

  if (!user) {
    return notSignedInRender;
  }

  if (user) {
    console.log("Will render signedinUser");
    console.log(user);

    return signedInRender;
  }
};

export default withRouter(observer(App));
