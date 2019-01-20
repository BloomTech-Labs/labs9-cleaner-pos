import { ComponentClass } from 'react';
import styled from '@emotion/styled';
// Components
import { Form } from 'formik';
import { TextField } from '@material-ui/core';

export const StyledDiv = styled('div')`
  font-family: 'Roboto';
  color: #393534;
  max-width: 1020px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

/*
  -webkit-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
*/
export const StyledForm = styled(Form)`
  /* Color */
  background-color: white;

  /* Sizing & Box Model */
  padding: 1rem;
  width: 90%;

  /* Grid */
  display: grid;
  gap: ${36 / 16}rem;
  grid-gap: ${36 / 16}rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'title title . .'
    'email email phone phone'
    'address1 address1 address1 address1'
    'address2 address2 address2 address2'
    'city city state state'
    'country country country postCode'
    '. submit clear .'
    '. status status .';

  .title {
    grid-area: title;
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
  .submit {
    grid-area: submit;
  }
  .clear {
    grid-area: clear;
  }

  button {
    border: none;
    padding: 6px;
    background-color: #393534;
    color: #eeeff5;
    font-family: 'Roboto Medium';
    /*
    -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    */
  }

  .status {
    grid-area: status;
  }
`;

export const StyledTextField = styled(TextField as ComponentClass<any>)`
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
`;
