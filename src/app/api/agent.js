import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";
import AuthService from "../../services/AuthService";
import AppSettingsService from "../../services/AppSettingsService";

/* Check Pre Configuration */

const AppPrecheck = () => {
 
  if (
    process.env.REACT_APP_MSAL_CLIENT_ID === undefined ||
    process.env.REACT_APP_WEB_API_BASE_URI === undefined ||
    process.env.REACT_APP_MSAL_CLIENT_SCOPE === undefined ||
    process.env.REACT_APP_MSAL_TENANT_AUTHORITY_URI === undefined ||
    process.env.REACT_APP_MSAL_CACHE_LOCATION === undefined ||
    process.env.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE === undefined ||
    process.env.REACT_APP_MSAL_LOGIN_REDIRECT_URI === undefined
  ) {
    return false;
  }

  if (
    process.env.REACT_APP_MSAL_CLIENT_ID === "" ||
    process.env.REACT_APP_WEB_API_BASE_URI === "" ||
    process.env.REACT_APP_MSAL_CLIENT_SCOPE === "" ||
    process.env.REACT_APP_MSAL_TENANT_AUTHORITY_URI === "" ||
    process.env.REACT_APP_MSAL_CACHE_LOCATION === "" ||
    process.env.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE === "" ||
    process.env.REACT_APP_MSAL_LOGIN_REDIRECT_URI === ""
  ) {
    return false;
  }

  return true;
};
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
        console.log(typeof data);
        if (typeof data === "string") {
          toast.error("400 The Request Failed : " + data);
        } else {
          console.log(data?.title);
          toast.error("400 The Request Failed : " + data?.title);
        }
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
  validateTargetName: (name) => requests.get(`/gene/${name}/validateNewTargetName`),
  viewByAccessionNo: (accessionNo) =>
    requests.get(`/gene/by-accession/${accessionNo}`),
  edit: (newGene) => requests.post(`/gene/${newGene.id}`, newGene),
  history: (id) => requests.get(`/gene/${id}/history`),
  promotionQuestions: () => requests.get(`/geneconfig/promote/questionaire`),
  submitPromotionQuestionaire: (targetName, data) =>
    requests.post(`/gene/promotionrequest/${targetName}`, data),
  editEssentiality: (geneId, essentialityId, modEssentiality) =>
    requests.post(
      `/gene/${geneId}/essentiality/${essentialityId}`,
      modEssentiality
    ),
  addEssentiality: (geneId, newEssentiality) =>
    requests.post(`/gene/${geneId}/essentiality`, newEssentiality),

  addProteinProduction: (geneId, newProteinProduction) =>
    requests.post(`/gene/${geneId}/proteinproduction`, newProteinProduction),

  editProteinProduction: (geneId, proteinproductionId, modProteinProduction) =>
    requests.post(
      `/gene/${geneId}/proteinproduction/${proteinproductionId}`,
      modProteinProduction
    ),

  addProteinProductionAssasy: (geneId, newProteinProductionAssasy) =>
    requests.post(
      `/gene/${geneId}/proteinactivityassay`,
      newProteinProductionAssasy
    ),

  editProteinProductionAssasy: (
    geneId,
    proteinProductionAssasyId,
    modProteinProductionAssasy
  ) =>
    requests.post(
      `/gene/${geneId}/proteinactivityassay/${proteinProductionAssasyId}`,
      modProteinProductionAssasy
    ),

  addCRISPRiStrain: (geneId, newCRISPRiStrain) =>
    requests.post(`/gene/${geneId}/crispristrain`, newCRISPRiStrain),

  editCRISPRiStrain: (geneId, cRISPRiStrainId, modCRISPRiStrain) =>
    requests.post(
      `/gene/${geneId}/crispristrain/${cRISPRiStrainId}`,
      modCRISPRiStrain
    ),

  addResistanceMutation: (geneId, newResistanceMutation) =>
    requests.post(`/gene/${geneId}/resistancemutation`, newResistanceMutation),
  editResistanceMutation: (
    geneId,
    resistanceMutationId,
    modResistanceMutation
  ) =>
    requests.post(
      `/gene/${geneId}/resistancemutation/${resistanceMutationId}`,
      modResistanceMutation
    ),

  addUnpublishedStructure: (geneId, newUnpublishedStructure) =>
    requests.post(
      `/gene/${geneId}/unpublishedstructures`,
      newUnpublishedStructure
    ),
  editUnpublishedStructure: (
    geneId,
    unpublishedStructureId,
    modUnpublishedStructure
  ) =>
    requests.post(
      `/gene/${geneId}/unpublishedstructures/${unpublishedStructureId}`,
      modUnpublishedStructure
    ),
  addVulnerability: (geneId, newVulnerability) =>
    requests.post(`/gene/${geneId}/vulnerability`, newVulnerability),
  editVulnerability: (geneId, vulnerabilityId, modVulnerability) =>
    requests.post(
      `/gene/${geneId}/vulnerability/${vulnerabilityId}`,
      modVulnerability
    ),
  addHypomorph: (geneId, newHypomorph) =>
    requests.post(`/gene/${geneId}/hypomorph`, newHypomorph),

  editHypomorph: (geneId, hypomorphId, modHypomorph) =>
    requests.post(`/gene/${geneId}/hypomorph/${hypomorphId}`, modHypomorph),
};

const GeneAdmin = {
  promotionRequests: () => requests.get("/admin/gene/promotionrequests"),
  createGeneGroup: (geneGroup) => requests.post(`/admin/gene/groups`, geneGroup),

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

const Accounts = {
  listRoles: () => requests.get("/admin/accounts/roles"),
  listOrgs: () => requests.get("/admin/accounts/orgs"),
  editOrg: (id, org) => requests.post(`/admin/accounts/orgs/${id}`, org),
  createOrg: (newOrg) => requests.post(`/admin/accounts/orgs`, newOrg),
  listAccounts: () => requests.get("/admin/accounts"),
  details: (email) => requests.get(`/admin/accounts/${email}`),
  createAccount: (user) => requests.post(`/admin/accounts/`, user),
  editAccount: (user) => requests.post(`/admin/accounts/${user.id}`, user),
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

const Hit = {
  create: (newHit) => requests.post(`/hit/`, newHit),
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

const Horizon = {
  generate: (accessionNo) => requests.get(`/Horizon/${accessionNo}`),
};

const General = {
  appVars: () => requests.get(`/general/app-vars/`),
};

const Projects = {
  createFHA: (newFHA) => requests.post(`/admin/project/`, newFHA),
  createH2L: (id, h2lInfo) =>
    requests.post(`/admin/project/${id}/createH2L`, h2lInfo),
  createLO: (id, lOlInfo) =>
    requests.post(`/admin/project/${id}/createLO`, lOlInfo),
  createSP: (id, sPlInfo) =>
    requests.post(`/admin/project/${id}/createSP`, sPlInfo),
  list: () => requests.get(`/project`),
  details: (id) => requests.get(`/project/${id}`),
  getcompoundevolution: (projectId) =>
    requests.get(`/project/${projectId}/compoundevolution`),
  addcompoundevolution: (projectId, newCompoundEvolution) =>
    requests.post(
      `/admin/project/${projectId}/compoundevolution`,
      newCompoundEvolution
    ),
};

const exports = {
  AppPrecheck,
  AuthServiceInstance,
  Accounts,
  Gene,
  GeneAdmin,
  User,
  Admin,
  Target,
  TargetAdmin,
  Screen,
  Hit,
  Discussion,
  Horizon,
  General,
  Projects,
};

export default exports;
