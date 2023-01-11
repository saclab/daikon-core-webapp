import React, { Fragment, useContext, useEffect, useState } from "react";
//import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
//import "primereact/resources/themes/lara-light-blue/theme.css"
//import "primereact/resources/themes/fluent-light/theme.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "remixicon/fonts/remixicon.css";
import "../../assets/_overrides.scss";
import "/node_modules/primeflex/primeflex.css";

import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Login from "../../scene-d/Login/Login";
import NoAccess from "../../scene-d/NoAccess/NoAccess";
import agent from "../api/agent";
import { RootStoreContext } from "../stores/rootStore";
import AppAdmin from "./AppAdmin";
import AppBeta from "./AppBeta";
import AppDefault from "./AppDefault";
import AppProjectManagement from "./AppProjectManagement";
import NetworkError from "./Errors/NetworkError/NetworkError";
import Footer from "./Footer/Footer";
import Loading from "./Loading/Loading";
import NotFound from "./NotFound/NotFound";
import TitleBar from "./TitleBar/TitleBar";

const App = () => {
  const authServiceInstance = agent.AuthServiceInstance;

  const rootStore = useContext(RootStoreContext);
  const { user, getUser, fetching, userNotFound } = rootStore.userStore;
  const { adminMode } = rootStore.appSettingsStore;
  const { fetchingAppVars, appVars, fetchAppVars } = rootStore.generalStore;
  const [networkErr, setNetworkErr] = useState(false);

  useEffect(() => {
    if (authServiceInstance.account && !networkErr && !user && !userNotFound) {
      getUser().catch((e) => {
        console.log("CAUGHT NETWORK ERROR");
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
    return signedInRender;
  }
};

export default observer(App);
