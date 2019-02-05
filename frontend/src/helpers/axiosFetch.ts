import { useState, useEffect } from 'react';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

type Crud = 'get' | 'post' | 'put' | 'delete';

const axiosFetch = async (type: Crud, url: string, body: any = {}) => {
  let error = { msg: '', error: false };
  let data = null;

  const token = localStorage.getItem('token');
  if (!token) {
    error = {
      msg: 'Authentication error. Please try logging in again.',
      error: true,
    };
    return [data, error];
  }

  const headers: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios({
      method: type,
      headers: { Authorization: token },
      url,
      data: body,
    });

    data = response;
  } catch (e) {
    console.error(e);
    error = { msg: 'Error fetching!', error: true };
  }

  return [data, error];
};

export default axiosFetch;
