import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {message as msgbox} from 'antd';

// API响应消息体
export interface APIResponse<T = any> {
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  code: string;
  message: string;
  response: T;
}

// API请求方法调用签名
export interface APIRequest<P, T> {
  (requestData: P): Promise<APIResponse<T>>;
}

const profiles = process.env.PROFILES as any;

const defaultConfig: AxiosRequestConfig = {
  baseURL: profiles.baseURL,
  timeout: 120 * 1000, //超时
  withCredentials: true, //允许跨域携带cookie
  headers: {
    // content-type 可以先和后端沟通使用JSON还是表单，后面有少数不一样的特殊处理就行
    'content-type': 'application/x-www-form-urlencoded'
  }
};

const api: AxiosInstance = axios.create(defaultConfig); //使用传入的config覆盖默认

// http request 拦截器
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  }
);

// http response 拦截器
api.interceptors.response.use(
  (axiosResp: AxiosResponse<APIResponse>) => {
    const {status, message} = axiosResp.data;

    if (status == 'ERROR') {
      msgbox.error(message);
      return Promise.reject(axiosResp.data);
    }

    return Promise.resolve(axiosResp.data);
  },
  (error) => {
    const {response} = error;
    if (response) {
      const {status, data} = response;
      const dataDesc = JSON.stringify(data);
      if (status == 404) {
        msgbox.error(`[请求地址出错] ${dataDesc}`);
        return Promise.reject(data);
      }
    }

    msgbox.error(JSON.stringify(error));
    return Promise.resolve(error);
  }
);

export default api;

