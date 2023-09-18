import axios from "axios";
import storage from "@/util/localStorage";

export const BASE_URL = process.env.API_BASE_URL;
export const BLOG_BASE_URL = "https://blog.samaneahan.com";

export const apiUrlV1 = `${BASE_URL}/api/v1`;
export const apiUrlV2 = `${BASE_URL}/api/v2`;
export const apiUrlV3 = `${BASE_URL}/api/v3`;

axios.defaults.baseURL = apiUrlV3;
// axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/vnd.SamaneAhan.v2+json";

let accessToken = null;
if (typeof localStorage !== "undefined") {
  accessToken = storage.get("access_token");
  if (accessToken)
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

axios.interceptors.response.use(null, (error) => {
  // prettier-ignore
  const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

  if (!expectedError) {
    console.log("logging the error", error.response);
  }

  return Promise.reject(error);
});

// axios.interceptors.request.use(function (config) {
//   const url = config.url;

//   config.params.timestamp = new Date().getTime();

//   // ** removing trailing slash from end of url
//   // ** this little slash (which seems its called trailing), causes CORS error
//   // @ts-ignore
//   const lastChar = url[url.length - 1];
//   if (lastChar === "/") {
//     // @ts-ignore
//     config.url = config.url.replace(/\/$/, "");
//   }
//   return config;
// });

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
