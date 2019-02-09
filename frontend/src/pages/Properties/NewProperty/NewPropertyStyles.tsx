import React from 'react';
import styled from '@emotion/styled';
// Components
import { Form } from 'formik';
import { TextField } from '@material-ui/core';
// Types
import { ComponentClass } from 'react';

export const NewPropertyStyled = styled(Form)`
  /* Box Model & Sizing */
  max-width: 1000px;
  margin: auto;
  /* Text */
  text-align: left;

  .property-info--fields {
    display: grid;
    column-gap: 1rem;
    grid-column-gap: 1.5rem;
    grid-template-areas:
      'propertyName propertyName'
      'address1 address2'
      'city state'
      'country postCode';
  }

  .image-preview i {
    margin-top: 0.5rem;
    font-size: 5rem;
    max-width: 20rem;
    max-height: 20rem;
    /* object-fit: cover; */
  }

  .property-prices--fields {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;

    .field {
      flex-basis: 30%;
    }
  }

  @media only screen and (max-width: 700px) {
    .property-info--fields,
    .property-prices--fields {
      display: flex;
      flex-flow: column nowrap;

      .field {
        flex-basis: 100%;
      }
    }
    .image-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        border-radius: var(--border-radius);
      }
    }
  }

  .ast-dropdown {
    margin: auto;
    padding: 1rem;
  }

  .property-resources--guides {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    padding-top: 1rem;

    @media only screen and (max-width: 700px) {
      flex-flow: row wrap;
    }
    @media only screen and (max-width: 463px) {
      padding-top: 0;
    }
  }

  .guide {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    @media only screen and (max-width: 463px) {
      i {
        margin-top: 1rem;
      }
    }
  }
  .primary-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
      margin: 0 0.5rem 2rem 0.5rem;
    }
  }

  /* Grid Declarations */
  .field-propertyName {
    grid-area: propertyName;
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
  .field-country {
    grid-area: country;
  }
  .field-postCode {
    grid-area: postCode;
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
