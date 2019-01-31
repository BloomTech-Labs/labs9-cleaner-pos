import { useState, useEffect } from 'react';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

type Crud = 'get' | 'post' | 'put' | 'delete';

const axiosFetch = async (type: Crud, url: string, body: any = {}) => {
  const [error, setError] = useState<any>({ msg: '', error: false });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

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
    const response = await axios({ method: type, url, data: body });
    setData(response.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError({ msg: 'Error fetching!', error: true });
  }

  return [data, error, loading];
};

export default axiosFetch;
