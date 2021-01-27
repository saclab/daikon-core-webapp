import axios from "axios";

export class GenomeDataService {
  getGenomes() {
    return axios.get("data/genomes.json").then((res) => res.data.data);
  }
}
