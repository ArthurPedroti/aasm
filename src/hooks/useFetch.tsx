import useSWR from 'swr';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface Response {
  data: any;
  error: any;
  mutate: any;
}

export function useFetch<Data = any, Error = any>(
  url: string,
  params: object = {},
): Response {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async urlparam => {
      const response = await api.get(urlparam, params);
      await AsyncStorage.setItem(
        `@MeSalva:${urlparam}`,
        JSON.stringify(response.data),
      );
      return response.data;
    },
    {
      refreshInterval: 5000,
    },
  );

  return { data, error, mutate };
}
