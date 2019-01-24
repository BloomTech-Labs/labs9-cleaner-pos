import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field } from 'formik';
// Components
import { labelInputField } from './labelInputField';
// Styled Components
import { StyledForm } from './styles';
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

      <div className='guest-stay--fields'>
        {/* TODO: Implement auto-complete search bar */}
        <label htmlFor='houseId'>
          Which property guest will be staying at?
        </label>
        <br />
        {houses ? (
          <Field name='houseId' component='select' placeholder='Property'>
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
      email,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      postCode,
    } = values;

    try {
      const {
        url,
        headers,
      }: { url: string; headers: AxiosRequestConfig } = setUpUrlAndHeaders();

      const userData = {
        address: `${address1}\n${
          address2 ? address2 + '\n' : ''
        }${city}\n${state}\n${country}\n${postCode}`,
        email,
        phone,
      };

      await axios.post(`${url}/users`, userData, headers);
      await actions.setSubmitting(false);
      await actions.setStatus('Submission successful. Thank you!');
      props.history.push('/dashboard');
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

  return (
    <Formik
      initialValues={emptyValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
      render={(formProps) => <NewGuestView houses={houses} {...formProps} />}
    />
  );
};

export default NewGuest;
