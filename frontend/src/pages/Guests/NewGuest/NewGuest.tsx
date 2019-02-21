import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field } from 'formik';
// Components
import Datepicker from 'react-datepicker';
import DropDown from './Dropdown';
import Button from '../../../components/Button';
// Styled Components
import { FormBlock, StyledForm, StyledTextField } from './styles';
// Types
import {
  ManagerHouse,
  MyGuestProps,
  NewGuestInitialValues,
  SignupSchema,
} from './types';
import { AxiosRequestConfig } from 'axios';
import { FormikActions, FieldProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
// Utils
import { emptyValues } from './types';
import { axiosErrorHandler } from '../../utils';
import 'react-datepicker/dist/react-datepicker.css';

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
      let result: any;
      if (props.location && props.location.state) {
        const id = props.location.state.guest_id;
        await axios.put(`${url}/guests/${id}`, userData, headers);
        result = { data: [id] };
      } else {
        result = await axios.post(`${url}/guests/`, userData, headers);
      }
      const userId = result.data[0];
      const stayData = {
        guest_id: userId,
        house_id: houseId,
        extra_guests: +extraGuests,
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
      };

      if (props.location && props.location.state) {
        const id = props.location.state.stay_id;
        await axios.put(`${url}/stays/${id}`, stayData, headers);
      } else {
        await axios.post(`${url}/stays/`, stayData, headers);
      }
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

  const setInitialValues = (
    routeProps: RouteComponentProps,
  ): NewGuestInitialValues => {
    if (routeProps.location && routeProps.location.state) {
      const {
        guest_name,
        email,
        phone,
        address,
        house_id,
        extra_guests,
        check_in,
        check_out,
        diff,
      } = routeProps.location.state;
      const addressArray = address ? address.split('\n') : '';
      if (addressArray && addressArray.length < 6) {
        addressArray.splice(1, 0, '');
      }

      return {
        fullName: guest_name,
        email,
        phone,
        address1: addressArray[0],
        address2: addressArray[1],
        city: addressArray[2],
        state: addressArray[3],
        country: addressArray[4],
        postCode: addressArray[5],
        houseId: house_id,
        extraGuests: extra_guests,
        checkIn: new Date(check_in),
        checkOut: new Date(check_out),
      };
    } else {
      return emptyValues;
    }
  };
  const goBack = () => props.history.push('/guests');
  return (
    <Formik
      initialValues={setInitialValues(props)}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
      render={(formProps) => (
        <NewGuestView houses={houses} goBack={goBack} {...formProps} />
      )}
    />
  );
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

  /* Helper Child Component for Text Fields */
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

  return (
    <StyledForm>
      <h1 className='title'>New Reservation</h1>
      <br />
      <FormBlock>
        <h2>Guest Information</h2>
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
          <Field
            name='address2'
            render={labelInputField('Address (continued)')}
          />
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
      </FormBlock>
      <FormBlock>
        <h2>Reservation Information</h2>
        <div className='guest-stay--fields'>
          {/* TODO: Implement auto-complete search bar */}
          <label htmlFor='houseId'>
            Which property will the guest be staying at?
          </label>
          <br />
          {houses ? (
            <Field name='houseId' render={DropDown(houses)} />
          ) : (
            <div>Loading</div>
          )}
          <br />
          <br />
          <div className='check-group'>
            {/* TODO: Make it impossible to set Check-In date before today */}
            <div className='check check-in'>
              {/* Resource: https://stackoverflow.com/a/52273407 */}
              <Datepicker
                className='dp-checkIn'
                name='checkIn'
                selected={values.checkIn}
                onChange={setCheckDate(setFieldValue, 'checkIn')}
              />
              <label htmlFor='checkIn'>Check-In Date</label>
            </div>
            <br />
            <div className='check check-out'>
              <Datepicker
                className='dp-checkOut'
                name='checkOut'
                selected={values.checkOut}
                onChange={setCheckDate(setFieldValue, 'checkOut')}
              />
              <label htmlFor='checkOut'>Check-Out Date</label>
            </div>
          </div>
          {areDatesValid(values.checkIn, values.checkOut).message && (
            <div className='date-error' data-testid='date-error'>
              {areDatesValid(values.checkIn, values.checkOut).message}
            </div>
          )}
          <br />
          <div className='extra-guests'>
            <span>How many other guests are there?</span>
            <Field
              name='extraGuests'
              render={labelInputField('Extra Guests')}
            />
          </div>
        </div>
      </FormBlock>
      <div className='primary-buttons'>
        <Button
          className='back'
          data-testid='button-back'
          onClick={formProps.goBack}
        >
          Go Back ↩
        </Button>
        <Button
          className='submit'
          type='submit'
          data-testid='button-submit'
          disabled={disableButton(
            isSubmitting,
            dirty,
            areDatesValid(values.checkIn, values.checkOut),
          )}
        >
          {isSubmitting ? 'Submitted' : 'Submit'}
        </Button>
      </div>
      {status && status.msg && (
        <div className='status' data-testid='div-status'>
          {status.msg}
        </div>
      )}
    </StyledForm>
  );
};

/* Date Helper Functions */

export const setCheckDate = (
  setFieldValue: (field: string, value: any) => void,
  checkStatus: string,
) => (date: Date | null) => {
  if (date === null) {
    return;
  }
  const inputDate = new Date(date.getTime());
  inputDate.setHours(0, 0, 0, 0);
  setFieldValue(checkStatus, inputDate);
};

export const areDatesValid = (
  a: Date,
  b: Date,
): { result: boolean; message: string } => {
  const z = function zeroOutTime(date: Date) {
    // Get rid of that pesky time stamp
    return date.setHours(0, 0, 0, 0);
  };
  // A should be before B
  const datesAreChronological: boolean = z(a) <= z(b);
  // A should be on or after today's date
  const beforeDateIsOK: boolean = z(a) >= z(new Date(Date.now()));

  if (!datesAreChronological) {
    return {
      result: datesAreChronological,
      message: 'Check-out date must be at or after check-in date.',
    };
  } else if (!beforeDateIsOK) {
    return {
      result: beforeDateIsOK,
      message: 'Check-in date must be today or later.',
    };
  } else {
    return { result: datesAreChronological && beforeDateIsOK, message: '' };
  }
};

export const disableButton = (
  isSubmitting: boolean,
  dirty: boolean,
  dateCheckResult: { result: boolean; message: string },
): boolean => {
  // Return true if isSubmitting is true, dirty is false, or if dates are invalid
  return isSubmitting || !dirty || !dateCheckResult.result;
};

export default NewGuest;
