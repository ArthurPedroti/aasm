import useSWR from 'swr';
import apiPromise from '../services/apiProtheus';

interface Response {
  data: any;
  error: any;
  mutate: any;
}

export function useProtheusFetch<Data = any, Error = any>(
  url: string,
): Response {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async urlparam => {
      const api = await apiPromise();
      const response = await api.get(urlparam);

      return response.data;
    },
    {
      refreshInterval: 5000,
    },
  );

  return { data, error, mutate };
}
