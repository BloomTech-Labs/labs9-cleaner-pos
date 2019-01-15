import React, { ComponentClass, ClassicComponent } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
// Styled Components
import { StyledDiv, StyledForm, StyledTextField } from './styles';
// Type Definitions
import { AxiosRequestConfig } from 'axios';
import {
  ErrorMessage,
  Formik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FieldProps,
} from 'formik';
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

const PostForm = (props: RouteComponentProps) => {
  const labelInputField = (label: string) => {
    return ({ field, form }: FieldProps) => {
      const { name } = field;
      const { touched, errors } = form;
      const errorState = Boolean(errors[name] && touched[name]);
      return (
        <StyledTextField
          error={errorState}
          inputProps={{ 'data-testid': `input-${name}` }}
          InputLabelProps={{ 'data-testid': `label-${name}` }}
          className={`field-${name}`}
          label={errorState ? errors[name] : label}
          variant='filled'
          {...field}
        />
      );
    };
  };

  return (
    <StyledDiv>
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
          const {
            dirty,
            errors,
            handleReset,
            isSubmitting,
            status,
            touched,
          } = formProps;
          return (
            <StyledForm>
              <h2 className='title'>Just a few more things!</h2>
              {/* <label>Email</label> */}
              {/* <Field name='email' autoComplete='billing email' /> */}
              <Field
                name='email'
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
  );
};

export default PostForm;
