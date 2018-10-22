import axios from "axios";

const BASE_PATH = "https://api.com/";
axios.defaults.withCredentials = true;

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
    if (data[prop] != null && data[prop] != undefined && data[prop] !== "") {
      ret += `${ret ? "&" : ""}${encodeURIComponent(prop)}=${encodeURIComponent(
        data[prop]
      )}`;
    }
  }
  return ret;
}
export default request;
