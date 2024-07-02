import { message } from 'antd';
import axios, { type AxiosRequestConfig } from 'axios';

axios.interceptors.response.use((res) => {
  const { data, status } = res;
  if (status === 200) {
    return res.data;
  }
  message.error('request failed');
  return Promise.reject(data);
});

export interface Options
  extends Omit<AxiosRequestConfig, 'method' | 'url' | 'data'> {
  data?: unknown;
  params?: Record<string, any>;
  prefix?: string;
}
const removeUndefinedValues = (params: unknown) => {
  if (!params) return {};
  if (params instanceof URLSearchParams) {
    return params;
  }
  return JSON.parse(JSON.stringify(params));
};

export abstract class BaseRequest {
  protected abstract defaultPrefix: string;

  public static async request<T = unknown>(
    options: AxiosRequestConfig & { params?: Record<string, any> },
  ) {
    const { url, params, headers = {}, ...rest } = options;
    const qs = new URLSearchParams(removeUndefinedValues(params))
      .toString()
      // Prepends '?' character if not empty.
      .replace(/^./, '?$&');
    const res = await axios<T>({
      url: `${url}${qs}`,
      headers: {
        ...headers,
      },
      ...rest,
    });
    return res.data;
  }

  public async request<T = unknown>(
    method: string,
    path: string,
    options: Options = {},
  ) {
    const { prefix = this.defaultPrefix, data, ...rest } = options;
    const url = `${prefix}${path}`;
    return BaseRequest.request<T>({
      method,
      url,
      data: data as any,
      ...rest,
    });
  }

  public get<T>(url: string, options?: Options) {
    return this.request<T>('GET', url, options);
  }

  public post<T>(url: string, options?: Options) {
    return this.request<T>('POST', url, options);
  }

  public patch<T>(url: string, options?: Options) {
    return this.request<T>('PATCH', url, options);
  }

  public delete<T>(url: string, options?: Options) {
    return this.request<T>('DELETE', url, options);
  }

  public put<T>(url: string, options?: Options) {
    return this.request<T>('PUT', url, options);
  }
}
