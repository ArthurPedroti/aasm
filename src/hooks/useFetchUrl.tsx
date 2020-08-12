import useSWR from 'swr';

interface Response {
  data: any;
  error: any;
  mutate: any;
}

export function useFetchUrl<Data = any, Error = any>(url: string): Response {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async urlparam => {
      console.log('zqui');
      const response = await fetch(urlparam);
      const responseData = await response.json();
      return responseData;
    },
    {
      refreshInterval: 5000,
    },
  );

  return { data, error, mutate };
}
