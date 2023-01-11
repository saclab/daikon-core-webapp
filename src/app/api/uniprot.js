import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";
const convertXmlToJson = require("xml-js");

/* Uniport API Service Settings */
var axiosUniprotInstance = new axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
axiosUniprotInstance.defaults.baseURL = "https://rest.uniprot.org/uniprotkb/";

/* Format response body */
const responseBody = (response) =>
  convertXmlToJson.xml2js(response.data, { compact: true, spaces: 4 });
//const responseBody = (response) => response.data;

/* TYPES OF REQUESTES SUPPORTED */
const requests = {
  get: (url) => axiosUniprotInstance.get(url).then(responseBody),
  post: (url, body) => axiosUniprotInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosUniprotInstance.put(url, body).then(responseBody),
  del: (url) => axiosUniprotInstance.delete(url).then(responseBody),
};
/* END REQUEST TYPES */

/* API ERROR HANDLING */
axiosUniprotInstance.interceptors.response.use(undefined, (error) => {
  //console.error(error);
  if (!error.response) {
    toast.error(
      "Uniprot API Error : Can't connect to server. Displaying locally cached data."
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
const Pdb = {
  crossReference: (uniprotId) => requests.get(`${uniprotId}.xml`),
};

const exports = {
  Pdb,
};

export default exports;
