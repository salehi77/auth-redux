import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../Store";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers)
      config.headers.Authorization = `Bearer ${
        store.getState().auth.token || ""
      }`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const message: string | string[] =
      error.response?.data?.message || "Network Error";
    if (Array.isArray(message)) {
      toast.error(message.join("\n"));
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default instance;
