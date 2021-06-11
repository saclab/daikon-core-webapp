import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";



/* Uniport API Service Settings */
var axiosEbiInstance = new axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
}
});
axiosEbiInstance.defaults.baseURL = "https://www.ebi.ac.uk/pdbe/api/pdb/entry/";

/* Format response body */

const responseBody = (response) => response.data;



/* TYPES OF REQUESTES SUPPORTED */
const requests = {
  get: (url) => axiosEbiInstance.get(url).then(responseBody),
  post: (url, body) =>
    axiosEbiInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosEbiInstance.put(url, body).then(responseBody),
  del: (url) => axiosEbiInstance.delete(url).then(responseBody),
};
/* END REQUEST TYPES */

/* API ERROR HANDLING */
axiosEbiInstance.interceptors.response.use(undefined, (error) => {
  //console.log(error);
  if (!error.response) {
    toast.error(
      "Network Error : Can't connect to server. Displaying locally cached data. New changes wont be saved."
    );
    throw error;
  } else {
    try {
      const { status, data, config } = error.response;
      /* ALL 404 Errors are redirected to not found component */
      if (status === 404) {
        console.log("404---");
        //history.push("/notfound");
      }

      /* 400 Errors for invalid GUID should also be redirected to not found */
      if (
        status === 400 &&
        config.method === "get" &&
        data.errors.hasOwnProperty("id")
      ) {
        history.push("/notfound");
      } else if (status === 400 && data != null) {
        toast.error("400 The Request Failed");
      }

      /* 500 Errors */
      if (status === 500) {
        toast.error("Server Error");
      }

      if (status === 401) {
        console.log("unauthorized please redirect to login");
      }
    } catch (e) {
    } finally {
      throw error.response;
    }
  }
});
/* END ERROR HANDLING */

/* APIS */
const Ebi = {
  ligands: (pdbID) => requests.get(`ligand_monomers/${pdbID}`),
};


const exports = {
  Ebi
};

export default exports;