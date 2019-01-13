// @ts-nocheck
import React, { SFC } from 'react';
import * as Yup from 'yup';
import countryList from './utils/countryList';
// Type Definitions
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

const isCountryValid = (name: string) => {
  if (!name) {
    return false;
  }
  return countryList[name] !== undefined;
};

const SignupSchema = Yup.object().shape({
  address1: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  country: Yup.string()
    .required('Required')
    .test('is-country', 'Not a valid country', isCountryValid),
  postCode: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
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
          address1: '',
          address2: '',
          city: '',
          state: '',
          country: '',
          postCode: '',
          email: '',
        }}
        isInitialValid={false}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ dirty, errors, touched, isSubmitting }) => (
          <Form>
            <label>Email</label>
            <Field name='email' autoComplete='billing email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

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
            <button type='submit' disabled={!dirty}>
              {isSubmitting ? 'Submitted' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
