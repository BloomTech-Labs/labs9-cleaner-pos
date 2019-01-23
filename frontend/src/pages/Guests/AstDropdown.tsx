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

const AstDropdownView = () => {
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

const AstDropdown = (houseId: number) => {
  const [houses, setHouses] = useState([] as House[]);
  const [errors, setErrors] = useState({ msg: '', error: false });
};
