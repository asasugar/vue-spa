import axios from "axios";

const BASE_PATH = "https://api.com/";
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
const request = (
  { url = "/", data = {}, type = "get" } = {},
  otherConfig = {}
) => {
  let isFormData = data instanceof FormData;
  url = /http/.test(url) ? url : `${BASE_PATH}${url}`;
  let config = {
    method: type,
    url,
    [type === "get" ? "params" : "data"]:
      type === "get" ? data : isFormData ? data : formatData(data),
    headers: {
      "Content-Type": isFormData
        ? " multipart/form-data"
        : "application/x-www-form-urlencoded"
    },
    ...otherConfig
  };

  Object.assign(config, otherConfig);
  return axios(config);
};

function formatData(data) {
  // Do whatever you want to transform the data
  let ret = "";
  for (let prop in data) {
    ret += `${ret ? "&" : ""}${encodeURIComponent(prop)}=${encodeURIComponent(
      data[prop] === null ? "" : data[prop]
    )}`;
  }
  return ret;
}
export default request;
