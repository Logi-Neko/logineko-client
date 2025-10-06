/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import queryString from "query-string";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

interface IRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, any>;
  queryParams?: Record<string, any>;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
}

interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  const { url, method, body, queryParams, headers = {}, config = {} } = props;

  const requestConfig: AxiosRequestConfig = {
    url,
    method,
    headers,
    data: body,
    params: queryParams,
    ...config,
  };

  try {
    const response = await axiosInstance<T>(requestConfig);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    const errorResponse: IErrorResponse = {
      statusCode: axiosError.response?.status || 500,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Có lỗi xảy ra",
      error: axiosError.response?.data?.error || "Network Error",
    };

    throw errorResponse;
  }
};

export const apiGet = <T>(url: string, params?: Record<string, any>) =>
  sendRequest<T>({ url, method: "GET", queryParams: params });

export const apiPost = <T>(url: string, data?: Record<string, any>) =>
  sendRequest<T>({ url, method: "POST", body: data });

export const apiPut = <T>(url: string, data?: Record<string, any>) =>
  sendRequest<T>({ url, method: "PUT", body: data });

export const apiDelete = <T>(url: string) =>
  sendRequest<T>({ url, method: "DELETE" });
