import React, { FormEvent } from 'react';
// Components
import { Field } from 'formik';
import { Button } from './../../../components';
import InputAdornment from '@material-ui/core/InputAdornment';
// Styled Components
import {
  FormBlock,
  NewPropertyStyled,
  StyledTextField,
} from './NewPropertyStyles';
// Types
import { MyFormProps, UrlObj } from './types';
import { FieldProps } from 'formik';
// Assets
import loadingIndicator from '../../utils/loading.svg';

const labelInputField = (label: string, currency?: 'dollar') => {
  // Material UI Textfield made to interface with Formik
  // Give it a name and whether you want it to bling,
  // And it will give you back a Component for Field to render
  // Text adornment: https://github.com/mui-org/material-ui/pull/10899/files
  const startAdornment =
    currency === 'dollar'
      ? {
          startAdornment: (
            <InputAdornment position='start'>
              <i className='fas fa-dollar-sign' />
            </InputAdornment>
          ),
        }
      : {};

  return ({ field, form }: FieldProps) => {
    const { name, value, onChange } = field;
    const { touched, errors } = form;
    const errorState = Boolean(errors[name] && touched[name]);
    return (
      <StyledTextField
        error={errorState}
        name={name}
        value={value}
        onChange={onChange}
        InputProps={{
          ...field,
          ...startAdornment,
          'data-testid': `input-${name}`,
        }}
        InputLabelProps={{ 'data-testid': `label-${name}` }}
        className={`field field-${name}`}
        data-testid={`field-${name}`}
        label={errorState ? errors[name] : label}
        margin='normal'
        {...field}
      />
    );
  };
};

const NewPropertyView = (formProps: MyFormProps) => {
  const {
    dirty,
    errors,
    handleReset,
    isSubmitting,
    status,
    touched,
    values,
    urls,
    Uppy,
    assistants,
  } = formProps;

  const initialUrls = { ...urls };

  function didUrlChange(a: UrlObj, b: UrlObj) {
    for (const url in a) {
      if (a[url] !== b[url]) {
        return true;
      }
    }
    return false;
  }

  console.log(
    'new property view:',
    'dirty',
    dirty,
    'errors',
    errors,
    'isSubmitting',
    isSubmitting,
    'defaultAst',
    values.defaultAst,
  );
  return (
    <NewPropertyStyled>
      <h1>Properties</h1>
      <FormBlock className='property-info'>
        <h2>Information</h2>
        <div className='property-info--fields'>
          <Field
            name='propertyName'
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
      </FormBlock>

      <FormBlock className='property-photo'>
        <h2>Property Photo</h2>
        <div className='image-preview'>
          {urls.photo_url ? (
            <img src={urls.photo_url} alt='Uploaded Image' />
          ) : (
            <i className='far fa-image' />
          )}
        </div>
        <Uppy type='photo_url' text='Upload a Photo!' />
      </FormBlock>

      <FormBlock className='property-prices'>
        <h2>Prices</h2>
        <div className='property-prices--fields'>
          <Field
            name='pricePerNight'
            render={labelInputField('Price per Night', 'dollar')}
          />
          <Field
            name='feePerGuest'
            render={labelInputField('Fee per Guest', 'dollar')}
          />
          <Field
            name='cleaningFee'
            render={labelInputField('Cleaning Fee', 'dollar')}
          />
        </div>
      </FormBlock>

      <FormBlock className='property-resources'>
        <h2>Resources</h2>
        <div className='ast-dropdown'>
          <label>Choose a default assistant.</label>
          {assistants ? (
            <Field name='defaultAst' component='select' placeholder='Assistant'>
              <option value={-1} key={'default'}>
                Choose an assistant
              </option>
              {assistants.map((ast) => (
                <option key={ast.ast_id} value={ast.ast_id}>
                  {ast.full_name}
                </option>
              ))}
            </Field>
          ) : (
            <img src={loadingIndicator} alt='animated loading indicator' />
          )}
        </div>
        <br />
        <br />
        <div className='property-resources--guides'>
          <div className='guide left'>
            {urls.ast_guide ? (
              <a href={urls.ast_guide} target='_blank'>
                <i className='fas fa-file' />
              </a>
            ) : (
              <i className='fas fa-question' />
            )}
            <Uppy type='ast_guide' text='Upload Assistant Guide' />
          </div>
          <div className='guide right'>
            {urls.guest_guide ? (
              <a href={urls.guest_guide} target='_blank'>
                <i className='fas fa-file' />
              </a>
            ) : (
              <i className='fas fa-question' />
            )}
            <Uppy type='guest_guide' text='Upload Guest Guide' />
          </div>
        </div>
      </FormBlock>
      <br />
      <div className='primary-buttons'>
        <Button
          className='button back'
          data-testid='button-back'
          onClick={formProps.goBack}
        >
          Go Back <i className='fas fa-long-arrow-alt-left' />
        </Button>
        <Button
          className='button submit'
          type='submit'
          disabled={
            values.defaultAst === -1 ||
            (isSubmitting || !dirty || !didUrlChange(initialUrls, urls))
          }
          data-testid='button-submit'
          text={isSubmitting ? 'Submitting' : 'Submit'}
        />
      </div>

      {status && status.msg && (
        <div className='status' data-testid='div-status'>
          {status.msg}
        </div>
      )}
    </NewPropertyStyled>
  );
};

export default NewPropertyView;
