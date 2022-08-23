import React, { Fragment, useContext, useEffect, useState } from "react";
//import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
//import "primereact/resources/themes/lara-light-blue/theme.css"
//import "primereact/resources/themes/fluent-light/theme.css";


import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../../assets/_overrides.scss";
import "remixicon/fonts/remixicon.css";

import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import cssClass from "./App.module.css";
import NotFound from "./NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RootStoreContext } from "../stores/rootStore";
import Loading from "./Loading/Loading";
import { observer } from "mobx-react-lite";
import Login from "../../scene-d/Login/Login";
import NetworkError from "./Errors/NetworkError/NetworkError";
import agent from "../api/agent";
import NoAccess from "../../scene-d/NoAccess/NoAccess";

import AppDefault from './AppDefault';
import AppAdmin from './AppAdmin';
import AppBeta from './AppBeta';
import AppProjectManagement from "./AppProjectManagement";

const App = () => {
  const authServiceInstance = agent.AuthServiceInstance;

  const rootStore = useContext(RootStoreContext);
  const { user, getUser, fetching, userNotFound } = rootStore.userStore;
  const { adminMode, appView } = rootStore.appSettingsStore;
  const { fetchingAppVars, appVars, fetchAppVars } = rootStore.generalStore;
  const [networkErr, setNetworkErr] = useState(false);

  const [menuBar, setMenuBar] = useState(<MenuBar />);


  useEffect(() => {
    if (authServiceInstance.account && !networkErr && !user && !userNotFound) {
      //console.log("UseEffect getUser()");
      getUser().catch((e) => {
        console.log("++++++++CAUGHT NETWORK ERROR");
        setNetworkErr(true);
      });

      if (appVars === null) {
        fetchAppVars();
      }
    }

  }, [
    getUser,
    networkErr,
    user,
    userNotFound,
    authServiceInstance.account,
    adminMode,
    appVars,
    fetchAppVars,
  ]);


  if (networkErr) {
    return <NetworkError />;
  }

  if (fetching || fetchingAppVars) {
    return <Loading />;
  }

  if (userNotFound) {
    return <NoAccess />;
  }




  let signedInRender = (

    <Fragment>
      <ToastContainer pauseOnHover theme="light" />

      <div className="flex flex-column">
        <div className="block">
          <TitleBar />
        </div>
        <div className="block overflow-auto">
          <Routes>
            <Route index element={<Navigate replace to="/d/" />} />
            <Route path="/d/*" element={<AppDefault />} />
            <Route path="/admin/*" element={<AppAdmin />} />
            <Route path="/pm/*" element={<AppProjectManagement />} />
            <Route path="/beta" element={<AppBeta />} />
           
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <div className="flex">
          <Footer />
        </div>

      </div>
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
    // console.log("Will render signedinUser");
    // console.log(user);

    return signedInRender;
  }
};

//export default withRouter(observer(App));
export default observer(App);
