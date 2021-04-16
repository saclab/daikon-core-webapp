import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";
import AuthService from "../../services/AuthService";
import AppSettingsService from "../../services/AppSettingsService";

console.log("API SERVICE Initialized");

/*  MSAL SERVICE CREATION */
const appSettings = new AppSettingsService();
const AuthServiceInstance = new AuthService(appSettings);
/*  END MSAL SERVICE CREATION */

/* API Service Settings */
axios.defaults.baseURL = appSettings.GetWebApiBaseUri();

/* INJECT BEARER TOKEN */
axios.interceptors.request.use(
  async (config) => {
    let response = await AuthServiceInstance.GetToken();
    config.headers.Authorization = `Bearer ${response.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/* END TOKEN */

/* Format response body */
const responseBody = (response) => response.data;

/* Temp function to simulate server network delay */
const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

/* TYPES OF REQUESTES SUPPORTED */
const requests = {
  get: (url) => axios.get(url).then(sleep(2000)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(2000)).then(responseBody),
  put: (url, body) => axios.put(url, body).then(sleep(2000)).then(responseBody),
  del: (url) => axios.delete(url).then(sleep(2000)).then(responseBody),
};
/* END REQUEST TYPES */

/* API ERROR HANDLING */
axios.interceptors.response.use(undefined, (error) => {
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
const Genomes = {
  list: () => requests.get("/genomes"),
  view: (id) => requests.get(`/genomes/${id}`),
};

const User = {
  current: () => requests.get("/account"),
  register: (user) => requests.post(`/account/register`, user),
};

const Admin = {
  userList: () => requests.get("/admin/accounts"),
  modifyUser: (user) => requests.post(`/admin/accounts/${user.id}`, user),
  addUser: (user) => requests.post(`/admin/accounts/`, user),
};

const exports = {
  AuthServiceInstance,
  Genomes,
  User,
  Admin,
};

export default exports;
