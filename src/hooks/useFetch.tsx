import useSWR from 'swr';
import api from '../services/api';

interface Response {
  data: any;
  error: any;
  mutate: any;
}

export function useFetch<Data = any, Error = any>(url: string): Response {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async urlparam => {
      const response = await api.get(urlparam);

      return response.data;
    },
    {
      refreshInterval: 5000,
    },
  );

  return { data, error, mutate };
}
