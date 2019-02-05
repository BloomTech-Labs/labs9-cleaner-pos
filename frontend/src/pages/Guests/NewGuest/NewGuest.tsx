import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field } from 'formik';
// Components
import { TextField } from '@material-ui/core';
import Datepicker from 'react-datepicker';
// Styled Components
import { StyledForm, StyledTextField } from './styles';
// Types
import {
  ManagerHouse,
  MyGuestProps,
  NewGuestInitialValues,
  SignupSchema,
} from './types';
import { AxiosRequestConfig } from 'axios';
import { FormikActions, FieldProps, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Utils
import { emptyValues } from './types';
import { axiosErrorHandler } from '../../utils';
import 'react-datepicker/dist/react-datepicker.css';

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
        {...field}
      />
    );
  };
};

const NewGuestView = (formProps: MyGuestProps) => {
  const {
    dirty,
    errors,
    handleReset,
    isSubmitting,
    status,
    touched,
    values,
    houses,
    setFieldValue,
  } = formProps;
  return (
    <StyledForm>
      <h2 className='title'>New Reservation</h2>
      <br />
      <h3>Guest Information</h3>
      <div className='guest-info--fields'>
        <Field
          name='fullName'
          value={values.fullName}
          autoComplete='billing name'
          render={labelInputField('Name')}
        />

        <Field
          name='email'
          value={values.email}
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

        <Field name='address2' render={labelInputField('Address (cont.)')} />

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

        <Field
          name='country'
          autoComplete='billing country-name'
          render={labelInputField('Country')}
        />

        <Field name='postCode' render={labelInputField('Post Code')} />
      </div>

      <h3>Reservation Information</h3>
      <div className='guest-stay--fields'>
        {/* TODO: Implement auto-complete search bar */}
        <label htmlFor='houseId'>
          Which property will the guest be staying at?
        </label>
        <br />
        {houses ? (
          <Field name='houseId' component='select' placeholder='Property'>
            <option value={-1}>Choose a property</option>
            {houses.map((house) => (
              <option key={house.id} value={house.id}>
                {house.name}
              </option>
            ))}
          </Field>
        ) : (
          <div>Loading</div>
        )}
        <br />
        <br />
        {/* TODO: Make it impossible to set Check-In date before today */}
        <label htmlFor='checkIn'>Check-In Date</label>
        {/* Resource: https://stackoverflow.com/a/52273407 */}
        <Datepicker
          name='checkIn'
          selected={values.checkIn}
          onChange={(e) => setFieldValue('checkIn', e)}
        />
        <br />
        <label htmlFor='checkOut'>Check-Out Date</label>
        <Datepicker
          name='checkOut'
          selected={values.checkOut}
          onChange={(e) => setFieldValue('checkOut', e)}
        />
        <br />
        <br />
        <Field name='extraGuests' render={labelInputField('Extra Guests')} />
      </div>
      <br />
      <button
        className='submit'
        type='submit'
        data-testid='button-submit'
        disabled={isSubmitting || !dirty}
      >
        {isSubmitting ? 'Submitted' : 'Submit'}
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
    </StyledForm>
  );
};

const NewGuest = (props: RouteComponentProps) => {
  const [houses, setHouses] = useState([] as ManagerHouse[]);
  const [errors, setErrors] = useState({ msg: '', error: false });
  const setUpUrlAndHeaders = () => {
    /*
    Sets default URL, loads/checks token, and sets header
    Returns url and header as an array in said order
    */
    // TODO: Refactor to take advantage of Context API handling user info
    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Not authenticated');
    }

    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: token,
      },
    };

    return { url, headers };
  };

  useEffect(() => {
    // Get properties manager manages
    const {
      url,
      headers,
    }: { url: string; headers: AxiosRequestConfig } = setUpUrlAndHeaders();

    axios
      .get(`${url}/houses?manager=true&test=true`, headers)
      .then((res) => {
        setHouses(res.data);
      })
      .catch(axiosErrorHandler(setErrors));
  }, []);

  const onSubmit = async (
    values: NewGuestInitialValues,
    actions: FormikActions<NewGuestInitialValues>,
  ) => {
    const {
      fullName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      postCode,
      houseId,
      extraGuests,
      checkIn,
      checkOut,
    } = values;

    try {
      const {
        url,
        headers,
      }: { url: string; headers: AxiosRequestConfig } = setUpUrlAndHeaders();

      const userData = {
        full_name: fullName,
        address: `${address1}\n${
          address2 ? address2 + '\n' : ''
        }${city}\n${state}\n${country}\n${postCode}`,
        email,
        phone,
        ext_it: null,
        role: 'guest',
      };

      const result = await axios.post(`${url}/guests/`, userData, headers);

      const userId = result.data[0];

      const stayData = {
        guest_id: userId,
        house_id: houseId,
        extra_guests: +extraGuests,
        check_in: checkIn,
        check_out: checkOut,
      };
      await axios.post(`${url}/stays/`, stayData, headers);
      await actions.setSubmitting(false);
      await actions.setStatus('Submission successful. Thank you!');
      props.history.push('/guests');
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

  const goBack = () => props.history.push('/guests');

  return (
    <Formik
      initialValues={emptyValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
      render={(formProps) => (
        <NewGuestView houses={houses} goBack={goBack} {...formProps} />
      )}
    />
  );
};

export default NewGuest;
