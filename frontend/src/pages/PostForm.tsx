import React, { SFC } from 'react';
import * as Yup from 'yup';
// Type Definitions
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  // address1: Yup.string(),
  // address2: Yup.string(),
  // city: Yup.string(),
  // state: Yup.string(),
  // country: Yup.string(),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const PostForm = (props: RouteComponentProps) => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <p>Email</p>
            <Field name='email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
