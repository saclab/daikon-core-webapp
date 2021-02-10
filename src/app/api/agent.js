import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error : Can't connect to server");
  }
  const { status, data, config } = error.response;
  console.log(error.response);

  /* ALL 404 Errors are redirected to not found component */
  if (status === 404) {
    history.push("/notfound");
  }

  /* 400 Errors for invalid GUID should also be redirected to not found */
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  /* 500 Errors */
  if (status === 500) {
    toast.error("Server Error");
  }
});

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(2000)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(2000)).then(responseBody),
  put: (url, body) => axios.put(url, body).then(sleep(2000)).then(responseBody),
  del: (url) => axios.delete(url).then(sleep(2000)).then(responseBody),
};

/* APIS */
const Genomes = {
  list: () => requests.get("/genomes"),
  view: (id) => requests.get(`/genomes/${id}`),
};

const exports = {
  Genomes,
};

export default exports;
