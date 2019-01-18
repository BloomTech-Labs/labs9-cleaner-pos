import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
// Styled Components
import { Container } from '../../components/';
import { StyledDiv, StyledForm, StyledTextField } from './styles';
// Type Definitions
import { AxiosRequestConfig } from 'axios';
import { Formik, Field, FieldProps, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  phone: Yup.string()
    .min(2)
    .max(15)
    .required('Phone number is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('Region is required'),
  country: Yup.string().required('Country is required'),
  // .test('is-country', 'Country is invalid', isCountryValid),
  postCode: Yup.string().required('Post Code is required'),
});

interface InitialValueProps {
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postCode?: string;
  full_name?: string;
  ext_it?: string;
  errorStatus?: string;
}

interface PostFormProps extends RouteComponentProps {
  initialValues?: InitialValueProps;
}

const PostForm = (props: PostFormProps) => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  const labelInputField = (label: string) => {
    return ({ field, form }: FieldProps) => {
      const { name, value } = field;
      const { touched, errors } = form;
      const errorState = Boolean(errors[name] && touched[name]);
      return (
        <StyledTextField
          error={errorState}
          inputProps={{ ...field, 'data-testid': `input-${name}` }}
          InputLabelProps={{ 'data-testid': `label-${name}` }}
          className={`field-${name}`}
          data-testid={`field-${name}`}
          label={errorState ? errors[name] : label}
          variant='filled'
          {...field}
        />
      );
    };
  };

  let startValues: InitialValueProps = {};
  let location: string = '';

  if (props.location && props.location.state) {
    const { address, email, ext_it, full_name, phone } = props.location.state;
    const addressArray = address.split('\n');
    if (addressArray.length < 6) {
      addressArray.splice(1, 0, '');
    }
    const address1 = addressArray[0];
    const address2 = addressArray[1];
    const city = addressArray[2];
    const state = addressArray[3];
    const country = addressArray[4];
    const postCode = addressArray[5];
    location = props.location.pathname;
    startValues = {
      address1,
      address2,
      city,
      state,
      country,
      postCode,
      full_name,
      email,
      phone,
    };
  }

  return (
    <Container>
      <StyledDiv>
        <Formik
          initialValues={
            location === '/updateinfo'
              ? startValues
              : {
                  email: '',
                  phone: '',
                  address1: '',
                  address2: '',
                  city: '',
                  state: '',
                  country: '',
                  postCode: '',
                  errorStatus: '',
                }
          }
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
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
              await axios.put(`${url}/users/`, userData, headers);
              await actions.setSubmitting(false);
              await actions.setStatus('Submission successful. Thank you!');
              props.history.push('/dashboard');
            } catch (error) {
              await actions.setSubmitting(false);
              if (error.response) {
                // Resource: https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                const { status, data } = error.response;
                await actions.setErrors({
                  errorStatus: status,
                });
                await actions.setStatus({
                  msg: `${status}: ${data}`,
                });
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
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
        >
          {(formProps: FormikProps<InitialValueProps>) => {
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
                <h2 className='title'>
                  {location === '/postreg'
                    ? 'Just a few more things!'
                    : `Let's update your contact info!`}
                </h2>
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

                <Field
                  name='address2'
                  render={labelInputField('Address (cont.)')}
                />

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

                {/* // TODO: refactor below to use downscript or react-suggest */}
                {/* <label>Country</label>
              <Field
                name='country'
                autoComplete='billing country-name'
                component={CountryComboBox}
              />
              <ErrorMessage name='country' /> */}
                <Field
                  name='country'
                  autoComplete='billing country-name'
                  render={labelInputField('Country')}
                />

                <Field name='postCode' render={labelInputField('Post Code')} />

                <br />
                {/* // TODO: mess with button component to accept optional props} */}
                <button
                  className='submit'
                  type='submit'
                  data-testid='button-submit'
                  disabled={isSubmitting || !dirty}
                >
                  {isSubmitting ? 'Submitted' : 'Submit'}
                </button>
                <button className='clear' type='button' onClick={handleReset}>
                  Clear
                </button>
                {status && status.msg && (
                  <div className='status' data-testid='div-status'>
                    {status.msg}
                  </div>
                )}
              </StyledForm>
            );
          }}
        </Formik>
      </StyledDiv>
    </Container>
  );
};

export default PostForm;
