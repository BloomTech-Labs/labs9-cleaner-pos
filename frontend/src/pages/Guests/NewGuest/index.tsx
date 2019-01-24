import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Components
import { labelInputField } from './labelInputField';
// Styled Components
import { StyledForm } from './styles';
// Types
import { NewGuestInitialValues, SignupSchema } from './types';
import { AxiosRequestConfig } from 'axios';
import { Formik, Field, FieldProps, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Utils
import { emptyValues } from './types';

const NewGuestView = (formProps: FormikProps<NewGuestInitialValues>) => {
  const {
    dirty,
    errors,
    handleReset,
    isSubmitting,
    status,
    touched,
    values,
  } = formProps;
  return (
    <StyledForm>
      <h2 className='title'>New Reservation</h2>
      <br />
      <h3>Guest Information</h3>
      <div className='guest-info--fields'>
        <Field
          name='fullName'
          value={values.fullName}
          autoComplete='billing name'
          render={labelInputField('Name')}
        />

        <Field
          name='email'
          value={values.email}
          autoComplete='billing email'
          render={labelInputField('Email')}
        />

        <Field
          name='phone'
          autoComplete='billing phone'
          render={labelInputField('Phone Number')}
        />

        <Field
          name='address1'
          autoComplete='billing street-address'
          render={labelInputField('Address')}
        />

        <Field name='address2' render={labelInputField('Address (cont.)')} />

        <Field
          name='city'
          autoComplete='billing address-level2'
          render={labelInputField('City')}
        />

        <Field
          name='state'
          autoComplete='billing address-level1'
          render={labelInputField('State · Province · Region')}
        />

        <Field
          name='country'
          autoComplete='billing country-name'
          render={labelInputField('Country')}
        />

        <Field name='postCode' render={labelInputField('Post Code')} />
      </div>

      <br />
      <button
        className='submit'
        type='submit'
        data-testid='button-submit'
        disabled={isSubmitting || !dirty}
      >
        {isSubmitting ? 'Submitted' : 'Submit'}
      </button>
      {status && status.msg && (
        <div className='status' data-testid='div-status'>
          {status.msg}
        </div>
      )}
    </StyledForm>
  );
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
