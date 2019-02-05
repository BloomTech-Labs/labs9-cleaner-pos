import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding: 1rem;
  width: 100%;
  border: var(--border);
  /* Color */
  background-color: var(--color-bg-accent-light);
  /* Text */
  font-weight: bolder;

  label {
    /* Color */
    color: var(--color-text-accent-dark);
    /* Text */
    font-size: 1rem;
  }

  select {
    width: 100%;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 1px solid var(--color-border-strong);
    /* Color */
    background-color: var(--color-bg-accent-light);
    /* Text */
    font-size: 1rem;
  }
`;
