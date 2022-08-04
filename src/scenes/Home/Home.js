import React from "react";
import "./Home.css";
import HomeCards from "./HomeCards/HomeCards";

const Home = () => {

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
