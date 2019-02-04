import React from 'react';
import { MyFormProps } from './types';
import { NewPropertyStyled, StyledTextField } from './styles';
import { FieldProps } from 'formik';
import { Field } from 'formik';
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
        className={`field-${name}`}
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
      <h2>Properties</h2>
      <div className='property-info'>
        <h3>Information</h3>
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
      </div>

      <div className='property-photo'>
        <Uppy type='photo_url' text='Upload a Photo!' />
        {/* {urls.photo_url ? <p>{urls.photo_url}</p> : null} */}
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

      <div className='property-resources'>
        <h3>Resources</h3>
        <label>Choose a default assistant.</label>
        <br />
        {assistants ? (
          <Field name='defaultAst' component='select' placeholder='Assistant'>
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
      </div>
      <br />

      <button
        className='submit'
        type='submit'
        data-testid='button-submit'
        disabled={isSubmitting || !dirty}
      >
        {isSubmitting ? 'Submitting' : 'Submit'}
      </button>
      <button
        className='back'
        data-testid='button-back'
        onClick={formProps.goBack}
      >
        Go Back ↩
      </button>
      {status && status.msg && (
        <div className='status' data-testid='div-status'>
          {status.msg}
        </div>
      )}
    </NewPropertyStyled>
  );
};

export default NewPropertyView;
