import styled from '@emotion/styled';
// Components
import { TextField } from '@material-ui/core';
import { Form } from 'formik';
// Types
import { ComponentClass } from 'react';

export const StyledForm = styled(Form)`
  max-width: 1000px;
  margin: auto;
  text-align: left;

  h1 {
    margin: 0;
    margin-top: 2rem;
  }

  label {
    margin-right: 0.5rem;
  }

  .guest-stay--fields {
    margin-top: 2rem;
  }

  .extra-guests {
    margin: 2rem 0;
    /* Flex */
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      margin-right: 1rem;
    }
  }

  .check-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  .date-error {
    margin: 2rem 0 1rem 0;
    padding: 1rem;
    text-align: center;
    background-color: #ff7675;
    border-radius: 5px;
  }

  .check {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
      margin: 1rem 0;
    }

    input {
      padding: 0.5rem 0;
      border-radius: var(--border-radius);
      /* Text */
      text-align: center;
      font-family: 'Roboto Medium', Arial, Helvetica, sans-serif;
      font-size: 1rem;
    }

    label {
      margin-top: 0.5rem;
      color: var(--color-text-accent);
      font-size: 1.125rem;
      font-weight: bolder;
    }
  }

  .primary-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 0 0.5rem 2rem 0.5rem;
    }
  }

  .guest-info--fields {
    margin-bottom: 2rem;
    /* Grid */
    display: grid;
    grid-template-areas:
      'fullName fullName'
      'email phone'
      'address1 address2'
      'city state'
      'country postCode';
    column-gap: 1.5rem;
    row-gap: 0.5rem;
    grid-column-gap: 1.5rem;
    grid-row-gap: 0.5rem;

    @media only screen and (max-width: 700px) {
      grid-template-areas:
        'fullName' 'email' 'phone'
        'address1' 'address2' 'city'
        'state' 'country' 'postCode';
    }

    /* CSS Grid Declarations */
    .field-fullName {
      grid-area: fullName;
    }
    .field-email {
      grid-area: email;
    }
    .field-phone {
      grid-area: phone;
    }
    .field-address1 {
      grid-area: address1;
    }
    .field-address2 {
      grid-area: address2;
    }
    .field-city {
      grid-area: city;
    }
    .field-state {
      grid-area: state;
    }
    .field-country {
      grid-area: country;
    }
    .field-postCode {
      grid-area: postCode;
    }
  }
`;

export const FormBlock = styled.div`
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 5px;
  /* Color */
  background-color: white;
  /* Shadow */
  /* Resource: http://cssdeck.com/labs/16-box-shadows-to-save-your-time */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  h2 {
    color: var(--color-text-accent);
  }
`;

export const StyledTextField = styled(TextField as ComponentClass<any>)`
  /* -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important; */
`;
