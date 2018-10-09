import axios from "axios";
import qs from "qs";

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
      type === "get" ? data : isFormData ? data : qs.stringify(data),
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

export default request;
