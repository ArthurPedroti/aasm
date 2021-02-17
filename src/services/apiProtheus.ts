import axios, { AxiosInstance } from 'axios';
import getProtheusBaseUrl from '../utils/getProtheusBaseUrl';

const apiPromise = async (): Promise<AxiosInstance> => {
  const baseURL = await getProtheusBaseUrl();
  return axios.create({
    baseURL,
  });
};

export default apiPromise;
