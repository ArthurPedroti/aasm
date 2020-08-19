import { useSWRInfinite } from 'swr';
import api from '../services/api';

interface Response {
  data: any;
  error: any;
  mutate: any;
  size: any;
  setSize: any;
  isValidating: any;
}

export function useInfinityFetch<Data = any, Error = any>(
  url: string,
  params: object = {},
): Response {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    Data,
    Error
  >(
    index => `tickets?page=${index + 1}`,
    async urlparam => {
      const response = await api.get(urlparam, params);
      return response.data;
    },
    {
      refreshInterval: 5000,
    },
  );

  return { data, error, mutate, size, setSize, isValidating };
}
