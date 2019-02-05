import React, { FormEvent } from 'react';
// Components
import { Field } from 'formik';
import { Button } from './../../../components';
// Styled Components
import {
  FormBlock,
  NewPropertyStyled,
  StyledTextField,
} from './NewPropertyStyles';
// Types
import { MyFormProps } from './types';
import { FieldProps } from 'formik';
// Assets
import loadingIndicator from '../../utils/loading.svg';

const labelInputField = (label: string) => {
  // Material UI Textfield made to interface with Formik
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
        inputProps={{ ...field, 'data-testid': `input-${name}` }}
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
        <Uppy type='photo_url' text='Upload a Photo!' />
        {/* {urls.photo_url ? <p>{urls.photo_url}</p> : null} */}
      </FormBlock>

      <FormBlock className='property-prices'>
        <h2>Prices</h2>
        <div className='property-prices--fields'>
          <Field
            name='pricePerNight'
            render={labelInputField('Price per Night')}
          />
          <Field name='feePerGuest' render={labelInputField('Fee per Guest')} />
          <Field name='cleaningFee' render={labelInputField('Cleaning Fee')} />
        </div>
      </FormBlock>

      <FormBlock className='property-resources'>
        <h2>Resources</h2>
        <label>Choose a default assistant.</label>
        <br />
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
        <br />
        <br />
        <Uppy type='ast_guide' text='Upload Assistant Guide' />
        <br />
        <Uppy type='guest_guide' text='Upload Guest Guide' />
      </FormBlock>
      <br />
      <div className='primary-buttons'>
        <Button
          className='button submit'
          type='submit'
          disabled={values.defaultAst === -1 || (isSubmitting || !dirty)}
          data-testid='button-submit'
          text={isSubmitting ? 'Submitting' : 'Submit'}
        />
        <Button
          className='button back'
          data-testid='button-back'
          onClick={formProps.goBack}
        >
          Go Back <i className='fas fa-long-arrow-alt-left' />
        </Button>
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
