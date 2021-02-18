import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import getBaseUrl from '../utils/getBaseUrl';

const apiPromise = async (): Promise<AxiosInstance> => {
  const token = await AsyncStorage.getItem('@MeSalva:token');
  const baseURL = await getBaseUrl();
  console.log(baseURL);
  return axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default apiPromise;
