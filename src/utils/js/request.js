import axios from "axios";

const BASE_PATH = "https://api.com/";
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
/**
 *
 *
 * @param {*} [{
 *     url = "/",
 *     data = {},
 *     type = "get",
 *     isFilter = true
 *   }={}]
 * @param {*} [otherConfig={}]
 * @returns {Promise}
 */
const request = ({
    url = "/",
    data = {},
    type = "get",
    isFilter = true
  } = {},
  otherConfig = {}
) => {
  let isFormData = data instanceof FormData;
  url = /http/.test(url) ? url : `${BASE_PATH}${url}`;
  let config = {
    method: type,
    url,
    [type === "get" ? "params" : "data"]: type === "get" ? data : isFormData ? data : formatData(data, isFilter),
    headers: {
      "Content-Type": isFormData ?
        " multipart/form-data" : "application/x-www-form-urlencoded"
    },
    ...otherConfig
  };

  Object.assign(config, otherConfig);
  return axios(config);
};
/**
 * @param {*} data
 * @param {*} isFilter
 * @description post请求参数encode
 * @returns {String}
 */
function formatData(data, isFilter) {
  // Do whatever you want to transform the data
  let ret = "";
  for (let prop in data) {
    if (isFilter) {
      // 过滤null、undefined、空字符串
      if (data[prop] != null && data[prop] != undefined && data[prop] !== "") {
        ret += `${ret ? "&" : ""}${encodeURIComponent(prop)}=${encodeURIComponent(data[prop])}`;
      }
    } else {
      ret += `${ret ? "&" : ""}${encodeURIComponent(prop)}=${encodeURIComponent(data[prop])}`;
    }
  }
  return ret;
}
export default request;