import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class GenomeStore {
  genomes = [];
  displayLoading = false;

  constructor() {
    makeObservable(this, {
      genomes: observable,
      displayLoading: observable,
      loadGenomes: action,
    });
  }

  loadGenomes = () => {
    this.displayLoading = true;

    agent.Genomes.list()
      .then((response) => {
        this.genomes = response;
      })
      .finally(() => {
        this.displayLoading = false;
      });
  };
}

export default createContext(new GenomeStore());
