import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";
import AuthService from "../../services/AuthService";
import AppSettingsService from "../../services/AppSettingsService";

/*  MSAL SERVICE CREATION */
const appSettings = new AppSettingsService();
const AuthServiceInstance = new AuthService(appSettings);
/*  END MSAL SERVICE CREATION */

/* API Service Settings */
var axiosServerInstance = new axios.create();
axiosServerInstance.defaults.baseURL = appSettings.GetWebApiBaseUri();

/* INJECT BEARER TOKEN */
axiosServerInstance.interceptors.request.use(
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
// const sleep = (ms) => (response) =>
//   new Promise((resolve) => setTimeout(() => resolve(response), ms));

/* TYPES OF REQUESTES SUPPORTED */
const requests = {
  get: (url) => axiosServerInstance.get(url).then(responseBody),
  post: (url, body) => axiosServerInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosServerInstance.put(url, body).then(responseBody),
  del: (url) => axiosServerInstance.delete(url).then(responseBody),
};
/* END REQUEST TYPES */

/* API ERROR HANDLING */
axiosServerInstance.interceptors.response.use(undefined, (error) => {
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
      } else if (status === 400 && data !== null) {
        console.log("----AGENT----");
        console.log(data?.title);
        toast.error("400 The Request Failed : " + data?.title);
      } else if (status === 400 && data === null) {
        toast.error("400 Bad request");
      }

      /* 500 Errors */
      if (status === 500) {
        toast.error("Server Error");
      }

      if (status === 401) {
        console.log("401 Unauthorized or insufficient privileges");
      }
    } catch (e) {
    } finally {
      console.log("----AGENT---- THROWING error");
      console.log(error.response);
      throw error.response;
    }
  }
});
/* END ERROR HANDLING */

/* APIS */
const Gene = {
  list: () => requests.get("/gene"),
  view: (id) => requests.get(`/gene/${id}`),
  viewByAccessionNo: (accessionNo) =>
    requests.get(`/gene/by-accession/${accessionNo}`),
  edit: (newGene) => requests.post(`/gene/${newGene.id}`, newGene),
  history: (id) => requests.get(`/gene/${id}/history`),
  promotionQuestions: () => requests.get(`/geneconfig/promote/questionaire`),
  submitPromotionQuestionaire: (id, data) =>
    requests.post(`/gene/${id}/promotionrequest`, data),
};

const GeneAdmin = {
  promotionRequests: () => requests.get("/admin/gene/promotionrequests"),
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

const Target = {
  list: () => requests.get(`/target/`),
  details: (id) => requests.get(`/target/${id}`),
};

const TargetAdmin = {
  create: (data) => requests.post(`/admin/target`, data),
  import: (data) => requests.post(`/admin/target/import`, data),
  details: (id) => requests.get(`/target/${id}`),
  edit: (updatedTarget) =>
    requests.post(`/admin/target/${updatedTarget.id}`, updatedTarget),
};

const Screen = {
  list: () => requests.get(`/screen/`),
  details: (id) => requests.get(`/screen/${id}`),
  create: (newScreen) => requests.post(`/screen`, newScreen),
  createSequence: (screenId, newSequence) =>
    requests.post(`/screensequence/${screenId}`, newSequence),
};

const Discussion = {
  list: (reference) => requests.get(`/Discussion/${reference}`),
  new: (discussion) => requests.post(`/Discussion/`, discussion),
  edit: (id, discussion) => requests.post(`/Discussion/${id}`, discussion),
  delete: (id) => requests.del(`/Discussion/${id}`),
  reply: (discussionId, reply) =>
    requests.post(`/Discussion/${discussionId}/reply`, reply),
  editReply: (discussionId, replyId, reply) =>
    requests.post(`/Discussion/${discussionId}/reply/${replyId}`, reply),
  deleteReply: (discussionId, replyId) =>
    requests.del(`/Discussion/${discussionId}/reply/${replyId}`),
};

const exports = {
  AuthServiceInstance,
  Gene,
  GeneAdmin,
  User,
  Admin,
  Target,
  TargetAdmin,
  Screen,
  Discussion,
};

export default exports;
