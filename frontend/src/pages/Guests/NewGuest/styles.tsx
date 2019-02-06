import styled from '@emotion/styled';
// Components
import { TextField } from '@material-ui/core';
import { Form } from 'formik';
// Types
import { ComponentClass } from 'react';

export const StyledForm = styled(Form)`
  margin-left: 1rem;
  text-align: left;

  label {
    margin-right: 0.5rem;
  }

  .check-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .check {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    input {
      text-align: center;
      font-weight: bolder;
    }

    label {
      margin-top: 0.5rem;
      color: var(--color-text-accent);
      font-weight: 500;
    }
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

  .guest-info--fields {
    margin-bottom: 2rem;
    /* Grid */
    display: grid;
    grid-template-areas: 'fullName fullName' 'email phone' 'address1 address2' 'city state' 'country postCode';
    column-gap: 1.5rem;
    row-gap: 0.5rem;
    grid-column-gap: 1.5rem;
    grid-row-gap: 0.5rem;

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
