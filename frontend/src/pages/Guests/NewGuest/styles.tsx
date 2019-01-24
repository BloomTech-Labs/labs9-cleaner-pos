import styled from '@emotion/styled';
// Components
import { TextField } from '@material-ui/core';
import { Form } from 'formik';
// Types
import { ComponentClass } from 'react';

export const StyledForm = styled(Form)`
  max-width: 700px;
  margin: auto;

  label {
    margin-right: 0.5rem;
  }
`;

export const StyledTextField = styled(TextField as ComponentClass<any>)`
  /* -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) !important; */
`;
