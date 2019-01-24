import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Field, FormikActions } from 'formik';
// Components
import FileUpload from '../../../components/FileUpload';
// Styles
import { NewPropertyStyled, StyledTextField } from './styles';
// Types
import { NewPropertySchema, NewPropertyInitialValues } from './types';
import { AxiosRequestConfig } from 'axios';
import { FieldProps, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Etc
import { EmptyPropertyValues } from './types';

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
        margin='normal'
        {...field}
      />
    );
  };
};

const NewPropertyView = (formProps: FormikProps<NewPropertyInitialValues>) => {
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
    <NewPropertyStyled>
      <h2>Properties</h2>
      <div className='property-information'>
        <h3>Information</h3>
        <Field
          name='email'
          value={values.propertyName}
          render={labelInputField('Property Name')}
        />
        <Field name='address1' render={labelInputField('Address')} />

        <Field name='address2' render={labelInputField('Address (cont.)')} />

        <Field name='city' render={labelInputField('City')} />

        <Field
          name='state'
          render={labelInputField('State · Province · Region')}
        />

        <Field name='country' render={labelInputField('Country')} />

        <Field name='postCode' render={labelInputField('Post Code')} />
      </div>

      <div className='property-photo'>
        <FileUpload text='Upload a Picture' />
      </div>

      <div className='property-prices'>
        <h3>Prices</h3>
        <Field
          name='pricePerNight'
          render={labelInputField('Price per Night')}
        />

        <Field name='feePerGuest' render={labelInputField('Fee per Guest')} />

        <Field name='cleaningFee' render={labelInputField('Cleaning Fee')} />
      </div>

      <div className='propert-resources'>Placeholder</div>
      <br />
      {/* // TODO: mess with button component to accept optional props} */}
      <button
        className='submit'
        type='submit'
        data-testid='button-submit'
        disabled={isSubmitting || !dirty}
      >
        {isSubmitting ? 'Submitting' : 'Submit'}
      </button>
      {status && status.msg && (
        <div className='status' data-testid='div-status'>
          {status.msg}
        </div>
      )}
    </NewPropertyStyled>
  );
};

const NewProperty = (props: RouteComponentProps) => {
  const onSubmit = async (
    values: NewPropertyInitialValues,
    actions: FormikActions<NewPropertyInitialValues>,
  ) => {
    const {
      propertyName,
      address1,
      address2,
      city,
      state,
      country,
      postCode,
      pricePerNight,
      feePerGuest,
      cleaningFee,
      defaultAst,
      astGuide,
      guestGuide,
    } = values;
    try {
      const url =
        process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      const houseData = {
        name: propertyName,
        address: `${address1}\n${
          address2 ? address2 + '\n' : ''
        }${city}\n${state}\n${country}\n${postCode}`,
        price: pricePerNight,
        cleaning_fee: cleaningFee,
        extra_guest_fee: feePerGuest,
        default_ast: defaultAst,
        guest_guide: guestGuide,
        ast_guide: astGuide,
      };

      await axios.post(`${url}/houses`, houseData, headers);
      await actions.setSubmitting(false);
      await actions.setStatus('Submission successful. Thank you!');
      props.history.push('/properties');
    } catch (error) {
      await actions.setSubmitting(false);
      if (error.response) {
        const { status, data } = error.response;
        await actions.setErrors({
          errorStatus: status,
        });
        await actions.setStatus({
          msg: `${status}: ${data}`,
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
      initialValues={EmptyPropertyValues}
      validationSchema={NewPropertySchema}
      onSubmit={onSubmit}
    >
      {NewPropertyView}
    </Formik>
  );
};

export default NewProperty;
