import useSWR from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async urlparam => {
    const response = await api.get(urlparam);

    return response.data;
  });

  return { data, error, mutate };
}
