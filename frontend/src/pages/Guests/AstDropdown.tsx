import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Components
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Types
import { House } from './types';

const AstDropdownView = (props: any) => {
  return (
    <FormControl className='ast-dropdown'>
      <InputLabel shrink htmlFor='ast-label-placeholder'>
        Assistant
      </InputLabel>
      <Select
        value='{state.age}'
        onChange={(e) => e}
        input={<Input name='age' id='age-label-placeholder' />}
        displayEmpty
        name='age'
        className='{classes.selectEmpty}'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <FormHelperText>Label + placeholder</FormHelperText>
    </FormControl>
  );
};

const AstDropdown = (props: { houseId: number }) => {
  const [houses, setHouses] = useState([] as House[]);
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
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
        process.env.REACT_APP_backendURL ||
        'https://cleaner-pos.herokuapp.com/';

      // Request
      axios
        .get(`${url}/houses/${props.houseId}?user=true`, headers)
        .then((response) => {
          const { data } = response;
          setHouses(data);
          setErrors({ msg: '', error: false });
        })
        .catch(axiosErrorHandler(setErrors));

      // Toggle loading flag
      setLoading(false);
    },
    [props.houseId],
  );

  return <AstDropdownView />;
};
