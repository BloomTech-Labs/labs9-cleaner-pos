import React from 'react';
import styled from '@emotion/styled';
// Components
import { Form } from 'formik';
import { TextField } from '@material-ui/core';
// Types
import { ComponentClass } from 'react';

export const NewPropertyStyled = styled(Form)`
  /* Box Model & Sizing */
  margin: auto;
  max-width: 700px;

  button {
    font-size: 1rem;
  }

  .ast-dropdown {
    label {
      color: var(--color-text-accent-dark);
      font-size: 1rem;
    }

    select {
      width: 100%;
      margin-top: 0.5rem;
      border: none;
      border-bottom: 1px solid var(--color-border-strong);
      /* Text */
      font-family: 'Roboto Medium', Arial, Helvetica, sans-serif;
      font-size: 1rem;
    }
  }
`;

export const StyledTextField = styled(TextField as ComponentClass<any>)`
  /* -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important; */
`;
