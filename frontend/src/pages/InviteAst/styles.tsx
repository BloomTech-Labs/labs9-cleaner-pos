import { ComponentClass } from 'react';
import styled from '@emotion/styled';
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

export const StyledForm = styled(Form)`
  /* Color */
  background-color: var(--color-bg-secondary);

  /* Sizing & Box Model */
  padding: 1rem;
  width: 100%;
`;
