import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
import styled from '@emotion/styled';
// Components
// Types
import { House } from './types';
import loadingIndicator from '../utils/loading.svg';

const AstDropdownView = (props: {
  formState: { ast_id: number; full_name: string };
  onChangeFunc: (e: any, id: number) => void;
  house: House;
  loading: boolean;
  errors: { msg: string; error: boolean };
  className?: string;
}) => {
  const { formState, onChangeFunc, house, loading, className } = props;

  if (loading || props.house.openAst === undefined) {
    return (
      <div>
        <img src={loadingIndicator} alt='animated loading indicator' />
      </div>
    );
  }

  // Good working code
  return (
    <Wrapper className='ast-dropdown'>
      <label>Reassign Assistant</label>
      <br />
      <select
        data-testid='assistant-select'
        onChange={(e) => onChangeFunc(e, house.id)}
      >
        <option defaultValue={house.default_ast_name}>
          {house.default_ast_name}
        </option>
        {house.openAst.map((ast: any) => {
          if (ast.ast_id !== house.default_ast) {
            return (
              <option key={ast.ast_id} value={ast.ast_id}>
                {ast.full_name}
              </option>
            );
          }
        })}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  width: 100%;

  label {
    color: var(--color-text-accent-dark);
    font-size: 1rem;
  }

  select {
    width: 100%;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 1px solid var(--color-border-strong);
    /* Text */
    font-family: 'Roboto Medium', Arial, Helvetica, sans-serif;
    font-size: 1rem;
  }
`;

export const AstDropdown = (props: { houseId: number; className?: string }) => {
  const [formState, setFormState] = useState({
    // TODO: Research more about this unknown business
    ast_id: (null as unknown) as number,
    full_name: (null as unknown) as string,
  });
  const [house, setHouse] = useState({} as House);
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [loading, setLoading] = useState(false);

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
        setFormState({ ast_id: default_ast, full_name: default_ast_name });
        setErrors({ msg: '', error: false });
      })
      .catch(axiosErrorHandler(setErrors));

    // Toggle loading flag
    setLoading(false);
  }, [props.houseId]);

  const onChangeFunc = (e: any) => {
    console.log('event in astdropdown:', e.target);
    console.log('event in astdropdown:', e.currentTarget);
  };

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
    } catch (e) {
      setErrors({ msg: 'Could not update assistant.', error: true });
    }
  }
  return (
    <AstDropdownView
      className={props.className || ''}
      formState={formState}
      onChangeFunc={postAst}
      house={house}
      loading={loading}
      errors={errors}
    />
  );
};
