import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Components
// Types
import { House } from './types';

const AstDropdownView = (props: {
  formState: { ast_id: number; full_name: string };
  onChangeFunc: (e: any) => void;
  house: House;
  loading: boolean;
  errors: { msg: string; error: boolean };
  className?: string;
}) => {
  const { formState, onChangeFunc, house, loading, className } = props;

  if (loading || props.house.openAst === undefined) {
    return <div>⌛</div>;
  }

  // Good working code
  return (
    <div className='ast-dropdown'>
      Default Cleaner
      <select data-testid='assistant-select' onChange={(event) => event}>
        <option defaultValue={house.default_ast_name}>
          {house.default_ast}: {house.default_ast_name}
        </option>
        {house.openAst.map((ast: any) => {
          if (ast.ast_id !== house.default_ast) {
            return (
              <option key={ast.ast_id}>
                {ast.ast_id}: {ast.full_name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export const AstDropdown = (props: { houseId: number }) => {
  const [formState, setFormState] = useState({
    // TODO: Research more about this unknown business
    ast_id: (null as unknown) as number,
    full_name: (null as unknown) as string,
  });
  const [house, setHouse] = useState({} as House);
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
        .get(`${url}/houses/${props.houseId}`, headers)
        .then((response) => {
          const { data } = response;
          setHouse(data);
          const { default_ast, default_ast_name } = data;
          setFormState({ ast_id: default_ast, full_name: default_ast_name });
          setErrors({ msg: '', error: false });
        })
        .catch(axiosErrorHandler(setErrors));

      // Toggle loading flag
      setLoading(false);
    },
    [props.houseId],
  );

  const onChangeFunc = (e: any) => {
    setFormState((prev) => ({ ...prev }));
  };

  return (
    <AstDropdownView
      formState={formState}
      onChangeFunc={onChangeFunc}
      house={house}
      loading={loading}
      errors={errors}
    />
  );
};
