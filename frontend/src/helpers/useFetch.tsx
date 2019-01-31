import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Crud = 'get' | 'post' | 'put' | 'delete';

const useFetch = (
  url: string,
  reload = false,
  type = 'get' as Crud,
  body = {},
) => {
  const [error, setError] = useState<any>({ msg: '', error: false });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const options = reload !== null ? [url, reload] : [url];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError({
          msg: 'Authentication error. Please try logging in again.',
          error: true,
        });
        setLoading(false);
        return [error, loading, data];
      }

      try {
        const response = await axios({
          method: type,
          headers: { Authorization: token },
          url,
          data: body,
        });
        setData(response.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError({ msg: 'Error fetching!', error: true });
      }
    })();
  }, options);

  return [data, error, loading];
};

export default useFetch;
