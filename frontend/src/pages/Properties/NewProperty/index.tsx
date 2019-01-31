import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Field } from 'formik';
// Components
import { FileUploadHOF } from '../../../components/FileUpload';
// Styles
import { NewPropertyStyled, StyledTextField } from './styles';
// Types
import {
  AstObj,
  MyFormProps,
  NewPropertySchema,
  NewPropertyInitialValues,
  UrlObj,
} from './types';
import { AxiosRequestConfig } from 'axios';
import { FieldProps, FormikActions } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Utils
import { axiosErrorHandler } from '../../utils';
import { EmptyPropertyValues } from './types';

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
          <div>Loading</div>
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

const NewProperty = (props: RouteComponentProps) => {
  const [urls, setUrls] = useState({} as UrlObj);
  const [assistants, setAssistants] = useState([] as AstObj[]);
  const [startValues, setStartValues] = useState(
    {} as NewPropertyInitialValues,
  );
  const [errors, setErrors] = useState({ msg: '', error: false });
  useEffect(() => {
    // Get list of assistants from backend
    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    if (props.location.state === undefined) {
      axios
        .get(`${url}/assistants`, headers)
        .then((res) => {
          setAssistants(res.data);
          setStartValues(EmptyPropertyValues);
        })
        .catch(axiosErrorHandler(setErrors));
    } else {
      setAssistants(props.location.state.openAst);
      const {
        address,
        cleaning_fee,
        default_ast,
        extra_guest_fee,
        price,
        name,
      }: {
        address: string;
        cleaning_fee: number;
        default_ast: number;
        extra_guest_fee: number;
        price: number;
        name: string;
      } = props.location.state;
      const addressSplit = address.split('\n');
      const [
        address1,
        address2,
        city,
        state,
        country,
        postCode,
      ]: string[] = addressSplit;
      const loadValues = {
        address1,
        address2,
        city,
        state,
        country,
        postCode,
        propertyName: name,
        cleaningFee: cleaning_fee,
        feePerGuest: extra_guest_fee,
        defaultAst: default_ast,
        pricePerNight: price,
      };

      setStartValues(loadValues);
    }
  }, []);

  // Invoke FileUploadHOF, passing a callback function which will update
  // state with URLs of uploaded files
  const urlFileUpload = FileUploadHOF((url: string, type?: string) => {
    console.log('url', url);
    if (type) {
      setUrls((prev) => ({ ...prev, [type]: url }));
    }
    console.log('urls', urls);
  });

  // Function Formik will call. POSTs to houses
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
      photoUrl,
      pricePerNight,
      feePerGuest,
      cleaningFee,
      defaultAst,
      astGuide,
      guestGuide,
    } = values;

    const { photo_url, ast_guide, guest_guide } = urls;

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
          address2 ? address2 + '\n' : '\n'
        }${city}\n${state}\n${country}\n${postCode}`,
        photo_url,
        price: pricePerNight,
        cleaning_fee: cleaningFee,
        extra_guest_fee: feePerGuest,
        default_ast: defaultAst,
        guest_guide,
        ast_guide,
      };

      await axios.post(`${url}/houses?test=true`, houseData, headers);
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
          msg: `${status}: ${data.message}`,
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

  const goBack = () => props.history.push('/properties');

  return (
    <Formik
      initialValues={EmptyPropertyValues}
      validationSchema={NewPropertySchema}
      onSubmit={onSubmit}
      render={(formProps) => {
        return (
          <NewPropertyView
            {...formProps}
            Uppy={urlFileUpload}
            assistants={assistants}
            urls={urls}
            goBack={goBack}
          />
        );
      }}
    />
  );
};

export default NewProperty;
