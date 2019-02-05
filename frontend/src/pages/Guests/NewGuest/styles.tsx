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
