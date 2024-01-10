import { LocalStoreKey } from '@/enums/LocalStoreKey';
import router from '@/router';
import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

export default class Axios {
  private instance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  public request<T, D = any>(config: AxiosRequestConfig) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<D>;
  }

  private interceptors() {
    this.requestInterceptor();
    this.responseInterceptor();
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStoreKey.TOKEN_KEY)}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  private responseInterceptor() {
    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        switch (error.response?.status) {
          case 401:
            localStorage.removeItem(LocalStoreKey.TOKEN_KEY);
            router.push({ name: 'login' });
            break;
          // 后台表单验证失败
          case 422:
            ElMessage({ type: 'error', message: '参数错误' });
            break;
        }
        return Promise.reject(error);
      }
    );
  }
}
