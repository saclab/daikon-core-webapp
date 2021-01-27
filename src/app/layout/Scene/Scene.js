import React from "react";

import { Route, Switch, withRouter } from "react-router-dom";
import GenomePromote from "../../../scenes/Genome/GenomePromote/GenomePromote";

import GenomeSearch from "../../../scenes/Genome/GenomeSearch/GenomeSearch";
import GenomeView from "../../../scenes/Genome/GenomeView/GenomeView";
import cssClass from "./Scene.module.css";
const Scene = () => {
  return (
    <div className={cssClass.Scene}>
      <Route
        path={"/(.+)"}
        render={() => (
          <React.Fragment>
            <Switch>
              <Route exact path="/genomes" component={GenomeSearch} />
              <Route path="/genomes/:id/promote" component={GenomePromote} />
              <Route path="/genomes/:id" component={GenomeView} />
            </Switch>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default withRouter(Scene);
