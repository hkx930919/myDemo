import axios from "axios";
import { Message } from "element-ui";

const baseURL = "http://127.0.0.1:9000/";
const instance = axios.create({
  baseURL,
  timeout: 1000
});
// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
const handleError = response => {
  Message({
    showClose: true,
    message: `接口错误：${response.config.url}，状态码：${response.status}`,
    type: "error"
  });
};
const request = {
  get: (url, params, config) =>
    instance.get(url, { params, ...config }).catch(handleError),
  post: (url, data, config) =>
    instance.post(url, data, config).catch(handleError),
  delete: (url, data, config = {}) =>
    instance.delete(url, { data, ...config }).catch(handleError),
  put: (url, data, config) => instance.put(url, data, config).catch(handleError)
};

export { request };
