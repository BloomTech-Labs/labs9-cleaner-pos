import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useFetch = (url: string) => {
  const [error, setError] = useState<any>({ msg: '', error: false });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

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

      const headers: AxiosRequestConfig = {
        headers: { Authorization: token },
      };

      try {
        const response = await axios.get(url, headers);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError({ msg: 'Error fetching!', error: true });
      }
    })();
  }, [url]);

  return [data, error, loading];
};

export default useFetch;
