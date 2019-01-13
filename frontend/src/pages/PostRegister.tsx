// @ts-nocheck
import React, { SFC } from 'react';
import * as Yup from 'yup';
import countryList from './utils/countryList';
// Type Definitions
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

const isCountryValid = (name: string) => {
  return countryList[name.toString()] !== undefined;
};

const SignupSchema = Yup.object().shape({
  address1: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  country: Yup.string()
    .required('Required')
    .test('is-country', '${path} is not a valid country', isCountryValid),
  postCode: Yup.number().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

// interface SignupTypes {
//   address1: string;
//   address2?: string;
//   city: string;
//   state: string;
//   country: string;
//   postCode: number;
//   email: string;
// }

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
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>Email</label>
            <Field name='email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label>Address1</label>
            <Field name='address1' />
            <label>Address 2</label>
            <Field name='address2' />
            <label>City</label>
            <Field name='city' />
            <label>State · Province · Region</label>
            <Field name='state' />
            <label>Country</label>
            <Field name='country' component={CountryComboBox} />
            {errors.country && touched.country ? (
              <div>{errors.country}</div>
            ) : null}
            <label>Post Code</label>
            <Field name='postCode' />
            <br />
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
