import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  width: 100%;

  .snackbar-component {
    background-color: var(--color-bg-accent-light) !important;
    color: var(--color-text-accent) !important;
  }

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
`;
