import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
import { Container, Button } from '../../components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { StyledDiv, StyledForm } from './styles';
import { TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

const EmailSchema = Yup.object().shape({
  to: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  ast_name: Yup.string().required(`Assistant's name is required`),
  manager_name: Yup.string().required('Your name is required'),
});

const InviteAst = (props: RouteComponentProps) => {
  const input = {
    ast_name: '',
    manager_name: '',
    to: '',
  };
  const [error, setError] = useState({ msg: '', error: false });
  const [emailData, setEmailData] = useState(input);
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const headers: AxiosRequestConfig = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };
  async function fetchUser() {
    try {
      const user = await axios.get(`${url}/users`, headers);
      setEmailData((input.manager_name = user.data.full_name));
    } catch (e) {
      axiosErrorHandler(setError);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container>
      <StyledDiv>
        <Formik
          initialValues={emailData}
          validationSchema={EmailSchema}
          validateOnChange={false}
          onSubmit={async (values, actions) => {
            try {
              await axios.post(`${url}/email/`, values, headers);
              await actions.setStatus('Submission successful. Thank you!');
              // props.history.push('/');
            } catch (error) {
              await actions.setSubmitting(false);
              if (error.response) {
                const { status, data } = error.response;
                await actions.setStatus({
                  msg: `${status}: ${data}`,
                });
              } else if (error.request) {
                await actions.setStatus({
                  msg: 'Could not connect. Please try again later.',
                });
              } else {
                // Something happened in setting up the request that triggered an Error
                await actions.setStatus({
                  msg: `Request could not be processed. Please refresh the page.\n\nError:\n${
                    error.message
                  }`,
                });
              }
            }
          }}
          render={({
            values,
            status,
            isSubmitting,
            handleChange,
            handleSubmit,
            touched,
            errors,
          }) => (
            <StyledForm>
              <h2>Invite an assistant to work for you</h2>
              <TextField
                name='ast_name'
                type='text'
                label={errors.ast_name ? errors.ast_name : `Assistant's name`}
                variant='filled'
                value={values.ast_name}
                onChange={handleChange}
              />

              <TextField
                name='to'
                type='email'
                label={errors.to ? errors.to : `Assistant's email`}
                variant='filled'
                value={values.to}
                onChange={handleChange}
              />

              <TextField
                name='manager_name'
                label={errors.manager_name ? errors.manager_name : 'Your Name'}
                type='text'
                variant='filled'
                value={values.manager_name}
                onChange={handleChange}
              />
              <Button
                type='submit'
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                text={isSubmitting ? 'Submitted' : 'Submit'}
              />

              {status && (
                <div className='status' data-testid='div-status'>
                  {status}
                </div>
              )}
            </StyledForm>
          )}
        />
      </StyledDiv>
    </Container>
  );
};

export default InviteAst;
