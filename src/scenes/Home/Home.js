import React from "react";
import { Card } from "primereact/card";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  //const header = <img alt="Card" src="/images/usercard.png" />;
  const header = null;

  return (
    <div className="Home">
      <h1>Target and Project Tracker (TPT) </h1>
      <div className="subtext">
        <p>
          The Target and Project Tracker (TPT) is a tool for visualizing and
          managing targets, pre-projects and projects within the TBDA and its
          discovery portfolio.
        </p>
        <p>
          This is intended to be used by Program and Portfolio Managers, Project
          Managers, and Scientists.
        </p>
      </div>

      <div className="p-d-flex p-flex-column">
        <div className="p-mb-2">
          <div className="p-d-flex p-jc-center">
            <div className="p-mr-2">
              <Card
                title="Genes"
                subTitle="(4194)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of candidate genes
                  <NavLink to="/gene/">
                    <i className="pi pi-arrow-right"></i>
                  </NavLink>
                </p>
              </Card>
            </div>
            <div className="p-mr-2">
              {" "}
              <Card
                title="Targets"
                subTitle="(65)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of targets
                  <NavLink to="/target">
                    <i className="pi pi-arrow-right"></i>
                  </NavLink>
                </p>
              </Card>
            </div>
            <div className="p-mr-2">
              {" "}
              <Card
                title="Screen"
                subTitle="(30)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of screened targets
                  <NavLink to="/screen">
                    <i className="pi pi-arrow-right"></i>
                  </NavLink>
                </p>
              </Card>
            </div>
          </div>
        </div>
        <div className="p-mb-2">
          <div className="p-d-flex p-jc-center">
            <div className="p-mr-2">
              <Card
                title="FHA"
                subTitle="(10)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of FHA screens
                  <NavLink to="/fha">
                    <i className="pi pi-arrow-right"></i>
                  </NavLink>
                </p>
              </Card>
            </div>
            <div className="p-mr-2">
              {" "}
              <Card
                title="Portfolio"
                subTitle="(10)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of all portfolios
                  <NavLink to="/portfolio">
                    <i className="pi pi-arrow-right"></i>
                  </NavLink>
                </p>
              </Card>
            </div>
            <div className="p-mr-2">
              {" "}
              <Card
                title="Post Portfolio"
                subTitle="(8)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Displays Post portfolio details
                  <NavLink to="/postportfolio">
                    <i className="pi pi-arrow-right"></i>
                  </NavLink>
                </p>
              </Card>
            </div>
          </div>
        </div>
        <div>
          <div className="p-d-flex p-jc-center">
            {/* <div className="p-mr-2">
              <Card
                title="SP"
                subTitle="(4)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of Targets.
                  <a href="/genomes">
                    <i className="pi pi-arrow-right"></i>
                  </a>
                </p>
              </Card>
            </div> */}
            {/* <div className="p-mr-2">
              {" "}
              <Card
                title="IND"
                subTitle="(4)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of Targets.
                  <a href="/targets">
                    <i className="pi pi-arrow-right"></i>
                  </a>
                </p>
              </Card>
            </div> */}
            {/* <div className="p-mr-2">
              {" "}
              <Card
                title="Clinical"
                subTitle="(2)"
                style={{ width: "14em" }}
                header={header}
              >
                <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                  Shows a list of Targets.
                  <a href="/targets">
                    <i className="pi pi-arrow-right"></i>
                  </a>
                </p>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
