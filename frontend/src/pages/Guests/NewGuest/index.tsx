import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Types
import { SignupSchema } from './types';
import { AxiosRequestConfig } from 'axios';
import { Formik, Field, FieldProps, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Utils
import { emptyValues } from './types';

const NewGuestView = () => {
  return <div />;
};

const NewGuest = (props: RouteComponentProps) => {
  const onSubmit = async (values, actions) => {
    const {
      email,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      postCode,
    } = values;

    try {
      const url =
        process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const userData = {
        address: `${address1}\n${
          address2 ? address2 + '\n' : ''
        }${city}\n${state}\n${country}\n${postCode}`,
        email,
        phone,
      };
      await axios.post(`${url}/users`, userData, headers);
      await actions.setSubmitting(false);
      await actions.setStatus('Submission successful. Thank you!');
      props.history.push('/dashboard');
    } catch (error) {
      await actions.setSubmitting(false);
      if (error.response) {
        const { status, data } = error.response;
        await actions.setErrors({
          errorStatus: status,
        });
        await actions.setStatus({
          msg: `${status}: ${data.message}`,
        });
      } else if (error.request) {
        await actions.setStatus({
          msg: 'Could not connect. Please try again later.',
        });
      } else {
        await actions.setStatus({
          msg: `Request could not be processed. Please refresh the page.\n\nError:\n${
            error.message
          }`,
        });
      }
    }
  };

  return (
    <Formik
      initialValues={emptyValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
      render={NewGuestView}
    />
  );
};

export default NewGuest;
