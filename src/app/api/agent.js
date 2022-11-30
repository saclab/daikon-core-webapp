import axios from "axios";
import { toast } from "react-toastify";
import { appConfig } from "../../config";
import history from "../../history";
import AuthService from "../../services/AuthService";
import AppSettingsService from "../../services/AppSettingsService";

/* Check Pre Configuration */

const AppPrecheck = () => {
  if (
    appConfig.REACT_APP_MSAL_CLIENT_ID === undefined ||
    appConfig.REACT_APP_WEB_API_BASE_URI === undefined ||
    appConfig.REACT_APP_MSAL_CLIENT_SCOPE === undefined ||
    appConfig.REACT_APP_MSAL_TENANT_AUTHORITY_URI === undefined ||
    appConfig.REACT_APP_MSAL_CACHE_LOCATION === undefined ||
    appConfig.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE === undefined ||
    appConfig.REACT_APP_MSAL_LOGIN_REDIRECT_URI === undefined
  ) {
    return false;
  }

  if (
    appConfig.REACT_APP_MSAL_CLIENT_ID === "" ||
    appConfig.REACT_APP_WEB_API_BASE_URI === "" ||
    appConfig.REACT_APP_MSAL_CLIENT_SCOPE === "" ||
    appConfig.REACT_APP_MSAL_TENANT_AUTHORITY_URI === "" ||
    appConfig.REACT_APP_MSAL_CACHE_LOCATION === "" ||
    appConfig.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE === "" ||
    appConfig.REACT_APP_MSAL_LOGIN_REDIRECT_URI === ""
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
      }
      else if (status === 400 && data !== null) {
        console.log("----AGENT----");
        console.log(typeof data);
        if (typeof data === "string") {
          console.log("AGENT: Intercepted 400 " + data)
          toast.error("400 The Request Failed : " + data);
        } else {
          console.log("AGENT: Intercepted 400 " + data?.title)
          toast.error("400 The Request Failed : " + data?.title);
        }
      }
      else if (status === 400 && data === null) {
        console.log("AGENT: Intercepted 400 Bad request")
        toast.error("400 Bad request");
      }

      /* 403 Unauthorized error */
      if (status === 403) {
        console.log("AGENT: Intercepted 403")
        toast.error("Unauthorized: You do not have necessary permisisons to apply this change. Please contact Daikon Administrator");
      }

      if (status === 401) {
        console.log("AGENT: Intercepted 403")
        console.log("Unauthorized: You do not have necessary permisisons to apply this change. Please contact Daikon Administrator");
      }


      /* 500 Errors */
      if (status === 500) {
        console.log("AGENT: Intercepted 500")
        toast.error("Server Error");
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
  validateTargetName: (name) =>
    requests.get(`/gene/${name}/validateNewTargetName`),
  viewByAccessionNo: (accessionNo) =>
    requests.get(`/gene/by-accession/${accessionNo}`),
  edit: (newGene) => requests.post(`/gene/${newGene.id}`, newGene),
  history: (id) => requests.get(`/gene/${id}/history`),
  promotionQuestions: () => requests.get(`/geneconfig/promote/questionaire`),
  searchByIdGeneGroup: (geneId) =>
    requests.get(`/geneconfig/groups/search-by-gene-id/${geneId}`),
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
  promotionRequests: () => requests.get("/elevated/gene/promotionrequests"),
  createGeneGroup: (geneGroup) =>
    requests.post(`/elevated/gene/groups`, geneGroup),
  listGeneGroups: () => requests.get(`/elevated/gene/groups`),
};

const User = {
  current: () => requests.get("/account"),
  register: (user) => requests.post(`/account/register`, user),
};

const Admin = {
  userList: () => requests.get("/elevated/accounts"),
  modifyUser: (user) => requests.post(`/elevated/accounts/${user.id}`, user),
  addUser: (user) => requests.post(`/elevated/accounts/`, user),
};

const Accounts = {
  listRoles: () => requests.get("/elevated/accounts/roles"),
  listOrgs: () => requests.get("/elevated/accounts/orgs"),
  editOrg: (id, org) => requests.post(`/elevated/accounts/orgs/${id}`, org),
  createOrg: (newOrg) => requests.post(`/elevated/accounts/orgs`, newOrg),
  listAccounts: () => requests.get("/elevated/accounts"),
  details: (email) => requests.get(`/elevated/accounts/${email}`),
  createAccount: (user) => requests.post(`/elevated/accounts/`, user),
  editAccount: (user) => requests.post(`/elevated/accounts/${user.id}`, user),
};

const Target = {
  list: () => requests.get(`/target/`),
  details: (id) => requests.get(`/target/${id}`),
  history: (id) => requests.get(`/target/${id}/history`),
};

const TargetAdmin = {
  create: (data) => requests.post(`/elevated/target`, data),
  import: (data) => requests.post(`/elevated/target/import`, data),
  importComplex: (data) => requests.post(`/elevated/target/importComplex`, data),
  details: (id) => requests.get(`/target/${id}`),
  edit: (updatedTarget) =>
    requests.post(`/elevated/target/${updatedTarget.id}`, updatedTarget),
  editSummary: (updatedTargetSummary) =>
    requests.post(`/elevated/target/${updatedTargetSummary.id}/summary`, updatedTargetSummary),
};

const Screen = {
  list: () => requests.get(`/screen/`),
  listPhenotypic: () => requests.get(`/screen/phenotypic`),
  details: (id) => requests.get(`/screen/${id}`),
  create: (newScreen) => requests.post(`/screen`, newScreen),
  createPhenotypic: (newScreen) => requests.post(`/screen/phenotypic`, newScreen),
  createSequence: (screenId, newSequence) =>
    requests.post(`/screensequence/${screenId}`, newSequence),
  merge: (mergeIds) => requests.post(`/elevated/screen/merge`, mergeIds),
  edit: (id, editedScreen) => requests.post(`/elevated/screen/${id}/edit`, editedScreen),

};

const Hit = {
  create: (newHit) => requests.post(`/hit/`, newHit),
  update: (hitId, updatedHit) => requests.post(`/hit/${hitId}`, updatedHit),
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
  generate: (targetName) => requests.get(`/Horizon/${targetName}`),
  generateByAccession: (accessionNo) =>
    requests.get(`/Horizon/by-accession/${accessionNo}`),
};

const General = {
  appVars: () => requests.get(`/general/app-vars/`),
};

const Projects = {
  edit: (id, project) => requests.post(`/elevated/project/${id}`, project),
  terminate: (id, project) => requests.post(`/elevated/project/${id}/terminate`, project),
  createHA: (newHA) => requests.post(`/elevated/project/`, newHA),
  createH2L: (id, h2lInfo) =>
    requests.post(`/elevated/project/${id}/createH2L`, h2lInfo),
  createLO: (id, lOlInfo) =>
    requests.post(`/elevated/project/${id}/createLO`, lOlInfo),
  createSP: (id, sPlInfo) =>
    requests.post(`/elevated/project/${id}/createSP`, sPlInfo),
  createIND: (id, iNDInfo) =>
    requests.post(`/elevated/project/${id}/createIND`, iNDInfo),
  createP1: (id, p1Info) =>
    requests.post(`/elevated/project/${id}/createP1`, p1Info),
  list: () => requests.get(`/project`),
  details: (id) => requests.get(`/project/${id}`),
  getcompoundevolution: (projectId) =>
    requests.get(`/project/${projectId}/compoundevolution`),
  addcompoundevolution: (projectId, newCompoundEvolution) =>
    requests.post(
      `/elevated/project/${projectId}/compoundevolution`,
      newCompoundEvolution
    ),
  editCompoundevolution: (projectId, compoundEvoluitionId, editedCompoundEvolution) =>
    requests.post(
      `/elevated/project/${projectId}/compoundevolution/${compoundEvoluitionId}`,
      editedCompoundEvolution
    ),
  setPriorityProbability: (Id, ppDTO) => requests.post(`/project/${Id}`, ppDTO),
  createUnlinked: (newProject) => requests.post(`/elevated/project/unlinked`, newProject),
  stageOverride: (id, overrideDTO) => requests.post(`/elevated/project/${id}/override-stage`, overrideDTO),
};

const Vote = {
  castVote: (vote) => requests.post(`/vote/${vote.voteId}/`, vote),
  enableVoting: (voteIds) => requests.post(`/elevated/vote/enable/`, voteIds),
  freezeVoting: (voteIds) => requests.post(`/elevated/vote/freeze/`, voteIds),
};


const DataView = {
  targetDash: () => requests.get(`/data-view/VTarget/dash-view`),
}

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
  Vote,
  DataView
};

export default exports;
