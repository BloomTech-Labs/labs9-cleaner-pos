// @ts-nocheck
import React from 'react';
import * as Yup from 'yup';
import countryList from './utils/countryList';
import axios from 'axios';
// Type Definitions
import { AxiosRequestConfig } from 'axios';
import {
  Formik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { RouteComponentProps } from 'react-router-dom';

const isCountryValid = (name: string) => {
  if (!name) {
    return false;
  }
  return countryList[name] !== undefined;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .min(2)
    .max(15)
    .required('Required'),
  address1: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  country: Yup.string()
    .required('Required')
    .test('is-country', 'Not a valid country', isCountryValid),
  postCode: Yup.string().required('Required'),
});

const PostForm = (props: RouteComponentProps) => {
  // TODO: Find proper type of inputProps
  const CountryComboBox = (inputProps: any) => {
    const { field } = inputProps;
    return (
      <div>
        <input
          type='text'
          name='country'
          list='countries'
          {...field}
          {...inputProps}
        />
        <datalist id='countries'>
          {Object.keys(countryList).map((name, i) => (
            <option key={i} value={name} />
          ))}
        </datalist>
      </div>
    );
  };

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: '',
          phone: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          country: '',
          postCode: '',
          errorStatus: '',
        }}
        isInitialValid={false}
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
              address: `${address1}\n${address2 + '\n' ||
                ''}${city}\n${state}\n${country}\n${postCode}`,
              email,
              phone,
            };
            const url =
              process.env.REACT_APP_backendURL ||
              'https://cleaner-pos.herokuapp.com';
            await axios.put(`${url}/users/`, userData, headers);
            actions.setSubmitting(false);
            props.history.push('/dashboard');
          } catch (error) {
            actions.setSubmitting(false);
            if (error.response) {
              // Resource: https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);
              const { status, data } = error.response;
              actions.setErrors({
                errorStatus: status,
              });
              console.log('POST ERROR: ', data);
              actions.setStatus({
                msg: 'Internal Server Error. Please try again later.',
              });
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              actions.setStatus({
                msg: 'Could not connect. Please try again later.',
              });
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              actions.setStatus({
                msg:
                  'Request could not be processed. Please refreshing the page.',
              });
            }
          }
        }}
      >
        {(formProps) => {
          const { dirty, errors, touched, isSubmitting, status } = formProps;
          return (
            <Form>
              <label>Email</label>
              <Field name='email' autoComplete='billing email' />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              <label>Phone Number</label>
              <Field name='phone' autoComplete='billing phone' />
              {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}

              <label>Address1</label>
              <Field name='address1' autoComplete='billing street-address' />
              {errors.address1 && touched.address1 ? (
                <div>{errors.address1}</div>
              ) : null}

              <label>Address 2</label>
              <Field name='address2' />

              <label>City</label>
              <Field name='city' autoComplete='billing address-level2' />
              {errors.city && touched.city ? <div>{errors.city}</div> : null}

              <label>State · Province · Region</label>
              <Field name='state' autoComplete='billing address-level1' />
              {errors.state && touched.state ? <div>{errors.state}</div> : null}

              <label>Country</label>
              <Field
                name='country'
                autoComplete='billing country-name'
                component={CountryComboBox}
              />
              {errors.country && touched.country ? (
                <div>{errors.country}</div>
              ) : null}

              <label>Post Code</label>
              <Field name='postCode' />
              {errors.postCode && touched.postCode ? (
                <div>{errors.postCode}</div>
              ) : null}

              <br />
              <button type='submit' disabled={isSubmitting || !dirty}>
                {isSubmitting ? 'Submitted' : 'Submit'}
              </button>
              {status && status.msg && <div>{status.msg}</div>}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PostForm;
