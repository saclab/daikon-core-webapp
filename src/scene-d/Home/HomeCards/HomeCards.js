import { Card } from "primereact/card";
import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { RootStoreContext } from '../../../app/stores/rootStore';

const HomeCards = () => {

  //const header = <img alt="Card" src="/images/usercard.png" />;
  const header = null;

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;

  return (
    <div className="flex flex-column">
      <div className="flex justify-content-center gap-3 mb-3">
        <div className="flex">
          <NavLink to="/d/gene/" style={{ textDecoration: "None" }}>
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
        <div className="flex">
          <NavLink to="/d/target/" style={{ textDecoration: "None" }}>
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
        <div className="flex">
          <NavLink to="/d/screen/" style={{ textDecoration: "None" }}>
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
      <div className="flex justify-content-center gap-3">

        <div className="flex">
          <NavLink to="/d/ha/" style={{ textDecoration: "None" }}>
            <Card
              title="HAs"
              subTitle={'(' + appVars.appCount.haCount + ')'}
              style={{ width: "18em" }}
              header={header}
            >
              <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                Shows a list of all hit assessments &nbsp;
                <i className="pi pi-arrow-right"></i>
              </p>
            </Card>
          </NavLink>
        </div>
        <div className="flex">
          <NavLink to="/d/portfolio/" style={{ textDecoration: "None" }}>
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
        <div className="flex">
          <NavLink to="/d/post-portfolio/" style={{ textDecoration: "None" }}>
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
  )
}

export default HomeCards