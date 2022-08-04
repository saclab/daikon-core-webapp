import React, { useContext } from "react";
import { Card } from "primereact/card";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { RootStoreContext } from "../../app/stores/rootStore";
import HomeCards from "./HomeCards/HomeCards";

const Home = () => {

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;

  return (
    <div className="Home">
      <h1>Data Acquisition, Integration and Knowledge capture application (DAIKON)</h1>
      <div className="subtext">
        <p>
          Daikon is a tool for visualizing and
          managing targets, pre-projects and projects within the TBDA and its
          discovery portfolio.
        </p>
        <p>
          This is intended to be used by Program and Portfolio Managers, Project
          Managers, and Scientists.
        </p>
      </div>
      <HomeCards />
    </div>
  );
};

export default Home;
