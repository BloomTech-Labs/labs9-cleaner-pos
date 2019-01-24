import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Field } from 'formik';
// Styles
import { NewPropertyStyled, StyledTextField } from './styles';
// Types
import { NewPropertySchema, NewPropertyInitialValues } from './types';
import { AxiosRequestConfig } from 'axios';
import { FieldProps, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

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

      <div className='property-photo'>Placeholder</div>

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
    </NewPropertyStyled>
  );
};

const NewProperty = () => {
  return 'hello';
};

export default NewProperty;
