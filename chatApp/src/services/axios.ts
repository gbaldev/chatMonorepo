import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import HttpRequests from '../models/HttpRequest';
import User from '../models/User';

const GET_DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
};

interface PostProps {
  url: string;
  headers?: {};
  data: Partial<User>;
}

class AxiosImpl implements HttpRequests {
  private axiosInstance: AxiosInstance;
  public signal: CancelTokenSource;

  constructor() {
    this.axiosInstance = axios.create();
    this.signal = axios.CancelToken.source();
  }

  cancelRequest = (reason: string) => {
    this.signal.cancel(reason);
    this.signal = axios.CancelToken.source();
  };

  setAxiosInstance = (axiosIns: AxiosInstance) => {
    this.axiosInstance = axiosIns;
  };

  setAuthHeader = (authHeader: string) => {
    this.axiosInstance.defaults.headers.common.Authorization = authHeader;
  };

  get = async (url: string, headers = GET_DEFAULT_HEADERS) => {
    const { data: _data } = await this.axiosInstance.request({
      method: 'get',
      headers,
      url,
    });
    return _data;
  };

  post = async ({ url, headers = GET_DEFAULT_HEADERS, data }: PostProps) => {
    const { data: _data } = await this.axiosInstance.request({
      method: 'post',
      headers,
      url,
      data,
    });
    return _data;
  };

  put = async () => {};
  patch = async () => {};
  delete = async () => {};
}

export default AxiosImpl;
