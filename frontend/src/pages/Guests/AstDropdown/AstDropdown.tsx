import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../../utils';
// Components
import { AstDropdownView } from './View';
// Types
import { House } from '../types';

export const AstDropdown = (props: { houseId: number; className?: string }) => {
  const [house, setHouse] = useState({} as House);
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [loading, setLoading] = useState(false);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // Snackbar functions
  function handleClose(event: any, reason: string) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  useEffect(() => {
    // Set loading flag
    setLoading(true);

    // Get token from local storage
    const token = localStorage.getItem('token');

    // Ask user to login if token is not available
    if (!token) {
      setErrors({
        msg: 'Authentication error. Please try logging in again.',
        error: true,
      });
      return;
    }

    // Prepare token to be sent in headers of request
    const headers: AxiosRequestConfig = {
      headers: { Authorization: token },
    };

    // URL. If backendURL is not defined, defaults to deployed backend
    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

    // Request
    axios
      .get(`${url}/houses/${props.houseId}`, headers)
      .then((response) => {
        const { data } = response;
        setHouse(data);
        const { default_ast, default_ast_name } = data;
        setErrors({ msg: '', error: false });
      })
      .catch(axiosErrorHandler(setErrors));

    // Toggle loading flag
    setLoading(false);
  }, [props.houseId]);

  async function postAst(
    event: React.FormEvent<HTMLSelectElement>,
    id: number | undefined,
  ) {
    const token = localStorage.getItem('token');
    const headers: AxiosRequestConfig = {
      headers: { Authorization: token },
    };
    try {
      const astId: string = event.currentTarget.value;
      const res = await axios.put(
        `http://localhost:4500/houses/${id}`,
        {
          default_ast: Number(astId),
        },
        headers,
      );
      setSnackbarOpen(true);
    } catch (e) {
      setErrors({ msg: 'Could not update assistant.', error: true });
    }
  }
  return (
    <AstDropdownView
      className={props.className || ''}
      onChangeFunc={postAst}
      house={house}
      loading={loading}
      errors={errors}
      snackbarOpen={snackbarOpen}
      snackbarClose={handleClose}
    />
  );
};
