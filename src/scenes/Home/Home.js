import React, {useContext} from "react";
import { Card } from "primereact/card";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { RootStoreContext } from "../../app/stores/rootStore";

const Home = () => {
  //const header = <img alt="Card" src="/images/usercard.png" />;
  const header = null;

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

      <div className="p-d-flex p-flex-column">
        <div className="p-mb-2">
          <div className="p-d-flex p-jc-center">
            <div className="p-mr-2">
              <NavLink to="/gene/" style={{ textDecoration: "None" }}>
                <Card
                  title="Genes"
                  subTitle={'(' + appVars.appCount.geneCount + ')'}
                  style={{ width: "18em" }}
                  header={header}
                >
                  <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                    Shows a list of candidate genes &nbsp;

                    <i className="pi pi-arrow-right"></i>

                  </p>
                </Card>
              </NavLink>
            </div>
            <div className="p-mr-2">
              <NavLink to="/target/" style={{ textDecoration: "None" }}>
                <Card
                  title="Targets"
                  subTitle={'(' + appVars.appCount.targetCount + ')'}
                  style={{ width: "18em" }}
                  header={header}
                >
                  <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                    Shows a list of targets&nbsp;
                    <i className="pi pi-arrow-right"></i>
                  </p>
                </Card>
              </NavLink>
            </div>
            <div className="p-mr-2">
              <NavLink to="/screen/" style={{ textDecoration: "None" }}>
                <Card
                  title="Screens"
                  subTitle={'(' + appVars.appCount.screenCount + ')'}
                  style={{ width: "18em" }}
                  header={header}
                >
                  <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                    Shows a list of screens &nbsp;
                    <i className="pi pi-arrow-right"></i>
                  </p>
                </Card>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="p-mb-2">
          <div className="p-d-flex p-jc-center">
            <div className="p-mr-2">
              <NavLink to="/fha/" style={{ textDecoration: "None" }}>
                <Card
                  title="FHAs"
                  subTitle={'(' + appVars.appCount.fhaCount + ')'}
                  style={{ width: "18em" }}
                  header={header}
                >
                  <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                    Shows a list of FHAs &nbsp;
                    <i className="pi pi-arrow-right"></i>
                  </p>
                </Card>
              </NavLink>
            </div>
            <div className="p-mr-2">
              <NavLink to="/portfolio/" style={{ textDecoration: "None" }}>
                <Card
                  title="Portfolio"
                  subTitle={'(' + appVars.appCount.portfolioCount + ')'}
                  style={{ width: "18em" }}
                  header={header}
                >
                  <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                    Shows a list of all portfolios &nbsp;
                    <i className="pi pi-arrow-right"></i>
                  </p>
                </Card>
              </NavLink>
            </div>
            <div className="p-mr-2">
              <NavLink to="/postportfolio/" style={{ textDecoration: "None" }}>
                <Card
                  title="Post Portfolio"
                  subTitle={'(' + appVars.appCount.postPortfolioCount + ')'}
                  style={{ width: "18em" }}
                  header={header}
                >
                  <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                    Shows a list of all post portfolios &nbsp;
                    <i className="pi pi-arrow-right"></i>
                  </p>
                </Card>
              </NavLink>
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
